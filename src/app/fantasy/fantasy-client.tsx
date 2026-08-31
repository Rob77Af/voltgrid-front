"use client";
import React, { useState } from 'react';
import CompetitionsRemoteControl from '@/components/competitions-remote-control';
import TeamworkCompetition from '@/components/teamwork-competition';
import RaceRemoteControl from '@/components/race-remote-control';

const FANTASY_TABS = [
    { id: 'race-results', label: 'Race Results' },
    { id: 'ranking', label: 'Ranking' },
    { id: 'stats', label: 'Stats' },
    { id: 'rules', label: 'Rules' }
];

export default function FantasyClient() {
    const [activeId, setActiveId] = useState('poletime-competition');
    const [activeTab, setActiveTab] = useState('race-results');
    const [activeResultRound, setActiveResultRound] = useState('03'); // Default to last mock active event
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
        
        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll(); // Check initially
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const renderContent = () => {
        if (activeId === 'teamwork') {
            return <TeamworkCompetition activeTab={activeTab} />;
        }
        
        return (
            <div className="bg-white dark:bg-[#1a1a1a] border border-black/20 dark:border-[#ffffff3d] p-4 md:p-6 rounded-sm">
                {activeTab === 'race-results' && (
                    <div className="flex flex-col gap-6">
                        <RaceRemoteControl 
                            activeRound={activeResultRound} 
                            baseUrl="#"
                            onRoundSelect={(round) => setActiveResultRound(round)}
                        />
                        
                        <div className="p-8 text-center flex flex-col items-center justify-center gap-4 bg-black/5 dark:bg-white/5 border border-dashed border-black/20 dark:border-white/20 mt-4">
                            <h3 className="text-xl font-bold text-black dark:text-white uppercase tracking-widest">{getCompetitionTitle(activeId)} Results</h3>
                            <p className="text-gray-500">
                                Simulando resultados do <strong>ROUND {activeResultRound}</strong> para a competição {getCompetitionTitle(activeId)}.
                            </p>
                            <div className="mt-4 text-xs font-mono bg-white dark:bg-black p-4 rounded-md border border-black/10 dark:border-white/10">
                                {/* Fake table placeholder */}
                                <div className="flex justify-between border-b pb-2 mb-2 w-64">
                                    <span>P1</span><span className="text-[#fbaa19] font-bold">100 pts</span>
                                </div>
                                <div className="flex justify-between border-b pb-2 mb-2 w-64">
                                    <span>P2</span><span className="text-gray-500">80 pts</span>
                                </div>
                                <div className="flex justify-between w-64">
                                    <span>P3</span><span className="text-gray-500">60 pts</span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                {activeTab === 'ranking' && (
                    <div className="p-12 text-center flex flex-col items-center justify-center gap-4">
                        <svg className="w-12 h-12 text-[#fbaa19]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path></svg>
                        <h3 className="text-xl font-bold text-black dark:text-white uppercase tracking-widest">Global Ranking</h3>
                        <p className="text-gray-500">Championship standings will be updated shortly.</p>
                    </div>
                )}
                {activeTab === 'stats' && (
                    <div className="p-12 text-center flex flex-col items-center justify-center gap-4">
                        <svg className="w-12 h-12 text-[#fbaa19]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg>
                        <h3 className="text-xl font-bold text-black dark:text-white uppercase tracking-widest">Analytics</h3>
                        <p className="text-gray-500">Performance data is currently being processed.</p>
                    </div>
                )}
                {activeTab === 'rules' && (
                    <div className="flex flex-col">
                        {activeId === 'poletime-competition' ? (
                            <div className="flex flex-col gap-8 max-w-3xl mx-auto p-4 md:p-8">
                                <div className="text-center mb-6">
                                    <h3 className="text-2xl md:text-3xl font-black text-black dark:text-white uppercase tracking-widest font-display mb-4">
                                        POLETIME RULES
                                    </h3>
                                    <p className="text-gray-500 max-w-xl mx-auto">
                                        Domine os milissegundos e craque o tempo perfeito na Qualificação.
                                    </p>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                                    <div className="bg-white dark:bg-[#111] border border-black/10 dark:border-white/10 p-6 rounded-lg flex flex-col gap-3 hover:border-[#fbaa19] transition-colors">
                                        <div className="w-10 h-10 rounded-full bg-[#fbaa19]/20 flex items-center justify-center text-[#fbaa19] mb-2">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                                        </div>
                                        <h4 className="font-bold uppercase tracking-widest text-sm">O Objetivo</h4>
                                        <p className="text-gray-500 text-sm leading-relaxed">
                                            Sua missão é prever com a maior precisão possível qual será o <strong>tempo exato da Pole Position</strong> (o tempo mais rápido do Q3 na sessão de Qualificação).
                                        </p>
                                    </div>
                                    <div className="bg-white dark:bg-[#111] border border-black/10 dark:border-white/10 p-6 rounded-lg flex flex-col gap-3 hover:border-[#fbaa19] transition-colors">
                                        <div className="w-10 h-10 rounded-full bg-[#fbaa19]/20 flex items-center justify-center text-[#fbaa19] mb-2">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path></svg>
                                        </div>
                                        <h4 className="font-bold uppercase tracking-widest text-sm">A Matemática</h4>
                                        <p className="text-gray-500 text-sm leading-relaxed">
                                            A pontuação máxima perfeita é de <strong>5.000 pontos</strong>. Cada 1 milissegundo (ms) de erro custa 1 ponto.<br/>
                                            <span className="inline-block mt-2 font-mono text-[#fbaa19] bg-black/5 dark:bg-white/5 p-2 rounded">Pts = 5.000 - GAP(ms)</span>
                                        </p>
                                    </div>
                                </div>

                                <div className="bg-black/5 dark:bg-white/5 border border-dashed border-black/20 dark:border-white/20 p-6 md:p-8 rounded-lg flex flex-col items-center text-center">
                                    <h4 className="font-bold uppercase tracking-widest text-[#fbaa19] mb-6">Exemplo Prático</h4>
                                    
                                    <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12 w-full max-w-xl">
                                        <div className="flex flex-col items-center">
                                            <span className="text-xs text-gray-500 uppercase tracking-widest mb-1">Tempo Oficial</span>
                                            <span className="text-xl md:text-2xl font-mono font-black text-black dark:text-white">1:24.000</span>
                                        </div>
                                        
                                        <div className="hidden md:flex flex-col items-center opacity-50">
                                            <div className="w-16 h-px bg-current"></div>
                                        </div>
                                        
                                        <div className="flex flex-col items-center">
                                            <span className="text-xs text-gray-500 uppercase tracking-widest mb-1">Seu Palpite</span>
                                            <span className="text-xl md:text-2xl font-mono font-bold text-gray-400">1:24.250</span>
                                        </div>
                                    </div>
                                    
                                    <div className="mt-8 pt-6 border-t border-black/10 dark:border-white/10 w-full max-w-xl flex flex-col sm:flex-row items-center justify-between gap-4">
                                        <div className="text-left">
                                            <span className="block text-xs text-gray-500 uppercase tracking-widest">Gap (Erro)</span>
                                            <span className="block font-mono font-bold text-red-500">250 ms</span>
                                        </div>
                                        <div className="text-right">
                                            <span className="block text-xs text-gray-500 uppercase tracking-widest">Pontuação Final</span>
                                            <span className="block text-2xl font-black text-[#fbaa19]">4.750 pts</span>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="mt-6 p-6 border-l-4 border-[#fbaa19] bg-white dark:bg-[#111]">
                                    <h4 className="font-bold uppercase tracking-widest text-sm mb-3">Limites (Edge Cases)</h4>
                                    <ul className="text-gray-500 text-sm space-y-3">
                                        <li className="flex gap-2">
                                            <span className="text-[#fbaa19] font-bold">✓</span> 
                                            <span><strong>Na mosca:</strong> Se você cravar o tempo exato, leva os 5.000 pontos totais!</span>
                                        </li>
                                        <li className="flex gap-2">
                                            <span className="text-[#fbaa19] font-bold">⚠</span> 
                                            <span><strong>Erro superior a 5s:</strong> Se o gap for maior que 5.000 ms, sua pontuação será <strong>0</strong>. Não existem pontuações negativas no Poletime.</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        ) : activeId === 'master-competition' ? (
                            <div className="flex flex-col gap-8 max-w-4xl mx-auto p-4 md:p-8">
                                <div className="text-center mb-8">
                                    <h3 className="text-2xl md:text-3xl font-black text-black dark:text-white uppercase tracking-widest font-display mb-4">
                                        MASTER RULES
                                    </h3>
                                    <p className="text-gray-500 max-w-2xl mx-auto">
                                        Uma simulação brutal baseada nos moldes oficiais da Fórmula 1, onde a disputa acontece dentro do seu próprio grupo de 22 competidores.
                                    </p>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* Card 1: Grupos */}
                                    <div className="bg-white dark:bg-[#111] border border-black/10 dark:border-white/10 p-6 rounded-lg flex flex-col gap-3">
                                        <div className="flex items-center gap-3 mb-2">
                                            <div className="w-10 h-10 rounded-full bg-[#fbaa19]/20 flex items-center justify-center text-[#fbaa19] shrink-0">
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
                                            </div>
                                            <h4 className="font-bold uppercase tracking-widest text-sm">Estrutura de Grupos</h4>
                                        </div>
                                        <p className="text-gray-500 text-sm leading-relaxed">
                                            Você compete em um micro-campeonato. Cada grupo tem capacidade para exatos <strong>22 participantes</strong> (o grid oficial da F1). Existem 500 grupos disponíveis no total.
                                        </p>
                                        <div className="mt-2 text-xs p-3 bg-black/5 dark:bg-white/5 border-l-2 border-[#fbaa19]">
                                            <strong>Nota Histórica:</strong> Os 34 primeiros grupos homenageiam todos os Campeões Mundiais da F1, indo do Grupo 1 (G. Farina) ao Grupo 34 (L. Norris).
                                        </div>
                                    </div>

                                    {/* Card 2: Pontuação do Palpite */}
                                    <div className="bg-white dark:bg-[#111] border border-black/10 dark:border-white/10 p-6 rounded-lg flex flex-col gap-3">
                                        <div className="flex items-center gap-3 mb-2">
                                            <div className="w-10 h-10 rounded-full bg-[#fbaa19]/20 flex items-center justify-center text-[#fbaa19] shrink-0">
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"></path></svg>
                                            </div>
                                            <h4 className="font-bold uppercase tracking-widest text-sm">1. Acertos do Evento</h4>
                                        </div>
                                        <p className="text-gray-500 text-sm leading-relaxed">
                                            Seu objetivo inicial é acertar o resultado da corrida. Ao acertar a posição exata de um piloto, você ganha pontos de performance.
                                        </p>
                                        <div className="mt-auto pt-2 flex flex-wrap gap-1 text-[10px] font-mono">
                                            <span className="px-2 py-1 bg-[#fbaa19] text-black font-bold">P1: 25</span>
                                            <span className="px-2 py-1 bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300">P2: 18</span>
                                            <span className="px-2 py-1 bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300">P3: 15</span>
                                            <span className="px-2 py-1 bg-gray-100 dark:bg-gray-900 text-gray-500">Até P10 (1pt)</span>
                                        </div>
                                    </div>

                                    {/* Card 3: O Ranking do Grupo */}
                                    <div className="bg-white dark:bg-[#111] border border-black/10 dark:border-white/10 p-6 rounded-lg flex flex-col gap-3 md:col-span-2 border-l-4 border-l-[#fbaa19]">
                                        <div className="flex items-center gap-3 mb-2">
                                            <div className="w-10 h-10 rounded-full bg-[#fbaa19]/20 flex items-center justify-center text-[#fbaa19] shrink-0">
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path></svg>
                                            </div>
                                            <h4 className="font-bold uppercase tracking-widest text-sm">2. O Ranking do Grupo (Estilo F1)</h4>
                                        </div>
                                        <p className="text-gray-500 text-sm leading-relaxed mb-4">
                                            A pontuação que você faz nos palpites serve apenas para te ranquear <strong>contra os outros 21 jogadores do seu grupo</strong> naquele evento. Os pontos do campeonato são distribuídos apenas para o Top 10 do grupo, seguindo rigorosamente o modelo oficial da FIA:
                                        </p>
                                        
                                        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-center text-xs font-mono">
                                            <div className="bg-black/5 dark:bg-white/5 p-2 rounded border border-black/10 dark:border-white/10">
                                                <span className="block text-gray-400">1º do Grupo</span>
                                                <span className="block text-lg font-bold text-[#fbaa19]">25 pts</span>
                                            </div>
                                            <div className="bg-black/5 dark:bg-white/5 p-2 rounded border border-black/10 dark:border-white/10">
                                                <span className="block text-gray-400">2º do Grupo</span>
                                                <span className="block text-lg font-bold text-gray-700 dark:text-gray-300">18 pts</span>
                                            </div>
                                            <div className="bg-black/5 dark:bg-white/5 p-2 rounded border border-black/10 dark:border-white/10">
                                                <span className="block text-gray-400">3º do Grupo</span>
                                                <span className="block text-lg font-bold text-gray-700 dark:text-gray-300">15 pts</span>
                                            </div>
                                            <div className="bg-black/5 dark:bg-white/5 p-2 rounded border border-black/10 dark:border-white/10">
                                                <span className="block text-gray-400">4º ao 10º</span>
                                                <span className="block text-lg font-bold text-gray-500">12 a 1</span>
                                            </div>
                                            <div className="bg-black/5 dark:bg-white/5 p-2 rounded border border-black/10 dark:border-white/10 opacity-50">
                                                <span className="block text-gray-400">11º ao 22º</span>
                                                <span className="block text-lg font-bold text-gray-500">0 pts</span>
                                            </div>
                                        </div>
                                    </div>
                                    
                                </div>
                                <div className="text-center mt-4">
                                    <p className="text-sm text-gray-500 font-bold uppercase tracking-widest">
                                        O Campeão Master do seu grupo será aquele que acumular mais pontos no Ranking final!
                                    </p>
                                </div>
                            </div>
                        ) : (
                            <div className="p-12 text-center flex flex-col items-center justify-center gap-4">
                                <svg className="w-12 h-12 text-[#fbaa19]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"></path></svg>
                                <h3 className="text-xl font-bold text-black dark:text-white uppercase tracking-widest">Competition Rules</h3>
                                <p className="text-gray-500">Official rules and point distributions for {getCompetitionTitle(activeId)}.</p>
                            </div>
                        )}
                    </div>
                )}
            </div>
        );
    };

    const getCompetitionTitle = (id: string) => {
        switch (id) {
            case 'poletime-competition': return 'POLETIME COMPETITION';
            case 'master-competition': return 'MASTER COMPETITION';
            case 'milesimus': return 'MILESIMUS';
            case 'teamwork': return 'TEAMWORK';
            case 'silly-season': return 'SILLY SEASON';
            case 'paddock': return 'PADDOCK';
            case 'stats': return 'GLOBAL STATS';
            default: return 'COMPETITIONS';
        }
    };

    return (
        <div className="flex flex-col gap-8">
            <header className="mb-4 border-b-4 border-[#fbaa19] pb-6 md:pb-8 flex flex-col gap-4">
                <p className="text-[#fbaa19] text-sm md:text-base font-bold uppercase tracking-[0.2em] font-display">F1 // FANTASY</p>
                <h1 className="text-black dark:text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black uppercase tracking-widest font-display mb-2">
                    {getCompetitionTitle(activeId)}
                </h1>
                <p className="text-gray-600 dark:text-gray-400 text-base md:text-lg max-w-2xl">
                    Select a competition below to view your standing and global performance.
                </p>
            </header>

            <CompetitionsRemoteControl activeId={activeId} setActiveId={setActiveId} />
            
            {/* Global Fantasy Sub-menu (Sticky) */}
            <div 
                ref={menuRef}
                className={`w-full sticky top-[66px] md:top-[82px] z-40 transition-all duration-300 ${
                    isStuck 
                        ? 'bg-gray-100 dark:bg-[#0a0a0a] py-1 shadow-sm border-b border-black/10 dark:border-white/10' 
                        : 'bg-transparent pt-4'
                }`}
            >
                <div className={`flex flex-nowrap overflow-x-auto scrollbar-hide gap-1 md:gap-4 border-b border-black/20 dark:border-[#ffffff3d] transition-all duration-300 ${
                    isStuck ? 'pb-0 border-transparent dark:border-transparent' : 'pb-0'
                }`}>
                    {FANTASY_TABS.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`uppercase font-bold tracking-widest transition-all duration-300 border-b-2 whitespace-nowrap shrink-0 ${
                                isStuck 
                                    ? 'pb-2 px-4 text-xs md:text-sm' 
                                    : 'pb-3 px-3 md:px-4 text-[10px] md:text-xs'
                            } ${
                                activeTab === tab.id 
                                ? 'text-[#fbaa19] border-[#fbaa19]' 
                                : 'text-gray-500 border-transparent hover:text-black dark:hover:text-white'
                            }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>
            </div>

            <section className="mt-2 min-h-screen" aria-live="polite">
                {renderContent()}
            </section>
        </div>
    );
}
