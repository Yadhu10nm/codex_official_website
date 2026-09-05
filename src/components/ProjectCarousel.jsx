import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import ProjectCard from './ProjectCard';

export default function ProjectCarousel({ projects = [] }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!projects || projects.length === 0) return null;

  const total = projects.length;

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? total - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === total - 1 ? 0 : prev + 1));
  };

  // Determine which cards to show: On large screens 3 cards, medium 2, mobile 1
  return (
    <div className="carousel-container" style={{ position: 'relative', width: '100%' }}>
      {/* 1. CAROUSEL CONTROLS ROW */}
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
            aria-label="Previous project"
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
            aria-label="Next project"
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

      {/* 2. CAROUSEL TRACK */}
      <div style={{ overflow: 'hidden', margin: '0 -12px', padding: '12px 12px 24px 12px' }}>
        <div
          className="carousel-track"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
            gap: '24px',
            transition: 'transform var(--transition-normal)',
          }}
        >
          {/* We display a window of 3 projects starting at currentIndex (circular wrapping) */}
          {[0, 1, 2].map((offset) => {
            const index = (currentIndex + offset) % total;
            const project = projects[index];
            return (
              <div key={project.id} className={`carousel-item carousel-slot-${offset}`}>
                <ProjectCard project={project} />
              </div>
            );
          })}
        </div>
      </div>

      {/* Responsive adjustments for 3-card vs 2-card vs 1-card */}
      <style>{`
        @media (max-width: 1024px) {
          .carousel-track {
            grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
          }
          .carousel-slot-2 {
            display: none !important;
          }
        }
        @media (max-width: 720px) {
          .carousel-track {
            grid-template-columns: 1fr !important;
          }
          .carousel-slot-1, .carousel-slot-2 {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
}
