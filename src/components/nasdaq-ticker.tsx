"use client";
import React, { useEffect, useState } from 'react';
import { fetchNextEvent, type F1Event } from '@/api/f1-data';

export default function NasdaqTicker() {
    const [event, setEvent] = useState<F1Event | null>(null);

    useEffect(() => {
        fetchNextEvent().then(setEvent);
    }, []);

    if (!event) return null;

    // The deadline is typically the start of Qualifying
    const qualiTimeStr = event.qualiDate && event.qualiTime 
        ? `${new Date(`${event.qualiDate}T${event.qualiTime}`).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}` 
        : "TBA";

    const tickerText = `MKT: ${event.status} | RND ${event.round} | EVT ${event.name} | LOC ${event.circuit} | RACE ${event.date} ${event.time}`;

    return (
        <div className="w-full bg-[#0a0a0a] border-y border-[#00ff00]/20 h-10 flex items-center justify-center relative overflow-hidden">
            {/* Tablet max width wrapper */}
            <div className="w-full max-w-screen-md flex items-center h-full relative px-2 md:px-0">
                
                {/* Left Fixed Label */}
                <div className="z-20 bg-[#0a0a0a] pr-4 py-2 border-r border-[#00ff00]/20 flex items-center shrink-0">
                    <span className="text-[#00ff00] font-black tracking-widest uppercase text-xs">RACE WEEK</span>
                </div>

                {/* Marquee area */}
                <div className="flex-1 overflow-hidden relative h-full flex items-center">
                    {/* Gradient masks */}
                    <div className="absolute left-0 top-0 w-8 h-full bg-gradient-to-r from-[#0a0a0a] to-transparent z-10 pointer-events-none"></div>
                    <div className="absolute right-0 top-0 w-8 h-full bg-gradient-to-l from-[#0a0a0a] to-transparent z-10 pointer-events-none"></div>
                    
                    <style dangerouslySetInnerHTML={{__html: `
                        @keyframes marquee-disappear {
                            0% { transform: translateX(100%); opacity: 1; }
                            40% { transform: translateX(-100%); opacity: 1; }
                            41% { opacity: 0; }
                            100% { transform: translateX(-100%); opacity: 0; }
                        }
                        .animate-marquee-pause {
                            display: inline-block;
                            white-space: nowrap;
                            animation: marquee-disappear 15s linear infinite;
                            will-change: transform;
                        }
                    `}} />

                    <div className="w-full relative h-full flex items-center">
                        <div className="absolute w-full animate-marquee-pause text-[#00ff00] text-[10px] sm:text-xs font-mono font-bold tracking-[0.2em] uppercase whitespace-nowrap">
                            {tickerText}
                        </div>
                    </div>
                </div>

                {/* Right Fixed Label (Deadline) */}
                <div className="z-20 bg-[#0a0a0a] pl-4 py-2 border-l border-[#00ff00]/20 flex items-center shrink-0">
                    <span className="text-red-500 font-bold tracking-widest uppercase text-[10px] sm:text-xs flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></span>
                        Q-DEADLINE: {qualiTimeStr}
                    </span>
                </div>

            </div>
        </div>
    );
}
