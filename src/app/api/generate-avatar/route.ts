import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { firstName, lastName, nationality, orgColorRef } = body;

        if (!firstName || !nationality) {
            return NextResponse.json(
                { error: 'First name and nationality are required' },
                { status: 400 }
            );
        }

        const orgColorInstruction = orgColorRef 
            ? `The top horizontal stripes must use the official flag colors of ${nationality}, and the bottom horizontal stripes must use the official colors of ${orgColorRef}.`
            : `All horizontal stripes must use the official flag colors of ${nationality}.`;

        const prompt = `A retro racing helmet background design consisting entirely of bold horizontal stripes inside a perfect circle. ${orgColorInstruction} Classic 1960s, 1970s, and 1980s vintage motorsport aesthetic. Flat, clean retro racing stripes with a matte finish. No neon, no dark noir, no faces, no text, no letters, no typography, no complex drawings. Just minimalist, vintage horizontal color stripes forming a circular racing badge.`;

        // Switch to Pollinations.ai for FREE generation without API keys
        const encodedPrompt = encodeURIComponent(prompt);
        const seed = Math.floor(Math.random() * 100000000);
        
        // We request the image from pollinations. It returns the image buffer directly.
        const imageUrl = `https://image.pollinations.ai/prompt/${encodedPrompt}?width=512&height=512&nologo=true&seed=${seed}`;

        // Fetch to ensure it generates before responding, and to catch errors
        const response = await fetch(imageUrl);

        if (!response.ok) {
            console.error("Free AI Error:", response.statusText);
            return NextResponse.json(
                { error: `Free AI API Error: ${response.statusText}` },
                { status: 500 }
            );
        }

        // Return the direct URL to the client
        return NextResponse.json({ imageUrl });

    } catch (error: any) {
        console.error("Avatar generation error:", error);
        return NextResponse.json(
            { error: error.message || 'Internal server error' },
            { status: 500 }
        );
    }
}
