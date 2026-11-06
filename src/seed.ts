/**
 * Fills the CMS with the original design + a demo “About” page that shows the
 * general-purpose sections. Run once:  npm run seed
 * Re-running is safe: it skips if pages already exist (`npm run seed -- --force` wipes & re-seeds).
 */
import path from 'path'
import { getPayload } from 'payload'
import config from './payload.config'
import {
  IMG,
  defaultDesign,
  defaultEvents,
  defaultHomeLayout,
  defaultPosts,
  defaultProducts,
  defaultSettings,
} from './lib/defaults'

/* eslint-disable @typescript-eslint/no-explicit-any */
type Any = any

const payload = await getPayload({ config })
const force = process.argv.includes('--force')

const existing = await payload.count({ collection: 'pages' })
if (existing.totalDocs > 0 && !force) {
  payload.logger.info('CMS already has pages – skipping. Use `npm run seed -- --force` to wipe and re-seed.')
  process.exit(0)
}
if (force) {
  for (const collection of ['pages', 'products', 'posts', 'events', 'media'] as const) {
    await payload.delete({ collection, where: { id: { exists: true } } })
  }
}

/* 1. Images ---------------------------------------------------------------- */
const alts: Record<string, string> = {
  [IMG.fire]: 'Firefighters responding to an incident',
  [IMG.work]: 'Security team at work',
  [IMG.screening]: 'Event screening',
  [IMG.hazmat]: 'Responders in hazmat suits',
  [IMG.logo]: 'Visiontec Systems',
  [IMG.pendar]: 'Pendar X10',
  [IMG.hovermap]: 'HoverMap ST',
  [IMG.xplorir]: 'XplorIR',
  [IMG.newsLithium]: 'Lithium-ion battery fire',
  [IMG.newsEvents]: 'Public event screening',
  [IMG.newsNaval]: 'Naval vessel',
}
const media: Record<string, number | string> = {}
for (const [src, alt] of Object.entries(alts)) {
  const doc = await payload.create({
    collection: 'media',
    data: { alt },
    filePath: path.resolve(process.cwd(), 'public', src.replace(/^\//, '')),
  })
  media[src] = doc.id
  payload.logger.info(`Uploaded ${src}`)
}

/** Swap every /images/... string for its uploaded media id. */
const withMedia = (v: Any): Any => {
  if (typeof v === 'string') return media[v] ?? v
  if (Array.isArray(v)) return v.map(withMedia)
  if (v && typeof v === 'object') return Object.fromEntries(Object.entries(v).map(([k, x]) => [k, withMedia(x)]))
  return v
}

/* 2. Products, articles, events ------------------------------------------- */
const productIds: Record<string, number | string> = {}
for (const [i, p] of defaultProducts.entries()) {
  const doc = await payload.create({ collection: 'products', data: withMedia({ ...p, sortOrder: i }) })
  productIds[p.name] = doc.id
}
for (const [i, p] of defaultPosts.entries()) {
  await payload.create({ collection: 'posts', data: withMedia({ ...p, sortOrder: i }) })
}
for (const [i, e] of defaultEvents.entries()) {
  await payload.create({ collection: 'events', data: { ...e, sortOrder: i } })
}

/* 3. Globals --------------------------------------------------------------- */
await payload.updateGlobal({ slug: 'site-settings', data: withMedia(defaultSettings) })
await payload.updateGlobal({ slug: 'design', data: defaultDesign as Any })

/* 4. Pages ----------------------------------------------------------------- */
const home = defaultHomeLayout.map((b: Any) =>
  b.blockType === 'hero' ? { ...b, featuredProduct: productIds[b.featuredProduct] } : b,
)
await payload.create({
  collection: 'pages',
  data: { title: 'Home', slug: 'home', layout: withMedia(home), _status: 'published' } as Any,
})

// Tiny Lexical rich-text builder for the demo page
const text = (t: string, format = 0) => ({ type: 'text', text: t, format, style: '', mode: 'normal', detail: 0, version: 1 })
const para = (...children: Any[]) => ({ type: 'paragraph', format: '', indent: 0, version: 1, direction: 'ltr', textFormat: 0, children })
const rich = (...children: Any[]) => ({ root: { type: 'root', format: '', indent: 0, version: 1, direction: 'ltr', children } })
const s = (anchor = '', background = 'default') => ({ background, spacing: 'default', anchor, hidden: false })

await payload.create({
  collection: 'pages',
  data: {
    title: 'About',
    slug: 'about',
    _status: 'published',
    meta: { description: 'Visiontec Systems supplies CBRNE detection and security screening equipment across Canada.' },
    layout: withMedia([
      {
        blockType: 'content',
        tag: 'About Visiontec',
        heading: 'Equipment and expertise for the moments that matter.',
        body: rich(
          para(
            text('Visiontec Systems supplies '),
            text('chemical, biological, radiological, nuclear and explosive', 1),
            text(' detection equipment to first responders, critical infrastructure and event organisers.'),
          ),
          para(text('This is a demo page built entirely from CMS sections. Edit, reorder or delete any of them in the admin.')),
        ),
        buttons: [{ label: 'Talk to an expert', href: '/#contact' }],
        align: 'left',
        width: 'narrow',
        settings: s(),
      },
      {
        blockType: 'stats',
        tag: 'At a glance',
        heading: 'Trusted in the field.',
        items: [
          { value: '5', label: 'CBRNE threat categories covered' },
          { value: 'Buy', label: 'or rent equipment' },
          { value: '24/7', label: 'support after delivery' },
        ],
        settings: s('', 'white'),
      },
      {
        blockType: 'imageText',
        tag: 'Our approach',
        heading: 'We start with your site, not a catalogue.',
        body: rich(
          para(text('Every engagement begins with an assessment of your threats, site and team. We then recommend proven equipment and stay available long after delivery.')),
        ),
        buttons: [{ label: 'See how it works', href: '/#how' }],
        image: IMG.work,
        imagePosition: 'right',
        settings: s(),
      },
      {
        blockType: 'cards',
        tag: 'Who we help',
        heading: 'Built for every kind of responder.',
        columns: '3',
        items: [
          { image: IMG.fire, title: 'Fire & hazmat', text: 'Identify unknown substances from a safe distance.', link: { label: 'Community safety', href: '/#solutions' } },
          { image: IMG.screening, title: 'Event security', text: 'Rent screening equipment for summits and venues.', link: { label: 'Event screening', href: '/#solutions' } },
          { image: IMG.hazmat, title: 'Critical infrastructure', text: 'Integrated protection for people and facilities.', link: { label: 'Premises safety', href: '/#solutions' } },
        ],
        settings: s('', 'tint'),
      },
      {
        blockType: 'faq',
        tag: 'FAQ',
        heading: 'Common questions.',
        intro: 'Can’t find what you need? Get in touch.',
        items: [
          { question: 'Can I rent equipment instead of buying it?', answer: 'Yes. Most screening and detection equipment is available to rent for temporary events.' },
          { question: 'Do you provide training?', answer: 'Our team guides you on choosing and using the equipment, and stays available after delivery.' },
          { question: 'Where do you operate?', answer: 'We are based in Georgetown, Ontario and work with organisations across Canada.' },
        ],
        settings: s(),
      },
      {
        blockType: 'contact',
        heading: 'Be ready for the unimaginable.',
        text: 'Tell us what you need to protect.',
        buttons: [
          { label: 'Contact Visiontec', href: '#' },
          { label: 'Rental form', href: '#' },
        ],
        settings: s(),
      },
    ]),
  } as Any,
})

payload.logger.info('✅ Seed complete – open http://localhost:3000/admin to edit. Demo page: /about')
process.exit(0)
