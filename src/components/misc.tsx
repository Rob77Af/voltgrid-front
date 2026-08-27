"use client";
import React from 'react';
import { usePredictionStore } from '@/store/usePredictionStore';

const QUESTIONS = [
    { id: 'q1', text: 'Safety Car deployed during the race?', options: ['Yes', 'No'] },
    { id: 'q2', text: 'Better race finish position?', options: ['Williams', 'Audi'] },
    { id: 'q3', text: 'Will there be a Red Flag session?', options: ['Yes', 'No'] },
    { id: 'q4', text: 'Fastest Pit Stop team?', options: ['Red Bull', 'McLaren'] },
    { id: 'q5', text: 'M.VERSTAPPEN fastest lap?', options: ['Yes', 'No'] },
];

const Misc = ({ hideSubmit }: { hideSubmit?: boolean }) => {
    const answers = usePredictionStore(state => state.misc);
    const setAnswers = usePredictionStore(state => state.setMisc);

    const handleSelect = (questionId: string, option: string) => {
        setAnswers(prev => ({
            ...prev,
            [questionId]: option
        }));
    };

    const answeredCount = Object.keys(answers).length;
    const totalQuestions = QUESTIONS.length;

    return (
        <div className="w-full flex flex-col gap-8 mt-8">
            <header className="f1-predictions-header border border-[#ffffff3d] p-6 bg-[#1a1a1a] border-b-2 border-b-[#fbaa19] shadow-md">
                <p className="text-[#fbaa19] text-xs font-medium uppercase tracking-[0.14em] mb-2">F1 PREDICTION MARKET</p>
                <h2 className="text-white text-2xl md:text-3xl font-display font-bold uppercase tracking-wider mb-2">MISC</h2>
                <p className="text-gray-400 text-sm md:text-base">
                    Answer the following event props. Choose one outcome per question.
                </p>
            </header>

            <div className="flex flex-col gap-4">
                {QUESTIONS.map(q => {
                    const selectedOption = answers[q.id];
                    return (
                        <div key={q.id} className="bg-black border border-[#ffffff3d] p-4 flex flex-col gap-4 md:flex-row md:items-center md:justify-between hover:border-[#fbaa19] transition-colors">
                            <h3 className="text-white uppercase font-bold tracking-wider text-sm md:text-base md:w-1/2">
                                {q.text}
                            </h3>
                            <div className="flex items-center gap-2 md:w-1/2">
                                {q.options.map(opt => {
                                    const isSelected = selectedOption === opt;
                                    return (
                                        <button
                                            key={opt}
                                            onClick={() => handleSelect(q.id, opt)}
                                            className={`flex-1 py-3 px-4 font-bold uppercase tracking-widest text-sm transition-all border ${
                                                isSelected 
                                                ? 'bg-[#fbaa19] text-black border-[#fbaa19]' 
                                                : 'bg-[#1a1a1a] text-white border-[#ffffff3d] hover:border-[#fbaa19] hover:text-[#fbaa19]'
                                            }`}
                                        >
                                            {opt}
                                            {isSelected && (
                                                <svg className="w-4 h-4 inline-block ml-2 -mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                                                </svg>
                                            )}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    );
                })}
            </div>

            {!hideSubmit && (
                <footer className="f1-predictions-summary flex items-center justify-between p-4 bg-[#1a1a1a] border border-[#ffffff3d]">
                    <p className="f1-summary-copy text-sm md:text-base text-gray-400 font-medium tracking-wide">
                        {answeredCount === totalQuestions 
                            ? <span className="text-[#fbaa19]">All {totalQuestions} answered!</span>
                            : `${answeredCount} of ${totalQuestions} answered`
                        }
                    </p>
                    <button 
                        type="button" 
                        disabled={answeredCount !== totalQuestions}
                        className="f1-submit-picks bg-[#fbaa19] text-black border-2 border-[#fbaa19] px-6 py-3 font-bold uppercase tracking-widest text-xs md:text-sm transition-colors hover:bg-black hover:text-[#fbaa19] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-[#fbaa19] disabled:hover:text-black"
                    >
                        SUBMIT PREDICTION
                    </button>
                </footer>
            )}
        </div>
    );
};

export default Misc;
