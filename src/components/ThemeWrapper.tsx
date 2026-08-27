"use client";
import React, { useEffect, useState } from 'react';
import { useThemeStore, THEME_FONTS } from '@/store/useThemeStore';

export default function ThemeWrapper({ children }: { children: React.ReactNode }) {
    const theme = useThemeStore(state => state.theme);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    // Get the CSS variable names based on the theme
    const displayVar = {
        pitwall: 'var(--font-rajdhani)',
        cyber: 'var(--font-space-grotesk)',
        racing: 'var(--font-titillium)',
        wallstreet: 'var(--font-montserrat)'
    }[mounted ? theme : 'pitwall'];

    const bodyVar = {
        pitwall: 'var(--font-inter)',
        cyber: 'var(--font-jetbrains)',
        racing: 'var(--font-titillium)',
        wallstreet: 'var(--font-ibm)'
    }[mounted ? theme : 'pitwall'];

    return (
        <div 
            className="min-h-screen transition-all duration-300"
            style={{ 
                fontFamily: bodyVar,
                // We can set a local custom property for headers to use
                '--current-display-font': displayVar 
            } as React.CSSProperties}
        >
            <style>{`
                h1, h2, h3, h4, h5, h6, .font-display {
                    font-family: var(--current-display-font) !important;
                }
            `}</style>
            {children}
        </div>
    );
}
