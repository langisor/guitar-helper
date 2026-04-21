<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Developer Commands

```bash
npm run dev      # Start dev server (Turbopack)
npm run build    # Production build
npm run start    # Run production server
npm run lint      # ESLint (no typecheck or test scripts)
```

## Project Structure

- `src/` - All source code (not `app/` at root)
- `@/*` → `./src/*` (configured in tsconfig.json)
- `src/app/` - Next.js App Router pages
- `src/chords/` - Core domain: components, hooks, services, repositories

## Key Conventions

- **Chord key normalization**: JSON uses `Csharp` not `C#`; the `useChord` hook handles conversion
- **Server Components**: `src/app/*/page.tsx` fetch data; `src/chords/components/*.tsx` handle interactivity
- **State**: Uses `@hookstate/core` for global state (e.g., left-handed mode), `@tanstack/react-query` for async data
- **Styling**: Tailwind CSS v4 (no `postcss.config.js` - bundled in Next.js)
- **React Compiler**: Enabled in next.config.ts; check for compiler-specific syntax requirements

## Shadcn Components

All shadcn components are manually in `src/components/ui/`. No `npx shadcn` commands needed.