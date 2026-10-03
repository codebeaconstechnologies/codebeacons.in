# AI Agent and Coding Standards

These instructions apply to every AI coding assistant and automated coding agent working in this repository. Follow them alongside any more specific instructions in subdirectories.

## Project context

- This is the Code Beacons Technologies public website, built with Next.js 15 App Router, React 19, TypeScript, and Tailwind CSS.
- The site includes public marketing pages, a blog, contact form, certificate verification pages, and admin/payslip features.
- Production runs as a Cloudflare Worker using OpenNext. `wrangler.jsonc` defines its bindings and custom domains.
- `next-sitemap.config.js` generates the sitemap and `robots.txt`; blog content is sourced from `src/data/blogs.json`.
- Use the existing project conventions and nearby implementations before introducing a new pattern or dependency.

## Working practices

1. Read the relevant files and trace existing behavior before editing. Search for existing helpers, components, and patterns first.
2. Make the smallest complete change that solves the request. Do not refactor unrelated code or overwrite user changes.
3. Keep TypeScript types explicit and accurate. Prefer existing types and guards; avoid `any`, unsafe casts, and silently swallowed errors.
4. Preserve existing behavior and user-facing design unless the requested change requires otherwise. Reuse shared components and utilities.
5. Keep source formatting consistent with adjacent files. Avoid broad formatting or generated-file churn.
6. Update relevant tests and documentation when behavior or setup changes. Do not add dependencies unless necessary.
7. Report what changed, what verification ran, and any limitations or follow-up the user must handle.

## Coding standards

- Use the Next.js App Router and server components by default. Add client components only when browser state, event handlers, or client-only APIs require them.
- Keep route-specific metadata with its route. Use descriptive titles, accurate descriptions, canonical URLs, and appropriate robots directives.
- Public indexable pages should have a valid canonical URL and be included in the sitemap. Keep admin, API, certificate, and generated-image routes excluded or noindexed as appropriate.
- Keep structured data valid and consistent with visible page content. Never invent business facts, reviews, credentials, or service claims for SEO.
- Use semantic HTML, accessible labels, keyboard-operable controls, meaningful image alt text, and responsive styling.
- Validate and normalize all untrusted input at API boundaries. Enforce authorization on the server; do not rely on UI or middleware alone to protect data.
- Never expose secrets, credentials, private employee data, payslip contents, or sensitive environment values in source, logs, client bundles, or generated documentation.
- Avoid broad `catch` blocks, silent fallbacks, and success-shaped error responses. Surface failures using the project's established error handling.
- Preserve Cloudflare/OpenNext compatibility. Use supported bindings and existing Cloudflare helpers; do not assume Node.js APIs or local filesystem behavior are available in production.

## SEO and routing

- The canonical production origin is `https://codebeacons.in`. Do not add `www` or HTTP URLs to canonical metadata or the sitemap.
- Redirect legacy URLs permanently to their canonical destination. Avoid redirect loops and verify query strings and paths behave as intended.
- Keep `public/robots.txt`, `public/sitemap.xml`, `next-sitemap.config.js`, and route metadata aligned. Prefer generated sitemap content over manually maintained duplicates.
- Do not submit generated images, admin pages, APIs, or other non-page resources as indexable sitemap URLs.

## Verification

Run the smallest relevant checks after changes. For application or configuration changes, normally run:

```sh
npm run build
```

For a Cloudflare deployment change, also verify the OpenNext build/deploy path and test relevant production routes, redirects, metadata, and static assets. Use the project's existing scripts:

```sh
npm run deploy
npm run preview
```

Do not claim a check passed unless it was actually run. Note when a check could not be run or when the environment prevents verification.

## Git and deployment safety

- Do not commit or push unless the user asks.
- Do not deploy to production unless the user explicitly asks or approves it.
- Production deploys can change Cloudflare Worker routes, domains, bindings, and dashboard-managed configuration. Review the diff and deployment target before proceeding; call out configuration drift and failures.
- Do not discard, reset, or overwrite changes that were not made for the current task.
- Never commit `.env` files, tokens, credentials, local settings, build output, or other generated/private data.
- Keep commits focused and use a clear imperative summary when commits are requested.
