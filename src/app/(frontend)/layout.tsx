import type { Viewport } from 'next'
import type { ReactNode } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ThemeStyle, { fontHref } from '@/components/ThemeStyle'
import { getDesign, getSettings } from '@/lib/cms'
import './globals.css'
import './blocks.css'

export const dynamic = 'force-dynamic'

export const viewport: Viewport = { width: 'device-width', initialScale: 1, viewportFit: 'cover' }

export default async function FrontendLayout({ children }: { children: ReactNode }) {
  const [settings, design] = await Promise.all([getSettings(), getDesign()])
  const fx = design.effects

  return (
    <html lang="en" data-theme="light" className={fx.animations ? undefined : 'no-motion'}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link href={fontHref(design)} rel="stylesheet" />
        <ThemeStyle d={design} />
      </head>
      <body>
        <noscript>
          <style
            dangerouslySetInnerHTML={{ __html: '.rv{opacity:1!important;transform:none!important;filter:none!important}' }}
          />
        </noscript>
        {fx.progressBar ? <div id="bar"></div> : null}
        {fx.cursorGlow ? <div id="cg"></div> : null}
        {fx.preloader ? (
          <div id="pre">
            <div>
              <img src={settings.logo} alt={settings.siteTitle} />
            </div>
          </div>
        ) : null}
        <Header s={settings} />
        <main>{children}</main>
        <Footer s={settings} />
      </body>
    </html>
  )
}
