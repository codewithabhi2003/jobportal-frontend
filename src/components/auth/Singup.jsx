import React, { useEffect, useState } from 'react';
import Navbar from '../shared/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import { USER_API_END_POINT } from '@/utils/constant';
import { toast } from 'sonner';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setloading } from '@/redux/authSlice';
import { Loader2, User, Mail, Phone, Lock, ImagePlus, Eye, EyeOff } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

const Signup = () => {
  const [input, setInput] = useState({ fullname: "", email: "", phone: "", password: "", role: "", file: "" });
  const [showPassword, setShowPassword] = useState(false);
  const { loading, user } = useSelector(store => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const changeEventHandler = (e) => setInput({ ...input, [e.target.name]: e.target.value });
  const changeFileHandler = (e) => setInput({ ...input, file: e.target.files?.[0] });

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phone);
    formData.append("password", input.password);
    formData.append("role", input.role);
    if (input.file) formData.append("file", input.file);
    try {
      dispatch(setloading(true));
      const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true
      });
      if (res.data.success) { toast.success("Signup successful!"); navigate("/login"); }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong!");
    } finally { dispatch(setloading(false)); }
  };

  useEffect(() => { if (user) navigate("/"); }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@500;700;800;900&family=Outfit:wght@400;500;600&display=swap');
        .auth-page { min-height: 100vh; background: #f9f5ff; font-family: 'Outfit', sans-serif; position: relative; overflow: hidden; }
        .auth-dots { position: absolute; inset: 0; pointer-events: none; opacity: 0.5; background-image: radial-gradient(circle, rgba(114,9,183,0.18) 1px, transparent 1px); background-size: 28px 28px; z-index: 0; }
        .auth-blob1 { position: absolute; top: -100px; right: -80px; width: 420px; height: 420px; border-radius: 50%; background: radial-gradient(circle, rgba(114,9,183,0.09) 0%, transparent 70%); pointer-events: none; z-index: 0; }
        .auth-blob2 { position: absolute; bottom: -80px; left: -60px; width: 340px; height: 340px; border-radius: 50%; background: radial-gradient(circle, rgba(114,9,183,0.06) 0%, transparent 70%); pointer-events: none; z-index: 0; }
        .auth-center { position: relative; z-index: 1; display: flex; align-items: center; justify-content: center; min-height: calc(100vh - 66px); padding: 2rem 1rem; }
        .auth-card { background: #ffffff; border: 1px solid rgba(114,9,183,0.14); border-radius: 20px; padding: 2.2rem 2rem; width: 100%; max-width: 440px; box-shadow: 0 12px 40px rgba(114,9,183,0.1), 0 2px 8px rgba(0,0,0,0.04); position: relative; }
        .auth-card::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px; background: linear-gradient(90deg, #7209b7, #b44bf7); border-radius: 20px 20px 0 0; }
        .auth-title { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 1.65rem; font-weight: 900; color: #18003a; letter-spacing: -0.03em; margin-bottom: 0.3rem; text-align: center; }
        .auth-subtitle { font-size: 0.84rem; color: #9ca3af; text-align: center; margin-bottom: 1.8rem; }
        .auth-field { margin-bottom: 1.1rem; }
        .auth-label { display: block; font-size: 0.8rem; font-weight: 600; color: #4b006e; margin-bottom: 0.4rem; font-family: 'Outfit', sans-serif; }
        .auth-input-wrap { position: relative; }
        .auth-input-icon { position: absolute; left: 11px; top: 50%; transform: translateY(-50%); color: #b084d8; pointer-events: none; display: flex; align-items: center; }
        .auth-input { width: 100%; padding: 0.65rem 2.5rem 0.65rem 2.3rem; border: 1.5px solid rgba(114,9,183,0.18); border-radius: 10px; font-family: 'Outfit', sans-serif; font-size: 0.9rem; color: #18003a; background: #fdfaff; outline: none; transition: border-color 0.2s, box-shadow 0.2s; box-sizing: border-box; }
        .auth-input::placeholder { color: #c4b5d4; }
        .auth-input:focus { border-color: #7209b7; box-shadow: 0 0 0 3px rgba(114,9,183,0.1); background: #fff; }
        .auth-eye-btn { position: absolute; right: 11px; top: 50%; transform: translateY(-50%); background: none; border: none; padding: 0; cursor: pointer; color: #b084d8; display: flex; align-items: center; transition: color 0.18s; }
        .auth-eye-btn:hover { color: #7209b7; }
        .auth-file-label { display: flex; align-items: center; gap: 10px; width: 100%; padding: 0.65rem 0.9rem; border: 1.5px dashed rgba(114,9,183,0.28); border-radius: 10px; font-family: 'Outfit', sans-serif; font-size: 0.85rem; color: #9ca3af; background: #fdfaff; cursor: pointer; transition: border-color 0.2s, background 0.2s; box-sizing: border-box; }
        .auth-file-label:hover { border-color: #7209b7; background: rgba(114,9,183,0.03); color: #7209b7; }
        .auth-file-name { font-size: 0.82rem; color: #7209b7; font-weight: 500; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
        .auth-btn { width: 100%; margin-top: 1.4rem; padding: 0.72rem; border-radius: 10px; background: #7209b7; color: #fff; font-family: 'Outfit', sans-serif; font-size: 0.95rem; font-weight: 600; border: none; cursor: pointer; transition: all 0.2s; box-shadow: 0 4px 14px rgba(114,9,183,0.3); display: flex; align-items: center; justify-content: center; gap: 8px; }
        .auth-btn:hover { background: #5c0799; transform: translateY(-1px); box-shadow: 0 6px 20px rgba(114,9,183,0.4); }
        .auth-btn:disabled { opacity: 0.7; cursor: not-allowed; transform: none; }
        .auth-footer { margin-top: 1.3rem; text-align: center; font-size: 0.84rem; color: #6b7280; }
        .auth-link { color: #7209b7; font-weight: 600; text-decoration: none; }
        .auth-link:hover { text-decoration: underline; }
      `}</style>

      <div className="auth-page">
        <Navbar />
        <div className="auth-dots" /><div className="auth-blob1" /><div className="auth-blob2" />

        <div className="auth-center">
          <div className="auth-card">
            <div className="auth-title">Create account</div>
            <div className="auth-subtitle">Join thousands of job seekers today</div>

            <form onSubmit={submitHandler}>
              {/* Full Name */}
              <div className="auth-field">
                <label className="auth-label">Full Name</label>
                <div className="auth-input-wrap">
                  <span className="auth-input-icon"><User size={14} /></span>
                  <input className="auth-input" name="fullname" value={input.fullname}
                    onChange={changeEventHandler} placeholder="John Doe" />
                </div>
              </div>

              {/* Email */}
              <div className="auth-field">
                <label className="auth-label">Email</label>
                <div className="auth-input-wrap">
                  <span className="auth-input-icon"><Mail size={14} /></span>
                  <input className="auth-input" name="email" type="email" value={input.email}
                    onChange={changeEventHandler} placeholder="you@example.com" />
                </div>
              </div>

              {/* Phone */}
              <div className="auth-field">
                <label className="auth-label">Phone Number</label>
                <div className="auth-input-wrap">
                  <span className="auth-input-icon"><Phone size={14} /></span>
                  <input className="auth-input" name="phone" value={input.phone}
                    onChange={changeEventHandler} placeholder="+91 98765 43210" />
                </div>
              </div>

              {/* Password */}
              <div className="auth-field">
                <label className="auth-label">Password</label>
                <div className="auth-input-wrap">
                  <span className="auth-input-icon"><Lock size={14} /></span>
                  <input
                    className="auth-input"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={input.password}
                    onChange={changeEventHandler}
                    placeholder="Create a strong password"
                  />
                  <button
                    type="button"
                    className="auth-eye-btn"
                    onClick={() => setShowPassword((p) => !p)}
                    tabIndex={-1}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>
              </div>

              {/* Role */}
              <div className="auth-field">
                <label className="auth-label">Role</label>
                <Select onValueChange={(value) => setInput({ ...input, role: value })}>
                  <SelectTrigger className="mt-0 bg-[#fdfaff] border-[1.5px] border-purple-200 rounded-[10px] font-[Outfit] text-[0.9rem] text-[#18003a] focus:border-[#7209b7] focus:ring-[rgba(114,9,183,0.1)]">
                    <SelectValue placeholder="Select your role" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border border-purple-100 shadow-lg rounded-xl">
                    <SelectItem value="job-seeker">Job Seeker</SelectItem>
                    <SelectItem value="Recruiter">Recruiter</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Profile Photo */}
              <div className="auth-field">
                <label className="auth-label">Profile Photo</label>
                <label className="auth-file-label" htmlFor="profile-photo">
                  <ImagePlus size={16} style={{ flexShrink: 0, color: "#b084d8" }} />
                  {input.file
                    ? <span className="auth-file-name">{input.file.name}</span>
                    : <span>Click to upload a photo</span>
                  }
                </label>
                <input id="profile-photo" accept="image/*" type="file"
                  onChange={changeFileHandler} style={{ display: "none" }} />
              </div>

              <button className="auth-btn" type="submit" disabled={loading}>
                {loading
                  ? <><Loader2 className="animate-spin" size={16} /> Please wait</>
                  : "Create Account"
                }
              </button>
            </form>

            <div className="auth-footer">
              Already have an account?{" "}
              <Link to="/login" className="auth-link">Login</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;