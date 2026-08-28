"use client";
import React from 'react';

interface Props {
    isOnDarkBackground?: boolean;
}

const Logo = (props: Props) => {
    return (
        <div className="flex shrink-0 items-center justify-center">
            {/* Outer border (Yellow) with a small gap (padding) */}
            <div className="w-12 h-12 md:w-14 md:h-14 rounded-full border-[2px] md:border-[3px] border-[#fbaa19] p-[1.5px] bg-transparent">
                {/* Inner border (Black) and 50% Solid Gradient Background */}
                <div 
                    className="w-full h-full rounded-full border-[2px] md:border-[3px] border-black flex flex-col overflow-hidden"
                    style={{ background: 'linear-gradient(to bottom, #fbaa19 50%, #000000 50%)' }}
                >
                    {/* Top half - F1 */}
                    <div className="h-1/2 w-full flex items-end justify-center pb-0.5">
                        <span className="text-black font-black text-sm md:text-base leading-none font-display uppercase tracking-tighter">F1</span>
                    </div>
                    {/* Bottom half - Master */}
                    <div className="h-1/2 w-full flex items-start justify-center pt-1">
                        <span className="text-white font-bold text-[5px] md:text-[6px] uppercase tracking-[0.2em] leading-none font-display">MASTER</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Logo;
