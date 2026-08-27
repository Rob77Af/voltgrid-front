import React from 'react'

import { Helmet } from 'react-helmet'

import F1BetRemoteControl from '../components/f1-bet-remote-control'
import DriverMatchupPredictions from '../components/driver-matchup-predictions'
import './bet-now.css'

const BetNow = (props) => {
    return (
        <div className="bet-now-container1">
            <Helmet>
                <title>VoltGrid – Racing Betting & Fantasy Game Platform</title>
                <meta
                    name="description"
                    content="Experience Formula 1-inspired betting, fantasy gaming, and live dashboards. Join VoltGrid for strategic wagering and real-time race analytics."
                />
                <meta
                    property="og:title"
                    content="VoltGrid – Racing Betting &amp; Fantasy Game Platform"
                />
                <meta
                    property="og:description"
                    content="Experience Formula 1-inspired betting, fantasy gaming, and live dashboards. Join VoltGrid for strategic wagering and real-time race analytics."
                />
                <meta
                    property="og:image"
                    content="https://aheioqhobo.cloudimg.io/v7/_playground-bucket-v2.teleporthq.io_/fea89e45-b7dd-4392-9162-26627e927c11/97fb9ebf-cb64-45ab-98a1-2a3638dab07f?org_if_sml=1&amp;force_format=original"
                />
                <meta property="og:type" content="website" />
                <meta
                    name="twitter:title"
                    content="VoltGrid – Racing Betting &amp; Fantasy Game Platform"
                />
                <meta
                    name="twitter:description"
                    content="Experience Formula 1-inspired betting, fantasy gaming, and live dashboards. Join VoltGrid for strategic wagering and real-time race analytics."
                />
                <meta
                    name="twitter:image"
                    content="https://aheioqhobo.cloudimg.io/v7/_playground-bucket-v2.teleporthq.io_/fea89e45-b7dd-4392-9162-26627e927c11/97fb9ebf-cb64-45ab-98a1-2a3638dab07f?org_if_sml=1&amp;force_format=original"
                />
                <link
                    rel="canonical"
                    href="https://ripe-sympathetic-cormorant-9ilgxh.teleporthq.site/"
                />
                <meta
                    property="og:url"
                    content="https://ripe-sympathetic-cormorant-9ilgxh.teleporthq.site/"
                />
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html:
                            '{"@context":"https://schema.org","@type":"Organization","name":"VoltGrid – Racing Betting & Fantasy Game Platform","url":"https://ripe-sympathetic-cormorant-9ilgxh.teleporthq.site","logo":"https://aheioqhobo.cloudimg.io/v7/_playground-bucket-v2.teleporthq.io_/fea89e45-b7dd-4392-9162-26627e927c11/97fb9ebf-cb64-45ab-98a1-2a3638dab07f?org_if_sml=1&force_format=original"}',
                    }}
                />
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html:
                            '{"@context":"https://schema.org","@type":"WebSite","name":"VoltGrid – Racing Betting & Fantasy Game Platform","url":"https://ripe-sympathetic-cormorant-9ilgxh.teleporthq.site","description":"Experience Formula 1-inspired betting, fantasy gaming, and live dashboards. Join VoltGrid for strategic wagering and real-time race analytics."}',
                    }}
                />
            </Helmet>
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
            <a href="https://play.teleporthq.io/signup">
                <div aria-label="Sign up to TeleportHQ" className="bet-now-container2">
                    <svg
                        width="24"
                        height="24"
                        viewBox="0 0 19 21"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="bet-now-icon1"
                    >
                        <path
                            d="M9.1017 4.64355H2.17867C0.711684 4.64355 -0.477539 5.79975 -0.477539 7.22599V13.9567C-0.477539 15.3829 0.711684 16.5391 2.17867 16.5391H9.1017C10.5687 16.5391 11.7579 15.3829 11.7579 13.9567V7.22599C11.7579 5.79975 10.5687 4.64355 9.1017 4.64355Z"
                            fill="#B23ADE"
                        ></path>
                        <path
                            d="M10.9733 12.7878C14.4208 12.7878 17.2156 10.0706 17.2156 6.71886C17.2156 3.3671 14.4208 0.649963 10.9733 0.649963C7.52573 0.649963 4.73096 3.3671 4.73096 6.71886C4.73096 10.0706 7.52573 12.7878 10.9733 12.7878Z"
                            fill="#FF5C5C"
                        ></path>
                        <path
                            d="M17.7373 13.3654C19.1497 14.1588 19.1497 15.4634 17.7373 16.2493L10.0865 20.5387C8.67402 21.332 7.51855 20.6836 7.51855 19.0968V10.5141C7.51855 8.92916 8.67402 8.2807 10.0865 9.07221L17.7373 13.3654Z"
                            fill="#2874DE"
                        ></path>
                    </svg>
                    <span className="bet-now-text">Built in TeleportHQ</span>
                </div>
            </a>
        </div>
    )
}

export default BetNow
