import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  access: { read: () => true },
  admin: { group: 'Content' },
  upload: { mimeTypes: ['image/*'] },
  fields: [{ name: 'alt', type: 'text', label: 'Alt text' }],
}
