"use client";
import React, { useState } from "react";
import Link from "next/link";
import Settings from "@/components/settings";
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
    const [activeView, setActiveView] = useState<"menu" | "settings" | "calendar" | "report" | "silly_season">("menu");
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
        <main className={`w-full max-w-6xl mx-auto p-4 md:p-8 pt-12 pb-24 flex flex-col items-center justify-start min-h-screen ${!user ? 'pointer-events-none blur-sm opacity-50' : ''}`}>
            {loadingProfile ? (
                <div className="flex flex-col items-center justify-center min-h-[50vh] py-8 gap-4 animate-pulse">
                    <div className="w-12 h-12 rounded-full border-4 border-[#fbaa19] border-t-transparent animate-spin mb-4"></div>
                    <p className="text-[#fbaa19] font-bold uppercase tracking-widest text-xs">VERIFICANDO PERFIL...</p>
                </div>
            ) : profile && profile.setup_completed === false ? (
                <Onboarding onComplete={() => setProfile({ ...profile, setup_completed: true })} />
            ) : activeView === "menu" ? (
                <div className="flex flex-col items-center justify-center min-h-[50vh] py-8 gap-4 md:gap-6 animate-fade-in">
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-black uppercase tracking-wider font-display text-black dark:text-white mb-6">
                        Superlicense
                    </h1>
                    
                    <Link 
                        href="/bet?tab=all-forms"
                        className="w-64 text-center bg-black dark:bg-[#1a1a1a] text-white border-2 border-black dark:border-[#1a1a1a] px-8 py-4 font-bold uppercase tracking-widest text-sm transition-colors hover:bg-white hover:text-black dark:hover:bg-white dark:hover:text-black"
                    >
                        Setup
                    </Link>

                    <button 
                        onClick={() => setActiveView("report")}
                        className="w-64 bg-transparent text-black dark:text-white border-2 border-black/20 dark:border-white/20 px-8 py-4 font-bold uppercase tracking-widest text-sm transition-colors hover:border-[#fbaa19] hover:text-[#fbaa19]"
                    >
                        Report
                    </button>

                    <button 
                        onClick={() => setActiveView("silly_season")}
                        className="w-64 bg-white dark:bg-black text-black dark:text-white border-2 border-black/50 dark:border-white/50 px-8 py-4 font-bold uppercase tracking-widest text-sm transition-all hover:border-[#fbaa19] hover:text-[#fbaa19]"
                    >
                        Silly Season
                    </button>

                    <button 
                        className="w-64 bg-transparent text-black dark:text-white border-2 border-black/20 dark:border-white/20 px-8 py-4 font-bold uppercase tracking-widest text-sm transition-colors hover:border-[#fbaa19] hover:text-[#fbaa19]"
                    >
                        My Teamwork
                    </button>

                    <button 
                        className="w-64 bg-transparent text-black dark:text-white border-2 border-black/20 dark:border-white/20 px-8 py-4 font-bold uppercase tracking-widest text-sm transition-colors hover:border-[#fbaa19] hover:text-[#fbaa19]"
                    >
                        Paddock
                    </button>

                    <button 
                        disabled={!isVotingOpen}
                        className={`w-64 border-2 px-8 py-4 font-bold uppercase tracking-widest text-sm transition-all relative flex items-center justify-center gap-2 ${
                            isVotingOpen 
                                ? "bg-white dark:bg-black text-black dark:text-white border-black/50 dark:border-white/50 hover:border-[#fbaa19] hover:text-[#fbaa19]" 
                                : "bg-gray-100 dark:bg-[#111] text-gray-400 dark:text-gray-600 border-gray-300 dark:border-[#333] cursor-not-allowed opacity-60"
                        }`}
                    >
                        Voting
                        {hasVotingAlert && (
                            <span className="absolute top-0 right-0 -mt-1 -mr-1 flex h-4 w-4">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-4 w-4 bg-red-500 border-2 border-white dark:border-black"></span>
                            </span>
                        )}
                        {!isVotingOpen && (
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                        )}
                    </button>

                    <Link 
                        href="/race-control"
                        className="w-64 text-center bg-black dark:bg-white text-white dark:text-black border-2 border-black dark:border-white px-8 py-4 font-bold uppercase tracking-widest text-sm transition-colors hover:bg-white hover:text-black dark:hover:bg-black dark:hover:text-white"
                    >
                        Race Control
                    </Link>

                    <button 
                        onClick={() => setActiveView("calendar")}
                        className="w-64 bg-white dark:bg-black text-black dark:text-white border-2 border-[#fbaa19] px-8 py-4 font-bold uppercase tracking-widest text-sm transition-colors hover:bg-[#fbaa19] hover:text-black"
                    >
                        F1 Calendar
                    </button>
                    
                    <button 
                        onClick={() => setActiveView("settings")}
                        className="w-64 bg-[#fbaa19] text-black border-2 border-[#fbaa19] px-8 py-4 font-bold uppercase tracking-widest text-sm transition-colors hover:bg-black hover:text-[#fbaa19] dark:hover:bg-white dark:hover:text-black dark:hover:border-white"
                    >
                        System Settings
                    </button>

                    <button 
                        onClick={() => logout()}
                        className="w-64 bg-transparent text-gray-500 border-2 border-transparent px-8 py-4 font-bold uppercase tracking-widest text-xs transition-colors hover:text-red-500 hover:border-red-500/30"
                    >
                        [ LOGOUT ]
                    </button>
                </div>
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
