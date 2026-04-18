import { motion } from "framer-motion";
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Avatar, AvatarImage } from './ui/avatar';
import { MapPin, Clock, IndianRupee, ArrowUpRight, Bookmark } from 'lucide-react';

import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { setSavedJobs } from '@/redux/jobSlice';
import { toast } from 'sonner';
import { BOOKMARK_API_END_POINT } from '@/utils/constant';

const Job = ({ job, index = 0 }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector(store => store.auth);
  const { savedJobs = [] } = useSelector(store => store.job);

  const isSaved = savedJobs.some(j => j._id === job?._id);

  const daysAgoFunction = (mongodbTime) => {
    const createdAt = new Date(mongodbTime);
    const currentTime = new Date();
    const timeDifference = currentTime - createdAt;
    return Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  };

  const daysAgo = daysAgoFunction(job?.createdAt);

  const saveHandler = async (e) => {
    e.stopPropagation();
    if (!user) {
      toast.error("Login required to save jobs");
      return;
    }
    const updatedJobs = isSaved
      ? savedJobs.filter(j => j._id !== job._id)
      : [...savedJobs, job];
    dispatch(setSavedJobs(updatedJobs));
    try {
      await axios.post(
        `${BOOKMARK_API_END_POINT}/${job._id}`,
        {},
        { withCredentials: true }
      );
    } catch {
      dispatch(setSavedJobs(savedJobs));
      toast.error("Bookmark failed");
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@500;700;800&family=Outfit:wght@400;500;600&display=swap');

        .jcard-root {
          background: #ffffff;
          border: 1px solid rgba(114,9,183,0.1);
          border-radius: 16px;
          padding: 1.35rem 1.3rem;
          cursor: pointer;
          position: relative;
          display: flex;
          flex-direction: column;
          transition: all 0.26s cubic-bezier(0.4,0,0.2,1);
          font-family: 'Outfit', sans-serif;
          overflow: hidden;
        }
        .jcard-root::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 2.5px;
          background: linear-gradient(90deg, #7209b7, #b44bf7);
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.3s ease;
          border-radius: 16px 16px 0 0;
        }
        .jcard-root:hover {
          border-color: rgba(114,9,183,0.28);
          transform: translateY(-5px);
          box-shadow: 0 14px 40px rgba(114,9,183,0.1), 0 2px 8px rgba(0,0,0,0.04);
        }
        .jcard-root:hover::before { transform: scaleX(1); }

        .jcard-top {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          margin-bottom: 0.9rem;
        }
        .jcard-co { display: flex; align-items: center; gap: 10px; }
        .jcard-avatar {
          width: 42px; height: 42px;
          border-radius: 10px;
          border: 1px solid rgba(114,9,183,0.12);
          overflow: hidden;
          flex-shrink: 0;
          background: #f9f5ff;
          display: flex; align-items: center; justify-content: center;
        }
        .jcard-co-name {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 0.9rem;
          font-weight: 700;
          color: #18003a;
        }
        .jcard-co-loc {
          display: flex; align-items: center; gap: 3px;
          color: #9ca3af;
          font-size: 0.72rem;
          margin-top: 1px;
        }

        .jcard-top-actions {
          display: flex; align-items: center; gap: 6px;
          flex-shrink: 0;
        }
        .jcard-bookmark-btn {
          width: 30px; height: 30px;
          border-radius: 8px;
          background: rgba(114,9,183,0.04);
          border: 1px solid rgba(114,9,183,0.1);
          display: flex; align-items: center; justify-content: center;
          cursor: pointer;
          transition: all 0.2s;
          padding: 0;
        }
        .jcard-bookmark-btn:hover {
          background: rgba(114,9,183,0.1);
          border-color: rgba(114,9,183,0.3);
        }
        .jcard-arrow {
          width: 30px; height: 30px;
          border-radius: 8px;
          background: rgba(114,9,183,0.06);
          border: 1px solid rgba(114,9,183,0.12);
          display: flex; align-items: center; justify-content: center;
          color: #b084d8;
          flex-shrink: 0;
          transition: all 0.2s;
        }
        .jcard-root:hover .jcard-arrow {
          background: rgba(114,9,183,0.1);
          color: #7209b7;
          border-color: rgba(114,9,183,0.3);
        }

        .jcard-days {
          font-size: 0.72rem;
          color: #9ca3af;
          margin-bottom: 0.35rem;
          font-family: 'Outfit', sans-serif;
        }
        .jcard-title {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 1rem;
          font-weight: 800;
          color: #18003a;
          margin-bottom: 0.4rem;
          transition: color 0.2s;
        }
        .jcard-root:hover .jcard-title { color: #7209b7; }
        .jcard-desc {
          color: #6b7280;
          font-size: 0.82rem;
          line-height: 1.62;
          margin-bottom: 0.9rem;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .jcard-meta {
          display: flex; flex-wrap: wrap;
          gap: 0.4rem;
          margin-bottom: 0.85rem;
        }
        .jcard-meta-pill {
          display: inline-flex; align-items: center; gap: 4px;
          background: #f9f5ff;
          border: 1px solid rgba(114,9,183,0.1);
          border-radius: 7px;
          padding: 0.25rem 0.65rem;
          color: #6b7280;
          font-size: 0.74rem;
        }

        .jcard-footer {
          display: flex; align-items: center;
          justify-content: space-between;
          padding-top: 0.85rem;
          border-top: 1px solid rgba(114,9,183,0.07);
          margin-top: auto;
        }
        .jcard-badges { display: flex; gap: 0.4rem; flex-wrap: wrap; }
        .jcard-badge {
          padding: 0.22rem 0.65rem;
          border-radius: 7px;
          font-size: 0.72rem;
          font-weight: 600;
          font-family: 'Outfit', sans-serif;
        }
        .jcard-badge-type {
          background: rgba(114,9,183,0.07);
          border: 1px solid rgba(114,9,183,0.18);
          color: #7209b7;
        }
        .jcard-badge-pos {
          background: rgba(247,37,133,0.06);
          border: 1px solid rgba(247,37,133,0.18);
          color: #c4106a;
        }
        .jcard-salary {
          display: flex; align-items: center; gap: 2px;
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 0.95rem;
          font-weight: 800;
          color: #7209b7;
        }
        .jcard-salary-lbl {
          color: #9ca3af;
          font-size: 0.68rem;
          font-weight: 400;
          text-align: right;
          font-family: 'Outfit', sans-serif;
        }

        .jcard-actions {
          display: flex;
          gap: 0.5rem;
          margin-top: 0.85rem;
          flex-wrap: wrap;
        }
        .jcard-btn {
          flex: 1;
          min-width: 100px;
          padding: 0.45rem 0.9rem;
          border-radius: 9px;
          font-family: 'Outfit', sans-serif;
          font-size: 0.8rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
          border: none;
          text-align: center;
        }
        .jcard-btn-details {
          background: #f9f5ff;
          border: 1px solid rgba(114,9,183,0.18);
          color: #7209b7;
        }
        .jcard-btn-details:hover {
          background: rgba(114,9,183,0.12);
        }
        .jcard-btn-save {
          background: #7209b7;
          color: #fff;
        }
        .jcard-btn-save:hover {
          background: #5e0894;
        }
        .jcard-btn-saved {
          background: #16a34a;
          color: #fff;
        }
        .jcard-btn-saved:hover {
          background: #15803d;
        }
      `}</style>

      <motion.div
        className="jcard-root"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.38, delay: index * 0.07, ease: "easeOut" }}
        onClick={() => navigate(`/description/${job?._id}`)}
      >
        {/* Top Row: Company info + Bookmark + Arrow */}
        <div className="jcard-top">
          <div className="jcard-co">
            <div className="jcard-avatar">
              <Avatar style={{ width: "100%", height: "100%", borderRadius: 0 }}>
                <AvatarImage src={job?.company?.logo} />
              </Avatar>
            </div>
            <div>
              <div className="jcard-co-name">{job?.company?.name}</div>
              <div className="jcard-co-loc"><MapPin size={10} /> India</div>
            </div>
          </div>

          <div className="jcard-top-actions">
            {/* Bookmark button */}
            <button
              className="jcard-bookmark-btn"
              onClick={saveHandler}
              title={isSaved ? "Remove bookmark" : "Save job"}
            >
              <Bookmark
                size={13}
                color={isSaved ? "#7209b7" : "#b084d8"}
                fill={isSaved ? "#7209b7" : "none"}
              />
            </button>
            {/* Arrow */}
            <div className="jcard-arrow"><ArrowUpRight size={13} /></div>
          </div>
        </div>

        {/* Days ago */}
        <div className="jcard-days">
          {daysAgo === 0 ? "Posted today" : `Posted ${daysAgo} day${daysAgo !== 1 ? 's' : ''} ago`}
        </div>

        {/* Title & Description */}
        <div className="jcard-title">{job?.title}</div>
        <p className="jcard-desc">{job?.description}</p>

        {/* Meta pills */}
        <div className="jcard-meta">
          <span className="jcard-meta-pill"><Clock size={11} /> Full-time</span>
          <span className="jcard-meta-pill"><MapPin size={11} /> On-site</span>
        </div>

        {/* Footer: badges + salary */}
        <div className="jcard-footer">
          <div className="jcard-badges">
            <span className="jcard-badge jcard-badge-type">{job?.jobType}</span>
            <span className="jcard-badge jcard-badge-pos">{job?.position} Pos.</span>
          </div>
          <div style={{ textAlign: "right" }}>
            <div className="jcard-salary"><IndianRupee size={13} />{job?.salary} LPA</div>
            <div className="jcard-salary-lbl">Salary</div>
          </div>
        </div>

        {/* Action buttons */}
        <div
          className="jcard-actions"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            className="jcard-btn jcard-btn-details"
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/description/${job?._id}`);
            }}
          >
            Details
          </button>
          <button
            className={`jcard-btn ${isSaved ? "jcard-btn-saved" : "jcard-btn-save"}`}
            onClick={saveHandler}
          >
            {isSaved ? "Saved" : "Save For Later"}
          </button>
        </div>
      </motion.div>
    </>
  );
};

export default Job;