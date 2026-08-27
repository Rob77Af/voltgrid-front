import React from 'react'
import { Link } from 'react-router-dom'

import Script from 'dangerous-html/react'

import Logo from './logo'
import './navigation.css'

const Navigation = (props) => {
    return (
        <div className="navigation-container1">
            <nav className="navigation-thq-navigation-section-elm navigation-section">
                <div className="navigation-texture"></div>
                <div className="navigation-bar">
                    <div className="navigation-left">
                        <Link to="/homepage" className="navigation-navlink1">
                            <div className="navigation-logo-link">
                                <Logo isOnDarkBackground></Logo>
                            </div>
                        </Link>
                    </div>
                    <div className="navigation-right">
                        <div className="navigation-desktop-actions">
                            <div className="navigation-thq-navigation-contact-link-elm navigation-contact-link">
                                <span className="navigation-thq-navigation-contact-label-elm">
                                    Contact Race Control
                                </span>
                                <svg
                                    fill="none"
                                    width="16"
                                    height="16"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="navigation-thq-navigation-contact-icon-elm"
                                >
                                    <path d="m9 18 6-6-6-6"></path>
                                </svg>
                            </div>
                            <label
                                aria-label="Open menu"
                                htmlFor="nav-menu-toggle"
                                className="navigation-hamburger"
                            >
                                <svg
                                    fill="none"
                                    width="24"
                                    height="24"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    aria-hidden="true"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                >
                                    <line x1="4" x2="20" y1="6" y2="6"></line>
                                    <line x1="4" x2="20" y1="12" y2="12"></line>
                                    <line x1="4" x2="20" y1="18" y2="18"></line>
                                </svg>
                            </label>
                        </div>
                        <button
                            id="themeToggle"
                            aria-label="Toggle theme"
                            className="navigation-theme-btn"
                        >
                            <svg
                                fill="none"
                                width="20"
                                height="20"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                strokeWidth="2"
                                strokeLinecap="round"
                                className="navigation-theme-icon"
                            >
                                <path d="M12 2v2m2.837 12.385a6 6 0 1 1-7.223-7.222c.624-.147.97.66.715 1.248a4 4 0 0 0 5.26 5.259c.589-.255 1.396.09 1.248.715M16 12a4 4 0 0 0-4-4m7-3l-1.256 1.256M20 12h2"></path>
                            </svg>
                        </button>
                    </div>
                </div>
                <input
                    type="checkbox"
                    id="nav-menu-toggle"
                    className="navigation-thq-navigation-checkbox-elm navigation-checkbox"
                />
                <div className="navigation-mobile-overlay">
                    <div className="navigation-overlay-header">
                        <Link to="/homepage" className="navigation-navlink2">
                            <div className="navigation-logo-link">
                                <Logo isOnDarkBackground></Logo>
                            </div>
                        </Link>
                        <label
                            aria-label="Close menu"
                            htmlFor="nav-menu-toggle"
                            className="navigation-close"
                        >
                            <svg
                                fill="none"
                                width="24"
                                height="24"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                aria-hidden="true"
                                strokeWidth="2"
                                strokeLinecap="round"
                            >
                                <line x1="18" x2="6" y1="6" y2="18"></line>
                                <line x1="6" x2="18" y1="6" y2="18"></line>
                            </svg>
                        </label>
                    </div>
                    <div className="navigation-overlay-links">
                        <Link to="/homepage" className="navigation-navlink3">
                            <div className="navigation-overlay-link">
                                <span className="navigation-link-num">01</span>
                                <span className="navigation-link-text">Dashboard</span>
                            </div>
                        </Link>
                        <span
                            data-planned-page="Game Asset Details"
                            className="navigation-overlay-link navigation-link-dummy"
                        >
                            <span className="navigation-thq-navigation-link-num-elm2">
                                02
                            </span>
                            <span className="navigation-link-text">Asset Market</span>
                        </span>
                        <span className="navigation-thq-navigation-overlay-link-elm3 navigation-overlay-link">
                            <span className="navigation-thq-navigation-link-num-elm3">
                                03
                            </span>
                            <span className="navigation-link-text">Live Telemetry</span>
                        </span>
                        <span className="navigation-thq-navigation-overlay-link-elm4 navigation-overlay-link">
                            <span className="navigation-thq-navigation-link-num-elm4">
                                04
                            </span>
                            <span className="navigation-link-text">Profile</span>
                        </span>
                    </div>
                    <div className="navigation-overlay-footer">
                        <span className="navigation-thq-navigation-overlay-cta-elm navigation-overlay-cta">
                            Contact Race Control
                        </span>
                    </div>
                </div>
            </nav>
            <div className="navigation-container2">
                <div className="navigation-container3">
                    <Script
                        html={`<script defer data-name="navigation-logic">
(function(){
  const themeToggle = document.getElementById('themeToggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', nextTheme);
    });
  }
})()
</script>`}
                    ></Script>
                </div>
            </div>
            <div className="navigation-container4">
                <div className="navigation-container5">
                    <Script
                        html={`<script defer data-name="theme-toggle">
(function(){
const themeToggle = document.getElementById('themeToggle');
const html = document.documentElement;

// Initialize theme from localStorage or system preference
const storedTheme = localStorage.getItem('theme') ||
  (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

applyTheme(storedTheme);

function applyTheme(theme) {
  const suffix = theme === 'dark' ? 'dark' : 'light';

  // Update ALL active color variables to point to the correct theme
  html.style.setProperty('--color-primary', \`var(--color-primary-\${suffix})\`);
  html.style.setProperty('--color-secondary', \`var(--color-secondary-\${suffix})\`);
  html.style.setProperty('--color-accent', \`var(--color-accent-\${suffix})\`);
  html.style.setProperty('--color-neutral', \`var(--color-neutral-\${suffix})\`);
  html.style.setProperty('--color-surface', \`var(--color-surface-\${suffix})\`);
  html.style.setProperty('--color-on-surface', \`var(--color-on-surface-\${suffix})\`);
  html.style.setProperty('--color-on-surface-secondary', \`var(--color-on-surface-secondary-\${suffix})\`);
  html.style.setProperty('--color-on-primary', \`var(--color-on-primary-\${suffix})\`);
  html.style.setProperty('--color-surface-elevated', \`var(--color-surface-elevated-\${suffix})\`);
  html.style.setProperty('--color-surface-tint', \`var(--color-surface-tint-\${suffix})\`);
  html.style.setProperty('--color-on-secondary', \`var(--color-on-secondary-\${suffix})\`);
  html.style.setProperty('--color-on-accent', \`var(--color-on-accent-\${suffix})\`);
  html.style.setProperty('--color-border', \`var(--color-border-\${suffix})\`);
  html.style.setProperty('--color-outline', \`var(--color-outline-\${suffix})\`);
  html.style.setProperty('--color-overlay', \`var(--color-overlay-\${suffix})\`);
  html.style.setProperty('--color-backplate', \`var(--color-backplate-\${suffix})\`);
  html.style.setProperty('--color-scrim', \`var(--color-scrim-\${suffix})\`);

  html.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
}

function toggleTheme() {
  const currentTheme = html.getAttribute('data-theme');
  const newTheme = currentTheme === 'light' ? 'dark' : 'light';
  applyTheme(newTheme);
}

if (themeToggle) {
  themeToggle.addEventListener('click', toggleTheme);
}
})()
</script>`}
                    ></Script>
                </div>
            </div>
            <div className="navigation-container6">
                <div className="navigation-container7">
                    <Script
                        html={`<script defer data-name="theme-toggle">
(function(){
const themeToggle = document.getElementById('themeToggle');
const html = document.documentElement;

// Initialize theme from localStorage or system preference
const storedTheme = localStorage.getItem('theme') ||
  (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

applyTheme(storedTheme);

function applyTheme(theme) {
  const suffix = theme === 'dark' ? 'dark' : 'light';

  // Update ALL active color variables to point to the correct theme
  html.style.setProperty('--color-primary', \`var(--color-primary-\${suffix})\`);
  html.style.setProperty('--color-secondary', \`var(--color-secondary-\${suffix})\`);
  html.style.setProperty('--color-accent', \`var(--color-accent-\${suffix})\`);
  html.style.setProperty('--color-neutral', \`var(--color-neutral-\${suffix})\`);
  html.style.setProperty('--color-surface', \`var(--color-surface-\${suffix})\`);
  html.style.setProperty('--color-on-surface', \`var(--color-on-surface-\${suffix})\`);
  html.style.setProperty('--color-on-surface-secondary', \`var(--color-on-surface-secondary-\${suffix})\`);
  html.style.setProperty('--color-on-primary', \`var(--color-on-primary-\${suffix})\`);
  html.style.setProperty('--color-surface-elevated', \`var(--color-surface-elevated-\${suffix})\`);
  html.style.setProperty('--color-surface-tint', \`var(--color-surface-tint-\${suffix})\`);
  html.style.setProperty('--color-on-secondary', \`var(--color-on-secondary-\${suffix})\`);
  html.style.setProperty('--color-on-accent', \`var(--color-on-accent-\${suffix})\`);
  html.style.setProperty('--color-border', \`var(--color-border-\${suffix})\`);
  html.style.setProperty('--color-outline', \`var(--color-outline-\${suffix})\`);
  html.style.setProperty('--color-overlay', \`var(--color-overlay-\${suffix})\`);
  html.style.setProperty('--color-backplate', \`var(--color-backplate-\${suffix})\`);
  html.style.setProperty('--color-scrim', \`var(--color-scrim-\${suffix})\`);

  html.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
}

function toggleTheme() {
  const currentTheme = html.getAttribute('data-theme');
  const newTheme = currentTheme === 'light' ? 'dark' : 'light';
  applyTheme(newTheme);
}

if (themeToggle) {
  themeToggle.addEventListener('click', toggleTheme);
}
})()
</script>`}
                    ></Script>
                </div>
            </div>
        </div>
    )
}

export default Navigation
