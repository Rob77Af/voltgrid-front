"use client";
import React from 'react';
import { F1_DRIVERS } from '@/api/f1-data';
import { usePredictionStore } from '@/store/usePredictionStore';

const Evo = ({ hideSubmit }: { hideSubmit?: boolean }) => {
    const selectedDrivers = usePredictionStore(state => state.evo);
    const setSelectedDrivers = usePredictionStore(state => state.setEvo);

    const toggleDriver = (driver: string) => {
        if (selectedDrivers.includes(driver)) {
            // Remove if already selected
            setSelectedDrivers(prev => prev.filter(d => d !== driver));
        } else {
            // Add if less than 5 selected
            if (selectedDrivers.length < 5) {
                setSelectedDrivers(prev => [...prev, driver]);
            }
        }
    };

    return (
        <div className="w-full flex flex-col gap-8 mt-8">
            <header className="f1-predictions-header border border-[#ffffff3d] p-6 bg-[#1a1a1a] border-b-2 border-b-[#fbaa19] shadow-md">
                <p className="text-[#fbaa19] text-xs font-medium uppercase tracking-[0.14em] mb-2">F1 PREDICTION MARKET</p>
                <h2 className="text-white text-2xl md:text-3xl font-['Saira'] font-bold uppercase tracking-wider mb-2">EVO (BIGGEST MOVERS)</h2>
                <p className="text-gray-400 text-sm md:text-base">
                    Select the 5 drivers you predict will gain the most positions between their starting grid and the finish line.
                </p>
            </header>

            <div className="flex flex-col gap-6">
                {/* Selected Slots */}
                <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
                    {Array.from({ length: 5 }).map((_, i) => {
                        const driver = selectedDrivers[i];
                        return (
                            <div 
                                key={i} 
                                className={`h-16 flex items-center justify-center p-3 text-center border-2 transition-colors ${
                                    driver 
                                    ? 'bg-[#fbaa19] border-[#fbaa19] text-black font-bold uppercase tracking-wider' 
                                    : 'bg-black border-dashed border-[#ffffff3d] text-gray-600'
                                }`}
                            >
                                {driver || `SLOT ${i + 1}`}
                            </div>
                        );
                    })}
                </div>

                <div className="flex items-center justify-between border-b border-[#ffffff3d] pb-2 mt-4">
                    <h3 className="text-white uppercase tracking-widest font-bold">Select Drivers</h3>
                    <p className="text-[#fbaa19] font-bold">{selectedDrivers.length} / 5</p>
                </div>

                {/* Driver Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3">
                    {F1_DRIVERS.map(driver => {
                        const isSelected = selectedDrivers.includes(driver);
                        const isMaxedOut = selectedDrivers.length >= 5 && !isSelected;
                        
                        return (
                            <button
                                key={driver}
                                type="button"
                                onClick={() => toggleDriver(driver)}
                                disabled={isMaxedOut}
                                className={`flex items-center p-3 border transition-all text-sm uppercase font-semibold ${
                                    isSelected
                                    ? 'bg-[#fbaa19] border-[#fbaa19] text-black'
                                    : 'bg-[#1a1a1a] border-[#ffffff3d] text-white hover:border-[#fbaa19] disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:border-[#ffffff3d]'
                                }`}
                            >
                                <span className="truncate w-full text-left">{driver}</span>
                                {isSelected && (
                                    <svg className="w-4 h-4 ml-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                    </svg>
                                )}
                            </button>
                        );
                    })}
                </div>
            </div>

            {!hideSubmit && (
                <footer className="f1-predictions-summary flex items-center justify-between p-4 mt-4 bg-[#1a1a1a] border border-[#ffffff3d]">
                    <p className="f1-summary-copy text-sm md:text-base text-gray-400 font-medium tracking-wide">
                        {selectedDrivers.length === 5 
                            ? <span className="text-[#fbaa19]">All 5 drivers selected!</span> 
                            : `Pick ${5 - selectedDrivers.length} more driver${5 - selectedDrivers.length > 1 ? 's' : ''}`
                        }
                    </p>
                    <button 
                        type="button" 
                        disabled={selectedDrivers.length !== 5}
                        className="f1-submit-picks bg-[#fbaa19] text-black border-2 border-[#fbaa19] px-6 py-3 font-bold uppercase tracking-widest text-xs md:text-sm transition-colors hover:bg-black hover:text-[#fbaa19] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-[#fbaa19] disabled:hover:text-black"
                    >
                        SUBMIT PREDICTION
                    </button>
                </footer>
            )}
        </div>
    );
};

export default Evo;
