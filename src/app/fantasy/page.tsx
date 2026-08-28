import React from 'react';
import type { Metadata } from 'next';
import FantasyClient from './fantasy-client';

export const metadata: Metadata = {
  title: 'VoltGrid | Fantasy Competitions',
  description: 'Join the F1 fantasy competitions and compete globally.',
};

export default function FantasyPage() {
    return (
        <main className="w-full max-w-6xl mx-auto p-4 md:p-8 pt-6 pb-24 min-h-screen">
            <FantasyClient />
        </main>
    );
}
