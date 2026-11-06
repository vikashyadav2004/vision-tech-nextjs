import { Fragment } from 'react'
import { getClient, mediaUrl, str, type Any } from '@/lib/cms'
import { defaultEvents, defaultPosts, defaultProducts } from '@/lib/defaults'
import { bgUrl, Buttons, SectionHead, sectionProps, v } from '../Section'

function Check() {
  return (
    <svg viewBox="0 0 24 24">
      <path d="M5 12l5 5 9-10" />
    </svg>
  )
}

/* ---------------- Hero ---------------- */
export async function Hero({ b }: { b: Any }) {
  let fp: Any = b.featuredProduct
  if (typeof fp === 'string' || !fp) fp = defaultProducts.find((p) => p.name === (fp || 'Pendar X10')) ?? defaultProducts[1]
  const sp = sectionProps(b.settings, { className: 'hero' })

  return (
    <header {...sp} style={{ ...sp.style, ...v({ '--haz': bgUrl(mediaUrl(b.background)) }) }}>
      <div className="w">
        <div className="hc">
          {b.pillText ? (
            <a className="pill2" href={b.pillHref || '#'}>
              {b.badge ? <b>{b.badge}</b> : null}
              {b.pillText}
              <span>→</span>
            </a>
          ) : null}
          <h1>
            <span className="m">
              <span>{b.titleLine1}</span>
            </span>
            {b.titleLine2 ? (
              <span className="m">
                <span className="gt">{b.titleLine2}</span>
              </span>
            ) : null}
          </h1>
          {b.subtitle ? <p className="sub">{b.subtitle}</p> : null}
          <Buttons items={[b.primaryCta, b.secondaryCta]} />
        </div>

        {b.showGrid !== false ? (
          <div className="bento">
            <div className="tl a" style={v({ '--i': 0, backgroundImage: bgUrl(mediaUrl(b.tileCommunity?.image)) })}>
              {b.tileCommunity?.label ? (
                <span className="lb">
                  {b.tileCommunity.label}
                  <i>↗</i>
                </span>
              ) : null}
            </div>
            <div className="tl b" style={v({ '--i': 1 })}>
              <h4>
                <i></i>
                {b.signalTitle}
              </h4>
              <div className="eq">
                <i style={v({ '--h': '88%', '--c': 'var(--or)' })}></i>
                <i style={v({ '--h': '34%', animationDelay: '-.6s' })}></i>
                <i style={v({ '--h': '22%', animationDelay: '-1.2s' })}></i>
                <i style={v({ '--h': '42%', animationDelay: '-1.8s' })}></i>
                <i style={v({ '--h': '30%', animationDelay: '-2.4s' })}></i>
              </div>
              <div className="eql">
                {['C', 'B', 'R', 'N', 'E'].map((l) => (
                  <span key={l}>{l}</span>
                ))}
              </div>
            </div>
            <div
              className="tl c"
              style={v({ '--i': 2, backgroundImage: bgUrl(mediaUrl(b.tileCbrne?.image)), backgroundPosition: '10% 50%' })}
            >
              {b.tileCbrne?.label ? (
                <span className="lb">
                  {b.tileCbrne.label}
                  <i>↗</i>
                </span>
              ) : null}
            </div>
            <div className="tl d" style={v({ '--i': 3, backgroundImage: bgUrl(mediaUrl(b.tilePremises?.image)) })}>
              {b.tilePremises?.label ? (
                <span className="lb">
                  {b.tilePremises.label}
                  <i>↗</i>
                </span>
              ) : null}
            </div>
            <div className="tl e" style={v({ '--i': 4 })}>
              <div className="pim">
                <img src={mediaUrl(fp.image)} alt={fp.name} />
              </div>
              <div>
                <small>{b.featuredLabel}</small>
                <b>{fp.name}</b>
                <span>{fp.summary}</span>
                <a href="#products">{str(b.featuredLinkLabel, 'Learn more')} →</a>
              </div>
            </div>
          </div>
        ) : null}

        {b.features?.length ? (
          <div className="feat" style={{ justifyContent: 'center' }}>
            {b.features.map((f: Any, i: number) => (
              <span key={i}>
                <Check />
                {f.text}
              </span>
            ))}
          </div>
        ) : null}
      </div>
    </header>
  )
}

