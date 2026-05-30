/* ============================================================
   しごたの LP — App root + Tweaks
   ============================================================ */
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "tone": "clay",
  "headfont": "mincho"
}/*EDITMODE-END*/;

const TONES = [
  { id: "clay",     ja: "クレイ",       en: "Clay",     sw: ["#FAF4EC", "#C2553A", "#D99748"] },
  { id: "sunset",   ja: "サンセット",   en: "Sunset",   sw: ["#FFF3EC", "#E2613F", "#E98B57"] },
  { id: "espresso", ja: "エスプレッソ", en: "Espresso", sw: ["#211814", "#E27A4B", "#E2A65A"] },
  { id: "terra",    ja: "テラ",         en: "Terra",    sw: ["#F4EDE1", "#B0492E", "#C09148"] },
];

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [activeId, setActiveId] = useState("top");

  /* apply tone + headfont to <html> */
  useEffect(() => {
    document.documentElement.setAttribute("data-palette", t.tone);
  }, [t.tone]);
  useEffect(() => {
    document.documentElement.setAttribute("data-headfont", t.headfont);
  }, [t.headfont]);

  /* scrollspy */
  useEffect(() => {
    const ids = ["worries", "features", "voices", "plans", "about", "faq", "contact"];
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => { if (e.isIntersecting) setActiveId(e.target.id); });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    ids.forEach((id) => { const el = document.getElementById(id); if (el) io.observe(el); });
    return () => io.disconnect();
  }, []);

  return (
    <React.Fragment>
      <Header activeId={activeId} />
      <main>
        <Hero />
        <Worries />
        <Features />
        <Voices />
        <Plans />
        <About />
        <Faq />
        <Contact />
      </main>
      <Footer />

      <TweaksPanel>
        <TweakSection label="トーン / Tone" />
        <div className="tone-swatches">
          {TONES.map((tn) => (
            <button key={tn.id}
              className={`tone-chip ${t.tone === tn.id ? "on" : ""}`}
              onClick={() => setTweak("tone", tn.id)}>
              <span className="tone-sw">
                {tn.sw.map((c, i) => <i key={i} style={{ background: c }}></i>)}
              </span>
              <span className="tone-label"><b>{tn.ja}</b><em>{tn.en}</em></span>
            </button>
          ))}
        </div>
        <TweakSection label="見出しの書体 / Headings" />
        <TweakRadio label="フォント" value={t.headfont}
          options={["mincho", "gothic"]}
          onChange={(v) => setTweak("headfont", v)} />
      </TweaksPanel>
    </React.Fragment>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
