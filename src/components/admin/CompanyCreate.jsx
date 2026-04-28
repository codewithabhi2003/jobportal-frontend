import React, { useState } from "react";
import Navbar from "../shared/Navbar";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { COMPANY_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { setSingleCompany } from "@/redux/companySlice";
import { Building2, ArrowRight, X } from "lucide-react";

const CompanyCreate = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [companyName, setCompanyName] = useState("");

  const registerNewCompany = async () => {
    if (!companyName.trim()) {
      toast.error("Company name cannot be empty");
      return;
    }
    try {
      const res = await axios.post(
        `${COMPANY_API_END_POINT}/register`,
        { companyName },
        { headers: { "Content-Type": "application/json" }, withCredentials: true }
      );
      if (res?.data?.success) {
        dispatch(setSingleCompany(res.data.company));
        toast.success(res.data.message);
        navigate(`/admin/companies/${res.data.company?._id}`);
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@500;700;800;900&family=Outfit:wght@400;500;600&display=swap');
        .cc-page {
          min-height: 100vh;
          background: #f9f5ff;
          font-family: 'Outfit', sans-serif;
          position: relative; overflow: hidden;
        }
        .cc-dots {
          position: fixed; inset: 0; pointer-events: none; opacity: 0.45;
          background-image: radial-gradient(circle, rgba(114,9,183,0.18) 1px, transparent 1px);
          background-size: 28px 28px; z-index: 0;
        }
        .cc-blob1 {
          position: fixed; top: -100px; right: -80px;
          width: 420px; height: 420px; border-radius: 50%;
          background: radial-gradient(circle, rgba(114,9,183,0.08) 0%, transparent 70%);
          pointer-events: none; z-index: 0;
        }
        .cc-blob2 {
          position: fixed; bottom: -80px; left: -60px;
          width: 340px; height: 340px; border-radius: 50%;
          background: radial-gradient(circle, rgba(114,9,183,0.05) 0%, transparent 70%);
          pointer-events: none; z-index: 0;
        }
        .cc-body {
          position: relative; z-index: 1;
          padding: calc(66px + 2.5rem) 1rem 3rem;
          display: flex; justify-content: center;
        }
        .cc-card {
          background: #ffffff;
          border: 1px solid rgba(114,9,183,0.12);
          border-radius: 24px;
          padding: 2.5rem 2rem;
          width: 100%; max-width: 520px;
          box-shadow: 0 12px 40px rgba(114,9,183,0.1), 0 2px 8px rgba(0,0,0,0.04);
          position: relative;
        }
        .cc-card::before {
          content: '';
          position: absolute; top: 0; left: 0; right: 0; height: 3px;
          background: linear-gradient(90deg, #7209b7, #b44bf7);
          border-radius: 24px 24px 0 0;
        }
        .cc-icon-wrap {
          width: 52px; height: 52px; border-radius: 14px;
          background: rgba(114,9,183,0.1);
          display: flex; align-items: center; justify-content: center;
          color: #7209b7; margin-bottom: 1.25rem;
        }
        .cc-title {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: clamp(1.4rem, 4vw, 1.75rem);
          font-weight: 900; color: #18003a;
          letter-spacing: -0.03em; margin: 0 0 0.5rem;
        }
        .cc-sub {
          color: #6b7280; font-size: 0.9rem;
          line-height: 1.65; margin: 0 0 2rem;
        }
        .cc-label {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 0.8rem; font-weight: 700;
          color: #18003a; letter-spacing: 0.04em;
          text-transform: uppercase; display: block;
          margin-bottom: 0.5rem;
        }
        .cc-input {
          font-family: 'Outfit', sans-serif;
          font-size: 0.95rem; color: #18003a;
          width: 100%; padding: 0.75rem 1rem;
          border: 1.5px solid rgba(114,9,183,0.2);
          border-radius: 12px; background: #fdfaff;
          outline: none;
          transition: border-color 0.2s, box-shadow 0.2s;
          box-sizing: border-box;
        }
        .cc-input::placeholder { color: #c4b5d0; }
        .cc-input:focus {
          border-color: #7209b7;
          box-shadow: 0 0 0 3px rgba(114,9,183,0.1);
          background: #fff;
        }
        .cc-actions {
          display: flex; gap: 0.75rem; margin-top: 2rem;
          flex-wrap: wrap;
        }
        .cc-cancel {
          font-family: 'Outfit', sans-serif;
          font-size: 0.9rem; font-weight: 600;
          padding: 0.7rem 1.4rem;
          border: 1.5px solid rgba(114,9,183,0.22);
          border-radius: 12px; background: transparent;
          color: #7209b7; cursor: pointer;
          transition: all 0.2s;
          display: flex; align-items: center; gap: 6px;
          flex: 1;
          justify-content: center;
        }
        .cc-cancel:hover { background: rgba(114,9,183,0.06); border-color: #7209b7; }
        .cc-continue {
          font-family: 'Outfit', sans-serif;
          font-size: 0.9rem; font-weight: 600;
          padding: 0.7rem 1.4rem;
          border: none; border-radius: 12px;
          background: #7209b7; color: #fff;
          cursor: pointer;
          transition: all 0.2s;
          display: flex; align-items: center; gap: 6px;
          box-shadow: 0 4px 14px rgba(114,9,183,0.3);
          flex: 1;
          justify-content: center;
        }
        .cc-continue:hover {
          background: #5c0799;
          transform: translateY(-1px);
          box-shadow: 0 6px 20px rgba(114,9,183,0.4);
        }
        @media (max-width: 480px) {
          .cc-card { padding: 2rem 1.25rem; }
        }
      `}</style>

      <div className="cc-page">
        <Navbar />
        <div className="cc-dots" />
        <div className="cc-blob1" />
        <div className="cc-blob2" />

        <div className="cc-body">
          <div className="cc-card">
            <div className="cc-icon-wrap">
              <Building2 size={24} />
            </div>
            <h1 className="cc-title">Create Your Company</h1>
            <p className="cc-sub">
              Enter a unique name for your company. You can always update your
              company details — logo, description, and more — after creation.
            </p>

            <label className="cc-label">Company Name</label>
            <input
              className="cc-input"
              type="text"
              placeholder="e.g. Razorpay, Zepto, Microsoft…"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && registerNewCompany()}
            />

            <div className="cc-actions">
              <button
                className="cc-cancel"
                onClick={() => navigate("/admin/companies")}
              >
                <X size={15} /> Cancel
              </button>
              <button className="cc-continue" onClick={registerNewCompany}>
                Continue <ArrowRight size={15} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CompanyCreate;