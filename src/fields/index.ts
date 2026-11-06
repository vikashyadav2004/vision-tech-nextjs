import type { Field } from 'payload'

/** A button / link: label + URL side by side. */
export const link = (name: string, label?: string): Field => ({
  name,
  label: label ?? name,
  type: 'group',
  fields: [
    {
      type: 'row',
      fields: [
        { name: 'label', type: 'text' },
        {
          name: 'href',
          type: 'text',
          label: 'Link',
          admin: { description: 'A page (/about), a section (#contact) or a full URL (https://…)' },
        },
      ],
    },
  ],
})

/** A list of buttons (first one is solid, the rest are outlined). */
export const buttons = (name = 'buttons'): Field => ({
  name,
  type: 'array',
  maxRows: 3,
  fields: [
    {
      type: 'row',
      fields: [
        { name: 'label', type: 'text', required: true },
        { name: 'href', type: 'text', label: 'Link', required: true },
      ],
    },
  ],
})

export const image = (name = 'image', label = 'Image'): Field => ({
  name,
  label,
  type: 'upload',
  relationTo: 'media',
})

export const sectionHeader = (withIntro = false): Field[] => [
  {
    type: 'row',
    fields: [
      { name: 'tag', type: 'text', label: 'Small label above heading' },
      { name: 'heading', type: 'text' },
    ],
  },
  ...(withIntro ? [{ name: 'intro', type: 'textarea' } as Field] : []),
]

/**
 * Design controls every block gets – the "WordPress block settings" panel.
 * Stored under `settings` on each block.
 */
export const sectionSettings: Field = {
  name: 'settings',
  label: 'Section design',
  type: 'group',
  admin: { description: 'Optional – leave as “Default” to keep the original look.' },
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'background',
          type: 'select',
          defaultValue: 'default',
          options: [
            { label: 'Default', value: 'default' },
            { label: 'Page background', value: 'page' },
            { label: 'White', value: 'white' },
            { label: 'Soft tint', value: 'tint' },
            { label: 'Dark', value: 'dark' },
            { label: 'Custom colour', value: 'custom' },
          ],
        },
        {
          name: 'customColor',
          type: 'text',
          label: 'Custom background (hex)',
          admin: {
            placeholder: '#0A2A24',
            condition: (_, sib) => sib?.background === 'custom',
          },
        },
        {
          name: 'customTextColor',
          type: 'select',
          label: 'Text on custom colour',
          defaultValue: 'dark',
          options: [
            { label: 'Dark text', value: 'dark' },
            { label: 'Light text', value: 'light' },
          ],
          admin: { condition: (_, sib) => sib?.background === 'custom' },
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'spacing',
          label: 'Top & bottom spacing',
          type: 'select',
          defaultValue: 'default',
          options: [
            { label: 'Default', value: 'default' },
            { label: 'None', value: 'none' },
            { label: 'Small', value: 'sm' },
            { label: 'Medium', value: 'md' },
            { label: 'Large', value: 'lg' },
          ],
        },
        {
          name: 'anchor',
          type: 'text',
          label: 'Section ID (for #links)',
          admin: { description: 'e.g. “pricing” → link to it with #pricing' },
        },
        { name: 'hidden', type: 'checkbox', label: 'Hide this section', defaultValue: false },
      ],
    },
  ],
}
