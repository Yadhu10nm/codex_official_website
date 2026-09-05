import React from 'react';
import Hero from '../sections/Hero';
import About from '../sections/About';
import WhyClub from '../sections/WhyClub';
import ProjectsPreview from '../sections/ProjectsPreview';
import EventsPreview from '../sections/EventsPreview';
import CallToAction from '../sections/CallToAction';

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <WhyClub />
      <ProjectsPreview />
      <EventsPreview />
      <CallToAction />
    </main>
  );
}
