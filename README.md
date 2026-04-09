# 🔮 SpaceCraft AI — Interior Design Generator

An AI-powered interior design platform inspired by InteriorAI.com — with differentiated features and open-source architecture.

## Features

- **6 Design Modes**: Interior Redesign, Style Transfer, Virtual Staging, Sketch-to-Image, Outdoor Design, Empty Space
- **50+ Interior Styles**: From Modern and Scandinavian to Cyberpunk and Vaporwave
- **35+ Room Types**: Residential, commercial, outdoor, and specialty spaces
- **Cost Estimator**: Get ballpark renovation costs for AI-generated designs
- **Mood Board Builder**: Collect and organize favorite designs
- **3D Flythrough Preview**: Turn designs into walkthrough videos (coming soon)
- **Style Transfer**: Upload a reference photo and apply its style to your room
- **People Placement**: Add people to generated interiors
- **Multi-Variation Generation**: Generate 1 or 4 design variations at once

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS v4
- **Language**: TypeScript
- **AI Backend**: Stability AI (Stable Diffusion XL)
- **Icons**: Lucide React + Emoji
- **Animation**: Framer Motion

## Getting Started

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Add your STABILITY_API_KEY to .env.local

# Run development server
npm run dev

# Build for production
npm run build
```

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `STABILITY_API_KEY` | Stability AI API key from [platform.stability.ai](https://platform.stability.ai/) | No (uses placeholder images) |

Without an API key, the app generates SVG placeholders showing the design prompt. With a key, it produces photorealistic AI images.

## Architecture

```
src/
├── app/
│   ├── page.tsx           # Landing page (hero, features, pricing)
│   ├── app/page.tsx       # Design studio (main application)
│   ├── layout.tsx         # Root layout
│   ├── globals.css        # Global styles + Tailwind config
│   └── api/
│       ├── generate/route.ts   # AI generation endpoint
│       └── placeholder/route.ts # SVG placeholder generator
├── constants/
│   └── index.ts           # Room types, styles, modes, people options
├── types/
│   └── index.ts           # TypeScript interfaces
└── lib/
    └── utils.ts           # Utility functions (prompt generation, etc.)
```

## How the AI Pipeline Works

1. **Image Upload** → User uploads a room photo (drag & drop, file picker, clipboard paste)
2. **Configuration** → User selects room type, style, mode, and optional prompt
3. **Prompt Engineering** → `generatePrompt()` builds a detailed text prompt combining room context, style modifiers, and mode-specific instructions
4. **API Call** → Prompt + optional init image sent to Stability AI's SDXL endpoint
5. **img2img vs txt2img** → Interior modes use img2img (preserves room structure), staging/sketch modes use txt2img
6. **Image Strength** → Controls how much the original image influences the output (0.35 for redesign, 0.65 for style transfer)
7. **Post-Processing** → Results returned with metadata for saving, downloading, and cost estimation

## Differentiators from InteriorAI

| Feature | InteriorAI | SpaceCraft |
|---------|-----------|------------|
| Cost Estimator | ❌ | ✅ Built-in renovation cost estimates |
| Mood Board | ❌ | ✅ Save & organize designs into boards |
| Style Categories | Flat list | Filtered by category (modern/classic/themed/seasonal) |
| Room Categories | Flat list | Grouped by residential/commercial/outdoor/special |
| Open Source | ❌ | ✅ Full source available |
| Self-Hostable | ❌ | ✅ Deploy anywhere |
| Pricing Model | Pay-per-use | Freemium with tiers |

## Deployment

### Vercel
```bash
npx vercel
```

### Docker
```bash
docker build -t spacecraft-ai .
docker run -p 3000:3000 spacecraft-ai
```

### Any Node.js Host
```bash
npm run build
npm start
```

## License

MIT
