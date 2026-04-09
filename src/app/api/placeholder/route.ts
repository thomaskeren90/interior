import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const width = parseInt(searchParams.get('w') || '1024');
  const height = parseInt(searchParams.get('h') || '768');
  const text = searchParams.get('text') || 'Interior Design';

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
    <defs>
      <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#1a1a2e;stop-opacity:1" />
        <stop offset="50%" style="stop-color:#16213e;stop-opacity:1" />
        <stop offset="100%" style="stop-color:#0f3460;stop-opacity:1" />
      </linearGradient>
      <linearGradient id="accent" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" style="stop-color:#e94560;stop-opacity:1" />
        <stop offset="100%" style="stop-color:#f5a623;stop-opacity:1" />
      </linearGradient>
    </defs>
    <rect width="100%" height="100%" fill="url(#bg)"/>
    <rect x="${width*0.1}" y="${height*0.35}" width="${width*0.8}" height="${height*0.3}" rx="12" fill="rgba(255,255,255,0.05)" stroke="url(#accent)" stroke-width="2"/>
    <text x="50%" y="48%" text-anchor="middle" font-family="system-ui,-apple-system,sans-serif" font-size="${Math.min(width, height) * 0.06}" font-weight="700" fill="white">${text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</text>
    <text x="50%" y="58%" text-anchor="middle" font-family="system-ui,-apple-system,sans-serif" font-size="${Math.min(width, height) * 0.03}" fill="rgba(255,255,255,0.5)">Add STABILITY_API_KEY for real generations</text>
    <text x="50%" y="72%" text-anchor="middle" font-family="system-ui,-apple-system,sans-serif" font-size="${Math.min(width, height) * 0.025}" fill="rgba(255,255,255,0.3)">✨ AI-Powered Interior Design</text>
  </svg>`;

  return new NextResponse(svg, {
    headers: {
      'Content-Type': 'image/svg+xml',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
