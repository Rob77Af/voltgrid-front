"use client";
import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { mockCalendar } from '@/api/f1-data';
import RaceRemoteControl from '@/components/race-remote-control';

export default function F1ResultsPage({ params }: { params: { round: string } }) {
    const router = useRouter();
    
    // In a real app we'd fetch based on params.round. Here we just read mockCalendar.
    // Ensure we unwrap params if this is next 15+ but standard usage for simple client components is fine
    const currentRoundStr = params.round; 
    
    const currentIndex = mockCalendar.findIndex(r => r.round === currentRoundStr);
    const currentRace = mockCalendar[currentIndex];
    
    const prevRace = currentIndex > 0 ? mockCalendar[currentIndex - 1] : null;
    const nextRace = currentIndex < mockCalendar.length - 1 ? mockCalendar[currentIndex + 1] : null;

    if (!currentRace) {
        return (
            <div className="w-full min-h-screen flex items-center justify-center">
                <div className="text-center p-8 bg-black text-white">RACE NOT FOUND</div>
            </div>
        );
    }

    return (
        <main className="w-full max-w-6xl mx-auto p-4 md:p-8 pt-12 pb-24 flex flex-col items-center justify-start min-h-screen">
            {/* Selected Option 2: Horizontal Remote Control (with opacity & arrows) */}
            <div className="w-full mb-8">
                <RaceRemoteControl activeRound={currentRace.round} />
            </div>

            <div className="w-full text-center flex flex-col items-center justify-center mb-8">
                <p className="text-[#fbaa19] text-[10px] sm:text-xs md:text-sm font-bold uppercase tracking-[0.2em] font-display">OFFICIAL RESULTS</p>
                <h1 className="text-black dark:text-white text-xl sm:text-3xl md:text-4xl font-black uppercase tracking-widest font-display mb-1">
                    {currentRace.name}
                </h1>
            </div>

            {/* Mock Table to show it works */}
            <div className="w-full flex flex-col gap-4 border border-black/20 dark:border-[#ffffff3d] bg-white dark:bg-[#1a1a1a] p-4 md:p-8">
                <h3 className="font-bold text-xl uppercase tracking-widest text-black dark:text-white border-b border-black/10 dark:border-white/10 pb-4">
                    RACE CLASSIFICATION
                </h3>
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm whitespace-nowrap">
                        <thead className="text-xs uppercase tracking-widest text-gray-500 border-b border-black/10 dark:border-white/10">
                            <tr>
                                <th className="py-3 px-4">Pos</th>
                                <th className="py-3 px-4">Driver</th>
                                <th className="py-3 px-4">Team</th>
                                <th className="py-3 px-4">Time/Retired</th>
                                <th className="py-3 px-4">Pts</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-b border-black/5 dark:border-white/5 hover:bg-gray-50 dark:hover:bg-black/40">
                                <td className="py-3 px-4 font-bold">1</td>
                                <td className="py-3 px-4 font-bold text-black dark:text-white">M. VERSTAPPEN</td>
                                <td className="py-3 px-4 text-gray-500">Red Bull Racing</td>
                                <td className="py-3 px-4 font-mono">1:31:44.742</td>
                                <td className="py-3 px-4 font-bold text-[#fbaa19]">26</td>
                            </tr>
                            <tr className="border-b border-black/5 dark:border-white/5 hover:bg-gray-50 dark:hover:bg-black/40">
                                <td className="py-3 px-4 font-bold">2</td>
                                <td className="py-3 px-4 font-bold text-black dark:text-white">S. PEREZ</td>
                                <td className="py-3 px-4 text-gray-500">Red Bull Racing</td>
                                <td className="py-3 px-4 font-mono">+22.457s</td>
                                <td className="py-3 px-4 font-bold text-[#fbaa19]">18</td>
                            </tr>
                            <tr className="border-b border-black/5 dark:border-white/5 hover:bg-gray-50 dark:hover:bg-black/40">
                                <td className="py-3 px-4 font-bold">3</td>
                                <td className="py-3 px-4 font-bold text-black dark:text-white">C. SAINZ</td>
                                <td className="py-3 px-4 text-gray-500">Ferrari</td>
                                <td className="py-3 px-4 font-mono">+25.110s</td>
                                <td className="py-3 px-4 font-bold text-[#fbaa19]">15</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="mt-8 text-center text-xs text-gray-400">
                    <Link href="/f1" className="uppercase font-bold tracking-widest hover:text-[#fbaa19] underline">
                        Back to F1 Hub
                    </Link>
                </div>
            </div>
        </main>
    );
}
