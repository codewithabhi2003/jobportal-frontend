import { motion } from "motion/react";
import React, { useEffect } from "react";
import Navbar from "./shared/Navbar";
import HeroSection from "./HeroSection";
import About from "./About";
import LatestJobs from "./LatestJobs";
import Footer from "./shared/Footer";
import useGetAllJobs from "@/hooks/useGetAllJobs";
import { useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";


const NAV_H = 66; // must match Navbar height

const Home = () => {
  useGetAllJobs();
  const { user } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  const location = useLocation();

  /* Redirect recruiter */
  useEffect(() => {
    if (user?.role === "Recruiter") navigate("/admin/companies");
  }, [user, navigate]);

  /* Scroll to About when arriving via navbar "About" click */
  useEffect(() => {
    if (location.state?.scrollTo === "about") {
      setTimeout(() => {
        document.getElementById("about")?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    }
  }, [location]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      style={{ display: "flex", flexDirection: "column", minHeight: "100vh", background: "#f9f5ff" }}
    >
      {/* Fixed Navbar */}
      <Navbar />

      {/*
        ─── CRITICAL FIX ───────────────────────────────────────────────
        paddingTop pushes all page content below the fixed navbar.
        Without this the first section slides under the navbar.
        ────────────────────────────────────────────────────────────────
      */}
      <main style={{ flex: 1, paddingTop: NAV_H }}>
        <HeroSection />
        <About />
        <LatestJobs />
      </main>

      <Footer />
    </motion.div>
  );
};

export default Home;