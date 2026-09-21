"use client";
import React from 'react';

interface Props {
    isOnDarkBackground?: boolean;
}

const Logo = (props: Props) => {
    return (
        <div className="flex shrink-0 items-center justify-center">
            {/* Outer border (Yellow) with a small gap (padding) */}
            <div className="w-9 h-9 md:w-10 md:h-10 rounded-full border-[2px] md:border-[3px] border-[#fbaa19] p-[1.5px] bg-transparent">
                {/* Inner border (Black) and 50% Solid Gradient Background */}
                <div 
                    className="w-full h-full rounded-full border-[2px] md:border-[3px] border-black flex flex-col overflow-hidden"
                    style={{ background: 'linear-gradient(to bottom, #fbaa19 50%, #000000 50%)' }}
                >
                </div>
            </div>
        </div>
    )
}

export default Logo;
