"use client";
import React, { useState, useEffect } from "react";
import { useLiveF1Positions } from "@/hooks/useLiveF1Positions";
import { calculateLiveScores, LiveScore } from "@/utils/live-scoring";

export default function TelemetryLeaderboard() {
    const { positions, isLoading, progress } = useLiveF1Positions();
    const [leaderboard, setLeaderboard] = useState<LiveScore[]>([]);

    useEffect(() => {
        if (!isLoading) {
            setLeaderboard(prev => calculateLiveScores(positions, prev));
        }
    }, [positions, isLoading]);

    if (isLoading) {
        return (
            <div className="w-full flex flex-col items-center justify-center p-12 bg-white dark:bg-[#1a1a1a] border border-black/20 dark:border-white/20">
                <div className="w-8 h-8 border-4 border-[#fbaa19] border-t-transparent rounded-full animate-spin mb-4"></div>
                <p className="text-gray-500 font-bold uppercase tracking-widest text-sm animate-pulse">Estabelecendo conexao com OpenF1 Telemetry...</p>
            </div>
        );
    }

    return (
        <div className="w-full flex flex-col bg-white dark:bg-[#111] border border-black/20 dark:border-white/20 shadow-xl overflow-hidden rounded-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 md:p-6 border-b-2 border-[#fbaa19] bg-black text-white">
                <div className="flex items-center gap-3">
                    <div className="relative flex items-center justify-center">
                        <span className="absolute w-3 h-3 bg-red-500 rounded-full animate-ping opacity-75"></span>
                        <span className="relative w-2 h-2 bg-red-500 rounded-full"></span>
                    </div>
                    <h2 className="text-xl md:text-2xl font-black uppercase tracking-widest font-display">Live Telemetry</h2>
                </div>
                
                <div className="mt-4 sm:mt-0 flex flex-col sm:items-end">
                    <span className="text-xs font-bold uppercase tracking-widest text-gray-400">Tempo Real - Abu Dhabi Replay</span>
                    <div className="flex items-center gap-2 mt-1 text-[10px] text-[#fbaa19] font-mono">
                        <span>PROGRESSO DA SESSAO:</span>
                        <div className="w-24 h-1.5 bg-white/20 rounded-full overflow-hidden">
                            <div 
                                className="h-full bg-[#fbaa19] transition-all duration-300"
                                style={{ width: `${Math.max(5, (progress.current / progress.total) * 100)}%` }}
                            ></div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex flex-col relative min-h-[400px]">
                {leaderboard.map((user, index) => (
                    <div 
                        key={user.userId}
                        className="absolute w-full transition-all duration-700 ease-in-out border-b border-black/5 dark:border-white/5"
                        style={{ 
                            top: `${index * 80}px`,
                            height: "80px"
                        }}
                    >
                        <div className="flex items-center h-full px-4 md:px-6 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                            
                            <div className="flex flex-col items-center justify-center w-12 shrink-0">
                                <span className="text-xl font-black text-black dark:text-white">{user.rank}</span>
                                {user.trend === "up" && <span className="text-green-500 text-xs font-bold">UP</span>}
                                {user.trend === "down" && <span className="text-red-500 text-xs font-bold">DWN</span>}
                                {user.trend === "same" && <span className="text-gray-400 text-[10px]">-</span>}
                            </div>

                            <div className="flex items-center gap-4 flex-1 pl-4 border-l border-black/10 dark:border-white/10 ml-2">
                                <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-black border border-black/10 dark:border-white/10 flex items-center justify-center text-xl shadow-inner">
                                    {user.avatar}
                                </div>
                                <div className="flex flex-col">
                                    <span className="font-bold uppercase tracking-widest text-sm md:text-base text-black dark:text-white">{user.name}</span>
                                    <span className="text-xs text-gray-500 uppercase tracking-widest">VoltGrid Pro</span>
                                </div>
                            </div>

                            <div className="flex flex-col items-end justify-center shrink-0">
                                <span className="text-2xl md:text-3xl font-black text-[#fbaa19] font-display transition-all duration-300">{user.totalPoints}</span>
                                <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">PTS</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
