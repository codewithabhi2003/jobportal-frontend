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

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [openMenu, setOpenMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
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
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Outfit:wght@300;400;500;600&display=swap');
        :root {
          --jp-primary: #7209b7;
          --jp-primary-light: #9b2dca;
          --jp-primary-dark: #560a8c;
          --jp-accent: #f72585;
          --jp-bg: #07000f;
          --jp-surface: #110020;
          --jp-border: rgba(114, 9, 183, 0.2);
          --jp-text: #f0e8ff;
          --jp-muted: rgba(240,232,255,0.5);
          --jp-font-display: 'Plus Jakarta Sans', sans-serif;
          --jp-font-body: 'Outfit', sans-serif;
        }
        .jp-nav {
          position: fixed; top: 0; left: 0; right: 0; z-index: 100;
          font-family: var(--jp-font-body);
          transition: background 0.4s ease, backdrop-filter 0.4s ease, box-shadow 0.4s ease;
        }
        .jp-nav.scrolled {
          background: rgba(7,0,15,0.88);
          backdrop-filter: blur(24px) saturate(180%);
          box-shadow: 0 1px 0 rgba(114,9,183,0.25), 0 8px 32px rgba(0,0,0,0.5);
        }
        .jp-nav.top { background: transparent; }

        .jp-inner {
          max-width: 1280px; margin: 0 auto;
          height: 68px; padding: 0 1.5rem;
          display: flex; align-items: center; justify-content: space-between;
        }
        .jp-logo {
          font-family: var(--jp-font-display);
          font-weight: 800; font-size: 1.4rem;
          color: #fff; letter-spacing: -0.03em;
          text-decoration: none; display: flex; align-items: center; gap: 2px;
        }
        .jp-logo-dot {
          width: 8px; height: 8px; border-radius: 50%;
          background: var(--jp-accent);
          display: inline-block; margin-left: 2px;
        }
        .jp-links { display: flex; align-items: center; gap: 2rem; }
        .jp-link {
          color: var(--jp-muted);
          font-size: 0.88rem; font-weight: 500; letter-spacing: 0.01em;
          text-decoration: none; background: none; border: none; cursor: pointer;
          position: relative; padding: 0.2rem 0;
          transition: color 0.2s;
          font-family: var(--jp-font-body);
        }
        .jp-link::after {
          content: ''; position: absolute; bottom: -3px; left: 0;
          width: 0; height: 2px;
          background: linear-gradient(90deg, var(--jp-primary), var(--jp-accent));
          border-radius: 2px;
          transition: width 0.25s cubic-bezier(0.4,0,0.2,1);
        }
        .jp-link:hover { color: #fff; }
        .jp-link:hover::after { width: 100%; }

        .jp-auth { display: flex; align-items: center; gap: 0.75rem; }
        .jp-btn-outline {
          font-family: var(--jp-font-body); font-weight: 500; font-size: 0.85rem;
          color: rgba(240,232,255,0.75); background: transparent;
          border: 1px solid rgba(114,9,183,0.4); border-radius: 8px;
          padding: 0.45rem 1.1rem; cursor: pointer; text-decoration: none;
          transition: all 0.2s; display: inline-flex; align-items: center;
        }
        .jp-btn-outline:hover {
          border-color: var(--jp-primary);
          color: #fff; background: rgba(114,9,183,0.1);
        }
        .jp-btn-fill {
          font-family: var(--jp-font-body); font-weight: 600; font-size: 0.85rem;
          color: #fff; background: var(--jp-primary);
          border: none; border-radius: 8px;
          padding: 0.45rem 1.2rem; cursor: pointer; text-decoration: none;
          transition: all 0.2s; display: inline-flex; align-items: center;
          box-shadow: 0 4px 20px rgba(114,9,183,0.35);
        }
        .jp-btn-fill:hover {
          background: var(--jp-primary-light);
          transform: translateY(-1px);
          box-shadow: 0 6px 28px rgba(114,9,183,0.5);
        }
        .jp-avatar-wrap {
          width: 38px; height: 38px; border-radius: 50%;
          border: 2px solid rgba(114,9,183,0.5);
          overflow: hidden; cursor: pointer;
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        .jp-avatar-wrap:hover {
          border-color: var(--jp-primary);
          box-shadow: 0 0 0 3px rgba(114,9,183,0.2);
        }
        .jp-popover-content {
          background: #110020 !important;
          border: 1px solid rgba(114,9,183,0.25) !important;
          border-radius: 12px !important;
          padding: 0.4rem !important;
          min-width: 190px;
          box-shadow: 0 16px 48px rgba(0,0,0,0.6), 0 0 0 1px rgba(114,9,183,0.1) !important;
        }
        .jp-pop-item {
          display: flex; align-items: center; gap: 10px;
          padding: 0.6rem 0.85rem; border-radius: 8px;
          color: rgba(240,232,255,0.7); font-size: 0.875rem;
          font-family: var(--jp-font-body); font-weight: 400;
          text-decoration: none; background: none; border: none;
          width: 100%; text-align: left; cursor: pointer;
          transition: all 0.15s;
        }
        .jp-pop-item:hover { background: rgba(114,9,183,0.15); color: #fff; }
        .jp-pop-item.danger { color: #f72585; }
        .jp-pop-item.danger:hover { background: rgba(247,37,133,0.1); }
        .jp-pop-divider {
          height: 1px; background: rgba(114,9,183,0.15); margin: 0.3rem 0.5rem;
        }

        .jp-hamburger {
          background: none; border: 1px solid rgba(114,9,183,0.3);
          border-radius: 8px; padding: 0.5rem;
          color: rgba(240,232,255,0.7); cursor: pointer;
          display: flex; align-items: center;
          transition: all 0.2s;
        }
        .jp-hamburger:hover {
          border-color: var(--jp-primary); color: #fff;
          background: rgba(114,9,183,0.1);
        }

        .jp-drawer {
          position: fixed; top: 68px; left: 0; bottom: 0; width: 300px;
          background: #0a0018;
          border-right: 1px solid rgba(114,9,183,0.2);
          z-index: 99; padding: 1.5rem;
          display: flex; flex-direction: column; gap: 0.25rem;
          overflow-y: auto;
        }
        .jp-drawer-link {
          display: flex; align-items: center; gap: 12px;
          color: rgba(240,232,255,0.6); font-size: 1rem;
          font-family: var(--jp-font-body); font-weight: 400;
          padding: 0.85rem 1rem; border-radius: 10px;
          text-decoration: none; background: none; border: none;
          width: 100%; text-align: left; cursor: pointer;
          transition: all 0.2s;
        }
        .jp-drawer-link:hover {
          background: rgba(114,9,183,0.12); color: #fff;
        }
        .jp-drawer-divider {
          height: 1px; background: rgba(114,9,183,0.12);
          margin: 0.5rem 0;
        }
        .jp-overlay {
          position: fixed; inset: 0; background: rgba(0,0,0,0.6);
          z-index: 98; backdrop-filter: blur(4px);
        }

        @media (max-width: 767px) { .jp-desktop-only { display: none !important; } }
        @media (min-width: 768px) { .jp-mobile-only { display: none !important; } }
      `}</style>

      <header className={`jp-nav ${scrolled ? "scrolled" : "top"}`}>
        <div className="jp-inner">
          {/* Hamburger — mobile */}
          <button
            className="jp-hamburger jp-mobile-only"
            onClick={() => setOpenMenu((p) => !p)}
            aria-label="Toggle menu"
          >
            {openMenu ? <X size={20} /> : <Menu size={20} />}
          </button>

          {/* Logo */}
          <Link to="/" className="jp-logo">
            Job<span style={{ color: "var(--jp-primary)" }}>Portal</span>
            <span className="jp-logo-dot" />
          </Link>

          {/* Desktop nav */}
          <nav className="jp-links jp-desktop-only">
            {navLinks.map((link) =>
              link.action ? (
                <button key={link.label} className="jp-link" onClick={link.action}>
                  {link.label}
                </button>
              ) : (
                <Link key={link.label} to={link.to} className="jp-link">
                  {link.label}
                </Link>
              )
            )}
          </nav>

          {/* Auth */}
          <div className="jp-auth">
            {!user ? (
              <>
                <Link to="/login" className="jp-btn-outline jp-desktop-only">Login</Link>
                <Link to="/signup" className="jp-btn-fill">Sign Up</Link>
              </>
            ) : (
              <Popover>
                <PopoverTrigger asChild>
                  <div className="jp-avatar-wrap">
                    <Avatar style={{ width: "100%", height: "100%" }}>
                      <AvatarImage src={user?.profile?.profilePhoto} />
                    </Avatar>
                  </div>
                </PopoverTrigger>
                <PopoverContent className="jp-popover-content" style={{ zIndex: 200 }}>
                  <div style={{ padding: "0.5rem 0.85rem 0.75rem", borderBottom: "1px solid rgba(114,9,183,0.15)", marginBottom: "0.3rem" }}>
                    <p style={{ fontFamily: "var(--jp-font-body)", fontSize: "0.9rem", color: "#fff", fontWeight: 600, margin: 0 }}>
                      {user?.fullname || "User"}
                    </p>
                    <p style={{ fontFamily: "var(--jp-font-body)", fontSize: "0.78rem", color: "rgba(240,232,255,0.45)", margin: "2px 0 0" }}>
                      {user?.email}
                    </p>
                  </div>
                  <Link to="/profile" className="jp-pop-item">
                    <User2 size={15} /> View Profile
                  </Link>
                  <div className="jp-pop-divider" />
                  <button onClick={logoutHandler} className="jp-pop-item danger">
                    <LogOut size={15} /> Logout
                  </button>
                </PopoverContent>
              </Popover>
            )}
          </div>
        </div>
      </header>

      {/* Mobile Overlay */}
      <AnimatePresence>
        {openMenu && (
          <>
            <motion.div
              className="jp-overlay jp-mobile-only"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpenMenu(false)}
            />
            <motion.aside
              className="jp-drawer jp-mobile-only"
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <div style={{ marginBottom: "1rem" }}>
                <span className="jp-logo" style={{ fontSize: "1.2rem" }}>
                  Job<span style={{ color: "var(--jp-primary)" }}>Portal</span>
                  <span className="jp-logo-dot" />
                </span>
              </div>
              <div className="jp-drawer-divider" />
              {navLinks.map((link) =>
                link.action ? (
                  <button key={link.label} className="jp-drawer-link" onClick={link.action}>
                    {link.label}
                  </button>
                ) : (
                  <Link
                    key={link.label}
                    to={link.to}
                    className="jp-drawer-link"
                    onClick={() => setOpenMenu(false)}
                  >
                    {link.label}
                  </Link>
                )
              )}
              {!user && (
                <>
                  <div className="jp-drawer-divider" />
                  <Link to="/login" className="jp-drawer-link" onClick={() => setOpenMenu(false)}>
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