import React, { useEffect } from "react";
import Navbar from "../shared/Navbar";
import ApplicantsTable from "./ApplicantsTable";
import axios from "axios";
import { APPLICATION_API_END_POINT } from "@/utils/constant";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setAllApplicants } from "@/redux/applicationSlice";
import { Users } from "lucide-react";

const Applicants = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const { applicants } = useSelector((store) => store.application);

  useEffect(() => {
    const fetchAllApplicants = async () => {
      try {
        const res = await axios.get(
          `${APPLICATION_API_END_POINT}/${params.id}/applicants`,
          { withCredentials: true }
        );
        dispatch(setAllApplicants(res.data.job));
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllApplicants();
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@500;700;800;900&family=Outfit:wght@400;500;600&display=swap');
        .ap-page {
          min-height: 100vh;
          background: #f9f5ff;
          font-family: 'Outfit', sans-serif;
          position: relative; overflow: hidden;
        }
        .ap-dots {
          position: fixed; inset: 0; pointer-events: none; opacity: 0.45;
          background-image: radial-gradient(circle, rgba(114,9,183,0.18) 1px, transparent 1px);
          background-size: 28px 28px; z-index: 0;
        }
        .ap-blob1 {
          position: fixed; top: -100px; right: -80px;
          width: 420px; height: 420px; border-radius: 50%;
          background: radial-gradient(circle, rgba(114,9,183,0.08) 0%, transparent 70%);
          pointer-events: none; z-index: 0;
        }
        .ap-blob2 {
          position: fixed; bottom: -80px; left: -60px;
          width: 340px; height: 340px; border-radius: 50%;
          background: radial-gradient(circle, rgba(114,9,183,0.05) 0%, transparent 70%);
          pointer-events: none; z-index: 0;
        }
        .ap-body {
          position: relative; z-index: 1;
          max-width: 1280px; margin: 0 auto;
          padding: calc(66px + 2rem) 1.5rem 3rem;
        }
        .ap-topbar {
          display: flex; align-items: center;
          gap: 1rem; margin-bottom: 1.75rem;
          flex-wrap: wrap;
        }
        .ap-heading {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 1.75rem; font-weight: 900;
          color: #18003a; letter-spacing: -0.03em;
          display: flex; align-items: center; gap: 10px;
          margin: 0;
        }
        .ap-heading-icon {
          width: 38px; height: 38px; border-radius: 10px;
          background: rgba(114,9,183,0.1);
          display: flex; align-items: center; justify-content: center;
          color: #7209b7;
        }
        .ap-count {
          display: inline-flex; align-items: center;
          padding: 0.25rem 0.85rem;
          background: rgba(114,9,183,0.08);
          border: 1px solid rgba(114,9,183,0.18);
          border-radius: 999px;
          font-family: 'Outfit', sans-serif;
          font-size: 0.82rem; font-weight: 600;
          color: #7209b7;
        }
      `}</style>

      <div className="ap-page">
        <Navbar />
        <div className="ap-dots" />
        <div className="ap-blob1" />
        <div className="ap-blob2" />

        <div className="ap-body">
          <div className="ap-topbar">
            <h1 className="ap-heading">
              <span className="ap-heading-icon">
                <Users size={18} />
              </span>
              Applicants
            </h1>
            {applicants?.applications?.length > 0 && (
              <span className="ap-count">
                {applicants.applications.length} total
              </span>
            )}
          </div>

          <ApplicantsTable />
        </div>
      </div>
    </>
  );
};

export default Applicants;