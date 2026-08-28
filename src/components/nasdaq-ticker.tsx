"use client";
import React, { useEffect, useState } from 'react';
import { fetchNextEvent, type F1Event } from '@/api/f1-data';

export default function NasdaqTicker() {
    const [event, setEvent] = useState<F1Event | null>(null);

    useEffect(() => {
        fetchNextEvent().then(setEvent);
    }, []);

    if (!event) {
        return (
            <div className="w-full bg-[#0a0a0a] border-b border-[#ffffff1a] h-10 flex items-center px-4 overflow-hidden text-xs font-mono text-[#fbaa19]">
                <div className="w-full max-w-7xl mx-auto flex gap-4">
                    <span className="animate-pulse">CONNECTING TO MARKET DATA...</span>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full bg-[#0a0a0a] text-white border-b border-[#ffffff1a] h-10 flex items-center px-4 overflow-x-auto overflow-y-hidden text-[10px] md:text-xs font-mono uppercase whitespace-nowrap scrollbar-hide">
            <div className="flex items-center gap-4 md:gap-6 w-full max-w-7xl mx-auto">
                
                <div className="flex items-center gap-2 text-white">
                    <div className="w-2 h-2 bg-[#00ff00] rounded-full animate-pulse shadow-[0_0_8px_#00ff00]"></div>
                    <span className="font-bold tracking-widest text-[#00ff00]">MKT: {event.status}</span>
                </div>

                <div className="text-gray-700">|</div>

                <div className="flex items-center gap-2">
                    <span className="text-gray-400">RND</span>
                    <span className="font-bold text-[#fbaa19]">{event.round}</span>
                </div>

                <div className="text-gray-700">|</div>

                <div className="flex items-center gap-2">
                    <span className="text-gray-400">EVT</span>
                    <span className="font-bold">{event.name}</span>
                    <span className="text-[#00ff00]">?</span>
                </div>

                <div className="text-gray-700">|</div>

                <div className="flex items-center gap-2">
                    <span className="text-gray-400">LOC</span>
                    <span className="font-bold">{event.circuit}</span>
                </div>

                <div className="text-gray-700 hidden sm:block">|</div>

                <div className="hidden sm:flex items-center gap-2">
                    <span className="text-gray-400">DATE</span>
                    <span className="font-bold">{event.date}</span>
                </div>

                <div className="text-gray-700 hidden md:block">|</div>

                <div className="flex items-center gap-2 ml-auto">
                    <span className="text-gray-400">TIME</span>
                    <span className="font-bold text-[#00ff00]">{event.time}</span>
                </div>

            </div>
        </div>
    );
}
