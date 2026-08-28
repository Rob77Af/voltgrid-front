"use client";
import React, { useState } from 'react';
import Settings from '@/components/settings';

export default function SuperlicensePage() {
    const [showSettings, setShowSettings] = useState(false);

    return (
        <main className="w-full max-w-6xl mx-auto p-4 md:p-8 pt-12 pb-24 flex flex-col items-center justify-start min-h-screen">
            {!showSettings ? (
                <div className="flex flex-col items-center justify-center h-[50vh] gap-6">
                    <h1 className="text-4xl md:text-5xl font-black uppercase tracking-wider font-display text-black dark:text-white">Superlicense</h1>
                    <button 
                        onClick={() => setShowSettings(true)}
                        className="bg-[#fbaa19] text-black border-2 border-[#fbaa19] px-8 py-4 font-bold uppercase tracking-widest text-sm transition-colors hover:bg-black hover:text-[#fbaa19] dark:hover:bg-white dark:hover:text-black dark:hover:border-white"
                    >
                        System Settings
                    </button>
                </div>
            ) : (
                <div className="w-full">
                    <div className="mb-4 flex justify-start">
                        <button 
                            onClick={() => setShowSettings(false)}
                            className="text-gray-500 hover:text-black dark:hover:text-white flex items-center gap-2 uppercase tracking-widest text-xs font-bold transition-colors"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                            </svg>
                            Back to Superlicense
                        </button>
                    </div>
                    <Settings />
                </div>
            )}
        </main>
    );
}
