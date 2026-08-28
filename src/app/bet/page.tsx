import type { Metadata } from 'next';
import '../page.css';

export const metadata: Metadata = {
  title: 'VoltGrid – F1 Predictions',
  description: 'Make your driver matchup predictions for the next Grand Prix.',
};

import React from 'react'
import PredictionTabs from '@/components/prediction-tabs'

const BetPage = () => {
    return (
        <div className="w-full flex flex-col items-center">
            <main className="w-full max-w-6xl mx-auto p-4 md:p-8 pt-24 pb-24 transition-colors">
                <section className="flex flex-col w-full">
                    <header className="mb-8 md:mb-12 border-b-4 border-[#fbaa19] pb-6 md:pb-8 flex flex-col gap-4">
                        <p className="text-[#fbaa19] text-sm md:text-base font-bold uppercase tracking-[0.2em] font-display">F1 // PREDICTIONS</p>
                        <h1 className="text-black dark:text-white text-5xl md:text-7xl font-black uppercase tracking-widest font-display mb-2">Bet Now</h1>
                        <p className="text-gray-600 dark:text-gray-400 text-base md:text-lg max-w-2xl">
                            Make your driver matchup predictions for the next Grand Prix. Pick
                            the driver you expect to finish ahead in every head-to-head.
                        </p>
                        <section aria-label="Race status" className="mt-6 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 bg-white dark:bg-[#1a1a1a] border border-black/20 dark:border-[#ffffff3d] p-4 md:p-6 shadow-sm">
                            <div className="flex flex-col">
                                <p className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-1">UPCOMING RACE</p>
                                <p className="text-black dark:text-white text-xl md:text-2xl font-black uppercase tracking-wider font-display">Miami Grand Prix</p>
                            </div>
                            <div aria-hidden="true" className="hidden sm:block w-px h-12 bg-black/20 dark:bg-white/20"></div>
                            <p className="text-[#fbaa19] text-sm font-bold uppercase tracking-widest flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-[#fbaa19] animate-pulse"></span>
                                PICKS CLOSE BEFORE LIGHTS OUT
                            </p>
                        </section>
                    </header>
                    <PredictionTabs />
                    <p className="text-center mt-12 text-sm text-gray-500 font-medium uppercase tracking-widest max-w-lg mx-auto">
                        Play responsibly. Predictions are for entertainment only — know your limits.
                    </p>
                </section>
            </main>
        </div>
    )
}

export default BetPage;
