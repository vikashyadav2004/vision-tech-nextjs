export default function NotFound() {
  return (
    <section className="gx" style={{ paddingTop: 200, minHeight: '70vh' }}>
      <div className="w">
        <div className="gx-text">
          <span className="tag">404</span>
          <h2>This page doesn’t exist.</h2>
          <p>It may have been moved or unpublished.</p>
          <div className="cta">
            <a className="btn" href="/">
              Back to home
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
