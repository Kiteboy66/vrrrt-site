// Coming-soon template — used by wordpress.html and woocommerce.html
// Reads window.__PLATFORM = { id, name, slug, icon, blurb, eta, customCopy }

(() => {
  const P = window.__PLATFORM;
  const { useState, useEffect } = React;

  const Hero = () => {
    const [email, setEmail] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const submit = (e) => { e.preventDefault(); if (email.includes('@')) setSubmitted(true); };
    return (
      <section style={{ background: '#0A0A0B', color: '#fff', padding: '120px 32px 96px', position: 'relative', overflow: 'hidden' }}>
        <div style={{
          position: 'absolute', inset: 0, opacity: 0.06,
          backgroundImage: 'repeating-linear-gradient(90deg, transparent 0 80px, #fff 80px 81px)',
          maskImage: 'linear-gradient(90deg, transparent, #000 30%, #000 70%, transparent)',
        }} />
        <div style={{ maxWidth: 1240, margin: '0 auto', position: 'relative' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 24, padding: '4px 10px 4px 4px', borderRadius: 999, background: '#18181B', border: '1px solid #27272A' }}>
            <span style={{ width: 22, height: 22, borderRadius: 999, background: '#0A0A0B', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
              <Icon name={P.icon} size={12} stroke={1.8} color="#F5B400" />
            </span>
            <span style={{ fontFamily: 'Geist, system-ui, sans-serif', fontSize: 12, fontWeight: 500, color: '#fff', whiteSpace: 'nowrap' }}>Vrrrt for {P.name}</span>
            <StatusPill status="soon" />
          </div>
          <h1 style={{ fontFamily: 'Geist, system-ui, sans-serif', fontWeight: 700, fontSize: 88, letterSpacing: '-0.05em', lineHeight: 0.95, margin: 0, maxWidth: '14ch' }}>
            Coming to <span style={{ color: '#00E26A' }}>{P.name}.</span><br/>
            Soon.
          </h1>
          <p style={{ fontFamily: 'Geist, system-ui, sans-serif', fontSize: 19, color: '#A1A1AA', maxWidth: '54ch', marginTop: 28, lineHeight: 1.5 }}>
            {P.blurb} We're building Vrrrt for {P.name} now. ETA: {P.eta}.
          </p>

          {/* Notify form */}
          <form onSubmit={submit} style={{ marginTop: 36, display: 'flex', gap: 0, maxWidth: 480 }}>
            <input
              type="email" value={email} onChange={e => setEmail(e.target.value)}
              placeholder="your@store.com"
              disabled={submitted}
              style={{
                flex: 1, padding: '14px 18px', fontSize: 16,
                background: '#18181B', border: '1px solid #27272A', borderRight: 'none',
                borderRadius: '12px 0 0 12px', color: '#fff', outline: 'none',
                fontFamily: 'Geist, system-ui, sans-serif',
              }}
            />
            <button type="submit" disabled={submitted} style={{
              padding: '14px 22px', fontSize: 16, fontWeight: 600, cursor: submitted ? 'default' : 'pointer',
              background: submitted ? '#27272A' : '#00E26A', color: submitted ? '#A1A1AA' : '#000',
              border: 'none', borderRadius: '0 12px 12px 0',
              fontFamily: 'Geist, system-ui, sans-serif', whiteSpace: 'nowrap',
              transition: 'all 120ms cubic-bezier(.2,.9,.2,1)',
            }}>
              {submitted ? '✓ You\'re on the list' : 'Notify me'}
            </button>
          </form>
          <p style={{ fontFamily: 'Geist Mono, monospace', fontSize: 11, color: '#71717A', marginTop: 10 }}>
            Early-access slots are limited. We'll email when {P.name} is live.
          </p>
        </div>
      </section>
    );
  };

  // What you'll get
  const Roadmap = () => (
    <section style={{ background: '#FAFAFA', padding: '128px 32px' }}>
      <div style={{ maxWidth: 1240, margin: '0 auto' }}>
        <Eyebrow>— Roadmap</Eyebrow>
        <h2 style={{ fontFamily: 'Geist, system-ui, sans-serif', fontWeight: 700, fontSize: 48, lineHeight: 1.02, letterSpacing: '-0.04em', margin: 0, color: '#0A0A0B', maxWidth: '22ch' }}>
          One Cube. Every platform. <span style={{ color: '#71717A' }}>Here's the order.</span>
        </h2>
        <div style={{ marginTop: 56, display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
          {[
            { p: 'Shopify',     stat: 'LIVE',  d: 'Storefront-native discovery for Shopify themes.', state: 'done' },
            { p: 'Google Search', stat: 'LIVE', d: 'Chrome extension overlay on Google Shopping.',   state: 'done' },
            { p: 'WordPress',   stat: 'Q3 2026', d: 'Native WP plugin. Block-editor compatible.',    state: P.id === 'wordpress' ? 'now' : 'next' },
            { p: 'WooCommerce', stat: 'Q4 2026', d: 'Woo-native discovery for store owners.',        state: P.id === 'woocommerce' ? 'now' : 'next' },
          ].map((s, i) => {
            const done = s.state === 'done', now = s.state === 'now';
            return (
              <div key={s.p} style={{
                background: now ? '#0A0A0B' : '#fff',
                color: now ? '#fff' : '#0A0A0B',
                borderRadius: 14, padding: '20px 22px',
                boxShadow: now ? 'none' : '0 0 0 1px rgba(0,0,0,0.06)',
                position: 'relative',
              }}>
                {now && (
                  <div style={{ position: 'absolute', top: -1, left: -1, right: -1, bottom: -1, borderRadius: 14, border: '2px solid #00E26A', pointerEvents: 'none', boxShadow: '0 0 24px rgba(0,226,106,0.35)' }}/>
                )}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                  <span style={{ fontFamily: 'Geist Mono, monospace', fontSize: 11, fontWeight: 600,
                    color: done ? '#00C25A' : (now ? '#00E26A' : '#71717A'),
                  }}>{s.stat}</span>
                  {done && <Icon name="check" size={14} stroke={2.5} color="#00C25A" />}
                </div>
                <div style={{ fontFamily: 'Geist, system-ui, sans-serif', fontWeight: 600, fontSize: 18, letterSpacing: '-0.02em' }}>{s.p}</div>
                <p style={{ fontFamily: 'Geist, system-ui, sans-serif', fontSize: 13, color: now ? '#A1A1AA' : '#71717A', marginTop: 8, marginBottom: 0, lineHeight: 1.5 }}>{s.d}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );

  // While you wait
  const WhileYouWait = () => (
    <section style={{ background: '#fff', padding: '128px 32px', borderTop: '1px solid #E4E4E7' }}>
      <div style={{ maxWidth: 1240, margin: '0 auto' }}>
        <Eyebrow>— While you wait</Eyebrow>
        <h2 style={{ fontFamily: 'Geist, system-ui, sans-serif', fontWeight: 700, fontSize: 48, lineHeight: 1.02, letterSpacing: '-0.04em', margin: 0, color: '#0A0A0B', maxWidth: '22ch' }}>
          The Cube works <span style={{ color: '#00E26A' }}>now</span>. <span style={{ color: '#71717A' }}>Two ways to see it.</span>
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 20, marginTop: 48 }}>
          {[
            { id: 'shopify', name: 'Vrrrt for Shopify', icon: 'shopify', blurb: 'If you run Shopify too, install the live product. Same Cube, ready today.', cta: 'Install on Shopify', href: 'https://apps.shopify.com/3dnavigate' },
            { id: 'search',  name: 'Vrrrt for Google Search', icon: 'chrome', blurb: 'The Chrome extension lets you trawl 540 products from any Google search. Try it as a shopper.', cta: 'Add to Chrome', href: 'search.html' },
          ].map(p => (
            <a key={p.id} href={p.href} style={{
              textDecoration: 'none', color: 'inherit',
              background: '#0A0A0B', color: '#fff', borderRadius: 20, padding: '32px 36px',
              display: 'flex', flexDirection: 'column', gap: 18,
              transition: 'transform 180ms cubic-bezier(.2,.9,.2,1)',
            }}
            onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'none'}
            >
              <div style={{ width: 48, height: 48, borderRadius: 12, background: '#18181B', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Icon name={p.icon} size={24} stroke={1.5} color="#00E26A" />
              </div>
              <div>
                <h3 style={{ fontFamily: 'Geist, system-ui, sans-serif', fontWeight: 600, fontSize: 24, letterSpacing: '-0.03em', margin: 0 }}>{p.name}</h3>
                <p style={{ fontFamily: 'Geist, system-ui, sans-serif', fontSize: 14, color: '#A1A1AA', margin: '10px 0 0', lineHeight: 1.5 }}>{p.blurb}</p>
              </div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontFamily: 'Geist, system-ui, sans-serif', fontSize: 14, fontWeight: 600, color: '#00E26A' }}>
                {p.cta} <Icon name="arrow-right" size={14} stroke={2.5} />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );

  const App = () => (
    <>
      <Header active={P.id} dark />
      <Hero />
      <Roadmap />
      <WhileYouWait />
      <FooterCTA
        headline={`Vrrrt for ${P.name}.<br/><span style="color:#00E26A">${P.eta}.</span>`}
        sub={`Drop your email above. We'll ping you the moment Vrrrt for ${P.name} ships — and reserve an early-access slot.`}
        primary="Install on Shopify"
        secondary="Add to Chrome"
        eyebrow={'— ' + P.name + ' soon'}
      />
      <Footer />
    </>
  );
  ReactDOM.createRoot(document.getElementById('root')).render(<App />);
})();
