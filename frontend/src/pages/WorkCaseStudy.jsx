import { realWork } from '../siteContent'

export default function WorkCaseStudy({ slug }) {
  const projectData = realWork.find((p) => p.slug === slug)

  if (!projectData) {
    return (
      <section className="case-error">
        <div className="container">
          <h1>Project not found</h1>
          <p>The case study you are looking for does not exist.</p>
          <a href="/work.html" className="btn btn--primary">Back to Work</a>
        </div>
      </section>
    )
  }

  const {
    tag,
    title,
    industry,
    services,
    timeline,
    technologies,
    metrics: topMetrics,
    challenge,
    solution,
    results,
    testimonial,
    liveUrl,
    repoUrl,
    featuredImage,
    gallery
  } = projectData

  return (
    <>
      {/* Hero */}
      <section className="case-hero">
        <div className="container">
          <span className="case-hero__tag">{tag}</span>
          <h1 className="case-hero__title">{title}</h1>
          <p className="case-hero__industry">{industry}</p>
          <div className="case-hero__actions">
            {liveUrl && (
              <a href={liveUrl} target="_blank" rel="noopener noreferrer" className="btn btn--primary">
                Live Site
              </a>
            )}
            {repoUrl && (
              <a href={repoUrl} target="_blank" rel="noopener noreferrer" className="btn btn--outline">
                View Source
              </a>
            )}
          </div>
        </div>

        <div className="case-hero__backdrop">
          <div className="container">
            <div className="case-hero__meta">
              <div className="case-hero__meta-item">
                <span className="case-hero__meta-label">Services</span>
                <span className="case-hero__meta-value">{services.join(', ')}</span>
              </div>
              <div className="case-hero__meta-item">
                <span className="case-hero__meta-label">Timeline</span>
                <span className="case-hero__meta-value">{timeline}</span>
              </div>
              <div className="case-hero__meta-item">
                <span className="case-hero__meta-label">Tech Stack</span>
                <span className="case-hero__meta-value">{technologies.join(', ')}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Top Metrics */}
      <section className="case-stats">
        <div className="container">
          <div className="case-stats__grid">
            {topMetrics.map((m, i) => (
              <div key={i} className="case-stats__card">
                <span className="case-stats__number">{m.label}</span>
                <span className="case-stats__desc">{m.value}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Image */}
      {featuredImage && (
        <section className="case-image">
          <div className="container">
            <img src={featuredImage} alt={`${title} screenshot`} className="case-image__main" />
          </div>
        </section>
      )}

      {/* Challenge */}
      <section className="case-challenge">
        <div className="container">
          <div className="case-challenge__content">
            <h2 className="section-label">The Challenge</h2>
            <h3 className="case-challenge__headline">{challenge.headline}</h3>
            <ul className="case-challenge__list">
              {challenge.points.map((p, i) => (
                <li key={i}>{p}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Solution Timeline */}
      <section className="case-phases">
        <div className="container">
          <div className="section-header">
            <h2 className="section-label">The Solution</h2>
            <h3 className="section-title">How We Built It</h3>
            <p className="section-subtitle">A phased delivery across 8 weeks</p>
          </div>

          <div className="case-phases__timeline">
            {solution.phases.map((phase, i) => (
              <div key={i} className="case-phases__item">
                <div className="case-phases__week">{phase.week}</div>
                <div className="case-phases__body">
                  <h4>{phase.title}</h4>
                  <p>{phase.details}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery */}
      {gallery && gallery.length > 0 && (
        <section className="case-gallery">
          <div className="container">
            <div className="section-header">
              <h2 className="section-label">Screenshots</h2>
            </div>
            <div className="case-gallery__grid">
              {gallery.map((src, i) => (
                <div key={i} className="case-gallery__item">
                  <img src={src} alt={`${title} screenshot ${i + 1}`} />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Results */}
      <section className="case-results">
        <div className="container">
          <div className="case-results__inner">
            <div className="case-results__before">
              <h3 className="case-results__heading">Before</h3>
              <ul>
                {results.before.map((r, i) => (
                  <li key={i}>{r}</li>
                ))}
              </ul>
            </div>

            <div className="case-results__arrow">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </div>

            <div className="case-results__after">
              <h3 className="case-results__heading">After</h3>
              <ul>
                {results.after.map((r, i) => (
                  <li key={i}>{r}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="case-results__metrics">
            {results.metrics.map((m, i) => (
              <div key={i} className="case-results__card">
                {m}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial */}
      {testimonial && (
        <section className="case-testimonial">
          <div className="container">
            <blockquote className="case-testimonial__block">
              <p>{testimonial.quote}</p>
              <footer>
                <img src={testimonial.avatar} alt={testimonial.author} width="48" height="48" />
                <div>
                  <cite>{testimonial.author}</cite>
                  <span>{testimonial.company}</span>
                </div>
              </footer>
            </blockquote>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="case-cta">
        <div className="container">
          <h2>Have a similar project?</h2>
          <p>We can help you build it too.</p>
          <a href="/contact.html" className="btn btn--primary">Get in Touch</a>
        </div>
      </section>
    </>
  )
}
