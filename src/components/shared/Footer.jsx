import React from "react";
import { Link } from "react-router-dom";

const LINKS = {
  Product:   [{ label: "Find Jobs", to: "/jobs" }, { label: "Browse", to: "/browse" }, { label: "Bookmarks", to: "/bookmark" }],
  Company:   [{ label: "About Us", to: "/#about" }, { label: "Contact", to: "/contact" }, { label: "Privacy", to: "/privacy" }],
  Recruiters:[{ label: "Post a Job", to: "/admin/jobs" }, { label: "Companies", to: "/admin/companies" }, { label: "Dashboard", to: "/admin" }],
};

// Inline SVGs replace deprecated lucide-react social icons (Twitter/X, Linkedin, GitHub, Mail)
const GitHubIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
  </svg>
);

const XIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622 5.911-5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

const LinkedInIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

const MailIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2"/>
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
  </svg>
);

const SOCIALS = [
  { IconComponent: GitHubIcon,   href: "#", label: "GitHub" },
  { IconComponent: XIcon,        href: "#", label: "X (Twitter)" },
  { IconComponent: LinkedInIcon, href: "#", label: "LinkedIn" },
  { IconComponent: MailIcon,     href: "#", label: "Email" },
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
              {SOCIALS.map(({ IconComponent, href, label }) => (
                <a key={label} href={href} className="jpfooter-social" aria-label={label}>
                  <IconComponent />
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