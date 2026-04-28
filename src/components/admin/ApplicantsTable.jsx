import React from "react";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { MoreHorizontal, CheckCircle, XCircle } from "lucide-react";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import axios from "axios";
import { APPLICATION_API_END_POINT } from "@/utils/constant";

const ApplicantsTable = () => {
  const { applicants } = useSelector((store) => store.application);

  const statusHandler = async (status, id) => {
    try {
      const res = await axios.post(
        `${APPLICATION_API_END_POINT}/status/${id}/update`,
        { status },
        { withCredentials: true }
      );
      if (res.data.success) toast.success(res.data.message);
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@500;700;800&family=Outfit:wght@400;500;600&display=swap');
        .apt-wrap {
          background: #ffffff;
          border: 1px solid rgba(114,9,183,0.12);
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 8px 32px rgba(114,9,183,0.08), 0 2px 8px rgba(0,0,0,0.04);
          position: relative;
        }
        .apt-wrap::before {
          content: '';
          position: absolute; top: 0; left: 0; right: 0; height: 3px;
          background: linear-gradient(90deg, #7209b7, #b44bf7);
        }
        .apt-scroll { width: 100%; overflow-x: auto; }
        .apt-table { width: 100%; min-width: 780px; border-collapse: collapse; font-family: 'Outfit', sans-serif; }
        .apt-thead { background: rgba(114,9,183,0.05); }
        .apt-thead th {
          padding: 0.9rem 1.1rem; text-align: left;
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 0.75rem; font-weight: 700;
          color: #7209b7; letter-spacing: 0.06em;
          text-transform: uppercase;
          border-bottom: 1px solid rgba(114,9,183,0.1);
          white-space: nowrap;
        }
        .apt-thead th:last-child { text-align: right; }
        .apt-row { border-bottom: 1px solid rgba(114,9,183,0.06); transition: background 0.18s; }
        .apt-row:last-child { border-bottom: none; }
        .apt-row:hover { background: rgba(114,9,183,0.03); }
        .apt-row:nth-child(even) { background: rgba(249,245,255,0.5); }
        .apt-row:nth-child(even):hover { background: rgba(114,9,183,0.04); }
        .apt-td { padding: 0.85rem 1.1rem; font-size: 0.875rem; color: #374151; vertical-align: middle; }
        .apt-td:last-child { text-align: right; }
        .apt-avatar { width: 40px; height: 40px; border-radius: 50%; border: 2px solid rgba(114,9,183,0.15); overflow: hidden; background: #f9f5ff; }
        .apt-name { font-family: 'Plus Jakarta Sans', sans-serif; font-weight: 700; color: #18003a; font-size: 0.875rem; }
        .apt-email { color: #6b7280; font-size: 0.82rem; }
        .apt-phone { color: #6b7280; font-size: 0.82rem; }
        .apt-date { color: #9ca3af; font-size: 0.8rem; }
        .apt-resume-link {
          color: #7209b7; font-weight: 600; font-size: 0.82rem;
          text-decoration: none;
          padding: 0.2rem 0.6rem;
          background: rgba(114,9,183,0.07);
          border-radius: 6px;
          transition: background 0.15s;
        }
        .apt-resume-link:hover { background: rgba(114,9,183,0.14); }
        .apt-na { color: #c4b5d0; font-size: 0.8rem; }
        .apt-menu-btn {
          width: 32px; height: 32px; border-radius: 8px;
          border: 1px solid rgba(114,9,183,0.15);
          background: rgba(114,9,183,0.04);
          display: inline-flex; align-items: center; justify-content: center;
          cursor: pointer; color: #7209b7; transition: all 0.18s;
        }
        .apt-menu-btn:hover { background: rgba(114,9,183,0.1); border-color: rgba(114,9,183,0.3); }
        .apt-pop {
          background: #fff !important;
          border: 1px solid rgba(114,9,183,0.12) !important;
          border-radius: 14px !important;
          padding: 0.4rem !important;
          min-width: 150px;
          box-shadow: 0 8px 28px rgba(114,9,183,0.12) !important;
        }
        .apt-pop-item {
          display: flex; align-items: center; gap: 8px;
          width: 100%; padding: 0.55rem 0.85rem;
          border-radius: 9px; border: none; background: none;
          font-family: 'Outfit', sans-serif;
          font-size: 0.84rem; font-weight: 500;
          cursor: pointer; transition: all 0.15s;
          margin-bottom: 0.2rem;
          color: #374151;
        }
        .apt-pop-item:last-child { margin-bottom: 0; }
        .apt-pop-item:hover { background: rgba(114,9,183,0.06); color: #7209b7; }
        .apt-pop-accept:hover { background: rgba(34,197,94,0.08); color: #16a34a; }
        .apt-pop-reject:hover { background: rgba(239,68,68,0.07); color: #dc2626; }
        .apt-empty { text-align: center; padding: 2.5rem 1rem; color: #9ca3af; font-size: 0.875rem; font-family: 'Outfit', sans-serif; }
        .apt-caption { text-align: center; padding: 0.75rem; color: #b0b8c9; font-size: 0.78rem; font-family: 'Outfit', sans-serif; border-top: 1px solid rgba(114,9,183,0.06); }
      `}</style>

      <div className="apt-wrap">
        <div className="apt-scroll">
          <table className="apt-table">
            <thead className="apt-thead">
              <tr>
                <th>Photo</th>
                <th>Name</th>
                <th>Email</th>
                <th>Contact</th>
                <th>Resume</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {!applicants?.applications?.length ? (
                <tr>
                  <td colSpan={7} className="apt-empty">
                    No applicants yet for this job.
                  </td>
                </tr>
              ) : (
                applicants.applications.map((item) => (
                  <tr key={item._id} className="apt-row">
                    <td className="apt-td">
                      <div className="apt-avatar">
                        <Avatar style={{ width: "100%", height: "100%" }}>
                          <AvatarImage src={item?.applicant?.profile?.profilePhoto} />
                        </Avatar>
                      </div>
                    </td>
                    <td className="apt-td">
                      <span className="apt-name">{item?.applicant?.fullname || "N/A"}</span>
                    </td>
                    <td className="apt-td">
                      <span className="apt-email">{item?.applicant?.email || "N/A"}</span>
                    </td>
                    <td className="apt-td">
                      <span className="apt-phone">{item?.applicant?.phoneNumber || "N/A"}</span>
                    </td>
                    <td className="apt-td">
                      {item.applicant?.profile?.resume ? (
                        <a
                          className="apt-resume-link"
                          href={item.applicant.profile.resume}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          View
                        </a>
                      ) : (
                        <span className="apt-na">N/A</span>
                      )}
                    </td>
                    <td className="apt-td">
                      <span className="apt-date">{item?.createdAt?.split("T")[0]}</span>
                    </td>
                    <td className="apt-td">
                      <Popover>
                        <PopoverTrigger asChild>
                          <button className="apt-menu-btn">
                            <MoreHorizontal size={15} />
                          </button>
                        </PopoverTrigger>
                        <PopoverContent className="apt-pop">
                          <button
                            className="apt-pop-item apt-pop-accept"
                            onClick={() => statusHandler("Accepted", item._id)}
                          >
                            <CheckCircle size={14} color="#16a34a" /> Accept
                          </button>
                          <button
                            className="apt-pop-item apt-pop-reject"
                            onClick={() => statusHandler("Rejected", item._id)}
                          >
                            <XCircle size={14} color="#dc2626" /> Reject
                          </button>
                        </PopoverContent>
                      </Popover>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
          {applicants?.applications?.length > 0 && (
            <div className="apt-caption">
              {applicants.applications.length} applicant{applicants.applications.length !== 1 ? "s" : ""}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ApplicantsTable;