import React, { useEffect, useState } from 'react';
import Navbar from '../shared/Navbar';
import { useSelector } from 'react-redux';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import axios from 'axios';
import { JOB_API_END_POINT } from '@/utils/constant';
import { toast } from 'sonner';
import { useNavigate, useParams } from 'react-router-dom';
import { Loader2, Briefcase, AlignLeft, ListChecks, IndianRupee, MapPin, Clock, Star, Hash, Building2, ArrowLeft } from 'lucide-react';

const FIELDS = [
  { name: "title",       label: "Job Title",        icon: Briefcase,   placeholder: "e.g. Senior React Developer",  type: "text"   },
  { name: "description", label: "Description",      icon: AlignLeft,   placeholder: "Brief role overview…",         type: "text"   },
  { name: "requirements",label: "Requirements",     icon: ListChecks,  placeholder: "React, Node.js, SQL…",         type: "text"   },
  { name: "salary",      label: "Salary (LPA)",     icon: IndianRupee, placeholder: "e.g. 8",                      type: "text"   },
  { name: "location",    label: "Location",         icon: MapPin,      placeholder: "Mumbai / Remote",              type: "text"   },
  { name: "jobType",     label: "Job Type",         icon: Clock,       placeholder: "Full-time / Part-time",        type: "text"   },
  { name: "experience",  label: "Experience (yrs)", icon: Star,        placeholder: "0 for fresher",                type: "text"   },
  { name: "position",    label: "No. of Positions", icon: Hash,        placeholder: "e.g. 3",                      type: "number" },
];

