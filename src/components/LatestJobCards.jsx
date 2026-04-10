import React from "react";
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarImage } from "./ui/avatar";
import { MapPin, Clock, IndianRupee, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

const LatestJobCards = ({ job, index }) => {
  const navigate = useNavigate();

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&family=Outfit:wght@300;400;500;600&display=swap');
        .jc-card {
          background: rgba(255,255,255,0.025);
          border: 1px solid rgba(114,9,183,0.15);
          border-radius: 16px;
          padding: 1.4rem 1.35rem;
          cursor: pointer; position: relative; overflow: hidden;
          transition: all 0.28s cubic-bezier(0.4,0,0.2,1);
          font-family: 'Outfit', sans-serif;
          display: flex; flex-direction: column; gap: 0;
        }
        .jc-card::before {
          content: ''; position: absolute; top: 0; left: 0; right: 0; height: 2px;
          background: linear-gradient(90deg, #7209b7, #c77dff, #f72585);
          opacity: 0; transition: opacity 0.3s;
          border-radius: 16px 16px 0 0;
        }
        .jc-card:hover {
          border-color: rgba(114,9,183,0.4);
          background: rgba(114,9,183,0.06);
          transform: translateY(-6px);
          box-shadow: 0 20px 50px rgba(114,9,183,0.18), 0 0 0 1px rgba(114,9,183,0.1);
        }
        .jc-card:hover::before { opacity: 1; }

        .jc-top { display: flex; align-items: flex-start; justify-content: space-between; margin-bottom: 1rem; }
        .jc-co { display: flex; align-items: center; gap: 10px; }
        .jc-avatar {
          width: 42px; height: 42px; border-radius: 10px;
          border: 1px solid rgba(114,9,183,0.2);
          overflow: hidden; flex-shrink: 0;
          background: rgba(114,9,183,0.1);
          display: flex; align-items: center; justify-content: center;
        }
        .jc-co-name {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 0.9rem; font-weight: 600; color: #f0e8ff;
          line-height: 1.2;
        }
        .jc-co-loc {
          display: flex; align-items: center; gap: 4px;
          color: rgba(240,232,255,0.35); font-size: 0.72rem; margin-top: 1px;
        }
        .jc-arrow-btn {
          width: 32px; height: 32px; border-radius: 8px;
          background: rgba(114,9,183,0.1); border: 1px solid rgba(114,9,183,0.2);
          display: flex; align-items: center; justify-content: center;
          color: rgba(199,125,255,0.6); flex-shrink: 0;
          transition: all 0.2s;
        }
        .jc-card:hover .jc-arrow-btn {
          background: rgba(114,9,183,0.2); color: #c77dff;
          border-color: rgba(114,9,183,0.4);
        }

        .jc-title {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 1.02rem; font-weight: 700; color: #f0e8ff;
          letter-spacing: -0.01em; margin-bottom: 0.4rem;
          transition: color 0.2s;
        }
        .jc-card:hover .jc-title { color: #c77dff; }
        .jc-desc {
          color: rgba(240,232,255,0.38); font-size: 0.81rem;
          line-height: 1.65; margin-bottom: 1rem;
          display: -webkit-box; -webkit-line-clamp: 2;
          -webkit-box-orient: vertical; overflow: hidden;
        }

        .jc-meta {
          display: flex; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 1rem;
        }
        .jc-meta-item {
          display: flex; align-items: center; gap: 4px;
          color: rgba(240,232,255,0.45); font-size: 0.75rem;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 6px; padding: 0.25rem 0.6rem;
        }

        .jc-footer { display: flex; align-items: center; justify-content: space-between; margin-top: auto; padding-top: 0.85rem; border-top: 1px solid rgba(114,9,183,0.1); }
        .jc-badges { display: flex; gap: 0.4rem; flex-wrap: wrap; }
        .jc-badge {
          padding: 0.22rem 0.65rem; border-radius: 6px;
          font-size: 0.72rem; font-weight: 500;
          font-family: 'Outfit', sans-serif;
        }
        .jc-badge-type {
          background: rgba(114,9,183,0.12);
          border: 1px solid rgba(114,9,183,0.25);
          color: #c77dff;
        }
        .jc-badge-pos {
          background: rgba(247,37,133,0.08);
          border: 1px solid rgba(247,37,133,0.2);
          color: #f77cb7;
        }
        .jc-salary {
          display: flex; align-items: center; gap: 3px;
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 0.9rem; font-weight: 700;
          color: #a78bfa;
        }
        .jc-salary-lbl { color: rgba(240,232,255,0.3); font-size: 0.68rem; font-weight: 400; }
      `}</style>

      <motion.div
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: index * 0.07, ease: "easeOut" }}
        whileHover={{ y: -6 }}
        className="jc-card"
        onClick={() => navigate(`/description/${job._id}`)}
      >
        {/* Top row */}
        <div className="jc-top">
          <div className="jc-co">
            <div className="jc-avatar">
              <Avatar style={{ width: "100%", height: "100%", borderRadius: 0 }}>
                <AvatarImage src={job?.company?.logo} />
              </Avatar>
            </div>
            <div>
              <div className="jc-co-name">{job?.company?.name}</div>
              <div className="jc-co-loc">
                <MapPin size={11} />
                India
              </div>
            </div>
          </div>
          <div className="jc-arrow-btn">
            <ArrowUpRight size={14} />
          </div>
        </div>

        {/* Job title & desc */}
        <div className="jc-title">{job?.title}</div>
        <p className="jc-desc">{job?.description}</p>

        {/* Meta info */}
        <div className="jc-meta">
          <span className="jc-meta-item">
            <Clock size={12} /> Full-time
          </span>
          <span className="jc-meta-item">
            <MapPin size={12} /> On-site
          </span>
        </div>

        {/* Footer */}
        <div className="jc-footer">
          <div className="jc-badges">
            <span className="jc-badge jc-badge-type">{job?.jobType}</span>
            <span className="jc-badge jc-badge-pos">{job?.position} Positions</span>
          </div>
          <div>
            <div className="jc-salary">
              <IndianRupee size={13} />
              {job?.salary} LPA
            </div>
            <div className="jc-salary-lbl" style={{ textAlign: "right" }}>Salary</div>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default LatestJobCards;