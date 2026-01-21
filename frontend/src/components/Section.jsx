import React from 'react';

const Section = ({ title, children, className = '', id = '' }) => {
    return (
        <section className={`section ${className}`} id={id}>
            <div className="section-content">
                {title && (
                    <h2 className="section-title">
                        {title}
                    </h2>
                )}
                {children}
            </div>
        </section>
    );
};

export default Section;
