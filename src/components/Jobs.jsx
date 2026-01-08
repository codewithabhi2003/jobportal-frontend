import React, { useState, useEffect } from "react";
import Navbar from "./shared/Navbar";
import FilterCard from "./FilterCard";
import Job from "./Job";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";

/* 🔹 Motion Variants (same as Bookmark) */
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

const Jobs = () => {
  const { allJobs, searchedQuery } = useSelector((store) => store.job);

  const [filteredJobs, setFilteredJobs] = useState([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedLocations, setSelectedLocations] = useState([]);

  /* ✅ RESET FILTERS ON PAGE LOAD */
  useEffect(() => {
    setSelectedLocations([]);
  }, []);

  /* ✅ MAIN FILTER LOGIC */
  useEffect(() => {
    let jobs = [...allJobs];

    // 🔍 Search filter
    if (searchedQuery) {
      const q = searchedQuery.toLowerCase();
      jobs = jobs.filter(
        (job) =>
          job?.title?.toLowerCase().includes(q) ||
          job?.description?.toLowerCase().includes(q) ||
          job?.location?.toLowerCase().includes(q)
      );
    }

    // 📍 Location filter
    if (selectedLocations.length > 0) {
      jobs = jobs.filter((job) =>
        selectedLocations.some((location) =>
          job?.location?.toLowerCase().includes(location.toLowerCase())
        )
      );
    }

    setFilteredJobs(jobs);
  }, [allJobs, searchedQuery, selectedLocations]);

  return (
    <>
      <Navbar />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-7xl mx-auto px-4 mt-4"
      >
        {/* 🔹 Filter Button */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-4"
        >
          <button
            onClick={() => setIsFilterOpen(true)}
            className="px-4 py-2 bg-[#6A38C2] text-white rounded-md text-sm"
          >
            Filter Jobs
          </button>
        </motion.div>

        {/* 🔹 Active Filters */}
        {selectedLocations.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-4 flex flex-wrap gap-2"
          >
            {selectedLocations.map((location) => (
              <span
                key={location}
                className="px-3 py-1 bg-purple-100 text-[#6A38C2] text-sm rounded-full"
              >
                {location}
              </span>
            ))}
          </motion.div>
        )}

        {/* 🔹 Jobs Grid */}
        {filteredJobs.length === 0 ? (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-gray-500"
          >
            No Jobs Found
          </motion.p>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {filteredJobs.map((job) => (
              <motion.div key={job._id} variants={itemVariants}>
                <Job job={job} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </motion.div>

      {/* 🔹 Filter Overlay */}
      {isFilterOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
        >
          <FilterCard
            onApply={(locations) => setSelectedLocations(locations)}
            onClose={() => setIsFilterOpen(false)}
          />
        </motion.div>
      )}
    </>
  );
};

export default Jobs;
