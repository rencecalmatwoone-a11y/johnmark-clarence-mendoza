# React + Vite

## Visitor activity

The hero includes a view counter and a clickable strip showing the four most recent
anonymous visitors. Each visible visitor gets a different Frank Ocean portrait;
portraits follow the site's light/dark theme. Click the strip to see visit times.

To enable counts shared across all browsers:

1. Create a Supabase project and run [`supabase/visitor-tracking.sql`](supabase/visitor-tracking.sql)
   in its SQL editor.
2. Copy `.env.example` to `.env.local`. Set `VITE_SUPABASE_URL` and
   `VITE_SUPABASE_PUBLISHABLE_KEY` from the project's Connect dialog. Use a public
   publishable key, never a secret or service-role key.
3. Restart `npm run dev`. For hosting, add those same two environment variables
   to the hosting project's settings and rebuild/redeploy.

Without configuration, the widget explicitly shows **this browser** and only
counts local page loads. Local counts are not uploaded when Supabase is connected.
There are no fabricated visitors or initial counts. With Supabase, it records one
view per page load, deduplicates retries, and refreshes recent activity every minute
while the tab is visible. Theme changes and opening the visitor list do not add views.
Returning browser profiles increase views but do not increase unique visitors.
Clearing storage or using another browser creates another anonymous visitor.

The database stores random browser IDs and visit times, with no names, IP addresses,
or locations collected by this feature. Only totals and the four most recent anonymous
aliases are returned; raw browser IDs remain private. Counts are approximate: anonymous
public counters can include automated traffic. The `page_views` table retains request
IDs for retry deduplication; monitor its size as traffic grows.

The SQL uses restricted database functions and private tables, following the
[Supabase function guidance](https://supabase.com/docs/guides/database/functions).
Backend setup is required before this becomes a site-wide counter.

Validation: `npm run lint`, `npm run build`, and `node --test tests/visitorTracking.test.js`.
Avatar assets and generation prompts are documented in
[`src/assets/visitors/README.md`](src/assets/visitors/README.md).

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and Oxlint's TypeScript related rules in your project.
