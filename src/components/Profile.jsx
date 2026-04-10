import React, { useState } from "react";
import Navbar from "./shared/Navbar";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Contact, Mail, Pen, FileText, Star } from "lucide-react";
import AppliedJobTable from "./AppliedJobTable";
import UpdateProfileDialog from "./UpdateProfileDialog";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { useSelector } from "react-redux";
import useGetAppliedJobs from "@/hooks/useGetAppliedJobs";

const Profile = () => {
  useGetAppliedJobs();
  const [openEdit, setOpenEdit] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);
  const { user } = useSelector((store) => store.auth);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@500;700;800;900&family=Outfit:wght@400;500;600&display=swap');

        .prof-page {
          min-height: 100vh;
          background: #f9f5ff;
          font-family: 'Outfit', sans-serif;
          position: relative;
          overflow: hidden;
        }
        .prof-dots {
          position: fixed; inset: 0; pointer-events: none; opacity: 0.45;
          background-image: radial-gradient(circle, rgba(114,9,183,0.18) 1px, transparent 1px);
          background-size: 28px 28px;
          z-index: 0;
        }
        .prof-blob1 {
          position: fixed; top: -100px; right: -80px;
          width: 420px; height: 420px; border-radius: 50%;
          background: radial-gradient(circle, rgba(114,9,183,0.08) 0%, transparent 70%);
          pointer-events: none; z-index: 0;
        }
        .prof-blob2 {
          position: fixed; bottom: -80px; left: -60px;
          width: 340px; height: 340px; border-radius: 50%;
          background: radial-gradient(circle, rgba(114,9,183,0.05) 0%, transparent 70%);
          pointer-events: none; z-index: 0;
        }
        .prof-body {
          position: relative; z-index: 1;
          max-width: 860px; margin: 0 auto;
          padding: 2rem 1rem 3rem;
        }

        /* Card */
        .prof-card {
          background: #fff;
          border: 1px solid rgba(114,9,183,0.13);
          border-radius: 20px;
          padding: 2rem;
          box-shadow: 0 10px 36px rgba(114,9,183,0.09), 0 2px 8px rgba(0,0,0,0.04);
          position: relative;
          margin-bottom: 1.5rem;
        }
        .prof-card::before {
          content: '';
          position: absolute; top: 0; left: 0; right: 0; height: 3px;
          background: linear-gradient(90deg, #7209b7, #b44bf7);
          border-radius: 20px 20px 0 0;
        }

        /* Top row */
        .prof-top {
          display: flex; align-items: flex-start;
          justify-content: space-between; gap: 1.2rem;
          flex-wrap: wrap;
        }
        .prof-avatar-wrap {
          width: 82px; height: 82px;
          border-radius: 50%;
          border: 3px solid #7209b7;
          overflow: hidden;
          cursor: pointer;
          flex-shrink: 0;
          transition: opacity 0.2s;
          box-shadow: 0 4px 16px rgba(114,9,183,0.22);
        }
        .prof-avatar-wrap:hover { opacity: 0.85; }
        .prof-name {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 1.35rem; font-weight: 800; color: #18003a;
          letter-spacing: -0.02em; margin-bottom: 3px;
        }
        .prof-bio {
          font-size: 0.85rem; color: #6b7280; line-height: 1.6; max-width: 480px;
        }
        .prof-edit-btn {
          display: inline-flex; align-items: center; gap: 7px;
          padding: 0.48rem 1.1rem;
          border-radius: 10px;
          border: 1.5px solid rgba(114,9,183,0.25);
          background: rgba(114,9,183,0.05);
          color: #7209b7;
          font-family: 'Outfit', sans-serif;
          font-size: 0.85rem; font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
          flex-shrink: 0;
        }
        .prof-edit-btn:hover {
          background: rgba(114,9,183,0.1);
          border-color: #7209b7;
        }

        /* Divider */
        .prof-divider {
          height: 1px; background: rgba(114,9,183,0.09);
          margin: 1.4rem 0;
        }

        /* Contact row */
        .prof-contact-row {
          display: flex; align-items: center; gap: 10px;
          margin-bottom: 0.75rem;
          font-size: 0.9rem; color: #374151;
        }
        .prof-contact-icon {
          width: 32px; height: 32px; border-radius: 9px;
          background: rgba(114,9,183,0.07);
          border: 1px solid rgba(114,9,183,0.13);
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0; color: #7209b7;
        }

        /* Section heading */
        .prof-section-title {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 0.95rem; font-weight: 800;
          color: #18003a; margin-bottom: 0.75rem;
        }

        /* Skill badge */
        .prof-skill {
          display: inline-flex; align-items: center; gap: 5px;
          padding: 0.28rem 0.8rem;
          border-radius: 8px;
          background: rgba(114,9,183,0.07);
          border: 1px solid rgba(114,9,183,0.18);
          color: #7209b7;
          font-size: 0.78rem; font-weight: 600;
          font-family: 'Outfit', sans-serif;
        }
        .prof-no-data { font-size: 0.84rem; color: #9ca3af; }

        /* Resume link */
        .prof-resume-link {
          display: inline-flex; align-items: center; gap: 7px;
          padding: 0.42rem 1rem;
          border-radius: 9px;
          background: rgba(114,9,183,0.07);
          border: 1px solid rgba(114,9,183,0.18);
          color: #7209b7;
          font-size: 0.82rem; font-weight: 600;
          font-family: 'Outfit', sans-serif;
          text-decoration: none;
          transition: all 0.18s;
        }
        .prof-resume-link:hover { background: rgba(114,9,183,0.13); }

        /* Applied jobs card */
        .prof-jobs-card {
          background: #fff;
          border: 1px solid rgba(114,9,183,0.13);
          border-radius: 20px;
          padding: 2rem;
          box-shadow: 0 10px 36px rgba(114,9,183,0.09), 0 2px 8px rgba(0,0,0,0.04);
          position: relative;
        }
        .prof-jobs-card::before {
          content: '';
          position: absolute; top: 0; left: 0; right: 0; height: 3px;
          background: linear-gradient(90deg, #7209b7, #b44bf7);
          border-radius: 20px 20px 0 0;
        }
        .prof-jobs-title {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 1rem; font-weight: 800; color: #18003a;
          margin-bottom: 1.1rem;
        }
      `}</style>

      <div className="prof-page">
        <Navbar />
        <div className="prof-dots" />
        <div className="prof-blob1" />
        <div className="prof-blob2" />

        <div className="prof-body">

          {/* ── PROFILE CARD ── */}
          <div className="prof-card">
            <div className="prof-top">
              <div style={{ display: "flex", alignItems: "flex-start", gap: "1.1rem", flexWrap: "wrap" }}>
                {/* Avatar */}
                <Dialog open={openProfile} onOpenChange={setOpenProfile}>
                  <DialogTrigger asChild>
                    <div className="prof-avatar-wrap">
                      <Avatar style={{ width: "100%", height: "100%", borderRadius: "50%" }}>
                        <AvatarImage
                          src={user?.profile?.profilePhoto || "https://via.placeholder.com/150"}
                          alt="Profile"
                        />
                      </Avatar>
                    </div>
                  </DialogTrigger>
                  <DialogContent className="bg-white rounded-2xl p-5 flex items-center justify-center shadow-2xl border border-purple-100">
                    <DialogTitle className="sr-only">Profile Photo</DialogTitle>
                    <DialogDescription className="sr-only">Enlarged profile photo</DialogDescription>
                    <img
                      src={user?.profile?.profilePhoto || "https://via.placeholder.com/150"}
                      alt="Profile"
                      style={{ width: 240, height: 300, objectFit: "cover", borderRadius: 14, border: "3px solid #7209b7", boxShadow: "0 8px 30px rgba(114,9,183,0.2)" }}
                    />
                  </DialogContent>
                </Dialog>

                {/* Name + bio */}
                <div style={{ paddingTop: 4 }}>
                  <div className="prof-name">{user?.fullname}</div>
                  <div className="prof-bio">{user?.profile?.bio || "No bio added yet"}</div>
                </div>
              </div>

              {/* Edit */}
              <button className="prof-edit-btn" onClick={() => setOpenEdit(true)}>
                <Pen size={13} /> Edit
              </button>
            </div>

            <div className="prof-divider" />

            {/* Contact */}
            <div style={{ marginBottom: "1.4rem" }}>
              <div className="prof-section-title">Contact</div>
              <div className="prof-contact-row">
                <span className="prof-contact-icon"><Mail size={14} /></span>
                {user?.email || "No email available"}
              </div>
              <div className="prof-contact-row">
                <span className="prof-contact-icon"><Contact size={14} /></span>
                {user?.phoneNumber || "No phone number available"}
              </div>
            </div>

            <div className="prof-divider" />

            {/* Skills */}
            <div style={{ marginBottom: "1.4rem" }}>
              <div className="prof-section-title">Skills</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.45rem" }}>
                {user?.profile?.skills?.length > 0
                  ? user.profile.skills.map((skill) => (
                      <span key={skill} className="prof-skill">
                        <Star size={10} /> {skill}
                      </span>
                    ))
                  : <span className="prof-no-data">No skills added yet</span>
                }
              </div>
            </div>

            <div className="prof-divider" />

            {/* Resume */}
            <div>
              <div className="prof-section-title">Resume</div>
              {user?.profile?.resume
                ? <a href={user.profile.resume} target="_blank" rel="noopener noreferrer" className="prof-resume-link">
                    <FileText size={14} /> View Resume
                  </a>
                : <span className="prof-no-data">No resume uploaded</span>
              }
            </div>
          </div>

          {/* ── APPLIED JOBS ── */}
          <div className="prof-jobs-card">
            <div className="prof-jobs-title">Applied Jobs</div>
            <AppliedJobTable />
          </div>
        </div>

        <UpdateProfileDialog open={openEdit} setOpen={setOpenEdit} />
      </div>
    </>
  );
};

export default Profile;