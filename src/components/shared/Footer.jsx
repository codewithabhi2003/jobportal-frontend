import React from "react";
import { Link } from "react-router-dom";
import { Github, Twitter, Linkedin, Mail } from "lucide-react";

const LINKS = {
  Product: [
    { label: "Find Jobs", to: "/jobs" },
    { label: "Browse Companies", to: "/companies" },
    { label: "Bookmarks", to: "/bookmark" },
  ],
  Company: [
    { label: "About", to: "/#about" },
    { label: "Contact", to: "/contact" },
    { label: "Privacy Policy", to: "/privacy" },
  ],
  Recruiters: [
    { label: "Post a Job", to: "/admin/jobs" },
    { label: "Manage Companies", to: "/admin/companies" },
    { label: "Dashboard", to: "/admin" },
  ],
};

const SOCIALS = [
  { Icon: Github, href: "#", label: "GitHub" },
  { Icon: Twitter, href: "#", label: "Twitter" },
  { Icon: Linkedin, href: "#", label: "LinkedIn" },
  { Icon: Mail, href: "#", label: "Email" },
];

const Footer = () => {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&family=Outfit:wght@300;400;500&display=swap');
        .jp-footer {
          background: #050009;
          border-top: 1px solid rgba(114,9,183,0.18);
          font-family: 'Outfit', sans-serif;
          position: relative; overflow: hidden;
        }
        .jp-footer-glow {
          position: absolute; top: -80px; left: 50%; transform: translateX(-50%);
          width: 600px; height: 200px; border-radius: 50%;
          background: radial-gradient(circle, rgba(114,9,183,0.12) 0%, transparent 70%);
          pointer-events: none; filter: blur(30px);
        }
        .jp-footer-inner {
          max-width: 1280px; margin: 0 auto;
          padding: 3.5rem 1.5rem 2rem;
          position: relative; z-index: 1;
        }
        .jp-footer-top {
          display: grid;
          grid-template-columns: 1.4fr 1fr 1fr 1fr;
          gap: 2.5rem;
          padding-bottom: 2.5rem;
          border-bottom: 1px solid rgba(114,9,183,0.1);
          margin-bottom: 1.75rem;
        }
        @media (max-width: 900px) {
          .jp-footer-top { grid-template-columns: 1fr 1fr; }
          .jp-footer-brand { grid-column: 1/-1; }
        }
        @media (max-width: 540px) {
          .jp-footer-top { grid-template-columns: 1fr; }
        }
        .jp-footer-logo {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-weight: 800; font-size: 1.35rem;
          color: #f0e8ff; letter-spacing: -0.03em;
          text-decoration: none; display: inline-flex; align-items: center; gap: 2px;
        }
        .jp-footer-logo-dot {
          width: 7px; height: 7px; border-radius: 50%;
          background: #f72585; display: inline-block; margin-left: 2px;
        }
        .jp-footer-tagline {
          color: rgba(240,232,255,0.38); font-size: 0.875rem;
          line-height: 1.65; margin-top: 0.75rem; max-width: 240px;
        }
        .jp-footer-socials {
          display: flex; gap: 0.6rem; margin-top: 1.25rem;
        }
        .jp-social-btn {
          width: 34px; height: 34px; border-radius: 8px;
          background: rgba(114,9,183,0.1);
          border: 1px solid rgba(114,9,183,0.2);
          display: flex; align-items: center; justify-content: center;
          color: rgba(199,125,255,0.6);
          text-decoration: none; transition: all 0.2s;
        }
        .jp-social-btn:hover {
          background: rgba(114,9,183,0.2); color: #c77dff;
          border-color: rgba(114,9,183,0.4);
          transform: translateY(-2px);
        }
        .jp-footer-col-title {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 0.78rem; font-weight: 700;
          color: rgba(199,125,255,0.5);
          letter-spacing: 0.1em; text-transform: uppercase;
          margin-bottom: 1rem;
        }
        .jp-footer-link {
          display: block; color: rgba(240,232,255,0.45);
          text-decoration: none; font-size: 0.875rem;
          padding: 0.3rem 0;
          transition: color 0.2s;
        }
        .jp-footer-link:hover { color: #c77dff; }
        .jp-footer-bottom {
          display: flex; align-items: center; justify-content: space-between;
          flex-wrap: wrap; gap: 0.75rem;
        }
        .jp-footer-copy {
          color: rgba(240,232,255,0.25); font-size: 0.8rem;
        }
        .jp-footer-copy span { color: rgba(114,9,183,0.7); }
        .jp-footer-badge {
          display: inline-flex; align-items: center; gap: 6px;
          padding: 0.3rem 0.75rem; border-radius: 6px;
          background: rgba(114,9,183,0.08);
          border: 1px solid rgba(114,9,183,0.18);
          color: rgba(199,125,255,0.5); font-size: 0.73rem;
        }
      `}</style>

      <footer className="jp-footer">
        <div className="jp-footer-glow" />
        <div className="jp-footer-inner">
          <div className="jp-footer-top">
            {/* Brand */}
            <div className="jp-footer-brand">
              <Link to="/" className="jp-footer-logo">
                Job<span style={{ color: "#7209b7" }}>Portal</span>
                <span className="jp-footer-logo-dot" />
              </Link>
              <p className="jp-footer-tagline">
                Connecting talented professionals with top companies across India — one dream job at a time.
              </p>
              <div className="jp-footer-socials">
                {SOCIALS.map(({ Icon, href, label }) => (
                  <a key={label} href={href} className="jp-social-btn" aria-label={label}>
                    <Icon size={14} />
                  </a>
                ))}
              </div>
            </div>

            {/* Link columns */}
            {Object.entries(LINKS).map(([group, links]) => (
              <div key={group}>
                <div className="jp-footer-col-title">{group}</div>
                {links.map((l) => (
                  <Link key={l.label} to={l.to} className="jp-footer-link">
                    {l.label}
                  </Link>
                ))}
              </div>
            ))}
          </div>

          <div className="jp-footer-bottom">
            <p className="jp-footer-copy">
              © {new Date().getFullYear()} <span>JobPortal</span>. All rights reserved.
            </p>
            <div className="jp-footer-badge">
              <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#4ade80", display: "inline-block" }} />
              All systems operational
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;