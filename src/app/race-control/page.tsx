import React from 'react';
import Link from 'next/link';

export default function RaceControlPage() {
    return (
        <main className="w-full min-h-screen bg-white dark:bg-[#0a0a0a] text-black dark:text-white p-4 md:p-8 pt-12 font-sans pb-24">
            <div className="max-w-7xl mx-auto flex flex-col gap-8">
                
                {/* Header Section */}
                <header className="flex flex-col gap-2 border-b-2 border-[#fbaa19] pb-6 relative overflow-hidden">
                    {/* Decorative watermark */}
                    <div className="absolute right-0 top-0 opacity-5 dark:opacity-10 pointer-events-none translate-x-1/4 -translate-y-1/4">
                        <svg className="w-64 h-64" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path></svg>
                    </div>
                    
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

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    
                    {/* Left Column: Actions & Operations */}
                    <div className="lg:col-span-2 flex flex-col gap-6">
                        
                        <section className="bg-gray-50 dark:bg-[#111] border border-black/10 dark:border-white/10 p-6 rounded-sm relative">
                            <div className="flex items-center justify-between mb-6 border-b border-black/10 dark:border-white/10 pb-4">
                                <h2 className="text-xl font-black uppercase tracking-widest">Stewards Room</h2>
                                <span className="bg-red-500 text-white text-[10px] font-bold px-2 py-1 uppercase tracking-widest animate-pulse">2 Investigações Ativas</span>
                            </div>
                            
                            <p className="text-sm text-gray-500 mb-6">Julgamentos da comunidade pendentes de votação.</p>
                            
                            <div className="flex flex-col gap-4">
                                {/* Report 1 */}
                                <div className="bg-white dark:bg-black border border-l-4 border-l-red-500 border-black/10 dark:border-white/10 p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                                    <div className="flex flex-col gap-1">
                                        <span className="text-xs text-gray-400 font-mono">ID #8492 - ABU DHABI</span>
                                        <span className="font-bold text-sm uppercase tracking-wider">Violação de Prazo de Aposta</span>
                                        <span className="text-xs text-gray-500">Usuário reportou falha no sistema após o Qualy.</span>
                                    </div>
                                    <div className="flex gap-2 w-full sm:w-auto">
                                        <button className="flex-1 sm:flex-none bg-green-500/10 text-green-600 dark:text-green-400 border border-green-500/20 px-4 py-2 text-xs font-bold uppercase tracking-widest hover:bg-green-500 hover:text-white transition-colors">Absolver</button>
                                        <button className="flex-1 sm:flex-none bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/20 px-4 py-2 text-xs font-bold uppercase tracking-widest hover:bg-red-500 hover:text-white transition-colors">Punir (-10pts)</button>
                                    </div>
                                </div>
                                
                                {/* Report 2 */}
                                <div className="bg-white dark:bg-black border border-l-4 border-l-[#fbaa19] border-black/10 dark:border-white/10 p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                                    <div className="flex flex-col gap-1">
                                        <span className="text-xs text-gray-400 font-mono">ID #8493 - GERAL</span>
                                        <span className="font-bold text-sm uppercase tracking-wider">Revisão de Regra: H2H</span>
                                        <span className="text-xs text-gray-500">Proposta da comunidade para dobrar os pontos no Sprint.</span>
                                    </div>
                                    <div className="flex gap-2 w-full sm:w-auto">
                                        <button className="flex-1 sm:flex-none bg-black dark:bg-white text-white dark:text-black border border-black dark:border-white px-4 py-2 text-xs font-bold uppercase tracking-widest hover:opacity-80 transition-opacity">Votar</button>
                                    </div>
                                </div>
                            </div>
                        </section>

                        <section className="bg-gray-50 dark:bg-[#111] border border-black/10 dark:border-white/10 p-6 rounded-sm">
                            <h2 className="text-xl font-black uppercase tracking-widest mb-6 border-b border-black/10 dark:border-white/10 pb-4">League Operations</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <button className="flex flex-col items-start gap-2 p-4 bg-white dark:bg-black border border-black/10 dark:border-white/10 hover:border-[#fbaa19] transition-colors group">
                                    <svg className="w-6 h-6 text-gray-400 group-hover:text-[#fbaa19] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                    <span className="font-bold uppercase tracking-widest text-sm">Validar Resultados</span>
                                    <span className="text-xs text-gray-500 text-left">Aprove os resultados do último Grand Prix.</span>
                                </button>
                                <button className="flex flex-col items-start gap-2 p-4 bg-white dark:bg-black border border-black/10 dark:border-white/10 hover:border-[#fbaa19] transition-colors group">
                                    <svg className="w-6 h-6 text-gray-400 group-hover:text-[#fbaa19] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z"></path></svg>
                                    <span className="font-bold uppercase tracking-widest text-sm">Gerenciar Teamwork</span>
                                    <span className="text-xs text-gray-500 text-left">Resolução de conflitos de ligas privadas.</span>
                                </button>
                                <button className="flex flex-col items-start gap-2 p-4 bg-white dark:bg-black border border-black/10 dark:border-white/10 hover:border-[#fbaa19] transition-colors group">
                                    <svg className="w-6 h-6 text-gray-400 group-hover:text-[#fbaa19] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
                                    <span className="font-bold uppercase tracking-widest text-sm">Avisos do Paddock</span>
                                    <span className="text-xs text-gray-500 text-left">Dispare mensagens globais no dashboard.</span>
                                </button>
                                <button className="flex flex-col items-start gap-2 p-4 bg-white dark:bg-black border border-black/10 dark:border-white/10 hover:border-[#fbaa19] transition-colors group opacity-50 cursor-not-allowed">
                                    <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
                                    <span className="font-bold uppercase tracking-widest text-sm">Silly Season Admin</span>
                                    <span className="text-xs text-gray-500 text-left">Trancado. Abre apenas no fim da temporada.</span>
                                </button>
                            </div>
                        </section>
                    </div>

                    {/* Right Column: Status & Directory */}
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
                                <li className="flex justify-between border-b border-white/10 pb-2">
                                    <span className="text-gray-400">Última Corrida</span>
                                    <span className="text-gray-300">Miami GP (Rd 06)</span>
                                </li>
                                <li className="flex justify-between pb-2">
                                    <span className="text-gray-400">Diretor Ativo</span>
                                    <span className="text-[#fbaa19]">VOCÊ</span>
                                </li>
                            </ul>
                        </section>

                        <section className="bg-gray-50 dark:bg-[#111] border border-black/10 dark:border-white/10 p-6 rounded-sm">
                            <h2 className="text-lg font-black uppercase tracking-widest mb-4 border-b border-black/10 dark:border-white/10 pb-2">Diretrizes da FIA</h2>
                            <p className="text-xs text-gray-500 mb-4 leading-relaxed">
                                Como organizador e membro do Race Control, você tem o poder e o dever de manter a integridade da liga. Toda decisão no Stewards Room afeta o Milesimus global.
                            </p>
                            <Link href="/terms-conditions" className="text-xs font-bold uppercase tracking-widest text-[#fbaa19] hover:underline flex items-center gap-1">
                                Ler Regulamento Esportivo 
                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                            </Link>
                        </section>
                    </div>

                </div>
            </div>
        </main>
    );
}
