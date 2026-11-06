import { Fragment } from 'react'
import type { Any } from '@/lib/cms'

export default function Footer({ s }: { s: Any }) {
  const lines = String(s.address ?? '').split('\n')
  return (
    <footer>
      <div className="w">
        <div className="fg">
          <div>
            <img src={s.logo} alt={s.siteTitle} />
            <p>
              {lines.map((line, i) => (
                <Fragment key={i}>
                  {line}
                  {i < lines.length - 1 ? <br /> : null}
                </Fragment>
              ))}
            </p>
          </div>
          {(s.footerColumns ?? []).map((col: Any, i: number) => (
            <div key={i}>
              <h4>{col.heading}</h4>
              {(col.links ?? []).map((l: Any, j: number) => (
                <a href={l.href} key={j}>
                  {l.label}
                </a>
              ))}
            </div>
          ))}
        </div>
        <div className="cp">
          <span>{s.copyright}</span>
          <a href="#" style={{ textDecoration: 'none' }}>
            {s.backToTop}
          </a>
        </div>
      </div>
    </footer>
  )
}
