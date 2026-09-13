import React, { Suspense, useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import LoadingScreen from './components/LoadingScreen';
import ScrollAnimationManager from './components/ScrollAnimationManager';
import WaterBackground from './components/WaterBackground';

// Pages
import Home from './pages/Home';
import Projects from './pages/Projects';
import ProjectDetails from './pages/ProjectDetails';
import Events from './pages/Events';
import EventDetails from './pages/EventDetails';
import Team from './pages/Team';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';

export default function App() {
  const [initialLoading, setInitialLoading] = useState(true);

  // Initial loading sequence
  useEffect(() => {
    const timer = setTimeout(() => {
      setInitialLoading(false);
    }, 400);
    return () => clearTimeout(timer);
  }, []);

  if (initialLoading) {
    return <LoadingScreen message="Initializing CODEX Developer Network..." />;
  }

  return (
    <Router>
      <ScrollToTop />
      {/* Subtle Realistic Three.js White Water Surface Background */}
      <WaterBackground />
      {/* Liquid Water Scroll Progress & Universal Reveal Animations */}
      <ScrollAnimationManager />
      <div className="app-container" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', position: 'relative', zIndex: 1 }}>
        <Header />
        <div style={{ flexGrow: 1 }}>
          <Suspense fallback={<LoadingScreen message="Loading View..." />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/projects/:id" element={<ProjectDetails />} />
              <Route path="/events" element={<Events />} />
              <Route path="/events/:id" element={<EventDetails />} />
              <Route path="/team" element={<Team />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </div>
        <Footer />
      </div>
    </Router>
  );
}
