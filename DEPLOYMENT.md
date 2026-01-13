# Deployment Guide - Cloudflare Pages

This guide explains how to deploy the YouTube Downloader application to Cloudflare Pages as a static site.

## Prerequisites

- A Cloudflare account (free tier works)
- Git repository with your code
- RapidAPI key for YouTube Media Downloader API

## Important: Environment Files

The API keys are stored in `environment.ts` and `environment.prod.ts` which are **ignored by git** for security.

Example files are provided:
- `src/environments/environment.example.ts`
- `src/environments/environment.prod.example.ts`

### Local Development Setup

1. Copy example files:
```bash
cp src/environments/environment.example.ts src/environments/environment.ts
cp src/environments/environment.prod.example.ts src/environments/environment.prod.ts
```

2. Edit both files and replace `YOUR_RAPIDAPI_KEY_HERE` with your actual RapidAPI key

3. These files will NOT be committed to git (they're in `.gitignore`)

## Deployment Steps

### 1. Build for Production Locally

```bash
npm run build
```

This will create an optimized production build in the `dist/download-from-youtube` directory.

### 2. Deploy to Cloudflare Pages

#### Option A: Via Cloudflare Dashboard (Recommended)

1. Log in to your [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. Navigate to **Pages** in the left sidebar
3. Click **Create a project**
4. Connect your Git repository (GitHub, GitLab, or Bitbucket)
5. Configure the build settings:
   - **Project name**: `download-from-youtube` (or your preferred name)
   - **Production branch**: `develop` (or your main branch)
   - **Build command**: `npm run build:cloudflare`
   - **Build output directory**: `dist/download-from-youtube`
   - **Root directory**: `/` (leave empty)
6. Click **Save and Deploy**

**IMPORTANT**: The `build:cloudflare` script automatically copies the example environment files during build. You'll need to update the example files with your actual API key before deploying.

#### Option B: Via Wrangler CLI

```bash
# Install Wrangler globally
npm install -g wrangler

# Login to Cloudflare
wrangler login

# Build with Cloudflare script
npm run build:cloudflare

# Deploy
wrangler pages deploy dist/download-from-youtube --project-name=download-from-youtube
```

### 3. Update API Key in Example Files

Before deploying, update the API key in the example files:

1. Edit `src/environments/environment.prod.example.ts`
2. Replace `YOUR_RAPIDAPI_KEY_HERE` with your actual RapidAPI key
3. Commit and push to your repository
4. Cloudflare will use these values during build

**Alternative (More Secure)**: Keep placeholder values in example files and use Cloudflare Pages environment variables (requires build script modification).

## Build Configuration

### Angular Build Settings

The production build includes:
- File replacement for environment files
- Output hashing for cache busting
- Bundle size budgets:
  - Initial bundle: max 1MB (warning at 500KB)
  - Component styles: max 4KB (warning at 3KB)

### SPA Routing

The `_redirects` file ensures all routes are handled by the Angular app:
```
/* /index.html 200
```

This is automatically copied to the build output during the build process.

### Build Scripts

- `npm run build` - Standard production build (requires local environment files)
- `npm run build:cloudflare` - Build for Cloudflare (copies example files first)

## Continuous Deployment

If you connected a Git repository, Cloudflare Pages will automatically:
- Deploy on every push to your production branch
- Create preview deployments for pull requests
- Show deployment status in your repository

## Troubleshooting

### Build Fails with "Module not found: environment"

This means the environment files don't exist. Solutions:

1. **For local builds**: Copy example files as described in "Local Development Setup"
2. **For Cloudflare**: Use `npm run build:cloudflare` as the build command
3. **Check**: Ensure example files exist in the repository

### package-lock.json out of sync

If you see errors about chokidar, readdirp, or yaml missing from lock file:

```bash
rm package-lock.json
npm install
git add package-lock.json
git commit -m "Update package-lock.json"
git push
```

### Routing Issues

If routes don't work after deployment:
1. Verify `_redirects` file exists in build output (`dist/download-from-youtube/_redirects`)
2. Check Cloudflare Pages Functions configuration

### API Errors

If downloads fail:
1. Verify API key is correctly set in example files (for Cloudflare builds)
2. Check RapidAPI subscription status
3. Monitor API usage limits (100/month on free tier)
4. Check browser console for CORS or network errors

## Performance

The production build is optimized for:
- Fast initial load (~73KB transferred, ~257KB raw)
- Efficient caching with output hashing
- TailwindCSS for minimal CSS bundle
- Lazy loading where possible

## Security Notes

### API Key Management

**Current Implementation** (Simplified):
- API keys are in example files that get copied during build
- Example files are committed to repository
- **Risk**: API keys are visible in public repositories

**Recommendations**:
1. Keep repository private if API key is in example files
2. Monitor RapidAPI usage regularly
3. Regenerate API key if compromised
4. Consider implementing rate limiting in the frontend

**Future Enhancement**:
Implement Cloudflare Pages environment variables for true secret management (requires build script changes).

## Monitoring

Monitor your deployment:
- Cloudflare Analytics (free with Pages)
- RapidAPI Dashboard (for API usage)
- Browser DevTools (for client-side errors)

## Cost

- Cloudflare Pages: Free tier (unlimited requests, 500 builds/month)
- RapidAPI: Free tier (100 requests/month)
- Total: **$0/month** for moderate usage

## Support

For issues:
- Cloudflare Pages: [Cloudflare Docs](https://developers.cloudflare.com/pages/)
- Angular Build: [Angular Deployment Guide](https://angular.dev/tools/cli/deployment)
- API: [RapidAPI Support](https://rapidapi.com/support)
