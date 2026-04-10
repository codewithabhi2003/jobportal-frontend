import React, { useState, useEffect } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Avatar, AvatarImage } from "../ui/avatar";
import { LogOut, User2, Menu, X } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { setUser } from "@/redux/authSlice";
import { motion, AnimatePresence } from "framer-motion";

const NAV_H = 66; // navbar height in px — keep in sync with Home.jsx paddingTop

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [openMenu, setOpenMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true });
      if (res.data.success) {
        dispatch(setUser(null));
        navigate("/");
        toast.success(res.data.message);
        setOpenMenu(false);
      }
    } catch {
      toast.error("Logout failed");
    }
  };

  const handleAboutClick = () => {
    if (location.pathname === "/") {
      document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate("/", { state: { scrollTo: "about" } });
    }
    setOpenMenu(false);
  };

  const navLinks =
    user?.role === "Recruiter"
      ? [
          { label: "Companies", to: "/admin/companies" },
          { label: "Jobs", to: "/admin/jobs" },
        ]
      : [
          { label: "Home", to: "/" },
          { label: "About", action: handleAboutClick },
          { label: "Jobs", to: "/jobs" },
          { label: "Bookmark", to: "/bookmark" },
        ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@500;600;700;800&family=Outfit:wght@400;500;600&display=swap');

        /* ---- scoped to navbar only, all names prefixed jpnav- ---- */
        .jpnav-root {
          position: fixed;
          top: 0; left: 0; right: 0;
          z-index: 9999;
          height: ${NAV_H}px;
          background: #ffffff;
          border-bottom: 1px solid #f0e8ff;
          transition: box-shadow 0.25s ease;
          font-family: 'Outfit', sans-serif;
        }
        .jpnav-root.jpnav-scrolled {
          box-shadow: 0 4px 24px rgba(114,9,183,0.08), 0 1px 0 rgba(114,9,183,0.06);
        }
        .jpnav-inner {
          max-width: 1280px;
          margin: 0 auto;
          height: 100%;
          padding: 0 1.5rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1.5rem;
        }
        /* Logo */
        .jpnav-logo {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-weight: 800;
          font-size: 1.3rem;
          letter-spacing: -0.03em;
          color: #18003a;
          text-decoration: none;
          flex-shrink: 0;
          line-height: 1;
        }
        .jpnav-logo-accent { color: #7209b7; }

        /* Desktop links */
        .jpnav-links {
          display: flex;
          align-items: center;
          gap: 0.15rem;
          flex: 1;
          justify-content: center;
        }
        .jpnav-link {
          font-family: 'Outfit', sans-serif;
          font-size: 0.9rem;
          font-weight: 500;
          color: #4b5563;
          text-decoration: none;
          background: none;
          border: none;
          cursor: pointer;
          padding: 0.45rem 0.9rem;
          border-radius: 8px;
          transition: color 0.18s, background 0.18s;
          line-height: 1;
        }
        .jpnav-link:hover {
          color: #7209b7;
          background: rgba(114,9,183,0.06);
        }

        /* Auth buttons */
        .jpnav-auth {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          flex-shrink: 0;
        }
        .jpnav-btn-login {
          font-family: 'Outfit', sans-serif;
          font-weight: 500;
          font-size: 0.875rem;
          color: #7209b7;
          background: transparent;
          border: 1.5px solid rgba(114,9,183,0.3);
          border-radius: 9px;
          padding: 0.45rem 1.1rem;
          cursor: pointer;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          transition: all 0.2s;
          line-height: 1;
        }
        .jpnav-btn-login:hover {
          border-color: #7209b7;
          background: rgba(114,9,183,0.04);
        }
        .jpnav-btn-signup {
          font-family: 'Outfit', sans-serif;
          font-weight: 600;
          font-size: 0.875rem;
          color: #fff;
          background: #7209b7;
          border: none;
          border-radius: 9px;
          padding: 0.5rem 1.2rem;
          cursor: pointer;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          transition: all 0.2s;
          box-shadow: 0 3px 12px rgba(114,9,183,0.25);
          line-height: 1;
        }
        .jpnav-btn-signup:hover {
          background: #5c0799;
          transform: translateY(-1px);
          box-shadow: 0 5px 18px rgba(114,9,183,0.35);
        }

        /* Avatar */
        .jpnav-avatar {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          border: 2px solid rgba(114,9,183,0.25);
          overflow: hidden;
          cursor: pointer;
          transition: border-color 0.2s, box-shadow 0.2s;
          flex-shrink: 0;
        }
        .jpnav-avatar:hover {
          border-color: #7209b7;
          box-shadow: 0 0 0 3px rgba(114,9,183,0.1);
        }

        /* Popover */
        .jpnav-pop {
          background: #ffffff !important;
          border: 1px solid rgba(114,9,183,0.1) !important;
          border-radius: 14px !important;
          padding: 0.35rem !important;
          min-width: 200px;
          box-shadow: 0 8px 30px rgba(114,9,183,0.1), 0 2px 8px rgba(0,0,0,0.05) !important;
        }
        .jpnav-pop-head {
          padding: 0.65rem 0.9rem 0.7rem;
          border-bottom: 1px solid rgba(114,9,183,0.07);
          margin-bottom: 0.3rem;
        }
        .jpnav-pop-name {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 0.9rem;
          font-weight: 700;
          color: #18003a;
          margin: 0;
        }
        .jpnav-pop-email {
          font-size: 0.75rem;
          color: #9ca3af;
          margin: 2px 0 0;
          font-family: 'Outfit', sans-serif;
        }
        .jpnav-pop-item {
          display: flex;
          align-items: center;
          gap: 9px;
          padding: 0.55rem 0.9rem;
          border-radius: 9px;
          color: #374151;
          font-size: 0.86rem;
          font-family: 'Outfit', sans-serif;
          font-weight: 500;
          text-decoration: none;
          background: none;
          border: none;
          width: 100%;
          text-align: left;
          cursor: pointer;
          transition: all 0.15s;
        }
        .jpnav-pop-item:hover { background: rgba(114,9,183,0.06); color: #7209b7; }
        .jpnav-pop-item.jpnav-danger { color: #dc2626; }
        .jpnav-pop-item.jpnav-danger:hover { background: rgba(220,38,38,0.05); }
        .jpnav-pop-divider { height: 1px; background: rgba(114,9,183,0.07); margin: 0.2rem 0.5rem; }

        /* Hamburger */
        .jpnav-burger {
          background: none;
          border: 1.5px solid rgba(114,9,183,0.18);
          border-radius: 9px;
          padding: 0.45rem;
          color: #7209b7;
          cursor: pointer;
          display: flex;
          align-items: center;
          transition: all 0.18s;
        }
        .jpnav-burger:hover {
          background: rgba(114,9,183,0.06);
          border-color: rgba(114,9,183,0.4);
        }

        /* Mobile drawer */
        .jpnav-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.15);
          z-index: 9998;
          backdrop-filter: blur(2px);
        }
        .jpnav-drawer {
          position: fixed;
          top: ${NAV_H}px;
          left: 0;
          bottom: 0;
          width: 280px;
          background: #ffffff;
          border-right: 1px solid rgba(114,9,183,0.09);
          z-index: 9999;
          padding: 1rem 0.75rem;
          display: flex;
          flex-direction: column;
          gap: 0.1rem;
          box-shadow: 4px 0 20px rgba(114,9,183,0.07);
          overflow-y: auto;
        }
        .jpnav-drawer-link {
          display: block;
          color: #374151;
          font-size: 0.95rem;
          font-family: 'Outfit', sans-serif;
          font-weight: 500;
          padding: 0.8rem 1rem;
          border-radius: 10px;
          text-decoration: none;
          background: none;
          border: none;
          width: 100%;
          text-align: left;
          cursor: pointer;
          transition: all 0.18s;
        }
        .jpnav-drawer-link:hover { background: rgba(114,9,183,0.07); color: #7209b7; }
        .jpnav-drawer-sep { height: 1px; background: rgba(114,9,183,0.08); margin: 0.5rem 0.5rem; }

        @media (max-width: 767px) { .jpnav-desktop { display: none !important; } }
        @media (min-width: 768px) { .jpnav-mobile { display: none !important; } }
      `}</style>

      <header className={`jpnav-root${scrolled ? " jpnav-scrolled" : ""}`}>
        <div className="jpnav-inner">

          {/* Hamburger — mobile only */}
          <button
            className="jpnav-burger jpnav-mobile"
            onClick={() => setOpenMenu((p) => !p)}
            aria-label="Toggle menu"
          >
            {openMenu ? <X size={19} /> : <Menu size={19} />}
          </button>

          {/* Logo */}
          <Link to="/" className="jpnav-logo">
            Job<span className="jpnav-logo-accent">Portal</span>
          </Link>

          {/* Desktop nav */}
          <nav className="jpnav-links jpnav-desktop">
            {navLinks.map((link) =>
              link.action ? (
                <button key={link.label} className="jpnav-link" onClick={link.action}>
                  {link.label}
                </button>
              ) : (
                <Link key={link.label} to={link.to} className="jpnav-link">
                  {link.label}
                </Link>
              )
            )}
          </nav>

          {/* Auth */}
          <div className="jpnav-auth">
            {!user ? (
              <>
                <Link to="/login" className="jpnav-btn-login jpnav-desktop">Login</Link>
                <Link to="/signup" className="jpnav-btn-signup">Sign Up</Link>
              </>
            ) : (
              <Popover>
                <PopoverTrigger asChild>
                  <div className="jpnav-avatar">
                    <Avatar style={{ width: "100%", height: "100%" }}>
                      <AvatarImage src={user?.profile?.profilePhoto} />
                    </Avatar>
                  </div>
                </PopoverTrigger>
                <PopoverContent className="jpnav-pop" style={{ zIndex: 10000 }}>
                  <div className="jpnav-pop-head">
                    <p className="jpnav-pop-name">{user?.fullname || "User"}</p>
                    <p className="jpnav-pop-email">{user?.email}</p>
                  </div>
                  <Link to="/profile" className="jpnav-pop-item">
                    <User2 size={15} /> View Profile
                  </Link>
                  <div className="jpnav-pop-divider" />
                  <button onClick={logoutHandler} className="jpnav-pop-item jpnav-danger">
                    <LogOut size={15} /> Logout
                  </button>
                </PopoverContent>
              </Popover>
            )}
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {openMenu && (
          <>
            <motion.div
              className="jpnav-overlay jpnav-mobile"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setOpenMenu(false)}
            />
            <motion.aside
              className="jpnav-drawer jpnav-mobile"
              initial={{ x: -280 }} animate={{ x: 0 }} exit={{ x: -280 }}
              transition={{ type: "spring", stiffness: 320, damping: 32 }}
            >
              {navLinks.map((link) =>
                link.action ? (
                  <button key={link.label} className="jpnav-drawer-link" onClick={link.action}>
                    {link.label}
                  </button>
                ) : (
                  <Link
                    key={link.label}
                    to={link.to}
                    className="jpnav-drawer-link"
                    onClick={() => setOpenMenu(false)}
                  >
                    {link.label}
                  </Link>
                )
              )}
              {!user && (
                <>
                  <div className="jpnav-drawer-sep" />
                  <Link to="/login" className="jpnav-drawer-link" onClick={() => setOpenMenu(false)}>
                    Login
                  </Link>
                </>
              )}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;