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
    { id: 'head-to-head', label: 'H2H', icon: (
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
    { id: 'all-forms', label: 'ALL', icon: (
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.8">
            <rect x="4" y="4" rx="1" width="16" height="16"></rect>
            <path d="M4 10h16M4 16h16M10 4v16M16 4v16"></path>
        </svg>
    )}
];

interface Props {
    activeId: string;
    setActiveId: (id: string) => void;
}

const F1BetRemoteControl = ({ activeId, setActiveId }: Props) => {

    return (
        <div className="w-full flex p-1 relative box-border min-h-[3.5rem] overflow-x-auto overflow-y-hidden items-stretch flex-row bg-white dark:bg-[#0a0a0a] border border-black/20 dark:border-[#ffffff3d]">
            <nav aria-label="Prediction categories" className="flex flex-row w-full gap-1 items-stretch flex-nowrap min-w-max">
                {categories.map(cat => (
                    <button
                        key={cat.id}
                        type="button"
                        onClick={() => setActiveId(cat.id)}
                        aria-pressed={activeId === cat.id}
                        className={`flex-1 flex flex-row justify-center items-center gap-2 p-2 px-4 cursor-pointer uppercase font-bold tracking-widest text-xs md:text-sm transition-colors border-b-2 ${
                            activeId === cat.id 
                                ? "bg-[#fbaa19] text-black border-[#fbaa19]" 
                                : "bg-transparent text-gray-600 dark:text-gray-400 border-transparent hover:text-black dark:hover:text-[#fbaa19] hover:bg-gray-100 dark:hover:bg-[#1a1a1a]"
                        }`}
                    >
                        <div aria-hidden="true" className="w-5 h-5 flex justify-center items-center">
                            {cat.icon}
                        </div>
                        <span>{cat.label}</span>
                    </button>
                ))}
            </nav>
        </div>
    )
}

export default F1BetRemoteControl;
