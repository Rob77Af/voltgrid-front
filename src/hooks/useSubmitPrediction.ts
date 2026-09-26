import { useState } from 'react';
import { supabase } from '@/utils/supabase';
import { useSupabaseAuth } from './useSupabaseAuth';
import { usePredictionStore } from '@/store/usePredictionStore';
import { useRouter } from 'next/navigation';

export function useSubmitPrediction() {
    const { user } = useSupabaseAuth();
    const store = usePredictionStore();
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const submit = async (redirectToTelemetry: boolean = false) => {
        if (!user) {
            alert('Você precisa estar logado (Superlicense) para enviar suas previsões.');
            return;
        }

        setIsSubmitting(true);
        
        const formattedPoletime = `${store.poletime[0]}:${store.poletime[1]}${store.poletime[2]}.${store.poletime[3]}${store.poletime[4]}${store.poletime[5]}`;

        const payload = {
            user_id: user.id,
            round: 'current',
            poletime: formattedPoletime,
            top10: store.top10,
            evo: store.evo,
            h2h: store.h2h,
            misc: store.misc,
            created_at: new Date().toISOString()
        };

        try {
            const { error } = await supabase
                .from('predictions')
                .upsert(payload, { onConflict: 'user_id, round' });
            
            if (error) throw error;
            
            setIsSuccess(true);
            setTimeout(() => {
                setIsSuccess(false);
                if (redirectToTelemetry) {
                    router.push('/telemetry');
                }
            }, 1000);
        } catch (e: any) {
            console.error("Supabase Error:", e);
            alert("Erro ao salvar apostas: " + e.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    return { submit, isSubmitting, isSuccess };
}
