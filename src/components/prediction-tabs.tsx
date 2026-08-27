"use client";
import React, { useState } from 'react';
import F1BetRemoteControl from './f1-bet-remote-control';
import DriverMatchupPredictions from './driver-matchup-predictions';
import Top10Finish from './top-10-finish';

const PredictionTabs = () => {
    const [activeId, setActiveId] = useState('head-to-head');

    return (
        <>
            <F1BetRemoteControl activeId={activeId} setActiveId={setActiveId} />
            
            <section
                aria-label="Driver matchup predictions"
                className="f1-predictions-stage"
            >
                {activeId === 'head-to-head' && (
                    <DriverMatchupPredictions rootClassName="driver-matchup-predictionsroot-class-name" />
                )}
                
                {activeId === 'master' && (
                    <Top10Finish />
                )}

                {/* Placeholder for other categories */}
                {activeId !== 'head-to-head' && activeId !== 'master' && (
                    <div className="w-full h-40 flex items-center justify-center text-gray-500 border border-[#ffffff3d] bg-[#1a1a1a] mt-8">
                        <p className="uppercase tracking-widest text-sm">Mode coming soon...</p>
                    </div>
                )}
            </section>
        </>
    );
};

export default PredictionTabs;
