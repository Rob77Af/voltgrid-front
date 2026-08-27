"use client";
import React from 'react'
import Link from 'next/link'




import Navigation from '../components/navigation'
import Footer from '../components/footer'
// css imported globally

const Homepage = (props) => {
    return (
        <div className="homepage-container1">
            
            <Navigation></Navigation>
            <section
                id="home-hero"
                data-hero-capped="true"
                className="homepage-thq-volt-hero-elm volt-hero"
            >
                <div className="homepage-thq-volt-hero-bg-elm volt-hero-bg">
                    <div className="volt-hero-grid-pattern"></div>
                    <div className="volt-hero-trace-left volt-hero-trace">
                        <div className="volt-hero-node volt-hero-node-1">
                            <div className="volt-hero-icon-badge">
                                <svg
                                    width="24"
                                    xmlns="http://www.w3.org/2000/svg"
                                    height="24"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        d="M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    ></path>
                                </svg>
                            </div>
                        </div>
                    </div>
                    <div className="volt-hero-trace-right volt-hero-trace">
                        <div className="volt-hero-node-2 volt-hero-node">
                            <div className="volt-hero-icon-badge">
                                <svg
                                    width="24"
                                    xmlns="http://www.w3.org/2000/svg"
                                    height="24"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        d="m3 17l6-6l4 4l8-8"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    ></path>
                                    <path d="M14 7h7v7"></path>
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="volt-hero-container">
                    <div className="volt-hero-content">
                        <div className="volt-hero-eyebrow">
                            <span>High-Performance React UI</span>
                        </div>
                        <h1 className="volt-hero-headline kinetic-headline hero-title">
                            <span className="homepage-thq-kinetic-word-elm1">Engineered</span>
                            <span className="homepage-thq-kinetic-word-elm2">for</span>
                            <span className="homepage-thq-kinetic-word-elm3">Victory</span>
                        </h1>
                        <p className="hero-subtitle volt-hero-description">
                            {' '}
                            Formula 1 inspired components for game projects. Professional bet
                            platforms, trade-style tables, and high-octane fantasy dashboards.
                            <span
                                dangerouslySetInnerHTML={{
                                    __html: ' ',
                                }}
                            />
                        </p>
                        <div className="volt-hero-actions">
                            <Link href="/homepage" className="homepage-navlink1">
                                <div className="btn-primary btn homepage-btn btn-lg">
                                    <span>View Dashboard Demo</span>
                                </div>
                            </Link>
                            <a href="#" className="homepage-link1">
                                <div className="volt-hero-link">
                                    <span>Open Profile Sample</span>
                                </div>
                            </a>
                        </div>
                    </div>
                    <div className="volt-hero-preview-stage">
                        <div className="volt-hero-mockup surface-card">
                            <div className="volt-hero-mockup-header">
                                <div className="volt-hero-dot-red volt-hero-dot"></div>
                                <div className="volt-hero-dot-yellow volt-hero-dot"></div>
                                <div className="volt-hero-dot-green volt-hero-dot"></div>
                                <div className="volt-hero-mockup-address">
                                    <span>voltgrid.io/dashboard</span>
                                </div>
                            </div>
                            <div className="volt-hero-mockup-body">
                                <img
                                    alt="Dashboard Preview"
                                    src="https://images.pexels.com/photos/27141307/pexels-photo-27141307.jpeg?auto=compress&amp;cs=tinysrgb&amp;w=1500"
                                    className="volt-hero-mockup-img"
                                />
                            </div>
                        </div>
                        <div className="volt-hero-metric-card surface-card volt-hero-metric-1">
                            <div className="volt-hero-metric-label">
                                <span>Live Odds</span>
                            </div>
                            <div className="volt-hero-metric-value">
                                <span>2.45</span>
                            </div>
                            <div className="volt-hero-metric-delta">
                                <span>+0.12</span>
                            </div>
                        </div>
                        <div className="volt-hero-metric-card surface-card volt-hero-metric-2">
                            <div className="volt-hero-metric-label">
                                <span>Lap Time</span>
                            </div>
                            <div className="volt-hero-metric-value">
                                <span>1:24.032</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section id="demo-links" className="volt-demos">
                <div className="volt-demos-container">
                    <h2 className="section-title volt-demos-title">Explore Components</h2>
                    <div className="volt-demos-grid">
                        <article className="surface-card volt-demo-card">
                            <div
                                data-abs-child-fixed="true"
                                className="homepage-thq-volt-demo-strip-elm1 volt-demo-strip-yellow volt-demo-strip"
                            >
                                <span className="volt-demo-category">Interactive</span>
                            </div>
                            <div className="volt-demo-body">
                                <div className="volt-demo-icon">
                                    <svg
                                        width="24"
                                        xmlns="http://www.w3.org/2000/svg"
                                        height="24"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            d="M15.914 4a1.5 1.5 0 0 0-2.474-1.561l-9 9A1.5 1.5 0 0 0 5.5 14h4.002a.5.5 0 0 1 .471.666L8.086 20a1.5 1.5 0 0 0 2.475 1.56l9-9A1.5 1.5 0 0 0 18.5 10h-3.997a.5.5 0 0 1-.472-.667z"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        ></path>
                                    </svg>
                                </div>
                                <h3 className="volt-demo-name">Bet Input Forms</h3>
                                <p className="section-content">
                                    Precision input fields designed for high-stakes decisions.
                                </p>
                                <a href="#">
                                    <div className="btn-link volt-demo-link">
                                        <span>Open live sample</span>
                                    </div>
                                </a>
                            </div>
                            <div className="volt-demo-badge volt-demo-badge-yellow">
                                <div className="volt-demo-badge-metric">
                                    <span>0.12s</span>
                                </div>
                                <div className="volt-demo-badge-label">
                                    <span>Latency</span>
                                </div>
                            </div>
                        </article>
                        <article className="surface-card volt-demo-card">
                            <div
                                data-abs-child-fixed="true"
                                className="homepage-thq-volt-demo-strip-elm2 volt-demo-strip-grey volt-demo-strip"
                            >
                                <span className="volt-demo-category">Data</span>
                            </div>
                            <div className="volt-demo-body">
                                <div className="volt-demo-icon">
                                    <svg
                                        width="24"
                                        xmlns="http://www.w3.org/2000/svg"
                                        height="24"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            d="m5 7l5 5l-5 5m7 2h7"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        ></path>
                                    </svg>
                                </div>
                                <h3 className="volt-demo-name">Trade-Style Tables</h3>
                                <p className="section-content">
                                    Dense, scannable data grids with real-time delta updates.
                                </p>
                                <a href="#">
                                    <div className="btn-link volt-demo-link">
                                        <span>View code sandbox</span>
                                    </div>
                                </a>
                            </div>
                            <div className="volt-demo-badge-grey volt-demo-badge">
                                <div className="volt-demo-badge-metric">
                                    <span>60fps</span>
                                </div>
                                <div className="volt-demo-badge-label">
                                    <span>Refresh Rate</span>
                                </div>
                            </div>
                        </article>
                        <article className="surface-card volt-demo-card">
                            <div
                                data-abs-child-fixed="true"
                                className="homepage-thq-volt-demo-strip-elm3 volt-demo-strip volt-demo-strip-black"
                            >
                                <span className="volt-demo-category">Game UI</span>
                            </div>
                            <div className="volt-demo-body">
                                <div className="volt-demo-icon">
                                    <svg
                                        width="24"
                                        xmlns="http://www.w3.org/2000/svg"
                                        height="24"
                                        viewBox="0 0 24 24"
                                    >
                                        <g
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        >
                                            <rect x="3" y="3" rx="1" width="7" height="9"></rect>
                                            <rect x="14" y="3" rx="1" width="7" height="5"></rect>
                                            <rect x="14" y="12" rx="1" width="7" height="9"></rect>
                                            <rect x="3" y="16" rx="1" width="7" height="5"></rect>
                                        </g>
                                    </svg>
                                </div>
                                <h3 className="volt-demo-name">Fantasy Dashboard</h3>
                                <p className="section-content">
                                    Modular HUD components for immersive player profiles.
                                </p>
                                <a href="#">
                                    <div className="btn-link volt-demo-link">
                                        <span>Open live sample</span>
                                    </div>
                                </a>
                            </div>
                            <div className="volt-demo-badge volt-demo-badge-black">
                                <div className="volt-demo-badge-metric">
                                    <span>100%</span>
                                </div>
                                <div className="volt-demo-badge-label">
                                    <span>Responsive</span>
                                </div>
                            </div>
                        </article>
                    </div>
                </div>
            </section>
            <section id="feature-highlights" className="volt-features">
                <div className="volt-features-container">
                    <div className="volt-features-left">
                        <h2 className="section-title volt-features-headline">
                            Why choose VoltGrid for your game project?
                        </h2>
                        <p className="volt-features-subtitle">
                            Our design system is built for speed, bringing the intensity of
                            professional racing telemetry to your React front-end.
                        </p>
                        <a href="#">
                            <div className="btn-primary btn volt-features-cta homepage-btn btn-lg">
                                <span>Get Started</span>
                            </div>
                        </a>
                    </div>
                    <div className="volt-features-matrix">
                        <div className="volt-feature-tile volt-tile-1">
                            <div className="volt-tile-icon">
                                <svg
                                    width="24"
                                    xmlns="http://www.w3.org/2000/svg"
                                    height="24"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        d="M15.914 4a1.5 1.5 0 0 0-2.474-1.561l-9 9A1.5 1.5 0 0 0 5.5 14h4.002a.5.5 0 0 1 .471.666L8.086 20a1.5 1.5 0 0 0 2.475 1.56l9-9A1.5 1.5 0 0 0 18.5 10h-3.997a.5.5 0 0 1-.472-.667z"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    ></path>
                                </svg>
                            </div>
                            <div className="volt-tile-badge">
                                <span>8ms</span>
                            </div>
                            <h3 className="volt-tile-title">Real-time Inputs</h3>
                            <p className="volt-tile-meta">
                                Optimized for rapid bet placement and trade execution.
                            </p>
                        </div>
                        <div className="volt-tile-2 volt-feature-tile">
                            <div className="volt-tile-icon">
                                <svg
                                    width="24"
                                    xmlns="http://www.w3.org/2000/svg"
                                    height="24"
                                    viewBox="0 0 24 24"
                                >
                                    <g
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <path d="M16 7h6v6"></path>
                                        <path d="m22 7l-8.5 8.5l-5-5L2 17"></path>
                                    </g>
                                </svg>
                            </div>
                            <div className="volt-tile-badge">
                                <span>120+</span>
                            </div>
                            <h3 className="volt-tile-title">Dynamic Tables</h3>
                            <p className="volt-tile-meta">
                                Dense data rows with built-in delta change animations.
                            </p>
                        </div>
                        <div className="volt-tile-3 volt-feature-tile">
                            <div className="volt-tile-icon">
                                <svg
                                    width="24"
                                    xmlns="http://www.w3.org/2000/svg"
                                    height="24"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        d="m18 16l4-4l-4-4M6 8l-4 4l4 4m8.5-12l-5 16"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    ></path>
                                </svg>
                            </div>
                            <div className="volt-tile-badge">
                                <span>JSX</span>
                            </div>
                            <h3 className="volt-tile-title">React Ready</h3>
                            <p className="volt-tile-meta">
                                Modular components styled with the VoltGrid system.
                            </p>
                        </div>
                        <div className="volt-feature-tile volt-tile-4">
                            <div className="volt-tile-icon">
                                <svg
                                    width="24"
                                    xmlns="http://www.w3.org/2000/svg"
                                    height="24"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        d="M12 19h8M4 17l6-6l-6-6"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    ></path>
                                </svg>
                            </div>
                            <div className="volt-tile-badge">
                                <span>4K</span>
                            </div>
                            <h3 className="volt-tile-title">F1 TV Visuals</h3>
                            <p className="volt-tile-meta">
                                Broadcast-grade styling using F1-inspired telemetry.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
            <section id="how-it-works" className="volt-how">
                <div className="volt-how-container">
                    <div className="volt-how-header">
                        <h2 className="section-title">
                            <span>
                                Integrate
                                <span
                                    dangerouslySetInnerHTML={{
                                        __html: ' ',
                                    }}
                                />
                            </span>
                            <span className="homepage-thq-volt-how-pill-elm">
                                VoltGrid Components
                            </span>
                            <span> in minutes</span>
                        </h2>
                    </div>
                    <div className="volt-how-viewport surface-card">
                        <div className="volt-how-browser-bar">
                            <div className="volt-how-window-controls">
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>
                        </div>
                        <div className="volt-how-preview">
                            <div className="volt-how-dashboard-area">
                                <img
                                    alt="UI Preview"
                                    src="https://images.pexels.com/photos/27141316/pexels-photo-27141316.jpeg?auto=compress&amp;cs=tinysrgb&amp;w=1500"
                                    className="volt-how-ui-img"
                                />
                            </div>
                            <div className="volt-how-chat-panel">
                                <div className="volt-how-chat-header">
                                    <div className="volt-how-avatar"></div>
                                    <div className="volt-how-chat-name">
                                        <span>VoltBot</span>
                                    </div>
                                </div>
                                <div className="volt-how-chat-bubble">
                                    <span>Importing @voltgrid/bet-form...</span>
                                </div>
                                <div className="volt-how-chat-bubble-user volt-how-chat-bubble">
                                    <span>Success. Component rendered in 14ms.</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="volt-how-steps">
                        <div className="volt-how-step-item volt-step-active">
                            <div className="volt-how-step-icon">
                                <svg
                                    width="24"
                                    xmlns="http://www.w3.org/2000/svg"
                                    height="24"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        d="m18 16l4-4l-4-4M6 8l-4 4l4 4m8.5-12l-5 16"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    ></path>
                                </svg>
                            </div>
                            <div className="volt-how-step-content">
                                <h3 className="volt-how-step-title">1. Installation</h3>
                                <p className="section-content">
                                    Install the core library and F1 telemetry theme via npm.
                                </p>
                            </div>
                        </div>
                        <div className="volt-how-step-item">
                            <div className="volt-how-step-icon">
                                <svg
                                    width="24"
                                    xmlns="http://www.w3.org/2000/svg"
                                    height="24"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        d="M12 19h8M4 17l6-6l-6-6"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    ></path>
                                </svg>
                            </div>
                            <div className="volt-how-step-content">
                                <h3 className="volt-how-step-title">2. View Demos</h3>
                                <p className="section-content">
                                    Explore pre-built trade tables and bet input modules.
                                </p>
                            </div>
                        </div>
                        <div className="volt-how-step-item">
                            <div className="volt-how-step-icon">
                                <svg
                                    width="24"
                                    xmlns="http://www.w3.org/2000/svg"
                                    height="24"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        d="M15.914 4a1.5 1.5 0 0 0-2.474-1.561l-9 9A1.5 1.5 0 0 0 5.5 14h4.002a.5.5 0 0 1 .471.666L8.086 20a1.5 1.5 0 0 0 2.475 1.56l9-9A1.5 1.5 0 0 0 18.5 10h-3.997a.5.5 0 0 1-.472-.667z"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    ></path>
                                </svg>
                            </div>
                            <div className="volt-how-step-content">
                                <h3 className="volt-how-step-title">3. Deployment</h3>
                                <p className="section-content">
                                    Deploy high-performance game UI to your production project.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="volt-how-actions">
                        <Link href="/homepage">
                            <div className="btn btn-outline homepage-btn">
                                <span>View Dashboard Demo</span>
                            </div>
                        </Link>
                    </div>
                </div>
            </section>
            <section
                id="final-cta"
                data-abs-child-fixed="true"
                className="homepage-thq-volt-cta-elm volt-cta"
            >
                <div className="volt-cta-grid-bg"></div>
                <div className="volt-cta-container">
                    <h2 className="volt-cta-headline section-title">
                        Ready to Lead the Pack?
                    </h2>
                    <p className="volt-cta-subtitle">
                        Elevate your game project with the most precise React UI system
                        available.
                    </p>
                    <div className="volt-cta-actions">
                        <Link href="/homepage" className="homepage-navlink3">
                            <div className="btn-primary btn btn-xl homepage-btn">
                                <span>Open Dashboard Demo</span>
                            </div>
                        </Link>
                        <a href="#" className="homepage-link6">
                            <div className="volt-cta-link">
                                <span>View Profile Sample</span>
                            </div>
                        </a>
                    </div>
                </div>
            </section>
            <div className="homepage-container2">
                <div className="homepage-container3">
                    <script dangerouslySetInnerHTML={{ __html: `<script defer data-name="voltgrid-ui">
(function(){
  const steps = document.querySelectorAll('.volt-how-step-item');
  steps.forEach(step => {
    step.addEventListener('click', () => {
      steps.forEach(s => s.classList.remove('volt-step-active'));
      step.classList.add('volt-step-active');
    });
  });
})()
</script>` }} />
                </div>
            </div>
            <div className="homepage-container4">
                <div className="homepage-container5">
                    <script dangerouslySetInnerHTML={{ __html: `<style>
@keyframes kineticWordRise {
0% {
  opacity: 0;
  transform: translateY(0.42em);
}
100% {
  opacity: 1;
  transform: translateY(0);
}
}
</style>` }} />
                </div>
            </div>
            <div className="homepage-container6">
                <div className="homepage-container7">
                    <script dangerouslySetInnerHTML={{ __html: `<style>
@media (prefers-reduced-motion: reduce) {
.kinetic-word, .volt-feature-tile, .volt-hero-mockup {
  animation: none;
  transform: none;
  transition: none;
}
}
</style>` }} />
                </div>
            </div>
            <Footer></Footer>
            <a href="https://play.teleporthq.io/signup">
                <div aria-label="Sign up to TeleportHQ" className="homepage-container8">
                    <svg
                        width="24"
                        height="24"
                        viewBox="0 0 19 21"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="homepage-icon41"
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
                    <span className="homepage-text44">Built in TeleportHQ</span>
                </div>
            </a>
        </div>
    )
}

export default Homepage
