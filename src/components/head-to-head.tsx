"use client";
import React from 'react';
import { F1_MATCHUPS } from '@/api/f1-data';
import { usePredictionStore } from '@/store/usePredictionStore';
import './driver-matchup-predictions.css';

const HeadToHead = (props: any) => {
    const picks = usePredictionStore(state => state.h2h);
    const setPicks = usePredictionStore(state => state.setH2H);

    const handlePick = (matchupId: string, driverNum: string) => {
        setPicks(prev => ({ ...prev, [matchupId]: driverNum }));
    };

    const countPicks = Object.keys(picks).length;

    return (
        <div className={`driver-matchup-predictions-container ${props.rootClassName || ''}`}>
            <section className="f1-predictions-panel">
                <header className="f1-predictions-header">
                    <p className="f1-predictions-kicker">F1 PREDICTION MARKET</p>
                    <h2 className="f1-predictions-title">DRIVER MATCHUP PREDICTIONS</h2>
                    <p className="f1-predictions-instruction">
                        Choose the driver you expect to finish ahead in each matchup.
                    </p>
                    <p className="f1-race-label">NEXT RACE · MIAMI GRAND PRIX</p>
                </header>
                <div className="f1-matchup-grid">
                    {F1_MATCHUPS.map(m => {
                        const picked = picks[m.id];
                        return (
                            <article key={m.id} className="f1-matchup-card">
                                <p className="f1-matchup-label">{m.team}</p>
                                <div className="f1-driver-options">
                                    <button
                                        type="button"
                                        onClick={() => handlePick(m.id, m.d1.num)}
                                        className={picked === m.d1.num ? "f1-driver-option-selected f1-driver-option" : "f1-driver-option"}
                                    >
                                        <span className="f1-driver-number">{m.d1.num}</span>
                                        <span className="f1-driver-details">
                                            <span className="f1-driver-name">{m.d1.name}</span>
                                            <span className="f1-driver-team">{m.team}</span>
                                        </span>
                                        {picked === m.d1.num && <span className="f1-choice-status">YOUR PICK</span>}
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => handlePick(m.id, m.d2.num)}
                                        className={picked === m.d2.num ? "f1-driver-option-selected f1-driver-option" : "f1-driver-option"}
                                    >
                                        <span className="f1-driver-number">{m.d2.num}</span>
                                        <span className="f1-driver-details">
                                            <span className="f1-driver-name">{m.d2.name}</span>
                                            <span className="f1-driver-team">{m.team}</span>
                                        </span>
                                        {picked === m.d2.num && <span className="f1-choice-status">YOUR PICK</span>}
                                    </button>
                                </div>
                            </article>
                        );
                    })}
                </div>
                <footer className="f1-predictions-summary">
                    <p className="f1-summary-copy">{countPicks} of 11 picks locked in</p>
                    <button type="button" className="f1-submit-picks">
                        SUBMIT PICKS
                    </button>
                </footer>
            </section>
        </div>
    )
}

export default HeadToHead;
