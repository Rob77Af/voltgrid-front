"use client";
import React, { useState } from 'react';
import Calendar from '@/components/calendar';

const F1_TABS = [
    { id: 'calendar', label: 'Calendar' },
    { id: 'results', label: 'Results' },
    { id: 'ranking', label: 'Ranking' },
    { id: 'rumors', label: 'Transfer Rumors' }
];

export default function F1Page() {
    const [activeTab, setActiveTab] = useState('calendar');

    return (
        <main className="w-full max-w-6xl mx-auto p-4 md:p-8 pt-12 pb-24 flex flex-col items-center justify-start min-h-screen">
            <header className="w-full mb-8 border-b-4 border-[#fbaa19] pb-6 flex flex-col gap-4">
                <p className="text-[#fbaa19] text-sm md:text-base font-bold uppercase tracking-[0.2em] font-display">THE PINNACLE OF MOTORSPORT</p>
                <h1 className="text-black dark:text-white text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-widest font-display mb-2">
                    F1 HUB
                </h1>
                
                {/* Internal Tab Menu */}
                <div className="flex flex-wrap gap-2 md:gap-4 mt-4">
                    {F1_TABS.map(tab => (
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
            </header>
            
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
                {activeTab === 'rumors' && (
                    <div className="p-12 text-center flex flex-col items-center justify-center gap-4 bg-white dark:bg-[#1a1a1a] border border-black/20 dark:border-[#ffffff3d]">
                        <h3 className="text-xl font-bold text-black dark:text-white uppercase tracking-widest">Transfer Rumors</h3>
                        <p className="text-gray-500">Paddock whispers and driver market updates.</p>
                    </div>
                )}
            </div>
        </main>
    );
}
