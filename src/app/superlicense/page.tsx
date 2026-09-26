"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSupabaseAuth } from '@/hooks/useSupabaseAuth';
import { supabase } from '@/utils/supabase';
import Onboarding from '@/components/onboarding';
import SetupForm from '@/components/setup-form';

export default function SuperlicenseRouter() {
    const { user, isLoading: authLoading } = useSupabaseAuth();
    const router = useRouter();
    const [verifying, setVerifying] = useState(true);
    const [step, setStep] = useState<'login' | 'onboarding' | 'setup'>('login');

    // Auth states
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [authMode, setAuthMode] = useState<"login" | "signup" | "recover">("login");
    const [errorMsg, setErrorMsg] = useState("");
    const [successMsg, setSuccessMsg] = useState("");
    const [loadingAction, setLoadingAction] = useState(false);

    useEffect(() => {
        async function routeUser() {
            if (authLoading) return;
            
            if (!user) {
                setStep('login');
                setVerifying(false);
                return;
            }

            try {
                const { data, error } = await supabase
                    .from('profiles')
                    .select('slug, setup_completed')
                    .eq('id', user.id)
                    .single();

                if (data?.setup_completed) {
                    if (data.slug) {
                        router.replace(`/${data.slug}`);
                    } else {
                        setStep('setup');
                        setVerifying(false);
                    }
                } else {
                    setStep('onboarding');
                    setVerifying(false);
                }
            } catch (err) {
                console.error("Error routing user:", err);
                setStep('login');
                setVerifying(false);
            }
        }
        
        routeUser();
    }, [user, authLoading, router]);

    const handleAuthSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMsg("");
        setSuccessMsg("");
        setLoadingAction(true);

        try {
            if (authMode === "login") {
                const { error } = await supabase.auth.signInWithPassword({ email, password });
                if (error) throw error;
                window.location.reload();
            } else if (authMode === "signup") {
                const { error } = await supabase.auth.signUp({ email, password });
                if (error) throw error;
                setSuccessMsg("Check your email for the confirmation link!");
            } else if (authMode === "recover") {
                const { error } = await supabase.auth.resetPasswordForEmail(email);
                if (error) throw error;
                setSuccessMsg("Check your email for the recovery link!");
            }
        } catch (err: any) {
            setErrorMsg(err.message || "An error occurred during authentication.");
        } finally {
            setLoadingAction(false);
        }
    };

    if (authLoading || verifying) {
        return (
            <main className="w-full max-w-6xl mx-auto p-4 md:p-8 pt-12 flex flex-col items-center justify-center min-h-[70vh]">
                <div className="w-12 h-12 rounded-full border-4 border-[#fbaa19] border-t-transparent animate-spin mb-4"></div>
                <p className="text-[#fbaa19] font-bold uppercase tracking-widest text-xs">ROUTING...</p>
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
                        onChange={(e: any) => setEmail(e.target.value)}
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
                            onChange={(e: any) => setPassword(e.target.value)}
                            className="bg-gray-50 dark:bg-black border border-black/20 dark:border-white/20 p-4 text-black dark:text-white focus:border-[#fbaa19] focus:outline-none transition-colors"
                            required 
                        />
                    </div>
                )}

                <button 
                    type="submit"
                    disabled={loadingAction}
                    className="mt-4 bg-[#fbaa19] text-black px-6 py-4 font-black uppercase tracking-widest text-lg transition-colors hover:bg-black hover:text-[#fbaa19] border-2 border-transparent hover:border-[#fbaa19] disabled:opacity-50"
                >
                    {loadingAction ? "..." : authMode === "login" ? "ENTRAR" : authMode === "signup" ? "CRIAR CONTA" : "RECUPERAR"}
                </button>

                {authMode === "login" ? (
                    <button type="button" onClick={() => setAuthMode("signup")} className="text-xs font-bold text-gray-500 hover:text-white uppercase tracking-widest underline underline-offset-4">
                        Criar nova conta
                    </button>
                ) : (
                    <button type="button" onClick={() => setAuthMode("login")} className="text-xs font-bold text-gray-500 hover:text-white uppercase tracking-widest underline underline-offset-4">
                        Voltar para Login
                    </button>
                )}
            </form>
        </div>
    );

    return (
        <main className="w-full max-w-6xl mx-auto p-4 md:p-8 pt-12 pb-24 flex flex-col items-center justify-start min-h-screen">
            {step === 'login' && (
                <div className="mt-8">{loginForm}</div>
            )}
            
            {step === 'onboarding' && (
                <div className="w-full mt-4">
                    <Onboarding onComplete={() => window.location.reload()} />
                </div>
            )}

            {step === 'setup' && (
                <div className="w-full mt-4 animate-fade-in border border-[#fbaa19]/20 shadow-2xl">
                    <SetupForm />
                </div>
            )}
        </main>
    );
}
