import type { Metadata } from 'next';
import './page.css';

export const metadata: Metadata = {
  title: 'VoltGrid – F1 Predictions',
  description: 'Make your driver matchup predictions for the next Grand Prix.',
};

import React from 'react'
import PredictionTabs from '@/components/prediction-tabs'

const BetPage = () => {
    return (
        <div className="bet-now-container1">
            <main className="f1-bet-page" style={{ paddingTop: '80px', paddingBottom: '80px' }}>
                <section className="f1-bet-shell">
                    <header className="f1-bet-header">
                        <p className="f1-bet-eyebrow">F1 // PREDICTIONS</p>
                        <h1 className="f1-bet-title">Bet Now</h1>
                        <p className="f1-bet-description">
                            Make your driver matchup predictions for the next Grand Prix. Pick
                            the driver you expect to finish ahead in every head-to-head.
                        </p>
                        <section aria-label="Race status" className="f1-race-status">
                            <p className="f1-race-status-label">UPCOMING RACE</p>
                            <p className="f1-race-status-detail">Miami Grand Prix</p>
                            <div aria-hidden="true" className="f1-race-status-divider"></div>
                            <p className="f1-race-status-label">
                                PICKS CLOSE BEFORE LIGHTS OUT
                            </p>
                        </section>
                    </header>
                    <PredictionTabs />
                    <p className="f1-responsible-notice">
                        Play responsibly. Predictions are for entertainment only — know your limits.
                    </p>
                </section>
            </main>
        </div>
    )
}

export default BetPage;
