import { cache } from 'react'
import { getPayload } from 'payload'
import config from '@payload-config'
import { defaultDesign, defaultHomeLayout, defaultSettings } from './defaults'

/* eslint-disable @typescript-eslint/no-explicit-any */
export type Any = any

export const getClient = cache(() => getPayload({ config }))

/** URL of an upload field value (populated doc, or a plain /images path from defaults). */
export const mediaUrl = (m: Any): string => {
  if (!m) return ''
  if (typeof m === 'string') return m.startsWith('/') || m.startsWith('http') ? m : ''
  return typeof m === 'object' && m.url ? m.url : ''
}

export const str = (v: unknown, d = ''): string => (typeof v === 'string' && v.trim() !== '' ? v : d)

/** Fills empty values in `data` from `fallback` (one level of objects deep). */
function withFallback<T extends Record<string, Any>>(data: Any, fallback: T): T {
  const out: Record<string, Any> = { ...fallback }
  for (const key of Object.keys(fallback)) {
    const v = data?.[key]
    const f = fallback[key]
    if (v === undefined || v === null || v === '' || (Array.isArray(v) && v.length === 0)) continue
    out[key] = f && typeof f === 'object' && !Array.isArray(f) && typeof v === 'object' ? withFallback(v, f) : v
  }
  return out as T
}

export const getSettings = cache(async () => {
  try {
    const p = await getClient()
    const s = await p.findGlobal({ slug: 'site-settings', depth: 1 })
    const merged = withFallback(s, defaultSettings)
    return { ...merged, logo: mediaUrl(s?.logo) || defaultSettings.logo }
  } catch (e) {
    console.error('[cms] settings unavailable, using defaults', e)
    return defaultSettings
  }
})

export const getDesign = cache(async () => {
  try {
    const p = await getClient()
    const d = await p.findGlobal({ slug: 'design', depth: 0 })
    return withFallback(d, defaultDesign)
  } catch {
    return defaultDesign
  }
})

/** A page by slug. Drafts are only returned for logged-in editors (live preview). */
export async function getPage(slug: string, draft: boolean) {
  try {
    const p = await getClient()
    const res = await p.find({
      collection: 'pages',
      where: { slug: { equals: slug } },
      draft,
      limit: 1,
      depth: 2,
      overrideAccess: draft,
    })
    const page = res.docs[0]
    if (page) return page as Any
  } catch (e) {
    console.error('[cms] page query failed', e)
  }
  // Before the CMS has content, the homepage still renders the original design.
  if (slug === 'home') return { title: 'Home', slug: 'home', layout: defaultHomeLayout, updatedAt: 'defaults' }
  return null
}
