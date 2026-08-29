"use client";
import React, { useState, useEffect } from 'react';
import { fetchNextEvent, type F1Event } from '@/api/f1-data';

export interface RaceEvent {
    id: string;
    round: string;
    name: string;
    circuit: string;
    date: string;
    qualiStart: string;
    raceStart: string;
}

const mockCalendar: RaceEvent[] = [
    { id: 'r1', round: '01', name: 'BAHRAIN GRAND PRIX', circuit: 'Bahrain International Circuit', date: 'FEB 29 - MAR 02', qualiStart: '01 MAR, 19:00', raceStart: '02 MAR, 18:00' },
    { id: 'r2', round: '02', name: 'SAUDI ARABIAN GRAND PRIX', circuit: 'Jeddah Corniche Circuit', date: 'MAR 07 - MAR 09', qualiStart: '08 MAR, 20:00', raceStart: '09 MAR, 20:00' },
    { id: 'r3', round: '03', name: 'AUSTRALIAN GRAND PRIX', circuit: 'Albert Park Circuit', date: 'MAR 22 - MAR 24', qualiStart: '23 MAR, 16:00', raceStart: '24 MAR, 15:00' },
    { id: 'r4', round: '04', name: 'JAPANESE GRAND PRIX', circuit: 'Suzuka International Racing Course', date: 'APR 05 - APR 07', qualiStart: '06 APR, 15:00', raceStart: '07 APR, 14:00' },
    { id: 'r5', round: '05', name: 'CHINESE GRAND PRIX', circuit: 'Shanghai International Circuit', date: 'APR 19 - APR 21', qualiStart: '20 APR, 15:00', raceStart: '21 APR, 15:00' },
    { id: 'r6', round: '06', name: 'MIAMI GRAND PRIX', circuit: 'Miami International Autodrome', date: 'MAY 03 - MAY 05', qualiStart: '04 MAY, 16:00', raceStart: '05 MAY, 16:00' },
    { id: 'r7', round: '07', name: 'EMILIA ROMAGNA GRAND PRIX', circuit: 'Imola Circuit', date: 'MAY 17 - MAY 19', qualiStart: '18 MAY, 16:00', raceStart: '19 MAY, 15:00' }
];

const fetchCalendarData = async (): Promise<RaceEvent[]> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(mockCalendar);
        }, 800);
    });
};

