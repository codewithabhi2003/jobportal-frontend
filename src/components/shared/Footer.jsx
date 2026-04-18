import React from "react";
import { Link } from "react-router-dom";
import { GitHub, Twitter, Linkedin, Mail } from "lucide-react";

const LINKS = {
  Product:   [{ label: "Find Jobs", to: "/jobs" }, { label: "Browse", to: "/browse" }, { label: "Bookmarks", to: "/bookmark" }],
  Company:   [{ label: "About Us", to: "/#about" }, { label: "Contact", to: "/contact" }, { label: "Privacy", to: "/privacy" }],
  Recruiters:[{ label: "Post a Job", to: "/admin/jobs" }, { label: "Companies", to: "/admin/companies" }, { label: "Dashboard", to: "/admin" }],
};
const SOCIALS = [
  { Icon: GitHub, href: "#", label: "GitHub" },
  { Icon: Twitter, href: "#", label: "Twitter" },
  { Icon: Linkedin, href: "#", label: "LinkedIn" },
  { Icon: Mail, href: "#", label: "Email" },
];

const Footer = () => (
  <>
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@500;700;800&family=Outfit:wght@400;500&display=swap');
      .jpfooter {
        background: #18003a;
        font-family: 'Outfit', sans-serif;
        position: relative;
        overflow: hidden;
      }
      .jpfooter-glow {
        position: absolute; top: -60px; left: 50%; transform: translateX(-50%);
        width: 600px; height: 180px; border-radius: 50%;
        background: radial-gradient(circle, rgba(114,9,183,0.25) 0%, transparent 70%);
        filter: blur(40px); pointer-events: none;
      }
      .jpfooter-inner {
        max-width: 1280px; margin: 0 auto;
        padding: 3.5rem 1.5rem 2rem;
        position: relative; z-index: 1;
      }
      .jpfooter-top {
        display: grid;
        grid-template-columns: 1.5fr 1fr 1fr 1fr;
        gap: 2.5rem;
        padding-bottom: 2.5rem;
        border-bottom: 1px solid rgba(255,255,255,0.07);
        margin-bottom: 1.75rem;
      }
      @media (max-width: 860px) { .jpfooter-top { grid-template-columns: 1fr 1fr; } .jpfooter-brand { grid-column: 1/-1; } }
      @media (max-width: 480px) { .jpfooter-top { grid-template-columns: 1fr; } }

      .jpfooter-logo {
        font-family: 'Plus Jakarta Sans', sans-serif;
        font-weight: 800; font-size: 1.3rem; color: #fff;
        letter-spacing: -0.03em; text-decoration: none; display: inline-block;
      }
      .jpfooter-logo-acc { color: #b44bf7; }
      .jpfooter-tag { color: rgba(255,255,255,0.4); font-size: 0.875rem; line-height: 1.65; margin-top: 0.7rem; max-width: 230px; }

      .jpfooter-socials { display: flex; gap: 0.55rem; margin-top: 1.2rem; }
      .jpfooter-social {
        width: 34px; height: 34px; border-radius: 8px;
        background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.1);
        display: flex; align-items: center; justify-content: center;
        color: rgba(255,255,255,0.45); text-decoration: none;
        transition: all 0.2s;
      }
      .jpfooter-social:hover { background: rgba(114,9,183,0.25); color: #fff; border-color: rgba(114,9,183,0.4); transform: translateY(-2px); }

      .jpfooter-col-hd { font-size: 0.73rem; font-weight: 700; color: rgba(255,255,255,0.3); letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 1rem; font-family: 'Plus Jakarta Sans', sans-serif; }
      .jpfooter-link { display: block; color: rgba(255,255,255,0.5); text-decoration: none; font-size: 0.875rem; padding: 0.28rem 0; transition: color 0.18s; }
      .jpfooter-link:hover { color: #b44bf7; }

      .jpfooter-bottom {
        display: flex; align-items: center; justify-content: space-between;
        flex-wrap: wrap; gap: 0.75rem;
      }
      .jpfooter-copy { color: rgba(255,255,255,0.25); font-size: 0.8rem; }
      .jpfooter-copy span { color: rgba(180,75,247,0.6); }
      .jpfooter-badge {
        display: inline-flex; align-items: center; gap: 6px;
        padding: 0.28rem 0.75rem; border-radius: 7px;
        background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.08);
        color: rgba(255,255,255,0.35); font-size: 0.73rem;
      }
      .jpfooter-badge-dot { width: 6px; height: 6px; border-radius: 50%; background: #22c55e; }
    `}</style>

    <footer className="jpfooter">
      <div className="jpfooter-glow" />
      <div className="jpfooter-inner">
        <div className="jpfooter-top">
          <div className="jpfooter-brand">
            <Link to="/" className="jpfooter-logo">
              Job<span className="jpfooter-logo-acc">Portal</span>
            </Link>
            <p className="jpfooter-tag">
              Connecting talented professionals with top companies across India — one dream job at a time.
            </p>
            <div className="jpfooter-socials">
              {SOCIALS.map(({ Icon, href, label }) => (
                <a key={label} href={href} className="jpfooter-social" aria-label={label}>
                  <Icon size={14} />
                </a>
              ))}
            </div>
          </div>

          {Object.entries(LINKS).map(([group, links]) => (
            <div key={group}>
              <div className="jpfooter-col-hd">{group}</div>
              {links.map((l) => (
                <Link key={l.label} to={l.to} className="jpfooter-link">{l.label}</Link>
              ))}
            </div>
          ))}
        </div>

        <div className="jpfooter-bottom">
          <p className="jpfooter-copy">
            © {new Date().getFullYear()} <span>JobPortal</span>. All rights reserved.
          </p>
          <div className="jpfooter-badge">
            <span className="jpfooter-badge-dot" />
            All systems operational
          </div>
        </div>
      </div>
    </footer>
  </>
);

export default Footer;