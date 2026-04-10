import React from "react";
import { Briefcase, Users, Rocket, Search, ShieldCheck, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";

const FEATURES = [
  {
    icon: Briefcase,
    title: "Find the Right Job",
    desc: "Browse curated job listings tailored to your skills, interests, experience level, and long-term career goals.",
    color: "#7209b7",
    bg: "rgba(114,9,183,0.1)",
    border: "rgba(114,9,183,0.2)",
  },
  {
    icon: Users,
    title: "Trusted Companies",
    desc: "Connect with verified recruiters and trusted companies actively looking for skilled and motivated professionals.",
    color: "#9b2dca",
    bg: "rgba(155,45,202,0.1)",
    border: "rgba(155,45,202,0.2)",
  },
  {
    icon: Rocket,
    title: "Grow Your Career",
    desc: "Apply seamlessly, prepare confidently, and take meaningful steps toward professional growth and long-term success.",
    color: "#c77dff",
    bg: "rgba(199,125,255,0.08)",
    border: "rgba(199,125,255,0.18)",
  },
  {
    icon: TrendingUp,
    title: "Track Applications",
    desc: "Monitor all your job applications in real time with clear status updates and organized tracking.",
    color: "#7209b7",
    bg: "rgba(114,9,183,0.1)",
    border: "rgba(114,9,183,0.2)",
  },
  {
    icon: Search,
    title: "Smart Job Search",
    desc: "Quickly filter and search jobs by role, location, experience, and preferences for faster results.",
    color: "#9b2dca",
    bg: "rgba(155,45,202,0.1)",
    border: "rgba(155,45,202,0.2)",
  },
  {
    icon: ShieldCheck,
    title: "Secure & Reliable",
    desc: "Your personal data is protected using secure authentication, reliable infrastructure, and best security practices.",
    color: "#c77dff",
    bg: "rgba(199,125,255,0.08)",
    border: "rgba(199,125,255,0.18)",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: (i) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.5, delay: i * 0.08, ease: "easeOut" },
  }),
};

const About = () => {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&family=Outfit:wght@300;400;500&display=swap');
        .about-section {
          background: #07000f;
          padding: 5rem 1.5rem 5rem;
          position: relative; overflow: hidden;
          font-family: 'Outfit', sans-serif;
        }
        .about-bg-line {
          position: absolute; left: 0; right: 0; top: 0; height: 1px;
          background: linear-gradient(90deg, transparent, rgba(114,9,183,0.4), transparent);
        }
        .about-bg-line-b {
          position: absolute; left: 0; right: 0; bottom: 0; height: 1px;
          background: linear-gradient(90deg, transparent, rgba(114,9,183,0.25), transparent);
        }
        .about-inner { max-width: 1280px; margin: 0 auto; }

        .about-eyebrow {
          display: inline-flex; align-items: center; gap: 8px;
          background: rgba(114,9,183,0.08);
          border: 1px solid rgba(114,9,183,0.2);
          border-radius: 999px;
          padding: 0.35rem 1rem;
          color: #c77dff; font-size: 0.78rem; font-weight: 500;
          letter-spacing: 0.06em; text-transform: uppercase;
          margin-bottom: 1.25rem;
        }
        .about-title {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: clamp(1.9rem, 3.5vw, 2.8rem);
          font-weight: 800; color: #f0e8ff;
          letter-spacing: -0.03em; line-height: 1.15;
          margin: 0 0 1rem;
        }
        .about-title-accent {
          background: linear-gradient(135deg, #7209b7 0%, #c77dff 60%);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .about-sub {
          color: rgba(240,232,255,0.45); font-size: 1rem;
          line-height: 1.75; max-width: 520px;
        }

        .about-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.25rem;
          margin-top: 3.5rem;
        }
        @media (max-width: 900px) {
          .about-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 560px) {
          .about-grid { grid-template-columns: 1fr; }
        }

        .about-card {
          background: rgba(255,255,255,0.025);
          border: 1px solid rgba(114,9,183,0.14);
          border-radius: 16px;
          padding: 1.75rem 1.5rem;
          position: relative; overflow: hidden;
          transition: all 0.3s cubic-bezier(0.4,0,0.2,1);
          cursor: default;
        }
        .about-card::before {
          content: ''; position: absolute; inset: 0;
          background: radial-gradient(circle at top left, rgba(114,9,183,0.07) 0%, transparent 60%);
          opacity: 0; transition: opacity 0.3s;
        }
        .about-card:hover {
          border-color: rgba(114,9,183,0.35);
          background: rgba(114,9,183,0.06);
          transform: translateY(-5px);
          box-shadow: 0 16px 48px rgba(114,9,183,0.15), 0 0 0 1px rgba(114,9,183,0.12);
        }
        .about-card:hover::before { opacity: 1; }

        .about-card-num {
          position: absolute; top: 1rem; right: 1.25rem;
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 2.5rem; font-weight: 800;
          color: rgba(114,9,183,0.07); line-height: 1;
          user-select: none;
        }
        .about-icon-wrap {
          width: 46px; height: 46px; border-radius: 12px;
          display: flex; align-items: center; justify-content: center;
          margin-bottom: 1.1rem;
          position: relative; z-index: 1;
        }
        .about-card-title {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 1rem; font-weight: 700;
          color: #f0e8ff; margin-bottom: 0.6rem;
          position: relative; z-index: 1;
        }
        .about-card-desc {
          color: rgba(240,232,255,0.45); font-size: 0.875rem;
          line-height: 1.7; position: relative; z-index: 1;
        }
      `}</style>

      <section id="about" className="about-section">
        <div className="about-bg-line" />
        <div className="about-bg-line-b" />

        <div className="about-inner">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="about-eyebrow">
              <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#7209b7", boxShadow: "0 0 6px #7209b7", display: "inline-block" }} />
              Why JobPortal
            </div>
            <h2 className="about-title">
              Built for every{" "}
              <span className="about-title-accent">career journey</span>
            </h2>
            <p className="about-sub">
              Whether you're starting fresh or leveling up, JobPortal gives you the
              tools, connections, and confidence to land the role you deserve.
            </p>
          </motion.div>

          <div className="about-grid">
            {FEATURES.map((f, i) => (
              <motion.div
                key={f.title}
                className="about-card"
                custom={i}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <span className="about-card-num">0{i + 1}</span>
                <div
                  className="about-icon-wrap"
                  style={{ background: f.bg, border: `1px solid ${f.border}` }}
                >
                  <f.icon size={20} color={f.color} />
                </div>
                <h3 className="about-card-title">{f.title}</h3>
                <p className="about-card-desc">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default About;