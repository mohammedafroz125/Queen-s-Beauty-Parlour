import { useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { Link, useLocation } from '@tanstack/react-router';
import { ArrowUpRight, Crown, Heart, Menu, MessageCircle, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { beautyBusiness, whatsappUrl } from '@/lib/beauty';

const navigation = [
  { label: 'Home', to: '/' as const },
  { label: 'Services', to: '/services' as const },
  { label: 'Makeup Looks', to: '/makeup-looks' as const },
  { label: 'Gallery', to: '/gallery' as const },
  { label: 'About', to: '/about' as const },
  { label: 'Contact', to: '/contact' as const },
];

function Brand({ footer = false }: { footer?: boolean }) {
  return <Link to="/" className={`brand ${footer ? 'brand-footer' : ''}`} aria-label="Queen’s Beauty Parlour home">
    <Crown strokeWidth={1.2} />
    <span><span className="brand-name">Queen’s</span><span className="brand-caption">BEAUTY PARLOUR</span></span>
  </Link>;
}

export function SiteLayout({ children }: { children: ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';
  const whatsapp = whatsappUrl(beautyBusiness.whatsappNumber, 'Hello Queen’s Beauty Parlour, I would like to enquire about a beauty service.');

  useEffect(() => {
    setIsScrolled(window.scrollY > 0);
    const handleScroll = () => setIsScrolled(window.scrollY > 0);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  return <>
    <a href="#main" className="skip-link">Skip to content</a>
    <header className={`site-header ${isHome ? 'site-header-home' : ''} ${isHome && isScrolled ? 'site-header-scrolled' : ''}`}>
      <div className="header-inner">
        <Brand />
        <nav aria-label="Main navigation" className="desktop-nav">
          {navigation.map(item => <Link key={item.to} to={item.to} activeOptions={{ exact: true }} activeProps={{ className: 'nav-active' }}>{item.label}</Link>)}
        </nav>
        <div className="header-actions">
          <Button asChild className="header-book"><Link to="/book" search={{ service: '' }}>Book now <ArrowUpRight /></Link></Button>
          <Button size="icon" variant="ghost" className="mobile-menu" aria-label={menuOpen ? 'Close menu' : 'Open menu'} aria-expanded={menuOpen} aria-controls="mobile-navigation" onClick={() => setMenuOpen(open => !open)}>{menuOpen ? <X /> : <Menu />}</Button>
        </div>
      </div>
      {menuOpen && <nav id="mobile-navigation" aria-label="Mobile navigation" className="mobile-nav">
        {navigation.map(item => <Link key={item.to} to={item.to} activeOptions={{ exact: true }} activeProps={{ className: 'nav-active' }} onClick={() => setMenuOpen(false)}>{item.label}<ArrowUpRight size={16} /></Link>)}
        <Link to="/book" search={{ service: '' }} onClick={() => setMenuOpen(false)}>Book appointment<ArrowUpRight size={16} /></Link>
      </nav>}
    </header>
    <main id="main">{children}</main>
    <footer className="site-footer">
      <div className="container footer-top"><Brand footer /><p>Beauty at home.<br />A little time for yourself.</p>
        <nav aria-label="Footer navigation">{navigation.slice(1).map(item => <Link key={item.to} to={item.to}>{item.label}</Link>)}<Link to="/book" search={{ service: '' }}>Book appointment</Link></nav>
      </div>
      <div className="container footer-bottom"><p>© {new Date().getUTCFullYear()} Queen’s Beauty Parlour.</p><span>Made with a little care <Heart size={12} /></span></div>
    </footer>
    {whatsapp && <Button asChild className="floating-whatsapp" size="icon" aria-label="WhatsApp enquiry" title="WhatsApp enquiry"><a href={whatsapp} target="_blank" rel="noopener noreferrer"><MessageCircle /></a></Button>}
  </>;
}