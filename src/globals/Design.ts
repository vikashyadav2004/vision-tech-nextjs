import type { GlobalConfig } from 'payload'

const color = (name: string, label: string, defaultValue: string, description?: string) => ({
  name,
  label,
  type: 'text' as const,
  defaultValue,
  admin: { description, placeholder: defaultValue, width: '33%' },
})

export const FONT_OPTIONS = [
  'Sora',
  'DM Sans',
  'Inter',
  'Manrope',
  'Plus Jakarta Sans',
  'Space Grotesk',
  'Outfit',
  'Poppins',
  'Montserrat',
  'Work Sans',
  'IBM Plex Sans',
  'Archivo',
  'Lora',
  'Fraunces',
  'Playfair Display',
]

export const Design: GlobalConfig = {
  slug: 'design',
  label: 'Design & Colours',
  access: { read: () => true },
  admin: { description: 'Site-wide look. Colours are hex values like #F05A22. Leave empty to use the original.' },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Colours',
          name: 'colors',
          fields: [
            {
              type: 'row',
              fields: [
                color('accent', 'Accent (buttons, highlights)', '#F05A22'),
                color('primary', 'Primary (green)', '#1F8F72', 'Labels, links, light-mode highlights'),
                color('glow', 'Glow (on dark tiles)', '#4EE0B1'),
              ],
            },
            {
              type: 'row',
              fields: [
                color('background', 'Page background', '#F5F8F7'),
                color('text', 'Text', '#0B1F1B'),
                color('muted', 'Muted text', '#566A64'),
              ],
            },
            {
              type: 'row',
              fields: [
                color('card', 'Card background', '#F4F8F7'),
                color('line', 'Borders / lines', '#DCE5E2'),
                color('dark', 'Dark sections', '#0A2A24'),
              ],
            },
            { type: 'row', fields: [color('footer', 'Footer background', '#030A0E')] },
          ],
        },
        {
          label: 'Fonts',
          name: 'fonts',
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'heading',
                  label: 'Headings font',
                  type: 'select',
                  defaultValue: 'Sora',
                  options: FONT_OPTIONS,
                },
                {
                  name: 'body',
                  label: 'Body font',
                  type: 'select',
                  defaultValue: 'DM Sans',
                  options: FONT_OPTIONS,
                },
              ],
            },
            {
              name: 'baseSize',
              label: 'Body text size (px)',
              type: 'number',
              defaultValue: 17,
              min: 14,
              max: 20,
            },
          ],
        },
        {
          label: 'Effects',
          name: 'effects',
          fields: [
            { name: 'preloader', type: 'checkbox', label: 'Show logo preloader', defaultValue: true },
            { name: 'cursorGlow', type: 'checkbox', label: 'Cursor glow', defaultValue: true },
            { name: 'progressBar', type: 'checkbox', label: 'Scroll progress bar', defaultValue: true },
            { name: 'animations', type: 'checkbox', label: 'Animations & motion', defaultValue: true },
          ],
        },
        {
          label: 'Custom CSS',
          fields: [
            {
              name: 'customCss',
              label: 'Additional CSS',
              type: 'code',
              admin: {
                language: 'css',
                description: 'Like WordPress “Additional CSS”. Loaded after the theme, so it can override anything.',
              },
            },
          ],
        },
      ],
    },
  ],
}
