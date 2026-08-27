import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { F1_MATCHUPS } from '@/api/f1-data';

interface PredictionState {
    // State
    poletime: number[];
    top10: string[];
    evo: string[];
    h2h: Record<string, string>;
    misc: Record<string, string>;
    
    // Actions
    setPoletime: (digits: number[] | ((prev: number[]) => number[])) => void;
    setTop10: (picks: string[] | ((prev: string[]) => string[])) => void;
    setEvo: (drivers: string[] | ((prev: string[]) => string[])) => void;
    setH2H: (picks: Record<string, string> | ((prev: Record<string, string>) => Record<string, string>)) => void;
    setMisc: (answers: Record<string, string> | ((prev: Record<string, string>) => Record<string, string>)) => void;
}

// Initial defaults
const initialH2H = F1_MATCHUPS.reduce((acc, m) => {
    acc[m.id] = m.defaultPick;
    return acc;
}, {} as Record<string, string>);

export const usePredictionStore = create<PredictionState>()(
    persist(
        (set) => ({
            poletime: [1, 2, 5, 0, 0, 0],
            top10: Array(10).fill(''),
            evo: [],
            h2h: initialH2H,
            misc: {},
            
            setPoletime: (updater) => set((state) => ({ 
                poletime: typeof updater === 'function' ? updater(state.poletime) : updater 
            })),
            setTop10: (updater) => set((state) => ({ 
                top10: typeof updater === 'function' ? updater(state.top10) : updater 
            })),
            setEvo: (updater) => set((state) => ({ 
                evo: typeof updater === 'function' ? updater(state.evo) : updater 
            })),
            setH2H: (updater) => set((state) => ({ 
                h2h: typeof updater === 'function' ? updater(state.h2h) : updater 
            })),
            setMisc: (updater) => set((state) => ({ 
                misc: typeof updater === 'function' ? updater(state.misc) : updater 
            })),
        }),
        {
            name: 'voltgrid-predictions-storage', // key in localStorage
        }
    )
);
