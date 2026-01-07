import React from 'react';
import LatestJobCards from './LatestJobCards';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { Button } from './ui/button';
import { useNavigate } from 'react-router-dom';

/* 🔹 Motion Variants */
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: 'easeOut' },
  },
};

const LatestJobs = () => {
  const { allJobs } = useSelector(store => store.job);
  const navigate = useNavigate();

  return (
    <div className='max-w-7xl mx-auto my-12 sm:my-16 lg:my-20 px-4 sm:px-6'>
      
      {/* 🔹 Animated Heading */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        viewport={{ once: true }}
        className='text-2xl sm:text-3xl lg:text-4xl font-bold'
      >
        <span className='text-[#6A38C2]'>Latest & Top </span>
        Job Openings
      </motion.h1>

      {/* 🔹 Animated Cards */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 my-4 sm:my-5'
      >
        {allJobs.length <= 0 ? (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-sm sm:text-base text-gray-500"
          >
            No Job Available
          </motion.span>
        ) : (
          allJobs.slice(0, 3).map((job) => (
            <motion.div key={job._id} variants={cardVariants}>
              <LatestJobCards job={job} />
            </motion.div>
          ))
        )}
      </motion.div>

      {/* 🔹 View More Button */}
      {allJobs.length > 3 && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex justify-center mt-6"
        >
          <Button
            onClick={() => navigate('/jobs')}
            className="bg-[#6A38C2] hover:bg-[#5b30a6] text-white px-6 py-2 rounded-lg"
          >
            View More Jobs →
          </Button>
        </motion.div>
      )}
    </div>
  );
};

export default LatestJobs;
