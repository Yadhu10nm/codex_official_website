import React from 'react';

export default function SceneFallback() {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        minHeight: '320px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'radial-gradient(circle at center, rgba(30, 41, 59, 0.4) 0%, rgba(9, 13, 22, 0.2) 70%)',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--glass-border-subtle)',
        color: 'var(--text-secondary)'
      }}
    >
      <div
        style={{
          width: '36px',
          height: '36px',
          borderRadius: '50%',
          border: '2px solid rgba(56, 189, 248, 0.2)',
          borderTopColor: '#38bdf8',
          animation: 'spinSlow 1.5s linear infinite',
          marginBottom: '14px'
        }}
      />
      <span style={{ fontSize: '0.85rem', fontFamily: 'var(--font-mono)', letterSpacing: '0.05em' }}>
        INITIALIZING 3D ENGINE...
      </span>
    </div>
  );
}
