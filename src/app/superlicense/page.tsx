"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSupabaseAuth } from '@/hooks/useSupabaseAuth';
import { supabase } from '@/utils/supabase';
import Onboarding from '@/components/onboarding';

export default function SuperlicenseRouter() {
    const { user, loading: authLoading } = useSupabaseAuth();
    const router = useRouter();
    const [verifying, setVerifying] = useState(true);

    useEffect(() => {
        async function routeUser() {
            if (authLoading) return;
            
            if (!user) {
                // Not logged in -> stay here to show Onboarding
                setVerifying(false);
                return;
            }

            try {
                // User is logged in, find their slug
                const { data, error } = await supabase
                    .from('profiles')
                    .select('slug, setup_completed')
                    .eq('id', user.id)
                    .single();

                if (data?.slug && data.setup_completed) {
                    // Send to dynamic driver route
                    router.replace(`/${data.slug}`);
                } else if (!data?.setup_completed) {
                    // Stay here to show onboarding/setup
                    setVerifying(false);
                } else {
                    // No slug yet? Should not happen if setup is completed, but fallback
                    setVerifying(false);
                }
            } catch (err) {
                console.error("Error routing user:", err);
                setVerifying(false);
            }
        }
        
        routeUser();
    }, [user, authLoading, router]);

    if (authLoading || verifying) {
        return (
            <main className="w-full max-w-6xl mx-auto p-4 md:p-8 pt-12 flex flex-col items-center justify-center min-h-[70vh]">
                <div className="w-12 h-12 rounded-full border-4 border-[#fbaa19] border-t-transparent animate-spin mb-4"></div>
                <p className="text-[#fbaa19] font-bold uppercase tracking-widest text-xs">ROUTING...</p>
            </main>
        );
    }

    // If not logged in or setup incomplete, show the onboarding modal
    return (
        <main className="w-full max-w-6xl mx-auto p-4 md:p-8 pt-12 pb-24 flex flex-col items-center justify-start min-h-screen blur-sm pointer-events-none">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-black uppercase tracking-wider font-display mb-6">
                Superlicense
            </h1>
            
            <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[9999] flex items-center justify-center p-4 pointer-events-auto">
                <Onboarding onComplete={() => window.location.reload()} />
            </div>
        </main>
    );
}
