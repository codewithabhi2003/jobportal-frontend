import React from "react";
import { Badge } from "./ui/badge";
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarImage } from "./ui/avatar";
import { motion } from "framer-motion";

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

const LatestJobCards = ({ job, index }) => {
  const navigate = useNavigate();

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -6 }}
      onClick={() => navigate(`/description/${job._id}`)}
      className="p-4 sm:p-5 rounded-lg shadow-md sm:shadow-xl bg-white border border-gray-100 cursor-pointer transition hover:shadow-2xl"
    >
      {/* Company Info */}
      <div className="flex items-center gap-3 mb-3">
        <Avatar className="w-10 h-10 sm:w-12 sm:h-12 border border-gray-200 shadow-sm">
          <AvatarImage src={job?.company?.logo} />
        </Avatar>
        <div>
          <h1 className="font-medium text-base sm:text-lg">
            {job?.company?.name}
          </h1>
          <p className="text-xs sm:text-sm text-gray-500">India</p>
        </div>
      </div>

      {/* Job Info */}
      <h1 className="font-bold text-base sm:text-lg my-2">
        {job?.title}
      </h1>
      <p className="text-xs sm:text-sm text-gray-600 line-clamp-2">
        {job?.description}
      </p>

      {/* Badges */}
      <div className="flex flex-wrap gap-2 mt-4">
        <Badge className="text-blue-700 font-bold text-xs" variant="ghost">
          {job?.position} Position
        </Badge>
        <Badge className="text-[#F83002] font-bold text-xs" variant="ghost">
          {job?.jobType}
        </Badge>
        <Badge className="text-[#7209b7] font-bold text-xs" variant="ghost">
          {job?.salary} LPA
        </Badge>
      </div>
    </motion.div>
  );
};

export default LatestJobCards;
