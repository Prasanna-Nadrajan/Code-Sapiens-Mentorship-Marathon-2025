// src/components/Footer.jsx
import React from 'react';

// Simple inline SVG icons for social media
const Facebook = ({ size = 24 }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
);
const Twitter = ({ size = 24 }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C4.3 14.1 2 11.6 2 8.5V8c2.8 1.5 5.8 2 8 1.9c-3.7-4.1 1-9.4 6.7-8.3 2.1-.3 4.1-.2 6 1-1 1.7-2 2.6-3 3.3z"/></svg>
);
const Instagram = ({ size = 24 }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
);

const Footer = () => {
    const footerLinks = [
        { title: "Audio Description", href: "#" },
        { title: "Investor Relations", href: "#" },
        { title: "Privacy", href: "#" },
        { title: "Contact Us", href: "#" },
        { title: "Help Center", href: "#" },
        { title: "Jobs", href: "#" },
        { title: "Legal Notices", href: "#" },
        { title: "Account", href: "#" },
        { title: "Redeem Gift Cards", href: "#" },
        { title: "Cookie Preferences", href: "#" },
        { title: "Media Center", href: "#" },
        { title: "Terms of Use", href: "#" },
    ];

    return (
        <footer className="app-footer">
            <div className="main-content"> {/* Reuse the main-content container for centering/padding */}
                {/* Social Icons */}
                <center>
                    <div className="social-links">
                        <a href="#" aria-label="Facebook"><Facebook /></a>
                        <a href="#" aria-label="Twitter"><Twitter /></a>
                        <a href="#" aria-label="Instagram"><Instagram /></a>
                    </div>

                    {/* Links Grid */}
                    <div className="footer-grid">
                        {footerLinks.map((link, index) => (
                            <a key={index} href={link.href} className="footer-link">
                                {link.title}
                            </a>
                        ))}
                    </div>

                    {/* Service Code Button (Mock) */}
                    <div className="service-code-section">
                        <button className="service-code-btn">
                            Service Code: SV-777-360
                        </button>
                    </div>

                    {/* Copyright and Info */}
                    
                    <p className="footer-copyright">
                        &copy; 2025 Stream-Verse. All rights reserved.
                    </p>
                </center>
            </div>
        </footer>
    );
};

export default Footer;