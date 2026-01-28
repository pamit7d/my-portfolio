import React, { useState } from 'react';

const Navbar = ({ setView }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const handleLinkClick = (viewName, e) => {
        if (e) e.preventDefault();
        setView(viewName);
        setIsOpen(false);
        // Instant scroll to top to prevent 'smooth' scroll fighting with DOM replacement
        window.scrollTo({ top: 0, behavior: 'instant' });
    };

    return (
        <nav className="navbar">
            <div className="navbar-content">
                <div className="logo" onClick={() => handleLinkClick('professional')} style={{ cursor: 'pointer' }}>AKP</div>

                <div className={`hamburger ${isOpen ? 'active' : ''}`} onClick={toggleMenu}>
                    <span className="bar"></span>
                    <span className="bar"></span>
                    <span className="bar"></span>
                </div>

                <ul className={`nav-links ${isOpen ? 'active' : ''}`}>
                    <li><a href="#hero" onClick={() => handleLinkClick('professional')}>Home</a></li>
                    <li><a href="#projects" onClick={() => handleLinkClick('professional')}>Projects</a></li>
                    <li><a href="#experience" onClick={() => handleLinkClick('professional')}>Experience</a></li>
                    <li><a href="#skills" onClick={() => handleLinkClick('professional')}>Skills</a></li>
                    <li><a href="#achievements" onClick={() => handleLinkClick('professional')}>Achievements</a></li>
                    <li><a href="#contact" onClick={() => handleLinkClick('professional')}>Contact</a></li>
                    <li className="nav-divider">|</li>
                    <li><a href="#" onClick={(e) => handleLinkClick('personal', e)} className="nav-highlight">Beyond Work</a></li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
