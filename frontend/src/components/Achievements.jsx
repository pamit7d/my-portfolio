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
                        {item.image && (
                            <div className="achievement-image" style={{
                                marginTop: '1rem',
                                marginBottom: '1rem',
                                display: 'flex',
                                justifyContent: 'center'
                            }}>
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    style={{
                                        width: '50%',
                                        maxWidth: '400px',
                                        height: 'auto',
                                        borderRadius: '8px',
                                        border: '1px solid rgba(255, 255, 255, 0.1)',
                                        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                                    }}
                                />
                            </div>
                        )}
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
