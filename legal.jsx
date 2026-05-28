// Legal doc template — used by privacy.html and terms.html
// Reads window.__DOC = { id, title, lastUpdated, intro, sections: [{h, body}] }

(() => {
  const D = window.__DOC;

  const Hero = () => (
    <section style={{ background: '#0A0A0B', color: '#fff', padding: '88px 32px 64px' }}>
      <div style={{ maxWidth: 880, margin: '0 auto' }}>
        <Eyebrow color="#00E26A">— {D.kind || 'Legal'}</Eyebrow>
        <h1 style={{ fontFamily: 'Geist, system-ui, sans-serif', fontWeight: 700, fontSize: 56, letterSpacing: '-0.04em', lineHeight: 1, margin: 0 }}>
          {D.title}
        </h1>
        <p style={{ fontFamily: 'Geist Mono, monospace', fontSize: 12, color: '#A1A1AA', marginTop: 16 }}>
          Last updated: {D.lastUpdated}
        </p>
      </div>
    </section>
  );

  const Body = () => (
    <section style={{ background: '#FAFAFA', padding: '64px 32px 96px' }}>
      <div style={{ maxWidth: 880, margin: '0 auto', display: 'grid', gridTemplateColumns: '220px 1fr', gap: 56 }}>
        {/* TOC */}
        <nav style={{ position: 'sticky', top: 88, alignSelf: 'start', display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div style={{
            fontFamily: 'Geist, system-ui, sans-serif', fontSize: 11, fontWeight: 600,
            letterSpacing: '0.12em', textTransform: 'uppercase', color: '#71717A', marginBottom: 8,
          }}>On this page</div>
          {D.sections.map((s, i) => (
            <a key={i} href={`#s${i}`} style={{
              fontFamily: 'Geist, system-ui, sans-serif', fontSize: 13, color: '#3F3F46',
              textDecoration: 'none', padding: '6px 10px', borderRadius: 6,
              borderLeft: '2px solid #E4E4E7',
            }}>{s.h}</a>
          ))}
        </nav>

        {/* Doc */}
        <article style={{ background: '#fff', borderRadius: 14, padding: '40px 48px', boxShadow: '0 0 0 1px rgba(0,0,0,0.05)' }}>
          {D.intro && (
            <p style={{ fontFamily: 'Geist, system-ui, sans-serif', fontSize: 17, color: '#3F3F46', lineHeight: 1.6, marginTop: 0 }}>
              {D.intro}
            </p>
          )}
          <div style={{
            margin: '20px 0 32px',
            padding: '12px 16px', background: '#FFF5DA', borderRadius: 8, borderLeft: '2px solid #F5B400',
            fontFamily: 'Geist, system-ui, sans-serif', fontSize: 13, color: '#7A5500',
          }}>
            <strong>Placeholder.</strong> This is template legal text for design preview. Have your counsel review and replace before launch.
          </div>
          {D.sections.map((s, i) => (
            <section key={i} id={`s${i}`} style={{ marginBottom: 40 }}>
              <h2 style={{
                fontFamily: 'Geist, system-ui, sans-serif', fontWeight: 600, fontSize: 22,
                letterSpacing: '-0.02em', color: '#0A0A0B', margin: '0 0 12px',
              }}>{s.h}</h2>
              {s.body.map((p, j) => (
                <p key={j} style={{
                  fontFamily: 'Geist, system-ui, sans-serif', fontSize: 15, color: '#3F3F46',
                  lineHeight: 1.6, margin: '0 0 12px',
                }}>{p}</p>
              ))}
            </section>
          ))}
        </article>
      </div>
    </section>
  );

  const App = () => (
    <>
      <Header active={D.id} />
      <Hero />
      <Body />
      <Footer />
    </>
  );
  ReactDOM.createRoot(document.getElementById('root')).render(<App />);
})();
