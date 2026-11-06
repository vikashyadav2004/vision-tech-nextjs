import type { CollectionConfig } from 'payload'
import { allBlocks } from '../blocks/config'

const serverURL = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'
const pageUrl = (slug?: string | null) => `${serverURL}/${!slug || slug === 'home' ? '' : slug}?preview=true`

export const Pages: CollectionConfig = {
  slug: 'pages',
  access: {
    // Visitors only see published pages; logged-in editors also see drafts.
    read: ({ req }) => (req.user ? true : { _status: { equals: 'published' } }),
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', '_status', 'updatedAt'],
    description: 'Build pages from sections. The page with slug “home” is your homepage.',
    livePreview: { url: ({ data }) => pageUrl(data?.slug as string) },
    preview: (doc) => pageUrl(doc?.slug as string),
  },
  versions: {
    drafts: { autosave: { interval: 400 } },
    maxPerDoc: 30,
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      admin: {
        position: 'sidebar',
        description: 'The URL: “about” → /about. Use “home” for the homepage.',
      },
      hooks: {
        beforeValidate: [
          ({ value, data }) =>
            String(value || data?.title || '')
              .toLowerCase()
              .trim()
              .replace(/[^a-z0-9/]+/g, '-')
              .replace(/^-+|-+$/g, ''),
        ],
      },
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Sections',
          fields: [
            {
              name: 'layout',
              label: 'Page sections',
              type: 'blocks',
              blocks: allBlocks,
              admin: { initCollapsed: true },
            },
          ],
        },
        {
          label: 'SEO',
          name: 'meta',
          fields: [
            { name: 'title', type: 'text', label: 'Meta title' },
            { name: 'description', type: 'textarea', label: 'Meta description' },
            { name: 'image', type: 'upload', relationTo: 'media', label: 'Share image' },
          ],
        },
      ],
    },
  ],
}
