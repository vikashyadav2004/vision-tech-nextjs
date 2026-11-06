import type { CollectionConfig } from 'payload'

export const Posts: CollectionConfig = {
  slug: 'posts',
  labels: { singular: 'News article', plural: 'News articles' },
  access: { read: () => true },
  defaultSort: 'sortOrder',
  admin: {
    group: 'Content',
    useAsTitle: 'title',
    defaultColumns: ['title', 'sortOrder'],
    description: 'Shown by the “News & events” section, in sort order.',
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'excerpt', type: 'textarea' },
    { name: 'image', type: 'upload', relationTo: 'media' },
    {
      type: 'row',
      fields: [
        { name: 'linkLabel', type: 'text', defaultValue: 'Read more' },
        { name: 'href', type: 'text', label: 'Link', defaultValue: '#' },
      ],
    },
    { name: 'sortOrder', type: 'number', defaultValue: 0, admin: { position: 'sidebar' } },
  ],
}
