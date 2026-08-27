"use client";
import React, { useState } from 'react';

const drivers = [
    'Lando Norris', 'Oscar Piastri', 'Charles Leclerc', 'Lewis Hamilton',
    'George Russell', 'Kimi Antonelli', 'Max Verstappen', 'Isack Hadjar',
    'Fernando Alonso', 'Lance Stroll', 'Franco Colapinto', 'Pierre Gasly',
    'Esteban Ocon', 'Oliver Bearman', 'Liam Lawson', 'Arvid Lindblad',
    'Sergio Pérez', 'Valtteri Bottas', 'Alex Albon', 'Carlos Sainz',
    'Nico Hülkenberg', 'Gabriel Bortoleto'
].sort();

const Top10Finish = () => {
    const [picks, setPicks] = useState<string[]>(Array(10).fill(''));

    const handleSelect = (index: number, driver: string) => {
        const newPicks = [...picks];
        newPicks[index] = driver;
        setPicks(newPicks);
    };

    // Helper to get ordinal suffix
    const getOrdinal = (n: number) => {
        const s = ["th", "st", "nd", "rd"];
        const v = n % 100;
        return n + (s[(v - 20) % 10] || s[v] || s[0]);
    };

    return (
        <div className="w-full flex flex-col gap-4 mt-8">
            <div className="flex flex-col gap-2 mb-4">
                <h2 className="text-[#fbaa19] text-xl font-bold uppercase tracking-widest font-['Saira']">Top 10 Finish</h2>
                <p className="text-gray-400 text-sm">Predict the top 10 finishers in exact order.</p>
            </div>

            <div className="flex flex-col gap-3">
                {picks.map((pick, index) => {
                    const position = index + 1;
                    return (
                        <div 
                            key={index} 
                            className={`flex items-stretch bg-black border ${pick ? 'border-[#fbaa19]' : 'border-[#ffffff3d]'} transition-colors duration-200 hover:border-[#fbaa19]`}
                            style={{ minHeight: '3.5rem' }}
                        >
                            <div className="w-16 flex items-center justify-center bg-[#fbaa19] text-black font-bold uppercase border-r border-[#fbaa19]">
                                {getOrdinal(position)}
                            </div>
                            <div className="flex-1 flex items-center px-4 relative">
                                <select 
                                    className="w-full bg-transparent text-white uppercase font-bold outline-none cursor-pointer appearance-none"
                                    value={pick}
                                    onChange={(e) => handleSelect(index, e.target.value)}
                                >
                                    <option value="" disabled className="text-gray-500 bg-black">Select Driver</option>
                                    {drivers.map(driver => (
                                        <option 
                                            key={driver} 
                                            value={driver} 
                                            className="bg-black text-white"
                                            disabled={picks.includes(driver) && picks[index] !== driver}
                                        >
                                            {driver}
                                        </option>
                                    ))}
                                </select>
                                {/* Custom arrow for select */}
                                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[#fbaa19]">
                                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" width="20" height="20">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
            
            <div className="mt-4 flex justify-end">
                <button 
                    disabled={picks.some(p => p === '')}
                    className="bg-[#fbaa19] text-black font-bold uppercase tracking-widest px-8 py-3 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-yellow-500 transition-colors"
                >
                    Submit Prediction
                </button>
            </div>
        </div>
    );
};

export default Top10Finish;
