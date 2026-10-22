import React, { useEffect, useState } from 'react';
import { Phone, Menu, X, Moon, Sun, CreditCard, Gauge, MessageCircle, ChevronRight, MapPin, Clock, Mail, FileText } from 'lucide-react';
import { Link, Ext, useRouter } from '../router';
import { EMPRESA, TELEFONOS, LINKS, EMAIL_VENTAS, whatsappUrl } from '../data/site';
import { DIVISIONES } from '../data/servicios';
import { doc } from '../data/documentos';

const NAV = [
  { to: '/', label: 'Inicio' },
  { to: '/empresas', label: 'Empresas' },
  { to: '/hogar', label: 'Hogar' },
  { to: '/eventos', label: 'Eventos' },
  { to: '/cobertura', label: 'Cobertura' },
  { to: '/contacto', label: 'Soporte y contacto' },
];

const WA_GENERAL = whatsappUrl('Hola Comunícalo, quiero información de sus servicios.');

function TopBar() {
  return (
    <div className="topbar">
      <div className="container">
        <div className="topbar-group">
          <a href={TELEFONOS.empresas.href}><Phone size={13} /> Empresas <strong>{TELEFONOS.empresas.num}</strong></a>
          <a href={TELEFONOS.empresas2.href}><strong>{TELEFONOS.empresas2.num}</strong></a>
          <a href={TELEFONOS.hogar.href}><Phone size={13} /> Hogar <strong>{TELEFONOS.hogar.num}</strong></a>
        </div>
        <div className="topbar-group">
          <Ext href={LINKS.pagos}><CreditCard size={13} /> Pagar mi servicio (Hogar)</Ext>
          <Ext href={LINKS.speedtest}><Gauge size={13} /> Prueba tu velocidad</Ext>
          <Link to="/transparencia"><FileText size={13} /> Transparencia IFT</Link>
        </div>
      </div>
    </div>
  );
}

function useTheme() {
  const [tema, setTema] = useState('light');
  useEffect(() => {
    setTema(document.documentElement.dataset.theme || 'light');
  }, []);
  const alternar = () => {
    const nuevo = tema === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = nuevo;
    try { localStorage.setItem('tema', nuevo); } catch {}
    setTema(nuevo);
  };
  return [tema, alternar];
}

