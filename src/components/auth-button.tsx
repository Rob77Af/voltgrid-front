"use client";
import React, { useState } from "react";
import { useSupabaseAuth } from "@/hooks/useSupabaseAuth";
import Link from "next/link";

export default function AuthButton() {
    const { user, isLoading, login, logout, signup } = useSupabaseAuth();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [mode, setMode] = useState<"login" | "signup">("login");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setErrorMsg("");
        
        try {
            if (mode === "login") {
                await login(email, password);
            } else {
                await signup(email, password, username);
            }
            setIsModalOpen(false);
        } catch (err: any) {
            setErrorMsg(err.message || "Erro de autenticacao");
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
                    Logout
                </button>
            </div>
        );
    }

    return (
        <>
            <button 
                onClick={() => setIsModalOpen(true)}
                className="bg-transparent border-2 border-black/20 dark:border-white/20 hover:border-[#fbaa19] hover:text-[#fbaa19] dark:hover:border-[#fbaa19] text-black dark:text-white px-4 py-1.5 text-xs font-bold uppercase tracking-widest rounded-sm transition-colors"
            >
                Login
            </button>

            {isModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
                    <div className="bg-white dark:bg-[#111] border border-black/20 dark:border-white/20 w-full max-w-md flex flex-col relative rounded-sm shadow-2xl">
                        <button 
                            onClick={() => setIsModalOpen(false)}
                            className="absolute top-4 right-4 text-gray-500 hover:text-[#fbaa19] transition-colors"
                        >
                            ?
                        </button>
                        
                        <div className="p-6 border-b border-black/10 dark:border-white/10">
                            <h2 className="text-2xl font-black uppercase tracking-widest text-black dark:text-white font-display">
                                {mode === "login" ? "Acessar Paddock" : "Nova Superlicenca"}
                            </h2>
                        </div>
                        
                        <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-4">
                            {errorMsg && (
                                <div className="p-3 bg-red-500/10 border border-red-500 text-red-500 text-xs font-bold uppercase tracking-widest">
                                    {errorMsg}
                                </div>
                            )}
                            
                            {mode === "signup" && (
                                <div className="flex flex-col gap-1">
                                    <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Apelido (Username)</label>
                                    <input 
                                        type="text" 
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        className="bg-gray-50 dark:bg-black border border-black/20 dark:border-white/20 p-3 text-black dark:text-white focus:border-[#fbaa19] focus:outline-none transition-colors"
                                        required 
                                    />
                                </div>
                            )}
                            
                            <div className="flex flex-col gap-1">
                                <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Email</label>
                                <input 
                                    type="email" 
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="bg-gray-50 dark:bg-black border border-black/20 dark:border-white/20 p-3 text-black dark:text-white focus:border-[#fbaa19] focus:outline-none transition-colors"
                                    required 
                                />
                            </div>
                            
                            <div className="flex flex-col gap-1">
                                <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Senha</label>
                                <input 
                                    type="password" 
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="bg-gray-50 dark:bg-black border border-black/20 dark:border-white/20 p-3 text-black dark:text-white focus:border-[#fbaa19] focus:outline-none transition-colors"
                                    required 
                                />
                            </div>
                            
                            <button 
                                type="submit"
                                disabled={isSubmitting}
                                className="mt-4 bg-[#fbaa19] text-black font-black uppercase tracking-widest p-4 hover:bg-yellow-500 transition-colors disabled:opacity-50"
                            >
                                {isSubmitting ? "Autenticando..." : mode === "login" ? "Entrar" : "Criar Conta"}
                            </button>
                            
                            <button 
                                type="button"
                                onClick={() => setMode(mode === "login" ? "signup" : "login")}
                                className="mt-2 text-xs font-bold uppercase tracking-widest text-gray-500 hover:text-black dark:hover:text-white transition-colors"
                            >
                                {mode === "login" ? "Nao tem conta? Registre-se" : "Ja tem conta? Faca login"}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}
