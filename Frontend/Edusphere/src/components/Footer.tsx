import React from 'react';
import logo from '../assets/logo1.png'
import { Link } from "react-router-dom";

const Footer = () => {
    const projectLinks = [
        { label: 'About the Project', href: '/about' },
        { label: 'Features', href: '/features' },
        { label: 'Docs or Demo', href: 'https://yourdemo.com' },
        { label: 'GitHub Repository', href: 'https://github.com/yourrepo' },
        { label: 'Privacy Policy / Terms', href: '/privacy' },
    ];

    const developerLinks = [
        { label: 'Portfolio', href: 'https://yourportfolio.com' },
        { label: 'Resume', href: 'https://yourresume.com' },
        { label: 'GitHub', href: 'https://github.com/yourusername' },
        { label: 'LinkedIn', href: 'https://linkedin.com/in/yourprofile' },
        { label: 'Email', href: 'mailto:youremail@example.com' },
        // Optional
        { label: 'Twitter', href: 'https://twitter.com/yourhandle' },
    ];

    const FooterColumn = ({ title, links }: { title: string; links: { label: string; href: string }[] }) => (
        <div className="flex flex-col space-y-2">
            <h3 className="text-white font-medium text-lg mb-2">{title}</h3>
            <ul className="space-y-2">
                {links.map((link, index) => (
                    <li key={index}>
                        <a
                            href={link.href}
                            target="_blank"
                            rel="noreferrer"
                            className="text-gray-300 hover:text-[#9b87f5] text-sm transition-colors"
                        >
                            {link.label}
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );

    return (
        <footer className="bg-[#0D0A19] border-t border-[#1A1A2E]/30 pt-16 pb-8 px-6 md:px-10">
            <div className="max-w-7xl mx-auto">
                {/* Three Column Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    {/* Logo & Description */}
                    <div>
                        <div className="flex items-center gap-2 mb-4">
                            {/* <div className="w-10 h-10 rounded-md bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center"> */}
                            {/* <span className="text-white font-bold text-xl">F</span> */}
                            <Link to="/" className="text-2xl font-bold mr-8">
                                <img src={logo} alt="logo" className="w-[4rem] h-[4rem]" />
                            </Link>
                            {/* </div> */}
                            <span className="text-white font-bold text-xl">Edusphere</span>
                        </div>
                        <p className="text-gray-300 text-sm max-w-sm">
                            Skip the search, find dream learning opportunities with verified courses, secure payments, and seamless learning workflows.
                        </p>
                    </div>

                    {/* Project Info */}
                    <FooterColumn title=" Project Info" links={projectLinks} />

                    {/* Developer Info */}
                    <FooterColumn title=" Developer Info" links={developerLinks} />
                </div>

                {/* Bottom Section */}
                <div className="mt-16 pt-8 border-t border-[#1A1A2E]/30 text-center text-gray-500 text-sm">
                    © 2025 Edusphere. All rights reserved. <br />
                    Built with ❤️ to transform learning through innovation and technology.

                </div>
            </div>
        </footer>
    );
};

export default Footer;
