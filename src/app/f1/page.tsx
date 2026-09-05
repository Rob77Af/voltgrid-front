"use client";
import React, { useState } from "react";
import RaceRemoteControl from "@/components/race-remote-control";
import { useJolpicaStandings, useJolpicaCalendar, useJolpicaRaceResults, JolpicaRace } from "@/hooks/useJolpica";

const F1_TABS = [
    { id: "results", label: "Race Results" },
    { id: "ranking", label: "Ranking" },
    { id: "calendar", label: "Calendar" },
    { id: "teams", label: "Teams" },
    { id: "drivers", label: "Drivers" },
    { id: "stats", label: "Stats" },
    { id: "others", label: "Others" }
];

function DriverRankingTable() {
    const { drivers, isLoading } = useJolpicaStandings("2024");
    if (isLoading) return <div className="p-8 text-center animate-pulse text-[#fbaa19] font-bold">CARREGANDO RANKING...</div>;
    return (
        <div className="flex flex-col w-full border border-black/20 dark:border-white/10 bg-white dark:bg-[#111]">
            <div className="bg-[#fbaa19] text-black font-black uppercase tracking-widest p-4 text-xl">Campeonato de Pilotos (2024)</div>
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
    const { constructors, isLoading } = useJolpicaStandings("2024");
    if (isLoading) return null;
    return (
        <div className="flex flex-col w-full border border-black/20 dark:border-white/10 bg-white dark:bg-[#111]">
            <div className="bg-black text-[#fbaa19] border-b-2 border-[#fbaa19] font-black uppercase tracking-widest p-4 text-xl">Campeonato de Construtores (2024)</div>
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

function CalendarView() {
    const { races, isLoading } = useJolpicaCalendar("2024");
    if (isLoading) return <div className="p-8 text-center animate-pulse text-[#fbaa19] font-bold">CARREGANDO CALENDARIO...</div>;
    return (
        <div className="flex flex-col gap-4">
            <h2 className="text-2xl font-black uppercase tracking-widest border-l-4 border-[#fbaa19] pl-4">Calendario Oficial da Temporada (2024)</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                {races.map((race) => (
                    <div key={race.round} className="flex flex-col bg-white dark:bg-[#1a1a1a] border border-black/10 dark:border-white/10 p-4 hover:border-[#fbaa19] transition-colors group">
                        <div className="flex justify-between items-start border-b border-black/10 dark:border-white/10 pb-3 mb-3">
                            <div className="bg-[#fbaa19] text-black font-black px-2 py-1 text-sm uppercase tracking-widest">RND {race.round}</div>
                            <div className="text-right flex flex-col">
                                <span className="font-bold text-black dark:text-white uppercase tracking-widest">{new Date(race.date).toLocaleDateString("pt-BR", { day: "2-digit", month: "short" })}</span>
                            </div>
                        </div>
                        <h3 className="text-xl font-bold uppercase tracking-widest text-black dark:text-white group-hover:text-[#fbaa19] transition-colors">{race.raceName}</h3>
                        <p className="text-sm text-gray-500 uppercase tracking-widest mt-1">{race.Circuit.circuitName} - {race.Circuit.Location.country}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

function RaceResultsView({ round }: { round: string }) {
    const { results, isLoading } = useJolpicaRaceResults("2024", round);
    if (isLoading) return <div className="p-8 text-center animate-pulse text-[#fbaa19] font-bold">BUSCANDO CLASSIFICACAO OFICIAL...</div>;
    if (!results || results.length === 0) return <div className="p-8 text-center text-gray-500 uppercase tracking-widest border border-dashed border-gray-400">Resultados nao disponiveis para este round ainda.</div>;
    return (
        <div className="flex flex-col w-full border border-black/20 dark:border-white/10 bg-white dark:bg-[#111]">
            <div className="bg-[#fbaa19] text-black font-black uppercase tracking-widest p-4 text-xl">Classificacao Oficial (2024 - Round {round})</div>
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-black/5 dark:bg-white/5 text-gray-500 uppercase tracking-widest text-xs">
                            <th className="p-3">Pos</th>
                            <th className="p-3">N</th>
                            <th className="p-3">Piloto</th>
                            <th className="p-3 hidden sm:table-cell">Equipe</th>
                            <th className="p-3 text-right">Tempo/Grid</th>
                            <th className="p-3 text-right">Pts</th>
                        </tr>
                    </thead>
                    <tbody>
                        {results.map((r) => (
                            <tr key={r.number} className="border-b border-black/5 dark:border-white/5 hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                                <td className="p-3 font-black text-gray-400">{r.position}</td>
                                <td className="p-3 font-bold text-[#fbaa19]">{r.number}</td>
                                <td className="p-3 font-bold text-black dark:text-white uppercase tracking-widest">{r.Driver.givenName.charAt(0)}. {r.Driver.familyName}</td>
                                <td className="p-3 text-sm text-gray-500 uppercase hidden sm:table-cell">{r.Constructor.name}</td>
                                <td className="p-3 text-right text-xs uppercase text-gray-500">{r.Time?.time || r.status}</td>
                                <td className="p-3 text-right font-black text-[#fbaa19] text-lg">{r.points}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default function F1Page() {
    const [activeTab, setActiveTab] = useState("results");
    const [activeResultRound, setActiveResultRound] = useState("1"); 
    const [isStuck, setIsStuck] = useState(false);
    const menuRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        const handleScroll = () => {
            if (menuRef.current) {
                const top = menuRef.current.getBoundingClientRect().top;
                const threshold = window.innerWidth >= 768 ? 83 : 67;
                setIsStuck(top <= threshold);
            }
        };
        
        window.addEventListener("scroll", handleScroll, { passive: true });
        handleScroll();
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <main className="w-full max-w-6xl mx-auto p-4 md:p-8 pt-12 pb-24 flex flex-col items-center justify-start min-h-screen">
            <header className="w-full border-b-4 border-[#fbaa19] pb-6 flex flex-col gap-4">
                <p className="text-[#fbaa19] text-sm md:text-base font-bold uppercase tracking-[0.2em] font-display">THE PINNACLE OF MOTORSPORT</p>
                <h1 className="text-black dark:text-white text-4xl sm:text-5xl md:text-5xl lg:text-5xl font-black uppercase tracking-widest font-display mb-2">
                    F1 HUB
                </h1>
            </header>
            
            <div className="w-full sticky top-[64px] md:top-[80px] z-30 bg-gray-50 dark:bg-black pt-4 pb-0 mb-8 border-b-2 border-black/10 dark:border-white/10">
                <div 
                    ref={menuRef}
                    className="flex flex-row overflow-x-auto scrollbar-hide min-w-max w-full snap-x snap-mandatory"
                >
                    {F1_TABS.map(tab => (
                        <button 
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`snap-start shrink-0 font-bold uppercase tracking-widest transition-all duration-300 border-b-4 ${
                                isStuck 
                                    ? "pb-4 px-4 md:px-6 text-xs md:text-sm" 
                                    : "pb-3 px-3 md:px-4 text-[10px] md:text-xs"
                            } ${
                                activeTab === tab.id 
                                ? "text-[#fbaa19] border-[#fbaa19]" 
                                : "text-gray-500 border-transparent hover:text-black dark:hover:text-white"
                            }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>
            </div>
            
            <div className="w-full">
                {activeTab === "calendar" && (
                    <div className="animate-fade-in w-full">
                        <CalendarView />
                    </div>
                )}
                
                {activeTab === "results" && (
                    <div className="flex flex-col gap-6 w-full animate-fade-in">
                        <div className="flex flex-col gap-2">
                            <h2 className="text-black dark:text-white font-bold uppercase tracking-widest text-2xl">Season Results</h2>
                            <p className="text-gray-500 text-sm">Select a race to view full session timings and classifications.</p>
                        </div>
                        
                        <RaceRemoteControl 
                            activeRound={activeResultRound.padStart(2, "0")} 
                            baseUrl="#" 
                            onRoundSelect={(round) => setActiveResultRound(parseInt(round).toString())} 
                        />

                        <div className="w-full mt-4">
                            <RaceResultsView round={activeResultRound} />
                        </div>
                    </div>
                )}
                
                {activeTab === "ranking" && (
                    <div className="w-full flex flex-col lg:flex-row gap-8 animate-fade-in">
                        <div className="flex-1">
                            <DriverRankingTable />
                        </div>
                        <div className="flex-1">
                            <ConstructorRankingTable />
                        </div>
                    </div>
                )}
                
                {["teams", "drivers", "stats", "others"].includes(activeTab) && (
                    <div className="p-12 text-center flex flex-col items-center justify-center gap-4 bg-white dark:bg-[#1a1a1a] border border-black/20 dark:border-[#ffffff3d] animate-fade-in">
                        <h3 className="text-xl font-bold text-black dark:text-white uppercase tracking-widest">{activeTab}</h3>
                        <p className="text-gray-500">Coming soon.</p>
                    </div>
                )}
            </div>
        </main>
    );
}
