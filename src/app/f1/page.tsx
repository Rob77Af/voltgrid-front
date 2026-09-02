"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import Calendar from '@/components/calendar';
import { mockCalendar } from '@/api/f1-data';
import RaceRemoteControl from '@/components/race-remote-control';

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
    const [activeResultRound, setActiveResultRound] = useState('03'); // Default to last mock active event
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

    const currentRace = mockCalendar.find(r => r.round === activeResultRound) || mockCalendar[2];

    return (
        <main className="w-full max-w-6xl mx-auto p-4 md:p-8 pt-12 pb-24 flex flex-col items-center justify-start min-h-screen">
            <header className="w-full border-b-4 border-[#fbaa19] pb-6 flex flex-col gap-4">
                <p className="text-[#fbaa19] text-sm md:text-base font-bold uppercase tracking-[0.2em] font-display">THE PINNACLE OF MOTORSPORT</p>
                <h1 className="text-black dark:text-white text-4xl sm:text-5xl md:text-5xl lg:text-5xl font-black uppercase tracking-widest font-display mb-2">
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
                    <div className="flex flex-col gap-6 w-full">
                        <div className="flex flex-col gap-2">
                            <h2 className="text-black dark:text-white font-bold uppercase tracking-widest text-2xl">Season Results</h2>
                            <p className="text-gray-500 text-sm">Select a race to view full session timings and classifications.</p>
                        </div>
                        
                        {/* Selected Option 2: Horizontal Remote Control */}
                        <RaceRemoteControl 
                            activeRound={activeResultRound} 
                            baseUrl="#" 
                            onRoundSelect={(round) => setActiveResultRound(round)} 
                        />

                        {/* Inline Race Classification */}
                        <div className="w-full flex flex-col gap-4 border border-black/20 dark:border-[#ffffff3d] bg-white dark:bg-[#1a1a1a] p-4 md:p-8 mt-4">
                            <div className="flex justify-between items-end border-b border-black/10 dark:border-white/10 pb-4">
                                <div>
                                    <h3 className="font-bold text-xl uppercase tracking-widest text-black dark:text-white">
                                        RACE CLASSIFICATION
                                    </h3>
                                    <p className="text-[#fbaa19] font-bold text-sm tracking-widest uppercase mt-1">{currentRace.name}</p>
                                </div>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left text-sm whitespace-nowrap">
                                    <thead className="text-xs uppercase tracking-widest text-gray-500 border-b border-black/10 dark:border-white/10">
                                        <tr>
                                            <th className="py-3 px-4">Pos</th>
                                            <th className="py-3 px-4">Driver</th>
                                            <th className="py-3 px-4">Team</th>
                                            <th className="py-3 px-4">Time/Retired</th>
                                            <th className="py-3 px-4">Pts</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className="border-b border-black/5 dark:border-white/5 hover:bg-gray-50 dark:hover:bg-black/40">
                                            <td className="py-3 px-4 font-bold">1</td>
                                            <td className="py-3 px-4 font-bold text-black dark:text-white">M. VERSTAPPEN</td>
                                            <td className="py-3 px-4 text-gray-500">Red Bull Racing</td>
                                            <td className="py-3 px-4 font-mono">1:31:44.742</td>
                                            <td className="py-3 px-4 font-bold text-[#fbaa19]">26</td>
                                        </tr>
                                        <tr className="border-b border-black/5 dark:border-white/5 hover:bg-gray-50 dark:hover:bg-black/40">
                                            <td className="py-3 px-4 font-bold">2</td>
                                            <td className="py-3 px-4 font-bold text-black dark:text-white">S. PÉREZ</td>
                                            <td className="py-3 px-4 text-gray-500">Red Bull Racing</td>
                                            <td className="py-3 px-4 font-mono">+22.457s</td>
                                            <td className="py-3 px-4 font-bold text-[#fbaa19]">18</td>
                                        </tr>
                                        <tr className="border-b border-black/5 dark:border-white/5 hover:bg-gray-50 dark:hover:bg-black/40">
                                            <td className="py-3 px-4 font-bold">3</td>
                                            <td className="py-3 px-4 font-bold text-black dark:text-white">C. SAINZ</td>
                                            <td className="py-3 px-4 text-gray-500">Ferrari</td>
                                            <td className="py-3 px-4 font-mono">+25.110s</td>
                                            <td className="py-3 px-4 font-bold text-[#fbaa19]">15</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
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
