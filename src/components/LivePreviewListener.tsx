'use client'

import { RefreshRouteOnSave } from '@payloadcms/live-preview-react'
import { useRouter } from 'next/navigation'

/** Inside the admin's Live Preview, re-renders the page as the editor types. */
export default function LivePreviewListener() {
  const router = useRouter()
  return (
    <RefreshRouteOnSave
      refresh={() => router.refresh()}
      serverURL={process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'}
    />
  )
}
