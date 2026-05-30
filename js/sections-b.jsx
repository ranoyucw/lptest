/* ============================================================
   しごたの LP — Voices, Plans, About, FAQ, Contact, Footer
   ============================================================ */

/* ---------- VOICES & RESULTS ---------- */
function Voices() {
  const v = LP.voices;
  return (
    <section className="section voices" id="voices">
      <div className="wrap">
        <SectionHead eyebrow={v.eyebrow} title={v.title} center />
        <div className="vstats">
          {v.stats.map((s, i) => (
            <Reveal key={i} delay={i + 1}>
              <div className="vstat">
                <strong>{s.num}<em>{s.unit}</em></strong>
                <span className="vstat-ja">{s.label}</span>
                <span className="vstat-en">{s.en}</span>
              </div>
            </Reveal>
          ))}
        </div>
        <div className="vt-grid">
          {v.testimonials.map((t, i) => (
            <Reveal key={i} delay={(i % 3) + 1}>
              <figure className="vt-card">
                <span className="vt-quote" aria-hidden="true">“</span>
                <blockquote>{t.quote}</blockquote>
                <figcaption>
                  <Placeholder label="顔写真" className="vt-avatar" />
                  <span className="vt-meta"><b>{t.who}</b><em>{t.name}</em></span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- PLANS ---------- */
function Plans() {
  const p = LP.plans;
  return (
    <section className="section plans" id="plans">
      <div className="wrap">
        <SectionHead eyebrow={p.eyebrow} title={p.title} lead={p.lead} center />
        <div className="plan-grid">
          {p.items.map((it, i) => (
            <Reveal key={i} delay={(i % 3) + 1}>
              <article className={`plan-card ${it.popular ? "popular" : ""}`}>
                {it.popular && <span className="plan-badge">人気プラン</span>}
                <div className="plan-head">
                  <span className="plan-en">{it.en}</span>
                  <h3 className="plan-name">{it.name}</h3>
                  <p className="plan-tag">{it.tagline}</p>
                </div>
                <div className="plan-price">
                  <span className="yen">¥</span><strong>{it.price}</strong><span className="cycle">{it.cycle}</span>
                </div>
                <ul className="plan-feats">
                  {it.features.map((ft, j) => (
                    <li key={j}><Check />{ft}</li>
                  ))}
                </ul>
                <a href="#contact" className={`btn ${it.popular ? "btn-primary" : "btn-ghost"} plan-cta`}>{it.cta} <Arrow /></a>
              </article>
            </Reveal>
          ))}
        </div>
        <Reveal><p className="plan-note">{p.note}</p></Reveal>
      </div>
    </section>
  );
}

function Check() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true" className="chk">
      <circle cx="9" cy="9" r="9" fill="var(--primary)" opacity="0.12"/>
      <path d="M5 9.2 7.7 12 13 6.4" stroke="var(--primary)" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

/* ---------- ABOUT ---------- */
function About() {
  const a = LP.about;
  return (
    <section className="section about" id="about">
      <div className="wrap about-in">
        <div className="about-left">
          <SectionHead eyebrow={a.eyebrow} title={a.title} />
          <Reveal delay={2}><p className="lead about-body">{a.body}</p></Reveal>
          <Reveal delay={3}>
            <ul className="about-values">
              {a.values.map((val, i) => (
                <li key={i}><b>{val.ja}</b><em>{val.en}</em></li>
              ))}
            </ul>
          </Reveal>
        </div>
        <div className="about-right">
          {a.team.map((m, i) => (
            <Reveal key={i} delay={(i % 3) + 1}>
              <div className="team-card">
                <Placeholder label={m.slot} className="team-photo" />
                <div className="team-meta">
                  <b>{m.name}</b>
                  <em>{m.role}</em>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- FAQ ---------- */
function Faq() {
  const f = LP.faq;
  const [open, setOpen] = useState(0);
  return (
    <section className="section faq" id="faq">
      <div className="wrap-narrow">
        <SectionHead eyebrow={f.eyebrow} title={f.title} center />
        <div className="faq-list">
          {f.items.map((it, i) => (
            <Reveal key={i} delay={(i % 3) + 1}>
              <div className={`faq-item ${open === i ? "open" : ""}`}>
                <button className="faq-q" onClick={() => setOpen(open === i ? -1 : i)} aria-expanded={open === i}>
                  <span>{it.q}</span>
                  <span className="faq-ic" aria-hidden="true"></span>
                </button>
                <div className="faq-a"><div className="faq-a-in"><p>{it.a}</p></div></div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- CONTACT ---------- */
function Contact() {
  const c = LP.contact;
  const f = c.form;
  const [form, setForm] = useState({ type: f.typeOptions[0], name: "", email: "", phone: "", phase: f.phaseOptions[0], msg: "" });
  const [errs, setErrs] = useState({});
  const [sent, setSent] = useState(false);
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const submit = (e) => {
    e.preventDefault();
    const er = {};
    if (!form.name.trim()) er.name = "お名前を入力してください";
    if (!form.email.trim()) er.email = "メールアドレスを入力してください";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) er.email = "メールアドレスの形式をご確認ください";
    if (!form.msg.trim()) er.msg = "ご相談内容を入力してください";
    setErrs(er);
    if (Object.keys(er).length === 0) setSent(true);
  };

  return (
    <section className="section contact" id="contact">
      <div className="wrap contact-in">
        <div className="contact-left">
          <SectionHead eyebrow={c.eyebrow} title={c.title} light />
          <p className="contact-lead">{c.lead.split("\n").map((l, i) => <span key={i}>{l}<br/></span>)}</p>
          <ul className="contact-points">
            {c.points.map((pt, i) => <li key={i}><Check />{pt}</li>)}
          </ul>
        </div>
        <Reveal delay={1} className="contact-form-wrap">
          {sent ? (
            <div className="contact-done">
              <div className="cd-ic" aria-hidden="true">✓</div>
              <h3>送信ありがとうございます</h3>
              <p>内容を確認のうえ、通常1営業日以内にご返信します。<br/>少しだけ、お待ちくださいね。</p>
            </div>
          ) : (
            <form className="contact-form" onSubmit={submit} noValidate>
              <div className="cf-type">
                {f.typeOptions.map((opt) => (
                  <button type="button" key={opt}
                    className={form.type === opt ? "on" : ""}
                    onClick={() => setForm({ ...form, type: opt })}>{opt}</button>
                ))}
              </div>
              <label className="cf-field">
                <span>お名前 <i>*</i></span>
                <input type="text" value={form.name} onChange={set("name")} placeholder="例) 山田 太郎" className={errs.name ? "err" : ""} />
                {errs.name && <em className="cf-err">{errs.name}</em>}
              </label>
              <label className="cf-field">
                <span>メールアドレス <i>*</i></span>
                <input type="email" value={form.email} onChange={set("email")} placeholder="例) you@example.com" className={errs.email ? "err" : ""} />
                {errs.email && <em className="cf-err">{errs.email}</em>}
              </label>
              <label className="cf-field">
                <span>電話番号 <small>（任意）</small></span>
                <input type="tel" value={form.phone} onChange={set("phone")} placeholder="例) 090-1234-5678" />
              </label>
              <label className="cf-field">
                <span>現在の状況</span>
                <div className="cf-select">
                  <select value={form.phase} onChange={set("phase")}>
                    {f.phaseOptions.map((o) => <option key={o}>{o}</option>)}
                  </select>
                </div>
              </label>
              <label className="cf-field">
                <span>ご相談内容 <i>*</i></span>
                <textarea rows="4" value={form.msg} onChange={set("msg")} placeholder="今のお悩みや、聞いてみたいことを自由にお書きください。" className={errs.msg ? "err" : ""}></textarea>
                {errs.msg && <em className="cf-err">{errs.msg}</em>}
              </label>
              <button type="submit" className="btn btn-primary cf-submit">{f.submit} <Arrow /></button>
              <p className="cf-privacy">送信により<a href="#">プライバシーポリシー</a>に同意したものとみなされます。</p>
            </form>
          )}
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- FOOTER ---------- */
function Footer() {
  const f = LP.footer;
  return (
    <footer className="footer">
      <div className="wrap footer-in">
        <div className="footer-brand">
          <BrandMark />
          <p className="footer-tag">{f.tagline}</p>
        </div>
        <nav className="footer-nav">
          {LP.nav.map((n) => <a key={n.id} href={`#${n.id}`}>{n.ja}</a>)}
        </nav>
      </div>
      <div className="wrap footer-bottom">
        <span>{f.copyright}</span>
      </div>
    </footer>
  );
}

Object.assign(window, { Voices, Plans, About, Faq, Contact, Footer, Check });
