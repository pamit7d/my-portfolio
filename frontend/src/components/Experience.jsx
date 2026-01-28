import React, { useState } from 'react';
import Section from './Section';

const Experience = ({ data }) => {
    const [activeJob, setActiveJob] = useState(null);

    const handleJobClick = (id) => {
        setActiveJob(activeJob === id ? null : id);
    };

    return (
        <Section title="Selected Experience" className="experience-section" id="experience">
            <div className="experience-list">
                {data.map((job) => (
                    <div
                        key={job.id}
                        className={`experience-item ${activeJob === job.id ? 'card-active' : ''}`}
                        onClick={() => handleJobClick(job.id)}
                        tabIndex="0"
                        role="button"
                        aria-pressed={activeJob === job.id}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                                e.preventDefault();
                                handleJobClick(job.id);
                            }
                        }}
                    >
                        <div className="job-header">
                            <span className="job-company">{job.company}</span>
                            <h3 className="job-role">{job.role}</h3>
                            <span className="job-duration">{job.duration}</span>
                        </div>

                        <p className="job-description">{job.description}</p>

                        <ul className="job-impact">
                            {job.impact.map((point, index) => (
                                <li key={index}>
                                    {point}
                                </li>
                            ))}
                        </ul>
                        {job.keyTools && (
                            <div className="job-tools" style={{ marginTop: '1rem', fontStyle: 'italic', color: '#a0aec0', fontSize: '0.9rem' }}>
                                <strong>Key Tools:</strong> {job.keyTools}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </Section>
    );
};

export default Experience;
