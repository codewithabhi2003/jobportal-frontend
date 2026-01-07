import React, { useEffect, useState } from 'react'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { useParams, useNavigate } from 'react-router-dom'

import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from '@/utils/constant'
import { setSingleJob } from '@/redux/jobSlice'
import { useDispatch, useSelector } from 'react-redux'

import { toast } from 'sonner'
import axios from 'axios'
import { ArrowLeft } from 'lucide-react'

const JobDescription = () => {
    const { user } = useSelector(store => store.auth)
    const { singleJob } = useSelector(store => store.job)

    const isIntiallyApplied = singleJob?.applications?.some(
        application => application.applicant === user?._id
    )

    const [isApplied, setIsApplied] = useState(isIntiallyApplied)

    const params = useParams()
    const jobId = params.id
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const appplyJobHandler = async () => {
        try {
            const res = await axios.get(
                `${APPLICATION_API_END_POINT}/apply/${jobId}`,
                { withCredentials: true }
            )

            if (res.data.success) {
                setIsApplied(true)
                const updateSingleJob = {
                    ...singleJob,
                    applications: [
                        ...singleJob.applications,
                        { applicant: user?._id }
                    ]
                }
                dispatch(setSingleJob(updateSingleJob))
                toast.success(res.data.message)
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Something went wrong")
        }
    }

    useEffect(() => {
        const fetchSingleJobs = async () => {
            try {
                const res = await axios.get(
                    `${JOB_API_END_POINT}/get/${jobId}`,
                    { withCredentials: true }
                )

                if (res.data.success) {
                    dispatch(setSingleJob(res.data.job))
                    setIsApplied(
                        res.data.job.applications.some(
                            application => application.applicant === user?._id
                        )
                    )
                }
            } catch (error) {
                console.log(error)
            }
        }
        fetchSingleJobs()
    }, [jobId, dispatch, user?._id])

    return (
        <div className="max-w-5xl mx-auto my-10 bg-white shadow-lg rounded-xl p-6 sm:p-8 border border-gray-200">

            {/* 🔙 Back Button */}
            <Button
                onClick={() => navigate(-1)}
                variant="ghost"
                className="flex items-center gap-2 mb-4 text-gray-600 hover:text-black"
            >
                <ArrowLeft className="w-4 h-4" />
                Back
            </Button>

            {/* Header Section */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="font-bold text-xl sm:text-2xl text-gray-800">
                        {singleJob?.title}
                    </h1>

                    <div className="flex flex-wrap items-center gap-2 mt-3">
                        <Badge className="bg-gray-100 text-blue-700 font-medium px-3 py-1 rounded-md">
                            {singleJob?.position} Position
                        </Badge>
                        <Badge className="bg-gray-100 text-[#F83002] font-medium px-3 py-1 rounded-md">
                            {singleJob?.jobType}
                        </Badge>
                        <Badge className="bg-gray-100 text-[#7209b7] font-medium px-3 py-1 rounded-md">
                            {singleJob?.salary} LPA
                        </Badge>
                    </div>
                </div>

                <Button
                    onClick={isApplied ? null : appplyJobHandler}
                    disabled={isApplied}
                    className={`rounded-lg px-5 py-2 font-medium transition-all duration-300 
                        ${isApplied
                            ? 'bg-gray-500 text-white cursor-not-allowed'
                            : 'bg-[#7209b7] text-white hover:bg-[#5f32ad]'
                        }`}
                >
                    {isApplied ? 'Already Applied' : 'Apply Now'}
                </Button>
            </div>

            {/* Job Description */}
            <h1 className="border-b-2 border-gray-300 font-semibold text-lg py-4 mt-6 text-gray-800">
                Job Description
            </h1>

            <div className="my-6 space-y-3 text-gray-700 text-sm sm:text-base">
                <p className="flex">
                    <span className="font-semibold w-32">Role:</span>
                    <span>{singleJob?.title}</span>
                </p>

                <p className="flex">
                    <span className="font-semibold w-32">Location:</span>
                    <span>{singleJob?.location}</span>
                </p>

                <p className="flex">
                    <span className="font-semibold w-32">Description:</span>
                    <span>{singleJob?.description}</span>
                </p>

                <p className="flex">
                    <span className="font-semibold w-32">Experience:</span>
                    <span>{singleJob?.experienceLevel} year</span>
                </p>

                <p className="flex">
                    <span className="font-semibold w-32">Salary:</span>
                    <span>{singleJob?.salary} LPA</span>
                </p>

                <p className="flex">
                    <span className="font-semibold w-32">Total Applicants:</span>
                    <span>{singleJob?.applications?.length}</span>
                </p>

                <p className="flex">
                    <span className="font-semibold w-32">Posted Date:</span>
                    <span>{singleJob?.createdAt?.split("T")[0]}</span>
                </p>
            </div>
        </div>
    )
}

export default JobDescription
