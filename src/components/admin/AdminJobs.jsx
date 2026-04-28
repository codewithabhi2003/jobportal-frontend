import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { useNavigate } from "react-router-dom";
import { Search, Plus, Briefcase } from "lucide-react";
import { useDispatch } from "react-redux";
import AdminJobsTable from "./AdminJobsTable";
import useGetAllAdminJobs from "@/hooks/useGetAdminJobs";
import { setSearchJobByText } from "@/redux/jobSlice";

const AdminJobs = () => {
  useGetAllAdminJobs();
  const [input, setInput] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSearchJobByText(input));
  }, [input]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@500;700;800;900&family=Outfit:wght@400;500;600&display=swap');
        .aj-page {
          min-height: 100vh;
          background: #f9f5ff;
          font-family: 'Outfit', sans-serif;
          position: relative;
          overflow: hidden;
        }
        .aj-dots {
          position: fixed; inset: 0; pointer-events: none; opacity: 0.45;
          background-image: radial-gradient(circle, rgba(114,9,183,0.18) 1px, transparent 1px);
          background-size: 28px 28px; z-index: 0;
        }
        .aj-blob1 {
          position: fixed; top: -100px; right: -80px;
          width: 420px; height: 420px; border-radius: 50%;
          background: radial-gradient(circle, rgba(114,9,183,0.08) 0%, transparent 70%);
          pointer-events: none; z-index: 0;
        }
        .aj-blob2 {
          position: fixed; bottom: -80px; left: -60px;
          width: 340px; height: 340px; border-radius: 50%;
          background: radial-gradient(circle, rgba(114,9,183,0.05) 0%, transparent 70%);
          pointer-events: none; z-index: 0;
        }
        .aj-body {
          position: relative; z-index: 1;
          max-width: 1280px; margin: 0 auto;
          padding: 2rem 1.5rem 3rem;
          padding-top: calc(66px + 2rem);
        }
        .aj-topbar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 1rem;
          margin-bottom: 1.75rem;
        }
        .aj-heading {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 1.75rem; font-weight: 900;
          color: #18003a; letter-spacing: -0.03em;
          display: flex; align-items: center; gap: 10px;
          margin: 0;
        }
        .aj-heading-icon {
          width: 38px; height: 38px; border-radius: 10px;
          background: rgba(114,9,183,0.1);
          display: flex; align-items: center; justify-content: center;
          color: #7209b7;
        }
        .aj-controls {
          display: flex; align-items: center; gap: 0.75rem; flex-wrap: wrap;
        }
        .aj-search-wrap {
          position: relative;
          display: flex; align-items: center;
        }
        .aj-search-icon {
          position: absolute; left: 12px;
          color: #b084d8; pointer-events: none;
          display: flex; align-items: center;
        }
        .aj-search-input {
          font-family: 'Outfit', sans-serif;
          font-size: 0.875rem;
          padding: 0.6rem 1rem 0.6rem 2.5rem;
          border: 1.5px solid rgba(114,9,183,0.2);
          border-radius: 11px;
          background: #fff;
          color: #18003a;
          outline: none;
          width: 240px;
          transition: border-color 0.2s, box-shadow 0.2s;
          box-shadow: 0 2px 8px rgba(114,9,183,0.06);
        }
        .aj-search-input::placeholder { color: #b0b8c9; }
        .aj-search-input:focus {
          border-color: #7209b7;
          box-shadow: 0 0 0 3px rgba(114,9,183,0.1);
        }
        .aj-new-btn {
          font-family: 'Outfit', sans-serif;
          font-size: 0.875rem; font-weight: 600;
          padding: 0.6rem 1.2rem;
          background: #7209b7; color: #fff;
          border: none; border-radius: 11px;
          cursor: pointer;
          display: flex; align-items: center; gap: 7px;
          box-shadow: 0 3px 12px rgba(114,9,183,0.3);
          transition: all 0.2s;
          white-space: nowrap;
        }
        .aj-new-btn:hover {
          background: #5c0799;
          transform: translateY(-1px);
          box-shadow: 0 5px 18px rgba(114,9,183,0.4);
        }
      `}</style>

      <div className="aj-page">
        <Navbar />
        <div className="aj-dots" />
        <div className="aj-blob1" />
        <div className="aj-blob2" />

        <div className="aj-body">
          <div className="aj-topbar">
            <h1 className="aj-heading">
              <span className="aj-heading-icon">
                <Briefcase size={18} />
              </span>
              Posted Jobs
            </h1>

            <div className="aj-controls">
              <div className="aj-search-wrap">
                <span className="aj-search-icon"><Search size={15} /></span>
                <input
                  className="aj-search-input"
                  placeholder="Search by role or company…"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                />
              </div>
              <button
                className="aj-new-btn"
                onClick={() => navigate("/admin/jobs/create")}
              >
                <Plus size={16} /> New Job
              </button>
            </div>
          </div>

          <AdminJobsTable />
        </div>
      </div>
    </>
  );
};

export default AdminJobs;