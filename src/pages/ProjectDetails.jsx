import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  ExternalLink,
  Cpu,
  Layers,
  Sparkles,
  Calendar,
  User,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';
import { GithubIcon, LinkedinIcon, InstagramIcon } from '../components/SocialIcons';
import projectsData from '../data/projects.json';
import PageHeader from '../components/PageHeader';
import ProjectMedia from '../components/ProjectMedia';
import GlassCard from '../components/GlassCard';

export default function ProjectDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Find project by matching numerical or string ID
  const project = projectsData.find((p) => String(p.id) === String(id));

  // CLEAN NOT FOUND STATE
  if (!project) {
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
          <h2 style={{ fontSize: '1.6rem', marginBottom: '12px' }}>Project Not Found</h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '28px', fontSize: '0.95rem' }}>
            The project identifier <code style={{ color: 'var(--accent-blue)' }}>#{id}</code> does not correspond to any active engineering project in our repository.
          </p>
          <Link to="/projects" className="btn btn-primary">
            <ArrowLeft size={16} />
            <span>Browse All Projects</span>
          </Link>
        </div>
      </div>
    );
  }

  const hasDemo = Boolean(project.demoLink && project.demoLink.trim() !== '');
  const hasGithub = Boolean(project.githubLink && project.githubLink.trim() !== '');

  return (
    <div style={{ minHeight: '100vh', paddingBottom: '120px' }}>
      {/* PAGE HEADER */}
      <PageHeader
        badge={project.category ? `${project.category} PROJECT` : 'ENGINEERING PROJECT'}
        title={project.title}
        subtitle={project.tagline || project.description}
        breadcrumbs={[
          { name: 'Projects', path: '/projects' },
          { name: project.title, path: null },
        ]}
      />

      <div className="container" style={{ marginTop: '40px' }}>
        {/* TOP ACTION BAR: Back to projects & Action links */}
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
            to="/projects"
            className="btn btn-secondary btn-sm"
            style={{ padding: '8px 18px' }}
          >
            <ArrowLeft size={16} />
            <span>Back to Projects</span>
          </Link>

          {/* EXTERNAL ACTION BUTTONS (Only render if present in JSON!) */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
            {hasDemo && (
              <a
                href={project.demoLink}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary btn-sm"
              >
                <span>Live Demonstration</span>
                <ExternalLink size={15} />
              </a>
            )}

            {hasGithub && (
              <a
                href={project.githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary btn-sm"
              >
                <GithubIcon size={15} />
                <span>Source Repository</span>
              </a>
            )}
          </div>
        </div>

        {/* 1. LARGE MEDIA PRESENTATION */}
        <div
          className="glass-panel"
          style={{
            padding: '16px',
            marginBottom: '48px',
            borderRadius: 'var(--radius-xl)',
          }}
        >
          <ProjectMedia
            image={project.image}
            video={project.video}
            title={project.title}
            category={project.category}
            aspectRatio="21/9"
            autoplayVideo={false}
            controls
          />
        </div>

        {/* 2. MAIN DETAILS TWO-COLUMN LAYOUT */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1.2fr 0.8fr',
            gap: '40px',
          }}
          className="project-details-grid"
        >
          {/* LEFT COLUMN: Narrative, Architecture & Key Features */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            {/* Overview */}
            <GlassCard style={{ padding: '32px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                <Layers size={20} color="var(--accent-blue)" />
                <h3 style={{ fontSize: '1.25rem', color: 'var(--text-primary)' }}>
                  Architectural Overview
                </h3>
              </div>
              <p style={{ fontSize: '1.05rem', color: 'var(--text-primary)', lineHeight: 1.7, marginBottom: '16px' }}>
                {project.detailedOverview || project.description}
              </p>
              {project.architecture && (
                <div
                  style={{
                    padding: '16px',
                    borderRadius: 'var(--radius-md)',
                    background: 'rgba(15, 23, 42, 0.5)',
                    border: '1px solid var(--glass-border-subtle)',
                    marginTop: '16px',
                  }}
                >
                  <strong style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'block', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    System Architecture
                  </strong>
                  <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                    {project.architecture}
                  </p>
                </div>
              )}
            </GlassCard>

            {/* Key Features */}
            {project.keyFeatures && project.keyFeatures.length > 0 && (
              <GlassCard style={{ padding: '32px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
                  <Sparkles size={20} color="var(--accent-indigo)" />
                  <h3 style={{ fontSize: '1.25rem', color: 'var(--text-primary)' }}>
                    Key Engineering Capabilities
                  </h3>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {project.keyFeatures.map((feat, idx) => (
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
                      <CheckCircle2
                        size={18}
                        color="var(--accent-blue)"
                        style={{ flexShrink: 0, marginTop: '3px' }}
                      />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </GlassCard>
            )}
          </div>

          {/* RIGHT COLUMN: Technologies, Creators & Metadata */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            {/* Tech Stack Card */}
            <GlassCard style={{ padding: '28px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '18px' }}>
                <Cpu size={20} color="var(--accent-blue)" />
                <h3 style={{ fontSize: '1.15rem', color: 'var(--text-primary)' }}>
                  Technologies &amp; Libraries
                </h3>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {project.technologies &&
                  project.technologies.map((tech, idx) => (
                    <span
                      key={idx}
                      className="glass-pill"
                      style={{
                        padding: '6px 14px',
                        fontSize: '0.85rem',
                        background: 'rgba(56, 189, 248, 0.08)',
                        borderColor: 'var(--accent-blue-border)',
                        color: 'var(--text-primary)',
                      }}
                    >
                      {tech}
                    </span>
                  ))}
              </div>

              {project.date && (
                <div
                  style={{
                    marginTop: '20px',
                    paddingTop: '16px',
                    borderTop: '1px solid var(--glass-border-subtle)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontSize: '0.85rem',
                    color: 'var(--text-muted)',
                  }}
                >
                  <Calendar size={15} color="var(--accent-blue)" />
                  <span>Shipped: {project.date}</span>
                </div>
              )}
            </GlassCard>

            {/* CREATORS SECTION */}
            <GlassCard style={{ padding: '28px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
                <User size={20} color="var(--accent-blue)" />
                <h3 style={{ fontSize: '1.15rem', color: 'var(--text-primary)' }}>
                  Project Creators
                </h3>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {project.creators && project.creators.length > 0 ? (
                  project.creators.map((creator, idx) => {
                    const hasInsta = Boolean(creator.instagram && creator.instagram.trim() !== '');
                    const hasLinkedin = Boolean(creator.linkedin && creator.linkedin.trim() !== '');
                    const hasGithub = Boolean(creator.github && creator.github.trim() !== '');

                    return (
                      <div
                        key={idx}
                        style={{
                          padding: '16px',
                          borderRadius: 'var(--radius-md)',
                          background: 'rgba(15, 23, 42, 0.4)',
                          border: '1px solid var(--glass-border-subtle)',
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                          <h4 style={{ fontSize: '1.05rem', color: 'var(--text-primary)', fontWeight: 600 }}>
                            {creator.name}
                          </h4>
                          {creator.role && (
                            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                              {creator.role}
                            </span>
                          )}
                        </div>

                        {/* Social Links (Only displayed if valid in JSON!) */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '12px' }}>
                          {hasLinkedin && (
                            <a
                              href={creator.linkedin}
                              target="_blank"
                              rel="noopener noreferrer"
                              aria-label={`${creator.name} LinkedIn`}
                              className="glass-pill"
                              style={{ padding: '4px 10px', fontSize: '0.78rem' }}
                            >
                              <LinkedinIcon size={13} color="var(--accent-blue)" />
                              <span>LinkedIn</span>
                            </a>
                          )}

                          {hasGithub && (
                            <a
                              href={creator.github}
                              target="_blank"
                              rel="noopener noreferrer"
                              aria-label={`${creator.name} GitHub`}
                              className="glass-pill"
                              style={{ padding: '4px 10px', fontSize: '0.78rem' }}
                            >
                              <GithubIcon size={13} color="var(--text-secondary)" />
                              <span>GitHub</span>
                            </a>
                          )}

                          {hasInsta && (
                            <a
                              href={creator.instagram}
                              target="_blank"
                              rel="noopener noreferrer"
                              aria-label={`${creator.name} Instagram`}
                              className="glass-pill"
                              style={{ padding: '4px 10px', fontSize: '0.78rem' }}
                            >
                              <InstagramIcon size={13} color="#f472b6" />
                              <span>Instagram</span>
                            </a>
                          )}
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                    CODEX Engineering Team
                  </p>
                )}
              </div>
            </GlassCard>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 960px) {
          .project-details-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
