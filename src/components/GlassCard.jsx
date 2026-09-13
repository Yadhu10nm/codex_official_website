import React, { useRef, useState } from 'react';

export default function GlassCard({
  children,
  className = '',
  style = {},
  onClick,
  tilt = false,
  highlight = false,
  ...props
}) {
  const cardRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0, active: false });
  const [tiltStyle, setTiltStyle] = useState({});

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setMousePos({
      x,
      y,
      active: true,
    });

    if (tilt) {
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      // Very subtle floating tilt (max 3 degrees)
      const rotateX = ((y - centerY) / centerY) * -2.5;
      const rotateY = ((x - centerX) / centerX) * 2.5;

      setTiltStyle({
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`,
        transition: 'transform 0.1s ease-out',
      });
    }
  };

  const handleMouseLeave = () => {
    setMousePos((prev) => ({ ...prev, active: false }));
    if (tilt) {
      setTiltStyle({
        transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)',
        transition: 'transform 0.4s ease-out',
      });
    }
  };

  return (
    <div
      ref={cardRef}
      className={`glass-card ${highlight ? 'highlight-glow' : ''} ${className}`}
      style={{
        ...style,
        ...tiltStyle,
        position: 'relative',
        cursor: onClick ? 'pointer' : 'default',
        '--mouse-x': `${mousePos.x}px`,
        '--mouse-y': `${mousePos.y}px`,
      }}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      {/* Subtle water sheen reflection on hover */}
      {mousePos.active && (
        <div
          style={{
            position: 'absolute',
            top: mousePos.y - 120,
            left: mousePos.x - 120,
            width: '240px',
            height: '240px',
            background: 'radial-gradient(circle, rgba(2, 132, 199, 0.04) 0%, rgba(255, 255, 255, 0.4) 40%, transparent 70%)',
            pointerEvents: 'none',
            borderRadius: '50%',
            transition: 'opacity 0.25s ease',
            zIndex: 0,
          }}
        />
      )}
      <div style={{ position: 'relative', zIndex: 1, height: '100%' }}>
        {children}
      </div>
    </div>
  );
}