/* ---------------- Statement ---------------- */
export function Statement({ b }: { b: Any }) {
  const words = String(b.text ?? '').trim().split(/\s+/).filter(Boolean)
  return (
    <section {...sectionProps(b.settings, { className: 'sc' })}>
      <div className="w">
        <p className="scrub">
          {words.map((w, i) => (
            <Fragment key={i}>
              <span>{w}</span>
              {i < words.length - 1 ? ' ' : null}
            </Fragment>
          ))}
        </p>
      </div>
    </section>
  )
}

/* ---------------- Solutions (stacked cards) ---------------- */
export function Solutions({ b }: { b: Any }) {
  return (
    <section {...sectionProps(b.settings, { style: { paddingTop: 20 } })}>
      <div className="w">
        <SectionHead tag={b.tag} heading={b.heading} />
        <div className="stk" style={{ marginTop: 60 }}>
          {(b.items ?? []).map((s: Any, i: number) => (
            <article className="c" style={v({ '--i': i })} key={i}>
              <div className="t">
                <h3>{s.title}</h3>
                {s.text ? <p>{s.text}</p> : null}
                {s.cta?.label ? (
                  <a className="btn mag" href={s.cta.href || '#'}>
                    {s.cta.label}
                  </a>
                ) : null}
              </div>
              <div className="im" style={{ backgroundImage: bgUrl(mediaUrl(s.image)) }}></div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ---------------- Spectrum (expanding panels) ---------------- */
export function Spectrum({ b }: { b: Any }) {
  return (
    <section {...sectionProps(b.settings, { style: { paddingTop: 40 } })}>
      <div className="w">
        <SectionHead tag={b.tag} heading={b.heading} intro={b.intro} />
        <div className="pn">
          {(b.items ?? []).map((s: Any, i: number) => (
            <div
              key={i}
              className={i === 0 ? 'on' : undefined}
              tabIndex={0}
              style={{ backgroundImage: bgUrl(mediaUrl(s.image)), backgroundPosition: s.position || undefined }}
            >
              <b>{s.letter}</b>
              <span className="vt">{s.name}</span>
              <div className="hz">
                <h3>{s.name}</h3>
                {s.text ? <p>{s.text}</p> : null}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ---------------- Marquee ---------------- */
export function Marquee({ b }: { b: Any }) {
  const row = (r: Any[] = []) => [...r, ...r].map((w, i) => <span key={i}>{w.word}</span>)
  return (
    <div {...sectionProps(b.settings, { className: 'big' })} aria-hidden="true">
      {b.row1?.length ? <div>{row(b.row1)}</div> : null}
      {b.row2?.length ? <div>{row(b.row2)}</div> : null}
    </div>
  )
}

/* ---------------- Products ---------------- */
export async function Products({ b }: { b: Any }) {
  let items: Any[] = []
  if (b.source === 'selected') {
    items = (b.selected ?? []).filter((p: Any) => p && typeof p === 'object')
  } else {
    try {
      const p = await getClient()
      const res = await p.find({ collection: 'products', sort: 'sortOrder', limit: b.limit || 3, depth: 1 })
      items = res.docs
    } catch {}
    if (!items.length) items = defaultProducts.slice(0, b.limit || 3)
  }

  return (
    <section {...sectionProps(b.settings, { className: 'lt' })}>
      <div className="w">
        <SectionHead tag={b.tag} heading={b.heading} intro={b.intro} />
        <div className="pr">
          {items.map((p: Any, i: number) => (
            <div className="pc tilt rv" style={i ? v({ '--i': i }) : undefined} key={i}>
              <div className="st">
                <img src={mediaUrl(p.image)} alt={p.name} />
              </div>
              <h3>{p.name}</h3>
              <p>{p.summary}</p>
              <a className="btn l" href={p.ctaHref || '#contact'}>
                {p.ctaLabel || 'Learn more'}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ---------------- Banner ---------------- */
export function Banner({ b }: { b: Any }) {
  const sp = sectionProps(b.settings, { className: 'bn' })
  return (
    <section {...sp} style={{ ...sp.style, ...v({ '--haz': bgUrl(mediaUrl(b.image)) }) }}>
      <div className="bg" data-p=""></div>
      <div className="w">
        {b.heading ? <h2 className="rv">{b.heading}</h2> : null}
        {b.text ? (
          <p className="rv" style={v({ '--i': 1 })}>
            {b.text}
          </p>
        ) : null}
        {b.cta?.label ? (
          <a className="btn mag rv" style={v({ '--i': 2 })} href={b.cta.href || '#'}>
            {b.cta.label}
          </a>
        ) : null}
      </div>
    </section>
  )
}

/* ---------------- Steps ---------------- */
export function Steps({ b }: { b: Any }) {
  return (
    <section {...sectionProps(b.settings)}>
      <div className="w">
        <SectionHead tag={b.tag} heading={b.heading} />
        <div className="sp">
          <i></i>
          {(b.steps ?? []).map((s: Any, i: number) => (
            <div className="rv" style={i ? v({ '--i': i }) : undefined} key={i}>
              <b>{i + 1}</b>
              <h3>{s.title}</h3>
              {s.text ? <p>{s.text}</p> : null}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ---------------- News & events ---------------- */
export async function News({ b }: { b: Any }) {
  let posts: Any[] = []
  let events: Any[] = []
  try {
    const p = await getClient()
    const [po, ev] = await Promise.all([
      p.find({ collection: 'posts', sort: 'sortOrder', limit: b.postsLimit || 3, depth: 1 }),
      b.showEvents !== false ? p.find({ collection: 'events', sort: 'sortOrder', limit: 20 }) : null,
    ])
    posts = po.docs
    events = ev?.docs ?? []
  } catch {}
  if (!posts.length) posts = defaultPosts.slice(0, b.postsLimit || 3)
  if (b.showEvents !== false && !events.length) events = defaultEvents

  return (
    <section {...sectionProps(b.settings, { style: { paddingTop: 20 } })}>
      <div className="w">
        <SectionHead tag={b.tag} heading={b.heading} />
        <div className="nw">
          {posts.map((p: Any, i: number) => (
            <article className="po rv" style={i ? v({ '--i': i }) : undefined} key={i}>
              <div className="ii">
                <img src={mediaUrl(p.image)} alt="" />
              </div>
              <div className="tx">
                <h3>{p.title}</h3>
                {p.excerpt ? <p>{p.excerpt}</p> : null}
                <a href={p.href || '#'}>{p.linkLabel || 'Read more'}</a>
              </div>
            </article>
          ))}
        </div>
        {events.length ? (
          <div className="ev">
            {events.map((e: Any, i: number) => (
              <div className="rv" key={i}>
                <b>{e.date}</b>
                <span>{e.description}</span>
                {e.href ? (
                  <a href={e.href} aria-label={`More about ${e.date}`} style={{ textDecoration: 'none' }}>
                    <i>→</i>
                  </a>
                ) : (
                  <i>→</i>
                )}
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  )
}

/* ---------------- Closing CTA ---------------- */
export function Contact({ b }: { b: Any }) {
  return (
    <section {...sectionProps(b.settings, { className: 'fin' })}>
      <div className="w">
        {b.heading ? <h2 className="rv">{b.heading}</h2> : null}
        {b.text ? (
          <p className="rv" style={v({ '--i': 1 })}>
            {b.text}
          </p>
        ) : null}
        <div className="rv" style={v({ '--i': 2 })}>
          <Buttons items={b.buttons} />
        </div>
      </div>
    </section>
  )
}
