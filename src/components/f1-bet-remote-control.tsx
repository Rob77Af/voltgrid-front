"use client";
import React, { useState } from 'react';

const categories = [
    { id: 'poletime', label: 'Poletime', icon: (
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.8">
            <circle r="7" cx="12" cy="13"></circle>
            <path d="M12 13l3-3M9 3h6M12 3v3M5 6l-1.5-1.5"></path>
        </svg>
    )},
    { id: 'master', label: 'Master', icon: (
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.8" strokeLinejoin="round">
            <path d="M8 10h8l-1 8H9l-1-8Z"></path>
            <path d="M10 10V6h4v4M8 13H5l-2 2M16 13h3l2 2M9 18h6l2 3H7l2-3Z"></path>
        </svg>
    )},
    { id: 'evo', label: 'Evo', icon: (
        <svg fill="currentColor" viewBox="0 0 24 24">
            <path d="M13.5 2 5 13h5l-1 9 8.5-12h-5L13.5 2Z"></path>
        </svg>
    )},
    { id: 'head-to-head', label: 'Head-to-Head', icon: (
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.8" strokeLinecap="round">
            <circle r="3" cx="8" cy="9"></circle>
            <circle r="3" cx="16" cy="15"></circle>
            <path d="m10.5 10.5 3 3M5 6l-2-2M19 18l2 2"></path>
        </svg>
    )},
    { id: 'misc', label: 'Misc', icon: (
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.8" strokeLinejoin="round">
            <path d="M5 3v18M5 4h13l-3 4 3 4H5"></path>
            <path d="M8 8h2M12 6h2M8 12h2"></path>
        </svg>
    )},
    { id: 'all-forms', label: 'All Forms', icon: (
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.8">
            <rect x="4" y="4" rx="1" width="16" height="16"></rect>
            <path d="M4 10h16M4 16h16M10 4v16M16 4v16"></path>
        </svg>
    )}
];

const F1BetRemoteControl = (props: any) => {
    const [activeId, setActiveId] = useState('head-to-head');

    return (
        <div className="f1-bet-remote-control-container">
            <nav aria-label="Prediction categories" className="f1-remote-control">
                {categories.map(cat => (
                    <button
                        key={cat.id}
                        type="button"
                        onClick={() => setActiveId(cat.id)}
                        aria-pressed={activeId === cat.id}
                        className={activeId === cat.id ? "f1-remote-control-button f1-remote-control-button-active" : "f1-remote-control-button"}
                    >
                        <div aria-hidden="true" className="f1-remote-control-icon">
                            {cat.icon}
                        </div>
                        <span className="f1-remote-control-label">{cat.label}</span>
                    </button>
                ))}
            </nav>
        </div>
    )
}

export default F1BetRemoteControl;
