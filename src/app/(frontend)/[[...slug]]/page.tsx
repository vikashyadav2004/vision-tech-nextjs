import type { Metadata } from 'next'
import { headers } from 'next/headers'
import { notFound } from 'next/navigation'
import RenderBlocks from '@/blocks/RenderBlocks'
import Interactions from '@/components/Interactions'
import LivePreviewListener from '@/components/LivePreviewListener'
import { getClient, getPage, getSettings, mediaUrl } from '@/lib/cms'

type Props = {
  params: Promise<{ slug?: string[] }>
  searchParams: Promise<{ preview?: string }>
}

const toSlug = (parts?: string[]) => (parts?.length ? parts.map(decodeURIComponent).join('/') : 'home')

/** Drafts are shown only when ?preview=true AND an editor is logged in to the admin. */
async function isPreview(searchParams: Props['searchParams']) {
  if ((await searchParams).preview !== 'true') return false
  try {
    const p = await getClient()
    const { user } = await p.auth({ headers: await headers() })
    return Boolean(user)
  } catch {
    return false
  }
}

export async function generateMetadata({ params, searchParams }: Props): Promise<Metadata> {
  const slug = toSlug((await params).slug)
  const [page, settings] = await Promise.all([getPage(slug, await isPreview(searchParams)), getSettings()])
  if (!page) return { title: settings.siteTitle }
  const title = page.meta?.title || (slug === 'home' ? settings.siteTitle : `${page.title} | ${settings.siteTitle}`)
  const image = mediaUrl(page.meta?.image)
  return {
    title,
    description: page.meta?.description || undefined,
    openGraph: image ? { images: [image] } : undefined,
  }
}

export default async function Page({ params, searchParams }: Props) {
  const slug = toSlug((await params).slug)
  const preview = await isPreview(searchParams)
  const page = await getPage(slug, preview)
  if (!page) notFound()

  return (
    <>
      {preview ? <LivePreviewListener /> : null}
      <RenderBlocks blocks={page.layout} />
      {/* key: re-attach effects when live preview swaps in new sections */}
      <Interactions key={String(page.updatedAt ?? '') + (page.layout?.length ?? 0)} />
    </>
  )
}
