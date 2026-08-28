"use client";
import React, { useState } from 'react';
import CompetitionsRemoteControl from '@/components/competitions-remote-control';

export default function FantasyClient() {
    const [activeId, setActiveId] = useState('poletime-competition');

    const renderContent = () => {
        switch (activeId) {
            case 'poletime-competition':
                return <div className="p-8 text-center text-gray-500 font-bold uppercase tracking-widest border border-black/20 dark:border-[#ffffff3d] bg-white dark:bg-[#1a1a1a]">Poletime Competition Content</div>;
            case 'master-competition':
                return <div className="p-8 text-center text-gray-500 font-bold uppercase tracking-widest border border-black/20 dark:border-[#ffffff3d] bg-white dark:bg-[#1a1a1a]">Master Competition Content</div>;
            case 'milesimus':
                return <div className="p-8 text-center text-gray-500 font-bold uppercase tracking-widest border border-black/20 dark:border-[#ffffff3d] bg-white dark:bg-[#1a1a1a]">Milesimus Content</div>;
            case 'teamwork':
                return <div className="p-8 text-center text-gray-500 font-bold uppercase tracking-widest border border-black/20 dark:border-[#ffffff3d] bg-white dark:bg-[#1a1a1a]">Teamwork Content</div>;
            default:
                return null;
        }
    };

    return (
        <div className="flex flex-col gap-8">
            <header className="mb-4 border-b-4 border-[#fbaa19] pb-6 md:pb-8 flex flex-col gap-4">
                <p className="text-[#fbaa19] text-sm md:text-base font-bold uppercase tracking-[0.2em] font-display">F1 // FANTASY</p>
                <h1 className="text-black dark:text-white text-5xl md:text-7xl font-black uppercase tracking-widest font-display mb-2">COMPETITIONS</h1>
                <p className="text-gray-600 dark:text-gray-400 text-base md:text-lg max-w-2xl">
                    Select a competition below to view your standing and global performance.
                </p>
            </header>

            <CompetitionsRemoteControl activeId={activeId} setActiveId={setActiveId} />
            
            <section className="mt-4" aria-live="polite">
                {renderContent()}
            </section>
        </div>
    );
}
