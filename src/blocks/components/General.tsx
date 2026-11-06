import { RichText } from '@payloadcms/richtext-lexical/react'
import { mediaUrl, type Any } from '@/lib/cms'
import { Buttons, SectionHead, sectionProps, v } from '../Section'

const Rich = ({ data }: { data: Any }) => (data?.root ? <RichText data={data} className="rt" /> : null)

/* ---------------- Text ---------------- */
export function Content({ b }: { b: Any }) {
  const center = b.align === 'center'
  return (
    <section {...sectionProps(b.settings, { className: 'gx' })}>
      <div className="w">
        <div className={`gx-text rv${center ? ' is-c' : ''}${b.width === 'wide' ? ' is-wide' : ''}`}>
          {b.tag ? <span className="tag">{b.tag}</span> : null}
          {b.heading ? <h2>{b.heading}</h2> : null}
          <Rich data={b.body} />
          <Buttons items={b.buttons} />
        </div>
      </div>
    </section>
  )
}

/* ---------------- Image + text ---------------- */
export function ImageText({ b }: { b: Any }) {
  const src = mediaUrl(b.image)
  return (
    <section {...sectionProps(b.settings, { className: 'gx' })}>
      <div className={`w gx-split${b.imagePosition === 'left' ? ' is-left' : ''}`}>
        <div className="gx-text rv">
          {b.tag ? <span className="tag">{b.tag}</span> : null}
          {b.heading ? <h2>{b.heading}</h2> : null}
          <Rich data={b.body} />
          <Buttons items={b.buttons} />
        </div>
        {src ? (
          <div className="gx-media rv" style={v({ '--i': 1 })}>
            <img src={src} alt={b.image?.alt ?? ''} />
          </div>
        ) : null}
      </div>
    </section>
  )
}

/* ---------------- Cards grid ---------------- */
export function Cards({ b }: { b: Any }) {
  return (
    <section {...sectionProps(b.settings, { className: 'gx' })}>
      <div className="w">
        <SectionHead tag={b.tag} heading={b.heading} intro={b.intro} />
        <div className="gx-grid" style={v({ '--cols': b.columns || 3 })}>
          {(b.items ?? []).map((c: Any, i: number) => {
            const src = mediaUrl(c.image)
            const inner = (
              <>
                {src ? (
                  <div className="gx-card-img">
                    <img src={src} alt={c.image?.alt ?? ''} />
                  </div>
                ) : null}
                <div className="gx-card-tx">
                  <h3>{c.title}</h3>
                  {c.text ? <p>{c.text}</p> : null}
                  {c.link?.label ? <span className="gx-more">{c.link.label}</span> : null}
                </div>
              </>
            )
            return c.link?.href ? (
              <a className="gx-card rv" href={c.link.href} style={v({ '--i': i % 4 })} key={i}>
                {inner}
              </a>
            ) : (
              <div className="gx-card rv" style={v({ '--i': i % 4 })} key={i}>
                {inner}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

/* ---------------- Stats ---------------- */
export function Stats({ b }: { b: Any }) {
  return (
    <section {...sectionProps(b.settings, { className: 'gx' })}>
      <div className="w">
        <SectionHead tag={b.tag} heading={b.heading} />
        <div className="gx-stats">
          {(b.items ?? []).map((s: Any, i: number) => (
            <div className="rv" style={v({ '--i': i })} key={i}>
              <b>{s.value}</b>
              <span>{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ---------------- FAQ ---------------- */
export function Faq({ b }: { b: Any }) {
  return (
    <section {...sectionProps(b.settings, { className: 'gx' })}>
      <div className="w gx-faq-wrap">
        <SectionHead tag={b.tag} heading={b.heading} intro={b.intro} />
        <div className="gx-faq">
          {(b.items ?? []).map((f: Any, i: number) => (
            <details className="rv" key={i}>
              <summary>
                {f.question}
                <i aria-hidden="true">+</i>
              </summary>
              <p>{f.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ---------------- Video ---------------- */
function embedUrl(url: string): string {
  const yt = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([\w-]{11})/)
  if (yt) return `https://www.youtube-nocookie.com/embed/${yt[1]}`
  const vm = url.match(/vimeo\.com\/(?:video\/)?(\d+)/)
  if (vm) return `https://player.vimeo.com/video/${vm[1]}`
  return ''
}

export function Video({ b }: { b: Any }) {
  const src = embedUrl(String(b.url ?? ''))
  return (
    <section {...sectionProps(b.settings, { className: 'gx' })}>
      <div className="w">
        <SectionHead tag={b.tag} heading={b.heading} />
        {src ? (
          <div className="gx-video rv">
            <iframe
              src={src}
              title={b.heading || 'Video'}
              loading="lazy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        ) : null}
      </div>
    </section>
  )
}

/* ---------------- Gallery ---------------- */
export function Gallery({ b }: { b: Any }) {
  return (
    <section {...sectionProps(b.settings, { className: 'gx' })}>
      <div className="w">
        <SectionHead tag={b.tag} heading={b.heading} />
        <div className="gx-gallery" style={v({ '--cols': b.columns || 3 })}>
          {(b.images ?? []).map((g: Any, i: number) => {
            const src = mediaUrl(g.image)
            return src ? (
              <figure className="rv" style={v({ '--i': i % 4 })} key={i}>
                <img src={src} alt={g.image?.alt ?? g.caption ?? ''} loading="lazy" />
                {g.caption ? <figcaption>{g.caption}</figcaption> : null}
              </figure>
            ) : null
          })}
        </div>
      </div>
    </section>
  )
}

/* ---------------- Custom HTML ---------------- */
export function Html({ b }: { b: Any }) {
  if (!b.code) return null
  const inner = <div className="gx-html" dangerouslySetInnerHTML={{ __html: b.code }} />
  return (
    <section {...sectionProps(b.settings, { className: 'gx' })}>
      {b.contained !== false ? <div className="w">{inner}</div> : inner}
    </section>
  )
}
