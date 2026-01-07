import React, { useEffect } from 'react'
import Navbar from './shared/Navbar'
import HeroSection from './HeroSection'
import About from './About'
import LatestJobs from './LatestJobs'
import Footer from './shared/Footer'
import useGetAllJobs from '@/hooks/useGetAllJobs'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

const Home = () => {
  useGetAllJobs();
  const { user } = useSelector(store => store.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.role === 'Recruiter') {
      navigate("/admin/companies");
    }
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col min-h-screen"
    >
      <Navbar />

      {/* 🔹 Reduced vertical spacing */}
      <main className="flex-1">
        <div className="mt-0">
          <HeroSection />
        </div>

        <div className="mt-8 sm:mt-10">
          <About />
        </div>

        <div className="mt-10 sm:mt-12">
          <LatestJobs />
        </div>
      </main>

      <Footer />
    </motion.div>
  )
}

export default Home
