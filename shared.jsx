// Vrrrt site — shared components
// Logo, Button, Icon, Eyebrow, Header (with multi-product nav), FooterCTA, Footer
// Loaded by every page via <script type="text/babel" src="shared.jsx"></script>

const { useState, useEffect, useRef } = React;

// ============ ATOMS ============

const Logo = ({ color = '#0A0A0B', size = 22 }) => (
  <a href="/" style={{ textDecoration: 'none', display: 'inline-block' }}>
    <span style={{
      fontFamily: 'Geist, system-ui, sans-serif', fontWeight: 700,
      letterSpacing: '-0.06em', fontSize: size, color, lineHeight: 1, whiteSpace: 'nowrap',
    }}>
      Vrrrt<span style={{ color: '#00E26A' }}>.</span>
    </span>
  </a>
);

const Eyebrow = ({ children, color = '#71717A' }) => (
  <div style={{
    fontFamily: 'Geist, system-ui, sans-serif',
    fontSize: 12, fontWeight: 600, letterSpacing: '0.12em',
    textTransform: 'uppercase', color, marginBottom: 18,
  }}>{children}</div>
);

const Button = ({ variant = 'primary', size = 'md', href, children, leadingIcon, trailingIcon, ...rest }) => {
  const styleMap = {
    primary:   { background: '#00E26A', color: '#000', border: '1px solid transparent' },
    secondary: { background: '#0A0A0B', color: '#fff', border: '1px solid transparent' },
    tertiary:  { background: '#fff',    color: '#0A0A0B', border: '1px solid #E4E4E7' },
    ghost:     { background: 'transparent', color: '#0A0A0B', border: '1px solid transparent' },
    'ghost-on-dark': { background: 'transparent', color: '#fff', border: '1px solid rgba(255,255,255,0.18)' },
  };
  const sizeMap = {
    sm: { padding: '6px 12px',  fontSize: 12, borderRadius: 8 },
    md: { padding: '10px 18px', fontSize: 14, borderRadius: 10 },
    lg: { padding: '14px 24px', fontSize: 16, borderRadius: 12 },
  };
  const Tag = href ? 'a' : 'button';
  return (
    <Tag {...rest} href={href} className={`vt-btn vt-btn--${variant}`} style={{
      ...styleMap[variant], ...sizeMap[size],
      fontFamily: 'Geist, system-ui, sans-serif', fontWeight: 600,
      display: 'inline-flex', alignItems: 'center', gap: 8,
      cursor: 'pointer', lineHeight: 1, textDecoration: 'none', whiteSpace: 'nowrap',
      transition: 'all 120ms cubic-bezier(.2,.9,.2,1)', ...rest.style,
    }}>
      {leadingIcon}{children}{trailingIcon}
    </Tag>
  );
};

const Icon = ({ name, size = 18, stroke = 1.5, color = 'currentColor', style }) => {
  const paths = {
    'arrow-right': <><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></>,
    'arrow-up-right': <><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></>,
    'check':       <path d="M20 6 9 17l-5-5"/>,
    'play':        <path d="M5 3v18l16-9L5 3z"/>,
    'chevron-down':<polyline points="6 9 12 15 18 9"/>,
    'sparkle':     <path d="m12 3 1.9 5.6L19 10l-5.1 1.4L12 17l-1.9-5.6L5 10l5.1-1.4L12 3z"/>,
    'shopify':     <><path d="M12 2 4 5v6c0 5 3.5 9.7 8 11 4.5-1.3 8-6 8-11V5l-8-3z"/></>,
    'code':        <><path d="m16 18 6-6-6-6"/><path d="m8 6-6 6 6 6"/></>,
    'wordpress':   <><circle cx="12" cy="12" r="10"/><path d="M3 12h18M12 2a15 15 0 0 0 0 20M12 2a15 15 0 0 1 0 20"/></>,
    'woo':         <><path d="M3 7h18l-2 12H5L3 7z"/><path d="M8 10v4M12 10v4M16 10v4"/></>,
    'mail':        <><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></>,
  };
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke={color} strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round"
      style={style}>{paths[name] || null}</svg>
  );
};

// ============ HEADER (with product mega-menu) ============

