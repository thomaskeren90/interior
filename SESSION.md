# Session Log — April 9, 2026

## What We Did

### 1. Accessed GitHub Repo
- **Repo:** `thomaskeren90/interior`
- **Project:** SpaceCraft AI — Interior Design Generator
- **Stack:** Next.js 16, TypeScript, Tailwind CSS v4, Stability AI (SDXL)

### 2. Deployment to Vercel
- **Method:** Google Cloud Shell → Vercel CLI
- **Account:** makmur45@gmail.com
- **Live URL:** https://interior-rho-one.vercel.app

### Steps That Were Done:
```bash
# In Google Cloud Shell
git clone https://github.com/thomaskeren90/interior.git
cd interior
npx vercel login
npx vercel --yes
```

### 3. Stability AI API Key Setup
- Created account at https://platform.stability.ai
- Got API key
- Added to Vercel environment variables:
```bash
npx vercel env add STABILITY_API_KEY production
# Mark as sensitive: yes
# Paste key when prompted
```
- Redeployed:
```bash
npx vercel --prod
```

### 4. Fixed SDXL Dimension Error (April 9, 2026)
- **Problem:** Images not generating — app returned placeholder SVGs
- **Root cause:** SDXL API rejects `1024x768` and `768x1024` dimensions
- **Fix:** Changed to valid SDXL dimensions in `src/app/api/generate/route.ts`:
  - Landscape: `1344x768` (was `1024x768`)
  - Portrait: `640x1536` (was `768x1024`)
- **Valid SDXL dimensions:** 1024x1024, 1152x896, 1216x832, 1344x768, 1536x640, 640x1536

### How to Redeploy After Code Changes:
```bash
cd ~/interior
git pull
npx vercel --prod
```

### Google Cloud Projects (for reference)
| Project ID | Name |
|---|---|
| gen-lang-client-0290961335 | openclaw101 |
| gen-lang-client-0362805576 | odoo13 vision |
| gen-lang-client-0582649600 | talking avatar |
| gen-lang-client-0872651312 | n8n-Project |
| gen-lang-client-0908806597 | openclaw-toko |
| gen-lang-client-0934498672 | openclaw toko |
| proven-audio-445622-i6 | My First Project |

## Notes
- Cloud Run was not used because billing was not enabled for the new project
- Vercel was used as free alternative — works perfectly
- `interior-ai-makmur45` project was created but has no billing linked
- **Important:** Rotate GitHub PAT and Stability API key if they were ever shared in chat
