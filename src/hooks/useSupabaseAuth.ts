"use client";

import { useEffect, useState } from "react";
import { User, Session } from "@supabase/supabase-js";
import { supabase } from "@/utils/supabase";

export function useSupabaseAuth() {
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
            } catch (err: any) {
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
        } catch (err: any) {
            setError(err.message);
            throw err;
        } finally {
            setIsLoading(false);
        }
    };

    const signup = async (email: string, password: string, username?: string) => {
        setIsLoading(true);
        setError(null);
        try {
            const { data, error } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    data: {
                        username: username,
                    }
                }
            });
            if (error) throw error;
            return data;
        } catch (err: any) {
            setError(err.message);
            throw err;
        } finally {
            setIsLoading(false);
        }
    };

    const logout = async () => {
        setIsLoading(true);
        try {
            const { error } = await supabase.auth.signOut();
            if (error) throw error;
        } catch (err: any) {
            console.error("Error signing out:", err.message);
        } finally {
            setIsLoading(false);
        }
    };

    const resetPassword = async (email: string) => {
        setIsLoading(true);
        setError(null);
        try {
            const { error } = await supabase.auth.resetPasswordForEmail(email, {
                redirectTo: typeof window !== "undefined" ? `${window.location.origin}/superlicense?reset=true` : undefined
            });
            if (error) throw error;
            return true;
        } catch (err: any) {
            setError(err.message);
            throw err;
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
        } catch (err: any) {
            setError(err.message);
            throw err;
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
