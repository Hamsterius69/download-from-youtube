# Deployment Guide - Cloudflare Pages

This guide explains how to deploy the YouTube Downloader application to Cloudflare Pages as a static site.

## Prerequisites

- A Cloudflare account (free tier works)
- Git repository with your code
- RapidAPI key for YouTube Media Downloader API

## Deployment Steps

### 1. Prepare the Project

The project is already configured for Cloudflare Pages deployment with:
- Production build configuration in `angular.json`
- `_redirects` file for SPA routing
- Environment configuration for production

### 2. Build for Production

```bash
npm run build
```

This will create an optimized production build in the `dist/download-from-youtube` directory.

### 3. Deploy to Cloudflare Pages

#### Option A: Via Cloudflare Dashboard (Recommended)

1. Log in to your [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. Navigate to **Pages** in the left sidebar
3. Click **Create a project**
4. Connect your Git repository (GitHub, GitLab, or Bitbucket)
5. Configure the build settings:
   - **Project name**: `download-from-youtube` (or your preferred name)
   - **Production branch**: `develop` (or `main`)
   - **Build command**: `npm run build`
   - **Build output directory**: `dist/download-from-youtube`
   - **Root directory**: `/` (leave empty)
6. Click **Save and Deploy**

#### Option B: Via Wrangler CLI

```bash
# Install Wrangler globally
npm install -g wrangler

# Login to Cloudflare
wrangler login

# Deploy
wrangler pages deploy dist/download-from-youtube --project-name=download-from-youtube
```

### 4. Environment Variables (Important!)

The application uses RapidAPI for YouTube downloads. The API key is currently hardcoded in `src/environments/environment.prod.ts`.

**SECURITY NOTE**: For production, you should:

1. Keep your API key secure
2. Monitor your RapidAPI usage (free tier: 100 requests/month)
3. Consider implementing rate limiting or user authentication

**Current API Configuration**:
- API: YouTube Media Downloader (RapidAPI)
- Host: `youtube-media-downloader.p.rapidapi.com`
- Free Tier Limit: 100 downloads/month

### 5. Post-Deployment

After deployment:
1. Cloudflare will provide a URL like `https://download-from-youtube.pages.dev`
2. You can configure a custom domain in the Cloudflare Pages settings
3. HTTPS is enabled automatically

## Build Configuration

### Angular Build Settings

The production build includes:
- File replacement for environment files
- Output hashing for cache busting
- Bundle size budgets:
  - Initial bundle: max 1MB (warning at 500KB)
  - Component styles: max 4KB (warning at 2KB)

### SPA Routing

The `_redirects` file ensures all routes are handled by the Angular app:
```
/* /index.html 200
```

This is automatically copied to the build output during the build process.

## Continuous Deployment

If you connected a Git repository, Cloudflare Pages will automatically:
- Deploy on every push to your production branch
- Create preview deployments for pull requests
- Show deployment status in your repository

## Troubleshooting

### Build Fails

If the build fails on Cloudflare:
1. Check that Node.js version is compatible (recommended: 18.x or 20.x)
2. Verify all dependencies are in `package.json`
3. Check build logs in Cloudflare dashboard

### Routing Issues

If routes don't work after deployment:
1. Verify `_redirects` file exists in build output
2. Check Cloudflare Pages Functions configuration

### API Errors

If downloads fail:
1. Check RapidAPI subscription status
2. Verify API key is correct in `environment.prod.ts`
3. Check browser console for CORS or network errors
4. Monitor API usage limits (100/month on free tier)

## Performance

The production build is optimized for:
- Fast initial load (~73KB transferred, ~257KB raw)
- Efficient caching with output hashing
- TailwindCSS for minimal CSS bundle
- Lazy loading where possible

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
