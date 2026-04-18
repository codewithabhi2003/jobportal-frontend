import React, { useState } from 'react'
import {
  Dialog, DialogContent, DialogHeader,
  DialogTitle, DialogDescription
} from './ui/dialog'
import { Loader2, User, Mail, Phone, FileText, AlignLeft, Star, X } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { setUser } from '@/redux/authSlice'
import { toast } from 'sonner'

const UpdateProfileDialog = ({ open, setOpen }) => {
  const [loading, setLoading] = useState(false)
  const { user } = useSelector(store => store.auth)

  const [input, setInput] = useState({
    fullname: user?.fullname || "",
    email: user?.email || "",
    phoneNumber: user?.phoneNumber || "",
    bio: user?.profile?.bio || "",
    skills: user?.profile?.skills?.join(", ") || "",
    file: null
  })
  const dispatch = useDispatch()

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value })
  }

  const fileChangeHandler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] })
  }

  const submitHandler = async (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append("fullname", input.fullname)
    formData.append("email", input.email)
    formData.append("phoneNumber", input.phoneNumber)
    formData.append("bio", input.bio)
    formData.append("skills", JSON.stringify(input.skills.split(", ")))
    if (input.file) formData.append("resume", input.file)

    try {
      setLoading(true)
      const res = await axios.post(`${USER_API_END_POINT}/profile/update`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true
      })
      if (res.data.success) {
        dispatch(setUser(res.data.user))
        toast.success(res.data.message)
        setOpen(false)
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred")
    } finally {
      setLoading(false)
    }
  }

  const fields = [
    { id: "fullname",    label: "Full Name", icon: User,      type: "text",  placeholder: "John Doe" },
    { id: "email",       label: "Email",     icon: Mail,      type: "email", placeholder: "you@example.com" },
    { id: "phoneNumber", label: "Phone",     icon: Phone,     type: "text",  placeholder: "+91 98765 43210" },
    { id: "bio",         label: "Bio",       icon: AlignLeft, type: "text",  placeholder: "A short bio about you" },
    { id: "skills",      label: "Skills",    icon: Star,      type: "text",  placeholder: "React, Node.js, Python" },
  ]

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@500;700;800;900&family=Outfit:wght@400;500;600&display=swap');
        .upd-overlay [role="dialog"] { font-family: 'Outfit', sans-serif; }
        .upd-modal { background: #fff; border: 1px solid rgba(114,9,183,0.15); border-radius: 20px !important; padding: 0 !important; overflow: hidden; box-shadow: 0 20px 60px rgba(114,9,183,0.15), 0 4px 16px rgba(0,0,0,0.06) !important; max-width: 460px !important; width: 95% !important; }
        .upd-top-bar { height: 3px; background: linear-gradient(90deg, #7209b7, #b44bf7); }
        .upd-inner { padding: 1.6rem 1.8rem 1.8rem; }
        .upd-head { display: flex; align-items: center; justify-content: space-between; margin-bottom: 1.4rem; }
        .upd-title { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 1.2rem; font-weight: 800; color: #18003a; letter-spacing: -0.02em; }
        .upd-close { width: 30px; height: 30px; border-radius: 8px; background: rgba(114,9,183,0.06); border: 1px solid rgba(114,9,183,0.12); display: flex; align-items: center; justify-content: center; color: #7209b7; cursor: pointer; transition: all 0.18s; }
        .upd-close:hover { background: rgba(114,9,183,0.12); }
        .upd-field { margin-bottom: 1rem; }
        .upd-label { display: flex; align-items: center; gap: 5px; font-size: 0.78rem; font-weight: 600; color: #4b006e; margin-bottom: 0.38rem; font-family: 'Outfit', sans-serif; }
        .upd-input-wrap { position: relative; }
        .upd-input-icon { position: absolute; left: 10px; top: 50%; transform: translateY(-50%); color: #b084d8; pointer-events: none; display: flex; align-items: center; }
        .upd-input { width: 100%; box-sizing: border-box; padding: 0.6rem 0.85rem 0.6rem 2.2rem; border: 1.5px solid rgba(114,9,183,0.18); border-radius: 10px; font-family: 'Outfit', sans-serif; font-size: 0.88rem; color: #18003a; background: #fdfaff; outline: none; transition: border-color 0.2s, box-shadow 0.2s; }
        .upd-input::placeholder { color: #c4b5d4; }
        .upd-input:focus { border-color: #7209b7; box-shadow: 0 0 0 3px rgba(114,9,183,0.1); background: #fff; }
        .upd-file-label { display: flex; align-items: center; gap: 9px; width: 100%; box-sizing: border-box; padding: 0.6rem 0.9rem; border: 1.5px dashed rgba(114,9,183,0.28); border-radius: 10px; font-family: 'Outfit', sans-serif; font-size: 0.84rem; color: #9ca3af; background: #fdfaff; cursor: pointer; transition: border-color 0.2s, background 0.2s; }
        .upd-file-label:hover { border-color: #7209b7; background: rgba(114,9,183,0.03); color: #7209b7; }
        .upd-file-name { font-size: 0.82rem; color: #7209b7; font-weight: 500; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
        .upd-submit-btn { width: 100%; margin-top: 1.3rem; padding: 0.7rem; border-radius: 11px; background: #7209b7; color: #fff; font-family: 'Outfit', sans-serif; font-size: 0.92rem; font-weight: 600; border: none; cursor: pointer; transition: all 0.2s; box-shadow: 0 4px 14px rgba(114,9,183,0.3); display: flex; align-items: center; justify-content: center; gap: 8px; }
        .upd-submit-btn:hover { background: #5c0799; transform: translateY(-1px); box-shadow: 0 6px 20px rgba(114,9,183,0.4); }
        .upd-submit-btn:disabled { opacity: 0.7; cursor: not-allowed; transform: none; }
      `}</style>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="upd-modal p-0 gap-0">
          <DialogTitle className="sr-only">Update Profile</DialogTitle>
          <DialogDescription className="sr-only">Edit your profile details</DialogDescription>

          <div className="upd-top-bar" />
          <div className="upd-inner">
            <div className="upd-head">
              <div className="upd-title">Update Profile</div>
              <button className="upd-close" onClick={() => setOpen(false)}>
                <X size={13} />
              </button>
            </div>

            <form onSubmit={submitHandler}>
              {fields.map((field) => {
                const FieldIcon = field.icon;
                return (
                  <div key={field.id} className="upd-field">
                    <label className="upd-label" htmlFor={field.id}>
                      <FieldIcon size={11} /> {field.label}
                    </label>
                    <div className="upd-input-wrap">
                      <span className="upd-input-icon"><FieldIcon size={13} /></span>
                      <input
                        id={field.id} name={field.id} type={field.type}
                        value={input[field.id]}
                        onChange={changeEventHandler}
                        placeholder={field.placeholder}
                        className="upd-input"
                      />
                    </div>
                  </div>
                );
              })}

              <div className="upd-field">
                <label className="upd-label" htmlFor="upd-resume">
                  <FileText size={11} /> Resume (PDF)
                </label>
                <label className="upd-file-label" htmlFor="upd-resume">
                  <FileText size={15} style={{ flexShrink: 0, color: "#b084d8" }} />
                  {input.file
                    ? <span className="upd-file-name">{input.file.name}</span>
                    : <span>Click to upload PDF</span>
                  }
                </label>
                <input
                  id="upd-resume" type="file" accept="application/pdf"
                  onChange={fileChangeHandler}
                  style={{ display: "none" }}
                />
              </div>

              <button className="upd-submit-btn" type="submit" disabled={loading}>
                {loading
                  ? <><Loader2 className="animate-spin" size={15} /> Saving…</>
                  : "Save Changes"
                }
              </button>
            </form>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default UpdateProfileDialog