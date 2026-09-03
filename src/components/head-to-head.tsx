"use client";
import React from 'react';
import { F1_MATCHUPS } from '@/api/f1-data';
import { usePredictionStore } from '@/store/usePredictionStore';
import { useState } from 'react';
const HeadToHead = (props: any) => {
    const picks = usePredictionStore(state => state.h2h);
    const setPicks = usePredictionStore(state => state.setH2H);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const handleSubmit = () => {
        setIsSubmitting(true);
        setTimeout(() => {
            setIsSubmitting(false);
            setIsSuccess(true);
            console.log("Mock DB - H2H Submetido:", picks);
            setTimeout(() => setIsSuccess(false), 5000);
        }, 1200);
    };

    const handlePick = (matchupId: string, driverNum: string) => {
        setPicks(prev => ({ ...prev, [matchupId]: driverNum }));
    };

    const countPicks = Object.keys(picks).length;

    return (
        <div className={`w-full flex flex-col gap-8 mt-8 ${props.rootClassName || ''}`}>
            {!props.hideHeader && (
                <header className="f1-predictions-header border border-black/20 dark:border-[#ffffff3d] p-6 bg-white dark:bg-[#1a1a1a] border-b-2 border-b-[#fbaa19] shadow-md">
                    <p className="text-[#fbaa19] text-xs font-medium uppercase tracking-[0.14em] mb-2">F1 PREDICTION MARKET</p>
                    <h2 className="text-black dark:text-white text-2xl md:text-3xl font-display font-bold uppercase tracking-wider mb-2">HEAD TO HEAD</h2>
                    <p className="text-gray-600 dark:text-gray-400 text-sm md:text-base">
                        Choose the driver you expect to finish ahead in each matchup.
                    </p>
                </header>
            )}
            
            <div className="grid grid-cols-1 gap-4 md:gap-6">
                {F1_MATCHUPS.map(m => {
                    const picked = picks[m.id];
                    return (
                        <article key={m.id} className="bg-white dark:bg-[#1a1a1a] border border-black/20 dark:border-[#ffffff3d] flex flex-col hover:border-[#fbaa19] transition-colors overflow-hidden">
                            <p className="bg-gray-100 dark:bg-black text-black dark:text-white px-4 py-2 font-bold uppercase tracking-widest text-sm border-b border-black/20 dark:border-[#ffffff3d] text-center">
                                {m.team}
                            </p>
                            <div className="flex flex-row w-full h-full">
                                {[m.d1, m.d2].map(d => {
                                    const isPicked = picked === d.num;
                                    return (
                                        <button
                                            key={d.num}
                                            type="button"
                                            onClick={() => handlePick(m.id, d.num)}
                                            style={{ minHeight: '3.5rem' }}
                                            className={`flex-1 flex flex-row items-center justify-between px-4 py-2 transition-all text-left border-r border-black/10 dark:border-white/10 last:border-r-0 ${
                                                isPicked 
                                                ? 'bg-[#fbaa19] text-black' 
                                                : 'bg-white dark:bg-[#1a1a1a] text-black dark:text-white hover:bg-gray-100 dark:hover:bg-black hover:text-[#fbaa19]'
                                            }`}
                                        >
                                            <span className="uppercase font-bold tracking-wider text-sm md:text-base leading-tight">
                                                {d.name} <span className={isPicked ? "text-black/70" : "text-[#fbaa19]"}># {d.num}</span>
                                            </span>
                                            {isPicked && (
                                                <svg className="w-5 h-5 shrink-0 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                                                </svg>
                                            )}
                                        </button>
                                    );
                                })}
                            </div>
                        </article>
                    );
                })}
            </div>
            
            {!props.hideSubmit && (
                <footer className="f1-predictions-summary flex items-center justify-between p-4 bg-white dark:bg-[#1a1a1a] border border-black/20 dark:border-[#ffffff3d]">
                    <p className="f1-summary-copy text-sm md:text-base text-gray-600 dark:text-gray-400 font-medium tracking-wide">
                        {countPicks === F1_MATCHUPS.length 
                            ? <span className="text-[#fbaa19]">All matchups predicted!</span>
                            : `${countPicks} / ${F1_MATCHUPS.length} MATCHUPS PREDICTED`
                        }
                    </p>
                    <button 
                        type="button" 
                        onClick={handleSubmit}
                        disabled={countPicks !== F1_MATCHUPS.length || isSubmitting || isSuccess}
                        className="f1-submit-picks bg-[#fbaa19] text-black border-2 border-[#fbaa19] px-6 py-3 font-bold uppercase tracking-widest text-xs md:text-sm transition-colors hover:bg-gray-200 dark:hover:bg-black hover:text-[#fbaa19] disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isSubmitting ? 'SUBMITTING...' : isSuccess ? '✔ SAVED' : 'SUBMIT PREDICTION'}
                    </button>
                </footer>
            )}
        </div>
    )
}

export default HeadToHead;
