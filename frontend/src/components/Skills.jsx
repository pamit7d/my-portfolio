import React from 'react';

const Skills = ({ data }) => {
    if (!data) return null;

    return (
        <section className="section skills-section" id="skills">
            <h2 className="section-title">Technical Skills</h2>
            <div className="skills-grid">
                {data.map((category, index) => (
                    <div key={index} className="skill-card">
                        <h3 className="skill-category">{category.category}</h3>
                        <div className="skill-tags">
                            {category.items.map((item, i) => (
                                <span key={i} className="skill-tag">{item}</span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Skills;
