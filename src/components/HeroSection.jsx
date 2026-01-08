import React, { useState } from "react"
import { Button } from "./ui/button"
import { Search } from "lucide-react"
import { useDispatch } from "react-redux"
import { setSearchedQuery } from "@/redux/jobSlice"
import { useNavigate } from "react-router-dom"
import heroImage from "@/assets/hero.png"
import { motion } from "framer-motion"

const HeroSection = () => {
  const [query, setQuery] = useState("")
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const searchJobHandler = () => {
    dispatch(setSearchedQuery(query))
    navigate("/browse")
  }

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="relative w-full min-h-[calc(100vh-4rem)] bg-cover bg-center flex items-center"
      style={{ backgroundImage: `url(${heroImage})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/30"></div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 w-full">
        <div className="max-w-2xl space-y-6">

          {/* Badge */}
          <span className="inline-block px-4 py-2 rounded-full bg-white/90 text-[#6A38C2] font-semibold text-sm">
            No. 1 Job Hunt Website
          </span>

          {/* Heading */}
          <h1 className="text-white text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight">
            Search, Apply & Get <br />
            Your Dream Job
          </h1>

          {/* Description */}
          <p className="text-white/90 text-base sm:text-lg font-medium max-w-xl leading-relaxed">
            Find the perfect job that matches your skills and passion.
            Connect with top employers, apply with ease, and take the
            next step toward your dream career.
          </p>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="flex w-full sm:w-[90%] bg-white rounded-full shadow-xl overflow-hidden h-12 sm:h-14"
          >
            <input
              type="text"
              placeholder="Search jobs by title, skill, or company"
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1 px-5 text-sm sm:text-base outline-none font-medium"
            />

            <Button
              onClick={searchJobHandler}
              className="h-full px-6 bg-[#6A38C2] hover:bg-[#5a2ea4] rounded-none rounded-r-full"
            >
              <Search className="h-5 w-5 text-white" />
            </Button>
          </motion.div>

        </div>
      </div>
    </motion.section>
  )
}

export default HeroSection