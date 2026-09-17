# Deployment Runbook — Blue Line Marine Transport

## Overview

Deploy target: **Vercel** (free tier sufficient until traffic grows). This runbook covers project setup, preview/production flows, domain/DNS, and rollback. No deployment happens from this doc — it is a reference for when the owner is ready to go live.

## Prerequisites

- GitHub repo: `github.com/kiermurrdev/blue-line-website`
- Vercel account (free tier)
- Domain (optional until launch): e.g., `bluelinemarinetransport.com`

## 1. Vercel Project Setup

1. Log into Vercel dashboard → **New Project**
2. Import from Git → select `kiermurrdev/blue-line-website`
3. Framework preset: **Next.js** (auto-detected)
4. Build command: `next build` (default)
5. Output directory: `.next` (default)
6. Environment variables: none required at launch (see §4 for future needs)
7. Click **Deploy**

This creates your first production deployment automatically. All subsequent pushes to `main` trigger new deployments; PRs trigger preview deployments.

## 2. Branching & Deployment Model

| Branch / Action | Result | URL |
|---|---|---|
| Push to `main` | Production deployment | `bluelinemarinetransport.com` (or Vercel URL) |
| Open PR from feature branch | Preview deployment | `<project>-<branch>.vercel.app` |
| Push to feature branch (no PR) | Preview deployment | Same as above |

**Workflow:** Never push directly to `main` without a reviewed PR. Use `feat/<slug>` or `fix/<slug>` branches.

## 3. Environment Variables

### Currently required: NONE

The site is fully static with content in `src/content/*`. No API keys, database URLs, or external services are configured.

### Future env vars (when these features are added)

| Variable | Purpose | When needed |
|---|---|---|
| `LEAD_CAPTURE_ENDPOINT` | URL for quote form submissions (e.g., Formspree, Netlify Forms, custom API) | When lead-capture endpoint is chosen (Open Question #7) |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Sanity dataset project ID | When Sanity CMS migration begins |
| `NEXT_PUBLIC_SANITY_DATASET` | Sanity dataset name (e.g., `production`) | When Sanity CMS migration begins |
| `SANITY_READ_TOKEN` | Sanity read token (if dataset is private) | When Sanity CMS migration begins |

To add env vars:
1. Vercel dashboard → Project → Settings → Environment Variables
2. Add variable, select environment(s) (Production, Preview, Development)
3. Redeploy (or push a commit) for changes to take effect

## 4. Domain & DNS

### Connect a custom domain

1. Vercel dashboard → Project → Settings → Domains
2. Add your domain (e.g., `bluelinemarinetransport.com`)
3. Vercel provides DNS records — configure at your registrar:

   **Option A: Name servers at Vercel**
   - Change NS records at your registrar to Vercel's name servers
   - Vercel auto-manages all DNS

   **Option B: Keep your registrar's DNS**
   - Add CNAME: `www` → `cname.vercel-dns.com`
   - Add A record: `@` → `76.76.21.21` (Vercel's edge IP)

4. Vercel provisions HTTPS automatically (Let's Encrypt)

### DNS checklist before launch

- [ ] Domain points to Vercel (via NS delegation or A/CNAME records)
- [ ] HTTPS certificate issued (Vercel dashboard shows green check)
- [ ] `www` → root redirect configured (Vercel does this automatically)
- [ ] Verify both `https://bluelinemarinetransport.com` and `https://www.bluelinemarinetransport.com` resolve

## 5. Preview vs Production

- **Preview deployments** (from PRs): Safe to test new content, design changes, and features. Share the preview URL for stakeholder review. No impact on live site.
- **Production deployments** (from `main`): Go live immediately. Review the Vercel deployment page for build logs and any warnings before merging.

## 6. Rollback

If a production deployment has issues:

1. Vercel dashboard → Project → Deployments
2. Find the last known-good deployment
3. Click **⋯** → **Promote to Production**

This instantly restores that deployment while keeping the problematic one accessible for debugging. Alternatively, revert the commit in Git and push to `main` — Vercel auto-deploys the fix.

## 7. Lead-Capture Stub Status

### Current state

The `/contact` page has a `QuoteForm` component with full validation but **no submission handler wired**. On submit, it logs to console and shows a generic success message — no data is sent anywhere.

### What must change when the owner picks a form target

The owner needs to decide where quote requests go. Options:

| Option | What changes in code | Complexity |
|---|---|---|
| **Formspree / Netlify Forms** | Change form `action` URL; add `name` attributes to inputs | Low — 5-minute change |
| **Custom endpoint** | Set `LEAD_CAPTURE_ENDPOINT` env var; POST form data there | Medium — requires backend |
| **Email via serverless function** | Add a Vercel function that sends email (Resend, SendGrid, etc.) | Medium — requires API key |

### Code location

- Form component: `src/components/forms/QuoteForm.tsx`
- Submission handler: `handleSubmit` function inside that component
- Look for the comment `// TODO: wire to real endpoint when owner picks a target`

### Acceptance criteria for wiring lead capture

- Form submission sends data to the chosen endpoint
- User sees a clear confirmation message on success
- Error handling shows a retry option on failure
- No secrets or credentials in the repo

## 8. Post-Launch Checklist

- [ ] Production URL verified on mobile + desktop
- [ ] Quote form tested end-to-end (submissions arriving)
- [ ] Phone `tel:` links working
- [ ] Sitemap submitted to Google Search Console
- [ ] Analytics configured (if desired)
- [ ] All `TODO(owner-content)` placeholders replaced with real content