function Header() {
  const { path } = useRouter();
  const [abierto, setAbierto] = useState(false);
  const [tema, alternarTema] = useTheme();

  useEffect(() => setAbierto(false), [path]);

  // MAXVISION es un apartado de Hogar
  const actual = (to) => (path === to || path.startsWith(to + '/') || (to === '/hogar' && path === '/maxvision') ? 'page' : undefined);

  return (
    <header className="header">
      <div className="container nav">
        <Link to="/" className="logo" aria-label="Comunícalo de México, inicio">
          <img src="/img/logo-comunicalo.png" alt="Comunícalo de México" width="125" height="38" />
        </Link>

        <nav className="nav-links" aria-label="Principal">
          {NAV.map((n) => (
            <Link key={n.to} to={n.to} className={n.className} aria-current={actual(n.to)}>{n.label}</Link>
          ))}
        </nav>

        <div className="nav-actions">
          <button className="icon-btn" onClick={alternarTema} aria-label={tema === 'dark' ? 'Activar modo claro' : 'Activar modo oscuro'}>
            {tema === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <Link to="/cotizar" className="btn btn-primary btn-sm nav-cta">Cotizar ahora</Link>
          <button className="icon-btn menu-btn" onClick={() => setAbierto(!abierto)} aria-expanded={abierto} aria-controls="menu-movil" aria-label="Menú">
            {abierto ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {abierto && (
        <div className="mobile-menu" id="menu-movil">
          <div className="container">
            {NAV.map((n) => (
              <React.Fragment key={n.to}>
                <Link to={n.to} className="mm-link" aria-current={n.to === '/hogar' && path === '/maxvision' ? undefined : actual(n.to)}>
                  {n.label} <ChevronRight size={18} />
                </Link>
                {n.to === '/hogar' && (
                  <Link to="/maxvision" className="mm-link mm-sub" aria-current={path === '/maxvision' ? 'page' : undefined}>MAXVISION TV <ChevronRight size={18} /></Link>
                )}
              </React.Fragment>
            ))}
            <Ext href={LINKS.pagos} className="mm-link">Pagar mi servicio (Hogar) <ChevronRight size={18} /></Ext>
            <Link to="/transparencia" className="mm-link">Transparencia IFT / PROFECO <ChevronRight size={18} /></Link>
            <div className="btn-row">
              <Link to="/cotizar" className="btn btn-primary btn-block">Cotizar ahora</Link>
              <a href={TELEFONOS.empresas.href} className="btn btn-outline btn-block"><Phone size={16} /> Empresas {TELEFONOS.empresas.num}</a>
              <a href={TELEFONOS.hogar.href} className="btn btn-outline btn-block"><Phone size={16} /> Hogar {TELEFONOS.hogar.num}</a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <Link to="/" className="logo" aria-label="Inicio">
              <img src="/img/logo-comunicalo.png" alt="Comunícalo de México" width="157" height="48" loading="lazy" />
            </Link>
            <p className="mt-2">
              Concesionario de telecomunicaciones con Título de Concesión Única (IFT). Internet, telefonía, redes y seguridad para empresas, eventos y hogares.
            </p>
            <div className="social">
              <Ext href={LINKS.facebook} aria-label="Facebook"><FacebookIcon /></Ext>
              <Ext href={LINKS.twitter} aria-label="X (Twitter)"><XIcon /></Ext>
              <a href={WA_GENERAL} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp"><MessageCircle size={18} /></a>
            </div>
          </div>

          <div>
            <h3>Empresas</h3>
            <ul>
              {DIVISIONES.flatMap((d) => d.servicios).slice(0, 9).map((s) => (
                <li key={s.id}><Link to={`/empresas#${s.id}`}>{s.titulo}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <h3>Hogar y entretenimiento</h3>
            <ul>
              <li><Link to="/hogar">Internet + teléfono</Link></li>
              <li><Link to="/hogar#triple-play">Internet + TV + teléfono</Link></li>
              <li><Link to="/hogar#television">Barra de canales</Link></li>
              <li><Link to="/maxvision">MAXVISION TV</Link></li>
              <li><Link to="/eventos">Internet para eventos</Link></li>
              <li><Link to="/cobertura">Cobertura</Link></li>
            </ul>
          </div>

          <div>
            <h3>Clientes</h3>
            <ul>
              <li><Ext href={LINKS.pagos}>Portal de pagos (Hogar)</Ext></li>
              <li><Ext href={LINKS.speedtest}>Prueba tu velocidad</Ext></li>
              <li><Link to="/contacto">Soporte técnico</Link></li>
              <li><Link to="/transparencia">Tarifas registradas IFT</Link></li>
              <li><Link to="/transparencia#documentos">Contratos y derechos</Link></li>
              <li><a href={doc('aviso-de-privacidad.pdf')}>Aviso de privacidad</a></li>
            </ul>
          </div>

          <div>
            <h3>Contacto</h3>
            <ul>
              <li><a href={TELEFONOS.empresas.href}>Empresas: <strong>{TELEFONOS.empresas.num}</strong></a></li>
              <li><a href={TELEFONOS.empresas2.href}>Empresas: <strong>{TELEFONOS.empresas2.num}</strong></a></li>
              <li><a href={TELEFONOS.hogar.href}>Hogar: <strong>{TELEFONOS.hogar.num}</strong></a></li>
              <li><a href={`mailto:${EMAIL_VENTAS}`} style={{ display: 'inline-flex', gap: 6, alignItems: 'center' }}><Mail size={14} /> {EMAIL_VENTAS}</a></li>
              <li style={{ display: 'flex', gap: 6 }}><MapPin size={14} style={{ marginTop: 4, flexShrink: 0 }} /> <Ext href={EMPRESA.mapa}>{EMPRESA.direccion}</Ext></li>
              <li style={{ display: 'flex', gap: 6, alignItems: 'center' }}><Clock size={14} /> {EMPRESA.horario}</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>© {new Date().getFullYear()} {EMPRESA.razonSocial}. Todos los derechos reservados.</span>
        <span><Link to="/transparencia">Transparencia IFT / PROFECO</Link> · <a href={doc('aviso-de-privacidad.pdf')}>Privacidad</a></span>
      </div>
    </footer>
  );
}

const FacebookIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M14 8h3V4h-3c-2.8 0-4.5 1.9-4.5 4.7V11H7v4h2.5v9h4v-9h3l.5-4h-3.5V8.9c0-.6.4-.9 1-.9z" /></svg>
);

const XIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M18.2 2h3.4l-7.4 8.5L23 22h-6.8l-5.3-6.9L4.8 22H1.4l7.9-9.1L1 2h7l4.8 6.3L18.2 2zm-1.2 18h1.9L7.1 3.9H5.1L17 20z" /></svg>
);

const Zap18 = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z" /></svg>
);

export default function Layout({ children }) {
  return (
    <>
      <a href="#contenido" className="skip">Saltar al contenido</a>
      <TopBar />
      <Header />
      <main id="contenido">{children}</main>
      <Footer />
      <a href={WA_GENERAL} target="_blank" rel="noopener noreferrer" className="wa-float" aria-label="Escríbenos por WhatsApp">
        <MessageCircle size={28} />
      </a>
    </>
  );
}
