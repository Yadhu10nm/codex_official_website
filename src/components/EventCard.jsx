import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, ArrowUpRight, Clock, Sparkles } from 'lucide-react';
import GlassCard from './GlassCard';
import ProjectMedia from './ProjectMedia';

export default function EventCard({ event }) {
  if (!event) return null;

  const isUpcoming = event.status === 'upcoming';

  return (
    <GlassCard
      tilt
      className="event-card"
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        padding: '20px',
      }}
    >
      {/* 1. MEDIA CONTAINER */}
      <div style={{ position: 'relative', marginBottom: '18px' }}>
        <ProjectMedia
          image={event.image}
          video={event.video}
          title={event.title}
          category={event.category}
          aspectRatio="16/9"
          autoplayVideo={false}
        />
        {/* Status Badge */}
        <div
          style={{
            position: 'absolute',
            top: '12px',
            right: '12px',
            zIndex: 2,
            padding: '4px 10px',
            borderRadius: 'var(--radius-full)',
            background: isUpcoming
              ? 'rgba(16, 185, 129, 0.2)'
              : 'rgba(15, 23, 42, 0.7)',
            border: isUpcoming
              ? '1px solid rgba(16, 185, 129, 0.4)'
              : '1px solid var(--glass-border-subtle)',
            color: isUpcoming ? '#34d399' : 'var(--text-secondary)',
            fontSize: '0.75rem',
            fontWeight: 600,
            backdropFilter: 'var(--glass-blur-sm)',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
          }}
        >
          {event.status || 'Event'}
        </div>
      </div>

      {/* 2. DATE & CATEGORY ROW */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          marginBottom: '12px',
          fontSize: '0.82rem',
          color: 'var(--text-secondary)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Calendar size={14} color="var(--accent-blue)" />
          <span>{event.date}</span>
        </div>
        <span>•</span>
        <span className="glass-pill" style={{ fontSize: '0.75rem', padding: '2px 8px' }}>
          {event.category}
        </span>
      </div>

      {/* 3. EVENT TITLE */}
      <h3
        style={{
          fontSize: '1.2rem',
          fontWeight: 700,
          color: 'var(--text-primary)',
          marginBottom: '10px',
          lineHeight: 1.3,
        }}
      >
        <Link
          to={`/events/${event.id}`}
          style={{ color: 'inherit' }}
          onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent-blue)')}
          onMouseLeave={(e) => (e.currentTarget.style.color = 'inherit')}
        >
          {event.title}
        </Link>
      </h3>

      {/* 4. DESCRIPTION */}
      <p
        style={{
          fontSize: '0.9rem',
          color: 'var(--text-secondary)',
          lineHeight: 1.55,
          marginBottom: '20px',
          flexGrow: 1,
          display: '-webkit-box',
          WebkitLineClamp: 3,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
        }}
      >
        {event.description}
      </p>

      {/* 5. LOCATION & VIEW BUTTON ROW */}
      <div
        style={{
          borderTop: '1px solid var(--glass-border-subtle)',
          paddingTop: '14px',
          marginTop: 'auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '10px',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '0.8rem',
            color: 'var(--text-muted)',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            maxWidth: '65%',
          }}
        >
          <MapPin size={14} color="var(--accent-blue)" style={{ flexShrink: 0 }} />
          <span style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {event.location || event.mode || 'Main Campus'}
          </span>
        </div>

        <Link
          to={`/events/${event.id}`}
          className="btn btn-secondary btn-sm"
          style={{ padding: '6px 12px', fontSize: '0.8rem' }}
        >
          <span>View</span>
          <ArrowUpRight size={14} />
        </Link>
      </div>
    </GlassCard>
  );
}