const Calendar = () => {
    const [races, setRaces] = useState<RaceEvent[]>([]);
    const [nextEvent, setNextEvent] = useState<F1Event | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let mounted = true;
        Promise.all([fetchCalendarData(), fetchNextEvent()]).then(([data, next]) => {
            if (mounted) {
                setRaces(data);
                setNextEvent(next);
                setLoading(false);
            }
        });
        return () => { mounted = false; };
    }, []);

    return (
        <div className="w-full max-w-4xl mx-auto flex flex-col gap-6 mt-4">
            <header className="border border-black/20 dark:border-[#ffffff3d] p-6 bg-white dark:bg-[#1a1a1a] border-b-2 border-b-[#fbaa19] shadow-md flex items-center justify-between">
                <div>
                    <p className="text-[#fbaa19] text-xs font-medium uppercase tracking-[0.14em] mb-2">SEASON CALENDAR</p>
                    <h2 className="text-black dark:text-white text-2xl md:text-3xl font-display font-bold uppercase tracking-wider">OFFICIAL SCHEDULE</h2>
                </div>
                <div className="hidden sm:block">
                    <div className="w-12 h-12 rounded-full border-4 border-[#fbaa19] flex items-center justify-center font-black text-xl text-black dark:text-white">
                        F1
                    </div>
                </div>
            </header>

            {loading ? (
                <div className="w-full h-64 flex flex-col items-center justify-center border border-black/20 dark:border-[#ffffff3d] bg-white dark:bg-[#1a1a1a]">
                    <div className="w-8 h-8 border-4 border-[#fbaa19] border-t-transparent rounded-full animate-spin mb-4"></div>
                    <p className="text-[#fbaa19] font-bold uppercase tracking-widest text-sm">LOADING SECURE DATA...</p>
                </div>
            ) : (
                <div className="flex flex-col gap-4">
                    {races.map((race) => {
                        const isNext = race.round === nextEvent?.round;
                        
                        return (
                            <article 
                                key={race.id} 
                                className={`border flex flex-col sm:flex-row transition-colors group overflow-hidden ${
                                    isNext 
                                        ? 'bg-[#fbaa19] border-[#fbaa19] text-black shadow-[0_0_15px_rgba(251,170,25,0.3)]' 
                                        : 'bg-white dark:bg-[#1a1a1a] border-black/20 dark:border-[#ffffff3d] hover:border-[#fbaa19]'
                                }`}
                            >
                                {/* Round Number */}
                                <div className={`w-full sm:w-20 flex sm:flex-col items-center justify-center p-2 sm:p-0 font-black uppercase text-xl sm:text-2xl border-b sm:border-b-0 sm:border-r ${
                                    isNext ? 'bg-[#e59914] text-black border-[#e59914]' : 'bg-[#fbaa19] text-black border-[#fbaa19]'
                                }`}>
                                    <span className="text-xs tracking-widest mr-2 sm:mr-0 sm:mb-1">RND</span>
                                    {race.round}
                                </div>
                                
                                {/* Race Info */}
                                <div className="flex-1 p-4 sm:p-6 flex flex-col justify-center">
                                    <div className="flex items-center gap-3">
                                        <h3 className={`font-bold uppercase tracking-wider text-lg sm:text-xl transition-colors ${
                                            isNext ? 'text-black' : 'text-black dark:text-white group-hover:text-[#fbaa19]'
                                        }`}>
                                            {race.name}
                                        </h3>
                                        {isNext && (
                                            <span className="bg-black text-[#fbaa19] px-2 py-0.5 text-[10px] font-black tracking-widest uppercase animate-pulse">
                                                NEXT EVENT
                                            </span>
                                        )}
                                    </div>
                                    <p className={`text-xs sm:text-sm uppercase tracking-wider font-medium mt-1 ${
                                        isNext ? 'text-black/70' : 'text-gray-500 dark:text-gray-400'
                                    }`}>
                                        {race.circuit}
                                    </p>
                                </div>

                                {/* Timings */}
                                <div className={`w-full sm:w-auto shrink-0 flex flex-row items-stretch border-t sm:border-t-0 sm:border-l ${
                                    isNext ? 'bg-black/10 border-black/20' : 'bg-gray-50 dark:bg-black/50 border-black/10 dark:border-white/10'
                                }`}>
                                    <div className={`flex-1 min-w-[120px] p-3 flex flex-col items-center justify-center border-r ${
                                        isNext ? 'border-black/20' : 'border-black/10 dark:border-white/10'
                                    }`}>
                                        <span className={`text-[10px] font-bold uppercase tracking-widest mb-1 ${
                                            isNext ? 'text-black/70' : 'text-gray-500'
                                        }`}>QUALIFYING</span>
                                        <span className={`font-mono font-bold text-xs sm:text-sm text-center ${
                                            isNext ? 'text-black' : 'text-black dark:text-white'
                                        }`}>{race.qualiStart}</span>
                                    </div>
                                    <div className="flex-1 min-w-[120px] p-3 flex flex-col items-center justify-center">
                                        <span className={`text-[10px] font-bold uppercase tracking-widest mb-1 ${
                                            isNext ? 'text-black' : 'text-[#fbaa19]'
                                        }`}>RACE START</span>
                                        <span className={`font-mono font-bold text-xs sm:text-sm text-center ${
                                            isNext ? 'text-black' : 'text-black dark:text-white'
                                        }`}>{race.raceStart}</span>
                                    </div>
                                </div>
                            </article>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default Calendar;
