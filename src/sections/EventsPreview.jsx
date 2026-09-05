import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, ArrowUpRight, Trophy } from 'lucide-react';
import eventsData from '../data/events.json';
import EventCarousel from '../components/EventCarousel';

export default function EventsPreview() {
  return (
    <section className="section" style={{ position: 'relative' }}>
      <div className="container">
        {/* SECTION HEADER */}
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '24px',
            marginBottom: '48px',
          }}
        >
          <div>
            <div className="section-badge">
              <Calendar size={14} />
              <span>COMMUNITY GATHERINGS</span>
            </div>
            <h2 className="section-title">Events &amp; Hackathons</h2>
            <p className="section-subtitle" style={{ maxWidth: '640px' }}>
              From 36-hour competitive hackathons and high-throughput system design workshops to guest talks by industry leaders.
            </p>
          </div>

          <div>
            <Link to="/events" className="btn btn-secondary">
              <span>View All Events</span>
              <ArrowUpRight size={16} />
            </Link>
          </div>
        </div>

        {/* CAROUSEL */}
        <EventCarousel events={eventsData} />
      </div>
    </section>
  );
}
