import { motion } from "framer-motion";

import React from "react";
import { Briefcase, Users, Rocket, Search, ShieldCheck, TrendingUp } from "lucide-react";
const FEATURES = [
  { icon: Briefcase,   title: "Find the Right Job",    desc: "Browse curated listings tailored to your skills, interests, and long-term career goals." },
  { icon: Users,       title: "Trusted Companies",     desc: "Connect with verified recruiters and companies actively looking for skilled professionals." },
  { icon: Rocket,      title: "Grow Your Career",      desc: "Apply seamlessly, prepare confidently, and take steps toward professional growth." },
  { icon: TrendingUp,  title: "Track Applications",    desc: "Monitor all your job applications in real time with clear status updates and tracking." },
  { icon: Search,      title: "Smart Job Search",      desc: "Filter and search jobs by role, location, experience, and preferences for faster results." },
  { icon: ShieldCheck, title: "Secure & Reliable",     desc: "Your data is protected with secure authentication and best-in-class security practices." },
];

const About = () => {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@500;700;800&family=Outfit:wght@400;500&display=swap');
        .abt-section {
          background: #ffffff;
          padding: 5rem 1.5rem;
          font-family: 'Outfit', sans-serif;
          position: relative;
        }
        .abt-topline {
          position: absolute; top: 0; left: 0; right: 0; height: 1px;
          background: linear-gradient(90deg, transparent 0%, rgba(114,9,183,0.15) 50%, transparent 100%);
        }
        .abt-inner { max-width: 1280px; margin: 0 auto; }
        .abt-eyebrow {
          display: inline-flex; align-items: center; gap: 7px;
          background: rgba(114,9,183,0.06); border: 1px solid rgba(114,9,183,0.18);
          border-radius: 999px; padding: 0.32rem 0.9rem;
          color: #7209b7; font-size: 0.76rem; font-weight: 600;
          letter-spacing: 0.06em; text-transform: uppercase;
          margin-bottom: 1rem;
        }
        .abt-title {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: clamp(1.8rem, 3vw, 2.6rem);
          font-weight: 800; color: #18003a;
          letter-spacing: -0.03em; line-height: 1.15; margin: 0 0 0.9rem;
        }
        .abt-title-grad {
          background: linear-gradient(135deg, #7209b7 0%, #b44bf7 100%);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .abt-sub { color: #6b7280; font-size: 1rem; line-height: 1.7; max-width: 500px; }

        .abt-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.1rem;
          margin-top: 3rem;
        }
        @media (max-width: 880px) { .abt-grid { grid-template-columns: repeat(2,1fr); } }
        @media (max-width: 520px) { .abt-grid { grid-template-columns: 1fr; } }

        .abt-card {
          background: #faf7ff;
          border: 1px solid rgba(114,9,183,0.1);
          border-radius: 16px;
          padding: 1.6rem 1.4rem;
          position: relative; overflow: hidden;
          transition: all 0.28s cubic-bezier(0.4,0,0.2,1);
          cursor: default;
        }
        .abt-card:hover {
          border-color: rgba(114,9,183,0.3);
          background: #fff;
          transform: translateY(-5px);
          box-shadow: 0 12px 40px rgba(114,9,183,0.1), 0 2px 8px rgba(0,0,0,0.04);
        }
        .abt-card-num {
          position: absolute; top: 1rem; right: 1.2rem;
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 2.8rem; font-weight: 900;
          color: rgba(114,9,183,0.05); line-height: 1;
          user-select: none; pointer-events: none;
        }
        .abt-icon {
          width: 44px; height: 44px; border-radius: 12px;
          background: rgba(114,9,183,0.08); border: 1px solid rgba(114,9,183,0.14);
          display: flex; align-items: center; justify-content: center;
          color: #7209b7; margin-bottom: 1rem;
          transition: background 0.2s;
        }
        .abt-card:hover .abt-icon { background: rgba(114,9,183,0.12); }
        .abt-card-title {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 0.98rem; font-weight: 700; color: #18003a; margin-bottom: 0.5rem;
        }
        .abt-card-desc { color: #6b7280; font-size: 0.865rem; line-height: 1.65; }
      `}</style>

      <section id="about" className="abt-section">
        <div className="abt-topline" />
        <div className="abt-inner">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
          >
            <div className="abt-eyebrow">
              <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#7209b7", display: "inline-block" }} />
              Why JobPortal
            </div>
            <h2 className="abt-title">
              Built for every{" "}
              <span className="abt-title-grad">career journey</span>
            </h2>
            <p className="abt-sub">
              Whether you're starting fresh or leveling up, JobPortal gives you the tools,
              connections, and confidence to land the role you deserve.
            </p>
          </motion.div>

          <div className="abt-grid">
            {FEATURES.map((f, i) => (
              <motion.div
                key={f.title}
                className="abt-card"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.42, delay: i * 0.07, ease: "easeOut" }}
              >
                <span className="abt-card-num">0{i + 1}</span>
                <div className="abt-icon"><f.icon size={19} /></div>
                <h3 className="abt-card-title">{f.title}</h3>
                <p className="abt-card-desc">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default About;