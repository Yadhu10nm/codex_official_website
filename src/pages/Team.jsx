import React from 'react';
import { Users, Sparkles, Award } from 'lucide-react';
import { GithubIcon, LinkedinIcon, InstagramIcon } from '../components/SocialIcons';
import teamData from '../data/team.json';
import PageHeader from '../components/PageHeader';
import GlassCard from '../components/GlassCard';

export default function Team() {
  return (
    <div style={{ minHeight: '100vh', paddingBottom: '120px' }}>
      {/* PAGE HEADER */}
      <PageHeader
        badge="CODEX ARCHITECTS"
        title={teamData.title}
        subtitle={teamData.subtitle}
        breadcrumbs={[{ name: 'Team', path: null }]}
      />

      <div className="container" style={{ marginTop: '48px' }}>
        {/* 1. FACULTY ADVISORY */}
        {teamData.faculty && teamData.faculty.length > 0 && (
          <div style={{ marginBottom: '64px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px' }}>
              <Award size={18} color="var(--accent-blue)" />
              <h3 style={{ fontSize: '1.25rem', color: 'var(--text-primary)' }}>
                Faculty Mentorship &amp; Advisory
              </h3>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
              {teamData.faculty.map((member, idx) => (
                <GlassCard key={idx} tilt style={{ padding: '32px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '20px' }}>
                    <img
                      src={member.avatar}
                      alt={member.name}
                      style={{ width: '64px', height: '64px', borderRadius: '18px' }}
                    />
                    <div>
                      <h4 style={{ fontSize: '1.2rem', color: 'var(--text-primary)', fontWeight: 700 }}>
                        {member.name}
                      </h4>
                      <p style={{ fontSize: '0.88rem', color: 'var(--accent-blue)', fontWeight: 500 }}>
                        {member.role}
                      </p>
                    </div>
                  </div>
                  <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '20px' }}>
                    {member.bio}
                  </p>
                  {member.linkedin && (
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="glass-pill"
                      style={{ padding: '6px 14px', fontSize: '0.82rem' }}
                    >
                      <LinkedinIcon size={14} color="var(--accent-blue)" />
                      <span>Connect on LinkedIn</span>
                    </a>
                  )}
                </GlassCard>
              ))}
            </div>
          </div>
        )}

        {/* 2. STUDENT LEADS GRID */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px' }}>
            <Users size={18} color="var(--accent-blue)" />
            <h3 style={{ fontSize: '1.25rem', color: 'var(--text-primary)' }}>
              Core Engineering Council
            </h3>
          </div>

          <div className="grid-3">
            {teamData.leads.map((lead) => {
              const hasGithub = Boolean(lead.github && lead.github.trim() !== '');
              const hasLinkedin = Boolean(lead.linkedin && lead.linkedin.trim() !== '');
              const hasInsta = Boolean(lead.instagram && lead.instagram.trim() !== '');

              return (
                <GlassCard
                  key={lead.id}
                  tilt
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    padding: '28px',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '18px' }}>
                    <img
                      src={lead.avatar}
                      alt={lead.name}
                      style={{ width: '56px', height: '56px', borderRadius: '16px' }}
                    />
                    <div>
                      <h4 style={{ fontSize: '1.15rem', color: 'var(--text-primary)', fontWeight: 700 }}>
                        {lead.name}
                      </h4>
                      <p style={{ fontSize: '0.85rem', color: 'var(--accent-blue)', fontWeight: 500 }}>
                        {lead.role}
                      </p>
                    </div>
                  </div>

                  <div style={{ marginBottom: '16px' }}>
                    <span className="glass-pill" style={{ fontSize: '0.75rem' }}>
                      {lead.domain}
                    </span>
                  </div>

                  <p
                    style={{
                      fontSize: '0.9rem',
                      color: 'var(--text-secondary)',
                      lineHeight: 1.6,
                      marginBottom: '24px',
                      flexGrow: 1,
                    }}
                  >
                    {lead.bio}
                  </p>

                  {/* Social Connects */}
                  <div
                    style={{
                      borderTop: '1px solid var(--glass-border-subtle)',
                      paddingTop: '16px',
                      marginTop: 'auto',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                    }}
                  >
                    {hasGithub && (
                      <a
                        href={lead.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${lead.name} GitHub`}
                        className="glass-pill"
                        style={{ padding: '6px 10px', fontSize: '0.78rem' }}
                      >
                        <GithubIcon size={13} />
                        <span>GitHub</span>
                      </a>
                    )}

                    {hasLinkedin && (
                      <a
                        href={lead.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${lead.name} LinkedIn`}
                        className="glass-pill"
                        style={{ padding: '6px 10px', fontSize: '0.78rem' }}
                      >
                        <LinkedinIcon size={13} color="var(--accent-blue)" />
                        <span>LinkedIn</span>
                      </a>
                    )}

                    {hasInsta && (
                      <a
                        href={lead.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${lead.name} Instagram`}
                        className="glass-pill"
                        style={{ padding: '6px 10px', fontSize: '0.78rem' }}
                      >
                        <InstagramIcon size={13} color="#f472b6" />
                        <span>IG</span>
                      </a>
                    )}
                  </div>
                </GlassCard>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
