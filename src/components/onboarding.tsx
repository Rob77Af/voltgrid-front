"use client";
import React, { useEffect, useState } from "react";
import { supabase } from "@/utils/supabase";

interface Team {
    id: string;
    name: string;
    code: string;
    color: string;
    spots_taken: number;
    is_available: boolean;
}

interface OnboardingData {
    group_id: number;
    group_name: string;
    teams: Team[];
}

export default function Onboarding({ onComplete }: { onComplete: () => void }) {
    const [data, setData] = useState<OnboardingData | null>(null);
    const [loading, setLoading] = useState(true);
    const [signing, setSigning] = useState(false);
    const [selectedTeam, setSelectedTeam] = useState<string | null>(null);
    const [error, setError] = useState("");

    useEffect(() => {
        async function fetchOnboardingData() {
            try {
                const { data: result, error: rpcError } = await supabase.rpc('get_onboarding_data');
                if (rpcError) throw rpcError;
                setData(result);
            } catch (err: any) {
                console.error("Error fetching onboarding data:", err);
                setError(err.message || "Failed to load group data.");
            } finally {
                setLoading(false);
            }
        }
        fetchOnboardingData();
    }, []);

    const handleSignContract = async () => {
        if (!selectedTeam) return;
        setSigning(true);
        setError("");
        
        try {
            const { error: rpcError } = await supabase.rpc('sign_initial_contract', { p_team_id: selectedTeam });
            if (rpcError) throw rpcError;
            
            // Successfully signed!
            onComplete();
        } catch (err: any) {
            console.error("Error signing contract:", err);
            setError(err.message || "Failed to sign contract.");
            setSigning(false);
        }
    };

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center p-12 w-full animate-pulse">
                <div className="w-12 h-12 rounded-full border-4 border-[#fbaa19] border-t-transparent animate-spin mb-4"></div>
                <p className="text-gray-500 uppercase tracking-widest text-xs font-bold">PREPARANDO CONTRATOS...</p>
            </div>
        );
    }

    if (error && !data) {
        return (
            <div className="p-8 border border-red-500/50 bg-red-500/10 text-red-500 text-center">
                <p className="font-bold uppercase tracking-widest text-sm">{error}</p>
            </div>
        );
    }

    return (
        <div className="w-full flex flex-col items-center animate-fade-in">
            <div className="w-full max-w-4xl bg-black border border-white/10 p-8 md:p-12 shadow-2xl relative overflow-hidden">
                {/* Background texture */}
                <div className="absolute inset-0 z-0 opacity-20 mix-blend-overlay grayscale" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1541348263662-e06836264be8?q=80&w=2069&auto=format&fit=crop")', backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/90 to-transparent z-0"></div>

                <div className="relative z-10 flex flex-col items-center text-center mb-10">
                    <span className="text-[#fbaa19] font-bold text-xs uppercase tracking-[0.3em] mb-4">Silly Season • Passo 1</span>
                    <h2 className="text-3xl md:text-5xl font-black uppercase tracking-widest font-display mb-4 text-white">
                        Sua Primeira <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#fbaa19] to-yellow-600">Equipe</span>
                    </h2>
                    <p className="text-gray-400 text-sm md:text-base max-w-2xl">
                        O grupo <strong className="text-white">"{data?.group_name}"</strong> está sendo preenchido no momento. 
                        Escolha uma das vagas disponíveis abaixo para assinar seu contrato e entrar no grid.
                    </p>
                </div>

                <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10 w-full">
                    {data?.teams.map((team) => (
                        <button
                            key={team.id}
                            onClick={() => team.is_available ? setSelectedTeam(team.id) : null}
                            disabled={!team.is_available || signing}
                            className={`relative overflow-hidden flex flex-col p-6 border-2 transition-all duration-300 text-left ${
                                !team.is_available 
                                    ? 'border-red-500/20 bg-red-500/5 opacity-50 cursor-not-allowed grayscale' 
                                    : selectedTeam === team.id 
                                        ? 'border-[#fbaa19] bg-[#fbaa19]/10 transform scale-[1.02]' 
                                        : 'border-white/10 bg-white/5 hover:border-white/30 hover:bg-white/10 cursor-pointer'
                            }`}
                        >
                            <div className="absolute top-0 right-0 w-16 h-16 opacity-20 translate-x-4 -translate-y-4 rounded-full" style={{ backgroundColor: team.color }}></div>
                            
                            <h3 className="text-xl font-black uppercase tracking-widest text-white mb-1">{team.name}</h3>
                            <p className="text-xs text-gray-400 font-bold tracking-[0.2em] mb-4">{team.code}</p>
                            
                            <div className="mt-auto flex justify-between items-end w-full">
                                <span className={`text-xs font-bold uppercase tracking-widest ${team.is_available ? 'text-green-500' : 'text-red-500'}`}>
                                    {team.is_available ? `${2 - team.spots_taken} Vagas` : 'Lotado'}
                                </span>
                                {selectedTeam === team.id && (
                                    <div className="w-4 h-4 bg-[#fbaa19] rounded-full shadow-[0_0_10px_#fbaa19]"></div>
                                )}
                            </div>
                        </button>
                    ))}
                </div>

                {error && (
                    <div className="relative z-10 mb-6 p-4 border border-red-500/50 bg-red-500/10 text-red-500 text-center text-sm font-bold uppercase tracking-widest">
                        {error}
                    </div>
                )}

                <div className="relative z-10 flex justify-center w-full">
                    <button
                        onClick={handleSignContract}
                        disabled={!selectedTeam || signing}
                        className={`px-12 py-5 font-black uppercase tracking-widest text-sm transition-all duration-300 border ${
                            !selectedTeam 
                                ? 'bg-transparent text-gray-500 border-gray-600 cursor-not-allowed' 
                                : signing 
                                    ? 'bg-[#fbaa19]/50 text-black border-[#fbaa19]/50 cursor-wait'
                                    : 'bg-[#fbaa19] text-black border-[#fbaa19] hover:bg-white hover:border-white shadow-[0_0_20px_rgba(251,170,25,0.4)]'
                        }`}
                    >
                        {signing ? 'Processando...' : 'Assinar Contrato'}
                    </button>
                </div>
            </div>
        </div>
    );
}
