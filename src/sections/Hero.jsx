import React from 'react';
import { Link } from 'react-router-dom';
import { Code2, Calendar, ArrowUpRight } from 'lucide-react';
import heroData from '../data/hero.json';

export default function Hero() {
  return (
    <section
      className="hero-section"
      style={{
        position: 'relative',
        minHeight: '92vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        paddingTop: '130px',
        paddingBottom: '70px',
        overflow: 'hidden',
      }}
    >
      <div className="container" style={{ position: 'relative', zIndex: 2, maxWidth: '980px' }}>
        {/* 1. AIRY WATER TELEMETRY STATUS PILL */}
        <div style={{ display: 'inline-flex', justifyContent: 'center', marginBottom: '24px' }}>
          <div
            className="water-telemetry-pill"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              padding: '6px 18px',
              borderRadius: 'var(--radius-full)',
              background: 'rgba(255, 255, 255, 0.94)',
              border: '1px solid rgba(2, 132, 199, 0.22)',
              backdropFilter: 'blur(14px)',
              WebkitBackdropFilter: 'blur(14px)',
              boxShadow: '0 2px 12px rgba(15, 23, 42, 0.04), inset 0 1px 0 rgba(255, 255, 255, 0.95)',
            }}
          >
            <div
              style={{
                width: '7px',
                height: '7px',
                borderRadius: '50%',
                background: 'var(--accent-blue)',
                boxShadow: '0 0 8px rgba(2, 132, 199, 0.6)',
                animation: 'pulse 2s infinite',
              }}
            />
            <span
              style={{
                fontSize: '0.78rem',
                fontFamily: 'var(--font-mono)',
                fontWeight: 600,
                color: 'var(--accent-blue-hover)',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
              }}
            >
              CODEX KERNEL • LIVE NODE
            </span>
          </div>
        </div>

        {/* 2. MAIN HEADING */}
        <h1
          style={{
            fontSize: 'clamp(2.8rem, 6vw + 0.5rem, 5.2rem)',
            fontWeight: 800,
            letterSpacing: '-0.04em',
            lineHeight: 1.06,
            marginBottom: '24px',
          }}
        >
          <span style={{ color: 'var(--text-primary)', display: 'block' }}>
            {heroData.heading.primary}
          </span>
          <span
            style={{
              color: 'transparent',
              backgroundImage: 'linear-gradient(135deg, #0284c7 0%, #0369a1 40%, #0f172a 90%)',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              display: 'block',
            }}
          >
            {heroData.heading.highlight}
          </span>
        </h1>

        {/* 3. SUPPORTING DESCRIPTION */}
        <p
          style={{
            fontSize: 'clamp(1.05rem, 1.6vw + 0.2rem, 1.22rem)',
            color: 'var(--text-secondary)',
            lineHeight: 1.65,
            marginBottom: '40px',
            maxWidth: '680px',
            marginLeft: 'auto',
            marginRight: 'auto',
          }}
        >
          {heroData.description}
        </p>

        {/* 4. CTA BUTTONS */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '16px',
            flexWrap: 'wrap',
            marginBottom: '56px',
          }}
        >
          <Link
            to="/projects"
            className="btn btn-primary btn-lg"
            style={{
              padding: '13px 30px',
              fontSize: '0.96rem',
            }}
          >
            <Code2 size={18} />
            <span>Explore Projects</span>
            <ArrowUpRight size={18} />
          </Link>
          <Link
            to="/events"
            className="btn btn-secondary btn-lg"
            style={{
              padding: '13px 28px',
              fontSize: '0.96rem',
            }}
          >
            <Calendar size={18} />
            <span>Explore Events</span>
          </Link>
        </div>

        {/* 5. PANORAMIC WHITE FLOATING STATS STRIP */}
        <div
          className="water-stats-panel"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '20px',
            padding: '24px 32px',
            borderRadius: 'var(--radius-xl)',
            background: 'rgba(255, 255, 255, 0.94)',
            border: '1px solid rgba(15, 23, 42, 0.08)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            boxShadow: '0 8px 30px -4px rgba(15, 23, 42, 0.05), inset 0 1px 0 rgba(255, 255, 255, 0.95)',
            maxWidth: '820px',
            marginLeft: 'auto',
            marginRight: 'auto',
          }}
        >
          {heroData.stats.map((stat, idx) => (
            <div
              key={idx}
              className="stat-box"
              style={{
                textAlign: 'center',
                padding: '8px 12px',
                transition: 'transform var(--transition-fast)',
              }}
            >
              <div
                style={{
                  fontSize: 'clamp(1.6rem, 2.5vw, 2.1rem)',
                  fontWeight: 800,
                  color: 'var(--text-primary)',
                  fontFamily: 'var(--font-mono)',
                  lineHeight: 1.1,
                  marginBottom: '4px',
                }}
              >
                {stat.value}
              </div>
              <div
                style={{
                  fontSize: '0.74rem',
                  color: 'var(--text-muted)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                  fontWeight: 600,
                }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .hero-section {
          padding-top: 130px;
          padding-bottom: 70px;
        }

        .stat-box:hover {
          transform: translateY(-2px);
        }

        @media (max-width: 768px) {
          .hero-section {
            padding-top: 104px !important;
            padding-bottom: 50px !important;
          }
          .water-stats-panel {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 16px !important;
            padding: 20px !important;
          }
        }
      `}</style>
    </section>
  );
}
