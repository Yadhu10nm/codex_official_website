import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, User } from 'lucide-react';
import GlassCard from './GlassCard';
import ProjectMedia from './ProjectMedia';

export default function ProjectCard({ project }) {
  if (!project) return null;

  return (
    <GlassCard
      tilt
      className="project-card"
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        padding: '20px',
      }}
    >
      {/* 1. MEDIA CONTAINER */}
      <div style={{ marginBottom: '18px' }}>
        <ProjectMedia
          image={project.image}
          video={project.video}
          title={project.title}
          category={project.category}
          aspectRatio="16/9"
          autoplayVideo={false}
        />
      </div>

      {/* 2. TECH PILLS */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '6px',
          marginBottom: '14px',
        }}
      >
        {project.technologies &&
          project.technologies.slice(0, 4).map((tech, idx) => (
            <span key={idx} className="glass-pill">
              {tech}
            </span>
          ))}
        {project.technologies && project.technologies.length > 4 && (
          <span className="glass-pill">+{project.technologies.length - 4}</span>
        )}
      </div>

      {/* 3. PROJECT TITLE */}
      <h3
        style={{
          fontSize: '1.25rem',
          fontWeight: 700,
          color: 'var(--text-primary)',
          marginBottom: '8px',
          lineHeight: 1.3,
        }}
      >
        <Link
          to={`/projects/${project.id}`}
          style={{ color: 'inherit' }}
          onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent-blue)')}
          onMouseLeave={(e) => (e.currentTarget.style.color = 'inherit')}
        >
          {project.title}
        </Link>
      </h3>

      {/* 4. SHORT DESCRIPTION */}
      <p
        style={{
          fontSize: '0.92rem',
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
        {project.description}
      </p>

      {/* 5. CREATORS & ACTIONS ROW */}
      <div
        style={{
          borderTop: '1px solid var(--glass-border-subtle)',
          paddingTop: '16px',
          marginTop: 'auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '12px',
        }}
      >
        {/* CREATORS LIST */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div
            style={{
              width: '26px',
              height: '26px',
              borderRadius: '50%',
              background: 'rgba(56, 189, 248, 0.1)',
              border: '1px solid var(--accent-blue-border)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--accent-blue)',
            }}
          >
            <User size={14} />
          </div>
          <div style={{ fontSize: '0.82rem' }}>
            <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.72rem' }}>
              Built by
            </span>
            <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>
              {project.creators && project.creators.length > 0
                ? project.creators.map((c) => c.name).join(', ')
                : 'Codex Member'}
            </span>
          </div>
        </div>

        {/* DETAILS LINK BUTTON */}
        <Link
          to={`/projects/${project.id}`}
          className="btn btn-secondary btn-sm"
          style={{ padding: '6px 14px', fontSize: '0.82rem' }}
        >
          <span>Details</span>
          <ArrowUpRight size={14} />
        </Link>
      </div>
    </GlassCard>
  );
}
