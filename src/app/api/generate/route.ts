import { NextRequest, NextResponse } from 'next/server';
import { generatePrompt } from '@/lib/utils';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { imageBase64, roomType, style, mode, prompt: customPrompt, numDesigns = 1, orientation = 'landscape' } = body;

    if (!roomType || !style || !mode) {
      return NextResponse.json({ error: 'Missing required fields: roomType, style, mode' }, { status: 400 });
    }

    const fullPrompt = generatePrompt(roomType, style, mode, customPrompt);
    const dimensions = orientation === 'portrait' 
      ? { width: 768, height: 1024 } 
      : { width: 1024, height: 768 };

    const results = [];

    for (let i = 0; i < Math.min(numDesigns, 4); i++) {
      // Using Stability AI's SDXL API as the generation backend
      // In production, you'd call the actual API. Here we simulate with the prompt structure.
      const apiKey = process.env.STABILITY_API_KEY;
      
      if (apiKey) {
        try {
          const formData = new FormData();
          
          if (imageBase64 && mode !== 'empty-space') {
            const imageBuffer = Buffer.from(imageBase64, 'base64');
            const blob = new Blob([imageBuffer], { type: 'image/png' });
            formData.append('init_image', blob, 'input.png');
            formData.append('image_strength', mode === 'style-transfer' ? '0.65' : '0.35');
          }

          formData.append('text_prompts[0][text]', fullPrompt);
          formData.append('text_prompts[0][weight]', '1');
          formData.append('cfg_scale', '7');
          formData.append('steps', '30');
          formData.append('width', dimensions.width.toString());
          formData.append('height', dimensions.height.toString());
          formData.append('samples', '1');

          const engineId = imageBase64 && mode !== 'empty-space' 
            ? 'stable-diffusion-xl-1024-v1-0' 
            : 'stable-diffusion-xl-1024-v1-0';

          const response = await fetch(
            `https://api.stability.ai/v1/generation/${engineId}/text-to-image`,
            {
              method: 'POST',
              headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Accept': 'application/json',
              },
              body: formData,
            }
          );

          if (response.ok) {
            const data = await response.json();
            for (const artifact of data.artifacts) {
              results.push({
                id: `design-${Date.now()}-${i}`,
                imageUrl: `data:image/png;base64,${artifact.base64}`,
                prompt: fullPrompt,
                roomType,
                style,
                mode,
                createdAt: new Date().toISOString(),
                width: dimensions.width,
                height: dimensions.height,
              });
            }
          } else {
            throw new Error(`Stability API error: ${response.status}`);
          }
        } catch (apiError) {
          console.error('Stability API call failed:', apiError);
          // Fallback: return a placeholder with the prompt
          results.push({
            id: `design-${Date.now()}-${i}`,
            imageUrl: `/api/placeholder?w=${dimensions.width}&h=${dimensions.height}&text=${encodeURIComponent(roomType + ' - ' + style)}`,
            prompt: fullPrompt,
            roomType,
            style,
            mode,
            createdAt: new Date().toISOString(),
            width: dimensions.width,
            height: dimensions.height,
          });
        }
      } else {
        // No API key — return demo placeholder
        results.push({
          id: `design-${Date.now()}-${i}`,
          imageUrl: `/api/placeholder?w=${dimensions.width}&h=${dimensions.height}&text=${encodeURIComponent(`${roomType} • ${style}`)}`,
          prompt: fullPrompt,
          roomType,
          style,
          mode,
          createdAt: new Date().toISOString(),
          width: dimensions.width,
          height: dimensions.height,
        });
      }
    }

    return NextResponse.json({ designs: results, prompt: fullPrompt });
  } catch (error) {
    console.error('Generation error:', error);
    return NextResponse.json({ error: 'Failed to generate design' }, { status: 500 });
  }
}
