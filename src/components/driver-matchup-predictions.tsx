"use client";
import React from 'react'



// css imported globally

const DriverMatchupPredictions = (props) => {
    return (
        <div
            className={`driver-matchup-predictions-container ${props.rootClassName} `}
        >
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
                    <article className="f1-matchup-card">
                        <p className="f1-matchup-label">McLaren</p>
                        <div className="f1-driver-options">
                            <button
                                type="button"
                                className="f1-driver-option-selected f1-driver-option"
                            >
                                <span className="f1-driver-number">04</span>
                                <span className="f1-driver-details">
                                    <span className="f1-driver-name">Lando Norris</span>
                                    <span className="f1-driver-team">McLaren</span>
                                </span>
                                <span className="f1-choice-status">YOUR PICK</span>
                            </button>
                            <button type="button" className="f1-driver-option">
                                <span className="f1-driver-number">81</span>
                                <span className="f1-driver-details">
                                    <span className="f1-driver-name">Oscar Piastri</span>
                                    <span className="f1-driver-team">McLaren</span>
                                </span>
                            </button>
                        </div>
                    </article>
                    <article className="f1-matchup-card">
                        <p className="f1-matchup-label">Ferrari</p>
                        <div className="f1-driver-options">
                            <button type="button" className="f1-driver-option">
                                <span className="f1-driver-number">16</span>
                                <span className="f1-driver-details">
                                    <span className="f1-driver-name">Charles Leclerc</span>
                                    <span className="f1-driver-team">Ferrari</span>
                                </span>
                            </button>
                            <button
                                type="button"
                                className="f1-driver-option-selected f1-driver-option"
                            >
                                <span className="f1-driver-number">44</span>
                                <span className="f1-driver-details">
                                    <span className="f1-driver-name">Lewis Hamilton</span>
                                    <span className="f1-driver-team">Ferrari</span>
                                </span>
                                <span className="f1-choice-status">YOUR PICK</span>
                            </button>
                        </div>
                    </article>
                    <article className="f1-matchup-card">
                        <p className="f1-matchup-label">Mercedes</p>
                        <div className="f1-driver-options">
                            <button
                                type="button"
                                className="f1-driver-option-selected f1-driver-option"
                            >
                                <span className="f1-driver-number">63</span>
                                <span className="f1-driver-details">
                                    <span className="f1-driver-name">George Russell</span>
                                    <span className="f1-driver-team">Mercedes</span>
                                </span>
                                <span className="f1-choice-status">YOUR PICK</span>
                            </button>
                            <button type="button" className="f1-driver-option">
                                <span className="f1-driver-number">12</span>
                                <span className="f1-driver-details">
                                    <span className="f1-driver-name">Kimi Antonelli</span>
                                    <span className="f1-driver-team">Mercedes</span>
                                </span>
                            </button>
                        </div>
                    </article>
                    <article className="f1-matchup-card">
                        <p className="f1-matchup-label">Red Bull</p>
                        <div className="f1-driver-options">
                            <button type="button" className="f1-driver-option">
                                <span className="f1-driver-number">01</span>
                                <span className="f1-driver-details">
                                    <span className="f1-driver-name">Max Verstappen</span>
                                    <span className="f1-driver-team">Red Bull</span>
                                </span>
                            </button>
                            <button
                                type="button"
                                className="f1-driver-option-selected f1-driver-option"
                            >
                                <span className="f1-driver-number">06</span>
                                <span className="f1-driver-details">
                                    <span className="f1-driver-name">Isack Hadjar</span>
                                    <span className="f1-driver-team">Red Bull</span>
                                </span>
                                <span className="f1-choice-status">YOUR PICK</span>
                            </button>
                        </div>
                    </article>
                    <article className="f1-matchup-card">
                        <p className="f1-matchup-label">Aston Martin</p>
                        <div className="f1-driver-options">
                            <button
                                type="button"
                                className="f1-driver-option-selected f1-driver-option"
                            >
                                <span className="f1-driver-number">14</span>
                                <span className="f1-driver-details">
                                    <span className="f1-driver-name">Fernando Alonso</span>
                                    <span className="f1-driver-team">Aston Martin</span>
                                </span>
                                <span className="f1-choice-status">YOUR PICK</span>
                            </button>
                            <button type="button" className="f1-driver-option">
                                <span className="f1-driver-number">18</span>
                                <span className="f1-driver-details">
                                    <span className="f1-driver-name">Lance Stroll</span>
                                    <span className="f1-driver-team">Aston Martin</span>
                                </span>
                            </button>
                        </div>
                    </article>
                    <article className="f1-matchup-card">
                        <p className="f1-matchup-label">Alpine</p>
                        <div className="f1-driver-options">
                            <button type="button" className="f1-driver-option">
                                <span className="f1-driver-number">43</span>
                                <span className="f1-driver-details">
                                    <span className="f1-driver-name">Franco Colapinto</span>
                                    <span className="f1-driver-team">Alpine</span>
                                </span>
                            </button>
                            <button
                                type="button"
                                className="f1-driver-option-selected f1-driver-option"
                            >
                                <span className="f1-driver-number">10</span>
                                <span className="f1-driver-details">
                                    <span className="f1-driver-name">Pierre Gasly</span>
                                    <span className="f1-driver-team">Alpine</span>
                                </span>
                                <span className="f1-choice-status">YOUR PICK</span>
                            </button>
                        </div>
                    </article>
                    <article className="f1-matchup-card">
                        <p className="f1-matchup-label">Haas</p>
                        <div className="f1-driver-options">
                            <button
                                type="button"
                                className="f1-driver-option-selected f1-driver-option"
                            >
                                <span className="f1-driver-number">31</span>
                                <span className="f1-driver-details">
                                    <span className="f1-driver-name">Esteban Ocon</span>
                                    <span className="f1-driver-team">Haas</span>
                                </span>
                                <span className="f1-choice-status">YOUR PICK</span>
                            </button>
                            <button type="button" className="f1-driver-option">
                                <span className="f1-driver-number">87</span>
                                <span className="f1-driver-details">
                                    <span className="f1-driver-name">Oliver Bearman</span>
                                    <span className="f1-driver-team">Haas</span>
                                </span>
                            </button>
                        </div>
                    </article>
                    <article className="f1-matchup-card">
                        <p className="f1-matchup-label">Racing Bulls</p>
                        <div className="f1-driver-options">
                            <button type="button" className="f1-driver-option">
                                <span className="f1-driver-number">30</span>
                                <span className="f1-driver-details">
                                    <span className="f1-driver-name">Liam Lawson</span>
                                    <span className="f1-driver-team">Racing Bulls</span>
                                </span>
                            </button>
                            <button
                                type="button"
                                className="f1-driver-option-selected f1-driver-option"
                            >
                                <span className="f1-driver-number">41</span>
                                <span className="f1-driver-details">
                                    <span className="f1-driver-name">Arvid Lindblad</span>
                                    <span className="f1-driver-team">Racing Bulls</span>
                                </span>
                                <span className="f1-choice-status">YOUR PICK</span>
                            </button>
                        </div>
                    </article>
                    <article className="f1-matchup-card">
                        <p className="f1-matchup-label">Cadillac</p>
                        <div className="f1-driver-options">
                            <button
                                type="button"
                                className="f1-driver-option-selected f1-driver-option"
                            >
                                <span className="f1-driver-number">11</span>
                                <span className="f1-driver-details">
                                    <span className="f1-driver-name">Sergio Pérez</span>
                                    <span className="f1-driver-team">Cadillac</span>
                                </span>
                                <span className="f1-choice-status">YOUR PICK</span>
                            </button>
                            <button type="button" className="f1-driver-option">
                                <span className="f1-driver-number">77</span>
                                <span className="f1-driver-details">
                                    <span className="f1-driver-name">Valtteri Bottas</span>
                                    <span className="f1-driver-team">Cadillac</span>
                                </span>
                            </button>
                        </div>
                    </article>
                    <article className="f1-matchup-card">
                        <p className="f1-matchup-label">Williams</p>
                        <div className="f1-driver-options">
                            <button type="button" className="f1-driver-option">
                                <span className="f1-driver-number">23</span>
                                <span className="f1-driver-details">
                                    <span className="f1-driver-name">Alex Albon</span>
                                    <span className="f1-driver-team">Williams</span>
                                </span>
                            </button>
                            <button
                                type="button"
                                className="f1-driver-option-selected f1-driver-option"
                            >
                                <span className="f1-driver-number">55</span>
                                <span className="f1-driver-details">
                                    <span className="f1-driver-name">Carlos Sainz</span>
                                    <span className="f1-driver-team">Williams</span>
                                </span>
                                <span className="f1-choice-status">YOUR PICK</span>
                            </button>
                        </div>
                    </article>
                    <article className="f1-matchup-card">
                        <p className="f1-matchup-label">Audi/Sauber</p>
                        <div className="f1-driver-options">
                            <button
                                type="button"
                                className="f1-driver-option-selected f1-driver-option"
                            >
                                <span className="f1-driver-number">27</span>
                                <span className="f1-driver-details">
                                    <span className="f1-driver-name">Nico Hülkenberg</span>
                                    <span className="f1-driver-team">Audi/Sauber</span>
                                </span>
                                <span className="f1-choice-status">YOUR PICK</span>
                            </button>
                            <button type="button" className="f1-driver-option">
                                <span className="f1-driver-number">05</span>
                                <span className="f1-driver-details">
                                    <span className="f1-driver-name">Gabriel Bortoleto</span>
                                    <span className="f1-driver-team">Audi/Sauber</span>
                                </span>
                            </button>
                        </div>
                    </article>
                </div>
                <footer className="f1-predictions-summary">
                    <p className="f1-summary-copy">11 of 11 picks locked in</p>
                    <button type="button" className="f1-submit-picks">
                        SUBMIT PICKS
                    </button>
                </footer>
            </section>
        </div>
    )
}





export default DriverMatchupPredictions
