import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import EventCard from './EventCard';

export default function EventCarousel({ events = [] }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!events || events.length === 0) return null;

  const total = events.length;

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? total - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === total - 1 ? 0 : prev + 1));
  };

  return (
    <div className="event-carousel-container" style={{ position: 'relative', width: '100%' }}>
      {/* 1. CONTROLS */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '28px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
            Showing 0{currentIndex + 1} / 0{total}
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Previous event"
            className="btn btn-secondary btn-sm"
            style={{
              width: '42px',
              height: '42px',
              padding: 0,
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <ChevronLeft size={20} />
          </button>
          <button
            type="button"
            onClick={handleNext}
            aria-label="Next event"
            className="btn btn-secondary btn-sm"
            style={{
              width: '42px',
              height: '42px',
              padding: 0,
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      {/* 2. CAROUSEL SLOTS */}
      <div style={{ overflow: 'hidden', margin: '0 -12px', padding: '12px 12px 24px 12px' }}>
        <div
          className="event-carousel-track"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
            gap: '24px',
            transition: 'transform var(--transition-normal)',
          }}
        >
          {[0, 1, 2].map((offset) => {
            const index = (currentIndex + offset) % total;
            const event = events[index];
            return (
              <div key={event.id} className={`event-carousel-item event-slot-${offset}`}>
                <EventCard event={event} />
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .event-carousel-track {
            grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
          }
          .event-slot-2 {
            display: none !important;
          }
        }
        @media (max-width: 720px) {
          .event-carousel-track {
            grid-template-columns: 1fr !important;
          }
          .event-slot-1, .event-slot-2 {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
}
