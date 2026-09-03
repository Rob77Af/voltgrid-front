"use client";
import React, { useState } from 'react';
import { F1_DRIVERS, getDriverDetails } from '@/api/f1-data';
import { usePredictionStore } from '@/store/usePredictionStore';

const Evo = ({ hideSubmit, hideHeader }: { hideSubmit?: boolean, hideHeader?: boolean }) => {
    const picks = usePredictionStore(state => state.evo);
    const setPicks = usePredictionStore(state => state.setEvo);
    const [openDropdownIndex, setOpenDropdownIndex] = useState<number | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const handleSubmit = () => {
        setIsSubmitting(true);
        setTimeout(() => {
            setIsSubmitting(false);
            setIsSuccess(true);
            console.log("Mock DB - Evo Submetido:", picks);
            setTimeout(() => setIsSuccess(false), 5000);
        }, 1200);
    };

    const handleSelect = (index: number, driver: string) => {
        const newPicks = [...picks];
        newPicks[index] = driver;
        setPicks(newPicks);
    };

    return (
        <div className="w-full flex flex-col gap-4 mt-8">
            {!hideHeader && (
                <header className="f1-predictions-header border border-black/20 dark:border-[#ffffff3d] p-6 bg-white dark:bg-[#1a1a1a] border-b-2 border-b-[#fbaa19] shadow-md mb-2">
                    <p className="text-[#fbaa19] text-xs font-medium uppercase tracking-[0.14em] mb-2">F1 PREDICTION MARKET</p>
                    <h2 className="text-black dark:text-white text-2xl md:text-3xl font-display font-bold uppercase tracking-wider mb-2">EVO</h2>
                    <p className="text-gray-600 dark:text-gray-400 text-sm md:text-base">
                        Select the 5 drivers you predict will gain the most positions.
                    </p>
                </header>
            )}

            {/* Invisible overlay to close dropdown when clicking outside */}
            {openDropdownIndex !== null && (
                <div 
                    className="fixed inset-0 z-40" 
                    onClick={() => setOpenDropdownIndex(null)}
                />
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 relative">
                {picks.map((pick, index) => {
                    const isOpen = openDropdownIndex === index;
                    const pickDetails = pick ? getDriverDetails(pick) : null;
                    
                    return (
                        <div 
                            key={index} 
                            className={`flex items-stretch border transition-colors duration-200 relative ${
                                pick ? 'bg-[#fbaa19] border-[#fbaa19]' : 'bg-white dark:bg-black ' + (isOpen ? 'border-[#fbaa19]' : 'border-black/20 dark:border-[#ffffff3d]')
                            } ${isOpen ? 'z-50' : 'z-10 hover:border-[#fbaa19]'}`}
                            style={{ minHeight: '3.5rem' }}
                        >
                            <div className={`w-20 flex items-center justify-center font-bold uppercase text-xs border-r ${pick ? 'bg-[#e59914] text-black border-[#e59914]' : 'bg-[#fbaa19] text-black border-[#fbaa19]'}`}>
                                EVO {index + 1}
                            </div>
                            
                            {/* Custom Select Box */}
                            <div className="flex-1 relative flex items-center h-full">
                                <div 
                                    className="w-full h-full flex items-center justify-between px-4 py-2 cursor-pointer"
                                    onClick={() => setOpenDropdownIndex(isOpen ? null : index)}
                                >
                                    {pickDetails ? (
                                        <div className="flex flex-col leading-tight">
                                            <span className={`uppercase font-bold tracking-wider ${pick ? 'text-black' : 'text-black dark:text-white'}`}>
                                                {pickDetails.name} <span className={pick ? 'text-black/70' : 'text-[#fbaa19]'}># {pickDetails.num}</span>
                                            </span>
                                            <span className={`text-xs font-medium uppercase tracking-wider mt-0.5 ${pick ? 'text-black/70' : 'text-gray-600 dark:text-gray-400'}`}>{pickDetails.team}</span>
                                        </div>
                                    ) : (
                                        <span className="uppercase font-bold tracking-wider text-gray-500">
                                            Select Driver
                                        </span>
                                    )}
                                    
                                    <div className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''} ${pick ? 'text-black' : 'text-[#fbaa19]'}`}>
                                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" width="20" height="20">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </div>
                                </div>

                                {/* Custom Dropdown Menu */}
                                {isOpen && (
                                    <div className="absolute top-[calc(100%+4px)] left-0 w-full bg-gray-50 dark:bg-[#0a0a0a] border border-[#fbaa19] max-h-[400px] md:max-h-[500px] overflow-y-auto shadow-2xl shadow-black/50 z-[100]">
                                        <div className="flex flex-col py-2">
                                            {F1_DRIVERS.map(driver => {
                                                const isPickedHere = pick === driver;
                                                const isPickedElsewhere = picks.includes(driver) && !isPickedHere;
                                                const driverDetails = getDriverDetails(driver);
                                                
                                                return (
                                                    <div 
                                                        key={driver}
                                                        onClick={() => {
                                                            if (!isPickedElsewhere) {
                                                                handleSelect(index, driver);
                                                                setOpenDropdownIndex(null);
                                                            }
                                                        }}
                                                        className={`px-4 py-3 uppercase font-bold tracking-wider flex items-center justify-between transition-colors ${
                                                            isPickedHere 
                                                                ? 'bg-[#fbaa19] text-black' 
                                                                : isPickedElsewhere 
                                                                    ? 'text-[#333] cursor-not-allowed line-through decoration-[#fbaa19]/30' 
                                                                    : 'text-black dark:text-white hover:bg-gray-200 dark:hover:bg-[#1a1a1a] hover:text-[#fbaa19] cursor-pointer'
                                                        }`}
                                                    >
                                                        <div className="flex flex-col leading-tight">
                                                            <span>{driverDetails.name} <span className={isPickedHere ? "text-black/70" : "text-[#fbaa19]"}># {driverDetails.num}</span></span>
                                                            <span className={`text-[10px] sm:text-xs mt-0.5 ${isPickedHere ? "text-black/70" : "text-gray-500"}`}>{driverDetails.team}</span>
                                                        </div>
                                                        {isPickedElsewhere && (
                                                            <span className="text-[10px] tracking-widest text-[#555] font-black">SELECTED</span>
                                                        )}
                                                        {isPickedHere && (
                                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                                                            </svg>
                                                        )}
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
            
            {!hideSubmit && (
                <footer className="f1-predictions-summary flex items-center justify-between p-4 bg-white dark:bg-[#1a1a1a] border border-black/20 dark:border-[#ffffff3d]">
                    <p className="f1-summary-copy text-sm md:text-base text-gray-600 dark:text-gray-400 font-medium tracking-wide">
                        {picks.filter(p => p !== '').length === 5 
                            ? <span className="text-[#fbaa19]">Portfolio complete!</span> 
                            : `Select ${5 - picks.filter(p => p !== '').length} more drivers`}
                    </p>
                    <button 
                        type="button" 
                        onClick={handleSubmit}
                        disabled={picks.some(p => p === '') || isSubmitting || isSuccess}
                        className="f1-submit-picks bg-[#fbaa19] text-black border-2 border-[#fbaa19] px-6 py-3 font-bold uppercase tracking-widest text-xs md:text-sm transition-colors hover:bg-gray-200 dark:hover:bg-black hover:text-[#fbaa19] disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isSubmitting ? 'SUBMITTING...' : isSuccess ? '✔ SAVED' : 'SUBMIT PREDICTION'}
                    </button>
                </footer>
            )}
        </div>
    );
};

export default Evo;
