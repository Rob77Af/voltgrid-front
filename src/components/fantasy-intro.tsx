"use client";
import React from 'react';
import Link from 'next/link';

export default function FantasyIntro() {
    return (
        <div className="w-full relative overflow-hidden mb-8 border border-[#fbaa19]/30 bg-black text-white p-8 md:p-12 lg:p-16 flex flex-col md:flex-row items-center gap-8 md:gap-12">
            {/* Background Texture & Gradient */}
            <div 
                className="absolute inset-0 z-0 opacity-60 mix-blend-screen" 
                style={{ 
                    backgroundImage: 'url("/fantasy_hero_banner.jpg")', 
                    backgroundSize: 'cover', 
                    backgroundPosition: 'center' 
                }}
            ></div>
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent z-0"></div>
            <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-black/80 to-transparent z-0"></div>

            {/* Content */}
            <div className="relative z-10 flex-1 flex flex-col items-start text-left">
                <span className="text-[#fbaa19] font-bold text-xs uppercase tracking-[0.3em] mb-4">Bem-vindo ao Grid</span>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-widest font-display mb-6 leading-tight">
                    Prove que você é o melhor <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#fbaa19] to-yellow-600">Estrategista</span>
                </h2>
                <p className="text-gray-400 text-sm md:text-base leading-relaxed max-w-xl mb-8 border-l-2 border-[#fbaa19]/50 pl-4">
                    Participe de múltiplas competições globais, gerencie sua equipe, faça previsões precisas e concorra pelo título supremo de Campeão Milesimus. O paddock está esperando suas ordens.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                    <Link href="/superlicense" className="bg-[#fbaa19] text-black border border-[#fbaa19] px-8 py-4 font-black uppercase tracking-widest text-sm hover:bg-white hover:border-white transition-all text-center flex-1 sm:flex-none whitespace-nowrap">
                        Emitir Superlicença
                    </Link>
                    <a href="#competitions" className="bg-transparent text-white border-2 border-white/20 px-8 py-4 font-bold uppercase tracking-widest text-sm hover:border-[#fbaa19] hover:text-[#fbaa19] transition-all text-center flex-1 sm:flex-none whitespace-nowrap">
                        Explorar Modalidades
                    </a>
                </div>
            </div>

            {/* Visual Element Right Side */}
            <div className="relative z-10 hidden md:flex w-1/3 flex-col items-end justify-center opacity-80">
                <div className="text-right border-r-4 border-[#fbaa19] pr-6">
                    <p className="text-3xl font-black uppercase tracking-widest mb-1">4</p>
                    <p className="text-[10px] text-gray-500 font-bold uppercase tracking-[0.2em]">Ligas Globais</p>
                </div>
                <div className="text-right border-r-4 border-white/20 pr-6 mt-6">
                    <p className="text-3xl font-black uppercase tracking-widest mb-1">∞ </p>
                    <p className="text-[10px] text-gray-500 font-bold uppercase tracking-[0.2em]">Possibilidades</p>
                </div>
            </div>
        </div>
    );
}
