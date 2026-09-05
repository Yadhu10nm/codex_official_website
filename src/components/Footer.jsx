import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, MapPin, Mail, Clock, Terminal } from 'lucide-react';
import siteConfig from '../data/siteConfig.json';
import navData from '../data/navigation.json';
import socialsData from '../data/socials.json';
import SocialLinks from './SocialLinks';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      style={{
        background: 'linear-gradient(180deg, var(--bg-secondary) 0%, var(--bg-primary) 100%)',
        borderTop: '1px solid var(--glass-border-medium)',
        paddingTop: '80px',
        paddingBottom: '40px',
        position: 'relative',
        zIndex: 10,
      }}
    >
      <div className="container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '48px',
            marginBottom: '64px',
          }}
        >
          {/* COLUMN 1: Club Brand & Mission */}
          <div style={{ maxWidth: '340px' }}>
            <Link to="/" style={{ display: 'inline-block', marginBottom: '20px' }}>
              <img
                src={siteConfig.codingClub.logo}
                alt={siteConfig.codingClub.name}
                style={{ height: '40px', width: 'auto' }}
              />
            </Link>
            <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', marginBottom: '24px' }}>
              {siteConfig.codingClub.subTagline}
            </p>
            <SocialLinks socials={socialsData.socials} size={18} />
          </div>

          {/* COLUMN 2: Fast Navigation */}
          <div>
            <h4
              style={{
                fontSize: '0.9rem',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: 'var(--text-primary)',
                marginBottom: '20px',
              }}
            >
              Navigation
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {navData.links.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    style={{
                      color: 'var(--text-secondary)',
                      fontSize: '0.95rem',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text-primary)')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
                  >
                    <span>{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* COLUMN 3: Department & Affiliation */}
          <div>
            <h4
              style={{
                fontSize: '0.9rem',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: 'var(--text-primary)',
                marginBottom: '20px',
              }}
            >
              Academic Affiliation
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
              <div>
                <strong style={{ color: 'var(--text-primary)', display: 'block', marginBottom: '2px' }}>
                  {siteConfig.college.name}
                </strong>
                <span>{siteConfig.college.department}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                <MapPin size={16} color="var(--accent-blue)" style={{ flexShrink: 0, marginTop: '3px' }} />
                <span>{siteConfig.contact.labLocation}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Mail size={16} color="var(--accent-blue)" style={{ flexShrink: 0 }} />
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  style={{ color: 'var(--text-secondary)' }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent-blue)')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
                >
                  {siteConfig.contact.email}
                </a>
              </div>
            </div>
          </div>

          {/* COLUMN 4: Innovation Lab Hours */}
          <div>
            <h4
              style={{
                fontSize: '0.9rem',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: 'var(--text-primary)',
                marginBottom: '20px',
              }}
            >
              Innovation Sessions
            </h4>
            <div
              className="glass-panel"
              style={{
                padding: '16px',
                background: 'rgba(15, 23, 42, 0.4)',
                borderRadius: 'var(--radius-md)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', marginBottom: '8px' }}>
                <Clock size={16} color="var(--accent-indigo)" style={{ flexShrink: 0, marginTop: '2px' }} />
                <span style={{ fontSize: '0.85rem', color: 'var(--text-primary)', fontWeight: 600 }}>
                  {siteConfig.contact.meetingSchedule}
                </span>
              </div>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                Open hacking hours &amp; peer code review sessions for all verified student members.
              </p>
            </div>
          </div>
        </div>

        {/* BOTTOM SUB-FOOTER */}
        <div
          style={{
            borderTop: '1px solid var(--glass-border-subtle)',
            paddingTop: '28px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '16px',
            fontSize: '0.85rem',
            color: 'var(--text-muted)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Terminal size={14} color="var(--accent-blue)" />
            <span>
              &copy; {currentYear} {siteConfig.codingClub.fullName}. All rights reserved.
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <span>Built with React + Vite + Three.js</span>
            <span style={{ color: 'var(--accent-blue)' }}>● Active Community Node</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
