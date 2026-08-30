"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import Calendar from '@/components/calendar';
import { mockCalendar } from '@/api/f1-data';

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
                const threshold = window.innerWidth >= 768 ? 83 : 67;
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
                className={`w-full sticky top-[66px] md:top-[82px] z-40 transition-all duration-300 mb-8 ${
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
                    <div className="flex flex-col gap-6">
                        <div className="flex justify-between items-end">
                            <div>
                                <h2 className="text-black dark:text-white font-bold uppercase tracking-widest text-2xl">Season Results</h2>
                                <p className="text-gray-500 text-sm mt-1">Select a completed race to view full session timings and results.</p>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                            {mockCalendar.map((race, index) => {
                                // Simulate that the first 3 races are completed
                                const isCompleted = index < 3; 
                                return (
                                    <div key={race.id} className={`border-2 p-4 flex flex-col gap-3 transition-colors ${
                                        isCompleted 
                                            ? 'border-black/20 dark:border-white/20 hover:border-[#fbaa19] bg-white dark:bg-[#111]' 
                                            : 'border-black/5 dark:border-white/5 bg-gray-50 dark:bg-black/20 opacity-60 grayscale'
                                    }`}>
                                        <div className="flex justify-between items-start">
                                            <span className={`text-xs font-black uppercase tracking-widest ${isCompleted ? 'text-[#fbaa19]' : 'text-gray-400'}`}>ROUND {race.round}</span>
                                            <span className="text-[10px] text-gray-500 font-mono">{race.date.split(' - ')[1] || race.date}</span>
                                        </div>
                                        <h3 className="font-bold text-black dark:text-white uppercase tracking-wider text-sm leading-tight">{race.name}</h3>
                                        <div className="mt-auto pt-4 flex">
                                            {isCompleted ? (
                                                <Link 
                                                    href={`/f1-results/${race.round}`}
                                                    className="text-xs font-bold uppercase tracking-widest text-black dark:text-white bg-[#fbaa19] w-full text-center py-2 hover:bg-black hover:text-[#fbaa19] transition-colors"
                                                >
                                                    View Results
                                                </Link>
                                            ) : (
                                                <div className="text-xs font-bold uppercase tracking-widest text-gray-400 border-2 border-gray-200 dark:border-gray-800 w-full text-center py-2">
                                                    Awaiting
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
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
