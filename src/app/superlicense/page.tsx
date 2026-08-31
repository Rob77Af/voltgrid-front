"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import Settings from '@/components/settings';
import Calendar from '@/components/calendar';
import ReportForm from '@/components/report-form';

export default function SuperlicensePage() {
    const [activeView, setActiveView] = useState<'menu' | 'settings' | 'calendar' | 'report'>('menu');

    // Simulated states for dynamic buttons
    const [isSillySeasonOpen, setIsSillySeasonOpen] = useState(false); // Closed state
    const [hasVotingAlert, setHasVotingAlert] = useState(true); // Open state with ping
    const isVotingOpen = hasVotingAlert;

    return (
        <main className="w-full max-w-6xl mx-auto p-4 md:p-8 pt-12 pb-24 flex flex-col items-center justify-start min-h-screen">
            {activeView === 'menu' ? (
                <div className="flex flex-col items-center justify-center min-h-[50vh] py-8 gap-4 md:gap-6">
                    <h1 className="text-4xl md:text-5xl font-black uppercase tracking-wider font-display text-black dark:text-white mb-6">Superlicense</h1>
                    
                    <Link 
                        href="/bet?tab=all-forms"
                        className="w-64 text-center bg-black dark:bg-[#1a1a1a] text-white border-2 border-black dark:border-[#1a1a1a] px-8 py-4 font-bold uppercase tracking-widest text-sm transition-colors hover:bg-white hover:text-black dark:hover:bg-white dark:hover:text-black"
                    >
                        Setup
                    </Link>

                    <button 
                        onClick={() => setActiveView('report')}
                        className="w-64 bg-transparent text-black dark:text-white border-2 border-black/20 dark:border-white/20 px-8 py-4 font-bold uppercase tracking-widest text-sm transition-colors hover:border-[#fbaa19] hover:text-[#fbaa19]"
                    >
                        Report
                    </button>

                    {/* Silly Season Button */}
                    <button 
                        disabled={!isSillySeasonOpen}
                        className={`w-64 border-2 px-8 py-4 font-bold uppercase tracking-widest text-sm transition-all relative flex items-center justify-center gap-2 ${
                            isSillySeasonOpen 
                                ? "bg-white dark:bg-black text-black dark:text-white border-black/50 dark:border-white/50 hover:border-[#fbaa19] hover:text-[#fbaa19]" 
                                : "bg-gray-100 dark:bg-[#111] text-gray-400 dark:text-gray-600 border-gray-300 dark:border-[#333] cursor-not-allowed opacity-60"
                        }`}
                    >
                        Silly Season
                        {!isSillySeasonOpen && (
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                        )}
                    </button>

                    {/* My Temwork Button */}
                    <button 
                        className="w-64 bg-transparent text-black dark:text-white border-2 border-black/20 dark:border-white/20 px-8 py-4 font-bold uppercase tracking-widest text-sm transition-colors hover:border-[#fbaa19] hover:text-[#fbaa19]"
                    >
                        My Temwork
                    </button>

                    {/* Voting Button */}
                    <button 
                        disabled={!isVotingOpen}
                        className={`w-64 border-2 px-8 py-4 font-bold uppercase tracking-widest text-sm transition-all relative flex items-center justify-center gap-2 ${
                            isVotingOpen 
                                ? "bg-white dark:bg-black text-black dark:text-white border-black/50 dark:border-white/50 hover:border-[#fbaa19] hover:text-[#fbaa19]" 
                                : "bg-gray-100 dark:bg-[#111] text-gray-400 dark:text-gray-600 border-gray-300 dark:border-[#333] cursor-not-allowed opacity-60"
                        }`}
                    >
                        Voting
                        {hasVotingAlert && (
                            <span className="absolute top-0 right-0 -mt-1 -mr-1 flex h-4 w-4">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-4 w-4 bg-red-500 border-2 border-white dark:border-black"></span>
                            </span>
                        )}
                        {!isVotingOpen && (
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                        )}
                    </button>

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
                    {activeView === 'report' && <ReportForm />}
                </div>
            )}
        </main>
    );
}
