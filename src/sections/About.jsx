import React from 'react';
import { Cpu, Users, Globe, Sparkles, Target, Compass, CheckCircle2, Zap, Award } from 'lucide-react';
import aboutData from '../data/about.json';
import GlassCard from '../components/GlassCard';

const ICON_MAP = {
  Cpu: Cpu,
  Users: Users,
  Globe: Globe,
  Sparkles: Sparkles,
};

export default function About() {
  return (
    <section id="about" className="section" style={{ position: 'relative' }}>
      <div className="container">
        {/* SECTION HEADER */}
        <div className="section-header text-left" style={{ marginBottom: '48px' }}>
          <div className="section-badge">
            <Sparkles size={14} />
            <span>{aboutData.tag}</span>
          </div>
          <h2 className="section-title">{aboutData.title}</h2>
          <p className="section-subtitle">{aboutData.subtitle}</p>
        </div>

        {/* MAIN ABOUT BENTO GRID: 2 Columns of Liquid Glass Panels */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1.15fr 0.85fr',
            gap: '28px',
            alignItems: 'stretch',
            marginBottom: '48px',
          }}
          className="about-grid"
        >
          {/* LEFT: Core Narrative Liquid Card */}
          <GlassCard
            tilt
            style={{
              padding: '36px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              gap: '20px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Zap size={20} color="var(--accent-blue)" />
              <span style={{ fontSize: '0.82rem', fontFamily: 'var(--font-mono)', color: 'var(--accent-blue)', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                Engineering Philosophy
              </span>
            </div>

            <p style={{ fontSize: '1.12rem', color: 'var(--text-primary)', lineHeight: 1.7, fontWeight: 500 }}>
              {aboutData.description}
            </p>

            <p style={{ fontSize: '0.96rem', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
              {aboutData.extendedDescription}
            </p>

            <div style={{ display: 'flex', alignItems: 'center', gap: '24px', paddingTop: '12px', borderTop: '1px solid var(--glass-border-subtle)' }}>
              <div>
                <span style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-primary)', fontFamily: 'var(--font-mono)', display: 'block' }}>
                  100%
                </span>
                <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Hands-On Hacking</span>
              </div>
              <div>
                <span style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--accent-blue)', fontFamily: 'var(--font-mono)', display: 'block' }}>
                  Zero
                </span>
                <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Entry Barriers</span>
              </div>
              <div>
                <span style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--accent-violet)', fontFamily: 'var(--font-mono)', display: 'block' }}>
                  Global
                </span>
                <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Standards</span>
              </div>
            </div>
          </GlassCard>

          {/* RIGHT: Vision & Mission Liquid Stack */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <GlassCard
              tilt
              style={{
                padding: '28px',
                flexGrow: 1,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                <div
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '10px',
                    background: 'rgba(2, 132, 199, 0.08)',
                    border: '1px solid var(--accent-blue-border)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--accent-blue)',
                  }}
                >
                  <Target size={18} />
                </div>
                <h4 style={{ fontSize: '1.1rem', color: 'var(--text-primary)' }}>Our Vision</h4>
              </div>
              <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                {aboutData.vision}
              </p>
            </GlassCard>

            <GlassCard
              tilt
              style={{
                padding: '28px',
                flexGrow: 1,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                <div
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '10px',
                    background: 'rgba(79, 70, 229, 0.07)',
                    border: '1px solid rgba(79, 70, 229, 0.18)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--accent-indigo)',
                  }}
                >
                  <Compass size={18} />
                </div>
                <h4 style={{ fontSize: '1.1rem', color: 'var(--text-primary)' }}>Our Mission</h4>
              </div>
              <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                {aboutData.mission}
              </p>
            </GlassCard>
          </div>
        </div>

        {/* PILLARS GRID */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
          {aboutData.pillars.map((pillar, idx) => {
            const IconComponent = ICON_MAP[pillar.icon] || Sparkles;
            return (
              <GlassCard key={idx} tilt style={{ padding: '26px' }}>
                <div
                  style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '12px',
                    background: 'rgba(2, 132, 199, 0.08)',
                    border: '1px solid var(--accent-blue-border)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--accent-blue)',
                    marginBottom: '16px',
                  }}
                >
                  <IconComponent size={22} />
                </div>
                <h4 style={{ fontSize: '1.05rem', color: 'var(--text-primary)', marginBottom: '8px' }}>
                  {pillar.title}
                </h4>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.55 }}>
                  {pillar.description}
                </p>
              </GlassCard>
            );
          })}
        </div>
      </div>

      <style>{`
        @media (max-width: 991px) {
          .about-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
