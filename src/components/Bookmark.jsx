import React from "react";
import Navbar from "./shared/Navbar";
import Job from "./Job";
import { useSelector } from "react-redux";
import useGetBookmarks from "@/hooks/useGetBookmarks";
import { motion } from "framer-motion";

/* 🔹 Motion Variants (same as Jobs & Bookmark style) */
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

const Bookmark = () => {
  useGetBookmarks();
  const { savedJobs = [] } = useSelector((store) => store.job);

  return (
    <>
      <Navbar />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-7xl mx-auto p-6"
      >
        {/* 🔹 Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-xl font-bold mb-6"
        >
          Saved Jobs ({savedJobs.length})
        </motion.h1>

        {/* 🔹 Empty State */}
        {savedJobs.length === 0 ? (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-gray-500"
          >
            No saved jobs yet.
          </motion.p>
        ) : (
          /* 🔹 Jobs Grid */
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {savedJobs.map((job) => (
              <motion.div key={job._id} variants={itemVariants}>
                <Job job={job} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </motion.div>
    </>
  );
};

export default Bookmark;
