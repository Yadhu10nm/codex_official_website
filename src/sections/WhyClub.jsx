import React from 'react';
import {
  GraduationCap,
  Code2,
  Users2,
  Trophy,
  Compass,
  TrendingUp,
  Sparkles,
  CheckCircle2,
} from 'lucide-react';
import whyClubData from '../data/whyClub.json';
import GlassCard from '../components/GlassCard';

const ICON_MAP = {
  GraduationCap: GraduationCap,
  Code2: Code2,
  Users2: Users2,
  Trophy: Trophy,
  Compass: Compass,
  TrendingUp: TrendingUp,
};

export default function WhyClub() {
  return (
    <section className="section" style={{ position: 'relative' }}>
      <div className="container">
        {/* SECTION HEADER */}
        <div className="section-header">
          <div className="section-badge">
            <Sparkles size={14} />
            <span>{whyClubData.tag}</span>
          </div>
          <h2 className="section-title">{whyClubData.title}</h2>
          <p className="section-subtitle">{whyClubData.subtitle}</p>
        </div>

        {/* DYNAMIC CARDS GRID */}
        <div className="grid-3">
          {whyClubData.cards.map((card) => {
            const IconComponent = ICON_MAP[card.icon] || Code2;

            return (
              <GlassCard
                key={card.id}
                tilt
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  padding: '28px',
                }}
              >
                {/* ICON & TAGLINE */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '20px',
                  }}
                >
                  <div
                    style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: '12px',
                      background: 'rgba(56, 189, 248, 0.08)',
                      border: '1px solid var(--accent-blue-border)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--accent-blue)',
                    }}
                  >
                    <IconComponent size={24} />
                  </div>
                  <span className="glass-pill" style={{ fontSize: '0.75rem' }}>
                    {card.tagline}
                  </span>
                </div>

                {/* TITLE */}
                <h3
                  style={{
                    fontSize: '1.3rem',
                    fontWeight: 700,
                    color: 'var(--text-primary)',
                    marginBottom: '10px',
                  }}
                >
                  {card.title}
                </h3>

                {/* DESCRIPTION */}
                <p
                  style={{
                    fontSize: '0.92rem',
                    color: 'var(--text-secondary)',
                    lineHeight: 1.6,
                    marginBottom: '20px',
                    flexGrow: 1,
                  }}
                >
                  {card.description}
                </p>

                {/* HIGHLIGHTS */}
                {card.highlights && card.highlights.length > 0 && (
                  <div
                    style={{
                      borderTop: '1px solid var(--glass-border-subtle)',
                      paddingTop: '16px',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '8px',
                    }}
                  >
                    {card.highlights.map((h, i) => (
                      <div
                        key={i}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                          fontSize: '0.82rem',
                          color: 'var(--text-muted)',
                        }}
                      >
                        <CheckCircle2 size={13} color="var(--accent-blue)" style={{ flexShrink: 0 }} />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                )}
              </GlassCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}
