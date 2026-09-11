"use client";

import { useEffect, useState } from "react";
import { User, Session } from "@supabase/supabase-js";
import { supabase } from "@/utils/supabase";
import { useRouter } from "next/navigation";

export function useSupabaseAuth() {
    const router = useRouter();
    const [user, setUser] = useState<User | null>(null);
    const [session, setSession] = useState<Session | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const getInitialSession = async () => {
            try {
                const { data: { session }, error } = await supabase.auth.getSession();
                if (error) throw error;
                
                setSession(session);
                setUser(session?.user ?? null);
            } catch (err) {
                console.error("Error fetching session:", err);
            } finally {
                setIsLoading(false);
            }
        };

        getInitialSession();

        const { data: { subscription } } = supabase.auth.onAuthStateChange(
            (_event, session) => {
                setSession(session);
                setUser(session?.user ?? null);
                setIsLoading(false);
            }
        );

        return () => {
            subscription.unsubscribe();
        };
    }, []);

    const login = async (email: string, password: string) => {
        setIsLoading(true);
        setError(null);
        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });
            if (error) throw error;
            return data;
        } catch (err) {
            const error = err as Error;
            setError(error.message);
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    const signup = async (email: string, password?: string, username?: string) => {
        setIsLoading(true);
        setError(null);
        try {
            // Se nao tem senha, trata como magic link
            if (!password) {
                const { error } = await supabase.auth.signInWithOtp({
                    email,
                    options: {
                        emailRedirectTo: `${window.location.origin}/superlicense`,
                        data: username ? { username } : undefined
                    }
                });
                if (error) throw error;
            } else {
                const { data, error } = await supabase.auth.signUp({
                    email,
                    password,
                    options: {
                        data: username ? { username } : undefined
                    }
                });
                if (error) throw error;
                return data;
            }
        } catch (err) {
            const error = err as Error;
            setError(error.message);
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    const loginWithProvider = async (provider: 'google' | 'facebook' | 'twitter' | 'discord') => {
        setIsLoading(true);
        setError(null);
        try {
            const { error } = await supabase.auth.signInWithOAuth({
                provider,
                options: {
                    redirectTo: `${window.location.origin}/superlicense`,
                }
            });
            if (error) throw error;
        } catch (err) {
            const error = err as Error;
            setError(error.message);
            throw error;
        } finally {
            // Não damos setIsLoading(false) imediato porque vai redirecionar a página
        }
    };

    const logout = async () => {
        setIsLoading(true);
        try {
            const { error } = await supabase.auth.signOut();
            if (error) throw error;
        } catch (err) {
            console.error("Error signing out:", (err as Error).message);
        } finally {
            setIsLoading(false);
            setUser(null);
            setSession(null);
            router.push('/');
        }
    };

    const resetPassword = async (email: string) => {
        setIsLoading(true);
        setError(null);
        try {
            const { error } = await supabase.auth.resetPasswordForEmail(email, {
                redirectTo: `${window.location.origin}/superlicense?reset=true`
            });
            if (error) throw error;
            return true;
        } catch (err) {
            const error = err as Error;
            setError(error.message);
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    const updatePassword = async (newPassword: string) => {
        setIsLoading(true);
        setError(null);
        try {
            const { error } = await supabase.auth.updateUser({ password: newPassword });
            if (error) throw error;
            return true;
        } catch (err) {
            const error = err as Error;
            setError(error.message);
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    return {
        user,
        session,
        isLoading,
        error,
        login,
        signup,
        logout,
        resetPassword,
        updatePassword
    };
}
