"use client";
import React, { useState } from 'react';

const TEAMWORK_TABS = [
    { id: 'race-results', label: 'Race Results' },
    { id: 'ranking', label: 'Ranking' },
    { id: 'stats', label: 'Stats' },
    { id: 'rules', label: 'Rules' }
];

const MIAMI_RESULTS = [
    { pos: 1, team: 'Apex Predators', drivers: 'M.VERSTAPPEN / L.NORRIS', pts: 87, gap: 'LEADER' },
    { pos: 2, team: 'Scuderia Veloce', drivers: 'C.LECLERC / C.SAINZ', pts: 76, gap: '+11' },
    { pos: 3, team: 'Silver Arrows F1', drivers: 'G.RUSSELL / O.PIASTRI', pts: 65, gap: '+22' },
    { pos: 4, team: 'Neon Racing', drivers: 'S.PEREZ / Y.TSUNODA', pts: 54, gap: '+33' },
    { pos: 5, team: 'Midnight Drivers', drivers: 'A.ALBON / F.ALONSO', pts: 42, gap: '+45' },
];

export default function TeamworkCompetition() {
    const [activeTab, setActiveTab] = useState('race-results');

    return (
        <div className="w-full flex flex-col gap-6">
            {/* Header / Sub-nav */}
            <div className="flex flex-wrap border-b border-black/20 dark:border-[#ffffff3d] gap-2 md:gap-4">
                {TEAMWORK_TABS.map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`pb-3 px-2 md:px-4 uppercase font-bold tracking-widest text-xs md:text-sm transition-colors border-b-2 ${
                            activeTab === tab.id 
                            ? 'text-[#fbaa19] border-[#fbaa19]' 
                            : 'text-gray-500 border-transparent hover:text-black dark:hover:text-white'
                        }`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Content Area */}
            <div className="bg-white dark:bg-[#1a1a1a] border border-black/20 dark:border-[#ffffff3d] p-4 md:p-6 rounded-sm">
                {activeTab === 'race-results' && (
                    <div className="flex flex-col overflow-x-auto">
                        <div className="mb-6">
                            <h2 className="text-xl md:text-2xl font-black uppercase tracking-wider text-black dark:text-white">Miami Grand Prix</h2>
                            <p className="text-sm text-[#fbaa19] font-bold tracking-widest uppercase">Official Teamwork Results</p>
                        </div>
                        
                        <div className="min-w-[600px]">
                            {/* Table Header */}
                            <div className="grid grid-cols-12 gap-4 border-b-2 border-black/20 dark:border-[#ffffff3d] pb-3 mb-3 text-xs md:text-sm text-gray-500 uppercase tracking-widest font-bold">
                                <div className="col-span-1 text-center">POS</div>
                                <div className="col-span-4">Fantasy Team</div>
                                <div className="col-span-4">Drivers</div>
                                <div className="col-span-1 text-right">PTS</div>
                                <div className="col-span-2 text-right">GAP</div>
                            </div>

                            {/* Table Rows */}
                            <div className="flex flex-col gap-2">
                                {MIAMI_RESULTS.map((row, idx) => (
                                    <div 
                                        key={idx} 
                                        className="grid grid-cols-12 gap-4 items-center bg-gray-50 dark:bg-[#0a0a0a] border border-black/10 dark:border-[#ffffff1a] p-3 hover:border-[#fbaa19] transition-colors"
                                    >
                                        <div className="col-span-1 text-center font-bold text-black dark:text-white">
                                            {row.pos}
                                        </div>
                                        <div className="col-span-4 font-bold text-black dark:text-white uppercase tracking-wider text-sm">
                                            {row.team}
                                        </div>
                                        <div className="col-span-4 text-gray-600 dark:text-gray-400 text-xs tracking-wider">
                                            {row.drivers}
                                        </div>
                                        <div className="col-span-1 text-right font-mono font-bold text-[#00ff88]">
                                            {row.pts}
                                        </div>
                                        <div className="col-span-2 text-right font-mono text-gray-500 text-xs">
                                            {row.gap}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'ranking' && (
                    <div className="p-12 text-center flex flex-col items-center justify-center gap-4">
                        <svg className="w-12 h-12 text-[#fbaa19]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
                        </svg>
                        <h3 className="text-xl font-bold text-black dark:text-white uppercase tracking-widest">Global Ranking</h3>
                        <p className="text-gray-500">Championship standings will be available after Round 1.</p>
                    </div>
                )}

                {activeTab === 'stats' && (
                    <div className="p-12 text-center flex flex-col items-center justify-center gap-4">
                        <svg className="w-12 h-12 text-[#fbaa19]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                        </svg>
                        <h3 className="text-xl font-bold text-black dark:text-white uppercase tracking-widest">Team Analytics</h3>
                        <p className="text-gray-500">Performance data is currently being processed.</p>
                    </div>
                )}

                {activeTab === 'rules' && (
                    <div className="p-12 text-center flex flex-col items-center justify-center gap-4">
                        <svg className="w-12 h-12 text-[#fbaa19]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"></path>
                        </svg>
                        <h3 className="text-xl font-bold text-black dark:text-white uppercase tracking-widest">Competition Rules</h3>
                        <p className="text-gray-500">Select two drivers. Your points are the sum of their official race points.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
