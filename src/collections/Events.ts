import type { CollectionConfig } from 'payload'

export const Events: CollectionConfig = {
  slug: 'events',
  access: { read: () => true },
  defaultSort: 'sortOrder',
  admin: { group: 'Content', useAsTitle: 'date', defaultColumns: ['date', 'description', 'sortOrder'] },
  fields: [
    { name: 'date', type: 'text', required: true, admin: { description: 'Shown as written, e.g. “July 14 to 16, 2026”.' } },
    { name: 'description', type: 'textarea', required: true },
    { name: 'href', type: 'text', label: 'Link (optional)' },
    { name: 'sortOrder', type: 'number', defaultValue: 0, admin: { position: 'sidebar' } },
  ],
}