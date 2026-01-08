// src/components/About.jsx
import React from "react";
import {
  Briefcase,
  Users,
  Rocket,
  Search,
  ShieldCheck,
  TrendingUp,
} from "lucide-react";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.18 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: "easeOut" },
  },
};

const About = () => {
  return (
    <section id="about" className="bg-white py-10 sm:py-14">
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
            professionals with trusted companies through a simple and reliable
            experience.
          </p>
        </motion.div>

        {/* Features */}
        <motion.div
          variants={containerVariants}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8 sm:mt-10"
        >
          {/* Card 1 */}
          <motion.div
            variants={itemVariants}
            whileHover={{ y: -6 }}
            className="p-6 border border-gray-200 rounded-xl shadow-sm hover:shadow-lg hover:ring-1 hover:ring-purple-200 transition bg-white"
          >
            <div className="w-12 h-12 flex items-center justify-center rounded-full bg-purple-100 text-[#6A38C2] mb-4">
              <Briefcase />
            </div>
            <h3 className="font-semibold text-lg">Find the Right Job</h3>
            <p className="text-sm text-gray-600 mt-2 leading-relaxed">
              Browse curated job listings tailored to your skills, interests,
              experience level, and long-term career goals.
            </p>
          </motion.div>

          {/* Card 2 */}
          <motion.div
            variants={itemVariants}
            whileHover={{ y: -6 }}
            className="p-6 border border-gray-200 rounded-xl shadow-sm hover:shadow-lg hover:ring-1 hover:ring-purple-200 transition bg-white"
          >
            <div className="w-12 h-12 flex items-center justify-center rounded-full bg-purple-100 text-[#6A38C2] mb-4">
              <Users />
            </div>
            <h3 className="font-semibold text-lg">Trusted Companies</h3>
            <p className="text-sm text-gray-600 mt-2 leading-relaxed">
              Connect with verified recruiters and trusted companies actively
              looking for skilled and motivated professionals.
            </p>
          </motion.div>

          {/* Card 3 */}
          <motion.div
            variants={itemVariants}
            whileHover={{ y: -6 }}
            className="p-6 border border-gray-200 rounded-xl shadow-sm hover:shadow-lg hover:ring-1 hover:ring-purple-200 transition bg-white"
          >
            <div className="w-12 h-12 flex items-center justify-center rounded-full bg-purple-100 text-[#6A38C2] mb-4">
              <Rocket />
            </div>
            <h3 className="font-semibold text-lg">Grow Your Career</h3>
            <p className="text-sm text-gray-600 mt-2 leading-relaxed">
              Apply seamlessly, prepare confidently, and take meaningful steps
              toward professional growth and long-term success.
            </p>
          </motion.div>

          {/* Card 4 */}
          <motion.div
            variants={itemVariants}
            whileHover={{ y: -6 }}
            className="p-6 border border-gray-200 rounded-xl shadow-sm hover:shadow-lg hover:ring-1 hover:ring-purple-200 transition bg-white"
          >
            <div className="w-12 h-12 flex items-center justify-center rounded-full bg-purple-100 text-[#6A38C2] mb-4">
              <TrendingUp />
            </div>
            <h3 className="font-semibold text-lg">Track Applications</h3>
            <p className="text-sm text-gray-600 mt-2 leading-relaxed">
              Monitor all your job applications in real time with clear status
              updates and organized tracking.
            </p>
          </motion.div>

          {/* Card 5 */}
          <motion.div
            variants={itemVariants}
            whileHover={{ y: -6 }}
            className="p-6 border border-gray-200 rounded-xl shadow-sm hover:shadow-lg hover:ring-1 hover:ring-purple-200 transition bg-white"
          >
            <div className="w-12 h-12 flex items-center justify-center rounded-full bg-purple-100 text-[#6A38C2] mb-4">
              <Search />
            </div>
            <h3 className="font-semibold text-lg">Smart Job Search</h3>
            <p className="text-sm text-gray-600 mt-2 leading-relaxed">
              Quickly filter and search jobs by role, location, experience,
              and preferences for faster results.
            </p>
          </motion.div>

          {/* Card 6 */}
          <motion.div
            variants={itemVariants}
            whileHover={{ y: -6 }}
            className="p-6 border border-gray-200 rounded-xl shadow-sm hover:shadow-lg hover:ring-1 hover:ring-purple-200 transition bg-white"
          >
            <div className="w-12 h-12 flex items-center justify-center rounded-full bg-purple-100 text-[#6A38C2] mb-4">
              <ShieldCheck />
            </div>
            <h3 className="font-semibold text-lg">Secure & Reliable</h3>
            <p className="text-sm text-gray-600 mt-2 leading-relaxed">
              Your personal data is protected using secure authentication,
              reliable infrastructure, and best security practices.
            </p>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default About;
