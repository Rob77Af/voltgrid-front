"use client";
import React, { useState } from 'react';
import F1BetRemoteControl from './f1-bet-remote-control';
import HeadToHead from './head-to-head';
import Top10Finish from './top-10-finish';

import Poletime from './poletime';
import Evo from './evo';
import Misc from './misc';

const PredictionTabs = () => {
    const [activeId, setActiveId] = useState('head-to-head');

    return (
        <>
            <F1BetRemoteControl activeId={activeId} setActiveId={setActiveId} />
            
            <section
                aria-label="Driver matchup predictions"
                className="f1-predictions-stage flex flex-col gap-16 mt-8"
            >
                {(activeId === 'poletime' || activeId === 'all-forms') && (
                    <Poletime />
                )}

                {(activeId === 'master' || activeId === 'all-forms') && (
                    <Top10Finish />
                )}

                {(activeId === 'evo' || activeId === 'all-forms') && (
                    <Evo />
                )}

                {(activeId === 'head-to-head' || activeId === 'all-forms') && (
                    <HeadToHead rootClassName="head-to-head-root-class-name" />
                )}

                {(activeId === 'misc' || activeId === 'all-forms') && (
                    <Misc />
                )}
            </section>
        </>
    );
};

export default PredictionTabs;
