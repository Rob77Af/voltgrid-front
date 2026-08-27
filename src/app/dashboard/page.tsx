"use client";
import React from 'react';
import { useThemeStore, FontTheme, THEME_FONTS } from '@/store/useThemeStore';

const THEME_OPTIONS: { id: FontTheme; name: string; desc: string }[] = [
    { id: 'pitwall', name: 'Pitwall Telemetry', desc: 'Rajdhani & Inter. F1 telemetry meets Wall Street.' },
    { id: 'cyber', name: 'Cyber-Market', desc: 'Space Grotesk & JetBrains Mono. Modern crypto exchange vibe.' },
    { id: 'racing', name: 'Pure Racing', desc: 'Titillium Web. Aggressive, aerodynamic motorsport data.' },
    { id: 'wallstreet', name: 'Wall Street', desc: 'Montserrat & IBM Plex. Institutional, serious trading desk.' }
];

export default function DashboardPage() {
    const activeTheme = useThemeStore(state => state.theme);
    const setTheme = useThemeStore(state => state.setTheme);

    return (
        <main className="w-full max-w-6xl mx-auto p-4 md:p-8 pt-12 pb-24">
            <header className="mb-12 border-b border-[#ffffff3d] pb-6">
                <p className="text-[#fbaa19] text-sm font-medium uppercase tracking-[0.2em] mb-2 font-display">System Settings</p>
                <h1 className="text-white text-4xl md:text-5xl font-black uppercase tracking-wider font-display mb-4">UI Configurator</h1>
                <p className="text-gray-400 text-base md:text-lg max-w-2xl">
                    Customize your VoltGrid terminal. Select a typography engine that best suits your data analysis style—from high-speed F1 telemetry to institutional stock market dashboards.
                </p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {THEME_OPTIONS.map((themeOption) => {
                    const isSelected = activeTheme === themeOption.id;
                    const displayFont = `var(--font-${themeOption.id === 'pitwall' ? 'rajdhani' : themeOption.id === 'cyber' ? 'space-grotesk' : themeOption.id === 'racing' ? 'titillium' : 'montserrat'})`;
                    const bodyFont = `var(--font-${themeOption.id === 'pitwall' ? 'inter' : themeOption.id === 'cyber' ? 'jetbrains' : themeOption.id === 'racing' ? 'titillium' : 'ibm'})`;

                    return (
                        <div 
                            key={themeOption.id}
                            onClick={() => setTheme(themeOption.id)}
                            className={`relative cursor-pointer flex flex-col bg-[#0a0a0a] border-2 transition-all duration-300 group overflow-hidden ${
                                isSelected ? 'border-[#fbaa19] shadow-[0_0_20px_rgba(251,170,25,0.2)]' : 'border-[#ffffff1a] hover:border-gray-500'
                            }`}
                        >
                            {/* Selection indicator */}
                            <div className={`absolute top-4 right-4 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                                isSelected ? 'border-[#fbaa19] bg-[#fbaa19]' : 'border-gray-600'
                            }`}>
                                {isSelected && <div className="w-2.5 h-2.5 bg-black rounded-full" />}
                            </div>

                            {/* Theme Details Info */}
                            <div className="p-6 border-b border-[#ffffff1a] bg-[#111]">
                                <h2 
                                    className="text-2xl font-bold text-white uppercase tracking-wider mb-2"
                                    style={{ fontFamily: displayFont }}
                                >
                                    {themeOption.name}
                                </h2>
                                <p 
                                    className="text-gray-400 text-sm"
                                    style={{ fontFamily: bodyFont }}
                                >
                                    {themeOption.desc}
                                </p>
                            </div>

                            {/* Live Preview Window */}
                            <div className="p-6 bg-black relative" style={{ fontFamily: bodyFont }}>
                                {/* Fake Data Viz */}
                                <div className="flex justify-between items-end mb-6">
                                    <div>
                                        <p className="text-gray-500 text-xs uppercase tracking-widest mb-1" style={{ fontFamily: displayFont }}>Current Pick</p>
                                        <div className="flex items-baseline gap-2">
                                            <span className="text-3xl font-black text-white" style={{ fontFamily: displayFont }}>M.VERSTAPPEN</span>
                                            <span className="text-[#fbaa19] text-xl font-bold" style={{ fontFamily: displayFont }}>#01</span>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-[#00ff88] text-lg font-bold">+2.45%</p>
                                        <p className="text-gray-500 text-xs">VOL 1.2M</p>
                                    </div>
                                </div>

                                {/* Fake Table */}
                                <div className="w-full border border-[#ffffff1a] rounded-sm overflow-hidden text-sm">
                                    <div className="grid grid-cols-4 bg-[#111] text-gray-400 uppercase text-xs tracking-wider p-2 border-b border-[#ffffff1a]" style={{ fontFamily: displayFont }}>
                                        <div className="col-span-2">Asset</div>
                                        <div className="text-right">Price</div>
                                        <div className="text-right">24H</div>
                                    </div>
                                    <div className="grid grid-cols-4 text-white p-2 border-b border-[#ffffff1a] items-center">
                                        <div className="col-span-2 font-medium">L.NORRIS</div>
                                        <div className="text-right font-mono">145.20</div>
                                        <div className="text-right text-[#00ff88] font-mono">+1.2%</div>
                                    </div>
                                    <div className="grid grid-cols-4 text-white p-2 items-center bg-[#111]/30">
                                        <div className="col-span-2 font-medium">C.LECLERC</div>
                                        <div className="text-right font-mono">132.85</div>
                                        <div className="text-right text-[#ff3333] font-mono">-0.8%</div>
                                    </div>
                                </div>
                                
                                {/* Overlay glow on select */}
                                {isSelected && (
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#fbaa19]/10 to-transparent pointer-events-none" />
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </main>
    );
}
