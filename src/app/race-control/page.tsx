"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

import { F1_DRIVERS, getDriverDetails, fetchNextEvent, F1Event } from '@/api/f1-data';

const getTeamColor = (team: string) => {
    switch(team) {
        case 'McLaren': return '#FF8000';
        case 'Ferrari': return '#E8002D';
        case 'Mercedes': return '#27F4D2';
        case 'Red Bull': return '#3671C6';
        case 'Aston Martin': return '#229971';
        case 'Alpine': return '#0093cc';
        case 'Haas': return '#B6BABD';
        case 'Racing Bulls': return '#6692FF';
        case 'Cadillac': return '#FFB800';
        case 'Williams': return '#64C4FF';
        case 'Audi/Sauber': return '#52e252';
        default: return '#ffffff';
    }
}

const initialDrivers = F1_DRIVERS.map(driverName => {
    const details = getDriverDetails(driverName);
    return {
        id: details.num,
        name: driverName,
        team: details.team,
        color: getTeamColor(details.team)
    };
});

const sessions = [
    "FP1", "FP2", "FP3", "Q1", "Q2", "Q3", "Qualy Sprint", "Sprint Race", "Race"
];

export default function RaceControlPage() {
    const [activeView, setActiveView] = useState<'dashboard' | 'resultados'>('dashboard');
    const [selectedSession, setSelectedSession] = useState(sessions[8]);
    const [results, setResults] = useState(initialDrivers);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [successMsg, setSuccessMsg] = useState("");
    const [currentEvent, setCurrentEvent] = useState<F1Event | null>(null);

    useEffect(() => {
        fetchNextEvent().then(event => setCurrentEvent(event));
    }, []);

    const handleSaveResults = () => {
        setIsSubmitting(true);
        // Simulate API Database submission
        setTimeout(() => {
            setIsSubmitting(false);
            setSuccessMsg("Base de dados sincronizada com sucesso! (MOCK)");
            console.log("Mock DB - Resultados Oficiais da", selectedSession, ":", results.map((d, i) => `P${i+1}: ${d.id}`));
            setTimeout(() => setSuccessMsg(""), 5000);
        }, 1200);
    };

    const moveUp = (index: number) => {
        if (index === 0) return;
        const newResults = [...results];
        const temp = newResults[index - 1];
        newResults[index - 1] = newResults[index];
        newResults[index] = temp;
        setResults(newResults);
    };

    const moveDown = (index: number) => {
        if (index === results.length - 1) return;
        const newResults = [...results];
        const temp = newResults[index + 1];
        newResults[index + 1] = newResults[index];
        newResults[index] = temp;
        setResults(newResults);
    };

    return (
        <div className="w-full flex flex-col min-h-screen bg-gray-50 dark:bg-black text-black dark:text-white pb-24">
            <header className="w-full p-4 md:p-8 border-b-4 border-[#fbaa19] bg-white dark:bg-[#111]">
                <div className="max-w-6xl mx-auto flex flex-col gap-4">
                    <p className="text-[#fbaa19] text-sm md:text-base font-bold uppercase tracking-[0.2em] font-display">F1 // VOLTGRID</p>
                    <h1 className="text-4xl md:text-5xl font-black uppercase tracking-widest font-display">Race Control</h1>
                    <p className="text-gray-600 dark:text-gray-400 text-sm md:text-base">Painel de gerenciamento de dados oficiais, pontuação e integridade.</p>
                </div>
            </header>

            <main className="flex-1 w-full max-w-6xl mx-auto p-4 md:p-8 mt-4 flex flex-col gap-8">
                <nav className="flex flex-row gap-4 border-b border-black/10 dark:border-white/10 pb-4 overflow-x-auto scrollbar-hide min-w-max">
                    <button 
                        onClick={() => setActiveView('dashboard')}
                        className={`text-sm md:text-base font-bold uppercase tracking-widest px-4 py-2 border-b-2 transition-colors ${activeView === 'dashboard' ? 'border-[#fbaa19] text-[#fbaa19]' : 'border-transparent text-gray-500 hover:text-black dark:hover:text-white'}`}
                    >
                        Visão Geral
                    </button>
                    <button 
                        onClick={() => setActiveView('resultados')}
                        className={`text-sm md:text-base font-bold uppercase tracking-widest px-4 py-2 border-b-2 transition-colors ${activeView === 'resultados' ? 'border-[#fbaa19] text-[#fbaa19]' : 'border-transparent text-gray-500 hover:text-black dark:hover:text-white'}`}
                    >
                        Inserir Resultados
                    </button>
                </nav>

                {activeView === 'resultados' ? (
                    <section className="flex flex-col gap-6 animate-fade-in">
                        <div className="flex flex-col gap-2">
                            <h2 className="text-2xl md:text-3xl font-black uppercase tracking-widest border-l-4 border-[#fbaa19] pl-4">Resultados Oficiais</h2>
                            <p className="text-gray-600 dark:text-gray-400 text-sm">Atualize os resultados de cada sessão. Impacta diretamente na pontuação dos jogadores no Milesimus.</p>
                        </div>
                        
                        <div className="bg-gray-50 dark:bg-[#111] border border-black/10 dark:border-white/10 p-4 md:p-8 rounded-sm">
                            <div className="mb-8 flex flex-col gap-2">
                                <div className="flex flex-col md:flex-row md:items-end justify-between mb-2 border-b border-black/10 dark:border-white/10 pb-2 gap-2">
                                    <label className="text-sm font-bold uppercase tracking-widest text-[#fbaa19]">Sessão</label>
                                    {currentEvent ? (
                                        <span className="text-xs font-bold uppercase tracking-widest text-gray-500">
                                            ROUND {currentEvent.round} // {currentEvent.name}
                                        </span>
                                    ) : (
                                        <span className="text-xs font-bold uppercase tracking-widest text-gray-500 animate-pulse">
                                            LOADING EVENT...
                                        </span>
                                    )}
                                </div>
                                
                                <div className="flex overflow-x-auto scrollbar-hide gap-2 py-2">
                                    {sessions.map(s => (
                                        <button
                                            key={s}
                                            type="button"
                                            onClick={() => setSelectedSession(s)}
                                            className={`shrink-0 px-4 py-3 border-2 font-bold uppercase tracking-widest text-xs transition-colors ${
                                                selectedSession === s 
                                                    ? 'bg-[#fbaa19] text-black border-[#fbaa19]'
                                                    : 'bg-white dark:bg-[#1a1a1a] text-black dark:text-white border-black/20 dark:border-white/20 hover:border-[#fbaa19]'
                                            }`}
                                        >
                                            {s}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="flex flex-col gap-4">
                                <label className="text-sm font-bold uppercase tracking-widest text-[#fbaa19] mb-2 border-b border-black/10 dark:border-white/10 pb-2">
                                    Classificação Final (Ajuste a ordem)
                                </label>
                                <div className="flex flex-col gap-2">
                                    {results.map((driver, i) => (
                                        <div 
                                            key={driver.id} 
                                            className="flex items-stretch bg-white dark:bg-black border border-black/10 dark:border-white/10 overflow-hidden shadow-sm hover:border-black/30 dark:hover:border-white/30 transition-colors"
                                            style={{ borderLeftWidth: '6px', borderLeftColor: driver.color }}
                                        >
                                            {/* Position */}
                                            <div className="w-12 md:w-16 flex items-center justify-center bg-black/5 dark:bg-white/5 border-r border-black/10 dark:border-white/10">
                                                <span className="font-black text-lg text-gray-500">P{i + 1}</span>
                                            </div>
                                            
                                            {/* Driver Info */}
                                            <div className="flex-1 flex flex-col justify-center px-4 py-2">
                                                <span className="font-bold uppercase tracking-wider text-black dark:text-white leading-tight">
                                                    {driver.name} <span className="text-[#fbaa19]">#{driver.id}</span>
                                                </span>
                                                <span className="text-xs uppercase tracking-widest font-medium opacity-60">
                                                    {driver.team}
                                                </span>
                                            </div>

                                            {/* Controls */}
                                            <div className="flex flex-col border-l border-black/10 dark:border-white/10 w-12 md:w-16">
                                                <button 
                                                    onClick={() => moveUp(i)}
                                                    disabled={i === 0}
                                                    className="flex-1 flex items-center justify-center bg-gray-50 dark:bg-[#1a1a1a] hover:bg-black hover:text-[#fbaa19] dark:hover:bg-white dark:hover:text-black transition-colors disabled:opacity-30 disabled:cursor-not-allowed border-b border-black/10 dark:border-white/10"
                                                    title="Mover para cima"
                                                >
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7"></path></svg>
                                                </button>
                                                <button 
                                                    onClick={() => moveDown(i)}
                                                    disabled={i === results.length - 1}
                                                    className="flex-1 flex items-center justify-center bg-gray-50 dark:bg-[#1a1a1a] hover:bg-black hover:text-[#fbaa19] dark:hover:bg-white dark:hover:text-black transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                                                    title="Mover para baixo"
                                                >
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            
                            <div className="mt-8 pt-6 border-t border-black/10 dark:border-white/10 flex flex-col sm:flex-row items-center justify-end gap-4">
                                {successMsg && (
                                    <span className="text-green-500 font-bold uppercase tracking-widest animate-pulse text-sm">
                                        {successMsg}
                                    </span>
                                )}
                                <button 
                                    onClick={handleSaveResults}
                                    disabled={isSubmitting}
                                    className="bg-[#fbaa19] text-black font-black uppercase tracking-widest px-8 py-4 hover:bg-black hover:text-[#fbaa19] dark:hover:bg-white transition-colors border-2 border-[#fbaa19] shadow-lg shadow-[#fbaa19]/20 w-full md:w-auto disabled:opacity-50 disabled:cursor-wait"
                                >
                                    {isSubmitting ? "Sincronizando..." : "Salvar Resultados Oficiais"}
                                </button>
                            </div>
                        </div>
                    </section>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Left Column: Dashboard content */}
                        <div className="lg:col-span-2 flex flex-col gap-8">
                            <section className="bg-gray-50 dark:bg-[#111] border border-black/10 dark:border-white/10 p-6 rounded-sm">
                                <h2 className="text-xl font-black uppercase tracking-widest mb-6 border-b border-black/10 dark:border-white/10 pb-4">League Operations</h2>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <button 
                                        onClick={() => setActiveView('resultados')}
                                        className="flex flex-col items-start gap-2 p-4 bg-[#fbaa19]/10 border-2 border-[#fbaa19] hover:bg-[#fbaa19] hover:text-black transition-colors group text-black dark:text-white"
                                    >
                                        <svg className="w-6 h-6 text-[#fbaa19] group-hover:text-black transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                        <span className="font-black uppercase tracking-widest text-sm">Validar Resultados</span>
                                        <span className="text-xs text-black/70 dark:text-white/70 group-hover:text-black/80 text-left">Input oficial do GP. fp1, fp2, qualy, race.</span>
                                    </button>
                                    <button className="flex flex-col items-start gap-2 p-4 bg-white dark:bg-black border border-black/10 dark:border-white/10 hover:border-[#fbaa19] transition-colors group">
                                        <svg className="w-6 h-6 text-gray-400 group-hover:text-[#fbaa19] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z"></path></svg>
                                        <span className="font-bold uppercase tracking-widest text-sm">Gerenciar Teamwork</span>
                                        <span className="text-xs text-gray-500 text-left">ResoluÃ§Ã£o de conflitos de ligas.</span>
                                    </button>
                                    <button className="flex flex-col items-start gap-2 p-4 bg-white dark:bg-black border border-black/10 dark:border-white/10 hover:border-[#fbaa19] transition-colors group">
                                        <svg className="w-6 h-6 text-gray-400 group-hover:text-[#fbaa19] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
                                        <span className="font-bold uppercase tracking-widest text-sm">Avisos do Paddock</span>
                                        <span className="text-xs text-gray-500 text-left">Dispare mensagens globais.</span>
                                    </button>
                                    <button className="flex flex-col items-start gap-2 p-4 bg-white dark:bg-black border border-black/10 dark:border-white/10 hover:border-[#fbaa19] transition-colors group opacity-50 cursor-not-allowed">
                                        <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
                                        <span className="font-bold uppercase tracking-widest text-sm">Silly Season Admin</span>
                                        <span className="text-xs text-gray-500 text-left">Trancado. Abre apenas no fim do ano.</span>
                                    </button>
                                </div>
                            </section>

                            <section className="bg-gray-50 dark:bg-[#111] border border-black/10 dark:border-white/10 p-6 rounded-sm">
                                <h2 className="text-xl font-black uppercase tracking-widest mb-6 border-b border-black/10 dark:border-white/10 pb-4">Stewards Room</h2>
                                <div className="flex flex-col gap-4">
                                    <div className="bg-white dark:bg-black border-l-4 border-l-[#fbaa19] border border-black/10 dark:border-white/10 p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                                        <div className="flex flex-col gap-1">
                                            <span className="font-bold text-sm uppercase tracking-wider">DenÃºncia: ViolaÃ§Ã£o de Prazo</span>
                                            <span className="text-xs text-gray-500">UsuÃ¡rio @Hamilton44 submeteu aposta apÃ³s Q1.</span>
                                        </div>
                                        <div className="flex gap-2 w-full sm:w-auto">
                                            <button className="flex-1 sm:flex-none bg-green-500/10 text-green-600 border border-green-500 px-4 py-2 text-xs font-bold uppercase tracking-widest hover:bg-green-500 hover:text-white transition-colors">Absolver</button>
                                            <button className="flex-1 sm:flex-none bg-red-500/10 text-red-600 border border-red-500 px-4 py-2 text-xs font-bold uppercase tracking-widest hover:bg-red-500 hover:text-white transition-colors">Punir -10pts</button>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </div>

                        {/* Right Column */}
                        <div className="flex flex-col gap-6">
                            <section className="bg-black text-white p-6 rounded-sm border border-[#fbaa19]/30">
                                <h2 className="text-lg font-black uppercase tracking-widest mb-4 flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                                    Status do Servidor
                                </h2>
                                <ul className="space-y-4 font-mono text-xs">
                                    <li className="flex justify-between border-b border-white/10 pb-2">
                                        <span className="text-gray-400">Banco de Dados</span>
                                        <span className="text-green-400">ONLINE</span>
                                    </li>
                                    <li className="flex justify-between border-b border-white/10 pb-2">
                                        <span className="text-gray-400">Motor de Pontos</span>
                                        <span className="text-green-400">SINCRONIZADO</span>
                                    </li>
                                    <li className="flex justify-between pb-2">
                                        <span className="text-gray-400">Diretor Ativo</span>
                                        <span className="text-[#fbaa19]">VOCÃŠ</span>
                                    </li>
                                </ul>
                            </section>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}
