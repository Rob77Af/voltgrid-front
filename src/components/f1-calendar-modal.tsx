"use client";
import React from 'react';
import { useJolpicaCalendar, JolpicaRace } from "@/hooks/useJolpica";

interface Props {
    isOpen: boolean;
    onClose: () => void;
    onSelectRound: (round: string) => void;
    currentSelectedRound: string;
}

export default function F1CalendarModal({ isOpen, onClose, onSelectRound, currentSelectedRound }: Props) {
    const { races, isLoading } = useJolpicaCalendar("current");
    
    if (!isOpen) return null;

    const now = new Date();

    const formatDateTime = (dateStr?: string, timeStr?: string) => {
        if (!dateStr) return "TBA";
        const d = new Date(`${dateStr}T${timeStr || "00:00:00Z"}`);
        return d.toLocaleDateString("pt-BR", { day: '2-digit', month: 'short' }) + " " + (timeStr ? d.toLocaleTimeString("pt-BR", { hour: '2-digit', minute: '2-digit' }) : "");
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-black/90 backdrop-blur-md animate-fade-in overflow-y-auto">
            <div className="bg-[#111] border border-[#fbaa19] w-full max-w-5xl shadow-2xl flex flex-col my-auto relative">
                
                {/* Header */}
                <div className="bg-[#fbaa19] text-black p-4 md:p-6 flex justify-between items-center sticky top-0 z-10">
                    <div>
                        <h2 className="text-2xl md:text-3xl font-black uppercase tracking-widest font-display">Official Calendar</h2>
                        <p className="text-xs font-bold uppercase tracking-widest">Season 2026 Master Schedule</p>
                    </div>
                    <button onClick={onClose} className="w-12 h-12 bg-black text-[#fbaa19] flex items-center justify-center hover:bg-white hover:text-black transition-colors font-black text-xl shadow-lg border-2 border-black">
                        X
                    </button>
                </div>

                {/* Content */}
                <div className="p-4 md:p-6 flex flex-col gap-4 overflow-y-auto max-h-[70vh]">
                    {isLoading ? (
                        <div className="p-12 text-center animate-pulse flex flex-col items-center justify-center">
                            <div className="w-8 h-8 rounded-full border-4 border-[#fbaa19] border-t-transparent animate-spin mb-4"></div>
                            <p className="text-[#fbaa19] font-bold tracking-widest uppercase text-xs">Sincronizando Calendário da FIA...</p>
                        </div>
                    ) : (
                        <div className="flex flex-col gap-4">
                            {races.map((race) => {
                                const raceDate = new Date(`${race.date}T${race.time || "00:00:00Z"}`);
                                const isPast = raceDate < now;
                                const isSelected = currentSelectedRound === race.round || (currentSelectedRound === "last" && !isPast && races.find(r => new Date(`${r.date}T${r.time || "00:00:00Z"}`) > now)?.round === race.round);

                                return (
                                    <div key={race.round} className={`flex flex-col md:flex-row border-l-4 p-4 gap-4 transition-colors ${isSelected ? 'border-[#00ff00] bg-[#00ff00]/5' : 'border-[#fbaa19] bg-black/50 hover:bg-black'}`}>
                                        
                                        <div className="flex flex-col md:w-1/3 border-b md:border-b-0 md:border-r border-white/10 pb-4 md:pb-0 md:pr-4">
                                            <div className="flex justify-between items-start mb-2">
                                                <span className="bg-[#fbaa19] text-black font-black px-2 py-1 text-[10px] uppercase tracking-widest">ROUND {race.round}</span>
                                                <span className="text-gray-500 text-xs font-bold uppercase tracking-widest">{formatDateTime(race.date)}</span>
                                            </div>
                                            <h3 className="text-lg font-black uppercase tracking-widest text-white">{race.raceName}</h3>
                                            <p className="text-xs text-gray-400 uppercase tracking-widest">{race.Circuit.circuitName}</p>
                                            <p className="text-[10px] text-gray-500 uppercase font-bold mt-1">{race.Circuit.Location.locality}, {race.Circuit.Location.country}</p>
                                        </div>

                                        <div className="flex-1 grid grid-cols-2 lg:grid-cols-3 gap-2 text-[10px] md:text-xs">
                                            <div className="bg-white/5 p-2 flex flex-col">
                                                <span className="text-gray-500 font-bold uppercase">FP1</span>
                                                <span className="text-white font-bold">{formatDateTime(race.FirstPractice?.date, race.FirstPractice?.time)}</span>
                                            </div>
                                            <div className="bg-white/5 p-2 flex flex-col">
                                                <span className="text-gray-500 font-bold uppercase">FP2</span>
                                                <span className="text-white font-bold">{formatDateTime(race.SecondPractice?.date, race.SecondPractice?.time)}</span>
                                            </div>
                                            <div className="bg-white/5 p-2 flex flex-col">
                                                <span className="text-gray-500 font-bold uppercase">{race.Sprint ? 'Sprint Shootout' : 'FP3'}</span>
                                                <span className="text-white font-bold">{formatDateTime(race.ThirdPractice?.date, race.ThirdPractice?.time)}</span>
                                            </div>
                                            <div className="bg-white/5 p-2 flex flex-col">
                                                <span className="text-[#fbaa19] font-bold uppercase">Qualifying</span>
                                                <span className="text-white font-bold">{formatDateTime(race.Qualifying?.date, race.Qualifying?.time)}</span>
                                            </div>
                                            {race.Sprint && (
                                                <div className="bg-white/5 p-2 flex flex-col">
                                                    <span className="text-[#fbaa19] font-bold uppercase">Sprint</span>
                                                    <span className="text-white font-bold">{formatDateTime(race.Sprint?.date, race.Sprint?.time)}</span>
                                                </div>
                                            )}
                                            <div className="bg-[#fbaa19]/10 p-2 flex flex-col border border-[#fbaa19]/20">
                                                <span className="text-[#fbaa19] font-black uppercase">Race</span>
                                                <span className="text-white font-bold">{formatDateTime(race.date, race.time)}</span>
                                            </div>
                                        </div>

                                        <div className="flex flex-col justify-center items-end md:w-32">
                                            {isPast ? (
                                                <button 
                                                    onClick={() => onSelectRound(race.round)}
                                                    className="w-full bg-[#00ff00] text-black font-black uppercase tracking-widest text-[10px] py-3 hover:bg-white transition-colors"
                                                >
                                                    Resultados
                                                </button>
                                            ) : (
                                                <button 
                                                    onClick={() => onSelectRound(race.round)}
                                                    className="w-full bg-white/10 text-white font-black uppercase tracking-widest text-[10px] py-3 hover:bg-[#fbaa19] hover:text-black transition-colors"
                                                >
                                                    Visualizar
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
