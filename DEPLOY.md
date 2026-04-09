# Deploy to Google Cloud Run

## Prerequisites
- Google Cloud account: **makmur45@gmail.com**
- [gcloud CLI](https://cloud.google.com/sdk/docs/install) installed
- A Google Cloud project (create one at https://console.cloud.google.com)

## Quick Deploy (3 steps)

### 1. Login & set project
```bash
gcloud auth login makmur45@gmail.com
gcloud config set project YOUR_PROJECT_ID
```

### 2. Enable required services
```bash
gcloud services enable run.googleapis.com artifactregistry.googleapis.com cloudbuild.googleapis.com
```

### 3. Deploy
```bash
# From this directory, run:
gcloud run deploy interior-app \
  --source . \
  --region asia-southeast1 \
  --allow-unauthenticated \
  --set-env-vars "STABILITY_API_KEY=your_key_here" \
  --memory 512Mi \
  --cpu 1
```

That's it. gcloud will:
- Build the Docker image using Cloud Build
- Push to Artifact Registry
- Deploy to Cloud Run
- Give you a live URL like `https://interior-app-xxxxx-as.a.run.app`

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `STABILITY_API_KEY` | Yes (for generation) | Get from https://platform.stability.ai |

Without the API key, the app runs in **demo mode** with placeholder images.

## Alternative: One-liner via Cloud Shell

1. Go to https://shell.cloud.google.com
2. Clone and deploy:
```bash
git clone https://github.com/thomaskeren90/interior.git
cd interior
gcloud run deploy interior-app --source . --region asia-southeast1 --allow-unauthenticated
```

## Custom Domain (optional)
```bash
gcloud run domain-mappings create --service interior-app --domain interior.yourdomain.com --region asia-southeast1
```
