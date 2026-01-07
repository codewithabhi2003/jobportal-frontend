import React, { useState, useEffect } from 'react';
import Navbar from './shared/Navbar';
import FilterCard from './FilterCard';
import Job from './Job';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';

const Jobs = () => {
  const { allJobs, searchedQuery } = useSelector(store => store.job);

  const [filteredJobs, setFilteredJobs] = useState([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedLocations, setSelectedLocations] = useState([]);

  /* ✅ RESET FILTERS ON PAGE LOAD / REFRESH */
  useEffect(() => {
    setSelectedLocations([]);
  }, []);

  /* ✅ MAIN FILTER LOGIC */
  useEffect(() => {
    let jobs = [...allJobs];

    // 🔍 Search filter
    if (searchedQuery) {
      const q = searchedQuery.toLowerCase();
      jobs = jobs.filter(job =>
        job?.title?.toLowerCase().includes(q) ||
        job?.description?.toLowerCase().includes(q) ||
        job?.location?.toLowerCase().includes(q)
      );
    }

    // 📍 Location filter (OR logic)
    if (selectedLocations.length > 0) {
      jobs = jobs.filter(job =>
        selectedLocations.some(location =>
          job?.location?.toLowerCase().includes(location.toLowerCase())
        )
      );
    }

    setFilteredJobs(jobs);
  }, [allJobs, searchedQuery, selectedLocations]);

  return (
    <div>
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 mt-4">

        {/* Filter Button */}
        <div className="mb-4">
          <button
            onClick={() => setIsFilterOpen(true)}
            className="px-4 py-2 bg-[#6A38C2] text-white rounded-md text-sm"
          >
            Filter Jobs
          </button>
        </div>

        {/* Active Filters */}
        {selectedLocations.length > 0 && (
          <div className="mb-4 flex flex-wrap gap-2">
            {selectedLocations.map(location => (
              <span
                key={location}
                className="px-3 py-1 bg-purple-100 text-[#6A38C2] text-sm rounded-full"
              >
                {location}
              </span>
            ))}
          </div>
        )}

        {/* Jobs */}
        {filteredJobs.length === 0 ? (
          <p className="text-gray-500">No Jobs Found</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredJobs.map(job => (
              <motion.div
                key={job._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Job job={job} />
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Filter Overlay */}
      {isFilterOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <FilterCard
            onApply={(locations) => setSelectedLocations(locations)}
            onClose={() => setIsFilterOpen(false)}
          />
        </div>
      )}
    </div>
  );
};

export default Jobs;
