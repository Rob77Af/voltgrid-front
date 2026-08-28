"use client";
import React, { useState } from 'react';
import Settings from '@/components/settings';
import Calendar from '@/components/calendar';

export default function SuperlicensePage() {
    const [activeView, setActiveView] = useState<'menu' | 'settings' | 'calendar'>('menu');

    return (
        <main className="w-full max-w-6xl mx-auto p-4 md:p-8 pt-12 pb-24 flex flex-col items-center justify-start min-h-screen">
            {activeView === 'menu' ? (
                <div className="flex flex-col items-center justify-center h-[50vh] gap-6">
                    <h1 className="text-4xl md:text-5xl font-black uppercase tracking-wider font-display text-black dark:text-white mb-4">Superlicense</h1>
                    
                    <button 
                        onClick={() => setActiveView('calendar')}
                        className="w-64 bg-white dark:bg-black text-black dark:text-white border-2 border-[#fbaa19] px-8 py-4 font-bold uppercase tracking-widest text-sm transition-colors hover:bg-[#fbaa19] hover:text-black"
                    >
                        F1 Calendar
                    </button>
                    
                    <button 
                        onClick={() => setActiveView('settings')}
                        className="w-64 bg-[#fbaa19] text-black border-2 border-[#fbaa19] px-8 py-4 font-bold uppercase tracking-widest text-sm transition-colors hover:bg-black hover:text-[#fbaa19] dark:hover:bg-white dark:hover:text-black dark:hover:border-white"
                    >
                        System Settings
                    </button>
                </div>
            ) : (
                <div className="w-full">
                    <div className="mb-4 flex justify-start">
                        <button 
                            onClick={() => setActiveView('menu')}
                            className="text-gray-500 hover:text-black dark:hover:text-white flex items-center gap-2 uppercase tracking-widest text-xs font-bold transition-colors"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                            </svg>
                            Back to Superlicense
                        </button>
                    </div>
                    {activeView === 'settings' && <Settings />}
                    {activeView === 'calendar' && <Calendar />}
                </div>
            )}
        </main>
    );
}
