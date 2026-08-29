"use client";
import React, { useState } from 'react';
import CompetitionsRemoteControl from '@/components/competitions-remote-control';
import TeamworkCompetition from '@/components/teamwork-competition';

const FANTASY_TABS = [
    { id: 'race-results', label: 'Race Results' },
    { id: 'ranking', label: 'Ranking' },
    { id: 'stats', label: 'Stats' },
    { id: 'rules', label: 'Rules' }
];

export default function FantasyClient() {
    const [activeId, setActiveId] = useState('poletime-competition');
    const [activeTab, setActiveTab] = useState('race-results');

    const renderContent = () => {
        if (activeId === 'teamwork') {
            return <TeamworkCompetition activeTab={activeTab} />;
        }
        
        return (
            <div className="bg-white dark:bg-[#1a1a1a] border border-black/20 dark:border-[#ffffff3d] p-4 md:p-6 rounded-sm">
                {activeTab === 'race-results' && (
                    <div className="p-12 text-center flex flex-col items-center justify-center gap-4">
                        <svg className="w-12 h-12 text-[#fbaa19]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                        <h3 className="text-xl font-bold text-black dark:text-white uppercase tracking-widest">{getCompetitionTitle(activeId)} Results</h3>
                        <p className="text-gray-500">Awaiting official session results.</p>
                    </div>
                )}
                {activeTab === 'ranking' && (
                    <div className="p-12 text-center flex flex-col items-center justify-center gap-4">
                        <svg className="w-12 h-12 text-[#fbaa19]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path></svg>
                        <h3 className="text-xl font-bold text-black dark:text-white uppercase tracking-widest">Global Ranking</h3>
                        <p className="text-gray-500">Championship standings will be updated shortly.</p>
                    </div>
                )}
                {activeTab === 'stats' && (
                    <div className="p-12 text-center flex flex-col items-center justify-center gap-4">
                        <svg className="w-12 h-12 text-[#fbaa19]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg>
                        <h3 className="text-xl font-bold text-black dark:text-white uppercase tracking-widest">Analytics</h3>
                        <p className="text-gray-500">Performance data is currently being processed.</p>
                    </div>
                )}
                {activeTab === 'rules' && (
                    <div className="p-12 text-center flex flex-col items-center justify-center gap-4">
                        <svg className="w-12 h-12 text-[#fbaa19]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"></path></svg>
                        <h3 className="text-xl font-bold text-black dark:text-white uppercase tracking-widest">Competition Rules</h3>
                        <p className="text-gray-500">Official rules and point distributions for {getCompetitionTitle(activeId)}.</p>
                    </div>
                )}
            </div>
        );
    };

    const getCompetitionTitle = (id: string) => {
        switch (id) {
            case 'poletime-competition': return 'POLETIME COMPETITION';
            case 'master-competition': return 'MASTER COMPETITION';
            case 'milesimus': return 'MILESIMUS';
            case 'teamwork': return 'TEAMWORK';
            case 'stats': return 'GLOBAL STATS';
            default: return 'COMPETITIONS';
        }
    };

    return (
        <div className="flex flex-col gap-8">
            <header className="mb-4 border-b-4 border-[#fbaa19] pb-6 md:pb-8 flex flex-col gap-4">
                <p className="text-[#fbaa19] text-sm md:text-base font-bold uppercase tracking-[0.2em] font-display">F1 // FANTASY</p>
                <h1 className="text-black dark:text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black uppercase tracking-widest font-display mb-2">
                    {getCompetitionTitle(activeId)}
                </h1>
                <p className="text-gray-600 dark:text-gray-400 text-base md:text-lg max-w-2xl">
                    Select a competition below to view your standing and global performance.
                </p>
            </header>

            <CompetitionsRemoteControl activeId={activeId} setActiveId={setActiveId} />
            
            {/* Global Fantasy Sub-menu */}
            <div className="flex flex-wrap border-b border-black/20 dark:border-[#ffffff3d] gap-2 md:gap-4 mt-2">
                {FANTASY_TABS.map(tab => (
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

            <section className="mt-2" aria-live="polite">
                {renderContent()}
            </section>
        </div>
    );
}
