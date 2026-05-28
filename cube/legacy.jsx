const SUPPORT_EMAIL = 'support@vrrrt.app';
const LAST_UPDATED = 'April 28, 2026';

const navItems = [
  ['Overview', '/cube'],
  ['Setup', '/cube/setup'],
  ['Support', '/cube/support'],
  ['Docs', '/cube/docs'],
  ['Privacy', '/cube/privacy'],
  ['Terms', '/cube/terms'],
];

const styles = {
  page: { minHeight: '100vh', background: '#070708', color: '#F7F7F2', fontFamily: 'Geist, system-ui, sans-serif' },
  wrap: { maxWidth: 1160, margin: '0 auto', padding: '0 28px' },
  header: { borderBottom: '1px solid rgba(255,255,255,0.08)', background: 'rgba(7,7,8,0.86)', backdropFilter: 'blur(16px)', position: 'sticky', top: 0, zIndex: 20 },
  section: { padding: '72px 0' },
  eyebrow: { color: '#00E26A', fontFamily: 'Geist Mono, ui-monospace, monospace', fontSize: 12, fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase' },
  h1: { margin: '18px 0 0', maxWidth: 860, fontSize: 'clamp(44px, 7vw, 88px)', lineHeight: 0.94, letterSpacing: '-0.065em', fontWeight: 800 },
  h2: { margin: 0, fontSize: 'clamp(28px, 4vw, 44px)', lineHeight: 1, letterSpacing: '-0.045em' },
  copy: { color: '#C9C9C0', fontSize: 18, lineHeight: 1.6 },
  card: { border: '1px solid rgba(255,255,255,0.10)', background: 'rgba(255,255,255,0.045)', borderRadius: 14, padding: 24 },
  greenCard: { background: '#00E26A', color: '#020202', borderRadius: 14, padding: 24 },
};

const slug = location.pathname.replace(/\/$/, '').split('/').pop() || 'overview';

function Shell({ active, children }) {
  return (
    <main style={styles.page}>
      <header style={styles.header}>
        <div style={{ ...styles.wrap, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24, paddingTop: 16, paddingBottom: 16 }}>
          <a href="/" style={{ color: '#fff', textDecoration: 'none', fontSize: 23, fontWeight: 800, letterSpacing: '-0.06em' }}>Vrrrt<span style={{ color: '#00E26A' }}>.</span></a>
          <nav style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
            {navItems.map(([label, href]) => (
              <a key={href} href={href} style={{
                color: active === label.toLowerCase() ? '#00E26A' : '#A1A1AA',
                textDecoration: 'none',
                fontSize: 13,
                fontWeight: 700,
              }}>{label}</a>
            ))}
          </nav>
        </div>
      </header>
      {children}
      <footer style={{ borderTop: '1px solid rgba(255,255,255,0.08)', padding: '34px 0', color: '#71717A' }}>
        <div style={{ ...styles.wrap, display: 'flex', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap', fontSize: 13 }}>
          <span>Vrrrt Cube.</span>
          <a href={`mailto:${SUPPORT_EMAIL}`} style={{ color: '#00E26A', textDecoration: 'none' }}>{SUPPORT_EMAIL}</a>
        </div>
      </footer>
    </main>
  );
}

function CubeVisual() {
  return (
    <div style={{ minHeight: 360, border: '1px solid rgba(0,226,106,0.28)', borderRadius: 22, background: 'linear-gradient(180deg, rgba(255,255,255,0.07), rgba(255,255,255,0.025))', padding: 24, boxShadow: '0 0 70px rgba(0,226,106,0.12)' }}>
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
        {['Search', 'Reset', 'Left', 'Right'].map(label => <span key={label} style={{ border: '1px solid rgba(255,255,255,0.16)', borderRadius: 8, padding: '7px 10px', fontSize: 11, color: '#EDEDE8' }}>{label}</span>)}
      </div>
      <div style={{ minHeight: 280, display: 'grid', placeItems: 'center' }}>
        <div style={{ width: 230, height: 230, transform: 'rotate(-8deg)', display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 10, border: '1px solid rgba(255,255,255,0.18)', borderRadius: 14, padding: 14, background: 'rgba(255,255,255,0.06)', boxShadow: '28px 28px 0 #00E26A' }}>
          {[
            ['Footwear', '#F7F7F2'],
            ['Outerwear', '#00E26A'],
            ['Accessories', '#BDBDB4'],
            ['New arrivals', '#303034'],
          ].map(([label, color]) => (
            <div key={label} style={{ display: 'flex', alignItems: 'end', borderRadius: 8, padding: 12, background: color, color: color === '#303034' ? '#fff' : '#09090A', fontWeight: 800, fontSize: 13 }}>{label}</div>
          ))}
        </div>
      </div>
    </div>
  );
}

function PageSection({ children, tone = 'dark' }) {
  const bg = tone === 'green' ? '#00E26A' : tone === 'light' ? '#F7F7F2' : '#070708';
  const color = tone === 'dark' ? '#F7F7F2' : '#09090A';
  return <section style={{ ...styles.section, background: bg, color }}><div style={styles.wrap}>{children}</div></section>;
}

function Overview() {
  const items = [
    ['Interactive browsing', 'Products are grouped onto Cube faces so shoppers can rotate, search, and inspect products visually.'],
    ['Theme editor setup', 'Merchants add the Cube as a Shopify app block and configure product groups in the theme editor.'],
    ['Cart compatible', 'Selected products use Shopify cart endpoints and dispatch cart update events for compatible drawers.'],
  ];
  const reviewer = [
    'Theme app extension for Shopify storefronts.',
    'Adds an interactive product discovery Cube as a theme app block.',
    'Uses Shopify product data selected by the merchant in the theme editor.',
    'Adds selected products to the storefront cart through Shopify cart endpoints.',
  ];
  return (
    <Shell active="overview">
      <PageSection>
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(360px, 0.9fr)', gap: 44, alignItems: 'center' }} className="tdn-grid">
          <div>
            <div style={styles.eyebrow}>Shopify theme app extension</div>
            <h1 style={styles.h1}>Vrrrt Cube.</h1>
            <p style={styles.copy}>A storefront product discovery Cube for Shopify merchants who want shoppers to browse collections by moving through a visual Cube interface.</p>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 30 }}>
              <a className="tdn-btn tdn-btn-primary" href="/cube/setup">Setup guide</a>
              <a className="tdn-btn tdn-btn-ghost" href={`mailto:${SUPPORT_EMAIL}`}>Contact support</a>
            </div>
          </div>
          <CubeVisual />
        </div>
      </PageSection>
      <PageSection tone="green">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 18 }} className="tdn-cards">
          {items.map(([title, body]) => <article key={title} style={styles.greenCard}><h2 style={{ margin: 0, fontSize: 22 }}>{title}</h2><p style={{ lineHeight: 1.55 }}>{body}</p></article>)}
        </div>
      </PageSection>
      <PageSection>
        <div style={{ display: 'grid', gridTemplateColumns: '0.75fr 1fr', gap: 34 }} className="tdn-grid">
          <div><h2 style={styles.h2}>For Shopify review</h2><p style={styles.copy}>The app is a theme app extension. It does not require shoppers to create accounts and does not process payments outside Shopify.</p></div>
          <div style={{ display: 'grid', gap: 12 }}>{reviewer.map(item => <div key={item} style={styles.card}>{item}</div>)}</div>
        </div>
      </PageSection>
    </Shell>
  );
}

