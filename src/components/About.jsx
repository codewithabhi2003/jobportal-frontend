import React from "react";
import { Briefcase, Users, Rocket } from "lucide-react";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const About = () => {
  return (
    <section className="bg-white py-12 sm:py-16">
      <motion.div
        className="max-w-7xl mx-auto px-4 sm:px-6"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {/* Heading */}
        <motion.div
          variants={itemVariants}
          className="text-center max-w-3xl mx-auto"
        >
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">
            About <span className="text-[#6A38C2]">JobPortal</span>
          </h2>
          <p className="mt-4 text-gray-600 text-sm sm:text-base">
            JobPortal is a modern job-hunting platform designed to connect talented
            professionals with trusted companies. We make job searching simple,
            fast, and effective.
          </p>
        </motion.div>

        {/* Features */}
        <motion.div
          variants={containerVariants}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10"
        >
          {/* Feature 1 */}
          <motion.div
            variants={itemVariants}
            whileHover={{ y: -6 }}
            className="p-6 border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition bg-white"
          >
            <div className="w-12 h-12 flex items-center justify-center rounded-full bg-purple-100 text-[#6A38C2] mb-4">
              <Briefcase />
            </div>
            <h3 className="font-semibold text-lg text-gray-900">
              Find the Right Job
            </h3>
            <p className="text-sm text-gray-600 mt-2">
              Browse thousands of job listings tailored to your skills, experience,
              and career goals.
            </p>
          </motion.div>

          {/* Feature 2 */}
          <motion.div
            variants={itemVariants}
            whileHover={{ y: -6 }}
            className="p-6 border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition bg-white"
          >
            <div className="w-12 h-12 flex items-center justify-center rounded-full bg-purple-100 text-[#6A38C2] mb-4">
              <Users />
            </div>
            <h3 className="font-semibold text-lg text-gray-900">
              Trusted Companies
            </h3>
            <p className="text-sm text-gray-600 mt-2">
              Connect with verified recruiters and companies looking for genuine
              talent.
            </p>
          </motion.div>

          {/* Feature 3 */}
          <motion.div
            variants={itemVariants}
            whileHover={{ y: -6 }}
            className="p-6 border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition bg-white"
          >
            <div className="w-12 h-12 flex items-center justify-center rounded-full bg-purple-100 text-[#6A38C2] mb-4">
              <Rocket />
            </div>
            <h3 className="font-semibold text-lg text-gray-900">
              Grow Your Career
            </h3>
            <p className="text-sm text-gray-600 mt-2">
              Apply easily, track applications, and take the next step toward your
              dream career.
            </p>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default About;
