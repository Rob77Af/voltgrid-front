"use client";
import React, { useState } from 'react';

const TEAMWORK_TABS = [
    { id: 'race-results', label: 'Race Results' },
    { id: 'ranking', label: 'Ranking' },
    { id: 'stats', label: 'Stats' },
    { id: 'rules', label: 'Rules' }
];

const MIAMI_RESULTS = [
    { pos: 1, team: 'Apex Predators', drivers: 'M.VERSTAPPEN / L.NORRIS', pts: 87, gap: 'LEADER' },
    { pos: 2, team: 'Scuderia Veloce', drivers: 'C.LECLERC / C.SAINZ', pts: 76, gap: '+11' },
    { pos: 3, team: 'Silver Arrows F1', drivers: 'G.RUSSELL / O.PIASTRI', pts: 65, gap: '+22' },
    { pos: 4, team: 'Neon Racing', drivers: 'S.PEREZ / Y.TSUNODA', pts: 54, gap: '+33' },
    { pos: 5, team: 'Midnight Drivers', drivers: 'A.ALBON / F.ALONSO', pts: 42, gap: '+45' },
];

export default function TeamworkCompetition({ activeTab }: { activeTab: string }) {
    return (
        <div className="w-full flex flex-col gap-6">
            {/* Content Area */}
            <div className="bg-white dark:bg-[#1a1a1a] border border-black/20 dark:border-[#ffffff3d] p-4 md:p-6 rounded-sm">
                {activeTab === 'race-results' && (
                    <div className="flex flex-col overflow-x-auto">
                        <div className="mb-6">
                            <h2 className="text-xl md:text-2xl font-black uppercase tracking-wider text-black dark:text-white">Miami Grand Prix</h2>
                            <p className="text-sm text-[#fbaa19] font-bold tracking-widest uppercase">Official Teamwork Results</p>
                        </div>
                        
                        <div className="min-w-[600px]">
                            {/* Table Header */}
                            <div className="grid grid-cols-12 gap-4 border-b-2 border-black/20 dark:border-[#ffffff3d] pb-3 mb-3 text-xs md:text-sm text-gray-500 uppercase tracking-widest font-bold">
                                <div className="col-span-1 text-center">POS</div>
                                <div className="col-span-4">Fantasy Team</div>
                                <div className="col-span-4">Drivers</div>
                                <div className="col-span-1 text-right">PTS</div>
                                <div className="col-span-2 text-right">GAP</div>
                            </div>

                            {/* Table Rows */}
                            <div className="flex flex-col gap-2">
                                {MIAMI_RESULTS.map((row, idx) => (
                                    <div 
                                        key={idx} 
                                        className="grid grid-cols-12 gap-4 items-center bg-gray-50 dark:bg-[#0a0a0a] border border-black/10 dark:border-[#ffffff1a] p-3 hover:border-[#fbaa19] transition-colors"
                                    >
                                        <div className="col-span-1 text-center font-bold text-black dark:text-white">
                                            {row.pos}
                                        </div>
                                        <div className="col-span-4 font-bold text-black dark:text-white uppercase tracking-wider text-sm">
                                            {row.team}
                                        </div>
                                        <div className="col-span-4 text-gray-600 dark:text-gray-400 text-xs tracking-wider">
                                            {row.drivers}
                                        </div>
                                        <div className="col-span-1 text-right font-mono font-bold text-[#00ff88]">
                                            {row.pts}
                                        </div>
                                        <div className="col-span-2 text-right font-mono text-gray-500 text-xs">
                                            {row.gap}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'ranking' && (
                    <div className="p-12 text-center flex flex-col items-center justify-center gap-4">
                        <svg className="w-12 h-12 text-[#fbaa19]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
                        </svg>
                        <h3 className="text-xl font-bold text-black dark:text-white uppercase tracking-widest">Global Ranking</h3>
                        <p className="text-gray-500">Championship standings will be available after Round 1.</p>
                    </div>
                )}

                {activeTab === 'stats' && (
                    <div className="p-12 text-center flex flex-col items-center justify-center gap-4">
                        <svg className="w-12 h-12 text-[#fbaa19]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                        </svg>
                        <h3 className="text-xl font-bold text-black dark:text-white uppercase tracking-widest">Team Analytics</h3>
                        <p className="text-gray-500">Performance data is currently being processed.</p>
                    </div>
                )}

                {activeTab === 'rules' && (
                    <div className="flex flex-col gap-8 max-w-4xl mx-auto p-4 md:p-8">
                        <div className="text-center mb-8">
                            <h3 className="text-2xl md:text-3xl font-black text-black dark:text-white uppercase tracking-widest font-display mb-4">
                                TEAMWORK RULES
                            </h3>
                            <p className="text-gray-500 max-w-2xl mx-auto">
                                Junte seus amigos e forme a escuderia definitiva. O campeonato onde a força do grupo é o que define o sucesso global.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Card 1: A Liga Privada */}
                            <div className="bg-white dark:bg-[#111] border border-black/10 dark:border-white/10 p-6 rounded-lg flex flex-col gap-3">
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="w-10 h-10 rounded-full bg-[#fbaa19]/20 flex items-center justify-center text-[#fbaa19] shrink-0">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
                                    </div>
                                    <h4 className="font-bold uppercase tracking-widest text-sm">1. A Liga Privada</h4>
                                </div>
                                <p className="text-gray-500 text-sm leading-relaxed">
                                    Você pode convidar até <strong>30 amigos</strong> para formarem uma liga privada. Todo o gerenciamento da sua liga ocorre diretamente pelo seu dashboard (no painel <em>My Teamwork</em> na página Superlicense).
                                </p>
                                <div className="mt-auto pt-4 border-t border-black/5 dark:border-white/5">
                                    <p className="text-xs text-gray-500">
                                        <strong className="text-black dark:text-white">Customização:</strong> Você é o chefe da equipe! O grupo recebe o seu nome por padrão, mas você tem total liberdade para renomeá-lo e criar a identidade da sua escuderia.
                                    </p>
                                </div>
                            </div>

                            {/* Card 2: Pontuação Interna */}
                            <div className="bg-white dark:bg-[#111] border border-black/10 dark:border-white/10 p-6 rounded-lg flex flex-col gap-3">
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="w-10 h-10 rounded-full bg-[#fbaa19]/20 flex items-center justify-center text-[#fbaa19] shrink-0">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                                    </div>
                                    <h4 className="font-bold uppercase tracking-widest text-sm">2. Pontuação (Milesimus)</h4>
                                </div>
                                <p className="text-gray-500 text-sm leading-relaxed">
                                    Dentro do seu grupo Teamwork, a pontuação levada em consideração é o <strong>Milesimus Score</strong> de cada membro.
                                </p>
                                <p className="text-gray-500 text-sm leading-relaxed mt-2">
                                    Ou seja, o que importa é a soma absoluta de todo o desempenho individual nas variadas competições do Fantasy (Master, Poletime, Evo, etc).
                                </p>
                            </div>

                            {/* Card 3: O Campeonato Global */}
                            <div className="bg-black/5 dark:bg-[#111] border border-[#fbaa19] p-6 rounded-lg flex flex-col gap-3 md:col-span-2 shadow-[0_0_15px_rgba(251,170,25,0.1)]">
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="w-10 h-10 rounded-full bg-[#fbaa19] flex items-center justify-center text-black shrink-0">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                    </div>
                                    <h4 className="font-bold uppercase tracking-widest text-sm text-black dark:text-white">3. O Campeonato Global (A Média)</h4>
                                </div>
                                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                                    No cenário mundial de Teamwork, a sua liga enfrentará os grupos de outros jogadores. Como os grupos podem ter tamanhos diferentes (até 30 pessoas), o critério de pontuação da escuderia para o Ranking Global será a <strong>MÉDIA do Milesimus</strong> de todos os seus membros ativos.
                                </p>
                                
                                <div className="mt-4 flex flex-col sm:flex-row gap-4 justify-center items-center font-mono text-xs p-4 bg-white dark:bg-black rounded border border-black/10 dark:border-white/10">
                                    <div className="text-center">
                                        <span className="block text-gray-500 mb-1 uppercase tracking-widest">Soma Milesimus da Equipe</span>
                                        <span className="text-lg font-bold">120.000 pts</span>
                                    </div>
                                    <div className="text-gray-300 dark:text-gray-600 text-lg">÷</div>
                                    <div className="text-center">
                                        <span className="block text-gray-500 mb-1 uppercase tracking-widest">Nº de Membros</span>
                                        <span className="text-lg font-bold">15</span>
                                    </div>
                                    <div className="text-[#fbaa19] text-lg">=</div>
                                    <div className="text-center">
                                        <span className="block text-gray-500 mb-1 uppercase tracking-widest text-[#fbaa19]">Pontuação Teamwork</span>
                                        <span className="text-lg font-bold text-[#fbaa19]">8.000 pts</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
