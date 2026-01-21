import React from 'react';

const Footer = ({ socialLinks, email, skills }) => {
    // Flatten all skills for the marquee
    const allSkills = skills.flatMap(category => category.items);
    // Duplicate for seamless loop
    const marqueeSkills = [...allSkills, ...allSkills];

    return (
        <footer className="modern-footer" id="contact">
            {/* Skills Marquee */}
            <div className="skills-marquee-container">
                <div className="marquee-track">
                    {marqueeSkills.map((skill, index) => (
                        <div key={`${skill}-${index}`} className="skill-logo">
                            {skill}
                        </div>
                    ))}
                </div>
            </div>

            <div className="footer-content">
                <div className="footer-top">
                    <div className="footer-brand">
                        <h2 className="footer-logo">AKP</h2>
                        <p className="footer-tagline">Building engineer-grade AI solutions.</p>
                    </div>

                    <div className="footer-contact">
                        <h3>Connect</h3>
                        <div className="social-links">
                            <a href={socialLinks.github} target="_blank" rel="noopener noreferrer" className="social-link" aria-label="GitHub">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
                                <span>GitHub</span>
                            </a>
                            <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="social-link" aria-label="LinkedIn">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                                <span>LinkedIn</span>
                            </a>
                            <a href={`mailto:${email}`} className="social-link" aria-label="Email">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                                <span>{email}</span>
                            </a>
                        </div>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p>© {new Date().getFullYear()} Amit Kumar Pandey. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