const setupSteps = [
  ['Choose the Home page template', 'Open Shopify theme editor and use the page selector at the top to choose Home page. Start there because it is the simplest place to verify the Cube before adding it to other pages.', ['In Shopify admin, go to Online Store.', 'Choose the active theme and click Customize.', 'Use the top page selector to choose Home page.', 'Do not add the Cube inside Header or Footer unless you want it to appear globally.']],
  ['Add the app block', 'Add the Cube under the page Template area so it belongs to that page layout. Place it above the featured collection if you want the Cube to be the first shopping experience visitors see.', ['In the left sidebar, find the Template area.', 'Click Add section under Template.', 'Choose Apps, then select Vrrrt Cube.', 'Drag the Cube above or below existing homepage sections.', 'Avoid Header > Apps and Footer > Apps for the first setup.']],
  ['Choose collections for Cube faces', 'Use selected Shopify collections for the Cube faces. Each selected collection appears on one cube face, in order: front, right, back, left, top, bottom.', ['Set Cube products to Use selected collections.', 'Choose up to six featured collections.', 'Use collection label overrides only when the shopper-facing label should differ from the Shopify collection name.', 'If a collection has fewer products than the selected layout needs, empty tiles use the collection label tile style.', 'For stores with many products, use automated Shopify collections based on tags, product type, vendor, or other rules.']],
  ['Choose the face layout', 'Pick how many tiles appear on each cube face. Larger tiles are better for visual products; denser layouts show more products at once.', ['Use 2 x 2 for larger product imagery.', 'Use 3 x 3 for a balanced collection showcase.', 'Use 4 x 4 to show more products per face.', 'Adjust frame color, label tile color, opacity, font, and image fit to match the theme.']],
  ['Save and test', 'Preview the storefront and confirm the Cube supports product discovery while sending shoppers to the full Shopify product page for purchase decisions.', ['Click Save in the theme editor.', 'Hard refresh the storefront preview.', 'Rotate the Cube and use More or Back on the label tile when a collection has multiple pages.', 'Search for a product and use Show results on cube.', 'Click a product tile and confirm the inline details open below the Cube.', 'Click View product and confirm the Shopify product page opens with the selected variant when available.', 'Open the cart page to confirm the Cube is not accidentally placed above cart content.']],
];

