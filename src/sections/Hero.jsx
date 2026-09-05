import React from 'react';
import { Link } from 'react-router-dom';
import { Code2, Calendar, ArrowUpRight, Sparkles, Terminal } from 'lucide-react';
import heroData from '../data/hero.json';
import siteConfig from '../data/siteConfig.json';
import HeroScene from '../three/HeroScene';

export default function Hero() {
  return (
    <section
      style={{
        position: 'relative',
        minHeight: '100vh',
        paddingTop: '160px',
        paddingBottom: '80px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      <div className="container-wide" style={{ position: 'relative', zIndex: 2 }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1.1fr 0.9fr',
            gap: '40px',
            alignItems: 'center',
          }}
          className="hero-grid"
        >
          {/* LEFT: HERO CONTENT */}
          <div style={{ maxWidth: '680px' }}>
            {/* Center / Top Coding Club Logo & Badge */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
              <div
                style={{
                  padding: '6px 14px',
                  borderRadius: 'var(--radius-full)',
                  background: 'var(--glass-bg-subtle)',
                  border: '1px solid var(--glass-border-medium)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                }}
              >
                <img
                  src={siteConfig.codingClub.logo}
                  alt={siteConfig.codingClub.name}
                  style={{ height: '22px', width: 'auto' }}
                />
                <span
                  style={{
                    fontSize: '0.78rem',
                    fontFamily: 'var(--font-mono)',
                    color: 'var(--accent-blue)',
                    letterSpacing: '0.08em',
                  }}
                >
                  {heroData.badge}
                </span>
              </div>
            </div>

            {/* MAIN HEADING: CODE. CREATE. INNOVATE. */}
            <h1
              style={{
                fontSize: 'clamp(2.8rem, 5.5vw, 4.4rem)',
                fontWeight: 800,
                letterSpacing: '-0.03em',
                lineHeight: 1.08,
                marginBottom: '22px',
              }}
            >
              <span style={{ color: 'var(--text-primary)', display: 'block' }}>
                {heroData.heading.primary}
              </span>
              <span
                style={{
                  color: 'transparent',
                  backgroundImage: 'linear-gradient(90deg, #38bdf8 0%, #818cf8 50%, #ffffff 100%)',
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  display: 'block',
                }}
              >
                {heroData.heading.highlight}
              </span>
            </h1>

            {/* SUPPORTING DESCRIPTION */}
            <p
              style={{
                fontSize: '1.15rem',
                color: 'var(--text-secondary)',
                lineHeight: 1.65,
                marginBottom: '36px',
                maxWidth: '580px',
              }}
            >
              {heroData.description}
            </p>

            {/* CTA BUTTONS: Explore Projects & Explore Events */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                flexWrap: 'wrap',
                marginBottom: '48px',
              }}
            >
              <Link to="/projects" className="btn btn-primary btn-lg">
                <Code2 size={18} />
                <span>Explore Projects</span>
                <ArrowUpRight size={18} />
              </Link>
              <Link to="/events" className="btn btn-secondary btn-lg">
                <Calendar size={18} />
                <span>Explore Events</span>
              </Link>
            </div>

            {/* STATS STRIP */}
            <div
              className="glass-panel"
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: '16px',
                padding: '20px 24px',
                background: 'rgba(15, 23, 42, 0.45)',
              }}
            >
              {heroData.stats.map((stat, idx) => (
                <div key={idx} style={{ textAlign: 'left' }}>
                  <div
                    style={{
                      fontSize: '1.4rem',
                      fontWeight: 800,
                      color: 'var(--text-primary)',
                      fontFamily: 'var(--font-mono)',
                      lineHeight: 1.1,
                      marginBottom: '4px',
                    }}
                  >
                    {stat.value}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT: INTERACTIVE THREE.JS SCENE */}
          <div
            style={{
              position: 'relative',
              width: '100%',
              height: '520px',
              borderRadius: 'var(--radius-xl)',
              overflow: 'hidden',
            }}
            className="hero-three-wrapper"
          >
            <HeroScene />

            {/* Tech Telemetry Overlay Card */}
            <div
              style={{
                position: 'absolute',
                bottom: '20px',
                left: '20px',
                padding: '10px 16px',
                borderRadius: 'var(--radius-md)',
                background: 'rgba(10, 15, 26, 0.8)',
                border: '1px solid var(--glass-border-subtle)',
                backdropFilter: 'var(--glass-blur-sm)',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                pointerEvents: 'none',
              }}
            >
              <div
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: '#38bdf8',
                  boxShadow: '0 0 8px #38bdf8',
                }}
              />
              <span style={{ fontSize: '0.78rem', fontFamily: 'var(--font-mono)', color: 'var(--text-secondary)' }}>
                3D SPATIAL KERNEL • ACTIVE
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Responsive adjustments for Hero */}
      <style>{`
        @media (max-width: 1024px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
          .hero-three-wrapper {
            height: 380px !important;
          }
        }
      `}</style>
    </section>
  );
}
