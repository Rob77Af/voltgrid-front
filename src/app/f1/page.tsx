"use client";
import React, { useState } from 'react';
import Calendar from '@/components/calendar';

const F1_TABS = [
    { id: 'results', label: 'Race Results' },
    { id: 'ranking', label: 'Ranking' },
    { id: 'calendar', label: 'Calendar' },
    { id: 'teams', label: 'Teams' },
    { id: 'drivers', label: 'Drivers' },
    { id: 'stats', label: 'Stats' },
    { id: 'others', label: 'Others' }
];

export default function F1Page() {
    const [activeTab, setActiveTab] = useState('results');
    const [isStuck, setIsStuck] = useState(false);
    const menuRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        const handleScroll = () => {
            if (menuRef.current) {
                // If the top of the menu is at or below the sticky threshold (64px mobile, 80px desktop)
                const top = menuRef.current.getBoundingClientRect().top;
                const threshold = window.innerWidth >= 768 ? 81 : 65;
                setIsStuck(top <= threshold);
            }
        };
        
        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll(); // Check initially
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <main className="w-full max-w-6xl mx-auto p-4 md:p-8 pt-12 pb-24 flex flex-col items-center justify-start min-h-screen">
            <header className="w-full border-b-4 border-[#fbaa19] pb-6 flex flex-col gap-4">
                <p className="text-[#fbaa19] text-sm md:text-base font-bold uppercase tracking-[0.2em] font-display">THE PINNACLE OF MOTORSPORT</p>
                <h1 className="text-black dark:text-white text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-widest font-display mb-2">
                    F1 HUB
                </h1>
            </header>
            
            {/* Sticky Internal Tab Menu Wrapper */}
            <div 
                ref={menuRef}
                className={`w-full sticky top-[64px] md:top-[80px] z-40 transition-all duration-300 mb-8 ${
                    isStuck 
                        ? 'bg-gray-100 dark:bg-[#0a0a0a] py-1 shadow-sm border-b border-black/10 dark:border-white/10' 
                        : 'bg-gray-100 dark:bg-[#0a0a0a] pt-4'
                }`}
            >
                <div className={`flex flex-nowrap overflow-x-auto scrollbar-hide gap-1 md:gap-4 border-b border-black/20 dark:border-[#ffffff3d] transition-all duration-300 ${
                    isStuck ? 'pb-0 border-transparent dark:border-transparent' : 'pb-0'
                }`}>
                    {F1_TABS.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`uppercase font-bold tracking-widest transition-all duration-300 border-b-2 whitespace-nowrap shrink-0 ${
                                isStuck 
                                    ? 'pb-2 px-4 text-xs md:text-sm' 
                                    : 'pb-3 px-3 md:px-4 text-[10px] md:text-xs'
                            } ${
                                activeTab === tab.id 
                                ? 'text-[#fbaa19] border-[#fbaa19]' 
                                : 'text-gray-500 border-transparent hover:text-black dark:hover:text-white'
                            }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>
            </div>
            
            <div className="w-full">
                {activeTab === 'calendar' && <Calendar />}
                {activeTab === 'results' && (
                    <div className="p-12 text-center flex flex-col items-center justify-center gap-4 bg-white dark:bg-[#1a1a1a] border border-black/20 dark:border-[#ffffff3d]">
                        <h3 className="text-xl font-bold text-black dark:text-white uppercase tracking-widest">Official Results</h3>
                        <p className="text-gray-500">Race results and session times will be available here.</p>
                    </div>
                )}
                {activeTab === 'ranking' && (
                    <div className="p-12 text-center flex flex-col items-center justify-center gap-4 bg-white dark:bg-[#1a1a1a] border border-black/20 dark:border-[#ffffff3d]">
                        <h3 className="text-xl font-bold text-black dark:text-white uppercase tracking-widest">Drivers & Constructors Ranking</h3>
                        <p className="text-gray-500">Championship standings will be available here.</p>
                    </div>
                )}
                {activeTab === 'teams' && (
                    <div className="p-12 text-center flex flex-col items-center justify-center gap-4 bg-white dark:bg-[#1a1a1a] border border-black/20 dark:border-[#ffffff3d]">
                        <h3 className="text-xl font-bold text-black dark:text-white uppercase tracking-widest">Teams</h3>
                        <p className="text-gray-500">Constructors details and car specs.</p>
                    </div>
                )}
                {activeTab === 'drivers' && (
                    <div className="p-12 text-center flex flex-col items-center justify-center gap-4 bg-white dark:bg-[#1a1a1a] border border-black/20 dark:border-[#ffffff3d]">
                        <h3 className="text-xl font-bold text-black dark:text-white uppercase tracking-widest">Drivers</h3>
                        <p className="text-gray-500">Driver profiles and career statistics.</p>
                    </div>
                )}
                {activeTab === 'stats' && (
                    <div className="p-12 text-center flex flex-col items-center justify-center gap-4 bg-white dark:bg-[#1a1a1a] border border-black/20 dark:border-[#ffffff3d]">
                        <h3 className="text-xl font-bold text-black dark:text-white uppercase tracking-widest">Stats</h3>
                        <p className="text-gray-500">In-depth season analytics and records.</p>
                    </div>
                )}
                {activeTab === 'others' && (
                    <div className="p-12 text-center flex flex-col items-center justify-center gap-4 bg-white dark:bg-[#1a1a1a] border border-black/20 dark:border-[#ffffff3d]">
                        <h3 className="text-xl font-bold text-black dark:text-white uppercase tracking-widest">Others</h3>
                        <p className="text-gray-500">Additional information, rules, and rumors.</p>
                    </div>
                )}
            </div>
        </main>
    );
}