const UpdateJob = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { companies = [] } = useSelector(store => store.company);
  const [input, setInput] = useState({ title:"",description:"",requirements:"",salary:"",location:"",jobType:"",experience:"",position:"",companyId:"" });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/get/${id}`, { withCredentials: true });
        if (res.data.success) {
          const job = res.data.job;
          setInput({
            title: job.title || "", description: job.description || "",
            requirements: job.requirements?.join(", ") || "",
            salary: job.salary || "", location: job.location || "",
            jobType: job.jobType || "", experience: job.experience || "",
            position: job.position || "", companyId: job.company?._id || ""
          });
        }
      } catch { toast.error("Failed to load job details"); }
    };
    fetchJob();
  }, [id]);

  const changeEventHandler = (e) => setInput({ ...input, [e.target.name]: e.target.value });
  const selectChangeHandler = (value) => {
    const co = companies.find(c => c.name.toLowerCase() === value);
    if (co) setInput({ ...input, companyId: co._id });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.put(`${JOB_API_END_POINT}/update/${id}`,
        { ...input, requirements: input.requirements.split(",").map(r => r.trim()) },
        { headers: { "Content-Type": "application/json" }, withCredentials: true }
      );
      if (res.data.success) { toast.success("Job updated successfully"); navigate("/admin/jobs"); }
    } catch (error) {
      toast.error(error.response?.data?.message || "Update failed");
    } finally { setLoading(false); }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@500;700;800;900&family=Outfit:wght@400;500;600&display=swap');
        .uj-page { min-height: 100vh; background: #f9f5ff; font-family: 'Outfit', sans-serif; position: relative; overflow: hidden; }
        .uj-dots { position: fixed; inset: 0; pointer-events: none; opacity: 0.45; background-image: radial-gradient(circle, rgba(114,9,183,0.18) 1px, transparent 1px); background-size: 28px 28px; z-index: 0; }
        .uj-blob1 { position: fixed; top: -100px; right: -80px; width: 420px; height: 420px; border-radius: 50%; background: radial-gradient(circle, rgba(114,9,183,0.08) 0%, transparent 70%); pointer-events: none; z-index: 0; }
        .uj-blob2 { position: fixed; bottom: -80px; left: -60px; width: 340px; height: 340px; border-radius: 50%; background: radial-gradient(circle, rgba(114,9,183,0.05) 0%, transparent 70%); pointer-events: none; z-index: 0; }
        .uj-body { position: relative; z-index: 1; padding: calc(66px + 2rem) 1rem 3rem; display: flex; justify-content: center; }
        .uj-card { background: #fff; border: 1px solid rgba(114,9,183,0.12); border-radius: 24px; padding: 2rem; width: 100%; max-width: 720px; box-shadow: 0 12px 40px rgba(114,9,183,0.09), 0 2px 8px rgba(0,0,0,0.04); position: relative; }
        .uj-card::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px; background: linear-gradient(90deg, #7209b7, #b44bf7); border-radius: 24px 24px 0 0; }
        .uj-header { display: flex; align-items: center; gap: 1rem; padding-bottom: 1.25rem; border-bottom: 1px solid rgba(114,9,183,0.09); margin-bottom: 1.75rem; flex-wrap: wrap; }
        .uj-back-btn { display: inline-flex; align-items: center; gap: 6px; padding: 0.45rem 1rem; border-radius: 10px; border: 1.5px solid rgba(114,9,183,0.2); background: rgba(114,9,183,0.05); color: #7209b7; font-family: 'Outfit', sans-serif; font-size: 0.84rem; font-weight: 600; cursor: pointer; transition: all 0.2s; }
        .uj-back-btn:hover { background: rgba(114,9,183,0.1); border-color: #7209b7; }
        .uj-title { font-family: 'Plus Jakarta Sans', sans-serif; font-size: clamp(1.2rem, 3vw, 1.5rem); font-weight: 900; color: #18003a; letter-spacing: -0.03em; margin: 0; }
        .uj-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1.25rem; }
        @media (max-width: 600px) { .uj-grid { grid-template-columns: 1fr; } .uj-card { padding: 1.5rem 1rem; } }
        .uj-full { grid-column: 1 / -1; }
        .uj-label { display: flex; align-items: center; gap: 6px; font-family: 'Plus Jakarta Sans', sans-serif; font-size: 0.78rem; font-weight: 700; color: #18003a; letter-spacing: 0.04em; text-transform: uppercase; margin-bottom: 0.5rem; }
        .uj-label svg { color: #7209b7; }
        .uj-input { font-family: 'Outfit', sans-serif; font-size: 0.9rem; color: #18003a; width: 100%; padding: 0.7rem 1rem; border: 1.5px solid rgba(114,9,183,0.18); border-radius: 11px; background: #fdfaff; outline: none; transition: border-color 0.2s, box-shadow 0.2s; box-sizing: border-box; }
        .uj-input::placeholder { color: #c4b5d0; }
        .uj-input:focus { border-color: #7209b7; box-shadow: 0 0 0 3px rgba(114,9,183,0.1); background: #fff; }
        .uj-select-trigger { font-family: 'Outfit', sans-serif !important; font-size: 0.9rem !important; border: 1.5px solid rgba(114,9,183,0.18) !important; border-radius: 11px !important; background: #fdfaff !important; color: #18003a !important; padding: 0.7rem 1rem !important; height: auto !important; }
        .uj-submit { width: 100%; padding: 0.8rem; border: none; border-radius: 12px; background: #7209b7; color: #fff; font-family: 'Outfit', sans-serif; font-size: 0.95rem; font-weight: 600; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 8px; box-shadow: 0 4px 16px rgba(114,9,183,0.3); transition: all 0.2s; margin-top: 1.75rem; }
        .uj-submit:hover { background: #5c0799; transform: translateY(-1px); box-shadow: 0 6px 22px rgba(114,9,183,0.4); }
        .uj-submit:disabled { background: #c4b5d0; cursor: not-allowed; transform: none; box-shadow: none; }
      `}</style>

      <div className="uj-page">
        <Navbar />
        <div className="uj-dots" /><div className="uj-blob1" /><div className="uj-blob2" />
        <div className="uj-body">
          <div className="uj-card">
            <div className="uj-header">
              <button type="button" className="uj-back-btn" onClick={() => navigate("/admin/jobs")}>
                <ArrowLeft size={14} /> Back
              </button>
              <h1 className="uj-title">Update Job</h1>
            </div>

            <form onSubmit={submitHandler}>
              <div className="uj-grid">
                {FIELDS.map(({ name, label, icon, placeholder, type }) => {
  const Icon = icon;
  return (
    <div key={name}>
      <div className="uj-label"><Icon size={13} /> {label}</div>
      <input className="uj-input" type={type} name={name}
        value={input[name]} onChange={changeEventHandler}
        placeholder={placeholder} />
    </div>
  );
})}

                {companies.length > 0 && (
                  <div className="uj-full">
                    <div className="uj-label"><Building2 size={13} /> Select Company</div>
                    <Select onValueChange={selectChangeHandler}>
                      <SelectTrigger className="uj-select-trigger">
                        <SelectValue placeholder={companies.find(c => c._id === input.companyId)?.name || "Choose a company…"} />
                      </SelectTrigger>
                      <SelectContent style={{ background: "#fff", border: "1px solid rgba(114,9,183,0.15)", borderRadius: 14, boxShadow: "0 8px 28px rgba(114,9,183,0.12)" }}>
                        <SelectGroup>
                          {companies.map(co => (
                            <SelectItem key={co._id} value={co.name.toLowerCase()}>{co.name}</SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                )}
              </div>

              <button type="submit" className="uj-submit" disabled={loading}>
                {loading ? <><Loader2 size={16} className="animate-spin" /> Updating job…</> : "Update Job"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateJob;