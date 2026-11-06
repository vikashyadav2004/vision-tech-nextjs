import type { Block } from 'payload'
import { buttons, image, link, sectionHeader, sectionSettings } from '../fields'

/* ------------------------------------------------------------------------ *
 * Page-builder sections. Editors pick these from “Add section” on a page,
 * then drag to reorder – like WordPress blocks.
 * To add your own: add a Block here, a component in ./components, and
 * register both in ./RenderBlocks.tsx.
 * ------------------------------------------------------------------------ */

const withSettings = (block: Block): Block => ({ ...block, fields: [...block.fields, sectionSettings] })

const richText = (name = 'body', label = 'Text') => ({ name, label, type: 'richText' as const })

/* ===== Original design sections ===== */

export const HeroBlock = withSettings({
  slug: 'hero',
  labels: { singular: 'Hero (animated)', plural: 'Heroes' },
  fields: [
    image('background', 'Background texture'),
    {
      type: 'row',
      fields: [
        { name: 'badge', type: 'text', label: 'Pill badge', defaultValue: 'New' },
        { name: 'pillText', type: 'text', label: 'Pill text' },
        { name: 'pillHref', type: 'text', label: 'Pill link' },
      ],
    },
    {
      type: 'row',
      fields: [
        { name: 'titleLine1', type: 'text', label: 'Headline line 1' },
        { name: 'titleLine2', type: 'text', label: 'Headline line 2 (gradient)' },
      ],
    },
    { name: 'subtitle', type: 'textarea' },
    link('primaryCta', 'Primary button'),
    link('secondaryCta', 'Secondary button'),
    {
      name: 'showGrid',
      type: 'checkbox',
      label: 'Show the image grid',
      defaultValue: true,
    },
    {
      type: 'collapsible',
      label: 'Image grid',
      admin: { condition: (_, sib) => sib?.showGrid !== false },
      fields: [
        { name: 'tileCommunity', type: 'group', label: 'Large tile', fields: [{ name: 'label', type: 'text' }, image()] },
        { name: 'signalTitle', type: 'text', label: 'Signal tile title', defaultValue: 'Live threat signal' },
        { name: 'tileCbrne', type: 'group', label: 'Small tile', fields: [{ name: 'label', type: 'text' }, image()] },
        { name: 'tilePremises', type: 'group', label: 'Bottom tile', fields: [{ name: 'label', type: 'text' }, image()] },
        {
          type: 'row',
          fields: [
            { name: 'featuredLabel', type: 'text', defaultValue: 'Featured product' },
            { name: 'featuredLinkLabel', type: 'text', defaultValue: 'Learn more' },
          ],
        },
        { name: 'featuredProduct', type: 'relationship', relationTo: 'products' },
      ],
    },
    { name: 'features', label: 'Check-mark features', type: 'array', fields: [{ name: 'text', type: 'text', required: true }] },
  ],
})

export const StatementBlock = withSettings({
  slug: 'statement',
  labels: { singular: 'Statement (word highlight)', plural: 'Statements' },
  fields: [{ name: 'text', type: 'textarea', required: true }],
})

export const SolutionsBlock = withSettings({
  slug: 'solutions',
  labels: { singular: 'Stacked cards', plural: 'Stacked cards' },
  fields: [
    ...sectionHeader(),
    {
      name: 'items',
      type: 'array',
      fields: [{ name: 'title', type: 'text', required: true }, { name: 'text', type: 'textarea' }, link('cta', 'Button'), image()],
    },
  ],
})

export const SpectrumBlock = withSettings({
  slug: 'spectrum',
  labels: { singular: 'Expanding panels', plural: 'Expanding panels' },
  fields: [
    ...sectionHeader(true),
    {
      name: 'items',
      type: 'array',
      maxRows: 7,
      fields: [
        {
          type: 'row',
          fields: [
            { name: 'letter', type: 'text', required: true },
            { name: 'name', type: 'text', required: true },
          ],
        },
        { name: 'text', type: 'textarea' },
        image(),
        { name: 'position', type: 'text', label: 'Image focus (e.g. 12% 50%)' },
      ],
    },
  ],
})

export const MarqueeBlock = withSettings({
  slug: 'marquee',
  labels: { singular: 'Scrolling words', plural: 'Scrolling words' },
  fields: [
    { name: 'row1', type: 'array', fields: [{ name: 'word', type: 'text', required: true }] },
    { name: 'row2', type: 'array', fields: [{ name: 'word', type: 'text', required: true }] },
  ],
})

export const ProductsBlock = withSettings({
  slug: 'products',
  labels: { singular: 'Products grid', plural: 'Products grids' },
  fields: [
    ...sectionHeader(true),
    {
      name: 'source',
      type: 'radio',
      defaultValue: 'all',
      options: [
        { label: 'All products (by sort order)', value: 'all' },
        { label: 'Pick products', value: 'selected' },
      ],
    },
    {
      name: 'selected',
      type: 'relationship',
      relationTo: 'products',
      hasMany: true,
      admin: { condition: (_, sib) => sib?.source === 'selected' },
    },
    { name: 'limit', type: 'number', defaultValue: 3, admin: { condition: (_, sib) => sib?.source !== 'selected' } },
  ],
})

export const BannerBlock = withSettings({
  slug: 'banner',
  labels: { singular: 'Image banner', plural: 'Image banners' },
  fields: [{ name: 'heading', type: 'text' }, { name: 'text', type: 'textarea' }, link('cta', 'Button'), image()],
})

export const StepsBlock = withSettings({
  slug: 'steps',
  labels: { singular: 'Numbered steps', plural: 'Numbered steps' },
  fields: [
    ...sectionHeader(),
    { name: 'steps', type: 'array', fields: [{ name: 'title', type: 'text', required: true }, { name: 'text', type: 'textarea' }] },
  ],
})

export const NewsBlock = withSettings({
  slug: 'news',
  labels: { singular: 'News & events', plural: 'News & events' },
  fields: [
    ...sectionHeader(),
    {
      type: 'row',
      fields: [
        { name: 'postsLimit', type: 'number', label: 'Articles to show', defaultValue: 3 },
        { name: 'showEvents', type: 'checkbox', label: 'Show events list', defaultValue: true },
      ],
    },
  ],
})

export const ContactBlock = withSettings({
  slug: 'contact',
  labels: { singular: 'Closing call-to-action', plural: 'Closing CTAs' },
  fields: [{ name: 'heading', type: 'text' }, { name: 'text', type: 'textarea' }, buttons()],
})

/* ===== General-purpose sections ===== */

export const ContentBlock = withSettings({
  slug: 'content',
  labels: { singular: 'Text', plural: 'Text' },
  fields: [
    ...sectionHeader(),
    richText(),
    buttons(),
    {
      type: 'row',
      fields: [
        {
          name: 'align',
          type: 'select',
          defaultValue: 'left',
          options: [
            { label: 'Left', value: 'left' },
            { label: 'Centre', value: 'center' },
          ],
        },
        {
          name: 'width',
          type: 'select',
          defaultValue: 'narrow',
          options: [
            { label: 'Narrow (reading width)', value: 'narrow' },
            { label: 'Wide', value: 'wide' },
          ],
        },
      ],
    },
  ],
})

export const ImageTextBlock = withSettings({
  slug: 'imageText',
  labels: { singular: 'Image + text', plural: 'Image + text' },
  fields: [
    ...sectionHeader(),
    richText(),
    buttons(),
    image(),
    {
      name: 'imagePosition',
      type: 'radio',
      defaultValue: 'right',
      options: [
        { label: 'Image on the right', value: 'right' },
        { label: 'Image on the left', value: 'left' },
      ],
    },
  ],
})

export const CardsBlock = withSettings({
  slug: 'cards',
  labels: { singular: 'Cards grid', plural: 'Cards grids' },
  fields: [
    ...sectionHeader(true),
    {
      name: 'columns',
      type: 'select',
      defaultValue: '3',
      options: ['2', '3', '4'].map((v) => ({ label: `${v} per row`, value: v })),
    },
    {
      name: 'items',
      type: 'array',
      fields: [
        image(),
        { name: 'title', type: 'text', required: true },
        { name: 'text', type: 'textarea' },
        link('link', 'Link (optional)'),
      ],
    },
  ],
})

export const StatsBlock = withSettings({
  slug: 'stats',
  labels: { singular: 'Numbers / stats', plural: 'Numbers / stats' },
  fields: [
    ...sectionHeader(),
    {
      name: 'items',
      type: 'array',
      maxRows: 6,
      fields: [
        {
          type: 'row',
          fields: [
            { name: 'value', type: 'text', required: true, admin: { placeholder: '25+' } },
            { name: 'label', type: 'text', required: true },
          ],
        },
      ],
    },
  ],
})

export const FaqBlock = withSettings({
  slug: 'faq',
  labels: { singular: 'FAQ', plural: 'FAQs' },
  fields: [
    ...sectionHeader(true),
    { name: 'items', type: 'array', fields: [{ name: 'question', type: 'text', required: true }, { name: 'answer', type: 'textarea', required: true }] },
  ],
})

export const VideoBlock = withSettings({
  slug: 'video',
  labels: { singular: 'Video', plural: 'Videos' },
  fields: [
    ...sectionHeader(),
    { name: 'url', type: 'text', required: true, admin: { description: 'YouTube or Vimeo link' } },
  ],
})

export const GalleryBlock = withSettings({
  slug: 'gallery',
  labels: { singular: 'Image gallery', plural: 'Image galleries' },
  fields: [
    ...sectionHeader(),
    {
      name: 'columns',
      type: 'select',
      defaultValue: '3',
      options: ['2', '3', '4'].map((v) => ({ label: `${v} per row`, value: v })),
    },
    { name: 'images', type: 'array', fields: [image(), { name: 'caption', type: 'text' }] },
  ],
})

export const HtmlBlock = withSettings({
  slug: 'html',
  labels: { singular: 'Custom HTML / embed', plural: 'Custom HTML' },
  fields: [
    {
      name: 'code',
      type: 'code',
      admin: { language: 'html', description: 'For embeds (maps, forms, widgets). Rendered as-is.' },
    },
    { name: 'contained', type: 'checkbox', label: 'Keep inside page width', defaultValue: true },
  ],
})

export const allBlocks: Block[] = [
  HeroBlock,
  StatementBlock,
  SolutionsBlock,
  SpectrumBlock,
  MarqueeBlock,
  ProductsBlock,
  BannerBlock,
  StepsBlock,
  NewsBlock,
  ContactBlock,
  ContentBlock,
  ImageTextBlock,
  CardsBlock,
  StatsBlock,
  FaqBlock,
  VideoBlock,
  GalleryBlock,
  HtmlBlock,
]
