"use client";
import React, { useState } from 'react';
import F1BetRemoteControl from './f1-bet-remote-control';
import HeadToHead from './head-to-head';
import Top10Finish from './top-10-finish';

import Poletime from './poletime';
import Evo from './evo';
import Misc from './misc';

import { usePredictionStore } from '@/store/usePredictionStore';

const PredictionTabs = () => {
    const [activeId, setActiveId] = useState('head-to-head');
    const [isMounted, setIsMounted] = useState(false);

    // Global validation for ALL forms
    const { top10, evo, h2h, misc } = usePredictionStore();
    const isTop10Valid = top10.every(p => p !== '');
    const isEvoValid = evo.every(p => p !== '');
    const isH2HValid = Object.keys(h2h).length === 11; // F1_MATCHUPS.length
    const isMiscValid = Object.keys(misc).length === 5; // QUESTIONS.length
    
    const isAllValid = isTop10Valid && isEvoValid && isH2HValid && isMiscValid;

    React.useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return <div className="w-full h-96 flex items-center justify-center text-[#fbaa19] font-bold">LOADING PREDICTIONS...</div>;
    }

    const isAllMode = activeId === 'all-forms';

    return (
        <>
            <F1BetRemoteControl activeId={activeId} setActiveId={setActiveId} />
            
            <section
                aria-label="Driver matchup predictions"
                className="f1-predictions-stage flex flex-col gap-16 mt-8"
            >
                {(activeId === 'poletime' || isAllMode) && (
                    <Poletime hideSubmit={isAllMode} />
                )}

                {(activeId === 'master' || isAllMode) && (
                    <Top10Finish hideSubmit={isAllMode} />
                )}

                {(activeId === 'evo' || isAllMode) && (
                    <Evo hideSubmit={isAllMode} />
                )}

                {(activeId === 'head-to-head' || isAllMode) && (
                    <HeadToHead hideSubmit={isAllMode} rootClassName="head-to-head-root-class-name" />
                )}

                {(activeId === 'misc' || isAllMode) && (
                    <Misc hideSubmit={isAllMode} />
                )}

                {isAllMode && (
                    <footer className="w-full p-8 bg-[#fbaa19] border-t-4 border-black text-center shadow-2xl flex flex-col items-center justify-center gap-4 sticky bottom-0 z-50">
                        <h3 className="text-black font-black uppercase text-xl md:text-2xl tracking-widest font-display">
                            {isAllValid ? 'ALL SELECTIONS COMPLETE' : 'INCOMPLETE SELECTIONS'}
                        </h3>
                        <button 
                            disabled={!isAllValid}
                            className="bg-black text-[#fbaa19] border-2 border-black font-black uppercase tracking-widest px-12 py-4 text-lg md:text-xl transition-all hover:bg-white hover:text-black hover:border-white disabled:opacity-30 disabled:cursor-not-allowed"
                        >
                            SUBMIT ALL PREDICTIONS
                        </button>
                    </footer>
                )}
            </section>
        </>
    );
};

export default PredictionTabs;
