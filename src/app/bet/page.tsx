import type { Metadata } from 'next';
import '../page.css';

export const metadata: Metadata = {
  title: 'VoltGrid – F1 Predictions',
  description: 'Make your head to head predictions for the next Grand Prix.',
};

import React from 'react'
import PredictionTabs from '@/components/prediction-tabs'

const BetPage = () => {
    return (
        <div className="w-full flex flex-col items-center">
            <main className="w-full max-w-6xl mx-auto p-4 md:p-8 pt-12 pb-24 transition-colors">
                <section className="flex flex-col w-full gap-8">
                    <PredictionTabs />
                    <p className="text-center mt-4 text-sm text-gray-500 font-medium uppercase tracking-widest max-w-lg mx-auto">
                        Play responsibly. Predictions are for entertainment only — know your limits.
                    </p>
                </section>
            </main>
        </div>
    )
}

export default BetPage;
