import React, { useEffect, useState } from "react";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Edit2, Eye, MoreHorizontal, Trash2 } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { JOB_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";

const AdminJobsTable = () => {
  const { allAdminJobs, searchJobByText } = useSelector((store) => store.job);
  const [filterJobs, setFilterJobs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const filtered = allAdminJobs.filter((job) => {
      if (!searchJobByText) return true;
      return (
        job?.title?.toLowerCase().includes(searchJobByText.toLowerCase()) ||
        job?.company?.name?.toLowerCase().includes(searchJobByText.toLowerCase())
      );
    });
    setFilterJobs(filtered);
  }, [allAdminJobs, searchJobByText]);

  const deleteJobHandler = async (jobId) => {
    if (!window.confirm("Are you sure you want to delete this job?")) return;
    try {
      const res = await axios.delete(`${JOB_API_END_POINT}/delete/${jobId}`, {
        withCredentials: true,
      });
      if (res.data.success) {
        toast.success("Job deleted successfully");
        setFilterJobs((prev) => prev.filter((job) => job._id !== jobId));
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete job");
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@500;700;800&family=Outfit:wght@400;500;600&display=swap');
        .ajt-wrap {
          background: #ffffff;
          border: 1px solid rgba(114,9,183,0.12);
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 8px 32px rgba(114,9,183,0.08), 0 2px 8px rgba(0,0,0,0.04);
          position: relative;
        }
        .ajt-wrap::before {
          content: '';
          position: absolute; top: 0; left: 0; right: 0; height: 3px;
          background: linear-gradient(90deg, #7209b7, #b44bf7);
        }
        .ajt-scroll { width: 100%; overflow-x: auto; }
        .ajt-table {
          width: 100%; min-width: 640px;
          border-collapse: collapse;
          font-family: 'Outfit', sans-serif;
        }
        .ajt-thead { background: rgba(114,9,183,0.05); }
        .ajt-thead th {
          padding: 0.9rem 1.1rem;
          text-align: left;
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 0.75rem; font-weight: 700;
          color: #7209b7;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          border-bottom: 1px solid rgba(114,9,183,0.1);
          white-space: nowrap;
        }
        .ajt-thead th:last-child { text-align: right; }
        .ajt-row { border-bottom: 1px solid rgba(114,9,183,0.06); transition: background 0.18s; }
        .ajt-row:last-child { border-bottom: none; }
        .ajt-row:hover { background: rgba(114,9,183,0.03); }
        .ajt-row:nth-child(even) { background: rgba(249,245,255,0.5); }
        .ajt-row:nth-child(even):hover { background: rgba(114,9,183,0.04); }
        .ajt-td { padding: 0.85rem 1.1rem; font-size: 0.875rem; color: #374151; vertical-align: middle; }
        .ajt-td:last-child { text-align: right; }
        .ajt-avatar {
          width: 40px; height: 40px; border-radius: 10px;
          border: 1px solid rgba(114,9,183,0.15);
          overflow: hidden; background: #f9f5ff;
        }
        .ajt-company { font-family: 'Plus Jakarta Sans', sans-serif; font-weight: 700; color: #18003a; font-size: 0.875rem; }
        .ajt-role { font-weight: 500; color: #4b5563; }
        .ajt-date { color: #9ca3af; font-size: 0.8rem; }
        .ajt-menu-btn {
          width: 32px; height: 32px; border-radius: 8px;
          border: 1px solid rgba(114,9,183,0.15);
          background: rgba(114,9,183,0.04);
          display: inline-flex; align-items: center; justify-content: center;
          cursor: pointer; color: #7209b7;
          transition: all 0.18s;
        }
        .ajt-menu-btn:hover { background: rgba(114,9,183,0.1); border-color: rgba(114,9,183,0.3); }
        .ajt-pop {
          background: #fff !important;
          border: 1px solid rgba(114,9,183,0.12) !important;
          border-radius: 14px !important;
          padding: 0.4rem !important;
          min-width: 150px;
          box-shadow: 0 8px 28px rgba(114,9,183,0.12) !important;
        }
        .ajt-pop-btn {
          display: flex; align-items: center; gap: 8px;
          width: 100%; padding: 0.5rem 0.8rem;
          border-radius: 9px; border: none;
          font-family: 'Outfit', sans-serif;
          font-size: 0.82rem; font-weight: 600;
          cursor: pointer; transition: all 0.15s;
          margin-bottom: 0.25rem;
        }
        .ajt-pop-btn:last-child { margin-bottom: 0; }
        .ajt-pop-edit { background: rgba(114,9,183,0.08); color: #7209b7; }
        .ajt-pop-edit:hover { background: rgba(114,9,183,0.15); }
        .ajt-pop-view { background: rgba(34,197,94,0.08); color: #16a34a; }
        .ajt-pop-view:hover { background: rgba(34,197,94,0.15); }
        .ajt-pop-del { background: rgba(239,68,68,0.07); color: #dc2626; }
        .ajt-pop-del:hover { background: rgba(239,68,68,0.14); }
        .ajt-empty {
          text-align: center; padding: 2.5rem 1rem;
          color: #9ca3af; font-size: 0.875rem;
          font-family: 'Outfit', sans-serif;
        }
        .ajt-caption {
          text-align: center; padding: 0.75rem;
          color: #b0b8c9; font-size: 0.78rem;
          font-family: 'Outfit', sans-serif;
          border-top: 1px solid rgba(114,9,183,0.06);
        }
      `}</style>

      <div className="ajt-wrap">
        <div className="ajt-scroll">
          <table className="ajt-table">
            <thead className="ajt-thead">
              <tr>
                <th>Logo</th>
                <th>Company</th>
                <th>Role</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filterJobs.length === 0 ? (
                <tr>
                  <td colSpan={5} className="ajt-empty">
                    No jobs found. Post your first job to get started.
                  </td>
                </tr>
              ) : (
                filterJobs.map((job) => (
                  <tr key={job._id} className="ajt-row">
                    <td className="ajt-td">
                      <div className="ajt-avatar">
                        <Avatar style={{ width: "100%", height: "100%", borderRadius: 0 }}>
                          <AvatarImage src={job?.company?.logo || "/default-logo.png"} />
                        </Avatar>
                      </div>
                    </td>
                    <td className="ajt-td">
                      <span className="ajt-company">{job?.company?.name}</span>
                    </td>
                    <td className="ajt-td">
                      <span className="ajt-role">{job?.title}</span>
                    </td>
                    <td className="ajt-td">
                      <span className="ajt-date">{job?.createdAt?.split("T")[0]}</span>
                    </td>
                    <td className="ajt-td">
                      <Popover>
                        <PopoverTrigger asChild>
                          <button className="ajt-menu-btn">
                            <MoreHorizontal size={15} />
                          </button>
                        </PopoverTrigger>
                        <PopoverContent className="ajt-pop">
                          <button
                            className="ajt-pop-btn ajt-pop-edit"
                            onClick={() => navigate(`/admin/jobs/edit/${job._id}`)}
                          >
                            <Edit2 size={13} /> Edit
                          </button>
                          <button
                            className="ajt-pop-btn ajt-pop-view"
                            onClick={() => navigate(`/admin/jobs/${job._id}/applicants`)}
                          >
                            <Eye size={13} /> Applicants
                          </button>
                          <button
                            className="ajt-pop-btn ajt-pop-del"
                            onClick={() => deleteJobHandler(job._id)}
                          >
                            <Trash2 size={13} /> Delete
                          </button>
                        </PopoverContent>
                      </Popover>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
          {filterJobs.length > 0 && (
            <div className="ajt-caption">
              Showing {filterJobs.length} job{filterJobs.length !== 1 ? "s" : ""}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AdminJobsTable;