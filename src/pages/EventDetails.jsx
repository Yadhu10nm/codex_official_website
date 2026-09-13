import React from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  ArrowLeft,
  Calendar,
  Clock,
  MapPin,
  ExternalLink,
  Users,
  CheckCircle2,
  Sparkles,
  AlertCircle,
  Trophy,
} from 'lucide-react';
import eventsData from '../data/events.json';
import PageHeader from '../components/PageHeader';
import ProjectMedia from '../components/ProjectMedia';
import GlassCard from '../components/GlassCard';

export default function EventDetails() {
  const { id } = useParams();

  const event = eventsData.find((e) => String(e.id) === String(id));

  // Clean Not Found
  if (!event) {
    return (
      <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 20px' }}>
        <div
          className="glass-panel"
          style={{
            maxWidth: '520px',
            padding: '48px',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <div
            style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              background: 'rgba(239, 68, 68, 0.1)',
              border: '1px solid rgba(239, 68, 68, 0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ef4444',
              marginBottom: '20px',
            }}
          >
            <AlertCircle size={32} />
          </div>
          <h2 style={{ fontSize: '1.6rem', marginBottom: '12px' }}>Event Not Found</h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '28px', fontSize: '0.95rem' }}>
            The event identifier <code style={{ color: 'var(--accent-blue)' }}>#{id}</code> does not match any scheduled or past session in our directory.
          </p>
          <Link to="/events" className="btn btn-primary">
            <ArrowLeft size={16} />
            <span>Browse All Events</span>
          </Link>
        </div>
      </div>
    );
  }

  const isUpcoming = event.status === 'upcoming';
  const hasRegistration = Boolean(event.registrationLink && event.registrationLink.trim() !== '');

  return (
    <div style={{ minHeight: '100vh', paddingBottom: '120px' }}>
      {/* PAGE HEADER */}
      <PageHeader
        badge={event.category ? `${event.category.toUpperCase()} EVENT` : 'COMMUNITY EVENT'}
        title={event.title}
        subtitle={event.description}
        breadcrumbs={[
          { name: 'Events', path: '/events' },
          { name: event.title, path: null },
        ]}
      />

      <div className="container" style={{ marginTop: '40px' }}>
        {/* TOP BAR */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '16px',
            marginBottom: '32px',
          }}
        >
          <Link
            to="/events"
            className="btn btn-secondary btn-sm"
            style={{ padding: '8px 18px' }}
          >
            <ArrowLeft size={16} />
            <span>Back to Events</span>
          </Link>

          {hasRegistration && isUpcoming && (
            <a
              href={event.registrationLink}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary btn-sm"
            >
              <span>Register for Event</span>
              <ExternalLink size={15} />
            </a>
          )}
        </div>

        {/* 1. MEDIA BANNER */}
        <div
          className="glass-panel"
          style={{
            padding: '16px',
            marginBottom: '40px',
            borderRadius: 'var(--radius-xl)',
          }}
        >
          <ProjectMedia
            image={event.image}
            video={event.video}
            title={event.title}
            category={event.category}
            aspectRatio="21/9"
            autoplayVideo={false}
          />
        </div>

        {/* 2. TWO-COLUMN LAYOUT */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1.2fr 0.8fr',
            gap: '40px',
          }}
          className="event-details-grid"
        >
          {/* LEFT: Description, Tracks & Highlights */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            {/* Overview */}
            <GlassCard style={{ padding: '32px' }}>
              <h3 style={{ fontSize: '1.25rem', color: 'var(--text-primary)', marginBottom: '16px' }}>
                Event Overview
              </h3>
              <p style={{ fontSize: '1.05rem', color: 'var(--text-primary)', lineHeight: 1.7, marginBottom: '20px' }}>
                {event.fullDescription || event.description}
              </p>
            </GlassCard>

            {/* Tracks / Topics Covered */}
            {event.tracks && event.tracks.length > 0 && (
              <GlassCard style={{ padding: '32px' }}>
                <h3 style={{ fontSize: '1.25rem', color: 'var(--text-primary)', marginBottom: '20px' }}>
                  Tracks &amp; Key Modules
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '12px' }}>
                  {event.tracks.map((track, idx) => (
                    <div
                      key={idx}
                      style={{
                        padding: '12px 16px',
                        borderRadius: 'var(--radius-md)',
                        background: 'rgba(241, 245, 249, 0.7)',
                        border: '1px solid rgba(15, 23, 42, 0.07)',
                        fontSize: '0.9rem',
                        color: 'var(--text-primary)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                      }}
                    >
                      <Sparkles size={14} color="var(--accent-blue)" />
                      <span>{track}</span>
                    </div>
                  ))}
                </div>
              </GlassCard>
            )}

            {/* Highlights */}
            {event.highlights && event.highlights.length > 0 && (
              <GlassCard style={{ padding: '32px' }}>
                <h3 style={{ fontSize: '1.25rem', color: 'var(--text-primary)', marginBottom: '20px' }}>
                  Session Highlights
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {event.highlights.map((h, idx) => (
                    <div
                      key={idx}
                      style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '12px',
                        fontSize: '0.95rem',
                        color: 'var(--text-secondary)',
                      }}
                    >
                      <CheckCircle2 size={18} color="var(--accent-blue)" style={{ flexShrink: 0, marginTop: '2px' }} />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </GlassCard>
            )}
          </div>

          {/* RIGHT: Logistics & Speakers */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            {/* Logistics Card */}
            <GlassCard style={{ padding: '28px' }}>
              <h3 style={{ fontSize: '1.15rem', color: 'var(--text-primary)', marginBottom: '20px' }}>
                Schedule &amp; Venue
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                  <Calendar size={18} color="var(--accent-blue)" style={{ marginTop: '2px' }} />
                  <div>
                    <strong style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block' }}>DATE</strong>
                    <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{event.date}</span>
                  </div>
                </div>

                {event.time && (
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                    <Clock size={18} color="var(--accent-indigo)" style={{ marginTop: '2px' }} />
                    <div>
                      <strong style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block' }}>TIME</strong>
                      <span style={{ color: 'var(--text-primary)' }}>{event.time}</span>
                    </div>
                  </div>
                )}

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                  <MapPin size={18} color="var(--accent-blue)" style={{ marginTop: '2px' }} />
                  <div>
                    <strong style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block' }}>LOCATION</strong>
                    <span style={{ color: 'var(--text-primary)' }}>{event.location || 'Main Campus'}</span>
                    {event.mode && (
                      <span className="glass-pill" style={{ display: 'inline-block', marginTop: '6px', fontSize: '0.75rem' }}>
                        {event.mode}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {hasRegistration && isUpcoming && (
                <div style={{ marginTop: '24px', paddingTop: '20px', borderTop: '1px solid var(--glass-border-subtle)' }}>
                  <a
                    href={event.registrationLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary"
                    style={{ width: '100%' }}
                  >
                    <span>Register Now</span>
                    <ExternalLink size={16} />
                  </a>
                </div>
              )}
            </GlassCard>

            {/* Speakers / Hosts */}
            {event.speakers && event.speakers.length > 0 && (
              <GlassCard style={{ padding: '28px' }}>
                <h3 style={{ fontSize: '1.15rem', color: 'var(--text-primary)', marginBottom: '20px' }}>
                  Featured Speakers &amp; Mentors
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {event.speakers.map((speaker, idx) => (
                    <div
                      key={idx}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '14px',
                        padding: '12px',
                        borderRadius: 'var(--radius-md)',
                        background: 'rgba(241, 245, 249, 0.7)',
                        border: '1px solid rgba(15, 23, 42, 0.07)',
                      }}
                    >
                      <img
                        src={speaker.avatar}
                        alt={speaker.name}
                        style={{ width: '48px', height: '48px', borderRadius: '12px' }}
                      />
                      <div>
                        <h4 style={{ fontSize: '0.98rem', color: 'var(--text-primary)', fontWeight: 600 }}>
                          {speaker.name}
                        </h4>
                        <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                          {speaker.title}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </GlassCard>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 960px) {
          .event-details-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
