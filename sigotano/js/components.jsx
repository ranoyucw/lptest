/* ============================================================
   しごたの LP — Shared components & hooks
   ============================================================ */
const { useState, useEffect, useRef, useCallback } = React;

/* ---- Scroll reveal via IntersectionObserver ---- */
function Reveal({ children, delay = 0, as = "div", className = "", style }) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // If already within (or near) the viewport on mount, reveal immediately.
    const inView = () => {
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight;
      return r.top < vh * 0.92 && r.bottom > 0;
    };
    if (inView()) { setShown(true); return; }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) { setShown(true); io.unobserve(e.target); }
        });
      },
      { threshold: 0.16, rootMargin: "0px 0px -8% 0px" }
    );
    io.observe(el);
    // Safety net: if IO never fires (some embedded environments), reveal anyway.
    const safety = setTimeout(() => setShown(true), 1200);
    return () => { io.disconnect(); clearTimeout(safety); };
  }, []);
  const Tag = as;
  const dcls = delay ? ` d${delay}` : "";
  return (
    <Tag ref={ref} className={`reveal${dcls} ${shown ? "in" : ""} ${className}`} style={style}>
      {children}
    </Tag>
  );
}

/* ---- Arrow glyph ---- */
function Arrow() {
  return (
    <svg className="arrow" width="18" height="14" viewBox="0 0 18 14" fill="none" aria-hidden="true">
      <path d="M1 7h15M11 1.5 16.5 7 11 12.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

/* ---- Section heading block (eyebrow + title) ---- */
function SectionHead({ eyebrow, title, lead, center, light }) {
  return (
    <div className={`s-head-block ${center ? "center" : ""}`}>
      <Reveal><span className="eyebrow">{eyebrow}</span></Reveal>
      <Reveal delay={1}>
        <h2 className="s-head" style={{ color: light ? "var(--on-primary)" : undefined }}>
          {title.split("\n").map((l, i) => <span key={i} className="line">{l}</span>)}
        </h2>
      </Reveal>
      {lead && <Reveal delay={2}><p className="lead s-lead">{lead}</p></Reveal>}
    </div>
  );
}

/* ---- Placeholder image block ---- */
function Placeholder({ label, style, className = "" }) {
  return (
    <div className={`ph ${className}`} style={style}>
      <span>{label}</span>
    </div>
  );
}

/* ---- Brand mark ---- */
function BrandMark({ small }) {
  return (
    <a href="#top" className={`brandmark ${small ? "sm" : ""}`} aria-label="しごたの">
      <span className="bm-dot" aria-hidden="true"></span>
      <span className="bm-name">{LP.brand.name}</span>
      <span className="bm-en">{LP.brand.en}</span>
    </a>
  );
}

Object.assign(window, { Reveal, Arrow, SectionHead, Placeholder, BrandMark,
  useState, useEffect, useRef, useCallback });
