import React, { useState, useMemo } from 'react';
import { Search, Filter, Code2, Sparkles } from 'lucide-react';
import projectsData from '../data/projects.json';
import PageHeader from '../components/PageHeader';
import ProjectCard from '../components/ProjectCard';

const FILTER_TAGS = ['All', 'Web', 'AI', 'ML', 'Python', '3D', 'Mobile', 'Cloud'];

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Filter projects based on activeFilter and searchQuery
  const filteredProjects = useMemo(() => {
    return projectsData.filter((project) => {
      // 1. Tag Filter
      let matchesTag = true;
      if (activeFilter !== 'All') {
        const hasCategory = project.category?.toLowerCase() === activeFilter.toLowerCase();
        const hasTech = project.technologies?.some(
          (t) => t.toLowerCase() === activeFilter.toLowerCase()
        );
        matchesTag = hasCategory || hasTech;
      }

      // 2. Search Filter
      let matchesSearch = true;
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase();
        const inTitle = project.title.toLowerCase().includes(q);
        const inDesc = project.description.toLowerCase().includes(q);
        const inTech = project.technologies?.some((t) => t.toLowerCase().includes(q));
        const inCreators = project.creators?.some((c) => c.name.toLowerCase().includes(q));
        matchesSearch = inTitle || inDesc || inTech || inCreators;
      }

      return matchesTag && matchesSearch;
    });
  }, [activeFilter, searchQuery]);

  return (
    <div style={{ minHeight: '100vh', paddingBottom: '100px' }}>
      {/* PAGE BANNER */}
      <PageHeader
        badge="ENGINEERING DIRECTORY"
        title="Student Engineered Projects"
        subtitle="Explore our repository of fullstack applications, neural algorithms, 3D WebGL metaverses, and distributed backend architectures."
        breadcrumbs={[{ name: 'Projects', path: null }]}
      />

      <div className="container" style={{ marginTop: '40px' }}>
        {/* CONTROLS BAR: Filters & Search */}
        <div
          className="glass-panel"
          style={{
            padding: '20px 24px',
            marginBottom: '40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '20px',
          }}
        >
          {/* FILTER TABS */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              flexWrap: 'wrap',
            }}
          >
            {FILTER_TAGS.map((tag) => {
              const isActive = activeFilter === tag;
              return (
                <button
                  key={tag}
                  type="button"
                  onClick={() => setActiveFilter(tag)}
                  className={`glass-pill ${isActive ? 'active' : ''}`}
                  style={{
                    padding: '8px 16px',
                    fontSize: '0.85rem',
                    cursor: 'pointer',
                  }}
                >
                  {tag}
                </button>
              );
            })}
          </div>

          {/* SEARCH BAR */}
          <div style={{ position: 'relative', width: '100%', maxWidth: '320px' }}>
            <Search
              size={18}
              color="var(--text-muted)"
              style={{
                position: 'absolute',
                left: '14px',
                top: '50%',
                transform: 'translateY(-50%)',
                pointerEvents: 'none',
              }}
            />
            <input
              type="text"
              placeholder="Search title, tech, creator..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="glass-input"
              style={{
                paddingLeft: '42px',
                paddingTop: '10px',
                paddingBottom: '10px',
                fontSize: '0.88rem',
              }}
            />
          </div>
        </div>

        {/* RESULTS METRICS */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '24px',
            fontSize: '0.88rem',
            color: 'var(--text-muted)',
          }}
        >
          <span>
            Showing <strong style={{ color: 'var(--text-primary)' }}>{filteredProjects.length}</strong> {filteredProjects.length === 1 ? 'project' : 'projects'}
          </span>
          {activeFilter !== 'All' && (
            <span>
              Filtered by: <span style={{ color: 'var(--accent-blue)' }}>{activeFilter}</span>
            </span>
          )}
        </div>

        {/* PROJECTS GRID */}
        {filteredProjects.length > 0 ? (
          <div className="grid-3">
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        ) : (
          /* NO RESULTS EMPTY STATE */
          <div
            className="glass-panel"
            style={{
              padding: '64px 32px',
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <div
              style={{
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                background: 'rgba(56, 189, 248, 0.1)',
                border: '1px solid var(--accent-blue-border)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--accent-blue)',
                marginBottom: '16px',
              }}
            >
              <Code2 size={28} />
            </div>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '8px', color: 'var(--text-primary)' }}>
              No projects found
            </h3>
            <p style={{ color: 'var(--text-secondary)', maxWidth: '420px', marginBottom: '24px' }}>
              No projects match your current filter or search criteria. Try selecting another tag or clearing your query.
            </p>
            <button
              type="button"
              onClick={() => {
                setActiveFilter('All');
                setSearchQuery('');
              }}
              className="btn btn-secondary btn-sm"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
