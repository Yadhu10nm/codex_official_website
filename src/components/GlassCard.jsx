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

  const handleMouseMove = (e) => {
    if (!cardRef.current || !tilt) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setMousePos({
      x,
      y,
      active: true,
    });
  };

  const handleMouseLeave = () => {
    setMousePos((prev) => ({ ...prev, active: false }));
  };

  return (
    <div
      ref={cardRef}
      className={`glass-card ${highlight ? 'highlight-glow' : ''} ${className}`}
      style={{
        ...style,
        position: 'relative',
        cursor: onClick ? 'pointer' : 'default',
      }}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      {/* Dynamic Cursor Light Reflection on Surface */}
      {tilt && mousePos.active && (
        <div
          style={{
            position: 'absolute',
            top: mousePos.y - 120,
            left: mousePos.x - 120,
            width: '240px',
            height: '240px',
            background: 'radial-gradient(circle, rgba(56, 189, 248, 0.08) 0%, transparent 70%)',
            pointerEvents: 'none',
            borderRadius: '50%',
            transition: 'opacity 0.2s ease',
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
