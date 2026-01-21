import React from 'react';
import NeuralBackground from './NeuralBackground';

const Hero = ({ data }) => {
    return (
        <section className="hero-section" id="hero">
            <div className="hero-container">
                {/* Left Column: Text Content */}
                <div className="hero-content">
                    <h1 className="hero-name">{data.name}</h1>
                    <h2 className="hero-title">{data.title}</h2>
                    <p className="hero-description">
                        Bridging the gap between complex data and actionable business insights.
                        Building scalable, engineer-grade AI solutions.
                    </p>
                    <div className="hero-cta">
                        <a href="#projects" className="btn btn-primary">View Work</a>
                        <a href="#contact" className="btn btn-secondary">Contact Me</a>
                    </div>
                </div>

                {/* Right Column: Visual/Animation */}
                <div className="hero-visual">
                    <NeuralBackground />
                </div>
            </div>
        </section>
    );
};

export default Hero;
