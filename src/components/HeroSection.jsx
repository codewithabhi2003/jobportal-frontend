import { motion } from "motion/react";
import React, { useState, useEffect, useRef } from "react";
import { Search, ArrowRight, TrendingUp } from "lucide-react";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";
import { useNavigate } from "react-router-dom";


const CHIPS = ["UI/UX Designer", "React Developer", "Data Analyst", "Product Manager"];

const HeroSection = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const canvasRef = useRef(null);

  const search = () => {
    dispatch(setSearchedQuery(query));
    navigate("/browse");
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let raf;
    const resize = () => {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const nodes = Array.from({ length: 32 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      nodes.forEach((n) => {
        n.x += n.vx; n.y += n.vy;
        if (n.x < 0 || n.x > canvas.width)  n.vx *= -1;
        if (n.y < 0 || n.y > canvas.height) n.vy *= -1;
      });
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const d  = Math.sqrt(dx * dx + dy * dy);
          if (d < 160) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(114,9,183,${(1 - d / 160) * 0.14})`;
            ctx.lineWidth = 1;
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }
      nodes.forEach((n) => {
        ctx.beginPath();
        ctx.arc(n.x, n.y, 2.2, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(114,9,183,0.28)";
        ctx.fill();
      });
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@500;700;800;900&family=Outfit:wght@400;500;600&display=swap');
        .hero-wrap {
          position: relative;
          background: #f9f5ff;
          overflow: hidden;
          min-height: calc(100vh - 66px);
          display: flex; align-items: center;
          font-family: 'Outfit', sans-serif;
        }
        .hero-blob1 {
          position: absolute; top: -120px; right: -100px;
          width: 500px; height: 500px; border-radius: 50%;
          background: radial-gradient(circle, rgba(114,9,183,0.08) 0%, transparent 70%);
          pointer-events: none;
        }
        .hero-blob2 {
          position: absolute; bottom: -80px; left: -60px;
          width: 380px; height: 380px; border-radius: 50%;
          background: radial-gradient(circle, rgba(114,9,183,0.06) 0%, transparent 70%);
          pointer-events: none;
        }
        .hero-dots {
          position: absolute; inset: 0; pointer-events: none; opacity: 0.55;
          background-image: radial-gradient(circle, rgba(114,9,183,0.18) 1px, transparent 1px);
          background-size: 28px 28px;
        }
        .hero-canvas {
          position: absolute; inset: 0;
          width: 100%; height: 100%;
          pointer-events: none;
        }
        .hero-inner {
          position: relative; z-index: 2;
          max-width: 1280px; margin: 0 auto;
          padding: 4.5rem 1.5rem 4rem;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 3rem;
          align-items: center;
          width: 100%;
        }
        @media (max-width: 900px) {
          .hero-inner { grid-template-columns: 1fr; }
          .hero-right-col { display: none; }
        }
        .hero-badge {
          display: inline-flex; align-items: center; gap: 8px;
          background: rgba(114,9,183,0.08);
          border: 1px solid rgba(114,9,183,0.2);
          border-radius: 999px;
          padding: 0.38rem 1rem;
          color: #7209b7;
          font-size: 0.78rem; font-weight: 600;
          letter-spacing: 0.04em; text-transform: uppercase;
          margin-bottom: 1.25rem;
        }
        .hero-badge-dot {
          width: 6px; height: 6px; border-radius: 50%; background: #7209b7;
          animation: hbPulse 2s ease-in-out infinite;
        }
        @keyframes hbPulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.4;transform:scale(0.65)} }
        .hero-h1 {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: clamp(2.2rem, 4.5vw, 3.6rem);
          font-weight: 900;
          color: #18003a;
          line-height: 1.1;
          letter-spacing: -0.035em;
          margin: 0 0 1.2rem;
        }
        .hero-h1-grad {
          background: linear-gradient(135deg, #7209b7 0%, #b44bf7 100%);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .hero-sub {
          color: #6b7280;
          font-size: 1.05rem;
          line-height: 1.72;
          max-width: 460px;
          margin-bottom: 2rem;
        }
        .hero-search {
          display: flex; align-items: center;
          background: #ffffff;
          border: 1.5px solid rgba(114,9,183,0.2);
          border-radius: 14px;
          max-width: 500px;
          overflow: hidden;
          box-shadow: 0 4px 20px rgba(114,9,183,0.08);
          transition: border-color 0.22s, box-shadow 0.22s;
        }
        .hero-search:focus-within {
          border-color: #7209b7;
          box-shadow: 0 0 0 3px rgba(114,9,183,0.1), 0 6px 24px rgba(114,9,183,0.12);
        }
        .hero-search-icon {
          padding: 0 0.85rem 0 1.1rem;
          color: #b084d8;
          flex-shrink: 0;
          display: flex; align-items: center;
        }
        .hero-input {
          flex: 1; border: none; outline: none; background: none;
          font-family: 'Outfit', sans-serif;
          font-size: 0.95rem; font-weight: 400;
          color: #18003a;
          padding: 0.9rem 0.5rem 0.9rem 0;
        }
        .hero-input::placeholder { color: #b0b8c9; }
        .hero-search-btn {
          flex-shrink: 0;
          margin: 5px;
          background: #7209b7;
          color: #fff; border: none; border-radius: 10px;
          padding: 0.65rem 1.2rem;
          font-family: 'Outfit', sans-serif;
          font-size: 0.875rem; font-weight: 600;
          cursor: pointer;
          display: flex; align-items: center; gap: 6px;
          transition: all 0.2s;
          box-shadow: 0 3px 12px rgba(114,9,183,0.3);
          white-space: nowrap;
        }
        .hero-search-btn:hover {
          background: #5c0799;
          transform: translateY(-1px);
          box-shadow: 0 5px 18px rgba(114,9,183,0.42);
        }
        .hero-chips { display: flex; align-items: center; flex-wrap: wrap; gap: 0.45rem; margin-top: 1.1rem; }
        .hero-chip-label { color: #9ca3af; font-size: 0.77rem; font-weight: 600; letter-spacing: 0.04em; text-transform: uppercase; }
        .hero-chip {
          background: #fff; border: 1px solid rgba(114,9,183,0.18);
          border-radius: 999px; padding: 0.28rem 0.85rem;
          color: #7209b7; font-size: 0.78rem; font-weight: 500;
          cursor: pointer; font-family: 'Outfit', sans-serif;
          transition: all 0.18s;
        }
        .hero-chip:hover { background: rgba(114,9,183,0.06); border-color: #7209b7; }
        .hero-card {
          background: #ffffff;
          border: 1px solid rgba(114,9,183,0.12);
          border-radius: 18px;
          padding: 1.3rem 1.4rem;
          box-shadow: 0 8px 32px rgba(114,9,183,0.1), 0 2px 8px rgba(0,0,0,0.04);
        }
        .hero-card.hc-main { animation: hcFloat 6s ease-in-out infinite; }
        .hero-card.hc-top {
          position: absolute; top: -20px; right: -10px; width: 210px;
          animation: hcFloat2 7s ease-in-out infinite;
        }
        .hero-card.hc-bot {
          position: absolute; bottom: -10px; left: -20px; width: 200px;
          animation: hcFloat3 8s ease-in-out infinite;
        }
        @keyframes hcFloat  { 0%,100%{transform:translateY(0)}   50%{transform:translateY(-10px)} }
        @keyframes hcFloat2 { 0%,100%{transform:translateY(0) rotate(-2deg)} 50%{transform:translateY(-8px) rotate(-2deg)} }
        @keyframes hcFloat3 { 0%,100%{transform:translateY(0) rotate(1.5deg)} 50%{transform:translateY(-10px) rotate(1.5deg)} }
        .hc-row { display: flex; align-items: center; gap: 10px; margin-bottom: 10px; }
        .hc-logo {
          width: 38px; height: 38px; border-radius: 10px;
          background: linear-gradient(135deg, #7209b7, #b44bf7);
          display: flex; align-items: center; justify-content: center;
          font-size: 0.75rem; font-weight: 800; color: #fff;
          font-family: 'Plus Jakarta Sans', sans-serif; flex-shrink: 0;
        }
        .hc-co { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 0.88rem; font-weight: 700; color: #18003a; }
        .hc-loc { font-size: 0.72rem; color: #9ca3af; }
        .hc-title { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 1rem; font-weight: 800; color: #18003a; margin-bottom: 6px; }
        .hc-desc { font-size: 0.75rem; color: #6b7280; line-height: 1.55; margin-bottom: 10px; }
        .hc-tags { display: flex; gap: 5px; flex-wrap: wrap; margin-bottom: 12px; }
        .hc-tag {
          padding: 0.2rem 0.6rem; border-radius: 6px;
          background: rgba(114,9,183,0.07); border: 1px solid rgba(114,9,183,0.15);
          color: #7209b7; font-size: 0.7rem; font-weight: 500; font-family: 'Outfit', sans-serif;
        }
        .hc-apply {
          width: 100%; padding: 0.55rem; border-radius: 9px;
          background: #7209b7; color: #fff; border: none;
          font-family: 'Outfit', sans-serif; font-size: 0.82rem; font-weight: 600;
          cursor: pointer; transition: background 0.18s;
        }
        .hc-apply:hover { background: #5c0799; }
        .hc-live {
          display: inline-flex; align-items: center; gap: 5px;
          padding: 0.28rem 0.7rem; border-radius: 7px;
          background: rgba(34,197,94,0.08); border: 1px solid rgba(34,197,94,0.18);
          color: #16a34a; font-size: 0.72rem; font-weight: 600; font-family: 'Outfit', sans-serif;
        }
        .hc-live-dot { width: 6px; height: 6px; border-radius: 50%; background: #22c55e; animation: hbPulse 2s infinite; }
        .hc-small-title { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 0.88rem; font-weight: 700; color: #18003a; margin: 8px 0 3px; }
        .hc-small-sub { font-size: 0.73rem; color: #9ca3af; }
      `}</style>

      <section className="hero-wrap">
        <div className="hero-dots" />
        <canvas ref={canvasRef} className="hero-canvas" />
        <div className="hero-blob1" />
        <div className="hero-blob2" />

        <div className="hero-inner">
          {/* ── LEFT ── */}
          <div>
            <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>
              <div className="hero-badge">
                <span className="hero-badge-dot" />
                No. 1 Job Hunt Platform
              </div>
            </motion.div>

            <motion.h1 className="hero-h1"
              initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.08 }}
            >
              Find Your Next<br />
              <span className="hero-h1-grad">Dream Career</span><br />
              Opportunity
            </motion.h1>

            <motion.p className="hero-sub"
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.15 }}
            >
              Connect with top companies, discover roles that match your skills,
              and take the next step toward a career you truly love.
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay: 0.22 }}>
              <div className="hero-search">
                <span className="hero-search-icon"><Search size={17} /></span>
                <input
                  type="text"
                  className="hero-input"
                  placeholder="Job title, skill or company…"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && search()}
                />
                <button className="hero-search-btn" onClick={search}>
                  Search <ArrowRight size={15} />
                </button>
              </div>

              <div className="hero-chips">
                <span className="hero-chip-label">Trending:</span>
                {CHIPS.map((c) => (
                  <button key={c} className="hero-chip"
                    onClick={() => { dispatch(setSearchedQuery(c)); navigate("/browse"); }}>
                    {c}
                  </button>
                ))}
              </div>
            </motion.div>
          </div>

          {/* ── RIGHT: floating cards ── */}
          <motion.div
            className="hero-right-col"
            style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "center", minHeight: 420 }}
            initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="hero-card hc-top">
              <div className="hc-live"><span className="hc-live-dot" /> Now Hiring</div>
              <div className="hc-small-title">Product Designer</div>
              <div className="hc-small-sub">Remote · ₹18–24 LPA</div>
            </div>

            <div className="hero-card hc-main" style={{ width: 290, position: "relative", zIndex: 1 }}>
              <div className="hc-row">
                <div className="hc-logo">TC</div>
                <div>
                  <div className="hc-co">TechCorp India</div>
                  <div className="hc-loc">Bangalore · Full-time</div>
                </div>
              </div>
              <div className="hc-title">Senior React Developer</div>
              <div className="hc-desc">Build cutting-edge web apps with a world-class engineering team.</div>
              <div className="hc-tags">
                <span className="hc-tag">React</span>
                <span className="hc-tag">Node.js</span>
                <span className="hc-tag">TypeScript</span>
              </div>
              <button className="hc-apply">Quick Apply →</button>
            </div>

            <div className="hero-card hc-bot">
              <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 6 }}>
                <div style={{ width: 26, height: 26, borderRadius: 7, background: "rgba(114,9,183,0.1)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <TrendingUp size={12} color="#7209b7" />
                </div>
                <span style={{ fontSize: "0.7rem", color: "#9ca3af", fontFamily: "'Outfit',sans-serif" }}>Trending Role</span>
              </div>
              <div className="hc-small-title">Data Scientist</div>
              <div className="hc-small-sub">₹22–32 LPA · Mumbai</div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default HeroSection;