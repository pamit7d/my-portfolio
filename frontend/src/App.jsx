import React, { useState, Suspense, lazy } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Education from './components/Education';
import Skills from './components/Skills';
import Achievements from './components/Achievements';
import Footer from './components/Footer';
import resumeData from './data/resume.json';
import './styles/main.css';

// Lazy load BeyondWork to prevent navigation lag
const BeyondWork = lazy(() => import('./components/BeyondWork'));

// Loading component
const PageLoader = () => (
  <div style={{
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#00f2ff',
    fontSize: '1.2rem',
    background: '#050505'
  }}>
    Loading...
  </div>
);

function App() {
  const [view, setView] = useState('professional');

  return (
    <div className="app-container">
      <Navbar setView={setView} />

      {view === 'professional' ? (
        <>
          <Hero data={resumeData.introduction} />
          <Projects data={resumeData.projects} />
          <Experience data={resumeData.experience} />
          <Education data={resumeData.education} />
          <Skills data={resumeData.skills} />
          <Achievements data={resumeData.achievements} />
          <Footer
            socialLinks={resumeData.introduction.socialLinks}
            email={resumeData.introduction.email}
            skills={resumeData.skills}
          />
        </>
      ) : (
        <Suspense fallback={<PageLoader />}>
          <BeyondWork />
        </Suspense>
      )}
    </div>
  );
}

export default App;
