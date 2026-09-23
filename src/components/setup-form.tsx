"use client";
import React, { useState, useEffect } from 'react';
import { supabase } from '@/utils/supabase';
import { useSupabaseAuth } from '@/hooks/useSupabaseAuth';

export default function SetupForm() {
    const { user } = useSupabaseAuth();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [success, setSuccess] = useState(false);
    const [generatingAvatar, setGeneratingAvatar] = useState(false);
    const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
    const [aiError, setAiError] = useState<string | null>(null);
    
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        nationality: '',
        org_color: ''
    });

    useEffect(() => {
        async function fetchProfile() {
            if (!user) return;
            try {
                const { data, error } = await supabase
                    .from('profiles')
                    .select('first_name, last_name, nationality, org_color, avatar_url')
                    .eq('id', user.id)
                    .single();
                
                if (data) {
                    setFormData({
                        first_name: data.first_name || '',
                        last_name: data.last_name || '',
                        nationality: data.nationality || '',
                        org_color: data.org_color || '#fbaa19'
                    });
                }
            } catch (err) {
                console.error("Error fetching profile for setup:", err);
            } finally {
                setLoading(false);
            }
        }
        fetchProfile();
    }, [user]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user) return;
        
        setSaving(true);
        setSuccess(false);

        try {
            const { error } = await supabase
                .from('profiles')
                .update({
                    first_name: formData.first_name,
                    last_name: formData.last_name,
                    nationality: formData.nationality,
                    org_color: formData.org_color
                })
                .eq('id', user.id);

            if (error) throw error;
            
            setSuccess(true);
            setTimeout(() => setSuccess(false), 3000);
            
            // Trigger AI Generation if fields exist
            if (formData.first_name && formData.nationality) {
                setGeneratingAvatar(true);
                setAiError(null);
                
                try {
                    const res = await fetch('/api/generate-avatar', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            firstName: formData.first_name,
                            lastName: formData.last_name,
                            nationality: formData.nationality,
                            orgColorRef: formData.org_color
                        })
                    });
                    
                    const resData = await res.json();
                    
                    if (!res.ok) {
                        throw new Error(resData.error || 'Failed to generate AI avatar');
                    }
                    
                    if (resData.imageUrl) {
                        setAvatarUrl(resData.imageUrl);
                        // Save URL to profile
                        await supabase
                            .from('profiles')
                            .update({ avatar_url: resData.imageUrl })
                            .eq('id', user.id);
                    }
                } catch (genErr: any) {
                    console.error('Avatar generation error:', genErr);
                    setAiError(genErr.message);
                } finally {
                    setGeneratingAvatar(false);
                }
            }

        } catch (err) {
            console.error("Error saving profile:", err);
            alert("Error saving your profile details.");
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="w-full max-w-2xl bg-black dark:bg-[#1a1a1a] border border-[#fbaa19]/20 p-8 flex justify-center items-center h-64 animate-fade-in">
                <div className="animate-pulse text-[#fbaa19] font-bold tracking-widest uppercase">
                    LOADING SETUP...
                </div>
            </div>
        );
    }

    return (
        <div className="w-full max-w-2xl bg-white dark:bg-black border border-black/20 dark:border-[#ffffff3d] shadow-2xl animate-fade-in">
            <header className="bg-black text-[#fbaa19] border-b-4 border-[#fbaa19] p-6">
                <h2 className="text-2xl md:text-3xl font-black uppercase tracking-widest font-display">Driver Setup</h2>
                <p className="text-sm md:text-base text-gray-400 mt-2 font-medium tracking-wide">
                    Configure your official driver details. These will be used by our AI to generate your provisional avatar.
                </p>
            </header>

            <form onSubmit={handleSubmit} className="p-6 md:p-8 flex flex-col gap-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2">
                        <label htmlFor="first_name" className="text-xs font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400">
                            First Name
                        </label>
                        <input
                            type="text"
                            id="first_name"
                            name="first_name"
                            value={formData.first_name}
                            onChange={handleChange}
                            required
                            className="bg-black/5 dark:bg-white/5 border border-black/20 dark:border-white/20 p-3 text-black dark:text-white uppercase font-bold tracking-wider focus:outline-none focus:border-[#fbaa19] transition-colors"
                            placeholder="Ayrton"
                        />
                    </div>
                    
                    <div className="flex flex-col gap-2">
                        <label htmlFor="last_name" className="text-xs font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400">
                            Last Name
                        </label>
                        <input
                            type="text"
                            id="last_name"
                            name="last_name"
                            value={formData.last_name}
                            onChange={handleChange}
                            required
                            className="bg-black/5 dark:bg-white/5 border border-black/20 dark:border-white/20 p-3 text-black dark:text-white uppercase font-bold tracking-wider focus:outline-none focus:border-[#fbaa19] transition-colors"
                            placeholder="Senna"
                        />
                    </div>
                </div>

                <div className="flex flex-col gap-2">
                    <label htmlFor="nationality" className="text-xs font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400">
                        Nationality
                    </label>
                    <input
                        type="text"
                        id="nationality"
                        name="nationality"
                        value={formData.nationality}
                        onChange={handleChange}
                        required
                        className="bg-black/5 dark:bg-white/5 border border-black/20 dark:border-white/20 p-3 text-black dark:text-white uppercase font-bold tracking-wider focus:outline-none focus:border-[#fbaa19] transition-colors"
                        placeholder="Brazilian"
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <label htmlFor="org_color" className="text-xs font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400">
                        Organization Color Reference (Optional)
                    </label>
                    <input
                        type="text"
                        id="org_color"
                        name="org_color"
                        value={formData.org_color}
                        onChange={handleChange}
                        className="bg-black/5 dark:bg-white/5 border border-black/20 dark:border-white/20 p-3 text-black dark:text-white uppercase font-bold tracking-wider focus:outline-none focus:border-[#fbaa19] transition-colors"
                        placeholder="e.g. Fluminense, Ferrari, Cyberpunk"
                    />
                    <p className="text-[10px] text-gray-500 uppercase tracking-widest mt-1">
                        Our AI will mix this reference (70%) with your nationality colors (30%) to generate your avatar.
                    </p>
                </div>

                {/* AI Avatar Preview */}
                <div className="mt-4 p-6 border border-dashed border-black/30 dark:border-white/30 flex flex-col items-center justify-center gap-4 relative">
                    <div className="w-32 h-32 rounded-full bg-black/10 dark:bg-white/10 flex items-center justify-center overflow-hidden border-2 border-[#fbaa19] relative">
                        {avatarUrl ? (
                            <img src={avatarUrl} alt="Driver Avatar" className="w-full h-full object-cover" />
                        ) : (
                            <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                        )}
                        
                        {generatingAvatar && (
                            <div className="absolute inset-0 bg-black/70 flex items-center justify-center backdrop-blur-sm">
                                <div className="w-8 h-8 rounded-full border-4 border-[#fbaa19] border-t-transparent animate-spin"></div>
                            </div>
                        )}
                    </div>
                    
                    <p className="text-xs font-bold uppercase tracking-widest text-gray-500 text-center max-w-sm">
                        {generatingAvatar 
                            ? 'AI is researching references and generating your avatar...'
                            : avatarUrl 
                                ? 'Your provisional AI Avatar' 
                                : 'AI Avatar Generation will be triggered after you save your profile details.'}
                    </p>
                    
                    {aiError && (
                        <p className="text-xs font-bold uppercase tracking-widest text-red-500 text-center bg-red-500/10 p-2 border border-red-500/30">
                            {aiError}
                        </p>
                    )}
                </div>

                <button 
                    type="submit" 
                    disabled={saving}
                    className="mt-6 w-full bg-[#fbaa19] text-black border-2 border-[#fbaa19] px-6 py-4 font-black uppercase tracking-widest text-lg transition-colors hover:bg-black hover:text-[#fbaa19] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {saving ? 'SAVING...' : success ? 'SAVED!' : 'SAVE PROFILE'}
                </button>
            </form>
        </div>
    );
}
