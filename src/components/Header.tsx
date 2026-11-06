import type { Any } from '@/lib/cms'

export default function Header({ s }: { s: Any }) {
  return (
    <nav className="nav" id="nav">
      <a href="/">
        <img src={s.logo} alt={s.siteTitle} />
      </a>
      <ul>
        {(s.navLinks ?? []).map((l: Any, i: number) => (
          <li key={i}>
            <a href={l.href}>{l.label}</a>
          </li>
        ))}
      </ul>
      {s.navCta?.label ? (
        <a className="btn mag" href={s.navCta.href}>
          {s.navCta.label}
        </a>
      ) : null}
    </nav>
  )
}
