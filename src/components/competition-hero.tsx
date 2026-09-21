"use client";
import React from 'react';

interface CompetitionHeroProps {
    activeId: string;
}

export default function CompetitionHero({ activeId }: CompetitionHeroProps) {
    const getHeroData = (id: string) => {
        switch (id) {
            case 'poletime-competition': 
                return {
                    title: 'POLETIME COMPETITION',
                    subtitle: 'PREDICT THE FASTEST',
                    description: 'Prove your qualifying expertise. Guess the exact times, pole sitters, and fastest laps before the red lights go out.',
                    image: 'https://images.unsplash.com/photo-1502744688674-c619d1586c9e?q=80&w=2070&auto=format&fit=crop'
                };
            case 'master-competition': 
                return {
                    title: 'MASTER COMPETITION',
                    subtitle: 'MANAGE YOUR GARAGE',
                    description: 'The ultimate fantasy experience. Build your dream team, manage your budget, and outsmart your rivals throughout the season.',
                    image: 'https://images.unsplash.com/photo-1536616035905-24c8b211a7f0?q=80&w=2070&auto=format&fit=crop'
                };
            case 'milesimus': 
                return {
                    title: 'MILESIMUS',
                    subtitle: 'THE ABSOLUTE CROWN',
                    description: 'No forms, no drafts. Just pure accumulation. The Milesimus sums all your points across every competition to crown the ultimate champion.',
                    image: 'https://images.unsplash.com/photo-1540066019607-e5f6f48718f7?q=80&w=2074&auto=format&fit=crop'
                };
            case 'teamwork': 
                return {
                    title: 'TEAMWORK',
                    subtitle: 'RACING GUILDS',
                    description: 'Join forces with other managers. Combine your scores, coordinate strategies, and fight for the Constructors Championship.',
                    image: 'https://images.unsplash.com/photo-1505322022379-7c3353ee6291?q=80&w=2000&auto=format&fit=crop'
                };
            default: 
                return {
                    title: 'COMPETITIONS',
                    subtitle: 'CHOOSE YOUR PATH',
                    description: 'Select a competition below to view your standing and global performance.',
                    image: 'https://images.unsplash.com/photo-1541348263662-e06836264be8?q=80&w=2069&auto=format&fit=crop'
                };
        }
    };

    const data = getHeroData(activeId);

    return (
        <header id="competitions" className="relative w-full h-full overflow-hidden border-b-4 border-[#fbaa19] flex flex-col">
            {/* Background Image Container with height */}
            <div className="absolute inset-0 w-full h-full bg-black">
                <div 
                    className="absolute inset-0 opacity-40 mix-blend-luminosity grayscale"
                    style={{ 
                        backgroundImage: `url("${data.image}")`, 
                        backgroundSize: 'cover', 
                        backgroundPosition: 'center',
                        transition: 'background-image 0.5s ease-in-out'
                    }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-black/60 to-transparent"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a]/80 to-transparent"></div>
            </div>

            {/* Content Container */}
            <div className="relative z-10 w-full p-6 md:p-10 pt-16 md:pt-20 flex flex-col gap-2 min-h-[300px] flex-grow justify-end">
                <div className="flex items-center gap-4 mb-2">
                    <div className="w-8 h-1 bg-[#fbaa19]"></div>
                    <p className="text-[#fbaa19] text-xs font-bold uppercase tracking-[0.3em] font-display">
                        {data.subtitle}
                    </p>
                </div>
                <h1 className="text-white text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-widest font-display mb-2 drop-shadow-lg">
                    {data.title}
                </h1>
                <p className="text-gray-300 text-sm md:text-base max-w-2xl font-medium tracking-wide">
                    {data.description}
                </p>
            </div>
        </header>
    );
}
