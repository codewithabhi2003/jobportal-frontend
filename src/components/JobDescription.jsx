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

  const isInitiallyApplied = singleJob?.applications?.some(
    app => app.applicant === user?._id
  )

  const [isApplied, setIsApplied] = useState(isInitiallyApplied)

  const { id: jobId } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const applyJobHandler = async () => {
    try {
      const res = await axios.get(
        `${APPLICATION_API_END_POINT}/apply/${jobId}`,
        { withCredentials: true }
      )

      if (res.data.success) {
        setIsApplied(true)
        dispatch(
          setSingleJob({
            ...singleJob,
            applications: [...singleJob.applications, { applicant: user?._id }]
          })
        )
        toast.success(res.data.message)
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong")
    }
  }

  useEffect(() => {
    const fetchSingleJob = async () => {
      try {
        const res = await axios.get(
          `${JOB_API_END_POINT}/get/${jobId}`,
          { withCredentials: true }
        )

        if (res.data.success) {
          dispatch(setSingleJob(res.data.job))
          setIsApplied(
            res.data.job.applications.some(
              app => app.applicant === user?._id
            )
          )
        }
      } catch (error) {
        console.log(error)
      }
    }
    fetchSingleJob()
  }, [jobId, dispatch, user?._id])

  return (
    <div className="max-w-5xl mx-auto my-10 bg-white shadow-lg rounded-xl p-6 sm:p-8 border">

      {/* Back */}
      <Button
        onClick={() => navigate(-1)}
        variant="ghost"
        className="flex items-center gap-2 mb-4 text-gray-600"
      >
        <ArrowLeft className="w-4 h-4" />
        Back
      </Button>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-800">
            {singleJob?.title}
          </h1>

          <div className="flex flex-wrap gap-2 mt-3">
            <Badge className="bg-gray-100 text-blue-700">
              {singleJob?.position} Position
            </Badge>
            <Badge className="bg-gray-100 text-red-600">
              {singleJob?.jobType}
            </Badge>
            <Badge className="bg-gray-100 text-purple-700">
              {singleJob?.salary} LPA
            </Badge>
          </div>
        </div>

        <Button
          disabled={isApplied}
          onClick={isApplied ? null : applyJobHandler}
          className={`px-6 py-2 rounded-lg ${
            isApplied
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-[#7209b7] hover:bg-[#5f32ad]"
          } text-white`}
        >
          {isApplied ? "Already Applied" : "Apply Now"}
        </Button>
      </div>

      {/* Section Title */}
      <h2 className="mt-8 pb-3 border-b text-lg font-semibold text-gray-800">
        Job Description
      </h2>

      {/* ✅ RESPONSIVE GRID DESCRIPTION */}
      <div className="my-6 space-y-4 text-gray-700 text-sm sm:text-base">

  <div className="flex">
    <span className="font-semibold w-32 shrink-0">Role:</span>
    <span className="flex-1">{singleJob?.title}</span>
  </div>

  <div className="flex">
    <span className="font-semibold w-32 shrink-0">Location:</span>
    <span className="flex-1">{singleJob?.location}</span>
  </div>

  {/* ✅ FIXED DESCRIPTION */}
  <div className="flex items-start">
    <span className="font-semibold w-32 shrink-0">Description:</span>
    <span className="flex-1 leading-relaxed">
      {singleJob?.description}
    </span>
  </div>

  <div className="flex">
    <span className="font-semibold w-32 shrink-0">Experience:</span>
    <span className="flex-1">{singleJob?.experienceLevel} year</span>
  </div>

  <div className="flex">
    <span className="font-semibold w-32 shrink-0">Salary:</span>
    <span className="flex-1">{singleJob?.salary} LPA</span>
  </div>

  <div className="flex">
    <span className="font-semibold w-32 shrink-0">Total Applicants:</span>
    <span className="flex-1">{singleJob?.applications?.length}</span>
  </div>

  <div className="flex">
    <span className="font-semibold w-32 shrink-0">Posted Date:</span>
    <span className="flex-1">
      {singleJob?.createdAt?.split("T")[0]}
    </span>
  </div>

</div>

    </div>
  )
}

export default JobDescription
