import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X, ArrowUpRight, Code2 } from 'lucide-react';
import navData from '../data/navigation.json';
import siteConfig from '../data/siteConfig.json';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Scroll listener for sticky glass header styling
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname, location.hash]);

  const handleNavClick = (path) => {
    if (path.startsWith('/#')) {
      const elementId = path.replace('/#', '');
      if (location.pathname === '/') {
        const target = document.getElementById(elementId);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
  };

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        transition: 'all var(--transition-normal)',
      }}
    >
      {/* 1. TOP SECTION BAR: College Logo (Left) & IT Club Logo (Right) */}
      <div
        style={{
          background: scrolled
            ? 'rgba(5, 7, 11, 0.92)'
            : 'linear-gradient(180deg, rgba(5, 7, 11, 0.85) 0%, rgba(5, 7, 11, 0.4) 100%)',
          borderBottom: '1px solid var(--glass-border-subtle)',
          backdropFilter: 'var(--glass-blur-sm)',
          WebkitBackdropFilter: 'var(--glass-blur-sm)',
          padding: '6px 0',
          transition: 'all var(--transition-normal)',
        }}
      >
        <div className="container-wide" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          {/* LEFT: College Brand Crest */}
          <a
            href={siteConfig.college.website}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              textDecoration: 'none',
            }}
          >
            <img
              src={siteConfig.college.logo}
              alt={siteConfig.college.name}
              style={{ height: '26px', width: 'auto' }}
            />
          </a>

          {/* RIGHT: IT Club Emblem */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span
              style={{
                fontSize: '0.75rem',
                color: 'var(--text-muted)',
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
                fontWeight: 600,
                display: 'none',
              }}
              className="desktop-only-text"
            >
              AFFILIATED WITH
            </span>
            <img
              src={siteConfig.itClub.logo}
              alt={siteConfig.itClub.name}
              style={{ height: '26px', width: 'auto' }}
            />
          </div>
        </div>
      </div>

      {/* 2. MAIN NAVIGATION BAR: Center Coding Club Logo + Nav Items + Join CTA */}
      <div
        style={{
          background: scrolled
            ? 'rgba(9, 13, 22, 0.88)'
            : 'rgba(9, 13, 22, 0.65)',
          backdropFilter: 'var(--glass-blur-md)',
          WebkitBackdropFilter: 'var(--glass-blur-md)',
          borderBottom: '1px solid var(--glass-border-medium)',
          boxShadow: scrolled ? 'var(--shadow-md)' : 'none',
          padding: '12px 0',
          transition: 'all var(--transition-normal)',
        }}
      >
        <div
          className="container-wide"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          {/* CENTER / BRAND: Coding Club Logo */}
          <Link
            to="/"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              textDecoration: 'none',
            }}
          >
            <img
              src={siteConfig.codingClub.logo}
              alt={siteConfig.codingClub.name}
              style={{ height: '36px', width: 'auto' }}
            />
          </Link>

          {/* DESKTOP NAV LINKS */}
          <nav
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              background: 'rgba(15, 23, 42, 0.5)',
              padding: '6px 14px',
              borderRadius: 'var(--radius-full)',
              border: '1px solid var(--glass-border-subtle)',
              backdropFilter: 'var(--glass-blur-sm)',
            }}
            className="desktop-nav"
          >
            {navData.links.map((link) => {
              const isHashLink = link.path.startsWith('/#');
              const isCurrent = isHashLink
                ? location.hash === link.path.replace('/', '')
                : location.pathname === link.path;

              return isHashLink ? (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => handleNavClick(link.path)}
                  style={{
                    padding: '6px 14px',
                    fontSize: '0.88rem',
                    fontWeight: 500,
                    color: isCurrent ? 'var(--text-primary)' : 'var(--text-secondary)',
                    background: isCurrent ? 'rgba(255, 255, 255, 0.08)' : 'transparent',
                    borderRadius: 'var(--radius-full)',
                    transition: 'all var(--transition-fast)',
                  }}
                  onMouseEnter={(e) => {
                    if (!isCurrent) {
                      e.currentTarget.style.color = 'var(--text-primary)';
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.04)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isCurrent) {
                      e.currentTarget.style.color = 'var(--text-secondary)';
                      e.currentTarget.style.background = 'transparent';
                    }
                  }}
                >
                  {link.name}
                </Link>
              ) : (
                <NavLink
                  key={link.name}
                  to={link.path}
                  style={({ isActive }) => ({
                    padding: '6px 14px',
                    fontSize: '0.88rem',
                    fontWeight: 500,
                    color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)',
                    background: isActive ? 'rgba(255, 255, 255, 0.08)' : 'transparent',
                    borderRadius: 'var(--radius-full)',
                    transition: 'all var(--transition-fast)',
                  })}
                >
                  {link.name}
                </NavLink>
              );
            })}
          </nav>

          {/* RIGHT ACTION: Join / Contact CTA */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }} className="desktop-nav">
            <Link
              to={navData.action.href}
              className="btn btn-primary btn-sm"
              style={{
                borderRadius: 'var(--radius-full)',
                padding: '8px 18px',
                fontSize: '0.85rem',
              }}
            >
              <span>{navData.action.label}</span>
              <ArrowUpRight size={15} />
            </Link>
          </div>

          {/* MOBILE HAMBURGER BUTTON */}
          <button
            type="button"
            aria-label="Toggle navigation menu"
            className="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{
              display: 'none',
              padding: '8px',
              borderRadius: 'var(--radius-md)',
              background: 'var(--glass-bg-subtle)',
              border: '1px solid var(--glass-border-medium)',
              color: 'var(--text-primary)',
            }}
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* 3. ANIMATED MOBILE DRAWER MENU */}
      {mobileMenuOpen && (
        <div
          className="mobile-drawer animate-fade-in"
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            background: 'var(--glass-bg-dropdown)',
            backdropFilter: 'var(--glass-blur-lg)',
            WebkitBackdropFilter: 'var(--glass-blur-lg)',
            borderBottom: '1px solid var(--glass-border-medium)',
            padding: '24px',
            boxShadow: 'var(--shadow-lg)',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
          }}
        >
          {navData.links.map((link) => {
            const isHashLink = link.path.startsWith('/#');
            return (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => {
                  handleNavClick(link.path);
                  setMobileMenuOpen(false);
                }}
                style={{
                  padding: '12px 16px',
                  borderRadius: 'var(--radius-md)',
                  background: 'var(--glass-bg-subtle)',
                  border: '1px solid var(--glass-border-subtle)',
                  color: 'var(--text-primary)',
                  fontSize: '1rem',
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <span>{link.name}</span>
                <ArrowUpRight size={16} color="var(--accent-blue)" />
              </Link>
            );
          })}
          <Link
            to={navData.action.href}
            className="btn btn-primary"
            style={{ marginTop: '8px', width: '100%' }}
            onClick={() => setMobileMenuOpen(false)}
          >
            <span>{navData.action.label}</span>
            <ArrowUpRight size={18} />
          </Link>
        </div>
      )}

      {/* Inline styles for responsive menu toggle */}
      <style>{`
        @media (max-width: 900px) {
          .desktop-nav {
            display: none !important;
          }
          .mobile-menu-toggle {
            display: flex !important;
          }
        }
      `}</style>
    </header>
  );
}