function Setup() {
  return (
    <Shell active="setup">
      <PageSection>
        <div style={styles.eyebrow}>Setup guide</div>
        <h1 style={styles.h1}>Add the Cube to a Shopify storefront.</h1>
        <p style={styles.copy}>Vrrrt Cube is installed as a Shopify theme app block. Merchants control placement and product groups in the Shopify theme editor.</p>
      </PageSection>
      <PageSection>
        <div style={{ display: 'grid', gap: 16 }}>
          {setupSteps.map(([title, body, checklist], index) => (
            <section key={title} style={styles.card}>
              <div style={styles.eyebrow}>Step {index + 1}</div>
              <h2 style={{ ...styles.h2, fontSize: 30 }}>{title}</h2>
              <p style={styles.copy}>{body}</p>
              <ul style={{ display: 'grid', gap: 8, paddingLeft: 18, color: '#D6D6CE', lineHeight: 1.5 }}>{checklist.map(item => <li key={item}>{item}</li>)}</ul>
            </section>
          ))}
        </div>
        <div style={{ ...styles.card, borderColor: 'rgba(0,226,106,0.36)', marginTop: 18 }}>
          <h2 style={{ margin: 0 }}>After the home page</h2>
          <p style={styles.copy}>Once the homepage Cube is working, merchants can add separate Cube sections to collection pages, campaign pages, product pages, or custom landing pages. Each cube has its own collections, face layout, colors, and labels.</p>
        </div>
      </PageSection>
    </Shell>
  );
}

function Support() {
  const cards = [
    ['Response window', 'Support requests are reviewed on business days.'],
    ['Useful details', 'Include your Shopify store URL, theme name, where the Cube is installed, and screenshots when possible.'],
    ['Common fix', 'If the Cube is not visible, confirm the Vrrrt Cube app block is added and the theme is saved.'],
  ];
  return (
    <Shell active="support">
      <PageSection>
        <div style={styles.eyebrow}>Support</div>
        <h1 style={styles.h1}>Help with Vrrrt Cube.</h1>
        <p style={styles.copy}>For setup questions, storefront display issues, or app review requests, contact Vrrrt support.</p>
        <a className="tdn-btn tdn-btn-primary" href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>
      </PageSection>
      <PageSection tone="green">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 18 }} className="tdn-cards">
          {cards.map(([title, body]) => <article key={title} style={styles.greenCard}><h2 style={{ margin: 0, fontSize: 22 }}>{title}</h2><p style={{ lineHeight: 1.55 }}>{body}</p></article>)}
        </div>
      </PageSection>
    </Shell>
  );
}

