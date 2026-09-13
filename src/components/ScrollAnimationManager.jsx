import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollAnimationManager() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const location = useLocation();

  // 1. Fluid Water Scroll Progress
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        const currentProgress = (window.scrollY / totalScroll) * 100;
        setScrollProgress(currentProgress);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 2. Universal Scroll Intersection Observer for Cards & Sections
  useEffect(() => {
    const observerCallback = (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          // Once revealed, unobserve to keep lightweight
          observer.unobserve(entry.target);
        }
      });
    };

    const observerOptions = {
      root: null,
      rootMargin: '0px 0px -60px 0px',
      threshold: 0.1,
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Target cards, panels, and headers across current page
    const targets = document.querySelectorAll(
      '.glass-card, .glass-panel, .section-header, .stat-box, .scroll-reveal'
    );

    targets.forEach((target, index) => {
      // Add base reveal class if not present
      if (!target.classList.contains('scroll-reveal')) {
        target.classList.add('scroll-reveal');
      }
      // Apply slight stagger based on sibling index
      const staggerIndex = (index % 4) + 1;
      target.style.transitionDelay = `${staggerIndex * 70}ms`;

      observer.observe(target);
    });

    return () => {
      targets.forEach((target) => observer.unobserve(target));
    };
  }, [location.pathname]);

  return (
    <div
      className="water-scroll-bar"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: `${scrollProgress}%`,
        height: '3.5px',
        background: 'linear-gradient(90deg, #0284c7 0%, #00f2fe 50%, #38bdf8 100%)',
        boxShadow: '0 0 14px #00f2fe, 0 0 24px rgba(6, 182, 212, 0.6)',
        zIndex: 9999,
        transition: 'width 120ms ease-out',
        pointerEvents: 'none',
        borderRadius: '0 4px 4px 0',
      }}
    />
  );
}
