"use client";
import React, { useState } from 'react';
import Link from 'next/link';

const driversList = [
    "VER", "PER", "HAM", "RUS", "LEC", "SAI", "NOR", "PIA", "ALO", "STR",
    "GAS", "OCO", "ALB", "SAR", "TSU", "RIC", "BOT", "ZHO", "MAG", "HUL", "BEA", "LAW"
];

const sessions = [
    "FP1", "FP2", "FP3", "Q1", "Q2", "Q3", "Qualy Sprint", "Sprint Race", "Race"
];

export default function RaceControlPage() {
    const [activeView, setActiveView] = useState<'dashboard' | 'resultados'>('dashboard');
    const [selectedSession, setSelectedSession] = useState(sessions[8]);
    const [results, setResults] = useState<string[]>(Array(22).fill(''));

    return (
        <main className="w-full min-h-screen bg-white dark:bg-[#0a0a0a] text-black dark:text-white p-4 md:p-8 pt-12 font-sans pb-24">
            <div className="max-w-7xl mx-auto flex flex-col gap-8">
                
                {/* Header Section */}
                <header className="flex flex-col gap-2 border-b-2 border-[#fbaa19] pb-6 relative overflow-hidden">
                    <div className="flex items-center gap-3 mb-2 text-[#fbaa19]">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"></path>
                        </svg>
                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-black uppercase tracking-widest font-display">Race Control</h1>
                    </div>
                    <p className="text-gray-500 uppercase tracking-widest text-sm md:text-base font-bold">
                        Painel de Governança // Comunidade & Comissários
                    </p>
                </header>

                {activeView === 'resultados' ? (
                    <div className="flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="flex items-center justify-between border-b border-black/10 dark:border-white/10 pb-4">
                            <h2 className="text-2xl font-black uppercase tracking-widest">Input de Resultados</h2>
                            <button 
                                onClick={() => setActiveView('dashboard')}
                                className="text-sm font-bold uppercase tracking-widest border border-black/20 dark:border-white/20 px-4 py-2 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors"
                            >
                                Voltar
                            </button>
                        </div>
                        
                        <div className="bg-gray-50 dark:bg-[#111] border border-black/10 dark:border-white/10 p-6 rounded-sm">
                            <div className="mb-8 flex flex-col gap-2">
                                <label className="text-sm font-bold uppercase tracking-widest text-[#fbaa19]">Sessão</label>
                                <select 
                                    value={selectedSession}
                                    onChange={(e) => setSelectedSession(e.target.value)}
                                    className="p-3 bg-white dark:bg-black border-2 border-black/20 dark:border-white/20 text-black dark:text-white font-bold uppercase tracking-widest outline-none focus:border-[#fbaa19]"
                                >
                                    {sessions.map(s => <option key={s} value={s}>{s}</option>)}
                                </select>
                            </div>

                            <div className="flex flex-col gap-4">
                                <label className="text-sm font-bold uppercase tracking-widest text-[#fbaa19]">Classificação Final (1º ao 22º)</label>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {Array.from({ length: 22 }).map((_, i) => (
                                        <div key={i} className="flex items-center gap-4">
                                            <div className="w-12 text-right font-black text-xl text-gray-400">P{i + 1}</div>
                                            <select 
                                                value={results[i]}
                                                onChange={(e) => {
                                                    const newRes = [...results];
                                                    newRes[i] = e.target.value;
                                                    setResults(newRes);
                                                }}
                                                className="flex-1 p-3 bg-white dark:bg-black border border-black/20 dark:border-white/20 text-black dark:text-white font-bold uppercase tracking-widest outline-none focus:border-[#fbaa19]"
                                            >
                                                <option value="">Selecione o piloto</option>
                                                {driversList.map(d => (
                                                    <option key={d} value={d} disabled={results.includes(d) && results[i] !== d}>{d}</option>
                                                ))}
                                            </select>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            
                            <div className="mt-8 pt-6 border-t border-black/10 dark:border-white/10 flex justify-end">
                                <button className="bg-[#fbaa19] text-black font-black uppercase tracking-widest px-8 py-4 hover:bg-black hover:text-[#fbaa19] dark:hover:bg-white transition-colors border-2 border-[#fbaa19]">
                                    Salvar Resultados Oficiais
                                </button>
                            </div>
                        </div>
                    </div>
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
                                        <span className="text-xs text-gray-500 text-left">Resolução de conflitos de ligas.</span>
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
                                            <span className="font-bold text-sm uppercase tracking-wider">Denúncia: Violação de Prazo</span>
                                            <span className="text-xs text-gray-500">Usuário @Hamilton44 submeteu aposta após Q1.</span>
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
                                        <span className="text-[#fbaa19]">VOCÊ</span>
                                    </li>
                                </ul>
                            </section>
                        </div>
                    </div>
                )}
            </div>
        </main>
    );
}
