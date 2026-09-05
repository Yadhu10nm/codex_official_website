import React from 'react';
import { Cpu, Users, Globe, Sparkles, Target, Compass, CheckCircle2 } from 'lucide-react';
import aboutData from '../data/about.json';
import GlassCard from '../components/GlassCard';
import AboutScene from '../three/AboutScene';

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

        {/* MAIN ABOUT GRID: Left Content, Right 3D Laptop */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1.1fr 0.9fr',
            gap: '48px',
            alignItems: 'center',
            marginBottom: '64px',
          }}
          className="about-grid"
        >
          {/* LEFT: Core Narrative & Mission/Vision */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <p style={{ fontSize: '1.1rem', color: 'var(--text-primary)', lineHeight: 1.7 }}>
              {aboutData.description}
            </p>

            <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
              {aboutData.extendedDescription}
            </p>

            {/* Vision & Mission Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px', marginTop: '8px' }}>
              <div
                className="glass-panel"
                style={{
                  padding: '20px',
                  background: 'rgba(15, 23, 42, 0.4)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                  <Target size={18} color="var(--accent-blue)" />
                  <h4 style={{ fontSize: '1rem', color: 'var(--text-primary)' }}>Our Vision</h4>
                </div>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  {aboutData.vision}
                </p>
              </div>

              <div
                className="glass-panel"
                style={{
                  padding: '20px',
                  background: 'rgba(15, 23, 42, 0.4)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                  <Compass size={18} color="var(--accent-indigo)" />
                  <h4 style={{ fontSize: '1rem', color: 'var(--text-primary)' }}>Our Mission</h4>
                </div>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  {aboutData.mission}
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT: INTERACTIVE 3D LAPTOP & TERMINAL SCENE */}
          <div
            className="glass-panel"
            style={{
              height: '460px',
              padding: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'radial-gradient(circle at center, rgba(30, 41, 59, 0.3) 0%, rgba(9, 13, 22, 0.7) 100%)',
            }}
          >
            <AboutScene />
          </div>
        </div>

        {/* PILLARS GRID */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
          {aboutData.pillars.map((pillar, idx) => {
            const IconComponent = ICON_MAP[pillar.icon] || Sparkles;
            return (
              <GlassCard key={idx} tilt style={{ padding: '24px' }}>
                <div
                  style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '10px',
                    background: 'rgba(56, 189, 248, 0.1)',
                    border: '1px solid var(--accent-blue-border)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--accent-blue)',
                    marginBottom: '16px',
                  }}
                >
                  <IconComponent size={20} />
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
        @media (max-width: 1024px) {
          .about-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