function Docs() {
  const docs = [
    ['Setup guide', '/cube/setup', 'Add the Cube app block, choose collections, configure face layout, and test the storefront.'],
    ['Support', '/cube/support', 'Contact details and common troubleshooting notes for storefront display issues.'],
    ['Privacy', '/cube/privacy', 'What product, store, and shopper-adjacent data Vrrrt Cube uses to operate.'],
    ['Terms', '/cube/terms', 'Service terms for merchants using the Shopify product discovery Cube.'],
  ];
  return (
    <Shell active="docs">
      <PageSection>
        <div style={styles.eyebrow}>Documentation</div>
        <h1 style={styles.h1}>Vrrrt Cube docs.</h1>
        <p style={styles.copy}>The public resource hub for Shopify merchants reviewing, installing, or supporting the Vrrrt Cube.</p>
      </PageSection>
      <PageSection>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: 16 }} className="tdn-cards">
          {docs.map(([title, href, body]) => (
            <a key={title} href={href} style={{ ...styles.card, color: '#F7F7F2', textDecoration: 'none', display: 'block' }}>
              <h2 style={{ ...styles.h2, fontSize: 30 }}>{title}</h2>
              <p style={styles.copy}>{body}</p>
            </a>
          ))}
        </div>
      </PageSection>
    </Shell>
  );
}

const legalDocs = {
  privacy: {
    active: 'privacy',
    kind: 'Vrrrt Cube',
    title: 'Privacy Policy',
    intro: 'This policy explains what information Vrrrt Cube uses to provide the Shopify storefront Cube.',
    sections: [
      ['Information we use', 'Vrrrt Cube uses Shopify product and collection information that a merchant makes available to the app, including product titles, images, prices, availability, vendors, product types, tags, and product links.', 'The app may receive store-identifying information needed to install, authenticate, and operate the Shopify app.'],
      ['Shopper data', 'Vrrrt Cube does not require shoppers to create an account with Vrrrt and does not intentionally collect payment card details. Add-to-cart actions are handled through Shopify storefront cart endpoints.'],
      ['How information is used', 'Information is used to render the product discovery Cube, support merchant configuration, maintain app security, troubleshoot issues, and respond to support requests.'],
      ['Sharing', 'We do not sell personal information. We may use service providers for hosting, app delivery, logging, email, and operational support.'],
      ['Contact', `Privacy questions can be sent to ${SUPPORT_EMAIL}.`],
    ],
  },
  terms: {
    active: 'terms',
    kind: 'Vrrrt Cube',
    title: 'Terms of Service',
    intro: 'These terms apply to use of Vrrrt Cube, a Shopify product discovery app.',
    sections: [
      ['Use of the app', 'Vrrrt Cube is provided for Shopify merchants to display products in an interactive storefront Cube. Merchants are responsible for configuring the app block, product groups, theme placement, and storefront content.'],
      ['Shopify dependency', 'The app depends on Shopify platform services, storefront data, theme app extension support, and merchant theme compatibility. Some behavior can vary by theme.'],
      ['Acceptable use', 'Merchants may not use Vrrrt Cube to violate laws, infringe rights, distribute harmful content, or interfere with Shopify, Vrrrt, or other merchants.'],
      ['Availability', 'We aim to keep the app available and working, but do not guarantee uninterrupted operation. We may update, suspend, or discontinue features as needed.'],
      ['Support', `Support requests can be sent to ${SUPPORT_EMAIL}.`],
    ],
  },
};

function LegalDoc({ doc }) {
  return (
    <Shell active={doc.active}>
      <PageSection>
        <div style={styles.eyebrow}>{doc.kind}</div>
        <h1 style={styles.h1}>{doc.title}</h1>
        <p style={styles.copy}>{doc.intro}</p>
      </PageSection>
      <PageSection>
        <article style={{ maxWidth: 820 }}>
          <p style={{ ...styles.copy, fontFamily: 'Geist Mono, ui-monospace, monospace', fontSize: 13 }}>Last updated: {LAST_UPDATED}</p>
          {doc.sections.map(([heading, ...paras]) => (
            <section key={heading} style={{ marginTop: 34 }}>
              <h2 style={{ ...styles.h2, fontSize: 30 }}>{heading}</h2>
              {paras.map(p => <p key={p} style={styles.copy}>{p}</p>)}
            </section>
          ))}
        </article>
      </PageSection>
    </Shell>
  );
}

function renderThreeDNavigatePage(page) {
  const map = {
    overview: <Overview />,
    setup: <Setup />,
    support: <Support />,
    docs: <Docs />,
    privacy: <LegalDoc doc={legalDocs.privacy} />,
    terms: <LegalDoc doc={legalDocs.terms} />,
  };
  ReactDOM.createRoot(document.getElementById('root')).render(map[page] || map.overview);
}

Object.assign(window, { renderThreeDNavigatePage });
