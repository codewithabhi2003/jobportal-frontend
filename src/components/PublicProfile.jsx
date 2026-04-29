import React, { useEffect, useState } from "react";
import Navbar from "./shared/Navbar";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Mail, Contact, Star, Briefcase, ArrowLeft, MapPin, Globe } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { useParams, useNavigate } from "react-router-dom";

const PublicProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [profileUser, setProfileUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [openPhoto, setOpenPhoto] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`${USER_API_END_POINT}/profile/${id}`, {
          withCredentials: true,
        });
        if (res.data.success) setProfileUser(res.data.user);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [id]);

  const isRecruiter = profileUser?.role === "Recruiter";

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@500;700;800;900&family=Outfit:wght@400;500;600&display=swap');
        .pp-page { min-height: 100vh; background: #f9f5ff; font-family: 'Outfit', sans-serif; position: relative; overflow: hidden; }
        .pp-dots { position: fixed; inset: 0; pointer-events: none; opacity: 0.45; background-image: radial-gradient(circle, rgba(114,9,183,0.18) 1px, transparent 1px); background-size: 28px 28px; z-index: 0; }
        .pp-blob1 { position: fixed; top: -100px; right: -80px; width: 420px; height: 420px; border-radius: 50%; background: radial-gradient(circle, rgba(114,9,183,0.08) 0%, transparent 70%); pointer-events: none; z-index: 0; }
        .pp-blob2 { position: fixed; bottom: -80px; left: -60px; width: 340px; height: 340px; border-radius: 50%; background: radial-gradient(circle, rgba(114,9,183,0.05) 0%, transparent 70%); pointer-events: none; z-index: 0; }
        .pp-body { position: relative; z-index: 1; max-width: 680px; margin: 0 auto; padding: calc(66px + 2rem) 1rem 3rem; }
        .pp-back { display: inline-flex; align-items: center; gap: 6px; padding: 0.42rem 1rem; border-radius: 10px; border: 1.5px solid rgba(114,9,183,0.2); background: rgba(114,9,183,0.05); color: #7209b7; font-family: 'Outfit', sans-serif; font-size: 0.84rem; font-weight: 600; cursor: pointer; margin-bottom: 1.4rem; transition: all 0.2s; }
        .pp-back:hover { background: rgba(114,9,183,0.1); border-color: #7209b7; }
        .pp-card { background: #fff; border: 1px solid rgba(114,9,183,0.13); border-radius: 20px; padding: 2rem; box-shadow: 0 10px 36px rgba(114,9,183,0.09), 0 2px 8px rgba(0,0,0,0.04); position: relative; margin-bottom: 1.25rem; }
        .pp-card::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px; background: linear-gradient(90deg, #7209b7, #b44bf7); border-radius: 20px 20px 0 0; }
        .pp-top { display: flex; align-items: flex-start; gap: 1.25rem; flex-wrap: wrap; }
        .pp-avatar { width: 76px; height: 76px; border-radius: 50%; border: 3px solid #7209b7; overflow: hidden; flex-shrink: 0; box-shadow: 0 4px 16px rgba(114,9,183,0.2); cursor: pointer; transition: opacity 0.2s; }
        .pp-avatar:hover { opacity: 0.85; }
        .pp-role-badge { display: inline-flex; align-items: center; gap: 5px; padding: 0.22rem 0.75rem; border-radius: 999px; background: rgba(114,9,183,0.08); border: 1px solid rgba(114,9,183,0.18); color: #7209b7; font-size: 0.73rem; font-weight: 600; margin-bottom: 0.4rem; }
        .pp-name { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 1.3rem; font-weight: 800; color: #18003a; letter-spacing: -0.02em; margin-bottom: 3px; }
        .pp-bio { font-size: 0.85rem; color: #6b7280; line-height: 1.6; }
        .pp-divider { height: 1px; background: rgba(114,9,183,0.09); margin: 1.3rem 0; }
        .pp-section-title { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 0.9rem; font-weight: 800; color: #18003a; margin-bottom: 0.8rem; }
        .pp-contact-row { display: flex; align-items: center; gap: 10px; margin-bottom: 0.7rem; font-size: 0.88rem; color: #374151; }
        .pp-contact-icon { width: 32px; height: 32px; border-radius: 9px; background: rgba(114,9,183,0.07); border: 1px solid rgba(114,9,183,0.13); display: flex; align-items: center; justify-content: center; flex-shrink: 0; color: #7209b7; }
        .pp-skill { display: inline-flex; align-items: center; gap: 5px; padding: 0.28rem 0.8rem; border-radius: 8px; background: rgba(114,9,183,0.07); border: 1px solid rgba(114,9,183,0.18); color: #7209b7; font-size: 0.78rem; font-weight: 600; }
        .pp-no-data { font-size: 0.84rem; color: #9ca3af; }
        .pp-skeleton { background: linear-gradient(90deg, #f0ebff 25%, #e8e0ff 50%, #f0ebff 75%); background-size: 200% 100%; animation: ppShimmer 1.4s infinite; border-radius: 10px; }
        @keyframes ppShimmer { 0%{background-position:200% 0} 100%{background-position:-200% 0} }
      `}</style>

      <div className="pp-page">
        <Navbar />
        <div className="pp-dots" /><div className="pp-blob1" /><div className="pp-blob2" />

        <div className="pp-body">
          <button className="pp-back" onClick={() => navigate(-1)}>
            <ArrowLeft size={14} /> Back
          </button>

          {loading ? (
            <div className="pp-card">
              <div style={{ display: "flex", gap: "1.25rem", alignItems: "center" }}>
                <div className="pp-skeleton" style={{ width: 76, height: 76, borderRadius: "50%", flexShrink: 0 }} />
                <div style={{ flex: 1 }}>
                  <div className="pp-skeleton" style={{ height: 16, width: "40%", marginBottom: 10 }} />
                  <div className="pp-skeleton" style={{ height: 22, width: "60%", marginBottom: 10 }} />
                  <div className="pp-skeleton" style={{ height: 14, width: "80%" }} />
                </div>
              </div>
            </div>
          ) : !profileUser ? (
            <div className="pp-card" style={{ textAlign: "center", color: "#9ca3af", padding: "3rem" }}>
              Profile not found.
            </div>
          ) : (
            <>
              {/* ── IDENTITY CARD ── */}
              <div className="pp-card">
                <div className="pp-top">

                  {/* Clickable Avatar → opens enlarged photo dialog */}
                  <div className="pp-avatar" onClick={() => setOpenPhoto(true)}>
                    <Avatar style={{ width: "100%", height: "100%", borderRadius: "50%" }}>
                      <AvatarImage src={profileUser?.profile?.profilePhoto} />
                    </Avatar>
                  </div>

                  <div style={{ paddingTop: 4 }}>
                    <div className="pp-role-badge">
                      {isRecruiter ? <><Briefcase size={11} /> Recruiter</> : <><Star size={11} /> Job Seeker</>}
                    </div>
                    <div className="pp-name">{profileUser?.fullname}</div>
                    <div className="pp-bio">{profileUser?.profile?.bio || "No bio available"}</div>
                  </div>
                </div>

                <div className="pp-divider" />

                {/* Contact */}
                <div style={{ marginBottom: "1.3rem" }}>
                  <div className="pp-section-title">Contact</div>
                  <div className="pp-contact-row">
                    <span className="pp-contact-icon"><Mail size={14} /></span>
                    {profileUser?.email || "Not provided"}
                  </div>
                  <div className="pp-contact-row">
                    <span className="pp-contact-icon"><Contact size={14} /></span>
                    {profileUser?.phoneNumber || "Not provided"}
                  </div>
                </div>

                {/* ── JOB SEEKER: Skills only (no resume) ── */}
                {!isRecruiter && (
                  <>
                    <div className="pp-divider" />
                    <div>
                      <div className="pp-section-title">Skills</div>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.45rem" }}>
                        {profileUser?.profile?.skills?.length > 0
                          ? profileUser.profile.skills.map((s) => (
                              <span key={s} className="pp-skill"><Star size={10} /> {s}</span>
                            ))
                          : <span className="pp-no-data">No skills listed</span>
                        }
                      </div>
                    </div>
                  </>
                )}

                {/* ── RECRUITER: Company info ── */}
                {isRecruiter && profileUser?.profile?.company && (
                  <>
                    <div className="pp-divider" />
                    <div>
                      <div className="pp-section-title">Company</div>
                      <div className="pp-contact-row">
                        <span className="pp-contact-icon"><Briefcase size={14} /></span>
                        {profileUser.profile.company.name || "Not listed"}
                      </div>
                      {profileUser.profile.company.location && (
                        <div className="pp-contact-row">
                          <span className="pp-contact-icon"><MapPin size={14} /></span>
                          {profileUser.profile.company.location}
                        </div>
                      )}
                      {profileUser.profile.company.website && (
                        <div className="pp-contact-row">
                          <span className="pp-contact-icon"><Globe size={14} /></span>
                          <a
                            href={profileUser.profile.company.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ color: "#7209b7", textDecoration: "none", fontWeight: 600 }}
                          >
                            {profileUser.profile.company.website.replace(/https?:\/\//, "")}
                          </a>
                        </div>
                      )}
                    </div>
                  </>
                )}
              </div>

              {/* ── Photo Enlarged Dialog ── */}
              <Dialog open={openPhoto} onOpenChange={setOpenPhoto}>
                <DialogContent className="bg-white rounded-2xl p-5 flex items-center justify-center shadow-2xl border border-purple-100">
                  <DialogTitle className="sr-only">Profile Photo</DialogTitle>
                  <DialogDescription className="sr-only">Enlarged profile photo</DialogDescription>
                  <img
                    src={profileUser?.profile?.profilePhoto || "https://via.placeholder.com/150"}
                    alt="Profile"
                    style={{
                      width: 240,
                      height: 300,
                      objectFit: "cover",
                      borderRadius: 14,
                      border: "3px solid #7209b7",
                      boxShadow: "0 8px 30px rgba(114,9,183,0.2)"
                    }}
                  />
                </DialogContent>
              </Dialog>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default PublicProfile;