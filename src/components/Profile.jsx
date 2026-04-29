import React, { useState } from "react";
import Navbar from "./shared/Navbar";
import { Avatar, AvatarImage } from "./ui/avatar";
import {
  Contact, Mail, Pen, FileText, Star, Building2, Globe,
  MapPin, Briefcase, Users, Plus, ArrowRight, TrendingUp, Dialog
} from "lucide-react";
import {
  Dialog as UIDialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import AppliedJobTable from "./AppliedJobTable";
import UpdateProfileDialog from "./UpdateProfileDialog";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import useGetAppliedJobs from "@/hooks/useGetAppliedJobs";

const Profile = () => {
  useGetAppliedJobs();
  const [openEdit, setOpenEdit] = useState(false);
  const [openPhoto, setOpenPhoto] = useState(false);
  const { user } = useSelector((store) => store.auth);
  const { allAdminJobs = [] } = useSelector((store) => store.job);
  const { companies = [] } = useSelector((store) => store.company);
  const navigate = useNavigate();

  const isRecruiter = user?.role === "Recruiter";

  const totalApplicants = allAdminJobs.reduce(
    (sum, job) => sum + (job?.applications?.length || 0), 0
  );

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@500;700;800;900&family=Outfit:wght@400;500;600&display=swap');

        .p-page { min-height: 100vh; background: #f9f5ff; font-family: 'Outfit', sans-serif; position: relative; overflow: hidden; }
        .p-dots { position: fixed; inset: 0; pointer-events: none; opacity: 0.45; background-image: radial-gradient(circle, rgba(114,9,183,0.18) 1px, transparent 1px); background-size: 28px 28px; z-index: 0; }
        .p-blob1 { position: fixed; top: -100px; right: -80px; width: 420px; height: 420px; border-radius: 50%; background: radial-gradient(circle, rgba(114,9,183,0.08) 0%, transparent 70%); pointer-events: none; z-index: 0; }
        .p-blob2 { position: fixed; bottom: -80px; left: -60px; width: 340px; height: 340px; border-radius: 50%; background: radial-gradient(circle, rgba(114,9,183,0.05) 0%, transparent 70%); pointer-events: none; z-index: 0; }
        .p-body { position: relative; z-index: 1; max-width: 900px; margin: 0 auto; padding: calc(66px + 2rem) 1rem 3rem; }

        /* Card */
        .p-card { background: #fff; border: 1px solid rgba(114,9,183,0.13); border-radius: 20px; padding: 2rem; box-shadow: 0 10px 36px rgba(114,9,183,0.09), 0 2px 8px rgba(0,0,0,0.04); position: relative; margin-bottom: 1.5rem; }
        .p-card::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px; background: linear-gradient(90deg, #7209b7, #b44bf7); border-radius: 20px 20px 0 0; }

        /* Top */
        .p-top { display: flex; align-items: flex-start; justify-content: space-between; gap: 1rem; flex-wrap: wrap; }
        .p-avatar-wrap { width: 82px; height: 82px; border-radius: 50%; border: 3px solid #7209b7; overflow: hidden; cursor: pointer; flex-shrink: 0; box-shadow: 0 4px 16px rgba(114,9,183,0.22); transition: opacity 0.2s; }
        .p-avatar-wrap:hover { opacity: 0.85; }
        .p-role-badge { display: inline-flex; align-items: center; gap: 5px; padding: 0.22rem 0.75rem; border-radius: 999px; background: rgba(114,9,183,0.08); border: 1px solid rgba(114,9,183,0.18); color: #7209b7; font-size: 0.73rem; font-weight: 600; margin-bottom: 0.4rem; font-family: 'Outfit', sans-serif; }
        .p-name { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 1.35rem; font-weight: 800; color: #18003a; letter-spacing: -0.02em; margin-bottom: 3px; }
        .p-bio { font-size: 0.85rem; color: #6b7280; line-height: 1.6; max-width: 460px; }
        .p-edit-btn { display: inline-flex; align-items: center; gap: 7px; padding: 0.48rem 1.1rem; border-radius: 10px; border: 1.5px solid rgba(114,9,183,0.25); background: rgba(114,9,183,0.05); color: #7209b7; font-family: 'Outfit', sans-serif; font-size: 0.85rem; font-weight: 600; cursor: pointer; transition: all 0.2s; flex-shrink: 0; }
        .p-edit-btn:hover { background: rgba(114,9,183,0.1); border-color: #7209b7; }

        .p-divider { height: 1px; background: rgba(114,9,183,0.09); margin: 1.4rem 0; }
        .p-section-title { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 0.95rem; font-weight: 800; color: #18003a; margin-bottom: 0.85rem; }

        /* Contact */
        .p-contact-row { display: flex; align-items: center; gap: 10px; margin-bottom: 0.75rem; font-size: 0.9rem; color: #374151; }
        .p-contact-icon { width: 32px; height: 32px; border-radius: 9px; background: rgba(114,9,183,0.07); border: 1px solid rgba(114,9,183,0.13); display: flex; align-items: center; justify-content: center; flex-shrink: 0; color: #7209b7; }

        /* Skill badge */
        .p-skill { display: inline-flex; align-items: center; gap: 5px; padding: 0.28rem 0.8rem; border-radius: 8px; background: rgba(114,9,183,0.07); border: 1px solid rgba(114,9,183,0.18); color: #7209b7; font-size: 0.78rem; font-weight: 600; font-family: 'Outfit', sans-serif; }
        .p-no-data { font-size: 0.84rem; color: #9ca3af; }

        /* Resume */
        .p-resume-link { display: inline-flex; align-items: center; gap: 7px; padding: 0.42rem 1rem; border-radius: 9px; background: rgba(114,9,183,0.07); border: 1px solid rgba(114,9,183,0.18); color: #7209b7; font-size: 0.82rem; font-weight: 600; font-family: 'Outfit', sans-serif; text-decoration: none; transition: all 0.18s; }
        .p-resume-link:hover { background: rgba(114,9,183,0.13); }

        /* Stats (recruiter) */
        .p-stats { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; }
        @media (max-width: 500px) { .p-stats { grid-template-columns: 1fr; } }
        .p-stat { background: #fdfaff; border: 1px solid rgba(114,9,183,0.1); border-radius: 14px; padding: 1.1rem 1rem; text-align: center; }
        .p-stat-num { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 1.75rem; font-weight: 900; color: #7209b7; line-height: 1; margin-bottom: 4px; }
        .p-stat-label { font-size: 0.75rem; color: #9ca3af; font-weight: 500; }

        /* Quick actions */
        .p-actions { display: flex; gap: 0.75rem; flex-wrap: wrap; }
        .p-action-btn { display: inline-flex; align-items: center; gap: 7px; padding: 0.6rem 1.25rem; border-radius: 11px; font-family: 'Outfit', sans-serif; font-size: 0.875rem; font-weight: 600; cursor: pointer; transition: all 0.2s; border: none; }
        .p-action-primary { background: #7209b7; color: #fff; box-shadow: 0 3px 12px rgba(114,9,183,0.28); }
        .p-action-primary:hover { background: #5c0799; transform: translateY(-1px); box-shadow: 0 5px 18px rgba(114,9,183,0.4); }
        .p-action-ghost { background: rgba(114,9,183,0.07); color: #7209b7; border: 1.5px solid rgba(114,9,183,0.2) !important; }
        .p-action-ghost:hover { background: rgba(114,9,183,0.12); border-color: #7209b7 !important; }

        /* Company cards */
        .p-company-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(230px, 1fr)); gap: 1rem; }
        .p-company-card { background: #fdfaff; border: 1px solid rgba(114,9,183,0.12); border-radius: 14px; padding: 1rem 1.1rem; display: flex; align-items: center; gap: 12px; cursor: pointer; transition: all 0.2s; }
        .p-company-card:hover { border-color: #7209b7; box-shadow: 0 4px 16px rgba(114,9,183,0.1); transform: translateY(-2px); }
        .p-company-logo { width: 42px; height: 42px; border-radius: 10px; border: 1px solid rgba(114,9,183,0.15); overflow: hidden; background: #f9f5ff; flex-shrink: 0; }
        .p-company-name { font-family: 'Plus Jakarta Sans', sans-serif; font-weight: 700; color: #18003a; font-size: 0.88rem; }
        .p-company-sub { font-size: 0.73rem; color: #9ca3af; margin-top: 2px; display: flex; align-items: center; gap: 3px; }
        .p-new-company { background: rgba(114,9,183,0.04); border: 1.5px dashed rgba(114,9,183,0.25); border-radius: 14px; padding: 1rem 1.1rem; display: flex; align-items: center; justify-content: center; gap: 8px; cursor: pointer; color: #7209b7; font-size: 0.84rem; font-weight: 600; font-family: 'Outfit', sans-serif; transition: all 0.2s; min-height: 72px; }
        .p-new-company:hover { background: rgba(114,9,183,0.08); border-color: #7209b7; }

        /* Job rows */
        .p-job-row { display: flex; align-items: center; justify-content: space-between; gap: 1rem; padding: 0.9rem 1rem; background: #fdfaff; border: 1px solid rgba(114,9,183,0.1); border-radius: 12px; margin-bottom: 0.65rem; cursor: pointer; transition: all 0.2s; flex-wrap: wrap; }
        .p-job-row:hover { border-color: #7209b7; box-shadow: 0 4px 14px rgba(114,9,183,0.09); }
        .p-job-row:last-child { margin-bottom: 0; }
        .p-job-title { font-family: 'Plus Jakarta Sans', sans-serif; font-weight: 700; color: #18003a; font-size: 0.9rem; }
        .p-job-meta { font-size: 0.75rem; color: #9ca3af; margin-top: 2px; }
        .p-job-right { display: flex; align-items: center; gap: 0.75rem; flex-shrink: 0; }
        .p-applicant-pill { display: inline-flex; align-items: center; gap: 5px; padding: 0.22rem 0.7rem; border-radius: 999px; background: rgba(114,9,183,0.07); border: 1px solid rgba(114,9,183,0.15); color: #7209b7; font-size: 0.75rem; font-weight: 600; }

        .p-jobs-title { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 1rem; font-weight: 800; color: #18003a; margin-bottom: 1.1rem; }
        .p-empty { color: #9ca3af; font-size: 0.84rem; text-align: center; padding: 1.5rem 0; }

        @media (max-width: 480px) { .p-card { padding: 1.25rem; } }
      `}</style>

      <div className="p-page">
        <Navbar />
        <div className="p-dots" /><div className="p-blob1" /><div className="p-blob2" />

        <div className="p-body">

          {/* ── IDENTITY CARD (same for both roles) ── */}
          <div className="p-card">
            <div className="p-top">
              <div style={{ display: "flex", alignItems: "flex-start", gap: "1.1rem", flexWrap: "wrap" }}>

                {/* Avatar — clickable only for job seekers */}
                {isRecruiter ? (
                  <div className="p-avatar-wrap" style={{ cursor: "default" }}>
                    <Avatar style={{ width: "100%", height: "100%", borderRadius: "50%" }}>
                      <AvatarImage src={user?.profile?.profilePhoto || "https://via.placeholder.com/150"} />
                    </Avatar>
                  </div>
                ) : (
                  <UIDialog open={openPhoto} onOpenChange={setOpenPhoto}>
                    <DialogTrigger asChild>
                      <div className="p-avatar-wrap">
                        <Avatar style={{ width: "100%", height: "100%", borderRadius: "50%" }}>
                          <AvatarImage src={user?.profile?.profilePhoto || "https://via.placeholder.com/150"} />
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
                  </UIDialog>
                )}

                <div style={{ paddingTop: 4 }}>
                  {/* Role badge */}
                  <div className="p-role-badge">
                    {isRecruiter ? <><Briefcase size={11} /> Recruiter</> : <><Star size={11} /> Job Seeker</>}
                  </div>
                  <div className="p-name">{user?.fullname}</div>
                  <div className="p-bio">{user?.profile?.bio || "No bio added yet"}</div>
                </div>
              </div>

              <button className="p-edit-btn" onClick={() => setOpenEdit(true)}>
                <Pen size={13} /> Edit Profile
              </button>
            </div>

            <div className="p-divider" />

            {/* Contact — same for both */}
            <div style={{ marginBottom: "1.4rem" }}>
              <div className="p-section-title">Contact</div>
              <div className="p-contact-row">
                <span className="p-contact-icon"><Mail size={14} /></span>
                {user?.email || "No email available"}
              </div>
              <div className="p-contact-row">
                <span className="p-contact-icon"><Contact size={14} /></span>
                {user?.phoneNumber || "No phone number"}
              </div>
            </div>

            {/* ── JOB SEEKER ONLY: Skills + Resume ── */}
            {!isRecruiter && (
              <>
                <div className="p-divider" />
                <div style={{ marginBottom: "1.4rem" }}>
                  <div className="p-section-title">Skills</div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "0.45rem" }}>
                    {user?.profile?.skills?.length > 0
                      ? user.profile.skills.map((skill) => (
                          <span key={skill} className="p-skill"><Star size={10} /> {skill}</span>
                        ))
                      : <span className="p-no-data">No skills added yet</span>
                    }
                  </div>
                </div>

                <div className="p-divider" />
                <div>
                  <div className="p-section-title">Resume</div>
                  {user?.profile?.resume
                    ? <a href={user.profile.resume} target="_blank" rel="noopener noreferrer" className="p-resume-link">
                        <FileText size={14} /> View Resume
                      </a>
                    : <span className="p-no-data">No resume uploaded</span>
                  }
                </div>
              </>
            )}

            {/* ── RECRUITER ONLY: Stats ── */}
            {isRecruiter && (
              <>
                <div className="p-divider" />
                <div>
                  <div className="p-section-title">Overview</div>
                  <div className="p-stats">
                    <div className="p-stat">
                      <div className="p-stat-num">{allAdminJobs.length}</div>
                      <div className="p-stat-label">Active Jobs</div>
                    </div>
                    <div className="p-stat">
                      <div className="p-stat-num">{totalApplicants}</div>
                      <div className="p-stat-label">Total Applicants</div>
                    </div>
                    <div className="p-stat">
                      <div className="p-stat-num">{companies.length}</div>
                      <div className="p-stat-label">Companies</div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* ── RECRUITER ONLY: Quick Actions ── */}
          {isRecruiter && (
            <div className="p-card">
              <div className="p-section-title">Quick Actions</div>
              <div className="p-actions">
                <button className="p-action-btn p-action-primary" onClick={() => navigate("/admin/jobs/create")}>
                  <Plus size={15} /> Post New Job
                </button>
                <button className="p-action-btn p-action-ghost" onClick={() => navigate("/admin/companies/create")}>
                  <Building2 size={15} /> Add Company
                </button>
                <button className="p-action-btn p-action-ghost" onClick={() => navigate("/admin/jobs")}>
                  <TrendingUp size={15} /> View All Jobs
                </button>
              </div>
            </div>
          )}

          {/* ── RECRUITER ONLY: My Companies ── */}
          {isRecruiter && (
            <div className="p-card">
              <div className="p-section-title">My Companies</div>
              {companies.length === 0 ? (
                <div className="p-empty">No companies registered yet.</div>
              ) : (
                <div className="p-company-grid">
                  {companies.map((company) => (
                    <div key={company._id} className="p-company-card" onClick={() => navigate(`/admin/companies/${company._id}`)}>
                      <div className="p-company-logo">
                        <Avatar style={{ width: "100%", height: "100%", borderRadius: 0 }}>
                          <AvatarImage src={company.logo} />
                        </Avatar>
                      </div>
                      <div>
                        <div className="p-company-name">{company.name}</div>
                        {company.location && (
                          <div className="p-company-sub"><MapPin size={10} /> {company.location}</div>
                        )}
                        {company.website && (
                          <div className="p-company-sub"><Globe size={10} /> {company.website.replace(/https?:\/\//, "")}</div>
                        )}
                      </div>
                    </div>
                  ))}
                  <div className="p-new-company" onClick={() => navigate("/admin/companies/create")}>
                    <Plus size={15} /> Register Company
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ── RECRUITER ONLY: Posted Jobs ── */}
          {isRecruiter && (
            <div className="p-card">
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1rem", flexWrap: "wrap", gap: "0.5rem" }}>
                <div className="p-section-title" style={{ margin: 0 }}>Posted Jobs</div>
                <button
                  className="p-action-btn p-action-ghost"
                  style={{ padding: "0.38rem 0.9rem", fontSize: "0.8rem" }}
                  onClick={() => navigate("/admin/jobs")}
                >
                  View All <ArrowRight size={13} />
                </button>
              </div>
              {allAdminJobs.length === 0 ? (
                <div className="p-empty">No jobs posted yet.</div>
              ) : (
                allAdminJobs.slice(0, 5).map((job) => (
                  <div key={job._id} className="p-job-row" onClick={() => navigate(`/admin/jobs/${job._id}/applicants`)}>
                    <div>
                      <div className="p-job-title">{job.title}</div>
                      <div className="p-job-meta">{job?.company?.name} · {job?.location || "Location N/A"} · {job?.createdAt?.split("T")[0]}</div>
                    </div>
                    <div className="p-job-right">
                      <span className="p-applicant-pill"><Users size={11} /> {job?.applications?.length || 0} applicants</span>
                      <ArrowRight size={15} style={{ color: "#b084d8" }} />
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* ── JOB SEEKER ONLY: Applied Jobs ── */}
          {!isRecruiter && (
            <div className="p-card">
              <div className="p-jobs-title">Applied Jobs</div>
              <AppliedJobTable />
            </div>
          )}

        </div>

        <UpdateProfileDialog open={openEdit} setOpen={setOpenEdit} />
      </div>
    </>
  );
};

export default Profile;