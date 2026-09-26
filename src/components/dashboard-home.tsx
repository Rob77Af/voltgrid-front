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
            
            {/* LEFT COLUMN: AVATAR, CREDENTIALS, HONORS, HISTORY */}
            <div className="w-full xl:w-[22rem] shrink-0 flex flex-col gap-6">
                
                {/* Profile Box */}
                <div className="bg-white dark:bg-[#0a0a0a] border border-black/10 dark:border-white/10 p-6 md:p-8 flex flex-col items-center text-center shadow-lg relative overflow-hidden group">
                    <div className="absolute top-0 left-0 w-full h-2 bg-[#fbaa19]"></div>
                    
                    {/* AVATAR BIGGER, NO BORDER */}
                    <div className="relative w-56 h-56 md:w-72 md:h-72 rounded-full overflow-hidden mb-6 shadow-2xl">
                        {/* Background IA */}
                        <img 
                            src={avatarUrl} 
                            alt="Driver Avatar Background" 
                            className="w-full h-full object-cover"
                        />
                        {/* Overlay Capacete PNG */}
                        <img 
                            src="/avatar-overlay.png" 
                            alt="Helmet overlay" 
                            className="absolute inset-0 w-full h-full object-contain pointer-events-none drop-shadow-2xl scale-[1.05]"
                            onError={(e) => { e.currentTarget.style.display = 'none'; }}
                        />
                    </div>
                    
                    <h2 className="text-3xl font-black uppercase tracking-widest font-display text-black dark:text-white">
                        {driverName} <span className="text-[#fbaa19]">#{driverNumber}</span>
                    </h2>
                    
                    <div className="w-full flex flex-col gap-3 mt-6 text-left border-t border-black/10 dark:border-white/10 pt-6">
                        <div className="flex justify-between items-center text-xs uppercase font-bold tracking-widest">
                            <span className="text-gray-500">Team</span>
                            <span className="text-black dark:text-white bg-black/5 dark:bg-white/5 px-2 py-1">To be assigned</span>
                        </div>
                        <div className="flex justify-between items-center text-xs uppercase font-bold tracking-widest">
                            <span className="text-gray-500">Nat</span>
                            <span className="text-black dark:text-white bg-black/5 dark:bg-white/5 px-2 py-1">{profile?.nationality || '---'}</span>
                        </div>
                        <div className="flex justify-between items-center text-xs uppercase font-bold tracking-widest">
                            <span className="text-gray-500">Org</span>
                            <span className="text-black dark:text-white bg-black/5 dark:bg-white/5 px-2 py-1 truncate max-w-[120px]">{profile?.org_color || '---'}</span>
                        </div>
                    </div>

                    {/* HONORS DISCRETE (SAME BOX) */}
                    <div className="w-full mt-6 border-t border-black/10 dark:border-white/10 pt-4 text-left">
                        <span className="text-[9px] uppercase tracking-widest font-bold text-gray-500 mb-2 block">Driver Honors</span>
                        <div className="flex flex-col gap-2">
                            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-black dark:text-white">
                                <span className="text-[#fbaa19]">ðŸ†</span> CampeÃ£o Poletime 2025
                            </div>
                            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-black dark:text-white">
                                <span className="text-gray-400">ðŸ¥‡</span> Vencedor Etapa JapÃ£o
                            </div>
                            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-black dark:text-white">
                                <span className="text-red-500">ðŸŽï¸</span> 1Âº Lugar Silly Season Ferrari
                            </div>
                        </div>
                    </div>
                </div>

                {/* HISTORY BOX */}
                <div className="bg-white dark:bg-[#0a0a0a] border border-black/10 dark:border-white/10 p-6 shadow-lg relative">
                    <div className="absolute top-0 left-0 w-1 h-full bg-black dark:bg-white"></div>
                    <h3 className="text-sm font-black uppercase tracking-widest mb-4">Activity History</h3>
                    <div className="flex flex-col gap-0 border-l-2 border-black/10 dark:border-white/10 ml-2">
                        
                        <div className="relative pl-4 pb-4">
                            <div className="absolute left-[-5px] top-1 w-2 h-2 rounded-full bg-[#fbaa19]"></div>
                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">2h ago</p>
                            <p className="text-xs font-bold uppercase tracking-widest text-black dark:text-white">Make Prediction for AustrÃ¡lia GP</p>
                        </div>
                        
                        <div className="relative pl-4 pb-4">
                            <div className="absolute left-[-5px] top-1 w-2 h-2 rounded-full bg-black dark:bg-white"></div>
                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Yesterday</p>
                            <p className="text-xs font-bold uppercase tracking-widest text-black dark:text-white">Confirm Silly Season</p>
                        </div>

                        <div className="relative pl-4 pb-2">
                            <div className="absolute left-[-5px] top-1 w-2 h-2 rounded-full bg-black dark:bg-white"></div>
                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">3 days ago</p>
                            <p className="text-xs font-bold uppercase tracking-widest text-black dark:text-white">Updated Driver Setup</p>
                        </div>

                    </div>
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
                            <span className="text-xs font-bold uppercase text-green-500 mt-1">8Âº LUGAR</span>
                        </div>
                    </div>
                    <div className="bg-white dark:bg-[#0a0a0a] border border-black/10 dark:border-white/10 p-5 shadow-md flex flex-col justify-between group hover:border-[#fbaa19] transition-colors cursor-pointer">
                        <span className="text-gray-400 text-[10px] font-bold uppercase tracking-widest mb-2 group-hover:text-[#fbaa19]">Master</span>
                        <div className="flex flex-col">
                            <span className="text-3xl font-black uppercase tracking-tighter">69 <span className="text-sm tracking-widest text-gray-400">PTS</span></span>
                            <span className="text-xs font-bold uppercase text-blue-500 mt-1">20Âº (J.Fangio)</span>
                        </div>
                    </div>
                    <div className="bg-white dark:bg-[#0a0a0a] border border-black/10 dark:border-white/10 p-5 shadow-md flex flex-col justify-between group hover:border-[#fbaa19] transition-colors cursor-pointer">
                        <span className="text-gray-400 text-[10px] font-bold uppercase tracking-widest mb-2 group-hover:text-[#fbaa19]">Milesimus</span>
                        <div className="flex flex-col">
                            <span className="text-3xl font-black uppercase tracking-tighter">1420 <span className="text-sm tracking-widest text-gray-400">PTS</span></span>
                            <span className="text-xs font-bold uppercase text-[#fbaa19] mt-1">112Âº GLOBAL</span>
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
                    <Link href="/telemetry" className="bg-black dark:bg-[#1a1a1a] text-white border border-black dark:border-[#1a1a1a] p-3 font-bold uppercase tracking-widest text-[9px] sm:text-[10px] hover:bg-[#fbaa19] hover:text-black transition-colors text-center">Telemetry</Link>
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
                                <p className="text-xs font-bold leading-relaxed">As apostas para a primeira etapa Master jÃ¡ estÃ£o abertas. Revise sua garagem.</p>
                            </div>
                            <div className="bg-black/10 p-4 border-l-4 border-black">
                                <p className="text-xs font-bold leading-relaxed">VocÃª foi convidado para uma liga privada: <span className="underline cursor-pointer">Senna Fans</span></p>
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

