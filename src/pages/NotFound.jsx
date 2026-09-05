import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft, Terminal, AlertTriangle } from 'lucide-react';
import siteConfig from '../data/siteConfig.json';

export default function NotFound() {
  return (
    <div
      style={{
        minHeight: '85vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '120px 24px 80px 24px',
      }}
    >
      <div
        className="glass-panel"
        style={{
          maxWidth: '560px',
          width: '100%',
          padding: '56px 40px',
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          borderRadius: 'var(--radius-xl)',
        }}
      >
        <div
          style={{
            width: '72px',
            height: '72px',
            borderRadius: '50%',
            background: 'rgba(56, 189, 248, 0.1)',
            border: '1px solid var(--accent-blue-border)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--accent-blue)',
            marginBottom: '24px',
          }}
        >
          <Terminal size={36} />
        </div>

        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '1rem',
            color: 'var(--accent-blue)',
            letterSpacing: '0.15em',
            marginBottom: '10px',
            textTransform: 'uppercase',
          }}
        >
          HTTP ERROR 404
        </span>

        <h1
          style={{
            fontSize: 'clamp(2rem, 4vw, 2.8rem)',
            fontWeight: 800,
            color: 'var(--text-primary)',
            marginBottom: '16px',
            lineHeight: 1.15,
          }}
        >
          Node Not Found
        </h1>

        <p
          style={{
            fontSize: '1rem',
            color: 'var(--text-secondary)',
            lineHeight: 1.6,
            maxWidth: '440px',
            marginBottom: '36px',
          }}
        >
          The resource or sub-route you requested is not connected to the {siteConfig.codingClub.name} network matrix. It may have been archived or relocated.
        </p>

        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap', justifyContent: 'center' }}>
          <Link to="/" className="btn btn-primary">
            <Home size={16} />
            <span>Return to Matrix (Home)</span>
          </Link>
          <Link to="/projects" className="btn btn-secondary">
            <ArrowLeft size={16} />
            <span>Explore Projects</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
