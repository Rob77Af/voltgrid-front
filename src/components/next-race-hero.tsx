"use client";
import React, { useEffect, useState } from "react";
import { useJolpicaCalendar, JolpicaRace } from "@/hooks/useJolpica";

interface Props {
    selectedRound: string;
    onOpenCalendar: () => void;
}

export default function RaceEventHero({ selectedRound, onOpenCalendar }: Props) {
    const { races, isLoading } = useJolpicaCalendar("current");
    const [targetRace, setTargetRace] = useState<JolpicaRace | null>(null);

    useEffect(() => {
        if (races.length > 0) {
            if (selectedRound === "last") {
                const now = new Date();
                const upcoming = races.find(r => {
                    const raceDate = new Date(`${r.date}T${r.time || "00:00:00Z"}`);
                    return raceDate > now;
                });
                setTargetRace(upcoming || races[races.length - 1]);
            } else {
                const specific = races.find(r => r.round === selectedRound);
                setTargetRace(specific || races[0]);
            }
        }
    }, [races, selectedRound]);

    if (isLoading) {
        return (
            <div className="w-full h-[50vh] bg-black border-b-4 border-[#fbaa19] flex items-center justify-center mb-8">
                <div className="animate-pulse text-[#fbaa19] font-bold tracking-widest uppercase">
                    SINCRONIZANDO COM A FIA...
                </div>
            </div>
        );
    }

    if (!targetRace) return null;

    const raceDate = new Date(`${targetRace.date}T${targetRace.time || "00:00:00Z"}`);
    const isPast = raceDate < new Date();
    
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
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent z-0"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent z-0"></div>

            {/* Content */}
            <div className="relative z-10 flex-1 flex flex-col items-start text-left w-full">
                <div className="flex justify-between w-full items-start">
                    <span className={`font-bold text-xs uppercase tracking-[0.3em] mb-4 flex items-center gap-2 ${isPast ? 'text-gray-400' : 'text-[#fbaa19]'}`}>
                        {!isPast && <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse"></span>}
                        {isPast ? 'RESULTADOS OFICIAIS' : 'PRÓXIMA ETAPA'} • ROUND {targetRace.round}
                    </span>

                    {/* CALENDAR BUTTON */}
                    <button 
                        onClick={onOpenCalendar}
                        className="bg-transparent border-2 border-white/30 text-white hover:border-white hover:bg-white hover:text-black px-4 py-2 text-[10px] md:text-xs font-black uppercase tracking-widest transition-colors flex items-center gap-2 backdrop-blur-sm"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                        <span className="hidden sm:inline">Ver Calendário Oficial</span>
                    </button>
                </div>
                
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-widest font-display mb-2 drop-shadow-lg leading-tight">
                    {targetRace.raceName}
                </h2>
                <p className="text-gray-300 text-sm md:text-base tracking-[0.2em] uppercase font-bold mb-8">
                    {targetRace.Circuit.circuitName} // {targetRace.Circuit.Location.country}
                </p>

                <div className="flex flex-wrap gap-4 w-full sm:w-auto">
                    <div className="flex flex-col bg-white/5 border border-white/10 p-4 min-w-[120px] backdrop-blur-sm">
                        <span className="text-[10px] text-[#fbaa19] font-bold uppercase tracking-widest mb-1">Qualifying</span>
                        <span className="text-xl font-black">{formatTime(targetRace.Qualifying?.date, targetRace.Qualifying?.time)}</span>
                        <span className="text-xs text-gray-500 uppercase">{formatDate(targetRace.Qualifying?.date || targetRace.date)}</span>
                    </div>
                    <div className="flex flex-col bg-[#fbaa19] text-black border border-[#fbaa19] p-4 min-w-[120px] shadow-[0_0_20px_rgba(251,170,25,0.2)]">
                        <span className="text-[10px] font-black uppercase tracking-widest mb-1">Race</span>
                        <span className="text-xl font-black">{formatTime(targetRace.date, targetRace.time)}</span>
                        <span className="text-xs uppercase font-bold text-black">{formatDate(targetRace.date)}</span>
                    </div>
                </div>
            </div>
            
            {/* Year Visual */}
            <div className="absolute right-8 bottom-8 z-10 hidden lg:block opacity-20 pointer-events-none">
                <p className="text-9xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-transparent uppercase tracking-tighter">
                    {new Date(raceDate).getFullYear()}
                </p>
            </div>
        </div>
    );
}
