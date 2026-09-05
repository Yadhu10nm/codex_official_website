import React from 'react';
import { Link } from 'react-router-dom';
import { Code2, ArrowUpRight, Sparkles } from 'lucide-react';
import projectsData from '../data/projects.json';
import ProjectCarousel from '../components/ProjectCarousel';

export default function ProjectsPreview() {
  return (
    <section className="section" style={{ position: 'relative', background: 'rgba(9, 13, 22, 0.4)' }}>
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
              <Code2 size={14} />
              <span>ENGINEERING SHOWCASE</span>
            </div>
            <h2 className="section-title">Projects Built by Our Members</h2>
            <p className="section-subtitle" style={{ maxWidth: '640px' }}>
              Explore production-grade software platforms, 3D WebGL metaverses, distributed systems, and edge AI models engineered by CODEX student squads.
            </p>
          </div>

          {/* VIEW ALL BUTTON */}
          <div>
            <Link to="/projects" className="btn btn-secondary">
              <span>View All Projects</span>
              <ArrowUpRight size={16} />
            </Link>
          </div>
        </div>

        {/* INTERACTIVE CAROUSEL */}
        <ProjectCarousel projects={projectsData} />
      </div>
    </section>
  );
}
