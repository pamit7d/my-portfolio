import React from 'react';
import Section from './Section';

const Education = ({ data }) => {
    return (
        <Section title="Education" className="education-section">
            <div className="education-grid">
                {data.map((edu) => (
                    <div key={edu.id} className="education-card">
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
