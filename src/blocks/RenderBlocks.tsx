import type { ComponentType } from 'react'
import type { Any } from '@/lib/cms'
import * as O from './components/Original'
import * as G from './components/General'

/** blockType (slug in ./config.ts) → component. Register new blocks here. */
const components: Record<string, ComponentType<{ b: Any }>> = {
  hero: O.Hero,
  statement: O.Statement,
  solutions: O.Solutions,
  spectrum: O.Spectrum,
  marquee: O.Marquee,
  products: O.Products,
  banner: O.Banner,
  steps: O.Steps,
  news: O.News,
  contact: O.Contact,
  content: G.Content,
  imageText: G.ImageText,
  cards: G.Cards,
  stats: G.Stats,
  faq: G.Faq,
  video: G.Video,
  gallery: G.Gallery,
  html: G.Html,
}

export default function RenderBlocks({ blocks }: { blocks?: Any[] | null }) {
  if (!blocks?.length) return null
  return (
    <>
      {blocks.map((b, i) => {
        if (b?.settings?.hidden) return null
        const C = components[b?.blockType]
        return C ? <C b={b} key={b.id ?? i} /> : null
      })}
    </>
  )
}
