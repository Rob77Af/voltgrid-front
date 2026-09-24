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
            ? `The pattern must creatively mix the official flag colors of ${nationality} and the official colors of ${orgColorRef}.`
            : `The pattern must creatively use the official flag colors of ${nationality}.`;

        const prompt = `PURELY ABSTRACT GRAPHIC DESIGN. A minimalist geometric pattern consisting ONLY of solid color bands and stripes. Preferably horizontal stripes, but can also include diagonal, vertical, or intersecting crossing bands. ${orgColorInstruction} 1970s retro minimalist aesthetic, using ONLY flat matte solid colors. Absolutely NO shading, NO gradients, NO 3D elements. IMPORTANT: Do NOT draw any objects, NO helmets, NO badges, NO cars, and NO text. This is strictly an abstract geometric color background of intersecting solid color stripes.`;

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
