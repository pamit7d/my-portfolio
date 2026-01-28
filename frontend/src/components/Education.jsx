import React, { useState } from 'react';
import Section from './Section';

const Education = ({ data }) => {
    const [activeEdu, setActiveEdu] = useState(null);

    const handleEduClick = (id) => {
        setActiveEdu(activeEdu === id ? null : id);
    };

    return (
        <Section title="Education" className="education-section">
            <div className="education-grid">
                {data.map((edu) => (
                    <div
                        key={edu.id}
                        className={`education-card ${activeEdu === edu.id ? 'card-active' : ''}`}
                        onClick={() => handleEduClick(edu.id)}
                        tabIndex="0"
                        role="button"
                        aria-pressed={activeEdu === edu.id}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                                e.preventDefault();
                                handleEduClick(edu.id);
                            }
                        }}
                    >
                        <h3 className="degree">{edu.degree}</h3>
                        <div className="university">{edu.university}</div>
                        <div className="edu-footer">
                            <span className="year">{edu.year}</span>
                            <span className="details">{edu.details}</span>
                        </div>
                        {edu.coursework && (
                            <div className="coursework" style={{ marginTop: '0.8rem', fontSize: '0.85rem', color: '#a0aec0', lineHeight: '1.4' }}>
                                <strong>Coursework:</strong> {edu.coursework}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </Section>
    );
};

export default Education;
