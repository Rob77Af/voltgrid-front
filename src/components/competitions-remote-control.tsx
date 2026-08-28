"use client";
import React from 'react';

const categories = [
    { id: 'poletime-competition', label: 'Poletime Competition', icon: (
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.8">
            <circle r="7" cx="12" cy="13"></circle>
            <path d="M12 13l3-3M9 3h6M12 3v3M5 6l-1.5-1.5"></path>
        </svg>
    )},
    { id: 'master-competition', label: 'Master Competition', icon: (
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.8" strokeLinejoin="round">
            <path d="M8 10h8l-1 8H9l-1-8Z"></path>
            <path d="M10 10V6h4v4M8 13H5l-2 2M16 13h3l2 2M9 18h6l2 3H7l2-3Z"></path>
        </svg>
    )},
    { id: 'milesimus', label: 'Milesimus', icon: (
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <path d="M12 6v6l4 2"></path>
        </svg>
    )},
    { id: 'teamwork', label: 'Teamwork', icon: (
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
            <circle cx="9" cy="7" r="4"></circle>
            <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
            <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
        </svg>
    )}
];

interface Props {
    activeId: string;
    setActiveId: (id: string) => void;
}

const CompetitionsRemoteControl = ({ activeId, setActiveId }: Props) => {
    return (
        <div className="w-full flex p-1 relative box-border min-h-[4.5rem] overflow-x-auto overflow-y-hidden items-stretch flex-row bg-white dark:bg-[#0a0a0a] border border-black/20 dark:border-[#ffffff3d] rounded-sm">
            <nav aria-label="Competition categories" className="flex flex-row w-full gap-1 items-stretch flex-nowrap min-w-max">
                {categories.map(cat => (
                    <button
                        key={cat.id}
                        type="button"
                        onClick={() => setActiveId(cat.id)}
                        aria-pressed={activeId === cat.id}
                        className={`flex-1 flex flex-col justify-center items-center gap-1.5 p-2 px-4 cursor-pointer uppercase font-bold tracking-widest text-[10px] sm:text-xs md:text-sm transition-colors border-b-2 ${
                            activeId === cat.id 
                                ? "bg-[#fbaa19] text-black border-[#fbaa19]" 
                                : "bg-transparent text-gray-600 dark:text-gray-400 border-transparent hover:text-black dark:hover:text-[#fbaa19] hover:bg-gray-100 dark:hover:bg-[#1a1a1a]"
                        }`}
                    >
                        <div aria-hidden="true" className="w-5 h-5 md:w-6 md:h-6 flex justify-center items-center shrink-0">
                            {cat.icon}
                        </div>
                        <span className="whitespace-nowrap">{cat.label}</span>
                    </button>
                ))}
            </nav>
        </div>
    )
}

export default CompetitionsRemoteControl;
