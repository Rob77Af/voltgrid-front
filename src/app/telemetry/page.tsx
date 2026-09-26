"use client";

import React, { useEffect, useState } from 'react';
import { supabase } from '@/utils/supabase';

// Helper interface para a tipagem dos dados (depois ajustaremos melhor)
interface PredictionData {
  id: string;
  user_id: string;
  round: string;
  poletime: string;
  created_at: string;
}

export default function TelemetryPage() {
    const [predictions, setPredictions] = useState<PredictionData[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Função para buscar os palpites da tabela predictions
        const fetchTelemetry = async () => {
            setLoading(true);
            const { data, error } = await supabase
                .from('predictions')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) {
                console.error("Erro ao buscar telemetria", error);
            } else if (data) {
                setPredictions(data);
            }
            setLoading(false);
        };

        fetchTelemetry();
    }, []);

    return (
        <main className="w-full min-h-screen bg-white dark:bg-[#0a0a0a] text-black dark:text-white pt-6 pb-24">
            <div className="max-w-6xl mx-auto px-4">
                
                {/* Header */}
                <header className="mb-8 border-b-4 border-black dark:border-white pb-6">
                    <h1 className="text-4xl md:text-5xl font-black uppercase tracking-widest font-display text-[#fbaa19]">
                        LIVE TELEMETRY
                    </h1>
                    <p className="text-xs md:text-sm font-bold uppercase tracking-widest text-gray-500 mt-2">
                        Real-time tracking of global grid predictions
                    </p>
                </header>

                {/* Data Table */}
                <div className="w-full overflow-x-auto bg-[#0a0a0a] rounded-sm border border-[#333] shadow-2xl relative">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#fbaa19] to-transparent"></div>
                    
                    {loading ? (
                        <div className="p-12 text-center animate-pulse flex flex-col items-center justify-center">
                            <div className="w-8 h-8 rounded-full border-4 border-t-transparent border-[#fbaa19] animate-spin mb-4"></div>
                            <p className="font-bold tracking-widest uppercase text-xs text-[#fbaa19]">Carregando Telemetria...</p>
                        </div>
                    ) : predictions.length === 0 ? (
                        <div className="p-12 text-center text-gray-500 font-bold uppercase tracking-widest text-xs">
                            Nenhum palpite registrado para esta etapa ainda.
                        </div>
                    ) : (
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-[#333] text-[9px] md:text-xs uppercase tracking-widest text-gray-400 bg-black/40">
                                    <th className="p-4">Piloto (User ID)</th>
                                    <th className="p-4">Etapa</th>
                                    <th className="p-4">Poletime</th>
                                    <th className="p-4 text-right">Horário (UTC)</th>
                                </tr>
                            </thead>
                            <tbody className="text-xs md:text-sm font-medium">
                                {predictions.map((pred) => (
                                    <tr key={pred.id} className="border-b border-[#222] hover:bg-white/5 transition-colors group">
                                        <td className="p-4 font-black tracking-widest text-[#fbaa19] group-hover:text-white transition-colors">
                                            {pred.user_id.substring(0, 8)}...
                                        </td>
                                        <td className="p-4 text-gray-300">
                                            RND {pred.round}
                                        </td>
                                        <td className="p-4 font-mono text-[#00ff00]">
                                            {pred.poletime || 'N/A'}
                                        </td>
                                        <td className="p-4 text-right text-gray-500 font-mono text-[10px]">
                                            {new Date(pred.created_at).toLocaleTimeString('pt-BR')}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </main>
    );
}
