"use client";
import React, { useState } from "react";
import RaceEventHero from "@/components/next-race-hero";
import F1CalendarModal from "@/components/f1-calendar-modal";
import { useJolpicaStandings, useJolpicaRaceResults } from "@/hooks/useJolpica";
import { useOpenF1Session } from "@/hooks/useOpenF1";


function DriverRankingTable() {
    const { drivers, isLoading } = useJolpicaStandings("current");
    if (isLoading) return <div className="p-8 text-center animate-pulse text-[#fbaa19] font-bold">CARREGANDO RANKING...</div>;
    return (
        <div className="flex flex-col w-full border border-black/20 dark:border-white/10 bg-white dark:bg-[#111]">
            <div className="bg-[#fbaa19] text-black font-black uppercase tracking-widest p-4 text-xl">Campeonato de Pilotos (2026)</div>
            <div className="flex flex-col">
                {drivers.map((d, i) => (
                    <div key={d.Driver.driverId} className="flex items-center p-3 md:p-4 border-b border-black/5 dark:border-white/5 hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                        <div className="w-10 text-xl font-black text-gray-400">{d.position}</div>
                        <div className="flex-1 flex flex-col pl-4 border-l border-black/10 dark:border-white/10">
                            <span className="font-bold uppercase tracking-widest text-black dark:text-white">{d.Driver.givenName} <span className="text-xl">{d.Driver.familyName}</span></span>
                            <span className="text-xs text-gray-500 uppercase">{d.Constructors[0]?.name || "N/A"}</span>
                        </div>
                        <div className="flex flex-col items-end">
                            <span className="text-2xl font-black text-[#fbaa19]">{d.points}</span>
                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">PTS</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

function ConstructorRankingTable() {
    const { constructors, isLoading } = useJolpicaStandings("current");
    if (isLoading) return null;
    return (
        <div className="flex flex-col w-full border border-black/20 dark:border-white/10 bg-white dark:bg-[#111] mt-8">
            <div className="bg-black text-[#fbaa19] border-b-2 border-[#fbaa19] font-black uppercase tracking-widest p-4 text-xl">Campeonato de Construtores (2026)</div>
            <div className="flex flex-col">
                {constructors.map((c, i) => (
                    <div key={c.Constructor.constructorId} className="flex items-center p-3 md:p-4 border-b border-black/5 dark:border-white/5 hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                        <div className="w-10 text-xl font-black text-gray-400">{c.position}</div>
                        <div className="flex-1 pl-4 border-l border-black/10 dark:border-white/10">
                            <span className="font-bold uppercase tracking-widest text-black dark:text-white text-xl">{c.Constructor.name}</span>
                        </div>
                        <div className="flex flex-col items-end">
                            <span className="text-2xl font-black text-[#fbaa19]">{c.points}</span>
                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">PTS</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

function RaceResultsView({ round, session }: { round: string, session: string }) {
    const isOfficialSession = ['race', 'quali', 'sprint'].includes(session);
    
    // Hooks are always called, but we use the results of the relevant one based on isOfficialSession
    const jolpi = useJolpicaRaceResults("current", round, isOfficialSession ? (session as any) : "race");
    const openf1 = useOpenF1Session(session);

    // Smart Hybrid Routing
    const jolpiEmpty = !jolpi.isLoading && jolpi.results.length === 0;
    const fallbackToOpenF1 = isOfficialSession && jolpiEmpty && openf1.results.length > 0;
    const effectiveIsOfficial = isOfficialSession && !fallbackToOpenF1;

    const isLoading = effectiveIsOfficial ? jolpi.isLoading : openf1.isLoading;
    const results = effectiveIsOfficial ? jolpi.results : openf1.results;
    const error = effectiveIsOfficial ? null : openf1.error;
    
    if (isLoading) return (
        <div className="p-12 text-center animate-pulse flex flex-col items-center justify-center border border-dashed border-gray-400/30 bg-black/5 dark:bg-white/5">
            <div className={`w-8 h-8 rounded-full border-4 border-t-transparent animate-spin mb-4 ${effectiveIsOfficial ? 'border-[#fbaa19]' : 'border-[#00ff00]'}`}></div>
            <p className={`font-bold tracking-widest uppercase text-xs ${effectiveIsOfficial ? 'text-[#fbaa19]' : 'text-[#00ff00]'}`}>
                {effectiveIsOfficial ? 'Buscando Classificacao Oficial (FIA)...' : 'Sincronizando telemetria (OpenF1)...'}
            </p>
        </div>
    );
    
    if (error) {
        return (
            <div className="p-12 text-center text-red-500 uppercase tracking-widest border border-dashed border-red-500/30 bg-red-500/5">
                Erro ao carregar telemetria: {error}
            </div>
        );
    }

    if (!results || results.length === 0) {
        return (
            <div className="p-12 text-center text-gray-500 uppercase tracking-widest border border-dashed border-gray-400/30 bg-black/5 dark:bg-white/5">
                Resultados nÃ£o disponÃ­veis para esta sessÃ£o ainda.
            </div>
        );
    }

    return (
        <div className="flex flex-col w-full border border-black/20 dark:border-white/10 bg-white dark:bg-[#111]">
            <div className={`border-b-2 font-black uppercase tracking-widest p-4 text-xs md:text-sm flex justify-between items-center ${effectiveIsOfficial ? 'bg-[#fbaa19] text-black border-[#fbaa19]' : 'bg-[#00ff00]/10 text-[#00ff00] border-[#00ff00]/20'}`}>
                <span>{effectiveIsOfficial ? `Classificacao Oficial (${session})` : fallbackToOpenF1 ? `Telemetria em Tempo Real (${session} - Aguardando FIA)` : 'OpenF1 Live Telemetry Engine'}</span>
                {!effectiveIsOfficial && <span className="animate-pulse">â— LIVE</span>}
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-black/5 dark:bg-white/5 text-gray-500 uppercase tracking-widest text-[10px] md:text-xs">
                            <th className="p-3">Pos</th>
                            <th className="p-3">N</th>
                            <th className="p-3">Piloto</th>
                            <th className="p-3 hidden sm:table-cell">Equipe</th>
                            <th className="p-3 text-right">Tempo/Status</th>
                            <th className="p-3 text-right">Pts</th>
                        </tr>
                    </thead>
                    <tbody>
                        {results.map((r: any, index: number) => (
                            <tr key={r.number || index} className="border-b border-black/5 dark:border-white/5 hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                                <td className="p-3 font-black text-gray-400">{r.position}</td>
                                <td className="p-3 font-bold text-[#fbaa19]">{r.number}</td>
                                <td className="p-3 font-bold text-black dark:text-white uppercase tracking-widest whitespace-nowrap">
                                    {r.Driver.givenName.charAt(0)}. {r.Driver.familyName}
                                </td>
                                <td className="p-3 text-[10px] md:text-xs text-gray-500 uppercase hidden sm:table-cell whitespace-nowrap">{r.Constructor?.name || 'Unknown'}</td>
                                <td className="p-3 text-right text-[10px] uppercase text-gray-500">
                                    {effectiveIsOfficial ? (r.Time?.time || r.status) : <span className="bg-[#00ff00]/10 text-[#00ff00] px-2 py-1 rounded-sm border border-[#00ff00]/20">Validating</span>}
                                </td>
                                <td className="p-3 text-right font-black text-[#fbaa19] text-sm md:text-lg">{effectiveIsOfficial ? r.points : (r.position <= 10 ? '?' : '-')}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default function F1Page() {
    const [view, setView] = useState<"results" | "ranking">("results");
    const [sessionTab, setSessionTab] = useState<"fp1" | "fp2" | "fp3" | "quali" | "sprint" | "race">("race");
    const [selectedRound, setSelectedRound] = useState<string>("last");
    const [isCalendarOpen, setIsCalendarOpen] = useState(false);

    const sessionTabs = [
        { id: "fp1", label: "FP1" },
        { id: "fp2", label: "FP2" },
        { id: "fp3", label: "FP3" },
        { id: "quali", label: "QUALI" },
        { id: "sprint", label: "SPRINT" },
        { id: "race", label: "RACE" }
    ];

    const handleSelectRound = (round: string) => {
        setSelectedRound(round);
        setIsCalendarOpen(false);
        setView("results");
    };

    return (
        <main className="w-full min-h-screen pb-24 bg-gray-50 dark:bg-black relative">
            
            <F1CalendarModal 
                isOpen={isCalendarOpen} 
                onClose={() => setIsCalendarOpen(false)} 
                onSelectRound={handleSelectRound}
                currentSelectedRound={selectedRound}
            />

            {/* HERO COMUNICA O EVENTO DIRETAMENTE */}
            <RaceEventHero selectedRound={selectedRound} onOpenCalendar={() => setIsCalendarOpen(true)} />

            <div className="w-full max-w-7xl mx-auto px-4 md:px-8 mt-[-20px] md:mt-[-32px] relative z-20">
                
                {/* GLOBAL PAGE TOGGLE (RESULTS VS RANKING) */}
                <div className="flex justify-end mb-4">
                    <button 
                        onClick={() => setView(view === "results" ? "ranking" : "results")}
                        className="bg-black text-[#fbaa19] border-2 border-black hover:bg-[#fbaa19] hover:text-black hover:border-[#fbaa19] transition-colors px-6 py-3 font-black uppercase tracking-widest text-xs md:text-sm shadow-xl flex items-center gap-2"
                    >
                        {view === "results" ? (
                            <>
                                <span>Ver Rankings Globais</span>
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path></svg>
                            </>
                        ) : (
                            <>
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 17l-5-5m0 0l5-5m-5 5h12"></path></svg>
                                <span>Voltar para Resultados</span>
                            </>
                        )}
                    </button>
                </div>

                {view === "results" ? (
                    <div className="flex flex-col animate-fade-in">
                        {/* BOTOES DE SESSAO */}
                        <div className="flex overflow-x-auto scrollbar-hide bg-white dark:bg-[#111] border border-black/10 dark:border-white/10 shadow-lg mb-6">
                            {sessionTabs.map(tab => (
                                <button 
                                    key={tab.id}
                                    onClick={() => setSessionTab(tab.id as any)}
                                    className={`flex-1 min-w-[80px] font-black uppercase tracking-widest transition-all duration-300 py-4 px-2 text-[10px] md:text-xs text-center border-b-4 ${
                                        sessionTab === tab.id 
                                        ? "bg-black text-[#fbaa19] border-[#fbaa19]" 
                                        : "text-gray-500 hover:bg-black/5 dark:hover:bg-white/5 border-transparent hover:text-black dark:hover:text-white"
                                    }`}
                                >
                                    {tab.label}
                                </button>
                            ))}
                        </div>

                        {/* TABELA DE RESULTADOS */}
                        <RaceResultsView round={selectedRound} session={sessionTab} />
                    </div>
                ) : (
                    <div className="flex flex-col animate-fade-in gap-8">
                        {/* RANKING COMPONENTS */}
                        <DriverRankingTable />
                        <ConstructorRankingTable />
                    </div>
                )}
            </div>
        </main>
    );
}


