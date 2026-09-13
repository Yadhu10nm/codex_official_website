import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import navData from '../data/navigation.json';
import siteConfig from '../data/siteConfig.json';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Scroll listener for sticky glass header styling
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
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
      className={`site-header ${scrolled ? 'is-scrolled' : ''}`}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        transition: 'background 280ms ease, border-color 280ms ease, box-shadow 280ms ease, backdrop-filter 280ms ease',
        background: scrolled
          ? 'rgba(255, 255, 255, 0.94)'
          : 'rgba(255, 255, 255, 0.85)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderBottom: '1px solid rgba(15, 23, 42, 0.06)',
        boxShadow: scrolled
          ? '0 6px 24px -4px rgba(15, 23, 42, 0.05), inset 0 1px 0 rgba(255, 255, 255, 0.95)'
          : 'none',
      }}
    >
      <div
        className="container-wide"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '70px',
          position: 'relative',
        }}
      >
        {/* 1. BRAND LOGO (Left - Sleek dark badge for optimal contrast of white logo on white website) */}
        <Link
          to="/"
          className="header-brand"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            textDecoration: 'none',
            flexShrink: 0,
          }}
          title={siteConfig.codingClub.fullName}
        >
          <div
            className="header-logo-badge"
            style={{
              background: '#0f172a',
              padding: '5px 14px',
              borderRadius: 'var(--radius-full)',
              display: 'inline-flex',
              alignItems: 'center',
              boxShadow: '0 2px 10px rgba(15, 23, 42, 0.12)',
              border: '1px solid rgba(15, 23, 42, 0.2)',
              transition: 'transform 0.25s ease, box-shadow 0.25s ease',
            }}
          >
            <img
              src={siteConfig.codingClub.logo}
              alt={siteConfig.codingClub.name}
              className="header-logo-codex"
            />
          </div>
        </Link>

        {/* 2. CENTER FLOATING NAVIGATION PILL (Desktop) */}
        <nav
          className="desktop-nav-pill"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '3px',
            background: 'rgba(241, 245, 249, 0.85)',
            padding: '4px 6px',
            borderRadius: 'var(--radius-full)',
            border: '1px solid rgba(15, 23, 42, 0.07)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            boxShadow: '0 1px 3px rgba(15, 23, 42, 0.03)',
          }}
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
                className={`nav-pill-item ${isCurrent ? 'active' : ''}`}
                style={{
                  padding: '6px 15px',
                  fontSize: '0.86rem',
                  fontWeight: 500,
                  color: isCurrent ? 'var(--accent-blue)' : 'var(--text-secondary)',
                  background: isCurrent ? '#ffffff' : 'transparent',
                  borderRadius: 'var(--radius-full)',
                  boxShadow: isCurrent ? '0 1px 3px rgba(15, 23, 42, 0.06)' : 'none',
                  transition: 'all var(--transition-fast)',
                }}
              >
                {link.name}
              </Link>
            ) : (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) => `nav-pill-item ${isActive ? 'active' : ''}`}
                style={({ isActive }) => ({
                  padding: '6px 15px',
                  fontSize: '0.86rem',
                  fontWeight: 500,
                  color: isActive ? 'var(--accent-blue)' : 'var(--text-secondary)',
                  background: isActive ? '#ffffff' : 'transparent',
                  borderRadius: 'var(--radius-full)',
                  boxShadow: isActive ? '0 1px 3px rgba(15, 23, 42, 0.06)' : 'none',
                  transition: 'all var(--transition-fast)',
                })}
              >
                {link.name}
              </NavLink>
            );
          })}
        </nav>

        {/* 3. RIGHT ACTIONS (Join Codex CTA + Mobile Toggle) */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Link
            to={navData.action.href}
            className="btn btn-primary btn-sm header-action-btn"
            style={{
              borderRadius: 'var(--radius-full)',
              padding: '8px 18px',
              fontSize: '0.84rem',
            }}
          >
            <span>{navData.action.label}</span>
            <ArrowUpRight size={15} />
          </Link>

          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            aria-label="Toggle navigation menu"
            className="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{
              display: 'none',
              padding: '8px',
              borderRadius: 'var(--radius-md)',
              background: 'rgba(241, 245, 249, 0.9)',
              border: '1px solid rgba(15, 23, 42, 0.1)',
              color: 'var(--text-primary)',
              cursor: 'pointer',
              transition: 'background var(--transition-fast)',
            }}
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* MOBILE DRAWER ACCORDION */}
      {mobileMenuOpen && (
        <div
          className="mobile-drawer animate-fade-in"
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            background: 'rgba(255, 255, 255, 0.98)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            borderBottom: '1px solid rgba(15, 23, 42, 0.08)',
            padding: '20px 24px 24px',
            boxShadow: '0 16px 36px rgba(15, 23, 42, 0.08)',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
          }}
        >
          {navData.links.map((link) => (
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
                background: 'rgba(241, 245, 249, 0.6)',
                border: '1px solid rgba(15, 23, 42, 0.06)',
                color: 'var(--text-primary)',
                fontSize: '0.95rem',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <span>{link.name}</span>
              <ArrowUpRight size={16} color="var(--accent-blue)" />
            </Link>
          ))}
          <Link
            to={navData.action.href}
            className="btn btn-primary"
            style={{ marginTop: '8px', width: '100%' }}
            onClick={() => setMobileMenuOpen(false)}
          >
            <span>{navData.action.label}</span>
            <ArrowUpRight size={17} />
          </Link>
        </div>
      )}

      <style>{`
        /* Sleek CODEX Logo */
        .header-logo-codex {
          height: 32px;
          width: auto;
          object-fit: contain;
          transition: transform 0.25s ease;
        }

        .header-brand:hover .header-logo-badge {
          transform: translateY(-1px);
          box-shadow: 0 4px 16px rgba(15, 23, 42, 0.2);
        }

        .nav-pill-item:hover {
          color: var(--accent-blue) !important;
          background: rgba(255, 255, 255, 0.6) !important;
        }

        .nav-pill-item.active {
          color: var(--accent-blue) !important;
          background: #ffffff !important;
          box-shadow: 0 1px 3px rgba(15, 23, 42, 0.06);
        }

        /* Responsive Breakpoints */
        @media (max-width: 991px) {
          .desktop-nav-pill {
            display: none !important;
          }
          .mobile-menu-toggle {
            display: flex !important;
          }
          .header-action-btn {
            display: none !important;
          }
          .header-logo-codex {
            height: 28px;
          }
        }

        @media (max-width: 480px) {
          .header-logo-codex {
            height: 26px;
          }
        }
      `}</style>
    </header>
  );
}
