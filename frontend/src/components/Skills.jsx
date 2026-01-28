import React, { useState } from 'react';

const Skills = ({ data }) => {
    const [activeIndex, setActiveIndex] = useState(null);

    if (!data) return null;

    const handleSkillClick = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <section className="section skills-section" id="skills">
            <h2 className="section-title">Technical Skills</h2>
            <div className="skills-grid">
                {data.map((category, index) => (
                    <div
                        key={index}
                        className={`skill-card ${activeIndex === index ? 'card-active' : ''}`}
                        onClick={() => handleSkillClick(index)}
                        tabIndex="0"
                        role="button"
                        aria-pressed={activeIndex === index}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                                e.preventDefault();
                                handleSkillClick(index);
                            }
                        }}
                    >
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
