import React, { useEffect, useState } from 'react';

export default function UnderwaterBackground() {
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      // Subtle parallax offset
      const x = (e.clientX / window.innerWidth - 0.5) * 30;
      const y = (e.clientY / window.innerHeight - 0.5) * 25;
      setMouseOffset({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div
      className="underwater-atmosphere-layer"
      style={{
        position: 'fixed',
        inset: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
        zIndex: 0,
      }}
      aria-hidden="true"
    >
      {/* 1. Slow-Moving Cyan Water Light Field */}
      <div
        className="underwater-blob blob-cyan"
        style={{
          position: 'absolute',
          top: '-10%',
          left: '15%',
          width: '55vw',
          height: '55vw',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0, 242, 254, 0.08) 0%, rgba(6, 182, 212, 0.03) 50%, transparent 70%)',
          filter: 'blur(100px)',
          transform: `translate3d(${mouseOffset.x * 0.7}px, ${mouseOffset.y * 0.7}px, 0)`,
          transition: 'transform 1.2s cubic-bezier(0.22, 1, 0.36, 1)',
          animation: 'blobDrift1 28s ease-in-out infinite alternate',
        }}
      />

      {/* 2. Deep Violet Ambient Caustic Light */}
      <div
        className="underwater-blob blob-violet"
        style={{
          position: 'absolute',
          top: '35%',
          right: '-10%',
          width: '60vw',
          height: '60vw',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(99, 102, 241, 0.08) 0%, rgba(168, 85, 247, 0.03) 50%, transparent 70%)',
          filter: 'blur(120px)',
          transform: `translate3d(${-mouseOffset.x * 0.5}px, ${-mouseOffset.y * 0.5}px, 0)`,
          transition: 'transform 1.4s cubic-bezier(0.22, 1, 0.36, 1)',
          animation: 'blobDrift2 34s ease-in-out infinite alternate',
        }}
      />

      {/* 3. Deep Sea Azure Light Field */}
      <div
        className="underwater-blob blob-azure"
        style={{
          position: 'absolute',
          bottom: '-15%',
          left: '20%',
          width: '65vw',
          height: '55vw',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(14, 165, 233, 0.07) 0%, rgba(2, 132, 199, 0.02) 60%, transparent 75%)',
          filter: 'blur(110px)',
          transform: `translate3d(${mouseOffset.x * 0.4}px, ${mouseOffset.y * 0.4}px, 0)`,
          transition: 'transform 1.6s cubic-bezier(0.22, 1, 0.36, 1)',
          animation: 'blobDrift3 30s ease-in-out infinite alternate',
        }}
      />

      {/* 4. Subtle Ambient Rising Micro-Bubbles */}
      <div className="bubbles-container">
        {[...Array(14)].map((_, i) => {
          const size = 3 + (i % 4) * 2;
          const left = 5 + (i * 7) % 90;
          const duration = 16 + (i % 6) * 3;
          const delay = (i * 1.5) % 12;

          return (
            <div
              key={i}
              className="underwater-bubble"
              style={{
                position: 'absolute',
                bottom: '-20px',
                left: `${left}%`,
                width: `${size}px`,
                height: `${size}px`,
                borderRadius: '50%',
                background: 'radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.8), rgba(0, 242, 254, 0.3) 60%, rgba(255, 255, 255, 0.1) 100%)',
                boxShadow: '0 0 6px rgba(0, 242, 254, 0.4), inset 0 0 2px rgba(255, 255, 255, 0.6)',
                opacity: 0.35,
                animation: `bubbleFloat ${duration}s ease-in infinite`,
                animationDelay: `${delay}s`,
              }}
            />
          );
        })}
      </div>

      <style>{`
        @keyframes blobDrift1 {
          0% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(60px, 40px) scale(1.08); }
          100% { transform: translate(-30px, 70px) scale(0.96); }
        }
        @keyframes blobDrift2 {
          0% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(-70px, -50px) scale(1.12); }
          100% { transform: translate(40px, -30px) scale(0.94); }
        }
        @keyframes blobDrift3 {
          0% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(40px, -60px) scale(1.06); }
          100% { transform: translate(-50px, 30px) scale(1); }
        }
        @keyframes bubbleFloat {
          0% {
            transform: translateY(0) translateX(0);
            opacity: 0;
          }
          15% {
            opacity: 0.45;
          }
          85% {
            opacity: 0.3;
          }
          100% {
            transform: translateY(-105vh) translateX(30px);
            opacity: 0;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .underwater-blob {
            animation: none !important;
          }
          .bubbles-container {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
}
