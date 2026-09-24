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

        const apiKey = process.env.OPENAI_API_KEY;
        
        if (!apiKey) {
            return NextResponse.json(
                { error: 'OPENAI_API_KEY is not configured on the server.' },
                { status: 500 }
            );
        }

        const orgColorInstruction = orgColorRef 
            ? `Also, strictly research the official colors of "${orgColorRef}". The final image must contain exactly 30% of the colors representing the country "${nationality}" and 70% of the official colors representing "${orgColorRef}".`
            : `The final image must predominantly feature the colors of the country "${nationality}".`;

        const prompt = `A stylized, premium circular profile avatar for a racing driver named ${firstName} ${lastName}. The avatar should have a cinematic, neon-noir racing aesthetic (deep blacks, high contrast). ${orgColorInstruction}. The image should be perfectly centered, circular composition, with no text or typography. High-end digital art style, suitable for a racing game profile.`;

        const response = await fetch('https://api.openai.com/v1/images/generations', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: "dall-e-3",
                prompt: prompt,
                n: 1,
                size: "1024x1024",
                response_format: "url"
            })
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error("OpenAI Error:", errorData);
            
            // Return the specific OpenAI error so we can see it on the frontend
            const errorMessage = errorData.error?.message || 'Failed to generate image from AI.';
            return NextResponse.json(
                { error: `OpenAI Error: ${errorMessage}` },
                { status: 500 }
            );
        }

        const data = await response.json();
        const imageUrl = data.data[0].url;

        return NextResponse.json({ imageUrl });

    } catch (error) {
        console.error("Avatar generation error:", error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
