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

    try {
      const res = await axios.post(
        `${BOOKMARK_API_END_POINT}/${job._id}`,
        {},
        { withCredentials: true }
      );

      if (res.data.success) {
        dispatch(setSavedJobs(res.data.savedJobs));
        toast.success(
          isSaved ? "Removed from saved jobs" : "Job saved successfully"
        );
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Bookmark failed");
    }
  };

  return (
    <div className="bg-white p-4 sm:p-5 lg:p-6 rounded-xl sm:rounded-2xl shadow-md sm:shadow-lg border border-gray-200 transition hover:shadow-xl">

      {/* Top Section */}
      <div className="flex items-center justify-between">
        <p className="text-xs sm:text-sm text-gray-500">
          {daysagoFunction(job?.createdAt) === 0
            ? "Today"
            : `${daysagoFunction(job?.createdAt)} days ago`}
        </p>

        {/* 🔖 Bookmark Icon */}
        <Button
          onClick={saveHandler}
          className="rounded-full bg-transparent hover:bg-gray-100"
          size="icon"
        >
          <Bookmark
            className={`h-4 w-4 sm:h-5 sm:w-5 ${
              isSaved ? "text-purple-600" : "text-gray-600"
            }`}
            fill={isSaved ? "currentColor" : "none"}
          />
        </Button>
      </div>

      {/* Company Info */}
      <div className="flex items-center gap-3 sm:gap-4 my-3 sm:my-4">
        <Avatar className="w-12 h-12 sm:w-14 sm:h-14 border border-gray-200 shadow-sm">
          <AvatarImage src={job?.company?.logo} />
        </Avatar>

        <div>
          <h1 className="font-semibold text-base sm:text-lg text-gray-900">
            {job?.company?.name}
          </h1>
          <p className="text-xs sm:text-sm text-gray-500">
            India
          </p>
        </div>
      </div>

      {/* Job Title & Description */}
      <div className="my-3 sm:my-4">
        <h1 className="font-bold text-lg sm:text-xl text-gray-900">
          {job?.title}
        </h1>
        <p className="text-xs sm:text-sm text-gray-600 leading-relaxed line-clamp-3">
          {job?.description}
        </p>
      </div>

      {/* Badges */}
      <div className="flex flex-wrap items-center gap-2 mt-3 sm:mt-4">
        <Badge className="bg-gray-100 text-blue-700 font-semibold">
          {job?.position} position
        </Badge>
        <Badge className="bg-gray-100 text-[#F83002] font-semibold">
          {job?.jobType}
        </Badge>
        <Badge className="bg-gray-100 text-[#7209b7] font-semibold">
          {job?.salary} LPA
        </Badge>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-4 sm:mt-6">
        <Button
          onClick={() => navigate(`/description/${job?._id}`)}
          className="border border-gray-400 text-gray-700 bg-white hover:bg-gray-100"
        >
          Details
        </Button>

        <Button
          onClick={saveHandler}
          className={`${
            isSaved
              ? "bg-green-600 hover:bg-green-700"
              : "bg-[#7209b7] hover:bg-[#5e0894]"
          } text-white`}
        >
          {isSaved ? "Saved" : "Save For Later"}
        </Button>
      </div>
    </div>
  );
};

export default Job;
