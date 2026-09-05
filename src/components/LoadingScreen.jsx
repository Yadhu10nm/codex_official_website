import React from 'react';
import siteConfig from '../data/siteConfig.json';

export default function LoadingScreen({ message = 'Loading experience...' }) {
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: 'var(--bg-primary)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
      }}
    >
      <div
        className="glass-panel"
        style={{
          padding: '48px 56px',
          borderRadius: 'var(--radius-xl)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          maxWidth: '420px',
        }}
      >
        {/* Subtle Pulse Ring */}
        <div style={{ position: 'relative', width: '64px', height: '64px', marginBottom: '24px' }}>
          <div
            style={{
              position: 'absolute',
              inset: 0,
              borderRadius: '50%',
              border: '2px solid rgba(56, 189, 248, 0.2)',
            }}
          />
          <div
            style={{
              position: 'absolute',
              inset: 0,
              borderRadius: '50%',
              border: '2px solid transparent',
              borderTopColor: '#38bdf8',
              animation: 'spinSlow 1.2s cubic-bezier(0.68, -0.55, 0.27, 1.55) infinite',
            }}
          />
          <div
            style={{
              position: 'absolute',
              inset: '16px',
              borderRadius: '50%',
              background: 'rgba(56, 189, 248, 0.1)',
              animation: 'pulseSubtle 2s ease-in-out infinite',
            }}
          />
        </div>

        {/* Brand Name from JSON */}
        <h2
          style={{
            fontSize: '1.4rem',
            fontWeight: 800,
            letterSpacing: '0.1em',
            color: 'var(--text-primary)',
            marginBottom: '6px',
          }}
        >
          {siteConfig.codingClub.name}
        </h2>
        <span
          style={{
            fontSize: '0.75rem',
            fontFamily: 'var(--font-mono)',
            letterSpacing: '0.15em',
            color: 'var(--accent-blue)',
            textTransform: 'uppercase',
            marginBottom: '18px',
          }}
        >
          {siteConfig.codingClub.fullName}
        </span>

        {/* Message */}
        <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
          {message}
        </p>
      </div>
    </div>
  );
}
