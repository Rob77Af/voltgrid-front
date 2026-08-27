import type { Metadata } from 'next';
import './page.css';

export const metadata: Metadata = {
  title: 'VoltGrid – Racing Betting & Fantasy Game Platform',
  description: 'Experience Formula 1-inspired betting, fantasy gaming, and live dashboards.',
};

import React from 'react'



import F1BetRemoteControl from '@/components/f1-bet-remote-control'
import DriverMatchupPredictions from '@/components/driver-matchup-predictions'
// css imported globally

const BetNow = (props) => {
    return (
        <div className="bet-now-container1">
            
            <main className="f1-bet-page">
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
                    <F1BetRemoteControl></F1BetRemoteControl>
                    <section
                        aria-label="Driver matchup predictions"
                        className="f1-predictions-stage"
                    >
                        <DriverMatchupPredictions rootClassName="driver-matchup-predictionsroot-class-name"></DriverMatchupPredictions>
                    </section>
                    <p className="f1-responsible-notice">
                        Play responsibly. Predictions are for entertainment only — know your
                        limits.
                    </p>
                </section>
            </main>
            
        </div>
    )
}

export default BetNow
