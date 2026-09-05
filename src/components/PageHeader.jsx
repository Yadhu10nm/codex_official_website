import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

export default function PageHeader({
  badge,
  title,
  subtitle,
  breadcrumbs = [{ name: 'Home', path: '/' }],
}) {
  return (
    <div
      style={{
        paddingTop: '160px',
        paddingBottom: '50px',
        position: 'relative',
        borderBottom: '1px solid var(--glass-border-subtle)',
        background: 'linear-gradient(180deg, rgba(14, 20, 34, 0.4) 0%, rgba(5, 7, 11, 0) 100%)',
      }}
    >
      <div className="container">
        {/* BREADCRUMBS */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '0.82rem',
            color: 'var(--text-muted)',
            marginBottom: '20px',
          }}
        >
          <Link
            to="/"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              color: 'var(--text-secondary)',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text-primary)')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
          >
            <Home size={13} />
            <span>Home</span>
          </Link>

          {breadcrumbs.map((crumb, idx) => (
            <React.Fragment key={idx}>
              <ChevronRight size={13} color="var(--text-dim)" />
              {crumb.path ? (
                <Link
                  to={crumb.path}
                  style={{ color: 'var(--text-secondary)' }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text-primary)')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
                >
                  {crumb.name}
                </Link>
              ) : (
                <span style={{ color: 'var(--accent-blue)' }}>{crumb.name}</span>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* BADGE */}
        {badge && (
          <div className="section-badge" style={{ marginBottom: '14px' }}>
            <span>{badge}</span>
          </div>
        )}

        {/* TITLE */}
        <h1
          style={{
            fontSize: 'clamp(2.2rem, 4vw + 1rem, 3.4rem)',
            fontWeight: 800,
            marginBottom: '16px',
            lineHeight: 1.15,
          }}
        >
          {title}
        </h1>

        {/* SUBTITLE */}
        {subtitle && (
          <p
            style={{
              fontSize: '1.15rem',
              color: 'var(--text-secondary)',
              maxWidth: '780px',
              lineHeight: 1.6,
            }}
          >
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
}
