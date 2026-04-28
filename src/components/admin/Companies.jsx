import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import CompaniesTable from "./CompaniesTable";
import { useNavigate } from "react-router-dom";
import useGetAllCompanies from "@/hooks/useGetAllCompanies";
import { Search, Plus, Building2 } from "lucide-react";
import { useDispatch } from "react-redux";
import { setSearchCompanyByText } from "@/redux/companySlice";

const Companies = () => {
  useGetAllCompanies();
  const [input, setInput] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSearchCompanyByText(input));
  }, [input]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@500;700;800;900&family=Outfit:wght@400;500;600&display=swap');
        .ac-page {
          min-height: 100vh;
          background: #f9f5ff;
          font-family: 'Outfit', sans-serif;
          position: relative; overflow: hidden;
        }
        .ac-dots {
          position: fixed; inset: 0; pointer-events: none; opacity: 0.45;
          background-image: radial-gradient(circle, rgba(114,9,183,0.18) 1px, transparent 1px);
          background-size: 28px 28px; z-index: 0;
        }
        .ac-blob1 {
          position: fixed; top: -100px; right: -80px;
          width: 420px; height: 420px; border-radius: 50%;
          background: radial-gradient(circle, rgba(114,9,183,0.08) 0%, transparent 70%);
          pointer-events: none; z-index: 0;
        }
        .ac-blob2 {
          position: fixed; bottom: -80px; left: -60px;
          width: 340px; height: 340px; border-radius: 50%;
          background: radial-gradient(circle, rgba(114,9,183,0.05) 0%, transparent 70%);
          pointer-events: none; z-index: 0;
        }
        .ac-body {
          position: relative; z-index: 1;
          max-width: 1280px; margin: 0 auto;
          padding: calc(66px + 2rem) 1.5rem 3rem;
        }
        .ac-topbar {
          display: flex; align-items: center;
          justify-content: space-between;
          flex-wrap: wrap; gap: 1rem;
          margin-bottom: 1.75rem;
        }
        .ac-heading {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 1.75rem; font-weight: 900;
          color: #18003a; letter-spacing: -0.03em;
          display: flex; align-items: center; gap: 10px;
          margin: 0;
        }
        .ac-heading-icon {
          width: 38px; height: 38px; border-radius: 10px;
          background: rgba(114,9,183,0.1);
          display: flex; align-items: center; justify-content: center;
          color: #7209b7;
        }
        .ac-controls { display: flex; align-items: center; gap: 0.75rem; flex-wrap: wrap; }
        .ac-search-wrap { position: relative; display: flex; align-items: center; }
        .ac-search-icon {
          position: absolute; left: 12px;
          color: #b084d8; pointer-events: none;
          display: flex; align-items: center;
        }
        .ac-search-input {
          font-family: 'Outfit', sans-serif;
          font-size: 0.875rem;
          padding: 0.6rem 1rem 0.6rem 2.5rem;
          border: 1.5px solid rgba(114,9,183,0.2);
          border-radius: 11px;
          background: #fff; color: #18003a;
          outline: none; width: 240px;
          transition: border-color 0.2s, box-shadow 0.2s;
          box-shadow: 0 2px 8px rgba(114,9,183,0.06);
        }
        .ac-search-input::placeholder { color: #b0b8c9; }
        .ac-search-input:focus {
          border-color: #7209b7;
          box-shadow: 0 0 0 3px rgba(114,9,183,0.1);
        }
        .ac-new-btn {
          font-family: 'Outfit', sans-serif;
          font-size: 0.875rem; font-weight: 600;
          padding: 0.6rem 1.2rem;
          background: #7209b7; color: #fff;
          border: none; border-radius: 11px;
          cursor: pointer;
          display: flex; align-items: center; gap: 7px;
          box-shadow: 0 3px 12px rgba(114,9,183,0.3);
          transition: all 0.2s; white-space: nowrap;
        }
        .ac-new-btn:hover {
          background: #5c0799;
          transform: translateY(-1px);
          box-shadow: 0 5px 18px rgba(114,9,183,0.4);
        }
      `}</style>

      <div className="ac-page">
        <Navbar />
        <div className="ac-dots" />
        <div className="ac-blob1" />
        <div className="ac-blob2" />

        <div className="ac-body">
          <div className="ac-topbar">
            <h1 className="ac-heading">
              <span className="ac-heading-icon">
                <Building2 size={18} />
              </span>
              Companies
            </h1>

            <div className="ac-controls">
              <div className="ac-search-wrap">
                <span className="ac-search-icon"><Search size={15} /></span>
                <input
                  className="ac-search-input"
                  placeholder="Search by name…"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                />
              </div>
              <button
                className="ac-new-btn"
                onClick={() => navigate("/admin/companies/create")}
              >
                <Plus size={16} /> New Company
              </button>
            </div>
          </div>

          <CompaniesTable />
        </div>
      </div>
    </>
  );
};

export default Companies;