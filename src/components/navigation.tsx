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
        <div className="w-full">
            <nav className="sticky top-0 z-50 w-full transition-colors border-b-2 border-[#fbaa19] bg-white dark:bg-black">
                {/* Background texture overlay */}
                <div className="absolute inset-0 z-0 opacity-10 dark:opacity-[0.08] pointer-events-none mix-blend-overlay" style={{ backgroundImage: 'url("https://images.pexels.com/photos/6159693/pexels-photo-6159693.jpeg?auto=compress&cs=tinysrgb&h=650&w=940")', backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
                
                <div className="relative z-10 flex items-center justify-between w-full h-16 md:h-20 max-w-7xl mx-auto px-4 md:px-8">
                    {/* LEFT: Logo */}
                    <div className="flex items-center">
                        <Link href="/" className="flex items-center h-8">
                            <div className="flex items-center h-full">
                                <div className="block dark:hidden"><Logo isOnDarkBackground={false} /></div>
                                <div className="hidden dark:block"><Logo isOnDarkBackground={true} /></div>
                            </div>
                        </Link>
                    </div>

                    {/* CENTER: Links (Desktop) */}
                    <div className="hidden md:flex items-center gap-8">
                        {navLinks.map((link, index) => (
                            <Link 
                                key={index} 
                                href={link.href}
                                className="text-black dark:text-white text-sm font-semibold uppercase tracking-widest hover:text-[#fbaa19] dark:hover:text-[#fbaa19] transition-colors"
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>

                    {/* RIGHT: Buttons & Controls */}
                    <div className="flex items-center gap-4">
                        {/* Desktop Buttons */}
                        <div className="hidden md:flex items-center gap-4">
                            <Link 
                                href="/bet" 
                                className="bg-[#fbaa19] text-black border border-[#fbaa19] px-5 py-2 text-sm font-bold uppercase tracking-wider rounded-sm hover:bg-yellow-500 transition-colors"
                            >
                                Bet
                            </Link>
                            <Link 
                                href="/superlicense" 
                                className="bg-transparent text-black dark:text-white border border-black/20 dark:border-white/20 px-5 py-2 text-sm font-bold uppercase tracking-wider rounded-sm hover:border-[#fbaa19] hover:text-[#fbaa19] dark:hover:border-[#fbaa19] dark:hover:text-[#fbaa19] transition-colors"
                            >
                                Superlicense
                            </Link>
                        </div>

                        {/* Hamburger Menu Toggle (Mobile) */}
                        <div className="md:hidden flex items-center">
                            <button
                                aria-label="Open menu"
                                className="text-black dark:text-white p-2"
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
                    <div className="fixed inset-0 bg-white dark:bg-[#0a0a0a] z-[1100] p-6 flex flex-col overflow-y-auto">
                        <div className="flex items-center justify-between mb-12">
                            <Link href="/" onClick={() => setIsMobileMenuOpen(false)}>
                                <div className="block dark:hidden"><Logo isOnDarkBackground={false} /></div>
                                <div className="hidden dark:block"><Logo isOnDarkBackground={true} /></div>
                            </Link>
                            <button
                                aria-label="Close menu"
                                className="text-black dark:text-white p-2 hover:text-[#fbaa19] dark:hover:text-[#fbaa19] transition-colors"
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
                                    className="text-black dark:text-white text-2xl font-bold uppercase tracking-widest hover:text-[#fbaa19] dark:hover:text-[#fbaa19] transition-colors border-b border-black/10 dark:border-white/10 pb-4"
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </div>

                        <div className="mt-12 flex flex-col gap-4 pb-8">
                            <Link 
                                href="/bet" 
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="bg-[#fbaa19] text-black w-full text-center px-6 py-4 text-lg font-bold uppercase tracking-wider rounded-sm hover:bg-yellow-500 transition-colors"
                            >
                                Bet
                            </Link>
                            <Link 
                                href="/superlicense" 
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="bg-transparent text-black dark:text-white border-2 border-black/20 dark:border-white/20 w-full text-center px-6 py-4 text-lg font-bold uppercase tracking-wider rounded-sm hover:border-[#fbaa19] hover:text-[#fbaa19] dark:hover:border-[#fbaa19] dark:hover:text-[#fbaa19] transition-colors"
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
