import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from '@/utils/constant'
import { setSingleJob } from '@/redux/jobSlice'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'sonner'
import axios from 'axios'
import {
  ArrowLeft, MapPin, Briefcase, IndianRupee,
  Users, CalendarDays, Clock, Star
} from 'lucide-react'
import Navbar from './shared/Navbar'

const JobDescription = () => {
  const { user } = useSelector(store => store.auth)
  const { singleJob } = useSelector(store => store.job)
  const isInitiallyApplied = singleJob?.applications?.some(app => app.applicant === user?._id)
  const [isApplied, setIsApplied] = useState(isInitiallyApplied)
  const { id: jobId } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const applyJobHandler = async () => {
    try {
      const res = await axios.get(`${APPLICATION_API_END_POINT}/apply/${jobId}`, { withCredentials: true })
      if (res.data.success) {
        setIsApplied(true)
        dispatch(setSingleJob({ ...singleJob, applications: [...singleJob.applications, { applicant: user?._id }] }))
        toast.success(res.data.message)
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong")
    }
  }

  useEffect(() => {
    const fetchSingleJob = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, { withCredentials: true })
        if (res.data.success) {
          dispatch(setSingleJob(res.data.job))
          setIsApplied(res.data.job.applications.some(app => app.applicant === user?._id))
        }
      } catch (error) { console.log(error) }
    }
    fetchSingleJob()
  }, [jobId, dispatch, user?._id])

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@500;700;800;900&family=Outfit:wght@400;500;600&display=swap');

        .jd-page {
          min-height: 100vh;
          background: #f9f5ff;
          font-family: 'Outfit', sans-serif;
          position: relative; overflow: hidden;
        }
        .jd-dots {
          position: fixed; inset: 0; pointer-events: none; opacity: 0.45;
          background-image: radial-gradient(circle, rgba(114,9,183,0.18) 1px, transparent 1px);
          background-size: 28px 28px; z-index: 0;
        }
        .jd-blob1 {
          position: fixed; top: -100px; right: -80px;
          width: 420px; height: 420px; border-radius: 50%;
          background: radial-gradient(circle, rgba(114,9,183,0.08) 0%, transparent 70%);
          pointer-events: none; z-index: 0;
        }
        .jd-blob2 {
          position: fixed; bottom: -80px; left: -60px;
          width: 340px; height: 340px; border-radius: 50%;
          background: radial-gradient(circle, rgba(114,9,183,0.05) 0%, transparent 70%);
          pointer-events: none; z-index: 0;
        }
        .jd-body {
          position: relative; z-index: 1;
          max-width: 860px; margin: 0 auto;
          padding: 2rem 1rem 3rem;
        }
        .jd-back-btn {
          display: inline-flex; align-items: center; gap: 6px;
          padding: 0.42rem 1rem;
          border-radius: 10px;
          border: 1.5px solid rgba(114,9,183,0.2);
          background: rgba(114,9,183,0.05);
          color: #7209b7;
          font-family: 'Outfit', sans-serif;
          font-size: 0.84rem; font-weight: 600;
          cursor: pointer; margin-bottom: 1.4rem;
          transition: all 0.2s;
        }
        .jd-back-btn:hover { background: rgba(114,9,183,0.1); border-color: #7209b7; }

        .jd-card {
          background: #fff;
          border: 1px solid rgba(114,9,183,0.13);
          border-radius: 20px;
          padding: 2rem;
          box-shadow: 0 10px 36px rgba(114,9,183,0.09), 0 2px 8px rgba(0,0,0,0.04);
          position: relative;
          margin-bottom: 1.5rem;
        }
        .jd-card::before {
          content: '';
          position: absolute; top: 0; left: 0; right: 0; height: 3px;
          background: linear-gradient(90deg, #7209b7, #b44bf7);
          border-radius: 20px 20px 0 0;
        }

        /* Header */
        .jd-header {
          display: flex; justify-content: space-between;
          align-items: flex-start; gap: 1rem; flex-wrap: wrap;
          margin-bottom: 1.3rem;
        }
        .jd-title {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 1.55rem; font-weight: 900;
          color: #18003a; letter-spacing: -0.03em;
          margin-bottom: 0.7rem;
        }
        .jd-badges { display: flex; flex-wrap: wrap; gap: 0.45rem; }
        .jd-badge {
          padding: 0.25rem 0.75rem; border-radius: 8px;
          font-family: 'Outfit', sans-serif;
          font-size: 0.77rem; font-weight: 600;
        }
        .jd-badge-pos {
          background: rgba(55,130,221,0.08); border: 1px solid rgba(55,130,221,0.2);
          color: #185fa5;
        }
        .jd-badge-type {
          background: rgba(220,53,69,0.07); border: 1px solid rgba(220,53,69,0.18);
          color: #a32d2d;
        }
        .jd-badge-sal {
          background: rgba(114,9,183,0.07); border: 1px solid rgba(114,9,183,0.18);
          color: #7209b7;
        }

        /* Apply button */
        .jd-apply-btn {
          padding: 0.62rem 1.5rem;
          border-radius: 11px;
          font-family: 'Outfit', sans-serif;
          font-size: 0.9rem; font-weight: 700;
          border: none; cursor: pointer;
          transition: all 0.2s; flex-shrink: 0;
          box-shadow: 0 4px 14px rgba(114,9,183,0.28);
        }
        .jd-apply-btn-active {
          background: #7209b7; color: #fff;
        }
        .jd-apply-btn-active:hover {
          background: #5c0799; transform: translateY(-1px);
          box-shadow: 0 6px 20px rgba(114,9,183,0.38);
        }
        .jd-apply-btn-done {
          background: rgba(114,9,183,0.08);
          border: 1.5px solid rgba(114,9,183,0.2);
          color: #9ca3af; cursor: not-allowed;
          box-shadow: none;
        }

        /* Divider */
        .jd-divider {
          height: 1px; background: rgba(114,9,183,0.09); margin: 1.3rem 0;
        }
        .jd-section-title {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 1rem; font-weight: 800; color: #18003a;
          margin-bottom: 1.1rem;
        }

        /* Info grid */
        .jd-info-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
          gap: 0.8rem;
        }
        .jd-info-item {
          display: flex; align-items: center; gap: 10px;
          padding: 0.75rem 1rem;
          background: #fdfaff;
          border: 1px solid rgba(114,9,183,0.1);
          border-radius: 12px;
        }
        .jd-info-icon {
          width: 34px; height: 34px; border-radius: 9px;
          background: rgba(114,9,183,0.07);
          display: flex; align-items: center; justify-content: center;
          color: #7209b7; flex-shrink: 0;
        }
        .jd-info-label {
          font-size: 0.72rem; color: #9ca3af; font-weight: 500; margin-bottom: 1px;
        }
        .jd-info-value {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 0.88rem; font-weight: 700; color: #18003a;
        }

        /* Description */
        .jd-desc-text {
          font-size: 0.9rem; color: #4b5563;
          line-height: 1.75; 
        }
      `}</style>

      <div className="jd-page">
        <Navbar />
        <div className="jd-dots" />
        <div className="jd-blob1" />
        <div className="jd-blob2" />

        <div className="jd-body">
          {/* Back */}
          <button className="jd-back-btn" onClick={() => navigate(-1)}>
            <ArrowLeft size={14} /> Back
          </button>

          {/* Main card */}
          <div className="jd-card">
            {/* Header */}
            <div className="jd-header">
              <div>
                <div className="jd-title">{singleJob?.title}</div>
                <div className="jd-badges">
                  <span className="jd-badge jd-badge-pos">{singleJob?.position} Position</span>
                  <span className="jd-badge jd-badge-type">{singleJob?.jobType}</span>
                  <span className="jd-badge jd-badge-sal">{singleJob?.salary} LPA</span>
                </div>
              </div>
              <button
                className={`jd-apply-btn ${isApplied ? "jd-apply-btn-done" : "jd-apply-btn-active"}`}
                disabled={isApplied}
                onClick={isApplied ? null : applyJobHandler}
              >
                {isApplied ? "Already Applied" : "Apply Now"}
              </button>
            </div>

            <div className="jd-divider" />

            {/* Info tiles */}
            <div className="jd-section-title">Job Details</div>
            <div className="jd-info-grid" style={{ marginBottom: "1.4rem" }}>
              <div className="jd-info-item">
                <span className="jd-info-icon"><MapPin size={15} /></span>
                <div>
                  <div className="jd-info-label">Location</div>
                  <div className="jd-info-value">{singleJob?.location || "—"}</div>
                </div>
              </div>
              <div className="jd-info-item">
                <span className="jd-info-icon"><Briefcase size={15} /></span>
                <div>
                  <div className="jd-info-label">Role</div>
                  <div className="jd-info-value">{singleJob?.title || "—"}</div>
                </div>
              </div>
              <div className="jd-info-item">
                <span className="jd-info-icon"><Star size={15} /></span>
                <div>
                  <div className="jd-info-label">Experience</div>
                  <div className="jd-info-value">{singleJob?.experienceLevel} yr</div>
                </div>
              </div>
              <div className="jd-info-item">
                <span className="jd-info-icon"><IndianRupee size={15} /></span>
                <div>
                  <div className="jd-info-label">Salary</div>
                  <div className="jd-info-value">{singleJob?.salary} LPA</div>
                </div>
              </div>
              <div className="jd-info-item">
                <span className="jd-info-icon"><Users size={15} /></span>
                <div>
                  <div className="jd-info-label">Applicants</div>
                  <div className="jd-info-value">{singleJob?.applications?.length}</div>
                </div>
              </div>
              <div className="jd-info-item">
                <span className="jd-info-icon"><CalendarDays size={15} /></span>
                <div>
                  <div className="jd-info-label">Posted On</div>
                  <div className="jd-info-value">{singleJob?.createdAt?.split("T")[0]}</div>
                </div>
              </div>
            </div>

            <div className="jd-divider" />

            {/* Description */}
            <div>
              <div className="jd-section-title">Job Description</div>
              <p className="jd-desc-text">{singleJob?.description}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default JobDescription