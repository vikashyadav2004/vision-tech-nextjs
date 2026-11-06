# Visiontec Systems – Next.js + Payload CMS (page builder)

The Visiontec light redesign rebuilt as **Next.js 15 + Payload CMS 3**, working like WordPress:

- **Pages** made of **sections** you add, drag to reorder, hide or delete
- **18 section types**: the 10 from the original design plus Text, Image + text, Cards, Stats, FAQ, Video, Gallery and Custom HTML
- **Design & Colours**: change accent/brand colours, fonts, text size, effects and add custom CSS without code
- **Section design** on every section: background (white, tint, dark, any hex colour), spacing, anchor ID, hide
- **Live preview** while you type, plus **drafts** (save without publishing) and **version history**
- Free and open source; SQLite means no database server

## Quick start

Requires Node.js 20.9+.

```bash
npm install
cp .env.example .env     # put a long random string in PAYLOAD_SECRET
npm run dev
```

In a second terminal, once:

```bash
npm run seed
```

- Site: http://localhost:3000 (demo page: http://localhost:3000/about)
- Admin: http://localhost:3000/admin (create your login on first visit)

## Using the CMS

| WordPress | Here |
| --- | --- |
| Pages → Add New | **Pages → Create New**. Slug `about` → `/about`. Slug `home` is the homepage. |
| Gutenberg blocks | **Page sections → Add Page section**. Drag the ⠿ handle to reorder. |
| Block settings sidebar | **Section design** at the bottom of every section |
| Preview | **Live Preview** button (top right of a page). Mobile / tablet / desktop sizes. |
| Save Draft / Publish | Changes autosave as a draft; **Publish changes** makes them live |
| Revisions | **Versions** tab on a page |
| Appearance → Customize | **Globals → Design & Colours** |
| Additional CSS | **Design & Colours → Custom CSS** |
| Menus / footer | **Globals → Header & Footer** |
| Media Library | **Content → Media** |

**Linking:** to a page use `/about`; to a section on the homepage use `/#products`; to a section on the same page use `#products`. A section's ID is set in its **Section design → Section ID**.

## Section types

Original design: Hero (animated), Statement (word highlight), Stacked cards, Expanding panels, Scrolling words, Products grid, Image banner, Numbered steps, News & events, Closing call-to-action.

General: Text (rich text editor), Image + text, Cards grid, Numbers / stats, FAQ, Video (YouTube/Vimeo), Image gallery, Custom HTML / embed.

## Adding a new section type in code

1. Add a block schema to `src/blocks/config.ts` (wrap it in `withSettings(...)` and add it to `allBlocks`).
2. Add a component in `src/blocks/components/` – root element gets `{...sectionProps(b.settings)}`.
3. Register it in `src/blocks/RenderBlocks.tsx`.
4. Add styles to `src/app/(frontend)/blocks.css` using the theme variables (`--or`, `--gr`, `--tx`, `--mu`, `--lcard`, `--lln`, `--d`, `--b`).

## Project layout

```
src/
  app/(frontend)/[[...slug]]/page.tsx   renders any page from the CMS
  app/(frontend)/layout.tsx             header, footer, theme, effects
  app/(frontend)/globals.css            original design CSS (colours turned into variables)
  app/(frontend)/blocks.css             new sections + section design options
  app/(payload)/                        admin + API (boilerplate)
  blocks/                               section schemas, components, renderer
  collections/  globals/  fields/       CMS schema
  components/                           Header, Footer, Interactions (original animations), ThemeStyle
  lib/defaults.ts                       original content (seed + fallback)
  seed.ts
```

## Going live

Set `NEXT_PUBLIC_SERVER_URL` to your real domain (live preview needs it).

**VPS / Railway / Render (keeps SQLite):** give the app a persistent disk for `visiontec.db` and `media/`, then

```bash
npx payload migrate:create
npm run build
npx payload migrate
npm start
```

**Vercel:** use a free Postgres (e.g. Neon) with `@payloadcms/db-postgres` and store uploads with `@payloadcms/storage-vercel-blob`. Only `payload.config.ts` changes.

## Troubleshooting

- **Admin shows a missing-component error:** `npm run generate:importmap`, then restart.
- **Start content over:** `npm run seed -- --force`.
- **Live preview doesn't update:** check `NEXT_PUBLIC_SERVER_URL` matches the address in your browser.
