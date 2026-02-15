# PostHog post-wizard report

The wizard has completed a deep integration of PostHog analytics into your Erstwähler Forum 2026 TanStack Start project. The integration includes:

- **Client-side tracking** via `@posthog/react` with `PostHogProvider` wrapping your app in `__root.tsx`
- **Server-side PostHog client** utility in `src/lib/posthog-server.ts` for future server-side event capture
- **Reverse proxy configuration** in `vite.config.ts` routing `/ingest` to PostHog EU to avoid ad blockers
- **Environment variables** configured in `.env` for the PostHog API key and host
- **10 custom events** tracking key user interactions across the site

## Events Implemented

| Event Name | Description | File Path |
|------------|-------------|-----------|
| `cta_clicked` | User clicked the primary CTA button on the homepage to learn about the concept | `src/routes/index.tsx` |
| `team_link_clicked` | User clicked to explore the team page from the homepage | `src/routes/index.tsx` |
| `blog_link_clicked` | User clicked to view news/blog from the homepage | `src/routes/index.tsx` |
| `blog_post_selected` | User selected a specific blog post to read from the blog list | `src/routes/blog/index.tsx` |
| `team_member_selected` | User clicked to view a specific team member's profile | `src/routes/team/index.tsx` |
| `team_member_email_clicked` | User clicked email contact link on a team member profile | `src/routes/team/$vorname.tsx` |
| `team_member_mastodon_clicked` | User clicked Mastodon social link on a team member profile | `src/routes/team/$vorname.tsx` |
| `school_website_clicked` | User clicked through to a partner school's website | `src/routes/traeger/index.tsx` |
| `locale_changed` | User changed the website language/locale | `src/components/LocaleSwitcher.tsx` |
| `mobile_menu_opened` | User opened the mobile navigation menu | `src/components/Header.tsx` |

## Next steps

We've built some insights and a dashboard for you to keep an eye on user behavior, based on the events we just instrumented:

### Dashboard
- Analytics basics - Core analytics dashboard for the EWF 2026 website

### Insights
- Homepage Navigation Clicks - Tracks CTA, team, and blog link clicks from homepage
- Content Engagement - Tracks blog posts read and team profiles viewed
- Team Contact Engagement - Tracks email and Mastodon contact clicks
- Partner School Interest - Tracks clicks to partner school websites by school
- User Experience Signals - Tracks language changes and mobile menu usage

### Agent skill

We've left an agent skill folder in your project at `.claude/skills/posthog-integration-tanstack-start/`. You can use this context for further agent development when using Claude Code. This will help ensure the model provides the most up-to-date approaches for integrating PostHog.
