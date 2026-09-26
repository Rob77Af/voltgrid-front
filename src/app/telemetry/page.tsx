"use client";

import React, { useEffect, useState } from 'react';
import { supabase } from '@/utils/supabase';
import { fetchNextEvent, F1Event, F1_DRIVERS } from '@/api/f1-data';
import Image from 'next/image';

interface ProfileData {
  id: string;
  first_name: string;
  last_name: string;
  driver_number: string;
  team: string;
  avatar_url: string;
}

interface PredictionData {
  id: string;
  user_id: string;
  round: string;
  poletime: string;
  top10: string[];
  evo: string[];
  h2h: Record<string, string>;
  misc: Record<string, string>;
  created_at: string;
  profile?: ProfileData;
}

// Helper para abreviação de 3 letras (ex: M.VERSTAPPEN -> VER)
const getShortName = (fullName: string) => {
    if (!fullName) return 'TBD';
    const parts = fullName.split('.');
    if (parts.length > 1) {
        return parts[1].substring(0, 3).toUpperCase();
    }
    return fullName.substring(0, 3).toUpperCase();
};

export default function TelemetryPage() {
    const [predictions, setPredictions] = useState<PredictionData[]>([]);
    const [eventData, setEventData] = useState<F1Event | null>(null);
    const [loading, setLoading] = useState(true);

    // Mock real results for now (Gabarito)
    const [realResults, setRealResults] = useState<string[]>(Array(22).fill('TBD'));
    const [realPoletime, setRealPoletime] = useState<string>('TBD');

    useEffect(() => {
        const loadData = async () => {
            setLoading(true);
            
            // 1. Fetch Event
            try {
                const event = await fetchNextEvent();
                setEventData(event);
            } catch (e) {
                console.error("Error fetching event", e);
            }

            // 2. Fetch Predictions
            const { data: preds, error } = await supabase
                .from('predictions')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) {
                console.error("Erro ao buscar telemetria", error);
                setLoading(false);
                return;
            }

            // 3. Fetch Profiles for those predictions
            if (preds && preds.length > 0) {
                const userIds = [...new Set(preds.map(p => p.user_id))];
                const { data: profilesData } = await supabase
                    .from('profiles')
                    .select('id, first_name, last_name, driver_number, team, avatar_url')
                    .in('id', userIds);

                const profilesMap = new Map();
                if (profilesData) {
                    profilesData.forEach(p => profilesMap.set(p.id, p));
                }

                const enrichedPreds = preds.map(p => ({
                    ...p,
                    profile: profilesMap.get(p.user_id) || null
                }));

                setPredictions(enrichedPreds);
            } else {
                setPredictions([]);
            }
            
            setLoading(false);
        };

        loadData();
    }, []);

    return (
        <main className="w-full min-h-screen bg-[#050505] text-white pt-0 pb-24 overflow-x-hidden font-sans">
            
            {/* HERO SECTION */}
            <section className="relative w-full h-[40vh] md:h-[50vh] min-h-[300px] flex items-end pb-8">
                <div className="absolute inset-0 w-full h-full">
                    <img 
                        src="/f1_hero_banner.jpg" 
                        alt="F1 Telemetry" 
                        className="w-full h-full object-cover opacity-40"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/80 to-transparent" />
                </div>
                
                <div className="relative z-10 w-full px-4 md:px-8 max-w-[1400px] mx-auto flex flex-col gap-2">
                    <div className="flex items-center gap-3">
                        <span className="bg-[#fbaa19] text-black font-black uppercase px-3 py-1 text-xs md:text-sm tracking-widest">
                            TELEMETRY
                        </span>
                        {eventData && (
                            <span className="bg-white/10 text-white font-bold uppercase px-3 py-1 text-xs md:text-sm tracking-widest border border-white/20">
                                ROUND {eventData.round}
                            </span>
                        )}
                    </div>
                    
                    <h1 className="text-4xl md:text-6xl font-black uppercase tracking-widest font-display text-white mt-2 drop-shadow-lg">
                        {eventData ? eventData.name : 'LOADING EVENT...'}
                    </h1>
                    
                    <div className="flex flex-col md:flex-row gap-4 mt-4 text-gray-400 font-mono text-xs md:text-sm uppercase">
                        <div className="flex flex-col">
                            <span className="text-[#fbaa19] font-bold">CIRCUIT</span>
                            <span>{eventData ? eventData.circuit : 'TBD'}</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-[#fbaa19] font-bold">RACE TIME</span>
                            <span>{eventData ? `${eventData.date} | ${eventData.time}` : 'TBD'}</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-[#fbaa19] font-bold">DEADLINE (Q1)</span>
                            <span>{eventData && eventData.qualiDate ? `${eventData.qualiDate} | ${eventData.qualiTime}` : 'TBD'}</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* DATA CENTER TABLE */}
            <section className="w-full px-4 md:px-8 max-w-[1800px] mx-auto mt-8">
                
                <div className="w-full overflow-x-auto bg-[#0a0a0a] rounded-sm border border-[#222] shadow-2xl relative custom-scrollbar">
                    {loading ? (
                        <div className="p-24 text-center flex flex-col items-center justify-center">
                            <div className="w-12 h-12 rounded-full border-4 border-t-transparent border-[#fbaa19] animate-spin mb-4"></div>
                            <p className="font-bold tracking-widest uppercase text-sm text-[#fbaa19] font-mono">SYNCING TELEMETRY...</p>
                        </div>
                    ) : (
                        <table className="w-full text-left border-collapse min-w-[2000px]">
                            {/* THEAD */}
                            <thead className="bg-[#111] border-b-2 border-[#fbaa19] text-[10px] uppercase tracking-widest text-gray-400 font-mono sticky top-0 z-20">
                                <tr>
                                    {/* Sticky Headers */}
                                    <th className="p-4 sticky left-0 bg-[#111] z-30 w-16 border-r border-[#333] text-center">POS</th>
                                    <th className="p-4 sticky left-16 bg-[#111] z-30 min-w-[220px] border-r border-[#333]">DRIVER</th>
                                    
                                    <th className="p-4 border-r border-[#333] text-center bg-[#1a1a1a]">POLETIME</th>
                                    
                                    {/* Master P1-P10 */}
                                    <th colSpan={10} className="p-4 border-r border-[#333] text-center bg-[#151515]">MASTER (TOP 10)</th>
                                    
                                    {/* Evo */}
                                    <th colSpan={5} className="p-4 border-r border-[#333] text-center bg-[#1a1a1a]">EVOLUTION</th>
                                    
                                    {/* H2H (11) */}
                                    <th colSpan={11} className="p-4 border-r border-[#333] text-center bg-[#151515]">HEAD-TO-HEAD</th>
                                    
                                    {/* Misc (5) */}
                                    <th colSpan={5} className="p-4 border-r border-[#333] text-center bg-[#1a1a1a]">MISC</th>
                                    
                                    <th className="p-4 text-center bg-[#111]">TIMESTAMP</th>
                                </tr>
                                <tr className="border-t border-[#333] text-[9px] bg-[#0a0a0a]">
                                    <th className="p-2 sticky left-0 bg-[#0a0a0a] z-30 border-r border-[#333]"></th>
                                    <th className="p-2 sticky left-16 bg-[#0a0a0a] z-30 border-r border-[#333] text-right pr-4 text-[#fbaa19]">REAL RESULTS &rarr;</th>
                                    <th className="p-2 border-r border-[#333] text-center text-[#00ff00] font-bold">{realPoletime}</th>
                                    
                                    {/* Render 10 slots for Master actuals */}
                                    {Array.from({length: 10}).map((_, i) => (
                                        <th key={`real-p${i+1}`} className="p-2 border-r border-[#333] text-center text-white font-bold bg-[#1a1a1a]">
                                            {realResults[i]}
                                        </th>
                                    ))}
                                    
                                    <th colSpan={5} className="p-2 border-r border-[#333] text-center text-gray-500">TBD</th>
                                    <th colSpan={11} className="p-2 border-r border-[#333] text-center text-gray-500">TBD</th>
                                    <th colSpan={5} className="p-2 border-r border-[#333] text-center text-gray-500">TBD</th>
                                    
                                    <th className="p-2"></th>
                                </tr>
                            </thead>
                            
                            {/* TBODY */}
                            <tbody className="text-xs font-medium font-mono">
                                {predictions.length === 0 ? (
                                    <tr>
                                        <td colSpan={35} className="p-8 text-center text-gray-500">NO PREDICTIONS FOUND FOR THIS ROUND.</td>
                                    </tr>
                                ) : (
                                    predictions.map((pred, idx) => {
                                        const prof = pred.profile;
                                        const driverName = prof ? `${prof.first_name.charAt(0)}.${prof.last_name}` : 'UNKNOWN';
                                        const driverNum = prof?.driver_number || '99';
                                        
                                        return (
                                            <tr key={pred.id} className="border-b border-[#222] hover:bg-white/5 transition-colors group">
                                                {/* Sticky Col 1: POS */}
                                                <td className="p-3 sticky left-0 bg-[#0a0a0a] group-hover:bg-[#111] z-10 border-r border-[#333] text-center text-gray-400">
                                                    {idx + 1}
                                                </td>
                                                
                                                {/* Sticky Col 2: DRIVER */}
                                                <td className="p-3 sticky left-16 bg-[#0a0a0a] group-hover:bg-[#111] z-10 border-r border-[#333]">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-8 h-8 rounded-full overflow-hidden border border-[#333] bg-black shrink-0">
                                                            {prof?.avatar_url ? (
                                                                <img src={prof.avatar_url} alt="Avatar" className="w-full h-full object-cover" />
                                                            ) : (
                                                                <div className="w-full h-full flex items-center justify-center text-[8px]">N/A</div>
                                                            )}
                                                        </div>
                                                        <div className="flex flex-col">
                                                            <span className="font-bold text-white tracking-widest whitespace-nowrap">
                                                                {driverName} <span className="text-[#fbaa19]">#{driverNum}</span>
                                                            </span>
                                                            <span className="text-[9px] text-gray-500 uppercase">{prof?.team || 'No Team'}</span>
                                                        </div>
                                                    </div>
                                                </td>

                                                {/* POLETIME */}
                                                <td className="p-3 border-r border-[#333] text-center text-[#00ff00] font-bold">
                                                    {pred.poletime || '--:--.---'}
                                                </td>

                                                {/* MASTER (10) */}
                                                {Array.from({length: 10}).map((_, i) => {
                                                    const rawPick = pred.top10?.[i] || '';
                                                    const shortPick = getShortName(rawPick);
                                                    return (
                                                        <td key={`m-${i}`} className="p-2 border-r border-[#333] text-center text-gray-300">
                                                            {shortPick}
                                                        </td>
                                                    );
                                                })}

                                                {/* EVO (5) */}
                                                {Array.from({length: 5}).map((_, i) => {
                                                    const rawPick = pred.evo?.[i] || '';
                                                    const shortPick = getShortName(rawPick);
                                                    return (
                                                        <td key={`e-${i}`} className="p-2 border-r border-[#333] text-center text-[#fbaa19]">
                                                            {shortPick}
                                                        </td>
                                                    );
                                                })}

                                                {/* H2H (11) */}
                                                {Array.from({length: 11}).map((_, i) => {
                                                    const matchId = `m${i+1}`;
                                                    const rawPick = pred.h2h?.[matchId] || '';
                                                    const shortPick = rawPick ? getShortName(rawPick) : '--';
                                                    return (
                                                        <td key={`h-${i}`} className="p-2 border-r border-[#333] text-center text-gray-400">
                                                            {shortPick}
                                                        </td>
                                                    );
                                                })}

                                                {/* MISC (5) */}
                                                {Array.from({length: 5}).map((_, i) => {
                                                    const qId = `q${i+1}`;
                                                    const rawAns = pred.misc?.[qId] || '';
                                                    const displayAns = rawAns === 'Yes' ? 'Y' : rawAns === 'No' ? 'N' : rawAns ? getShortName(rawAns) : '-';
                                                    return (
                                                        <td key={`q-${i}`} className="p-2 border-r border-[#333] text-center text-gray-400">
                                                            {displayAns}
                                                        </td>
                                                    );
                                                })}

                                                {/* TIMESTAMP */}
                                                <td className="p-3 text-right text-gray-500 text-[10px] whitespace-nowrap">
                                                    {new Date(pred.created_at).toLocaleString('en-GB', { 
                                                        day: '2-digit', month: '2-digit', year: '2-digit', 
                                                        hour: '2-digit', minute: '2-digit', second: '2-digit' 
                                                    })}
                                                </td>
                                            </tr>
                                        );
                                    })
                                )}
                            </tbody>
                        </table>
                    )}
                </div>

                <div className="mt-8 flex justify-end gap-4 mb-16">
                    <a href="/f1" className="bg-transparent text-gray-500 border border-gray-700 px-6 py-3 font-bold uppercase tracking-widest text-xs hover:text-white transition-colors">
                        F1 Hub
                    </a>
                    <a href="/bet" className="bg-[#fbaa19] text-black px-6 py-3 font-bold uppercase tracking-widest text-xs hover:bg-white transition-colors">
                        Edit Predictions
                    </a>
                </div>
            </section>
        </main>
    );
}
