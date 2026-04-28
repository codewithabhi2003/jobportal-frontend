import React, { useEffect, useState } from 'react';
import Navbar from '../shared/Navbar';
import { ArrowLeft, Loader2, Building2, Globe, MapPin, FileImage, AlignLeft } from 'lucide-react';
import axios from 'axios';
import { COMPANY_API_END_POINT } from '@/utils/constant';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';
import { useSelector } from 'react-redux';
import useGetCompanyById from '@/hooks/useGetCompanyById';

const CompanySetup = () => {
  const params = useParams();
  useGetCompanyById(params.id);
  const [input, setInput] = useState({ name: "", description: "", website: "", location: "", file: null });
  const { singleCompany } = useSelector(store => store.company);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const changeEventHandler = (e) => setInput({ ...input, [e.target.name]: e.target.value });
  const changeFileHandler = (e) => setInput({ ...input, file: e.target.files?.[0] });

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", input.name);
    formData.append("description", input.description);
    formData.append("website", input.website);
    formData.append("location", input.location);
    if (input.file) formData.append("file", input.file);
    try {
      setLoading(true);
      const res = await axios.put(`${COMPANY_API_END_POINT}/update/${params.id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials: true
      });
      if (res.data.success) { toast.success(res.data.message); navigate("/admin/companies"); }
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred");
    } finally { setLoading(false); }
  };

  useEffect(() => {
    setInput({
      name: singleCompany.name || "",
      description: singleCompany.description || "",
      website: singleCompany.website || "",
      location: singleCompany.location || "",
      file: singleCompany.file || null
    });
  }, [singleCompany]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@500;700;800;900&family=Outfit:wght@400;500;600&display=swap');
        .cs-page { min-height: 100vh; background: #f9f5ff; font-family: 'Outfit', sans-serif; position: relative; overflow: hidden; }
        .cs-dots { position: fixed; inset: 0; pointer-events: none; opacity: 0.45; background-image: radial-gradient(circle, rgba(114,9,183,0.18) 1px, transparent 1px); background-size: 28px 28px; z-index: 0; }
        .cs-blob1 { position: fixed; top: -100px; right: -80px; width: 420px; height: 420px; border-radius: 50%; background: radial-gradient(circle, rgba(114,9,183,0.08) 0%, transparent 70%); pointer-events: none; z-index: 0; }
        .cs-blob2 { position: fixed; bottom: -80px; left: -60px; width: 340px; height: 340px; border-radius: 50%; background: radial-gradient(circle, rgba(114,9,183,0.05) 0%, transparent 70%); pointer-events: none; z-index: 0; }
        .cs-body { position: relative; z-index: 1; padding: calc(66px + 2rem) 1rem 3rem; display: flex; justify-content: center; }
        .cs-card { background: #fff; border: 1px solid rgba(114,9,183,0.12); border-radius: 24px; padding: 2rem; width: 100%; max-width: 720px; box-shadow: 0 12px 40px rgba(114,9,183,0.09), 0 2px 8px rgba(0,0,0,0.04); position: relative; }
        .cs-card::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px; background: linear-gradient(90deg, #7209b7, #b44bf7); border-radius: 24px 24px 0 0; }
        .cs-header { display: flex; align-items: center; gap: 1rem; padding-bottom: 1.5rem; border-bottom: 1px solid rgba(114,9,183,0.09); margin-bottom: 1.75rem; flex-wrap: wrap; }
        .cs-back-btn { display: inline-flex; align-items: center; gap: 6px; padding: 0.45rem 1rem; border-radius: 10px; border: 1.5px solid rgba(114,9,183,0.2); background: rgba(114,9,183,0.05); color: #7209b7; font-family: 'Outfit', sans-serif; font-size: 0.84rem; font-weight: 600; cursor: pointer; transition: all 0.2s; }
        .cs-back-btn:hover { background: rgba(114,9,183,0.1); border-color: #7209b7; }
        .cs-title { font-family: 'Plus Jakarta Sans', sans-serif; font-size: clamp(1.2rem, 3vw, 1.5rem); font-weight: 900; color: #18003a; letter-spacing: -0.03em; margin: 0; }
        .cs-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1.25rem; }
        @media (max-width: 600px) { .cs-grid { grid-template-columns: 1fr; } .cs-card { padding: 1.5rem 1rem; } }
        .cs-full { grid-column: 1 / -1; }
        .cs-field-label { display: flex; align-items: center; gap: 6px; font-family: 'Plus Jakarta Sans', sans-serif; font-size: 0.78rem; font-weight: 700; color: #18003a; letter-spacing: 0.04em; text-transform: uppercase; margin-bottom: 0.5rem; }
        .cs-field-label svg { color: #7209b7; }
        .cs-input { font-family: 'Outfit', sans-serif; font-size: 0.9rem; color: #18003a; width: 100%; padding: 0.7rem 1rem; border: 1.5px solid rgba(114,9,183,0.18); border-radius: 11px; background: #fdfaff; outline: none; transition: border-color 0.2s, box-shadow 0.2s; box-sizing: border-box; }
        .cs-input::placeholder { color: #c4b5d0; }
        .cs-input:focus { border-color: #7209b7; box-shadow: 0 0 0 3px rgba(114,9,183,0.1); background: #fff; }
        .cs-file-input { font-family: 'Outfit', sans-serif; font-size: 0.85rem; color: #6b7280; width: 100%; padding: 0.6rem 0.9rem; border: 1.5px dashed rgba(114,9,183,0.25); border-radius: 11px; background: rgba(114,9,183,0.03); outline: none; cursor: pointer; box-sizing: border-box; transition: border-color 0.2s; }
        .cs-file-input:hover { border-color: #7209b7; }
        .cs-submit { width: 100%; padding: 0.8rem; border: none; border-radius: 12px; background: #7209b7; color: #fff; font-family: 'Outfit', sans-serif; font-size: 0.95rem; font-weight: 600; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 8px; box-shadow: 0 4px 16px rgba(114,9,183,0.3); transition: all 0.2s; margin-top: 1.75rem; }
        .cs-submit:hover { background: #5c0799; transform: translateY(-1px); box-shadow: 0 6px 22px rgba(114,9,183,0.4); }
        .cs-submit:disabled { background: #c4b5d0; cursor: not-allowed; transform: none; box-shadow: none; }
      `}</style>

      <div className="cs-page">
        <Navbar />
        <div className="cs-dots" /><div className="cs-blob1" /><div className="cs-blob2" />
        <div className="cs-body">
          <div className="cs-card">
            <div className="cs-header">
              <button type="button" className="cs-back-btn" onClick={() => navigate("/admin/companies")}>
                <ArrowLeft size={14} /> Back
              </button>
              <h1 className="cs-title">Company Setup</h1>
            </div>

            <form onSubmit={submitHandler}>
              <div className="cs-grid">
                <div>
                  <div className="cs-field-label"><Building2 size={13} /> Company Name</div>
                  <input className="cs-input" type="text" name="name" value={input.name} onChange={changeEventHandler} placeholder="e.g. Razorpay" />
                </div>
                <div>
                  <div className="cs-field-label"><AlignLeft size={13} /> Description</div>
                  <input className="cs-input" type="text" name="description" value={input.description} onChange={changeEventHandler} placeholder="What does your company do?" />
                </div>
                <div>
                  <div className="cs-field-label"><Globe size={13} /> Website</div>
                  <input className="cs-input" type="text" name="website" value={input.website} onChange={changeEventHandler} placeholder="https://yourcompany.com" />
                </div>
                <div>
                  <div className="cs-field-label"><MapPin size={13} /> Location</div>
                  <input className="cs-input" type="text" name="location" value={input.location} onChange={changeEventHandler} placeholder="Mumbai, India" />
                </div>
                <div className="cs-full">
                  <div className="cs-field-label"><FileImage size={13} /> Company Logo</div>
                  <input className="cs-file-input" type="file" accept="image/*" onChange={changeFileHandler} />
                </div>
              </div>

              <button type="submit" className="cs-submit" disabled={loading}>
                {loading ? <><Loader2 size={16} className="animate-spin" /> Saving changes…</> : "Update Company"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default CompanySetup;