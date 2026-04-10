import React, { useState, useEffect, useRef } from "react";
import { Search, ArrowRight, Briefcase, Users, TrendingUp } from "lucide-react";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const DOTS = Array.from({ length: 60 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 3 + 1.5,
  delay: Math.random() * 5,
  duration: Math.random() * 6 + 6,
}));

const STATS = [
  { icon: Briefcase, value: "50K+", label: "Live Jobs" },
  { icon: Users, value: "120K+", label: "Companies" },
  { icon: TrendingUp, value: "2M+", label: "Job Seekers" },
];

const POPULAR = ["UI/UX Designer", "React Developer", "Data Analyst", "Product Manager"];

const HeroSection = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const canvasRef = useRef(null);

  const searchJobHandler = () => {
    dispatch(setSearchedQuery(query));
    navigate("/browse");
  };

  const handleKey = (e) => {
    if (e.key === "Enter") searchJobHandler();
  };

  /* ── Animated canvas grid lines ── */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animId;
    let w, h;

    const resize = () => {
      w = canvas.width = canvas.offsetWidth;
      h = canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const nodes = Array.from({ length: 28 }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      nodes.forEach((n) => {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > w) n.vx *= -1;
        if (n.y < 0 || n.y > h) n.vy *= -1;
      });

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 180) {
            const alpha = (1 - dist / 180) * 0.22;
            ctx.beginPath();
            ctx.strokeStyle = `rgba(114, 9, 183, ${alpha})`;
            ctx.lineWidth = 1;
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }

      nodes.forEach((n) => {
        ctx.beginPath();
        ctx.arc(n.x, n.y, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(154, 77, 226, 0.55)";
        ctx.fill();
      });

      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&family=Outfit:wght@300;400;500;600&display=swap');
        .hero-root {
          position: relative;
          min-height: 100vh;
          background: #07000f;
          overflow: hidden;
          display: flex; flex-direction: column; justify-content: center;
          padding-top: 68px;
          font-family: 'Outfit', sans-serif;
        }
        .hero-canvas {
          position: absolute; inset: 0; width: 100%; height: 100%;
          pointer-events: none; z-index: 1;
        }
        /* Radial glow blobs */
        .hero-glow-1 {
          position: absolute; top: -10%; left: -8%;
          width: 520px; height: 520px; border-radius: 50%;
          background: radial-gradient(circle, rgba(114,9,183,0.22) 0%, transparent 70%);
          filter: blur(40px); z-index: 0; pointer-events: none;
          animation: heroFloat1 12s ease-in-out infinite;
        }
        .hero-glow-2 {
          position: absolute; bottom: 5%; right: -5%;
          width: 440px; height: 440px; border-radius: 50%;
          background: radial-gradient(circle, rgba(247,37,133,0.12) 0%, transparent 65%);
          filter: blur(50px); z-index: 0; pointer-events: none;
          animation: heroFloat2 14s ease-in-out infinite;
        }
        .hero-glow-3 {
          position: absolute; top: 40%; left: 35%;
          width: 300px; height: 300px; border-radius: 50%;
          background: radial-gradient(circle, rgba(155,45,202,0.1) 0%, transparent 70%);
          filter: blur(60px); z-index: 0; pointer-events: none;
        }
        /* Hex grid pattern overlay */
        .hero-hex-pattern {
          position: absolute; inset: 0; z-index: 0; pointer-events: none; opacity: 0.035;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='104'%3E%3Cpolygon points='30,2 58,17 58,47 30,62 2,47 2,17' fill='none' stroke='%237209b7' stroke-width='1'/%3E%3Cpolygon points='30,52 58,67 58,97 30,112 2,97 2,67' fill='none' stroke='%237209b7' stroke-width='1'/%3E%3C/svg%3E");
        }
        @keyframes heroFloat1 {
          0%,100% { transform: translate(0,0) scale(1); }
          50% { transform: translate(30px, 40px) scale(1.1); }
        }
        @keyframes heroFloat2 {
          0%,100% { transform: translate(0,0) scale(1); }
          50% { transform: translate(-25px,-30px) scale(1.08); }
        }

        .hero-content {
          position: relative; z-index: 2;
          max-width: 1280px; margin: 0 auto;
          padding: 4rem 1.5rem 3rem;
          display: grid; grid-template-columns: 1fr 1fr;
          gap: 3rem; align-items: center;
        }
        @media (max-width: 900px) {
          .hero-content { grid-template-columns: 1fr; gap: 2rem; }
          .hero-right { display: none; }
        }

        .hero-badge {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 0.4rem 1rem; border-radius: 999px;
          border: 1px solid rgba(114,9,183,0.35);
          background: rgba(114,9,183,0.1);
          color: #c77dff; font-size: 0.8rem; font-weight: 500;
          letter-spacing: 0.04em; margin-bottom: 1.25rem;
        }
        .hero-badge-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: #7209b7;
          box-shadow: 0 0 8px #9b2dca;
          animation: pulseDot 2s ease-in-out infinite;
        }
        @keyframes pulseDot {
          0%,100%{ opacity:1; transform:scale(1); }
          50%{ opacity:0.5; transform:scale(0.7); }
        }

        .hero-title {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: clamp(2.4rem, 5vw, 3.8rem);
          font-weight: 900;
          color: #f0e8ff;
          line-height: 1.1;
          letter-spacing: -0.035em;
          margin: 0 0 1.25rem;
        }
        .hero-title-accent {
          background: linear-gradient(135deg, #9b2dca 0%, #c77dff 50%, #f72585 100%);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .hero-sub {
          color: rgba(240,232,255,0.55);
          font-size: 1.05rem; font-weight: 400; line-height: 1.7;
          max-width: 480px; margin-bottom: 2rem;
        }

        .hero-search {
          display: flex; align-items: center;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(114,9,183,0.35);
          border-radius: 14px;
          overflow: hidden;
          max-width: 520px;
          transition: border-color 0.25s, box-shadow 0.25s;
        }
        .hero-search:focus-within {
          border-color: #7209b7;
          box-shadow: 0 0 0 3px rgba(114,9,183,0.18), 0 8px 32px rgba(114,9,183,0.2);
        }
        .hero-search-icon {
          padding: 0 1rem 0 1.1rem; color: rgba(240,232,255,0.3);
          flex-shrink: 0;
        }
        .hero-input {
          flex: 1; background: none; border: none; outline: none;
          color: #f0e8ff; font-family: 'Outfit', sans-serif;
          font-size: 0.95rem; font-weight: 400;
          padding: 0.95rem 0.5rem 0.95rem 0;
        }
        .hero-input::placeholder { color: rgba(240,232,255,0.3); }
        .hero-search-btn {
          margin: 6px; background: #7209b7; color: #fff;
          border: none; border-radius: 10px;
          padding: 0.65rem 1.3rem;
          font-family: 'Outfit', sans-serif;
          font-size: 0.88rem; font-weight: 600;
          cursor: pointer; display: flex; align-items: center; gap: 6px;
          transition: all 0.2s; white-space: nowrap; flex-shrink: 0;
          box-shadow: 0 4px 16px rgba(114,9,183,0.4);
        }
        .hero-search-btn:hover {
          background: #9b2dca;
          box-shadow: 0 6px 24px rgba(114,9,183,0.6);
          transform: translateY(-1px);
        }

        .hero-popular {
          margin-top: 1.25rem;
          display: flex; align-items: center; flex-wrap: wrap; gap: 0.5rem;
        }
        .hero-popular-label {
          color: rgba(240,232,255,0.35); font-size: 0.78rem; font-weight: 500;
          letter-spacing: 0.04em; text-transform: uppercase;
        }
        .hero-chip {
          padding: 0.3rem 0.85rem; border-radius: 999px;
          border: 1px solid rgba(114,9,183,0.25);
          background: rgba(114,9,183,0.06);
          color: rgba(240,232,255,0.6); font-size: 0.78rem;
          cursor: pointer; transition: all 0.2s;
          font-family: 'Outfit', sans-serif;
        }
        .hero-chip:hover {
          border-color: #7209b7; color: #c77dff;
          background: rgba(114,9,183,0.14);
        }

        .hero-stats {
          display: flex; gap: 1.5rem; margin-top: 2.5rem; flex-wrap: wrap;
        }
        .hero-stat {
          display: flex; align-items: center; gap: 10px;
        }
        .hero-stat-icon {
          width: 38px; height: 38px; border-radius: 10px;
          background: rgba(114,9,183,0.14);
          border: 1px solid rgba(114,9,183,0.22);
          display: flex; align-items: center; justify-content: center;
          color: #9b2dca;
        }
        .hero-stat-val {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 1.1rem; font-weight: 800;
          color: #f0e8ff; letter-spacing: -0.02em;
        }
        .hero-stat-lbl {
          font-size: 0.75rem; color: rgba(240,232,255,0.4); font-weight: 400;
        }

        /* Right side visual */
        .hero-right {
          position: relative; display: flex; align-items: center; justify-content: center;
        }
        .hero-card-float {
          background: rgba(17,0,32,0.8);
          border: 1px solid rgba(114,9,183,0.25);
          border-radius: 16px;
          padding: 1.25rem 1.5rem;
          backdrop-filter: blur(12px);
          width: 260px;
          box-shadow: 0 20px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(114,9,183,0.1);
        }
        .hero-card-float.main {
          width: 300px;
          animation: floatMain 6s ease-in-out infinite;
        }
        .hero-card-float.side1 {
          position: absolute; top: -20px; right: -20px;
          width: 220px;
          animation: floatSide1 8s ease-in-out infinite;
        }
        .hero-card-float.side2 {
          position: absolute; bottom: -10px; left: -30px;
          width: 200px;
          animation: floatSide2 7s ease-in-out infinite;
        }
        @keyframes floatMain { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-12px)} }
        @keyframes floatSide1 { 0%,100%{transform:translateY(0) rotate(-2deg)} 50%{transform:translateY(-8px) rotate(-2deg)} }
        @keyframes floatSide2 { 0%,100%{transform:translateY(0) rotate(1.5deg)} 50%{transform:translateY(-10px) rotate(1.5deg)} }

        .hcf-co {
          display: flex; align-items: center; gap: 10px; margin-bottom: 12px;
        }
        .hcf-logo {
          width: 36px; height: 36px; border-radius: 8px;
          background: linear-gradient(135deg, #7209b7, #9b2dca);
          display: flex; align-items: center; justify-content: center;
          font-size: 0.75rem; font-weight: 700; color: #fff;
          font-family: 'Plus Jakarta Sans', sans-serif;
        }
        .hcf-name { color: #f0e8ff; font-size: 0.9rem; font-weight: 600; font-family: 'Plus Jakarta Sans', sans-serif; }
        .hcf-loc { color: rgba(240,232,255,0.35); font-size: 0.72rem; }
        .hcf-title { color: #f0e8ff; font-size: 1rem; font-weight: 700; margin-bottom: 0.5rem; font-family: 'Plus Jakarta Sans', sans-serif; }
        .hcf-desc { color: rgba(240,232,255,0.45); font-size: 0.75rem; line-height: 1.5; margin-bottom: 0.85rem; }
        .hcf-tags { display: flex; gap: 6px; flex-wrap: wrap; margin-bottom: 1rem; }
        .hcf-tag {
          padding: 0.2rem 0.6rem; border-radius: 6px;
          background: rgba(114,9,183,0.15); border: 1px solid rgba(114,9,183,0.2);
          color: #c77dff; font-size: 0.7rem; font-weight: 500; font-family: 'Outfit', sans-serif;
        }
        .hcf-apply {
          width: 100%; padding: 0.55rem; border-radius: 8px;
          background: #7209b7; color: #fff; border: none;
          font-size: 0.8rem; font-weight: 600; cursor: pointer;
          font-family: 'Outfit', sans-serif;
          transition: background 0.2s;
        }
        .hcf-apply:hover { background: #9b2dca; }
        .hcf-badge {
          display: inline-flex; align-items: center; gap: 5px;
          padding: 0.3rem 0.7rem; border-radius: 8px;
          background: rgba(56,232,120,0.1); border: 1px solid rgba(56,232,120,0.2);
          color: #4ade80; font-size: 0.72rem; font-weight: 600;
        }
        .hcf-badge-dot {
          width: 6px; height: 6px; border-radius: 50%; background: #4ade80;
          animation: pulseDot 2s infinite;
        }
      `}</style>

      <section className="hero-root">
        <div className="hero-hex-pattern" />
        <div className="hero-glow-1" />
        <div className="hero-glow-2" />
        <div className="hero-glow-3" />
        <canvas ref={canvasRef} className="hero-canvas" />

        <div className="hero-content">
          {/* LEFT */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="hero-badge">
                <span className="hero-badge-dot" />
                No. 1 Job Hunt Platform in India
              </div>
            </motion.div>

            <motion.h1
              className="hero-title"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.1 }}
            >
              Find Your Next
              <br />
              <span className="hero-title-accent">Dream Career</span>
              <br />
              Opportunity
            </motion.h1>

            <motion.p
              className="hero-sub"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Connect with top companies, discover roles that match your skills,
              and take the leap toward a career you love — all in one place.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="hero-search">
                <span className="hero-search-icon">
                  <Search size={18} />
                </span>
                <input
                  type="text"
                  className="hero-input"
                  placeholder="Job title, skill or company…"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={handleKey}
                />
                <button className="hero-search-btn" onClick={searchJobHandler}>
                  Search <ArrowRight size={15} />
                </button>
              </div>

              <div className="hero-popular">
                <span className="hero-popular-label">Trending:</span>
                {POPULAR.map((tag) => (
                  <button
                    key={tag}
                    className="hero-chip"
                    onClick={() => {
                      setQuery(tag);
                      dispatch(setSearchedQuery(tag));
                      navigate("/browse");
                    }}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </motion.div>

            <motion.div
              className="hero-stats"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.45 }}
            >
              {STATS.map(({ icon: Icon, value, label }) => (
                <div key={label} className="hero-stat">
                  <div className="hero-stat-icon">
                    <Icon size={16} />
                  </div>
                  <div>
                    <div className="hero-stat-val">{value}</div>
                    <div className="hero-stat-lbl">{label}</div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* RIGHT — floating job cards */}
          <motion.div
            className="hero-right"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
          >
            {/* Side card 1 */}
            <div className="hero-card-float side1">
              <div className="hcf-badge">
                <span className="hcf-badge-dot" />
                Now Hiring
              </div>
              <div style={{ marginTop: "0.75rem" }}>
                <div className="hcf-title" style={{ fontSize: "0.85rem" }}>Product Designer</div>
                <div className="hcf-loc">Remote · ₹18–24 LPA</div>
              </div>
            </div>

            {/* Main card */}
            <div className="hero-card-float main">
              <div className="hcf-co">
                <div className="hcf-logo">JP</div>
                <div>
                  <div className="hcf-name">TechCorp India</div>
                  <div className="hcf-loc">Bangalore · Full-time</div>
                </div>
              </div>
              <div className="hcf-title">Senior React Developer</div>
              <div className="hcf-desc">
                Build cutting-edge web applications with a world-class engineering team.
              </div>
              <div className="hcf-tags">
                <span className="hcf-tag">React</span>
                <span className="hcf-tag">Node.js</span>
                <span className="hcf-tag">TypeScript</span>
              </div>
              <button className="hcf-apply">Quick Apply →</button>
            </div>

            {/* Side card 2 */}
            <div className="hero-card-float side2">
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
                <div style={{ width: 28, height: 28, borderRadius: 6, background: "rgba(247,37,133,0.15)", border: "1px solid rgba(247,37,133,0.2)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <TrendingUp size={12} color="#f72585" />
                </div>
                <span style={{ color: "rgba(240,232,255,0.5)", fontSize: "0.72rem" }}>Trending Role</span>
              </div>
              <div className="hcf-title" style={{ fontSize: "0.82rem", marginBottom: "4px" }}>Data Scientist</div>
              <div className="hcf-loc">₹22–32 LPA · Mumbai</div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default HeroSection;
