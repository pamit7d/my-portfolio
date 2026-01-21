import React from 'react';

const Navbar = ({ setView }) => {
    return (
        <nav className="navbar">
            <div className="navbar-content">
                <div className="logo" onClick={() => setView('professional')} style={{ cursor: 'pointer' }}>AKP</div>
                <ul className="nav-links">
                    <li><a href="#hero" onClick={() => setView('professional')}>Home</a></li>
                    <li><a href="#experience" onClick={() => setView('professional')}>Experience</a></li>
                    <li><a href="#projects" onClick={() => setView('professional')}>Projects</a></li>
                    <li><a href="#skills" onClick={() => setView('professional')}>Skills</a></li>
                    <li><a href="#achievements" onClick={() => setView('professional')}>Achievements</a></li>
                    <li><a href="#contact" onClick={() => setView('professional')}>Contact</a></li>
                    <li className="nav-divider">|</li>
                    <li><a href="#" onClick={(e) => { e.preventDefault(); setView('personal'); }} className="nav-highlight">Beyond Work</a></li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
