"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Logo from './logo';

const Navigation = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Close menu when route changes or component mounts
    useEffect(() => {
        setIsMobileMenuOpen(false);
    }, []);

    const navLinks = [
        { name: 'F1', href: '#' },
        { name: 'News', href: '#' },
        { name: 'SocialMedia', href: '#' },
        { name: 'Fantasy', href: '#' }
    ];

    return (
        <div className="navigation-container1">
            <nav className="navigation-thq-navigation-section-elm navigation-section">
                <div className="navigation-texture"></div>
                <div className="navigation-bar flex items-center justify-between w-full">
                    {/* LEFT: Logo */}
                    <div className="navigation-left flex items-center">
                        <Link href="/" className="navigation-navlink1">
                            <div className="navigation-logo-link">
                                <Logo isOnDarkBackground />
                            </div>
                        </Link>
                    </div>

                    {/* CENTER: Links (Desktop) */}
                    <div className="hidden md:flex items-center gap-8">
                        {navLinks.map((link, index) => (
                            <Link 
                                key={index} 
                                href={link.href}
                                className="text-white text-sm font-semibold uppercase tracking-widest hover:text-[#fbff00] transition-colors"
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>

                    {/* RIGHT: Buttons & Controls */}
                    <div className="navigation-right flex items-center gap-4">
                        {/* Desktop Buttons */}
                        <div className="hidden md:flex items-center gap-4">
                            <Link 
                                href="/bet" 
                                className="bg-[#fbff00] text-black border border-[#fbff00] px-5 py-2 text-sm font-bold uppercase tracking-wider rounded-sm hover:bg-yellow-500 transition-colors"
                            >
                                Bet
                            </Link>
                            <Link 
                                href="/superlicense" 
                                className="bg-transparent text-[#fbff00] border border-[#fbff00] px-5 py-2 text-sm font-bold uppercase tracking-wider rounded-sm hover:bg-[#fbff00] hover:text-black transition-colors"
                            >
                                Superlicense
                            </Link>
                        </div>

                        {/* Hamburger Menu Toggle (Mobile) */}
                        <div className="md:hidden flex items-center">
                            <button
                                aria-label="Open menu"
                                className="text-white p-2"
                                onClick={() => setIsMobileMenuOpen(true)}
                            >
                                <svg fill="none" width="28" height="28" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round">
                                    <line x1="4" x2="20" y1="6" y2="6"></line>
                                    <line x1="4" x2="20" y1="12" y2="12"></line>
                                    <line x1="4" x2="20" y1="18" y2="18"></line>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                {/* MOBILE OVERLAY MENU */}
                {isMobileMenuOpen && (
                    <div className="fixed inset-0 bg-black z-[1100] p-6 flex flex-col overflow-y-auto">
                        <div className="flex items-center justify-between mb-12">
                            <Link href="/" onClick={() => setIsMobileMenuOpen(false)}>
                                <Logo isOnDarkBackground />
                            </Link>
                            <button
                                aria-label="Close menu"
                                className="text-white p-2"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                <svg fill="none" width="28" height="28" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round">
                                    <line x1="18" x2="6" y1="6" y2="18"></line>
                                    <line x1="6" x2="18" y1="6" y2="18"></line>
                                </svg>
                            </button>
                        </div>
                        
                        <div className="flex flex-col gap-6 flex-grow">
                            {navLinks.map((link, index) => (
                                <Link 
                                    key={index} 
                                    href={link.href}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="text-white text-2xl font-bold uppercase tracking-widest hover:text-[#fbff00] transition-colors border-b border-white/10 pb-4"
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </div>

                        <div className="mt-12 flex flex-col gap-4 pb-8">
                            <Link 
                                href="/bet" 
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="bg-[#fbff00] text-black w-full text-center px-6 py-4 text-lg font-bold uppercase tracking-wider rounded-sm hover:bg-yellow-500 transition-colors"
                            >
                                Bet
                            </Link>
                            <Link 
                                href="/superlicense" 
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="bg-transparent text-[#fbff00] border-2 border-[#fbff00] w-full text-center px-6 py-4 text-lg font-bold uppercase tracking-wider rounded-sm hover:bg-[#fbff00] hover:text-black transition-colors"
                            >
                                Superlicense
                            </Link>
                        </div>
                    </div>
                )}
            </nav>
        </div>
    );
};

export default Navigation;
