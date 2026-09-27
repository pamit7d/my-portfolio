import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = ({ setView }) => {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

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

                <button
                    type="button"
                    className={`hamburger ${isOpen ? 'active' : ''}`}
                    onClick={toggleMenu}
                    aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
                    aria-expanded={isOpen}
                    aria-controls="portfolio-navigation"
                >
                    <span className="bar"></span>
                    <span className="bar"></span>
                    <span className="bar"></span>
                </button>

                <ul id="portfolio-navigation" className={`nav-links ${isOpen ? 'active' : ''}`}>
                    <li><a href="#hero" onClick={() => handleLinkClick('professional')}>Home</a></li>
                    <li><a href="#projects" onClick={() => handleLinkClick('professional')}>Projects</a></li>
                    <li><a href="#experience" onClick={() => handleLinkClick('professional')}>Experience</a></li>
                    <li><a href="#skills" onClick={() => handleLinkClick('professional')}>Skills</a></li>
                    <li><a href="#achievements" onClick={() => handleLinkClick('professional')}>Achievements</a></li>
                    <li><a href="#contact" onClick={() => handleLinkClick('professional')}>Contact</a></li>
                    <li><a href="/games" onClick={(e) => { e.preventDefault(); setIsOpen(false); window.scrollTo({ top: 0, behavior: 'instant' }); navigate('/games'); }}>Games</a></li>
                    <li className="nav-divider">|</li>
                    <li><a href="#" onClick={(e) => handleLinkClick('personal', e)} className="nav-highlight">Beyond Work</a></li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
