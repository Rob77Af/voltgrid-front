import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type FontTheme = 'pitwall' | 'cyber' | 'racing' | 'wallstreet';

export const THEME_FONTS: Record<FontTheme, { display: string, body: string }> = {
    pitwall: { display: 'font-rajdhani', body: 'font-inter' },
    cyber: { display: 'font-space-grotesk', body: 'font-jetbrains' },
    racing: { display: 'font-titillium', body: 'font-titillium' },
    wallstreet: { display: 'font-montserrat', body: 'font-ibm' },
};

interface ThemeState {
    theme: FontTheme;
    setTheme: (theme: FontTheme) => void;
}

export const useThemeStore = create<ThemeState>()(
    persist(
        (set) => ({
            theme: 'pitwall', // default
            setTheme: (theme) => set({ theme }),
        }),
        {
            name: 'voltgrid-theme-storage',
        }
    )
);
