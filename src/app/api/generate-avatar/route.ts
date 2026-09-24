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
            ? `Also, strictly research the official colors of "${orgColorRef}". The final image must contain exactly 30% of the colors representing the country "${nationality}" and 70% of the official colors representing "${orgColorRef}".`
            : `The final image must predominantly feature the colors of the country "${nationality}".`;

        const prompt = `A stylized, premium circular profile avatar for a racing driver named ${firstName} ${lastName}. The avatar should have a cinematic, neon-noir racing aesthetic (deep blacks, high contrast). ${orgColorInstruction}. The image should be perfectly centered, circular composition, with no text or typography. High-end digital art style, suitable for a racing game profile.`;

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
