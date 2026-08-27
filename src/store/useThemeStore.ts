import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type FontTheme = 'pitwall' | 'cyber' | 'racing' | 'wallstreet';

export const THEME_FONTS: Record<FontTheme, { display: string, body: string }> = {
    pitwall: { display: 'font-rajdhani', body: 'font-inter' },
    cyber: { display: 'font-space-grotesk', body: 'font-jetbrains' },
    racing: { display: 'font-titillium', body: 'font-titillium' },
    wallstreet: { display: 'font-montserrat', body: 'font-ibm' },
};

export type ThemeMode = 'light' | 'dark';

interface ThemeState {
    theme: FontTheme;
    mode: ThemeMode;
    setTheme: (theme: FontTheme) => void;
    toggleMode: () => void;
}

export const useThemeStore = create<ThemeState>()(
    persist(
        (set) => ({
            theme: 'pitwall', // default font theme
            mode: 'dark', // default visual mode
            setTheme: (theme) => set({ theme }),
            toggleMode: () => set((state) => ({ mode: state.mode === 'dark' ? 'light' : 'dark' })),
        }),
        {
            name: 'voltgrid-theme-storage',
        }
    )
);
