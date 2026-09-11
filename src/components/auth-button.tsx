"use client";
import React, { useState } from "react";
import { useSupabaseAuth } from "@/hooks/useSupabaseAuth";
import Link from "next/link";

export default function AuthButton() {
    const { user, isLoading, login, logout, signup, loginWithProvider } = useSupabaseAuth();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [mode, setMode] = useState<"login" | "signup" | "magic_link">("login");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const [successMsg, setSuccessMsg] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setErrorMsg("");
        setSuccessMsg("");
        
        try {
            if (mode === "login") {
                await login(email, password);
                setIsModalOpen(false);
            } else if (mode === "signup") {
                await signup(email, password);
                setIsModalOpen(false);
            } else if (mode === "magic_link") {
                await signup(email, undefined);
                setSuccessMsg("Magic link enviado para o seu email!");
            }
        } catch (err) {
            setErrorMsg((err as Error).message || "Erro de autenticacao");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isLoading) {
        return <div className="w-8 h-8 rounded-full border-2 border-[#fbaa19] border-t-transparent animate-spin"></div>;
    }

    if (user) {
        return (
            <div className="flex items-center gap-4">
                <Link href="/superlicense" className="flex items-center gap-2 group cursor-pointer">
                    <div className="w-8 h-8 bg-[#fbaa19] text-black font-black flex items-center justify-center rounded-full uppercase">
                        {user.user_metadata?.username?.charAt(0) || user.email?.charAt(0) || "U"}
                    </div>
                </Link>
                <button 
                    onClick={() => logout()}
                    className="text-xs uppercase tracking-widest text-gray-500 hover:text-[#fbaa19] transition-colors"
                >
                    [ Logout ]
                </button>
            </div>
        );
    }

    return (
        <>
            <button 
                onClick={() => setIsModalOpen(true)}
                className="bg-white text-black dark:bg-black dark:text-white border-2 border-black/20 dark:border-white/20 px-6 py-2 font-bold uppercase tracking-widest text-sm transition-colors hover:border-[#fbaa19] hover:text-[#fbaa19] dark:hover:border-[#fbaa19] dark:hover:text-[#fbaa19]"
            >
                Login
            </button>

            {isModalOpen && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[9999] flex items-center justify-center p-4">
                    <div className="bg-white dark:bg-[#111] border border-black/20 dark:border-white/20 w-full max-w-sm flex flex-col relative">
                        <button 
                            onClick={() => setIsModalOpen(false)}
                            className="absolute top-4 right-4 text-gray-500 hover:text-[#fbaa19] transition-colors z-10"
                        >
                            ✕
                        </button>
                        
                        <div className="p-6 border-b-2 border-[#fbaa19] bg-black text-center">
                            <h2 className="text-xl font-black uppercase tracking-widest text-[#fbaa19]">
                                Superlicense
                            </h2>
                        </div>

                        <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-4">
                            {errorMsg && (
                                <div className="p-2 bg-red-500/10 border border-red-500 text-red-500 text-[10px] font-bold uppercase tracking-widest text-center">
                                    {errorMsg}
                                </div>
                            )}
                            {successMsg && (
                                <div className="p-2 bg-green-500/10 border border-green-500 text-green-500 text-[10px] font-bold uppercase tracking-widest text-center">
                                    {successMsg}
                                </div>
                            )}
                            
                            <div className="flex flex-col gap-1">
                                <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Email</label>
                                <input 
                                    type="email" 
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="bg-gray-50 dark:bg-black border border-black/20 dark:border-white/20 p-3 text-sm text-black dark:text-white focus:border-[#fbaa19] focus:outline-none transition-colors"
                                    required 
                                />
                            </div>
                            
                            {(mode === "login" || mode === "signup") && (
                                <div className="flex flex-col gap-1">
                                    <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Senha</label>
                                    <input 
                                        type="password" 
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="bg-gray-50 dark:bg-black border border-black/20 dark:border-white/20 p-3 text-sm text-black dark:text-white focus:border-[#fbaa19] focus:outline-none transition-colors"
                                        required 
                                    />
                                </div>
                            )}
                            
                            <button 
                                type="submit"
                                disabled={isSubmitting}
                                className="mt-2 bg-[#fbaa19] text-black font-black uppercase tracking-widest text-xs p-3 hover:bg-yellow-500 transition-colors disabled:opacity-50"
                            >
                                {isSubmitting ? "..." : mode === "login" ? "Acessar" : mode === "signup" ? "Criar Conta" : "Enviar Link"}
                            </button>

                            <div className="flex items-center gap-2 my-1">
                                <div className="h-px bg-black/10 dark:bg-white/10 flex-1"></div>
                                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Ou</span>
                                <div className="h-px bg-black/10 dark:bg-white/10 flex-1"></div>
                            </div>

                            <div className="grid grid-cols-2 gap-2">
                                <button 
                                    type="button"
                                    onClick={() => loginWithProvider('google')}
                                    className="border border-black/20 dark:border-white/20 p-2 flex items-center justify-center gap-2 hover:border-[#fbaa19] hover:text-[#fbaa19] transition-colors uppercase text-[10px] font-bold tracking-widest"
                                >
                                    Google
                                </button>
                                <button 
                                    type="button"
                                    onClick={() => setMode(mode === "magic_link" ? "login" : "magic_link")}
                                    className="border border-black/20 dark:border-white/20 p-2 flex items-center justify-center gap-2 hover:border-[#fbaa19] hover:text-[#fbaa19] transition-colors uppercase text-[10px] font-bold tracking-widest bg-black/5 dark:bg-white/5"
                                >
                                    Magic Link
                                </button>
                            </div>

                            <div className="flex flex-col gap-2 mt-2 text-center">
                                {mode !== "login" && (
                                    <button 
                                        type="button"
                                        onClick={() => setMode("login")}
                                        className="text-[10px] font-bold uppercase tracking-widest text-gray-500 hover:text-black dark:hover:text-white transition-colors"
                                    >
                                        Já tem conta? Login
                                    </button>
                                )}
                                {(mode === "login" || mode === "magic_link") && (
                                    <button 
                                        type="button"
                                        onClick={() => setMode("signup")}
                                        className="text-[10px] font-bold uppercase tracking-widest text-gray-500 hover:text-black dark:hover:text-white transition-colors"
                                    >
                                        Criar nova conta
                                    </button>
                                )}
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}
