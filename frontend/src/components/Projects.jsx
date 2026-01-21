import React from 'react';
import Section from './Section';

const Projects = ({ data }) => {
    return (
        <Section title="Selected Projects" className="projects-section" id="projects">
            <div className="projects-grid">
                {data.map((project) => (
                    <div key={project.id} className="project-card">
                        <div className="project-header">
                            <h3 className="project-title">{project.title}</h3>
                            <div className="project-stats">{project.stats}</div>
                        </div>

                        <p className="project-description">{project.description}</p>

                        <div className="project-tags">
                            {project.tech.map((tag, index) => (
                                <span key={index} className="tech-tag">{tag}</span>
                            ))}
                        </div>

                        <div className="project-links">
                            <a href={project.link} className="btn-outline">GitHub</a>
                            {/* Demo link could be added here */}
                        </div>
                    </div>
                ))}
            </div>
        </Section>
    );
};

export default Projects;
