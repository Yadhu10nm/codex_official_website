import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowUpRight, Terminal, Rocket } from 'lucide-react';
import siteConfig from '../data/siteConfig.json';

export default function CallToAction() {
  return (
    <section className="section" style={{ position: 'relative', overflow: 'hidden' }}>
      <div className="container">
        <div
          className="glass-panel"
          style={{
            padding: '64px 48px',
            textAlign: 'center',
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(240, 249, 255, 0.9) 100%)',
            border: '1px solid rgba(15, 23, 42, 0.08)',
            boxShadow: '0 12px 40px -6px rgba(15, 23, 42, 0.06), inset 0 1px 0 rgba(255, 255, 255, 0.95)',
            position: 'relative',
          }}
        >
          {/* Subtle Ambient Background Light */}
          <div
            style={{
              position: 'absolute',
              top: '-100px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '400px',
              height: '200px',
              background: 'radial-gradient(circle, rgba(2, 132, 199, 0.12) 0%, transparent 70%)',
              pointerEvents: 'none',
            }}
          />

          <div className="section-badge" style={{ marginBottom: '20px' }}>
            <Rocket size={14} />
            <span>JOIN THE CODEX COMMUNITY</span>
          </div>

          <h2
            style={{
              fontSize: 'clamp(2rem, 3.5vw + 0.5rem, 3rem)',
              fontWeight: 800,
              marginBottom: '18px',
              color: 'var(--text-primary)',
            }}
          >
            Ready to Build the Future of Software?
          </h2>

          <p
            style={{
              fontSize: '1.15rem',
              color: 'var(--text-secondary)',
              maxWidth: '640px',
              margin: '0 auto 36px auto',
              lineHeight: 1.65,
            }}
          >
            Whether you are writing your first algorithm or deploying distributed cloud architectures, CODEX is the launchpad for your technical ambitions.
          </p>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
            <Link to="/contact" className="btn btn-primary btn-lg">
              <span>Join CODEX Club</span>
              <ArrowUpRight size={18} />
            </Link>
            <Link to="/projects" className="btn btn-secondary btn-lg">
              <span>View Open Source Work</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
