"use client";
import React, { useState } from "react";
import Link from "next/link";
import Settings from "@/components/settings";
import DashboardHome from '@/components/dashboard-home';
import SetupForm from "@/components/setup-form";
import Calendar from "@/components/calendar";
import ReportForm from "@/components/report-form";
import SillySeason from "@/components/silly-season";
import Onboarding from "@/components/onboarding";
import { useSupabaseAuth } from "@/hooks/useSupabaseAuth";
import { supabase } from "@/utils/supabase";

export default function SuperlicensePage() {
    const { user, isLoading, login, signup, resetPassword, loginWithProvider, logout } = useSupabaseAuth();
    
    // Profile State
    const [profile, setProfile] = React.useState<any>(null);
    const [loadingProfile, setLoadingProfile] = React.useState(false);

    React.useEffect(() => {
        if (user) {
            setLoadingProfile(true);
            supabase.from('profiles').select('*').eq('id', user.id).single()
                .then(({ data }) => setProfile(data))
                .finally(() => setLoadingProfile(false));
        } else {
            setProfile(null);
        }
    }, [user]);
    
    // Auth View states
    const [authMode, setAuthMode] = useState<"login" | "signup" | "recover" | "magic_link">("login");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const [successMsg, setSuccessMsg] = useState("");

    // Superlicense states
    const [activeView, setActiveView] = useState<"menu" | "settings" | "setup" | "calendar" | "report" | "silly_season">("menu");
    const [hasVotingAlert, setHasVotingAlert] = useState(true);
    const isVotingOpen = hasVotingAlert;

    const handleAuthSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setErrorMsg("");
        setSuccessMsg("");
        
        try {
            if (authMode === "login") {
                await login(email, password);
            } else if (authMode === "signup") {
                await signup(email, password);
                setSuccessMsg("Conta criada com sucesso! Verifique seu email se necessário.");
            } else if (authMode === "magic_link") {
                await signup(email, undefined);
                setSuccessMsg("Magic Link enviado! Verifique sua caixa de entrada.");
            } else if (authMode === "recover") {
                await resetPassword(email);
                setSuccessMsg("Instruções de recuperação enviadas para o seu email.");
            }
        } catch (err) {
            setErrorMsg((err as Error).message || "Ocorreu um erro. Tente novamente.");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isLoading) {
        return (
            <main className="w-full h-screen flex flex-col items-center justify-center bg-white dark:bg-black">
                <div className="w-12 h-12 rounded-full border-4 border-[#fbaa19] border-t-transparent animate-spin"></div>
                <p className="mt-4 text-[#fbaa19] font-black uppercase tracking-widest animate-pulse">Autenticando...</p>
            </main>
        );
    }

    const loginForm = (
        <div className="bg-white dark:bg-[#111] border border-black/20 dark:border-white/20 w-full max-w-md flex flex-col relative shadow-2xl transition-all">
                    <div className="p-8 border-b-4 border-[#fbaa19] text-center bg-black">
                        <h1 className="text-3xl font-black uppercase tracking-widest text-[#fbaa19] font-display">
                            Superlicense
                        </h1>
                        <p className="text-gray-400 text-xs uppercase tracking-widest mt-2">
                            Restricted Area
                        </p>
                    </div>
                    
                    <form onSubmit={handleAuthSubmit} className="p-8 flex flex-col gap-5">
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
                        
                        <div className="flex flex-col gap-1">
                            <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Email</label>
                            <input 
                                type="email" 
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="bg-gray-50 dark:bg-black border border-black/20 dark:border-white/20 p-4 text-black dark:text-white focus:border-[#fbaa19] focus:outline-none transition-colors"
                                required 
                            />
                        </div>
                        
                        {(authMode === "login" || authMode === "signup") && (
                            <div className="flex flex-col gap-1">
                                <label className="text-xs font-bold uppercase tracking-widest text-gray-500 flex justify-between">
                                    <span>Senha</span>
                                    {authMode === "login" && (
                                        <button 
                                            type="button" 
                                            onClick={() => setAuthMode("recover")}
                                            className="text-[#fbaa19] hover:text-white transition-colors"
                                        >
                                            Esqueceu?
                                        </button>
                                    )}
                                </label>
                                <input 
                                    type="password" 
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="bg-gray-50 dark:bg-black border border-black/20 dark:border-white/20 p-4 text-black dark:text-white focus:border-[#fbaa19] focus:outline-none transition-colors"
                                    required 
                                />
                            </div>
                        )}
                        
                        <button 
                            type="submit"
                            disabled={isSubmitting}
                            className="mt-2 bg-[#fbaa19] text-black font-black uppercase tracking-widest p-4 hover:bg-yellow-500 transition-colors disabled:opacity-50"
                        >
                            {isSubmitting ? "Processando..." : authMode === "login" ? "Acessar Sistema" : authMode === "signup" ? "Emitir Licença (Senha)" : authMode === "magic_link" ? "Enviar Magic Link" : "Recuperar Acesso"}
                        </button>

                        <div className="flex items-center gap-4 my-2">
                            <div className="h-px bg-black/10 dark:bg-white/10 flex-1"></div>
                            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Ou Acesso Rápido</span>
                            <div className="h-px bg-black/10 dark:bg-white/10 flex-1"></div>
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                            <button 
                                type="button"
                                onClick={() => loginWithProvider('google')}
                                className="border border-black/20 dark:border-white/20 p-3 flex items-center justify-center gap-2 hover:border-[#fbaa19] hover:text-[#fbaa19] transition-colors uppercase text-xs font-bold tracking-widest"
                            >
                                Google
                            </button>
                            <button 
                                type="button"
                                onClick={() => loginWithProvider('twitter')}
                                className="border border-black/20 dark:border-white/20 p-3 flex items-center justify-center gap-2 hover:border-[#fbaa19] hover:text-[#fbaa19] transition-colors uppercase text-xs font-bold tracking-widest"
                            >
                                X (Twitter)
                            </button>
                            <button 
                                type="button"
                                onClick={() => loginWithProvider('facebook')}
                                className="border border-black/20 dark:border-white/20 p-3 flex items-center justify-center gap-2 hover:border-[#fbaa19] hover:text-[#fbaa19] transition-colors uppercase text-xs font-bold tracking-widest"
                            >
                                Facebook
                            </button>
                            <button 
                                type="button"
                                onClick={() => setAuthMode(authMode === "magic_link" ? "login" : "magic_link")}
                                className="border border-black/20 dark:border-white/20 p-3 flex items-center justify-center gap-2 hover:border-[#fbaa19] hover:text-[#fbaa19] transition-colors uppercase text-xs font-bold tracking-widest bg-black/5 dark:bg-white/5"
                            >
                                Magic Link
                            </button>
                        </div>
                        
                        <div className="flex flex-col gap-2 mt-4 text-center">
                            {authMode !== "login" && (
                                <button 
                                    type="button"
                                    onClick={() => setAuthMode("login")}
                                    className="text-xs font-bold uppercase tracking-widest text-gray-500 hover:text-black dark:hover:text-white transition-colors"
                                >
                                    Voltar para o Login com Senha
                                </button>
                            )}
                            {(authMode === "login" || authMode === "magic_link") && (
                                <button 
                                    type="button"
                                    onClick={() => setAuthMode("signup")}
                                    className="text-xs font-bold uppercase tracking-widest text-gray-500 hover:text-black dark:hover:text-white transition-colors"
                                >
                                    Novo Piloto? Crie uma senha
                                </button>
                            )}
                        </div>
                    </form>
                </div>
    );

    // AUTHENTICATED VIEW
    return (
        <>
        <main className={`w-full max-w-7xl w-full mx-auto p-4 md:p-8 pt-12 pb-24 flex flex-col items-center justify-start min-h-screen ${!user ? 'pointer-events-none blur-sm opacity-50' : ''}`}>
            {loadingProfile ? (
                <div className="flex flex-col items-center justify-center min-h-[50vh] py-8 gap-4 animate-pulse">
                    <div className="w-12 h-12 rounded-full border-4 border-[#fbaa19] border-t-transparent animate-spin mb-4"></div>
                    <p className="text-[#fbaa19] font-bold uppercase tracking-widest text-xs">VERIFICANDO PERFIL...</p>
                </div>
            ) : profile && profile.setup_completed === false ? (
                <Onboarding onComplete={() => setProfile({ ...profile, setup_completed: true })} />
            ) : activeView === "menu" ? (
                <DashboardHome profile={profile} setActiveView={setActiveView} logout={logout} />
            ) : (
                <div className="w-full animate-fade-in">
                    <div className="mb-4 flex justify-start">
                        <button 
                            onClick={() => setActiveView("menu")}
                            className="text-gray-500 hover:text-black dark:hover:text-white flex items-center gap-2 uppercase tracking-widest text-xs font-bold transition-colors"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                            </svg>
                            Back to Superlicense
                        </button>
                    </div>
                    {activeView === "setup" && <SetupForm />}
                    {activeView === "settings" && <Settings />}
                    {activeView === "calendar" && <Calendar />}
                    {activeView === "report" && <ReportForm />}
                    {activeView === "silly_season" && <SillySeason />}
                </div>
            )}
        </main>
        {!user && (
            <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[9999] flex items-center justify-center p-4">
                {loginForm}
            </div>
        )}
        </>
    );
}
