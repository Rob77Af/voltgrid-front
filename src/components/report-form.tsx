"use client";
import React, { useState } from 'react';

type ReportType = 'results' | 'driver_changes' | 'others' | null;
type SessionType = 'FP1' | 'FP2' | 'FP3' | 'Qualifying' | 'Sprint Qualifying' | 'Sprint Race' | 'Race' | null;

const ReportForm = () => {
    const [step, setStep] = useState<number>(1);
    const [reportType, setReportType] = useState<ReportType>(null);
    const [sessionType, setSessionType] = useState<SessionType>(null);
    const [details, setDetails] = useState('');

    const handleSelectType = (type: ReportType) => {
        setReportType(type);
        if (type === 'results') {
            setStep(2); // Go to session selection
        } else {
            setStep(3); // Skip straight to details
        }
    };

    const handleSelectSession = (session: SessionType) => {
        setSessionType(session);
        setStep(3);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // In a real app, send data to the backend here
        setStep(4);
    };

    const resetForm = () => {
        setStep(1);
        setReportType(null);
        setSessionType(null);
        setDetails('');
    };

    return (
        <div className="w-full max-w-2xl mx-auto flex flex-col gap-6 mt-4">
            <header className="border border-black/20 dark:border-[#ffffff3d] p-6 bg-white dark:bg-[#1a1a1a] border-b-2 border-b-[#fbaa19] shadow-md">
                <p className="text-[#fbaa19] text-xs font-medium uppercase tracking-[0.14em] mb-2">INTEGRITY & DATA</p>
                <h2 className="text-black dark:text-white text-2xl md:text-3xl font-display font-bold uppercase tracking-wider">
                    SUBMIT REPORT
                </h2>
                {step < 4 && (
                    <p className="text-gray-500 text-sm md:text-base mt-2">
                        Help us keep the grid accurate. Submit corrections or updates below.
                    </p>
                )}
            </header>

            <div className="bg-white dark:bg-[#1a1a1a] border border-black/20 dark:border-[#ffffff3d] p-6 shadow-sm min-h-[400px]">
                
                {/* STEP 1: REPORT TYPE */}
                {step === 1 && (
                    <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div>
                            <h3 className="text-black dark:text-white font-bold uppercase tracking-widest text-lg mb-1">1. Report Category</h3>
                            <p className="text-gray-500 text-sm">Select the type of information you want to report.</p>
                        </div>
                        
                        <div className="flex flex-col gap-4">
                            <button 
                                onClick={() => handleSelectType('results')}
                                className="w-full p-4 border-2 border-black/20 dark:border-white/20 text-left hover:border-[#fbaa19] transition-colors flex items-center justify-between group"
                            >
                                <div>
                                    <span className="block font-bold text-black dark:text-white uppercase tracking-widest group-hover:text-[#fbaa19]">Results & Timings</span>
                                    <span className="text-sm text-gray-500">Qualifying, Race, Free Practice, Sprints...</span>
                                </div>
                                <svg className="w-5 h-5 text-gray-400 group-hover:text-[#fbaa19]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                            </button>
                            
                            <button 
                                onClick={() => handleSelectType('driver_changes')}
                                className="w-full p-4 border-2 border-black/20 dark:border-white/20 text-left hover:border-[#fbaa19] transition-colors flex items-center justify-between group"
                            >
                                <div>
                                    <span className="block font-bold text-black dark:text-white uppercase tracking-widest group-hover:text-[#fbaa19]">Driver Changes</span>
                                    <span className="text-sm text-gray-500">Transfers, replacements, or penalties.</span>
                                </div>
                                <svg className="w-5 h-5 text-gray-400 group-hover:text-[#fbaa19]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                            </button>

                            <button 
                                onClick={() => handleSelectType('others')}
                                className="w-full p-4 border-2 border-black/20 dark:border-white/20 text-left hover:border-[#fbaa19] transition-colors flex items-center justify-between group"
                            >
                                <div>
                                    <span className="block font-bold text-black dark:text-white uppercase tracking-widest group-hover:text-[#fbaa19]">Others</span>
                                    <span className="text-sm text-gray-500">Bugs, calendar updates, or general feedback.</span>
                                </div>
                                <svg className="w-5 h-5 text-gray-400 group-hover:text-[#fbaa19]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                            </button>
                        </div>
                    </div>
                )}

                {/* STEP 2: SESSION TYPE (Only if Results) */}
                {step === 2 && (
                    <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-right-4 duration-500">
                        <div>
                            <button onClick={() => setStep(1)} className="text-gray-500 hover:text-[#fbaa19] text-xs font-bold uppercase tracking-widest mb-4 flex items-center gap-1 transition-colors">
                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
                                Back
                            </button>
                            <h3 className="text-black dark:text-white font-bold uppercase tracking-widest text-lg mb-1">2. Select Session</h3>
                            <p className="text-gray-500 text-sm">Which session does this result report apply to?</p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {['FP1', 'FP2', 'FP3', 'Qualifying', 'Sprint Qualifying', 'Sprint Race', 'Race'].map((session) => (
                                <button
                                    key={session}
                                    onClick={() => handleSelectSession(session as SessionType)}
                                    className="p-4 border-2 border-black/20 dark:border-white/20 text-center font-bold text-black dark:text-white uppercase tracking-widest hover:border-[#fbaa19] hover:text-[#fbaa19] transition-colors"
                                >
                                    {session}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* STEP 3: DETAILS */}
                {step === 3 && (
                    <form onSubmit={handleSubmit} className="flex flex-col gap-6 animate-in fade-in slide-in-from-right-4 duration-500">
                        <div>
                            <button 
                                type="button"
                                onClick={() => setStep(reportType === 'results' ? 2 : 1)} 
                                className="text-gray-500 hover:text-[#fbaa19] text-xs font-bold uppercase tracking-widest mb-4 flex items-center gap-1 transition-colors"
                            >
                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
                                Back
                            </button>
                            <h3 className="text-black dark:text-white font-bold uppercase tracking-widest text-lg mb-1">
                                {reportType === 'results' ? '3. Report Details' : '2. Report Details'}
                            </h3>
                            <p className="text-gray-500 text-sm">
                                {reportType === 'results' && sessionType 
                                    ? `Providing details for ${sessionType} results.` 
                                    : 'Please provide the specifics of your report.'}
                            </p>
                        </div>

                        <textarea 
                            value={details}
                            onChange={(e) => setDetails(e.target.value)}
                            required
                            rows={6}
                            placeholder="Type your report here... (e.g., Driver X was disqualified, position changes, etc.)"
                            className="w-full bg-gray-50 dark:bg-[#111] border-2 border-black/20 dark:border-white/20 p-4 text-black dark:text-white focus:outline-none focus:border-[#fbaa19] transition-colors resize-none"
                        ></textarea>

                        <button 
                            type="submit"
                            className="w-full bg-[#fbaa19] text-black font-bold uppercase tracking-widest py-4 hover:bg-black hover:text-[#fbaa19] transition-colors"
                        >
                            SUBMIT REPORT
                        </button>
                    </form>
                )}

                {/* STEP 4: SUCCESS */}
                {step === 4 && (
                    <div className="flex flex-col items-center justify-center py-12 gap-6 animate-in zoom-in-95 duration-500">
                        <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                            <svg className="w-8 h-8 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                        </div>
                        <div className="text-center">
                            <h3 className="text-2xl font-black text-black dark:text-white uppercase tracking-widest mb-2 font-display">Report Received</h3>
                            <p className="text-gray-500 max-w-sm mx-auto">
                                Thank you for your contribution! Our system administrators will review the information shortly.
                            </p>
                        </div>
                        <button 
                            onClick={resetForm}
                            className="mt-4 border-2 border-black/20 dark:border-white/20 px-8 py-3 text-black dark:text-white font-bold uppercase tracking-widest text-sm hover:border-[#fbaa19] hover:text-[#fbaa19] transition-colors"
                        >
                            SUBMIT ANOTHER
                        </button>
                    </div>
                )}
                
            </div>
        </div>
    );
};

export default ReportForm;
