import React from "react";
import { useSelector } from "react-redux";
import LatestJobCards from "./LatestJobCards";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const LatestJobs = () => {
  const { allJobs } = useSelector((store) => store.job);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@500;700;800&family=Outfit:wght@400;500;600&display=swap');
        .lj-section {
          background: #f9f5ff;
          padding: 5rem 1.5rem;
          font-family: 'Outfit', sans-serif;
          position: relative;
        }
        .lj-topline {
          position: absolute; top: 0; left: 0; right: 0; height: 1px;
          background: linear-gradient(90deg, transparent, rgba(114,9,183,0.12), transparent);
        }
        .lj-inner { max-width: 1280px; margin: 0 auto; }

        .lj-head {
          display: flex; align-items: flex-end; justify-content: space-between;
          flex-wrap: wrap; gap: 1rem; margin-bottom: 2.5rem;
        }
        .lj-eyebrow {
          display: inline-flex; align-items: center; gap: 7px;
          background: rgba(114,9,183,0.06); border: 1px solid rgba(114,9,183,0.16);
          border-radius: 999px; padding: 0.3rem 0.85rem;
          color: #7209b7; font-size: 0.75rem; font-weight: 600;
          letter-spacing: 0.05em; text-transform: uppercase; margin-bottom: 0.7rem;
        }
        .lj-title {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: clamp(1.55rem, 2.8vw, 2.1rem);
          font-weight: 800; color: #18003a;
          letter-spacing: -0.03em; margin: 0;
        }
        .lj-title-grad {
          background: linear-gradient(135deg, #7209b7, #b44bf7);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .lj-view-all {
          display: inline-flex; align-items: center; gap: 6px;
          color: #7209b7; font-size: 0.875rem; font-weight: 600;
          text-decoration: none;
          border: 1.5px solid rgba(114,9,183,0.25);
          border-radius: 9px; padding: 0.5rem 1rem;
          font-family: 'Outfit', sans-serif;
          transition: all 0.2s; white-space: nowrap;
          background: #fff;
        }
        .lj-view-all:hover {
          border-color: #7209b7; background: rgba(114,9,183,0.04);
        }

        .lj-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.15rem;
        }
        @media (max-width: 880px) { .lj-grid { grid-template-columns: repeat(2,1fr); } }
        @media (max-width: 540px) { .lj-grid { grid-template-columns: 1fr; } }

        .lj-empty {
          grid-column: 1/-1; text-align: center;
          padding: 4rem 1rem;
          color: #9ca3af; font-size: 0.95rem;
        }
      `}</style>

      <section className="lj-section">
        <div className="lj-topline" />
        <div className="lj-inner">
          <div className="lj-head">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.42 }}
            >
              <div className="lj-eyebrow">
                <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#f72585", display: "inline-block" }} />
                Fresh Opportunities
              </div>
              <h2 className="lj-title">
                Latest <span className="lj-title-grad">Job Openings</span>
              </h2>
            </motion.div>

            <Link to="/jobs" className="lj-view-all">
              View All <ArrowRight size={15} />
            </Link>
          </div>

          <div className="lj-grid">
            {allJobs?.length === 0 ? (
              <p className="lj-empty">No jobs available right now. Check back soon.</p>
            ) : (
              allJobs?.slice(0, 6).map((job, i) => (
                <LatestJobCards key={job._id} job={job} index={i} />
              ))
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default LatestJobs;