import React, { useState, useMemo } from 'react';
import { Search, Calendar, Trophy, Clock, Sparkles } from 'lucide-react';
import eventsData from '../data/events.json';
import PageHeader from '../components/PageHeader';
import EventCard from '../components/EventCard';

const FILTER_TAGS = ['All', 'Upcoming', 'Past', 'Hackathon', 'Workshop', 'Tech Talk'];

export default function Events() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredEvents = useMemo(() => {
    return eventsData.filter((event) => {
      // 1. Filter match
      let matchesTag = true;
      if (activeFilter !== 'All') {
        const isStatusMatch = event.status?.toLowerCase() === activeFilter.toLowerCase();
        const isCategoryMatch = event.category?.toLowerCase() === activeFilter.toLowerCase();
        matchesTag = isStatusMatch || isCategoryMatch;
      }

      // 2. Search match
      let matchesSearch = true;
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase();
        const inTitle = event.title.toLowerCase().includes(q);
        const inDesc = event.description.toLowerCase().includes(q);
        const inCategory = event.category?.toLowerCase().includes(q);
        const inLocation = event.location?.toLowerCase().includes(q);
        matchesSearch = inTitle || inDesc || inCategory || inLocation;
      }

      return matchesTag && matchesSearch;
    });
  }, [activeFilter, searchQuery]);

  return (
    <div style={{ minHeight: '100vh', paddingBottom: '100px' }}>
      {/* PAGE HEADER */}
      <PageHeader
        badge="EVENTS &amp; SESSIONS"
        title="Hackathons, Workshops &amp; Tech Talks"
        subtitle="Join our interactive engineering bootcamps, compete in national hackathons, and attend architectural tech talks by industry leaders."
        breadcrumbs={[{ name: 'Events', path: null }]}
      />

      <div className="container" style={{ marginTop: '40px' }}>
        {/* CONTROLS */}
        <div
          className="glass-panel"
          style={{
            padding: '20px 24px',
            marginBottom: '40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '20px',
          }}
        >
          {/* TAGS */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
            {FILTER_TAGS.map((tag) => {
              const isActive = activeFilter === tag;
              return (
                <button
                  key={tag}
                  type="button"
                  onClick={() => setActiveFilter(tag)}
                  className={`glass-pill ${isActive ? 'active' : ''}`}
                  style={{
                    padding: '8px 16px',
                    fontSize: '0.85rem',
                    cursor: 'pointer',
                  }}
                >
                  {tag}
                </button>
              );
            })}
          </div>

          {/* SEARCH */}
          <div style={{ position: 'relative', width: '100%', maxWidth: '320px' }}>
            <Search
              size={18}
              color="var(--text-muted)"
              style={{
                position: 'absolute',
                left: '14px',
                top: '50%',
                transform: 'translateY(-50%)',
                pointerEvents: 'none',
              }}
            />
            <input
              type="text"
              placeholder="Search event, topic, location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="glass-input"
              style={{
                paddingLeft: '42px',
                paddingTop: '10px',
                paddingBottom: '10px',
                fontSize: '0.88rem',
              }}
            />
          </div>
        </div>

        {/* METRICS */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '24px',
            fontSize: '0.88rem',
            color: 'var(--text-muted)',
          }}
        >
          <span>
            Showing <strong style={{ color: 'var(--text-primary)' }}>{filteredEvents.length}</strong> {filteredEvents.length === 1 ? 'event' : 'events'}
          </span>
          {activeFilter !== 'All' && (
            <span>
              Filtered by: <span style={{ color: 'var(--accent-blue)' }}>{activeFilter}</span>
            </span>
          )}
        </div>

        {/* EVENTS GRID */}
        {filteredEvents.length > 0 ? (
          <div className="grid-3">
            {filteredEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        ) : (
          <div
            className="glass-panel"
            style={{
              padding: '64px 32px',
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <div
              style={{
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                background: 'rgba(56, 189, 248, 0.1)',
                border: '1px solid var(--accent-blue-border)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--accent-blue)',
                marginBottom: '16px',
              }}
            >
              <Calendar size={28} />
            </div>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '8px', color: 'var(--text-primary)' }}>
              No events found
            </h3>
            <p style={{ color: 'var(--text-secondary)', maxWidth: '420px', marginBottom: '24px' }}>
              No events match your current search query. Try another keyword or clear filters.
            </p>
            <button
              type="button"
              onClick={() => {
                setActiveFilter('All');
                setSearchQuery('');
              }}
              className="btn btn-secondary btn-sm"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
