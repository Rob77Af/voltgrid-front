"use client";
import React from "react";
import { useSupabaseAuth } from "@/hooks/useSupabaseAuth";
import Link from "next/link";

export default function AuthButton() {
    const { user, isLoading, logout } = useSupabaseAuth();

    if (isLoading) {
        return <div className="w-8 h-8 rounded-full border-2 border-[#fbaa19] border-t-transparent animate-spin"></div>;
    }

    if (user) {
        return (
            <div className="flex items-center gap-4">
                <Link href="/superlicense" className="flex items-center gap-2 group cursor-pointer">
                    <div className="w-8 h-8 bg-[#fbaa19] text-black font-black flex items-center justify-center rounded-full uppercase">
                        {user.user_metadata?.username?.charAt(0) || user.email?.charAt(0) || "U"}
                    </div>
                </Link>
                <button 
                    onClick={() => logout()}
                    className="text-xs uppercase tracking-widest text-gray-500 hover:text-[#fbaa19] transition-colors"
                >
                    [ Logout ]
                </button>
            </div>
        );
    }

    return null;
}
