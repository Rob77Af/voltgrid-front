"use client";
import React from 'react'

import Navigation from '../components/navigation'
import Footer from '../components/footer'
import F1BetRemoteControl from '../components/f1-bet-remote-control'
import DriverMatchupPredictions from '../components/driver-matchup-predictions'

const BetPage = () => {
    return (
        <div className="homepage-container1">
            <Navigation />
            
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
                    <F1BetRemoteControl />
                    <section
                        aria-label="Driver matchup predictions"
                        className="f1-predictions-stage"
                    >
                        <DriverMatchupPredictions rootClassName="driver-matchup-predictionsroot-class-name" />
                    </section>
                    <p className="f1-responsible-notice">
                        Play responsibly. Predictions are for entertainment only — know your limits.
                    </p>
                </section>
            </main>

            <Footer />
        </div>
    )
}

export default BetPage;
