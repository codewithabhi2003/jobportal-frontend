import React from 'react';
import { Button } from './ui/button';
import { Bookmark } from 'lucide-react';
import { Avatar, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { setSavedJobs } from '@/redux/jobSlice';
import { toast } from 'sonner';
import { BOOKMARK_API_END_POINT } from '@/utils/constant';

const Job = ({ job }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector(store => store.auth);
  const { savedJobs = [] } = useSelector(store => store.job);

  const isSaved = savedJobs.some(j => j._id === job?._id);

  const daysagoFunction = (mongodbTime) => {
    const createdAt = new Date(mongodbTime);
    const currentTime = new Date();
    const timeDifference = currentTime - createdAt;
    return Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  };

  /* ===============================
     🔖 SAVE / UNSAVE (BACKEND)
  =============================== */
  const saveHandler = async () => {
  if (!user) {
    toast.error("Login required to save jobs");
    return;
  }

  // 🔥 OPTIMISTIC UI UPDATE (instant)
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
  } catch (error) {
    // ❌ rollback if API fails
    dispatch(setSavedJobs(savedJobs));
    toast.error("Bookmark failed");
  }
};


  return (
  <>
    <style>{`
      .jcard-root {
        background: #ffffff;
        border: 1px solid rgba(114,9,183,0.1);
        border-radius: 16px;
        padding: 1.35rem 1.3rem;
        cursor: pointer;
        display: flex;
        flex-direction: column;
        transition: all 0.26s cubic-bezier(0.4,0,0.2,1);
        font-family: 'Outfit', sans-serif;
        position: relative;
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
      }
      .jcard-root:hover {
        transform: translateY(-5px);
        box-shadow: 0 14px 40px rgba(114,9,183,0.1), 0 2px 8px rgba(0,0,0,0.04);
        border-color: rgba(114,9,183,0.28);
      }
      .jcard-root:hover::before {
        transform: scaleX(1);
      }

      .jcard-title {
        font-family: 'Plus Jakarta Sans', sans-serif;
        font-weight: 800;
        font-size: 1rem;
        color: #18003a;
      }

      .jcard-root:hover .jcard-title {
        color: #7209b7;
      }

      .jcard-desc {
        font-size: 0.82rem;
        color: #6b7280;
        line-height: 1.6;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }

      .pill {
        background: #f9f5ff;
        border: 1px solid rgba(114,9,183,0.1);
        border-radius: 7px;
        padding: 0.25rem 0.65rem;
        font-size: 0.74rem;
        color: #6b7280;
      }

      .badge-purple {
        background: rgba(114,9,183,0.07);
        border: 1px solid rgba(114,9,183,0.18);
        color: #7209b7;
      }

      .badge-pink {
        background: rgba(247,37,133,0.06);
        border: 1px solid rgba(247,37,133,0.18);
        color: #c4106a;
      }
    `}</style>

    <div className="jcard-root">

      {/* Top */}
      <div className="flex justify-between items-start mb-3">
        <p className="text-xs text-gray-400">
          {daysagoFunction(job?.createdAt) === 0
            ? "Today"
            : `${daysagoFunction(job?.createdAt)} days ago`}
        </p>

        <Button
          onClick={saveHandler}
          className="rounded-full bg-transparent hover:bg-gray-100"
          size="icon"
        >
          <Bookmark
            className={`h-4 w-4 ${
              isSaved ? "text-[#7209b7]" : "text-gray-500"
            }`}
            fill={isSaved ? "currentColor" : "none"}
          />
        </Button>
      </div>

      {/* Company */}
      <div className="flex items-center gap-3 mb-3">
        <div className="w-[42px] h-[42px] rounded-[10px] border border-purple-100 overflow-hidden flex items-center justify-center bg-[#f9f5ff]">
          <Avatar className="w-full h-full">
            <AvatarImage src={job?.company?.logo} />
          </Avatar>
        </div>

        <div>
          <p className="font-bold text-sm text-[#18003a]">
            {job?.company?.name}
          </p>
          <p className="text-[11px] text-gray-400">India</p>
        </div>
      </div>

      {/* Title + Desc */}
      <div className="mb-3">
        <h1 className="jcard-title">{job?.title}</h1>
        <p className="jcard-desc">{job?.description}</p>
      </div>

      {/* Meta Pills */}
      <div className="flex gap-2 mb-3 flex-wrap">
        <span className="pill">Full-time</span>
        <span className="pill">On-site</span>
      </div>

      {/* Footer */}
      <div className="flex justify-between items-center mt-auto pt-3 border-t border-purple-100">

        <div className="flex gap-2 flex-wrap">
          <span className="pill badge-purple">{job?.jobType}</span>
          <span className="pill badge-pink">{job?.position} Pos.</span>
        </div>

        <div className="text-right">
          <p className="font-extrabold text-sm text-[#7209b7]">
            ₹{job?.salary} LPA
          </p>
          <span className="text-[10px] text-gray-400">Salary</span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-2 mt-4">
        <Button
          onClick={() => navigate(`/description/${job?._id}`)}
          className="w-full border border-gray-300 bg-white text-gray-700 hover:bg-gray-100"
        >
          Details
        </Button>

        <Button
          onClick={saveHandler}
          className={`w-full text-white ${
            isSaved ? "bg-green-600" : "bg-[#7209b7]"
          }`}
        >
          {isSaved ? "Saved" : "Save"}
        </Button>
      </div>

    </div>
  </>
);
};

export default Job;
