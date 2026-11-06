import type { GlobalConfig } from 'payload'
import { image, link } from '../fields'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Header & Footer',
  admin: { description: 'Menu links can point to pages (/about) or homepage sections (/#products).' },
  access: { read: () => true },
  fields: [
    { name: 'siteTitle', type: 'text', label: 'Site name', admin: { description: 'Used in browser tab titles: “Page title | Site name”.' } },
    image('logo', 'Logo'),
    {
      name: 'navLinks',
      label: 'Menu links',
      type: 'array',
      fields: [
        {
          type: 'row',
          fields: [
            { name: 'label', type: 'text', required: true },
            { name: 'href', type: 'text', required: true },
          ],
        },
      ],
    },
    link('navCta', 'Menu button'),
    { name: 'address', type: 'textarea', admin: { description: 'Shown in the footer. New lines are kept.' } },
    {
      name: 'footerColumns',
      type: 'array',
      maxRows: 4,
      fields: [
        { name: 'heading', type: 'text', required: true },
        {
          name: 'links',
          type: 'array',
          fields: [
            {
              type: 'row',
              fields: [
                { name: 'label', type: 'text', required: true },
                { name: 'href', type: 'text', required: true },
              ],
            },
          ],
        },
      ],
    },
    {
      type: 'row',
      fields: [
        { name: 'copyright', type: 'text' },
        { name: 'backToTop', type: 'text', label: '“Back to top” label' },
      ],
    },
  ],
}
