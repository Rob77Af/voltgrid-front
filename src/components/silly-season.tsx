"use client";

import React, { useState, useEffect } from "react";
import { useSupabaseAuth } from "@/hooks/useSupabaseAuth";
import { supabase } from "@/utils/supabase";

type TeamAvailable = {
    f1_team_code: string;
    spots: number;
};

const TEAM_NAMES: Record<string, string> = {
    "FER": "Ferrari",
    "MCL": "McLaren",
    "MER": "Mercedes",
    "RBR": "Red Bull",
    "AST": "Aston Martin",
    "ALP": "Alpine",
    "WIL": "Williams",
    "RBU": "RB",
    "HAA": "Haas",
    "SAU": "Kick Sauber",
};

export default function SillySeason() {
    const { user } = useSupabaseAuth();
    
    const [isLoading, setIsLoading] = useState(true);
    const [availableTeams, setAvailableTeams] = useState<TeamAvailable[]>([]);
    const [selectedTeams, setSelectedTeams] = useState<string[]>([]);
    const [assignedTeam, setAssignedTeam] = useState<string | null>(null);
    const [wishlist, setWishlist] = useState<string[]>([]);
    
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const [successMsg, setSuccessMsg] = useState("");

    // Load user data and available teams
    useEffect(() => {
        if (!user) return;
        
        async function loadData() {
            try {
                // 1. Fetch user's profile to see if they already have an assignment and wishlist
                const { data: profile, error: profileError } = await supabase
                    .from("profiles")
                    .select("car_number, preferred_teams")
                    .eq("id", user!.id)
                    .single();
                
                if (!profileError && profile) {
                    if (profile.preferred_teams && profile.preferred_teams.length > 0) {
                        setWishlist(profile.preferred_teams);
                        if (profile.car_number) {
                            setAssignedTeam("ASSIGNED"); 
                        }
                    }
                }

                // 2. Fetch available teams using the RPC
                const { data: teamsData, error: teamsError } = await supabase.rpc("get_available_teams");
                if (teamsError) {
                    console.error("Error fetching teams:", teamsError);
                } else if (teamsData) {
                    setAvailableTeams(teamsData);
                }
                
            } catch (err) {
                console.error(err);
            } finally {
                setIsLoading(false);
            }
        }

        loadData();
    }, [user]);

    const handleSelectTeam = (code: string) => {
        if (selectedTeams.includes(code)) {
            setSelectedTeams(prev => prev.filter(t => t !== code));
        } else {
            if (selectedTeams.length < 3) {
                setSelectedTeams(prev => [...prev, code]);
            }
        }
    };

    const handleSubmit = async () => {
        if (selectedTeams.length !== 3) {
            setErrorMsg("Você precisa escolher exatamente 3 equipes em ordem de preferência.");
            return;
        }

        setIsSubmitting(true);
        setErrorMsg("");
        setSuccessMsg("");

        try {
            // 1. Save preferences to profiles table
            const { error: updateError } = await supabase
                .from("profiles")
                .update({ preferred_teams: selectedTeams })
                .eq("id", user!.id);

            if (updateError) throw updateError;

            // 2. Call the RPC to assign the garage
            const { data: rpcData, error: rpcError } = await supabase.rpc("assign_preferred_garage", {
                p_user_id: user!.id,
                p_preferred_teams: selectedTeams
            });

            if (rpcError) throw rpcError;

            setSuccessMsg("Contrato assinado! Você foi alocado com sucesso.");
            setWishlist(selectedTeams);
            setAssignedTeam("ASSIGNED");

        } catch (err: unknown) {
            console.error(err);
            setErrorMsg(err instanceof Error ? err.message : "Erro ao tentar assinar o contrato.");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isLoading) {
        return (
            <div className="w-full flex flex-col items-center justify-center p-12">
                <div className="w-8 h-8 rounded-full border-2 border-[#fbaa19] border-t-transparent animate-spin"></div>
                <p className="mt-4 text-[#fbaa19] text-xs font-bold uppercase tracking-widest animate-pulse">Consultando Vagas...</p>
            </div>
        );
    }

    // ALREADY SUBMITTED VIEW
    if (wishlist.length > 0) {
        return (
            <div className="w-full max-w-2xl mx-auto flex flex-col animate-fade-in p-4 border border-white/10 bg-black">
                <div className="p-6 border-b border-white/10 text-center">
                    <h2 className="text-2xl font-black uppercase tracking-widest text-[#fbaa19]">Status do Contrato</h2>
                </div>
                
                <div className="p-8 flex flex-col gap-8">
                    <div className="text-center">
                        <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-2">Suas Opções de Interesse (Wishlist)</p>
                        <p className="text-gray-500 text-[10px] uppercase mb-6">Esta lista será mantida para a futura realocação de usuários após o fim da temporada.</p>
                        
                        <div className="flex flex-col gap-3">
                            {wishlist.map((code, index) => (
                                <div key={code} className="flex items-center gap-4 bg-[#111] border border-white/5 p-4 relative overflow-hidden">
                                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#fbaa19] opacity-50"></div>
                                    <div className="text-[#fbaa19] font-black text-xl opacity-50 w-8">{index + 1}º</div>
                                    <div className="font-bold text-white uppercase tracking-widest">{TEAM_NAMES[code] || code}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {assignedTeam && (
                        <div className="mt-4 p-4 border border-green-500/30 bg-green-500/5 text-center">
                            <p className="text-green-500 text-xs font-bold uppercase tracking-widest">Você já está alocado em uma garagem para esta temporada.</p>
                        </div>
                    )}
                </div>
            </div>
        );
    }

    // SELECTION VIEW
    return (
        <div className="w-full max-w-4xl mx-auto flex flex-col animate-fade-in p-4 border border-black/20 dark:border-white/20 bg-white dark:bg-[#0a0a0a]">
            <div className="p-6 border-b-2 border-[#fbaa19] bg-black text-center">
                <h2 className="text-3xl font-black uppercase tracking-widest text-[#fbaa19] font-display">Silly Season</h2>
                <p className="text-gray-400 text-xs uppercase tracking-widest mt-2">Escolha as suas 3 equipes prediletas</p>
            </div>

            <div className="p-6 md:p-8 flex flex-col gap-8">
                {errorMsg && (
                    <div className="p-3 bg-red-500/10 border border-red-500 text-red-500 text-xs font-bold uppercase tracking-widest text-center">
                        {errorMsg}
                    </div>
                )}
                {successMsg && (
                    <div className="p-3 bg-green-500/10 border border-green-500 text-green-500 text-xs font-bold uppercase tracking-widest text-center">
                        {successMsg}
                    </div>
                )}

                <div className="flex flex-col items-center gap-4">
                    <p className="text-black dark:text-white text-sm font-bold uppercase tracking-widest text-center">
                        O sistema irá buscar no grupo ativo uma vaga em uma de suas opções.<br/>
                        <span className="text-gray-500 text-xs font-normal">Caso não encontre, você será direcionado para a próxima vaga disponível no grid. Suas opções serão mantidas para futura realocação.</span>
                    </p>

                    <div className="flex items-center gap-4 my-6 w-full justify-center">
                        {[1, 2, 3].map((slot) => {
                            const selectedCode = selectedTeams[slot - 1];
                            return (
                                <div key={slot} className={`flex flex-col items-center justify-center w-24 h-24 border-2 transition-all ${selectedCode ? 'border-[#fbaa19] bg-[#fbaa19]/10' : 'border-gray-300 dark:border-[#333] bg-gray-50 dark:bg-[#111] opacity-50'}`}>
                                    <span className="text-[10px] text-gray-500 uppercase font-bold mb-1">{slot}ª Opção</span>
                                    {selectedCode ? (
                                        <span className="text-xl font-black text-[#fbaa19]">{selectedCode}</span>
                                    ) : (
                                        <span className="text-2xl text-gray-300 dark:text-[#333]">-</span>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                    {(availableTeams.length > 0 ? availableTeams : Object.keys(TEAM_NAMES).map(c => ({ f1_team_code: c, spots: -1 }))).map((team) => {
                        const code = team.f1_team_code;
                        const isSelected = selectedTeams.includes(code);
                        const selectionIndex = selectedTeams.indexOf(code);
                        
                        return (
                            <button
                                key={code}
                                onClick={() => handleSelectTeam(code)}
                                className={`flex flex-col items-center justify-center p-4 border-2 transition-all relative overflow-hidden ${
                                    isSelected 
                                    ? 'border-[#fbaa19] bg-[#fbaa19]/10 text-black dark:text-white' 
                                    : 'border-black/10 dark:border-white/10 hover:border-[#fbaa19] hover:text-[#fbaa19] text-gray-500'
                                }`}
                            >
                                {isSelected && (
                                    <div className="absolute top-0 right-0 bg-[#fbaa19] text-black w-6 h-6 flex items-center justify-center text-xs font-black">
                                        {selectionIndex + 1}
                                    </div>
                                )}
                                <span className="text-xl font-black uppercase">{code}</span>
                                <span className="text-[10px] font-bold uppercase tracking-widest mt-1 opacity-70">
                                    {TEAM_NAMES[code]}
                                </span>
                                {team.spots !== -1 && (
                                    <span className={`text-[9px] mt-2 px-2 py-0.5 font-bold ${team.spots > 0 ? 'bg-green-500/20 text-green-500' : 'bg-red-500/20 text-red-500'}`}>
                                        {team.spots > 0 ? `${team.spots} Vagas` : 'Lotado'}
                                    </span>
                                )}
                            </button>
                        );
                    })}
                </div>

                <div className="flex justify-center mt-8">
                    <button
                        onClick={handleSubmit}
                        disabled={selectedTeams.length !== 3 || isSubmitting}
                        className={`px-12 py-4 font-black uppercase tracking-widest text-sm transition-all ${
                            selectedTeams.length === 3
                            ? 'bg-[#fbaa19] text-black hover:bg-white hover:text-black hover:scale-105'
                            : 'bg-gray-200 dark:bg-[#222] text-gray-400 dark:text-gray-600 cursor-not-allowed'
                        }`}
                    >
                        {isSubmitting ? 'Assinando...' : 'Assinar Contrato'}
                    </button>
                </div>
                
                <div className="flex justify-center">
                     <button onClick={() => setSelectedTeams([])} className="text-[10px] text-gray-500 hover:text-red-500 uppercase font-bold tracking-widest underline underline-offset-4">Limpar Seleção</button>
                </div>
            </div>
        </div>
    );
}
