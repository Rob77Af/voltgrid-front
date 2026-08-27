"use client";
import React from 'react';
import { usePredictionStore } from '@/store/usePredictionStore';

const Poletime = ({ hideSubmit }: { hideSubmit?: boolean }) => {
    const digits = usePredictionStore(state => state.poletime);
    const setDigits = usePredictionStore(state => state.setPoletime);

    // Max values for each position:
    // [0] Minutes: 0 to 3
    // [1] Seconds (tens): 0 to 5
    // [2] Seconds (ones): 0 to 9
    // [3] Ms (hundreds): 0 to 9
    // [4] Ms (tens): 0 to 9
    // [5] Ms (ones): 0 to 9
    const maxValues = [3, 5, 9, 9, 9, 9];

    const incrementDigit = (index: number) => {
        setDigits(prev => {
            const newDigits = [...prev];
            newDigits[index] = newDigits[index] + 1 > maxValues[index] ? 0 : newDigits[index] + 1;
            return newDigits;
        });
    };

    const DigitButton = ({ value, onClick }: { value: number, onClick: () => void }) => (
        <button
            type="button"
            onClick={onClick}
            className="w-14 h-20 md:w-20 md:h-28 bg-[#1a1a1a] border border-[#ffffff3d] flex items-center justify-center text-4xl md:text-6xl font-['Saira'] font-bold text-white hover:border-[#fbaa19] hover:text-[#fbaa19] transition-colors select-none focus:outline-none focus:border-[#fbaa19]"
        >
            {value}
        </button>
    );

    return (
        <div className="w-full flex flex-col gap-8 mt-8">
            <header className="f1-predictions-header border border-[#ffffff3d] p-6 bg-[#1a1a1a] border-b-2 border-b-[#fbaa19] shadow-md">
                <p className="text-[#fbaa19] text-xs font-medium uppercase tracking-[0.14em] mb-2">F1 PREDICTION MARKET</p>
                <h2 className="text-white text-2xl md:text-3xl font-['Saira'] font-bold uppercase tracking-wider mb-2">POLETIME</h2>
                <p className="text-gray-400 text-sm md:text-base">
                    Predict the exact pole position lap time. Click each digit to increment its value.
                </p>
            </header>

            <div className="flex flex-col items-center justify-center py-12 bg-black border border-[#ffffff3d]">
                <div className="flex items-center justify-center gap-1 md:gap-3">
                    {/* Minutes */}
                    <DigitButton value={digits[0]} onClick={() => incrementDigit(0)} />
                    
                    <span className="text-white text-4xl md:text-6xl font-['Saira'] font-bold pb-2 mx-1 md:mx-2">:</span>
                    
                    {/* Seconds */}
                    <div className="flex items-center gap-1 md:gap-2">
                        <DigitButton value={digits[1]} onClick={() => incrementDigit(1)} />
                        <DigitButton value={digits[2]} onClick={() => incrementDigit(2)} />
                    </div>

                    <span className="text-[#fbaa19] text-4xl md:text-6xl font-['Saira'] font-bold pb-2 mx-1 md:mx-2">.</span>
                    
                    {/* Milliseconds */}
                    <div className="flex items-center gap-1 md:gap-2">
                        <DigitButton value={digits[3]} onClick={() => incrementDigit(3)} />
                        <DigitButton value={digits[4]} onClick={() => incrementDigit(4)} />
                        <DigitButton value={digits[5]} onClick={() => incrementDigit(5)} />
                    </div>
                </div>
            </div>

            {!hideSubmit && (
                <footer className="f1-predictions-summary flex items-center justify-between p-4 bg-[#1a1a1a] border border-[#ffffff3d]">
                    <p className="f1-summary-copy text-sm md:text-base text-gray-400 font-medium tracking-wide">
                        Your pick: <span className="text-white font-bold">{digits[0]}:{digits[1]}{digits[2]}.{digits[3]}{digits[4]}{digits[5]}</span>
                    </p>
                    <button type="button" className="f1-submit-picks bg-[#fbaa19] text-black border-2 border-[#fbaa19] px-6 py-3 font-bold uppercase tracking-widest text-xs md:text-sm transition-colors hover:bg-black hover:text-[#fbaa19]">
                        SUBMIT PREDICTION
                    </button>
                </footer>
            )}
        </div>
    );
};

export default Poletime;
