/* ============================================================
   しごたの LP — Header, Hero, Worries, Features
   ============================================================ */

/* ---------- HEADER ---------- */
function Header({ activeId }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <header className={`hdr ${scrolled ? "scrolled" : ""}`}>
      <div className="wrap hdr-in">
        <BrandMark />
        <nav className="hdr-nav">
          {LP.nav.map((n) => (
            <a key={n.id} href={`#${n.id}`} className={activeId === n.id ? "active" : ""}>
              {n.ja}
            </a>
          ))}
        </nav>
        <div className="hdr-cta">
          <a href="#contact" className="btn btn-primary btn-sm">無料相談 <Arrow /></a>
        </div>
        <button className={`burger ${open ? "x" : ""}`} onClick={() => setOpen(!open)} aria-label="メニュー">
          <span></span><span></span><span></span>
        </button>
      </div>
      <div className={`hdr-mobile ${open ? "open" : ""}`}>
        {LP.nav.map((n) => (
          <a key={n.id} href={`#${n.id}`} onClick={() => setOpen(false)}>
            <span>{n.ja}</span><em>{n.en}</em>
          </a>
        ))}
        <a href="#contact" className="btn btn-primary" onClick={() => setOpen(false)}>無料で相談する <Arrow /></a>
      </div>
    </header>
  );
}

/* ---------- HERO ---------- */
function Hero() {
  const h = LP.hero;
  return (
    <section className="hero" id="top">
      <div className="hero-bg" aria-hidden="true"></div>
      <div className="wrap hero-in">
        <div className="hero-head">
          <Reveal><span className="eyebrow">{h.eyebrow}</span></Reveal>
          <h1 className="hero-title">
            {h.titleLines.map((l, i) => (
              <Reveal key={i} delay={i + 1} as="span" className="hero-line">{l}</Reveal>
            ))}
          </h1>
        </div>
        <div className="hero-body">
          <div className="hero-text">
            <Reveal delay={1}>
              <p className="hero-sub">{h.sub.split("\n").map((l, i) => <span key={i}>{l}<br/></span>)}</p>
            </Reveal>
            <Reveal delay={2}>
              <div className="hero-actions">
                <a href="#contact" className="btn btn-primary">{h.primary} <Arrow /></a>
                <a href="#plans" className="btn btn-ghost">{h.secondary}</a>
              </div>
            </Reveal>
            <Reveal delay={2}><p className="hero-note">{h.note}</p></Reveal>
          </div>
          <div className="hero-visual">
            <Reveal delay={2}>
              <div className="hero-card">
                <Placeholder label="メンターと話す写真" className="hero-photo" />
                <div className="hero-badge">
                  <span className="hb-en">1 on 1</span>
                  <span className="hb-ja">いつでも、隣に。</span>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
      <Reveal delay={2}>
        <div className="wrap hero-stats">
          {h.stat.map((s, i) => (
            <div className="hstat" key={i}>
              <strong>{s.num}</strong>
              <span className="hstat-ja">{s.label}</span>
              <span className="hstat-en">{s.en}</span>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}

/* ---------- WORRIES ---------- */
function Worries() {
  const w = LP.worries;
  return (
    <section className="section worries" id="worries">
      <div className="wrap">
        <SectionHead eyebrow={w.eyebrow} title={w.title} lead={w.lead} />
        <div className="worry-grid">
          {w.items.map((it, i) => (
            <Reveal key={i} delay={(i % 2) + 1}>
              <div className="worry-card">
                <span className="worry-mark" aria-hidden="true">”</span>
                <h3>{it.q}</h3>
                <p>{it.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal>
          <div className="worry-closing">
            <p className="wc-main">{w.closing}</p>
            <p className="wc-sub">{w.closingSub}</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- FEATURES ---------- */
function Features() {
  const f = LP.features;
  return (
    <section className="section features" id="features">
      <div className="wrap">
        <SectionHead eyebrow={f.eyebrow} title={f.title} lead={f.lead} />
        <div className="feat-grid">
          {f.items.map((it, i) => (
            <Reveal key={i} delay={(i % 2) + 1}>
              <article className="feat-card">
                <div className="feat-top">
                  <span className="feat-no">{it.no}</span>
                  <span className="feat-en">{it.en}</span>
                </div>
                <h3 className="feat-ja">{it.ja}</h3>
                <p className="feat-d">{it.d}</p>
                <span className="feat-line" aria-hidden="true"></span>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { Header, Hero, Worries, Features });
