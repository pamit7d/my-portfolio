import React from 'react';

const Achievements = ({ data }) => {
    if (!data) return null;

    return (
        <section className="section achievements-section" id="achievements">
            <h2 className="section-title">Achievements & Activities</h2>
            <div className="achievements-grid">
                {data.map((item) => (
                    <div key={item.id} className="achievement-card">
                        <div className="achievement-header">
                            <h3 className="achievement-title">{item.title}</h3>
                            <span className="achievement-date">{item.date}</span>
                        </div>
                        <p className="achievement-org">{item.organization}</p>
                        <p className="achievement-desc">{item.description}</p>
                        {item.link && (
                            <a href={item.link} target="_blank" rel="noopener noreferrer"
                                style={{
                                    display: 'inline-block',
                                    marginTop: '0.8rem',
                                    fontSize: '0.85rem',
                                    color: '#00f2ff',
                                    textDecoration: 'none',
                                    fontWeight: 500
                                }}>
                                View Credential ↗
                            </a>
                        )}
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Achievements;
