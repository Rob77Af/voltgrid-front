"use client";
import React, { useEffect, useState } from "react";
import { useJolpicaCalendar, JolpicaRace } from "@/hooks/useJolpica";

export default function NextRaceHero() {
    const { races, isLoading } = useJolpicaCalendar("current");
    const [nextRace, setNextRace] = useState<JolpicaRace | null>(null);

    useEffect(() => {
        if (races.length > 0) {
            const now = new Date();
            // Find the first race whose date is in the future
            const upcoming = races.find(r => {
                const raceDate = new Date(`${r.date}T${r.time || "00:00:00Z"}`);
                return raceDate > now;
            });
            // If all races are past, fallback to the last race
            setNextRace(upcoming || races[races.length - 1]);
        }
    }, [races]);

    if (isLoading) {
        return (
            <div className="w-full h-64 bg-black border border-[#fbaa19]/20 flex items-center justify-center mb-8">
                <div className="animate-pulse text-[#fbaa19] font-bold tracking-widest uppercase">
                    SINCRONIZANDO COM A FIA...
                </div>
            </div>
        );
    }

    if (!nextRace) return null;

    const raceDate = new Date(`${nextRace.date}T${nextRace.time || "00:00:00Z"}`);
    const formatTime = (dateStr?: string, timeStr?: string) => {
        if (!dateStr || !timeStr) return "--:--";
        return new Date(`${dateStr}T${timeStr}`).toLocaleTimeString("pt-BR", { hour: '2-digit', minute: '2-digit' });
    };
    const formatDate = (dateStr: string) => {
        return new Date(`${dateStr}T12:00:00Z`).toLocaleDateString("pt-BR", { day: '2-digit', month: 'short' });
    };

    return (
        <div className="w-full relative overflow-hidden border-b-4 border-[#fbaa19] bg-black text-white p-8 md:p-12 flex flex-col md:flex-row items-center md:items-end justify-center md:justify-start gap-8 md:gap-12 group min-h-[50vh] md:min-h-[65vh]">
            {/* Background Texture & Gradient */}
            <div 
                className="absolute inset-0 z-0 opacity-40 mix-blend-overlay grayscale group-hover:scale-105 transition-transform duration-1000" 
                style={{ 
                    backgroundImage: 'url("https://images.unsplash.com/photo-1541348263662-e06836264be8?q=80&w=2069&auto=format&fit=crop")', 
                    backgroundSize: 'cover', 
                    backgroundPosition: 'center' 
                }}
            ></div>
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent z-0"></div>
            <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-black/80 to-transparent z-0"></div>

            {/* Content */}
            <div className="relative z-10 flex-1 flex flex-col items-start text-left">
                <span className="text-[#fbaa19] font-bold text-xs uppercase tracking-[0.3em] mb-4 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse"></span>
                    PRÓXIMA ETAPA • ROUND {nextRace.round}
                </span>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-widest font-display mb-2 drop-shadow-lg leading-tight">
                    {nextRace.raceName}
                </h2>
                <p className="text-gray-300 text-sm md:text-base tracking-[0.2em] uppercase font-bold mb-8">
                    {nextRace.Circuit.circuitName} // {nextRace.Circuit.Location.country}
                </p>

                <div className="flex flex-wrap gap-4 w-full sm:w-auto">
                    <div className="flex flex-col bg-white/5 border border-white/10 p-4 min-w-[120px]">
                        <span className="text-[10px] text-[#fbaa19] font-bold uppercase tracking-widest mb-1">Qualifying</span>
                        <span className="text-xl font-black">{formatTime((nextRace as any).Qualifying?.date, (nextRace as any).Qualifying?.time)}</span>
                        <span className="text-xs text-gray-500 uppercase">{formatDate((nextRace as any).Qualifying?.date || nextRace.date)}</span>
                    </div>
                    <div className="flex flex-col bg-[#fbaa19] text-black border border-[#fbaa19] p-4 min-w-[120px] shadow-[0_0_20px_rgba(251,170,25,0.2)]">
                        <span className="text-[10px] font-black uppercase tracking-widest mb-1">Race</span>
                        <span className="text-xl font-black">{formatTime(nextRace.date, nextRace.time)}</span>
                        <span className="text-xs uppercase font-bold text-black">{formatDate(nextRace.date)}</span>
                    </div>
                </div>
            </div>

            {/* Visual Element Right Side */}
            <div className="relative z-10 hidden md:flex w-1/3 flex-col items-end justify-center">
                <div className="text-right">
                    <p className="text-5xl lg:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white/20 to-transparent uppercase tracking-tighter">
                        {new Date(raceDate).getFullYear()}
                    </p>
                </div>
            </div>
        </div>
    );
}
