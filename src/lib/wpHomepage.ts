/* eslint-disable @typescript-eslint/no-explicit-any */
type Any = any

export const WP_HOMEPAGE_API = 'https://myclientwebsite.com/headless/wp-json/visiontec/v1/homepage'

export type WpSectionItem = {
  title?: string
  description?: string
  buttonText?: string
  buttonUrl?: string
  imageUrl?: string
  label?: string
}

export type WpSection = {
  id?: string
  type?: string
  enabled?: boolean
  data?: {
    eyebrow?: string
    heading?: string
    description?: string
    buttonText?: string
    buttonUrl?: string
    secondaryButtonText?: string
    secondaryButtonUrl?: string
    imageUrl?: string
    imageId?: number
    items?: WpSectionItem[]
  }
}

export type WpHomepageResponse = {
  page?: {
    id?: number
    title?: string
    slug?: string
    modified_gmt?: string
  }
  sections?: WpSection[]
}

const anchor = (id: string) => ({ background: 'default', spacing: 'default', anchor: id, hidden: false })

const spectrumPositions: Record<string, string> = {
  C: '12% 50%',
  N: '88% 50%',
}

export function mapWpSectionsToBlocks(sections: WpSection[] = []): Any[] {
  const mapped: Any[] = [] 
  const solutionsSection = sections.find((s) => s?.type === 'solutions' && s?.enabled !== false)
  const solData = solutionsSection?.data ?? {}
  const solItems = Array.isArray(solData.items) ? solData.items : []
  for (const [index, section] of sections.entries()) {
    if (section?.enabled === false) continue
    const d = section?.data ?? {}
    const items = Array.isArray(d.items) ? d.items : []
    const id = section?.id || `wp-section-${index}`

    switch (section?.type) {
      case 'hero': {
        const words = (d.heading || '').trim().split(/\s+/).filter(Boolean)
        const splitIdx = words.length > 2 ? words.length - 2 : words.length
        const titleLine1 = words.slice(0, splitIdx).join(' ') || d.heading || ''
        const titleLine2 = words.slice(splitIdx).join(' ')

        mapped.push({
          id,
          blockType: 'hero',
          background: d.imageUrl || '',
          badge: '',
          pillText: d.eyebrow || '',
          pillHref: d.buttonUrl || '',
          titleLine1,
          titleLine2,
          subtitle: d.description || '',
          primaryCta: { label: d.buttonText || '', href: d.buttonUrl || '' },
          secondaryCta: { label: d.secondaryButtonText || '', href: d.secondaryButtonUrl || '' },
          showGrid: true,

          // starter-2-2 (solutions) items mapped to Hero bento tiles:
          heroSolutions: {
            eyebrow: solData.eyebrow || '',
            heading: solData.heading || '',
            items: solItems,
          },
          tileCommunity: {
            label: solItems[0]?.title || '',
            description: solItems[0]?.description || '',
            href: solItems[0]?.buttonUrl || '#',
            ctaLabel: solItems[0]?.buttonText || '',
            image: solItems[0]?.imageUrl || '',
          },
          tileCbrne: {
            label: solItems[1]?.title || '',
            description: solItems[1]?.description || '',
            href: solItems[1]?.buttonUrl || '#',
            ctaLabel: solItems[1]?.buttonText || '',
            image: solItems[1]?.imageUrl || '',
          },
          tilePremises: {
            label: solItems[2]?.title || '',
            description: solItems[2]?.description || '',
            href: solItems[2]?.buttonUrl || '#',
            ctaLabel: solItems[2]?.buttonText || '',
            image: solItems[2]?.imageUrl || '',
          },

          signalTitle: '',
          featuredLabel: '',
          featuredLinkLabel: '',
          featuredProduct: '',
          features: [],
          settings: anchor(''),
        })
        break
      }

      case 'solutions': {
        mapped.push({
          id,
          blockType: 'solutions',
          tag: d.eyebrow || '',
          heading: d.heading || '',
          items: items.map((item) => ({
            title: item.title || '',
            text: item.description || '',
            cta: {
              label: item.buttonText || '',
              href: item.buttonUrl || '',
            },
            image: item.imageUrl || '',
          })),
          settings: anchor('solutions'),
        })
        break
      }

      case 'cbrne': {
        mapped.push({
          id,
          blockType: 'spectrum',
          tag: d.eyebrow || '',
          heading: d.heading || '',
          intro: d.description || '',
          items: items.map((item) => {
            const letter = item.label || item.title?.[0]?.toUpperCase() || ''
            return {
              letter,
              name: item.title || '',
              text: item.description || '',
              image: item.imageUrl || '',
              position: spectrumPositions[letter] || '',
            }
          }),
          settings: anchor('spectrum'),
        })
        break
      }

      case 'products': {
        mapped.push({
          id,
          blockType: 'products',
          tag: d.eyebrow || '',
          heading: d.heading || '',
          intro: d.description || '',
          source: 'api',
          limit: items.length,
          items: items.map((item) => ({
            name: item.title || '',
            summary: item.description || '',
            image: item.imageUrl || '',
            ctaLabel: item.buttonText || '',
            ctaHref: item.buttonUrl || '',
          })),
          settings: anchor('products'),
        })
        break
      }

      case 'process': {
        mapped.push({
          id,
          blockType: 'steps',
          tag: d.eyebrow || '',
          heading: d.heading || '',
          steps: items.map((item) => ({
            title: item.title || '',
            text: item.description || '',
          })),
          settings: anchor('how'),
        })
        break
      }

      case 'news_events': {
        mapped.push({
          id,
          blockType: 'news',
          tag: d.eyebrow || '',
          heading: d.heading || '',
          postsLimit: items.length,
          showEvents: false,
          posts: items.map((item) => ({
            title: item.title || '',
            excerpt: item.description || '',
            image: item.imageUrl || '',
            href: item.buttonUrl || '',
            linkLabel: item.buttonText || '',
          })),
          events: [],
          settings: anchor('news'),
        })
        break
      }

      case 'contact': {
        const buttons = [
          d.buttonText ? { label: d.buttonText, href: d.buttonUrl || '' } : null,
          d.secondaryButtonText ? { label: d.secondaryButtonText, href: d.secondaryButtonUrl || '' } : null,
        ].filter(Boolean)

        mapped.push({
          id,
          blockType: 'contact',
          heading: d.heading || '',
          text: d.description || '',
          buttons,
          settings: anchor('contact'),
        })
        break
      }

      default:
        break
    }
  }
  console.log(
    '[WP MAPPED SECTIONS]',
    JSON.stringify(
      {
        count: mapped.length,
        blockTypes: mapped.map((b) => b.blockType),
        blocks: mapped,
      },
      null,
      2,
    ),
  )
  return mapped
}

export async function fetchWpHomepage(): Promise<WpHomepageResponse> {
  const res = await fetch(WP_HOMEPAGE_API, {
    cache: 'no-store',
  })
  if (!res.ok) {
    throw new Error(`WP homepage API failed with status ${res.status}`)
  }
  return (await res.json()) as WpHomepageResponse
}