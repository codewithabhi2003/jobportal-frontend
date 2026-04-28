import React, { useEffect, useState } from "react";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Edit2, MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const CompaniesTable = () => {
  const { companies, searchCompanyByText } = useSelector((store) => store.company);
  const [filterCompany, setFilterCompany] = useState(companies);
  const navigate = useNavigate();

  useEffect(() => {
    const filtered = companies.filter((company) => {
      if (!searchCompanyByText) return true;
      return company?.name?.toLowerCase().includes(searchCompanyByText.toLowerCase());
    });
    setFilterCompany(filtered);
  }, [companies, searchCompanyByText]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@500;700;800&family=Outfit:wght@400;500;600&display=swap');
        .ct-wrap {
          background: #ffffff;
          border: 1px solid rgba(114,9,183,0.12);
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 8px 32px rgba(114,9,183,0.08), 0 2px 8px rgba(0,0,0,0.04);
          position: relative;
        }
        .ct-wrap::before {
          content: '';
          position: absolute; top: 0; left: 0; right: 0; height: 3px;
          background: linear-gradient(90deg, #7209b7, #b44bf7);
        }
        .ct-scroll { width: 100%; overflow-x: auto; }
        .ct-table { width: 100%; min-width: 560px; border-collapse: collapse; font-family: 'Outfit', sans-serif; }
        .ct-thead { background: rgba(114,9,183,0.05); }
        .ct-thead th {
          padding: 0.9rem 1.1rem; text-align: left;
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 0.75rem; font-weight: 700;
          color: #7209b7; letter-spacing: 0.06em;
          text-transform: uppercase;
          border-bottom: 1px solid rgba(114,9,183,0.1);
          white-space: nowrap;
        }
        .ct-thead th:last-child { text-align: right; }
        .ct-row { border-bottom: 1px solid rgba(114,9,183,0.06); transition: background 0.18s; }
        .ct-row:last-child { border-bottom: none; }
        .ct-row:hover { background: rgba(114,9,183,0.03); }
        .ct-row:nth-child(even) { background: rgba(249,245,255,0.5); }
        .ct-row:nth-child(even):hover { background: rgba(114,9,183,0.04); }
        .ct-td { padding: 0.85rem 1.1rem; font-size: 0.875rem; color: #374151; vertical-align: middle; }
        .ct-td:last-child { text-align: right; }
        .ct-avatar { width: 40px; height: 40px; border-radius: 10px; border: 1px solid rgba(114,9,183,0.15); overflow: hidden; background: #f9f5ff; }
        .ct-name { font-family: 'Plus Jakarta Sans', sans-serif; font-weight: 700; color: #18003a; font-size: 0.875rem; }
        .ct-date { color: #9ca3af; font-size: 0.8rem; }
        .ct-menu-btn {
          width: 32px; height: 32px; border-radius: 8px;
          border: 1px solid rgba(114,9,183,0.15);
          background: rgba(114,9,183,0.04);
          display: inline-flex; align-items: center; justify-content: center;
          cursor: pointer; color: #7209b7; transition: all 0.18s;
        }
        .ct-menu-btn:hover { background: rgba(114,9,183,0.1); border-color: rgba(114,9,183,0.3); }
        .ct-pop {
          background: #fff !important;
          border: 1px solid rgba(114,9,183,0.12) !important;
          border-radius: 14px !important;
          padding: 0.4rem !important;
          min-width: 140px;
          box-shadow: 0 8px 28px rgba(114,9,183,0.12) !important;
        }
        .ct-pop-btn {
          display: flex; align-items: center; gap: 8px;
          width: 100%; padding: 0.5rem 0.8rem;
          border-radius: 9px; border: none;
          font-family: 'Outfit', sans-serif;
          font-size: 0.82rem; font-weight: 600;
          cursor: pointer; transition: all 0.15s;
          background: rgba(114,9,183,0.08); color: #7209b7;
        }
        .ct-pop-btn:hover { background: rgba(114,9,183,0.15); }
        .ct-empty { text-align: center; padding: 2.5rem 1rem; color: #9ca3af; font-size: 0.875rem; font-family: 'Outfit', sans-serif; }
        .ct-caption { text-align: center; padding: 0.75rem; color: #b0b8c9; font-size: 0.78rem; font-family: 'Outfit', sans-serif; border-top: 1px solid rgba(114,9,183,0.06); }
      `}</style>

      <div className="ct-wrap">
        <div className="ct-scroll">
          <table className="ct-table">
            <thead className="ct-thead">
              <tr>
                <th>Logo</th>
                <th>Name</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filterCompany?.length === 0 ? (
                <tr>
                  <td colSpan={4} className="ct-empty">
                    No companies registered yet. Add your first company.
                  </td>
                </tr>
              ) : (
                filterCompany?.map((company) => (
                  <tr key={company._id} className="ct-row">
                    <td className="ct-td">
                      <div className="ct-avatar">
                        <Avatar style={{ width: "100%", height: "100%", borderRadius: 0 }}>
                          <AvatarImage src={company.logo} />
                        </Avatar>
                      </div>
                    </td>
                    <td className="ct-td">
                      <span className="ct-name">{company.name}</span>
                    </td>
                    <td className="ct-td">
                      <span className="ct-date">{company.createdAt?.split("T")[0]}</span>
                    </td>
                    <td className="ct-td">
                      <Popover>
                        <PopoverTrigger asChild>
                          <button className="ct-menu-btn">
                            <MoreHorizontal size={15} />
                          </button>
                        </PopoverTrigger>
                        <PopoverContent className="ct-pop">
                          <button
                            className="ct-pop-btn"
                            onClick={() => navigate(`/admin/companies/${company._id}`)}
                          >
                            <Edit2 size={13} /> Edit
                          </button>
                        </PopoverContent>
                      </Popover>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
          {filterCompany?.length > 0 && (
            <div className="ct-caption">
              Showing {filterCompany.length} compan{filterCompany.length !== 1 ? "ies" : "y"}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CompaniesTable;