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
            <div className="w-full bg-[#0a0a0a] border-y border-[#00ff00]/20 h-10 flex items-center px-4 overflow-hidden text-xs font-mono text-[#00ff00]">
                <div className="w-full max-w-7xl mx-auto flex gap-4">
                    <span className="animate-pulse tracking-widest">CONNECTING TO JOLPI F1 LIVE DATA...</span>
                </div>
            </div>
        );
    }

    // A string to display multiple times for the marquee effect
    const tickerText = `MKT: ${event.status} | RND ${event.round} | EVT ${event.name} | LOC ${event.circuit} | DATE ${event.date} | TIME ${event.time}`;

    return (
        <div className="w-full bg-[#0a0a0a] border-y border-[#00ff00]/20 h-10 flex items-center overflow-hidden relative">
            
            {/* Gradient masks for smooth fading on edges */}
            <div className="absolute left-0 top-0 w-8 h-full bg-gradient-to-r from-[#0a0a0a] to-transparent z-10"></div>
            <div className="absolute right-0 top-0 w-8 h-full bg-gradient-to-l from-[#0a0a0a] to-transparent z-10"></div>
            
            <style dangerouslySetInnerHTML={{__html: `
                @keyframes marquee-right {
                    0% { transform: translateX(-100%); }
                    100% { transform: translateX(0%); }
                }
                @keyframes marquee-left {
                    0% { transform: translateX(0%); }
                    100% { transform: translateX(-100%); }
                }
                .animate-marquee-lr {
                    display: inline-block;
                    white-space: nowrap;
                    animation: marquee-right 30s linear infinite;
                }
            `}} />

            <div className="flex whitespace-nowrap text-[#00ff00] text-xs font-mono font-bold tracking-[0.2em] uppercase w-full">
                <div className="animate-marquee-lr flex gap-12 shrink-0 px-6">
                    <span>{tickerText}</span>
                    <span>{tickerText}</span>
                    <span>{tickerText}</span>
                    <span>{tickerText}</span>
                </div>
                <div className="animate-marquee-lr flex gap-12 shrink-0 px-6" aria-hidden="true">
                    <span>{tickerText}</span>
                    <span>{tickerText}</span>
                    <span>{tickerText}</span>
                    <span>{tickerText}</span>
                </div>
            </div>
        </div>
    );
}
