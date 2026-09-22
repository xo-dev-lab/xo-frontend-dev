# TODO - Fix Vercel SPA 404 on /contact

## Steps

- [x] Create `vercel.json` with SPA rewrite rule (`/(.*)` -> `/index.html`)
- [x] `src/layouts/PublicLayout/PublicLayout.tsx`:
  - Replace `window.location.href = item.to!` with `navigate(item.to!)` in `handleNavClick`
  - Replace Request Quote `window.location.href = '/contact'` with `navigate('/contact')`
- [x] `src/sections/ContactCTA/ContactCTA.tsx`:
  - Import `useNavigate`, add hook
  - Replace `window.location.href = '/contact'` with `navigate('/contact')`
- [x] Run `npm run build` to verify TypeScript + Vite build passes
- [x] Commit changes (git add/commit/push) to trigger Vercel redeploy

