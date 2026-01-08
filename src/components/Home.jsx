import React, { useEffect } from 'react'
import Navbar from './shared/Navbar'
import HeroSection from './HeroSection'
import About from './About'
import LatestJobs from './LatestJobs'
import Footer from './shared/Footer'
import useGetAllJobs from '@/hooks/useGetAllJobs'
import { useSelector } from 'react-redux'
import { useNavigate, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'

const Home = () => {
  useGetAllJobs()

  const { user } = useSelector(store => store.auth)
  const navigate = useNavigate()
  const location = useLocation()

  /* 🔹 Redirect recruiter */
  useEffect(() => {
    if (user?.role === 'Recruiter') {
      navigate('/admin/companies')
    }
  }, [user, navigate])

  /* 🔹 Scroll to About section when coming from Navbar */
  useEffect(() => {
    if (location.state?.scrollTo === 'about') {
      const el = document.getElementById('about')
      if (el) {
        el.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        })
      }
    }
  }, [location])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="flex flex-col min-h-screen"
    >
      <Navbar />

      {/* 🔹 Main Content */}
      <main className="flex-1">
        {/* Hero */}
        <HeroSection />

        {/* About (below hero) */}
        <div className="mt-8 sm:mt-10">
          <About />
        </div>

        {/* Latest Jobs */}
        <div className="mt-10 sm:mt-12">
          <LatestJobs />
        </div>
      </main>

      <Footer />
    </motion.div>
  )
}

export default Home
