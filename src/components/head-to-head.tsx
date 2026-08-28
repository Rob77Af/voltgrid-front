"use client";
import React from 'react';
import { F1_MATCHUPS } from '@/api/f1-data';
import { usePredictionStore } from '@/store/usePredictionStore';
const HeadToHead = (props: any) => {
    const picks = usePredictionStore(state => state.h2h);
    const setPicks = usePredictionStore(state => state.setH2H);

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
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                                            className={`flex-1 flex flex-col items-center justify-center p-4 md:p-6 transition-all text-center border-r border-black/10 dark:border-white/10 last:border-r-0 ${
                                                isPicked 
                                                ? 'bg-[#fbaa19] text-black' 
                                                : 'bg-white dark:bg-[#1a1a1a] text-black dark:text-white hover:bg-gray-100 dark:hover:bg-black'
                                            }`}
                                        >
                                            <div className="flex flex-col leading-tight items-center">
                                                <span className="uppercase font-bold tracking-wider text-xs sm:text-sm md:text-base">
                                                    {d.name} <br className="block xl:hidden mb-1" /><span className={isPicked ? "text-black/70" : "text-[#fbaa19]"}># {d.num}</span>
                                                </span>
                                                <span className={`text-[10px] sm:text-xs mt-1 ${isPicked ? "text-black/70" : "text-gray-500"}`}>
                                                    {m.team}
                                                </span>
                                            </div>
                                            {isPicked && (
                                                <div className="mt-3 text-[10px] font-black tracking-widest uppercase opacity-80 shrink-0 bg-black/10 px-2 py-1 rounded-sm">
                                                    SELECTED
                                                </div>
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
                        disabled={countPicks !== F1_MATCHUPS.length}
                        className="f1-submit-picks bg-[#fbaa19] text-black border-2 border-[#fbaa19] px-6 py-3 font-bold uppercase tracking-widest text-xs md:text-sm transition-colors hover:bg-gray-200 dark:hover:bg-black hover:text-[#fbaa19] disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        SUBMIT PREDICTION
                    </button>
                </footer>
            )}
        </div>
    )
}

export default HeadToHead;