const PRODUCTS = [
  { id: 'shopify',     name: 'Vrrrt for Shopify',       href: 'https://apps.shopify.com/3dnavigate',     status: 'live',  blurb: 'Storefront discovery, baked into your theme.', icon: 'shopify' },
  { id: 'custom',      name: 'Vrrrt Custom Development', href: '/support',        status: 'soon',  blurb: 'Custom Cube builds for complex storefronts.', icon: 'code' },
  { id: 'wordpress',   name: 'Vrrrt for WordPress',     href: '/wordpress',       status: 'soon',  blurb: 'WP plugin. Drop-in discovery anywhere.',       icon: 'wordpress' },
  { id: 'woocommerce', name: 'Vrrrt for WooCommerce',   href: '/woocommerce',     status: 'soon',  blurb: 'Woo-native discovery for store owners.',       icon: 'woo' },
];

const StatusPill = ({ status }) => {
  const isLive = status === 'live';
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 5,
      padding: '2px 7px', borderRadius: 999,
      background: isLive ? 'rgba(0,226,106,0.12)' : 'rgba(245,180,0,0.12)',
      color: isLive ? '#00C25A' : '#B07800',
      fontFamily: 'Geist Mono, monospace', fontSize: 9, fontWeight: 600,
      letterSpacing: '0.06em',
    }}>
      <span style={{
        width: 5, height: 5, borderRadius: '50%',
        background: isLive ? '#00E26A' : '#F5B400',
        boxShadow: isLive ? '0 0 6px rgba(0,226,106,0.7)' : 'none',
      }}/>
      {isLive ? 'LIVE' : 'SOON'}
    </span>
  );
};

const ProductsMenu = ({ active, onClose }) => (
  <div style={{
    position: 'absolute', top: 'calc(100% + 8px)', left: 0,
    background: '#fff', borderRadius: 14, padding: 8,
    boxShadow: '0 12px 32px rgba(0,0,0,0.10), 0 0 0 1px rgba(0,0,0,0.05)',
    width: 420, zIndex: 100,
  }}>
    {PRODUCTS.map(p => (
      <a key={p.id} href={p.href} onClick={onClose} style={{
        display: 'flex', alignItems: 'center', gap: 14,
        padding: '12px 14px', borderRadius: 10, textDecoration: 'none',
        background: active === p.id ? '#F4F4F5' : 'transparent',
        transition: 'background 120ms cubic-bezier(.2,.9,.2,1)',
      }}
      onMouseEnter={e => e.currentTarget.style.background = '#F4F4F5'}
      onMouseLeave={e => e.currentTarget.style.background = active === p.id ? '#F4F4F5' : 'transparent'}
      >
        <div style={{
          width: 36, height: 36, borderRadius: 8, background: '#0A0A0B',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexShrink: 0,
        }}>
          <Icon name={p.icon} size={18} color="#00E26A" />
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{
              fontFamily: 'Geist, system-ui, sans-serif', fontSize: 14, fontWeight: 600, color: '#0A0A0B',
            }}>{p.name}</span>
            <StatusPill status={p.status} />
          </div>
          <div style={{
            fontFamily: 'Geist, system-ui, sans-serif', fontSize: 12, color: '#71717A',
            marginTop: 2,
          }}>{p.blurb}</div>
        </div>
      </a>
    ))}
  </div>
);

