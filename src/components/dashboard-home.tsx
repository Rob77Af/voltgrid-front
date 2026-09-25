"use client";

import React from 'react';
import Link from 'next/link';

interface DashboardHomeProps {
    profile: any;
    setActiveView: (view: string) => void;
    logout: () => void;
}

export default function DashboardHome({ profile, setActiveView, logout }: DashboardHomeProps) {
    const driverName = profile?.first_name ? `${profile.first_name.charAt(0)}. ${profile.last_name}` : 'NEW DRIVER';
    const driverNumber = profile?.driver_number || '99';
    const avatarUrl = profile?.avatar_url || 'https://images.unsplash.com/photo-1541348263662-e06836264be8?q=80&w=200&auto=format&fit=crop';
    
    return (
        <div className="w-full flex flex-col xl:flex-row gap-6 md:gap-8 animate-fade-in mt-4 md:mt-8">
            
            {/* LEFT COLUMN: AVATAR & CREDENTIALS */}
            <div className="w-full xl:w-72 shrink-0 flex flex-col gap-6">
                {/* Avatar Box */}
                <div className="bg-white dark:bg-[#0a0a0a] border border-black/10 dark:border-white/10 p-6 flex flex-col items-center text-center shadow-lg relative overflow-hidden group">
                    <div className="absolute top-0 left-0 w-full h-2 bg-[#fbaa19]"></div>
                    
                    <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-[#fbaa19] mb-4 shadow-xl">
                        {/* Avatar */}
                        <img 
                            src={avatarUrl} 
                            alt="Driver Avatar" 
                            className="w-full h-full object-cover"
                        />
                        <img 
                            src="/avatar-overlay.png" 
                            alt="Helmet overlay" 
                            className="absolute inset-0 w-full h-full object-contain pointer-events-none drop-shadow-2xl"
                            onError={(e) => { e.currentTarget.style.display = 'none'; }}
                        />
                    </div>
                    
                    <h2 className="text-2xl font-black uppercase tracking-widest font-display text-black dark:text-white">
                        {driverName} <span className="text-[#fbaa19]">#{driverNumber}</span>
                    </h2>
                    
                    <div className="w-full flex flex-col gap-2 mt-4 text-left border-t border-black/10 dark:border-white/10 pt-4">
                        <div className="flex justify-between items-center text-xs uppercase font-bold tracking-widest">
                            <span className="text-gray-500">Team</span>
                            <span className="text-black dark:text-white">To be assigned</span>
                        </div>
                        <div className="flex justify-between items-center text-xs uppercase font-bold tracking-widest">
                            <span className="text-gray-500">Nat</span>
                            <span className="text-black dark:text-white">{profile?.nationality || '---'}</span>
                        </div>
                        <div className="flex justify-between items-center text-xs uppercase font-bold tracking-widest">
                            <span className="text-gray-500">Org</span>
                            <span className="text-black dark:text-white truncate max-w-[120px]">{profile?.org_color || '---'}</span>
                        </div>
                    </div>
                </div>

                {/* HONORS */}
                <div className="bg-white dark:bg-[#0a0a0a] border border-black/10 dark:border-white/10 p-6 shadow-lg relative">
                    <div className="absolute top-0 left-0 w-1 h-full bg-[#fbaa19]"></div>
                    <h3 className="text-sm font-black uppercase tracking-widest mb-4">Driver Honors</h3>
                    <ul className="flex flex-col gap-3">
                        <li className="flex items-center gap-3 bg-gray-50 dark:bg-[#111] p-2 border border-black/5 dark:border-white/5">
                            <div className="w-8 h-8 bg-[#fbaa19]/20 text-[#fbaa19] flex items-center justify-center font-black text-xs shrink-0 rounded-sm">🏆</div>
                            <span className="text-[10px] uppercase font-bold tracking-wide leading-tight">Campeão Poletime 2025</span>
                        </li>
                        <li className="flex items-center gap-3 bg-gray-50 dark:bg-[#111] p-2 border border-black/5 dark:border-white/5">
                            <div className="w-8 h-8 bg-gray-300 dark:bg-gray-700 text-black dark:text-white flex items-center justify-center font-black text-xs shrink-0 rounded-sm">🥇</div>
                            <span className="text-[10px] uppercase font-bold tracking-wide leading-tight">Vencedor Etapa Japão (Poletime)</span>
                        </li>
                        <li className="flex items-center gap-3 bg-gray-50 dark:bg-[#111] p-2 border border-black/5 dark:border-white/5">
                            <div className="w-8 h-8 bg-red-500/20 text-red-500 flex items-center justify-center font-black text-xs shrink-0 rounded-sm">🏎️</div>
                            <span className="text-[10px] uppercase font-bold tracking-wide leading-tight">1º Lugar Silly Season Ferrari</span>
                        </li>
                    </ul>
                </div>
            </div>

            {/* MIDDLE COLUMN: INBOX & STATS */}
            <div className="w-full flex-1 flex flex-col gap-6">
                
                {/* Mailbox / Proposals */}
                <div className="bg-[#111] border border-[#fbaa19]/30 p-1">
                    <div className="bg-black p-4 md:p-6 flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
                        <div className="flex gap-4 items-center">
                            <div className="w-12 h-12 bg-[#fbaa19] text-black flex items-center justify-center shrink-0">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                                </svg>
                            </div>
                            <div className="flex flex-col">
                                <h3 className="text-[#fbaa19] text-lg font-black uppercase tracking-widest font-display">Contract Proposals</h3>
                                <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">You have new offers pending</p>
                            </div>
                        </div>
                        
                        <div className="flex flex-col gap-2 w-full md:w-auto">
                            <div className="text-[10px] md:text-xs font-bold uppercase tracking-widest bg-white/5 border border-white/10 px-3 py-2 text-white">
                                <span className="text-[#fbaa19]">G.Farina:</span> Ferrari (100 pts)
                            </div>
                            <div className="text-[10px] md:text-xs font-bold uppercase tracking-widest bg-white/5 border border-white/10 px-3 py-2 text-white">
                                <span className="text-[#fbaa19]">A.Ascari:</span> Aston Martin (130 pts)
                            </div>
                        </div>
                    </div>
                </div>

                {/* Classic Boxes */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="bg-white dark:bg-[#0a0a0a] border border-black/10 dark:border-white/10 p-5 shadow-md flex flex-col justify-between group hover:border-[#fbaa19] transition-colors cursor-pointer">
                        <span className="text-gray-400 text-[10px] font-bold uppercase tracking-widest mb-2 group-hover:text-[#fbaa19]">Poletime</span>
                        <div className="flex flex-col">
                            <span className="text-3xl font-black uppercase tracking-tighter">678 <span className="text-sm tracking-widest text-gray-400">PTS</span></span>
                            <span className="text-xs font-bold uppercase text-green-500 mt-1">8º LUGAR</span>
                        </div>
                    </div>
                    <div className="bg-white dark:bg-[#0a0a0a] border border-black/10 dark:border-white/10 p-5 shadow-md flex flex-col justify-between group hover:border-[#fbaa19] transition-colors cursor-pointer">
                        <span className="text-gray-400 text-[10px] font-bold uppercase tracking-widest mb-2 group-hover:text-[#fbaa19]">Master</span>
                        <div className="flex flex-col">
                            <span className="text-3xl font-black uppercase tracking-tighter">69 <span className="text-sm tracking-widest text-gray-400">PTS</span></span>
                            <span className="text-xs font-bold uppercase text-blue-500 mt-1">20º (J.Fangio)</span>
                        </div>
                    </div>
                    <div className="bg-white dark:bg-[#0a0a0a] border border-black/10 dark:border-white/10 p-5 shadow-md flex flex-col justify-between group hover:border-[#fbaa19] transition-colors cursor-pointer">
                        <span className="text-gray-400 text-[10px] font-bold uppercase tracking-widest mb-2 group-hover:text-[#fbaa19]">Milesimus</span>
                        <div className="flex flex-col">
                            <span className="text-3xl font-black uppercase tracking-tighter">1420 <span className="text-sm tracking-widest text-gray-400">PTS</span></span>
                            <span className="text-xs font-bold uppercase text-[#fbaa19] mt-1">112º GLOBAL</span>
                        </div>
                    </div>
                </div>

                {/* Performance Chart Placeholder */}
                <div className="w-full bg-white dark:bg-[#0a0a0a] border border-black/10 dark:border-white/10 p-6 shadow-md h-48 md:h-64 relative flex flex-col">
                    <h3 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-4">Performance History</h3>
                    <div className="flex-1 w-full border-l border-b border-black/20 dark:border-white/20 relative">
                        {/* Mock SVG Chart */}
                        <svg className="w-full h-full absolute inset-0" preserveAspectRatio="none" viewBox="0 0 100 100">
                            <polyline 
                                points="0,90 20,70 40,80 60,30 80,40 100,10" 
                                fill="none" 
                                stroke="#fbaa19" 
                                strokeWidth="3"
                                vectorEffect="non-scaling-stroke"
                            />
                            <circle cx="20" cy="70" r="2" fill="white" stroke="#fbaa19" strokeWidth="1" vectorEffect="non-scaling-stroke" />
                            <circle cx="40" cy="80" r="2" fill="white" stroke="#fbaa19" strokeWidth="1" vectorEffect="non-scaling-stroke" />
                            <circle cx="60" cy="30" r="2" fill="white" stroke="#fbaa19" strokeWidth="1" vectorEffect="non-scaling-stroke" />
                            <circle cx="80" cy="40" r="2" fill="white" stroke="#fbaa19" strokeWidth="1" vectorEffect="non-scaling-stroke" />
                            <circle cx="100" cy="10" r="2" fill="white" stroke="#fbaa19" strokeWidth="1" vectorEffect="non-scaling-stroke" />
                        </svg>
                    </div>
                </div>

                {/* Legacy Action Buttons (Temp) */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 mt-4">
                    <button onClick={() => setActiveView("setup")} className="bg-black dark:bg-[#1a1a1a] text-white border border-black dark:border-[#1a1a1a] p-3 font-bold uppercase tracking-widest text-[9px] sm:text-[10px] hover:bg-white hover:text-black dark:hover:bg-white dark:hover:text-black transition-colors text-center">Setup</button>
                    <button onClick={() => setActiveView("report")} className="bg-transparent text-black dark:text-white border border-black/20 dark:border-white/20 p-3 font-bold uppercase tracking-widest text-[9px] sm:text-[10px] hover:border-[#fbaa19] hover:text-[#fbaa19] transition-colors text-center">Report</button>
                    <button onClick={() => setActiveView("silly_season")} className="bg-transparent text-black dark:text-white border border-black/20 dark:border-white/20 p-3 font-bold uppercase tracking-widest text-[9px] sm:text-[10px] hover:border-[#fbaa19] hover:text-[#fbaa19] transition-colors text-center">Silly Season</button>
                    <button onClick={() => setActiveView("calendar")} className="bg-transparent text-black dark:text-white border border-black/20 dark:border-white/20 p-3 font-bold uppercase tracking-widest text-[9px] sm:text-[10px] hover:border-[#fbaa19] hover:text-[#fbaa19] transition-colors text-center">F1 Calendar</button>
                    <button onClick={() => setActiveView("settings")} className="bg-[#fbaa19] text-black border border-[#fbaa19] p-3 font-bold uppercase tracking-widest text-[9px] sm:text-[10px] hover:bg-black hover:text-[#fbaa19] transition-colors text-center">Settings</button>
                    <Link href="/race-control" className="bg-black dark:bg-white text-white dark:text-black border border-black dark:border-white p-3 font-bold uppercase tracking-widest text-[9px] sm:text-[10px] hover:bg-white hover:text-black dark:hover:bg-black dark:hover:text-white transition-colors text-center">Race Control</Link>
                    <button onClick={() => logout()} className="bg-transparent text-gray-500 border border-transparent p-3 font-bold uppercase tracking-widest text-[9px] sm:text-[10px] hover:text-red-500 hover:border-red-500/30 transition-colors col-span-2 sm:col-span-1 text-center">Logout</button>
                </div>
            </div>

            {/* RIGHT COLUMN: BOOKMARK BANNER */}
            <div className="w-full xl:w-64 shrink-0 flex flex-col">
                <div className="bg-[#fbaa19] text-black p-6 h-full min-h-[300px] flex flex-col justify-between shadow-lg relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-black opacity-10 rounded-bl-full transform translate-x-10 -translate-y-10"></div>
                    
                    <div className="relative z-10 flex flex-col gap-6">
                        <div className="flex flex-col gap-1">
                            <span className="text-[10px] font-black uppercase tracking-[0.2em] opacity-60">VoltGrid Paddock</span>
                            <h3 className="text-xl font-black uppercase tracking-widest font-display leading-tight">Daily Briefing</h3>
                        </div>
                        
                        <div className="flex flex-col gap-4">
                            <div className="bg-black/10 p-4 border-l-4 border-black">
                                <p className="text-xs font-bold leading-relaxed">As apostas para a primeira etapa Master já estão abertas. Revise sua garagem.</p>
                            </div>
                            <div className="bg-black/10 p-4 border-l-4 border-black">
                                <p className="text-xs font-bold leading-relaxed">Você foi convidado para uma liga privada: <span className="underline cursor-pointer">Senna Fans</span></p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="relative z-10 mt-8">
                        <button className="w-full bg-black text-[#fbaa19] p-3 font-black uppercase tracking-widest text-[10px] hover:bg-white hover:text-black transition-colors shadow-xl">
                            Ler Mensagens
                        </button>
                    </div>
                </div>
            </div>

        </div>
    );
}
