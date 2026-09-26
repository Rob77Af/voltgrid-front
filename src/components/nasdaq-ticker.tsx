"use client";
import React, { useEffect, useState } from 'react';
import { fetchNextEvent, type F1Event } from '@/api/f1-data';

export default function NasdaqTicker() {
    const [event, setEvent] = useState<F1Event | null>(null);
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        fetchNextEvent().then(setEvent);
        
        // Update time every minute to check if race goes live while user is on page
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 60000);
        return () => clearInterval(timer);
    }, []);

    if (!event) return null;

    // The deadline is typically the start of Qualifying
    const qualiTimeStr = event.qualiDate && event.qualiTime 
        ? `${new Date(`${event.qualiDate}T${event.qualiTime}`).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}` 
        : "TBA";

    const tickerText = `MKT: ${event.status} | RND ${event.round} | EVT ${event.name} | LOC ${event.circuit} | RACE ${event.date} ${event.time}`;

    // Dynamic Label Logic
    let leftLabelText = "RACE WEEK";
    let isLive = false;

    if (event.rawDate && event.rawTime) {
        // Race start time object
        const raceDate = new Date(`${event.rawDate}T${event.rawTime}`);
        
        // Check if today is race day (comparing local calendar dates)
        if (currentTime.toDateString() === raceDate.toDateString()) {
            leftLabelText = "RACE TODAY";
            
            // Check if it is currently Race Time (assuming a window of ~2.5 hours for the race)
            const raceStartMs = raceDate.getTime();
            const nowMs = currentTime.getTime();
            const twoAndHalfHoursMs = 2.5 * 60 * 60 * 1000;
            
            // Allow up to 10 minutes before the race to show LIVE
            if (nowMs >= (raceStartMs - 10 * 60000) && nowMs <= (raceStartMs + twoAndHalfHoursMs)) {
                leftLabelText = "RACE LIVE";
                isLive = true;
            }
        }
    }

    return (
        <div className="w-full bg-[#0a0a0a] h-8 flex items-center justify-center relative overflow-hidden">
            {/* Reduced width wrapper */}
            <div className="w-full max-w-xl flex items-center h-full relative px-2 md:px-0">
                
                {/* Left Fixed Label */}
                <div className="z-20 bg-[#0a0a0a] pr-3 py-1 flex items-center shrink-0">
                    <span className={`font-black tracking-widest uppercase text-[9px] sm:text-[10px] ${isLive ? 'text-red-500 animate-pulse' : 'text-[#00ff00]'}`}>
                        {leftLabelText}
                    </span>
                </div>

                {/* Marquee area */}
                <div className="flex-1 overflow-hidden relative h-full flex items-center">
                    {/* Gradient masks */}
                    <div className="absolute left-0 top-0 w-8 h-full bg-gradient-to-r from-[#0a0a0a] to-transparent z-10 pointer-events-none"></div>
                    <div className="absolute right-0 top-0 w-8 h-full bg-gradient-to-l from-[#0a0a0a] to-transparent z-10 pointer-events-none"></div>
                    
                    <style dangerouslySetInnerHTML={{__html: `
                        @keyframes marquee-disappear {
                            0% { transform: translateX(100%); opacity: 1; }
                            35% { transform: translateX(-100%); opacity: 1; }
                            36% { opacity: 0; }
                            100% { transform: translateX(-100%); opacity: 0; }
                        }
                        .animate-marquee-pause {
                            display: inline-block;
                            white-space: nowrap;
                            animation: marquee-disappear 25s linear infinite;
                            will-change: transform;
                        }
                    `}} />

                    <div className="w-full relative h-full flex items-center">
                        <div className="absolute w-full animate-marquee-pause text-[#00ff00] text-[9px] sm:text-[10px] font-mono font-bold tracking-[0.2em] uppercase whitespace-nowrap">
                            {tickerText}
                        </div>
                    </div>
                </div>

                {/* Right Fixed Label (Deadline) */}
                <div className="z-20 bg-[#0a0a0a] pl-3 py-1 flex items-center shrink-0">
                    <span className="text-red-500 font-bold tracking-widest uppercase text-[9px] sm:text-[10px] flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></span>
                        Q-DEADLINE: {qualiTimeStr}
                    </span>
                </div>

            </div>
        </div>
    );
}
