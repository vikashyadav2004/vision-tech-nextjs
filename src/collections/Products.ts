import type { CollectionConfig } from 'payload'

export const Products: CollectionConfig = {
  slug: 'products',
  access: { read: () => true },
  defaultSort: 'sortOrder',
  admin: {
    group: 'Content',
    useAsTitle: 'name',
    defaultColumns: ['name', 'summary', 'sortOrder'],
    description: 'Shown by the “Products grid” section and the hero’s featured tile.',
  },
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'summary', type: 'textarea', required: true },
    { name: 'image', type: 'upload', relationTo: 'media' },
    {
      type: 'row',
      fields: [
        { name: 'ctaLabel', type: 'text', label: 'Button label', defaultValue: 'Learn more' },
        { name: 'ctaHref', type: 'text', label: 'Button link', defaultValue: '#contact' },
      ],
    },
    {
      name: 'sortOrder',
      type: 'number',
      defaultValue: 0,
      admin: { position: 'sidebar', description: 'Lower numbers show first.' },
    },
  ],
}