const Header = ({ active = 'home', dark = false }) => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  useEffect(() => {
    const onClick = (e) => { if (menuRef.current && !menuRef.current.contains(e.target)) setMenuOpen(false); };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, []);

  const bg = dark
    ? (scrolled ? 'rgba(10,10,11,0.72)' : 'transparent')
    : (scrolled ? 'rgba(250,250,250,0.72)' : 'transparent');
  const borderColor = dark
    ? (scrolled ? 'rgba(255,255,255,0.06)' : 'transparent')
    : (scrolled ? 'rgba(0,0,0,0.06)' : 'transparent');
  const textColor = dark ? '#A1A1AA' : '#3F3F46';
  const textActive = dark ? '#fff' : '#0A0A0B';

  return (
    <header style={{
      position: 'sticky', top: 0, zIndex: 50,
      background: bg,
      backdropFilter: scrolled ? 'blur(16px) saturate(180%)' : 'none',
      WebkitBackdropFilter: scrolled ? 'blur(16px) saturate(180%)' : 'none',
      borderBottom: '1px solid ' + borderColor,
      transition: 'all 180ms cubic-bezier(.2,.9,.2,1)',
    }}>
      <div style={{
        maxWidth: 1240, margin: '0 auto', padding: '14px 32px',
        display: 'flex', alignItems: 'center', gap: 36,
      }}>
        <Logo color={dark ? '#fff' : '#0A0A0B'} size={22} />
        <nav style={{ display: 'flex', gap: 26, flex: 1, alignItems: 'center' }}>
          <div ref={menuRef} style={{ position: 'relative' }}>
            <button onClick={() => setMenuOpen(o => !o)} style={{
              display: 'inline-flex', alignItems: 'center', gap: 4,
              background: 'transparent', border: 'none', cursor: 'pointer',
              fontFamily: 'Geist, system-ui, sans-serif', fontSize: 14, fontWeight: 500,
              color: PRODUCTS.some(p => p.id === active) ? textActive : textColor,
              padding: 0, position: 'relative',
            }}>
              Products
              <Icon name="chevron-down" size={14} stroke={2} style={{
                transform: menuOpen ? 'rotate(180deg)' : 'rotate(0)',
                transition: 'transform 180ms cubic-bezier(.2,.9,.2,1)',
              }}/>
              {PRODUCTS.some(p => p.id === active) && (
                <span style={{
                  position: 'absolute', left: 0, right: 18, bottom: -6, height: 2,
                  background: '#00E26A', borderRadius: 1,
                  boxShadow: '0 0 8px rgba(0,226,106,0.6)',
                }}/>
              )}
            </button>
            {menuOpen && <ProductsMenu active={active} onClose={() => setMenuOpen(false)} />}
          </div>
          {[
            { id: 'pricing',   label: 'Pricing',   href: '/#pricing' },
            { id: 'merchants', label: 'Merchants', href: '/#merchants' },
            { id: 'research',  label: 'Research',  href: '/research' },
            { id: 'support',   label: 'Support',   href: '/support' },
          ].map(item => (
            <a key={item.id} href={item.href} style={{
              fontFamily: 'Geist, system-ui, sans-serif', fontSize: 14, fontWeight: 500,
              color: active === item.id ? textActive : textColor,
              textDecoration: 'none', position: 'relative',
            }}>
              {item.label}
              {active === item.id && (
                <span style={{
                  position: 'absolute', left: 0, right: 0, bottom: -6, height: 2,
                  background: '#00E26A', borderRadius: 1,
                  boxShadow: '0 0 8px rgba(0,226,106,0.6)',
                }}/>
              )}
            </a>
          ))}
        </nav>
        <Button variant={dark ? 'ghost-on-dark' : 'ghost'} size="sm" href="/partners">Partners</Button>
        <Button variant="primary" size="sm" href="https://apps.shopify.com/3dnavigate" trailingIcon={<Icon name="arrow-right" size={14} stroke={2}/>}>
          Install on Shopify
        </Button>
      </div>
    </header>
  );
};

// ============ FOOTER CTA ============

const FooterCTA = ({ headline, sub, primary = 'Install on Shopify', secondary = 'Book a demo', primaryHref, secondaryHref, eyebrow = '— Get started' }) => (
  <section style={{
    background: '#000', color: '#fff', padding: '120px 32px',
    position: 'relative', overflow: 'hidden',
  }}>
    <div style={{
      position: 'absolute', inset: 0, opacity: 0.04,
      backgroundImage: 'repeating-linear-gradient(90deg, transparent 0 120px, #fff 120px 121px)',
    }}/>
    <div style={{ maxWidth: 1240, margin: '0 auto', position: 'relative', textAlign: 'center' }}>
      <Eyebrow color="#00E26A">{eyebrow}</Eyebrow>
      <h2 style={{
        fontFamily: 'Geist, system-ui, sans-serif',
        fontWeight: 700, fontSize: 96, lineHeight: 0.98, letterSpacing: '-0.05em',
        margin: '0 auto', color: '#fff', maxWidth: '14ch',
      }} dangerouslySetInnerHTML={{ __html: headline }} />
      <p style={{
        fontFamily: 'Geist, system-ui, sans-serif',
        fontSize: 17, color: '#A1A1AA', maxWidth: '54ch',
        margin: '24px auto 36px', lineHeight: 1.5,
      }}>{sub}</p>
      <div style={{ display: 'inline-flex', gap: 12 }}>
        <Button variant="primary" size="lg" href={primaryHref} trailingIcon={<Icon name="arrow-right" size={16} stroke={2}/>}>
          {primary}
        </Button>
        <Button variant="ghost-on-dark" size="lg" href={secondaryHref} target={secondaryHref && secondaryHref.startsWith('http') ? '_blank' : undefined} rel={secondaryHref && secondaryHref.startsWith('http') ? 'noopener noreferrer' : undefined}>{secondary}</Button>
      </div>
    </div>
  </section>
);

