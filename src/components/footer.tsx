"use client";
import React from 'react'
import Link from 'next/link'



import Logo from './logo'
// css imported globally

const Footer = () => {
    const [mounted, setMounted] = React.useState(false);
    React.useEffect(() => setMounted(true), []);
    // Try to safely access the store outside of SSR to prevent hydration issues,
    // though for simple props it's often fine. We'll use a local var or require the hook.
    // Instead of importing the hook (which might conflict if I don't have it), let's just use CSS injection to hide/show the logos
    return (
        <footer className="w-full bg-white dark:bg-[#0a0a0a] border-t border-black/20 dark:border-[#ffffff3d] mt-16 transition-colors">
            <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-12">
                <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex flex-col items-center md:items-start gap-4">
                        <Link href="/">
                            <div className="scale-75 md:scale-100 origin-left">
                                {/* Use both logos and hide/show them via CSS to avoid hydration mismatch with useThemeStore */}
                                <div className="block dark:hidden"><Logo isOnDarkBackground={false} /></div>
                                <div className="hidden dark:block"><Logo isOnDarkBackground={true} /></div>
                            </div>
                        </Link>
                        <div className="flex items-center gap-2 text-gray-500 text-sm">
                            <svg fill="none" width="14" height="14" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                                <circle r="10" cx="12" cy="12"></circle>
                                <path d="M14.83 14.83a4 4 0 1 1 0-5.66"></path>
                            </svg>
                            <span>{new Date().getFullYear()} VoltGrid Telemetry. All rights reserved.</span>
                        </div>
                    </div>
                    
                    <nav aria-label="Legal navigation">
                        <ul className="flex flex-wrap justify-center gap-6 text-sm font-bold uppercase tracking-wider text-black dark:text-gray-400">
                            <li>
                                <span className="cursor-not-allowed opacity-50 hover:opacity-100 transition-opacity">Asset Registry</span>
                            </li>
                            <li>
                                <Link href="/terms-conditions" className="hover:text-[#fbaa19] transition-colors">Terms of Service</Link>
                            </li>
                            <li>
                                <Link href="/terms-conditions" className="hover:text-[#fbaa19] transition-colors">Privacy Policy</Link>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </footer>
    );
};

export default Footer
