"use client";
import React, { useState } from 'react';

const matchups = [
  { id: 'm1', team: 'McLaren', d1: { num: '04', name: 'Lando Norris' }, d2: { num: '81', name: 'Oscar Piastri' }, defaultPick: '04' },
  { id: 'm2', team: 'Ferrari', d1: { num: '16', name: 'Charles Leclerc' }, d2: { num: '44', name: 'Lewis Hamilton' }, defaultPick: '44' },
  { id: 'm3', team: 'Mercedes', d1: { num: '63', name: 'George Russell' }, d2: { num: '12', name: 'Kimi Antonelli' }, defaultPick: '63' },
  { id: 'm4', team: 'Red Bull', d1: { num: '01', name: 'Max Verstappen' }, d2: { num: '06', name: 'Isack Hadjar' }, defaultPick: '06' },
  { id: 'm5', team: 'Aston Martin', d1: { num: '14', name: 'Fernando Alonso' }, d2: { num: '18', name: 'Lance Stroll' }, defaultPick: '14' },
  { id: 'm6', team: 'Alpine', d1: { num: '43', name: 'Franco Colapinto' }, d2: { num: '10', name: 'Pierre Gasly' }, defaultPick: '10' },
  { id: 'm7', team: 'Haas', d1: { num: '31', name: 'Esteban Ocon' }, d2: { num: '87', name: 'Oliver Bearman' }, defaultPick: '31' },
  { id: 'm8', team: 'Racing Bulls', d1: { num: '30', name: 'Liam Lawson' }, d2: { num: '41', name: 'Arvid Lindblad' }, defaultPick: '41' },
  { id: 'm9', team: 'Cadillac', d1: { num: '11', name: 'Sergio Pérez' }, d2: { num: '77', name: 'Valtteri Bottas' }, defaultPick: '11' },
  { id: 'm10', team: 'Williams', d1: { num: '23', name: 'Alex Albon' }, d2: { num: '55', name: 'Carlos Sainz' }, defaultPick: '55' },
  { id: 'm11', team: 'Audi/Sauber', d1: { num: '27', name: 'Nico Hülkenberg' }, d2: { num: '05', name: 'Gabriel Bortoleto' }, defaultPick: '27' },
];

const DriverMatchupPredictions = (props: any) => {
    // Initialize state with default picks
    const initialPicks = matchups.reduce((acc, m) => {
        acc[m.id] = m.defaultPick;
        return acc;
    }, {} as Record<string, string>);
    
    const [picks, setPicks] = useState(initialPicks);

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
                    {matchups.map(m => {
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

export default DriverMatchupPredictions;