// ============ FOOTER ============

const Footer = () => (
  <footer style={{
    background: '#0A0A0B', color: '#A1A1AA', padding: '64px 32px 40px',
    borderTop: '1px solid #18181B',
  }}>
    <div style={{ maxWidth: 1240, margin: '0 auto' }}>
      <div style={{
        display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: 40,
        marginBottom: 56,
      }}>
        <div>
          <Logo color="#fff" size={26} />
          <p style={{
            fontSize: 14, color: '#71717A', marginTop: 16, maxWidth: '34ch', lineHeight: 1.5,
          }}>
            Shopify-first, built for speed. One Rapid Discovery Cube. Product discovery at the speed shoppers actually scroll.
          </p>
        </div>
        {[
          { h: 'Products', items: PRODUCTS.map(p => ({ label: p.name.replace('Vrrrt for ', ''), href: p.href, status: p.status })) },
          { h: 'Merchants', items: [
            { label: 'Pricing', href: '/#pricing' },
            { label: 'Research', href: '/research' },
            { label: 'Partners', href: '/partners' },
            { label: 'Support', href: '/support' },
          ]},
          { h: 'Legal', items: [
            { label: 'Privacy policy', href: '/privacy' },
            { label: 'Terms of service', href: '/terms' },
            { label: 'Data deletion', href: '/data-deletion' },
          ]},
        ].map(col => (
          <div key={col.h}>
            <div style={{
              fontFamily: 'Geist, system-ui, sans-serif',
              fontSize: 12, fontWeight: 600, letterSpacing: '0.12em',
              textTransform: 'uppercase', color: '#fff', marginBottom: 16,
            }}>{col.h}</div>
            {col.h === 'Products' && (
              <p style={{ margin: '-8px 0 14px', color: '#71717A', fontSize: 12, lineHeight: 1.35 }}>
                Shopify-first, built for speed.
              </p>
            )}
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
              {col.items.map(it => (
                <li key={it.label}>
                  <a href={it.href} style={{
                    color: '#71717A', fontSize: 13, textDecoration: 'none',
                    display: 'inline-flex', alignItems: 'center', gap: 8,
                  }}>
                    {it.label}
                    {it.status === 'soon' && (
                      <span style={{
                        fontFamily: 'Geist Mono, monospace', fontSize: 9, color: '#F5B400',
                        background: 'rgba(245,180,0,0.12)', padding: '1px 5px', borderRadius: 3,
                        letterSpacing: '0.04em',
                      }}>SOON</span>
                    )}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div style={{
        paddingTop: 24, borderTop: '1px solid #18181B',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12,
      }}>
        <span style={{ fontSize: 12, color: '#71717A', fontFamily: 'Geist Mono, monospace', whiteSpace: 'nowrap' }}>
          © 2026 Vrrrt, Inc.
        </span>
        <span style={{ fontSize: 12, color: '#3F3F46', fontFamily: 'Geist Mono, monospace', whiteSpace: 'nowrap' }}>
          v1.4.0 · status: <span style={{ color: '#00E26A' }}>● all systems</span>
        </span>
      </div>
    </div>
  </footer>
);

// ============ PAGE WRAPPER ============

const PageHead = ({ children }) => <>{children}</>;

Object.assign(window, {
  Logo, Eyebrow, Button, Icon, StatusPill, PRODUCTS, ProductsMenu,
  Header, FooterCTA, Footer,
});
