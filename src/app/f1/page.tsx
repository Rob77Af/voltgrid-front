"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import Calendar from '@/components/calendar';
import { mockCalendar } from '@/api/f1-data';

const F1_TABS = [
    { id: 'results', label: 'Race Results' },
    { id: 'ranking', label: 'Ranking' },
    { id: 'calendar', label: 'Calendar' },
    { id: 'teams', label: 'Teams' },
    { id: 'drivers', label: 'Drivers' },
    { id: 'stats', label: 'Stats' },
    { id: 'others', label: 'Others' }
];

export default function F1Page() {
    const [activeTab, setActiveTab] = useState('results');
    const [isStuck, setIsStuck] = useState(false);
    const menuRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        const handleScroll = () => {
            if (menuRef.current) {
                // If the top of the menu is at or below the sticky threshold (64px mobile, 80px desktop)
                const top = menuRef.current.getBoundingClientRect().top;
                const threshold = window.innerWidth >= 768 ? 83 : 67;
                setIsStuck(top <= threshold);
            }
        };
        
        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll(); // Check initially
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <main className="w-full max-w-6xl mx-auto p-4 md:p-8 pt-12 pb-24 flex flex-col items-center justify-start min-h-screen">
            <header className="w-full border-b-4 border-[#fbaa19] pb-6 flex flex-col gap-4">
                <p className="text-[#fbaa19] text-sm md:text-base font-bold uppercase tracking-[0.2em] font-display">THE PINNACLE OF MOTORSPORT</p>
                <h1 className="text-black dark:text-white text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-widest font-display mb-2">
                    F1 HUB
                </h1>
            </header>
            
            {/* Sticky Internal Tab Menu Wrapper */}
            <div 
                ref={menuRef}
                className={`w-full sticky top-[66px] md:top-[82px] z-40 transition-all duration-300 mb-8 ${
                    isStuck 
                        ? 'bg-gray-100 dark:bg-[#0a0a0a] py-1 shadow-sm border-b border-black/10 dark:border-white/10' 
                        : 'bg-gray-100 dark:bg-[#0a0a0a] pt-4'
                }`}
            >
                <div className={`flex flex-nowrap overflow-x-auto scrollbar-hide gap-1 md:gap-4 border-b border-black/20 dark:border-[#ffffff3d] transition-all duration-300 ${
                    isStuck ? 'pb-0 border-transparent dark:border-transparent' : 'pb-0'
                }`}>
                    {F1_TABS.map(tab => (
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
            
            <div className="w-full">
                {activeTab === 'calendar' && <Calendar />}
                {activeTab === 'results' && (
                    <div className="flex flex-col gap-12 w-full">
                        <div className="bg-black/5 dark:bg-white/5 p-6 rounded-lg border-2 border-dashed border-[#fbaa19]">
                            <h2 className="text-[#fbaa19] font-black uppercase tracking-widest text-xl mb-6">Demonstração das 3 Opções de Navegação</h2>
                            <p className="text-gray-500 mb-8">Aqui estão os 3 estilos de navegação para você testar e escolher qual prefere para a versão final.</p>
                            
                            {/* OPTION 1: SEASON GRID */}
                            <div className="mb-12">
                                <h3 className="text-black dark:text-white font-bold uppercase tracking-widest text-lg mb-2">Opção 1: Season Grid (Visão Macro)</h3>
                                <p className="text-gray-400 text-sm mb-4">Um grid visual com todas as corridas do ano. Corridas passadas ficam ativas, futuras ficam opacas.</p>
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                                    {mockCalendar.map((race, index) => {
                                        const isCompleted = index < 3; 
                                        return (
                                            <div key={`opt1-${race.id}`} className={`border-2 p-4 flex flex-col gap-3 transition-colors ${
                                                isCompleted 
                                                    ? 'border-black/20 dark:border-white/20 hover:border-[#fbaa19] bg-white dark:bg-[#111]' 
                                                    : 'border-black/5 dark:border-white/5 bg-gray-50 dark:bg-black/20 opacity-60 grayscale'
                                            }`}>
                                                <div className="flex justify-between items-start">
                                                    <span className={`text-xs font-black uppercase tracking-widest ${isCompleted ? 'text-[#fbaa19]' : 'text-gray-400'}`}>ROUND {race.round}</span>
                                                    <span className="text-[10px] text-gray-500 font-mono">{race.date.split(' - ')[1] || race.date}</span>
                                                </div>
                                                <h3 className="font-bold text-black dark:text-white uppercase tracking-wider text-sm leading-tight">{race.name}</h3>
                                                <div className="mt-auto pt-4 flex">
                                                    {isCompleted ? (
                                                        <Link href={`/f1-results/${race.round}`} className="text-xs font-bold uppercase tracking-widest text-black dark:text-white bg-[#fbaa19] w-full text-center py-2 hover:bg-black hover:text-[#fbaa19] transition-colors">
                                                            View Results
                                                        </Link>
                                                    ) : (
                                                        <div className="text-xs font-bold uppercase tracking-widest text-gray-400 border-2 border-gray-200 dark:border-gray-800 w-full text-center py-2">
                                                            Awaiting
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* OPTION 2: HORIZONTAL REMOTE CONTROL */}
                            <div className="mb-12">
                                <h3 className="text-black dark:text-white font-bold uppercase tracking-widest text-lg mb-2">Opção 2: Horizontal Remote Control</h3>
                                <p className="text-gray-400 text-sm mb-4">Um menu de rolagem horizontal (estilo o bet do Fantasy). Ótimo para celular, permite pular de uma corrida para outra rapidamente.</p>
                                <div className="w-full overflow-x-auto scrollbar-hide bg-white dark:bg-[#1a1a1a] p-4 border border-black/20 dark:border-white/20">
                                    <div className="flex gap-2 min-w-max px-2">
                                        {mockCalendar.map((race, index) => {
                                            const isActive = index === 1; // Simulate Saudi Arabia as active
                                            const code = race.name.split(' ')[0].substring(0, 3).toUpperCase();
                                            return (
                                                <Link 
                                                    key={`opt2-${race.id}`}
                                                    href={`/f1-results/${race.round}`}
                                                    className={`flex flex-col items-center justify-center p-3 border-2 min-w-[80px] transition-colors ${
                                                        isActive 
                                                        ? 'border-[#fbaa19] bg-[#fbaa19]/10 text-black dark:text-white' 
                                                        : 'border-black/10 dark:border-white/10 text-gray-400 hover:text-black dark:hover:text-white hover:border-[#fbaa19]'
                                                    }`}
                                                >
                                                    <span className="text-[10px] font-bold tracking-widest">R{race.round}</span>
                                                    <span className={`${isActive ? 'text-[#fbaa19]' : 'text-gray-500'} font-black text-sm uppercase`}>
                                                        {code}
                                                    </span>
                                                </Link>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>

                            {/* OPTION 3: PREV/NEXT ARROWS */}
                            <div>
                                <h3 className="text-black dark:text-white font-bold uppercase tracking-widest text-lg mb-2">Opção 3: Navegação Sequencial (Setas)</h3>
                                <p className="text-gray-400 text-sm mb-4">Botões clássicos no cabeçalho da corrida. Simples e limpo para avançar/voltar no tempo.</p>
                                <div className="w-full bg-white dark:bg-[#1a1a1a] p-6 border border-black/20 dark:border-white/20">
                                    <header className="w-full flex items-center justify-between border-b-4 border-[#fbaa19] pb-6 gap-4">
                                        <Link href="#" className="text-xs md:text-sm font-bold uppercase tracking-widest text-gray-500 hover:text-[#fbaa19] transition-colors flex items-center gap-2">
                                            <span className="hidden sm:inline">Anterior:</span>
                                            <span className="text-black dark:text-white">R01 BAHRAIN</span>
                                        </Link>
                                        
                                        <div className="text-center flex-1">
                                            <p className="text-[#fbaa19] text-[10px] sm:text-xs md:text-sm font-bold uppercase tracking-[0.2em] font-display">OFFICIAL RESULTS</p>
                                            <h1 className="text-black dark:text-white text-xl sm:text-2xl md:text-3xl font-black uppercase tracking-widest font-display mb-1">
                                                SAUDI ARABIA
                                            </h1>
                                        </div>

                                        <Link href="#" className="text-xs md:text-sm font-bold uppercase tracking-widest text-gray-500 hover:text-[#fbaa19] transition-colors flex items-center gap-2">
                                            <span className="text-black dark:text-white">R03 AUSTRALIA</span>
                                            <span className="hidden sm:inline">:Próximo</span>
                                        </Link>
                                    </header>
                                </div>
                            </div>

                        </div>
                    </div>
                )}
                {activeTab === 'ranking' && (
                    <div className="p-12 text-center flex flex-col items-center justify-center gap-4 bg-white dark:bg-[#1a1a1a] border border-black/20 dark:border-[#ffffff3d]">
                        <h3 className="text-xl font-bold text-black dark:text-white uppercase tracking-widest">Drivers & Constructors Ranking</h3>
                        <p className="text-gray-500">Championship standings will be available here.</p>
                    </div>
                )}
                {activeTab === 'teams' && (
                    <div className="p-12 text-center flex flex-col items-center justify-center gap-4 bg-white dark:bg-[#1a1a1a] border border-black/20 dark:border-[#ffffff3d]">
                        <h3 className="text-xl font-bold text-black dark:text-white uppercase tracking-widest">Teams</h3>
                        <p className="text-gray-500">Constructors details and car specs.</p>
                    </div>
                )}
                {activeTab === 'drivers' && (
                    <div className="p-12 text-center flex flex-col items-center justify-center gap-4 bg-white dark:bg-[#1a1a1a] border border-black/20 dark:border-[#ffffff3d]">
                        <h3 className="text-xl font-bold text-black dark:text-white uppercase tracking-widest">Drivers</h3>
                        <p className="text-gray-500">Driver profiles and career statistics.</p>
                    </div>
                )}
                {activeTab === 'stats' && (
                    <div className="p-12 text-center flex flex-col items-center justify-center gap-4 bg-white dark:bg-[#1a1a1a] border border-black/20 dark:border-[#ffffff3d]">
                        <h3 className="text-xl font-bold text-black dark:text-white uppercase tracking-widest">Stats</h3>
                        <p className="text-gray-500">In-depth season analytics and records.</p>
                    </div>
                )}
                {activeTab === 'others' && (
                    <div className="p-12 text-center flex flex-col items-center justify-center gap-4 bg-white dark:bg-[#1a1a1a] border border-black/20 dark:border-[#ffffff3d]">
                        <h3 className="text-xl font-bold text-black dark:text-white uppercase tracking-widest">Others</h3>
                        <p className="text-gray-500">Additional information, rules, and rumors.</p>
                    </div>
                )}
            </div>
        </main>
    );
}
