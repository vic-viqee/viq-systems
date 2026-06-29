import { useEffect, useRef, useState } from 'react'
import {
  aboutValues,
  contactMethods,
  conceptWork,
  faqItems,
  homeCapabilities,
  homeProblems,
  homeProcess,
  navItems,
  packageLabels,
  pageMeta,
  problemAreas,
  pricingTiers,
  realWork,
  services,
  standards,
} from './siteContent'
import WorkCaseStudy from './pages/WorkCaseStudy'
import './App.css'

const PATH_TO_PAGE = {
  '/': 'home',
  '/index.html': 'home',
  '/services': 'services',
  '/services.html': 'services',
  '/work': 'work',
  '/work.html': 'work',
  '/about': 'about',
  '/about.html': 'about',
  '/contact': 'contact',
  '/contact.html': 'contact',
}

function getSlugFromSearch() {
  const params = new URLSearchParams(window.location.search)
  return params.get('slug') || ''
}

function resolvePage(pathname) {
  return PATH_TO_PAGE[pathname] ?? 'home'
}

function useReveal() {
  useEffect(() => {
    const elements = document.querySelectorAll('[data-reveal]')

    if (!elements.length) {
      return undefined
    }

    if (!('IntersectionObserver' in window)) {
      elements.forEach((element) => element.classList.add('is-visible'))
      return undefined
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.15 },
    )

    elements.forEach((element) => observer.observe(element))

    return () => observer.disconnect()
  }, [])
}

function useDocumentMeta(page, caseProject) {
  useEffect(() => {
    if (page === 'case-study' && caseProject) {
      document.title = `${caseProject.title} Case Study - Viq Systems`
      const description = document.querySelector('meta[name="description"]')
      if (description) {
        description.setAttribute('content', `${caseProject.services.join(', ')} — ${caseProject.industry} case study by Viq Systems.`)
      }
      return
    }
    const meta = pageMeta[page] ?? pageMeta.home
    document.title = meta.title

    const description = document.querySelector('meta[name="description"]')
    if (description) {
      description.setAttribute('content', meta.description)
    }
  }, [page, caseProject])
}

function getPackageFromSearch() {
  const params = new URLSearchParams(window.location.search)
  const value = params.get('package')
  return value && packageLabels[value] ? value : ''
}

function App() {
  const page = resolvePage(window.location.pathname)
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  const caseSlug = page === 'work' ? getSlugFromSearch() : ''
  const caseProject = caseSlug ? realWork.find((p) => p.slug === caseSlug) : null
  const effectivePage = caseProject ? 'case-study' : page

  useReveal()
  useDocumentMeta(effectivePage, caseProject)

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        setMenuOpen(false)
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  useEffect(() => {
    document.documentElement.classList.add('has-app')
    return () => document.documentElement.classList.remove('has-app')
  }, [])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const packageSlug = page === 'contact' ? getPackageFromSearch() : ''
  const packageLabel = packageSlug ? packageLabels[packageSlug] : ''

  let pageContent
  switch (effectivePage) {
    case 'case-study':
      pageContent = <WorkCaseStudy slug={caseSlug} />
      break
    case 'services':
      pageContent = <ServicesPage />
      break
    case 'work':
      pageContent = <WorkPage />
      break
    case 'about':
      pageContent = <AboutPage />
      break
    case 'contact':
      pageContent = <ContactPage packageSlug={packageSlug} packageLabel={packageLabel} />
      break
    case 'home':
    default:
      pageContent = <HomePage />
      break
  }

  return (
    <div className="site-shell">
      <SiteHeader page={page} menuOpen={menuOpen} scrolled={scrolled} setMenuOpen={setMenuOpen} />
      <main>{pageContent}</main>
      <SiteFooter />
    </div>
  )
}

function SiteHeader({ page, menuOpen, scrolled, setMenuOpen }) {
  const closeMenu = () => setMenuOpen(false)

  return (
    <header className={`site-header ${scrolled ? 'scrolled' : ''}`}>
      <div className="nav wrap">
        <a className="brand" href="/index.html" onClick={closeMenu}>
          <img src="/brand/viq-systems-logo-wordmark.svg" alt="Viq Systems" />
        </a>

        <nav className="nav-links" data-open={menuOpen ? 'true' : 'false'}>
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={item.page === page ? 'active' : ''}
              onClick={closeMenu}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="nav-actions">
          <a className="btn btn-primary btn-sm nav-cta-desktop" href="/contact.html">
            Let&apos;s talk
          </a>
          <button
            type="button"
            className="nav-toggle"
            aria-label="Toggle navigation"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((value) => !value)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>
    </header>
  )
}

function HomePage() {
  return (
    <>
      <section className="hero wrap" data-reveal>
        <div className="hero-copy">
          <div className="eyebrow">Built for impact</div>
          <h1>
            We solve business problems <span>with technology.</span>
          </h1>
          <p className="lead">
            Custom software, built for how your business actually works, not the other way around.
            No templates, no page builders, no guesswork. Just working code that solves a specific
            problem.
          </p>
          <div className="hero-actions">
            <a className="btn btn-primary" href="/contact.html">
              Tell us your problem
            </a>
            <a
              className="btn btn-outline"
              href="https://wa.me/254114086112?text=Hi%20Viq%2C%20I%27m%20interested%20in%20your%20services%20and%20would%20like%20to%20discuss%20a%20project."
              target="_blank"
              rel="noreferrer"
            >
              <i className="ti ti-brand-whatsapp" aria-hidden="true" />
              Chat on WhatsApp
            </a>
            <a className="btn btn-ghost" href="/services.html">
              See what we build
            </a>
          </div>
          <div className="hero-status">
            <i className="ti ti-sparkles" aria-hidden="true" />
            Hand-crafted digital systems for growing businesses
          </div>
          <div className="hero-meta">
            <div>
              <strong>Discovery</strong>
              <span>Find the real bottleneck</span>
            </div>
            <div>
              <strong>Build</strong>
              <span>Custom software that fits your workflow</span>
            </div>
            <div>
              <strong>Results</strong>
              <span>Time saved, friction removed, revenue recovered</span>
            </div>
          </div>
        </div>

        <aside className="hero-panel">
          <div className="panel-label">What we&apos;re building now</div>
          <article className="project-card">
            <div className="project-visual project-visual--teal">
              <i className="ti ti-credit-card" aria-hidden="true" />
            </div>
            <div className="project-body">
              <span className="tag tag-live">Live project</span>
              <h3>FluxPay</h3>
              <p>
                A payment platform that handles M-Pesa collections and recurring billing
                automatically, so a business does not have to build the integration itself.
              </p>
              <a className="project-link" href="https://fluxpay-frontend.onrender.com/" target="_blank" rel="noreferrer">
                See it live <i className="ti ti-external-link" aria-hidden="true" />
              </a>
            </div>
          </article>
        </aside>
      </section>

      <SectionHeading
        eyebrow="How we solve problems"
        title="A straightforward process to find the bottleneck and remove it."
        description="We keep the process simple on purpose. The value is in the outcome, not the ceremony."
      />

      <section className="wrap grid grid-3" data-reveal>
        {homeProcess.map((item) => (
          <article key={item.title} className="surface card">
            <i className={item.icon} aria-hidden="true" />
            <h3>{item.title}</h3>
            <p>{item.text}</p>
          </article>
        ))}
      </section>

      <SectionHeading
        eyebrow="Core capabilities"
        title="Specific tools and integrations we use to solve business problems."
        description="The stack stays invisible. The business result is what matters."
      />

      <section className="wrap grid grid-4 capabilities" data-reveal>
        {homeCapabilities.map((item) => (
          <article key={item.title} className="surface capability">
            <div className="capability-icon">
              <i className={item.icon} aria-hidden="true" />
            </div>
            <h3>{item.title}</h3>
            <p>{item.text}</p>
          </article>
        ))}
      </section>

      <SectionHeading
        eyebrow="Problem examples"
        title="The kinds of problems we help businesses solve."
        description="These are real patterns. If one feels familiar, we probably know how to address it."
      />

      <section className="wrap grid grid-3 problems" data-reveal>
        {homeProblems.map((item) => (
          <article key={item.title} className="problem-card">
            <div className={`problem-visual problem-visual--${visualTone(item.icon)}`}>
              <i className={item.icon} aria-hidden="true" />
            </div>
            <div className="surface problem-body">
              <span className="tag tag-problem">Problem type</span>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
              <p className="solution-line">Solution: {item.solution}</p>
            </div>
          </article>
        ))}
      </section>

      <CtaBanner
        title="What problem are you trying to solve?"
        text="Tell us what is eating your time, slowing your team down, or costing you money. We will figure out if we can build a solution for it."
        href="/contact.html"
        label="Let's talk"
      />
    </>
  )
}

function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="What we build"
        title="Services"
        text="Every project is built around a specific business problem. If you have one of these challenges, we build the solution that fixes it."
      />

      <SectionHeading
        eyebrow="What we build"
        title="Pick the service that matches your business need."
        description="Every service is custom-built from scratch. No templates, no page builders, no generic agency packages."
      />

      <section className="wrap service-stack" data-reveal>
        {services.map((service) => (
          <article key={service.title} className="service-card">
            <div className={`service-visual service-visual--${service.gradient}`}>
              <i className={service.icon} aria-hidden="true" />
            </div>
            <div className="service-body">
              <h3>{service.title}</h3>
              <p className="service-desc">{service.text}</p>
              <div className="service-detail-grid">
                <div>
                  <h4>What we build</h4>
                  <ul>
                    {service.build.map((item) => (
                      <li key={item}>
                        <i className="ti ti-check" aria-hidden="true" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4>Outcome</h4>
                  <ul>
                    {service.outcome.map((item) => (
                      <li key={item}>
                        <i className="ti ti-arrow-right" aria-hidden="true" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </article>
        ))}
      </section>

      <SectionHeading
        eyebrow="Pricing"
        title="How pricing works"
        description="Pricing follows scope and complexity. Simpler projects cost less. More custom work costs more."
      />

      <section className="wrap pricing-grid" data-reveal>
        {pricingTiers.map((tier) => (
          <article key={tier.name} className={`pricing-card ${tier.featured ? 'featured' : ''}`}>
            <div className="pricing-badge">{tier.badge}</div>
            <h3>{tier.name}</h3>
            <div className="pricing-price">
              {tier.price}
              <small>{tier.usd}</small>
            </div>
            <p>{tier.description}</p>
            <ul>
              {tier.bullets.map((bullet) => (
                <li key={bullet}>
                  <i className="ti ti-check" aria-hidden="true" />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
            <a className="btn btn-primary btn-block" href={tier.href}>
              Choose plan
            </a>
          </article>
        ))}
      </section>

      <section className="wrap note-block" data-reveal>
        <p>
          Not sure which plan fits? Every project is different, so the price comes after a short
          discovery call. That keeps the quote tied to the actual problem instead of a generic
          package.
        </p>
        <a href="/contact.html" className="text-link">
          Book a discovery call
        </a>
      </section>

      <SectionHeading
        eyebrow="Benchmarks"
        title="Every project is built to the same engineering standards."
        description="Budget changes scope. It does not change the baseline quality."
      />

      <section className="wrap benchmark-grid" data-reveal>
        {standards.map((item) => (
          <article key={item.title} className="benchmark-card">
            <i className={item.icon} aria-hidden="true" />
            <h3>{item.title}</h3>
            <p>{item.text}</p>
          </article>
        ))}
      </section>

      <SectionHeading eyebrow="Questions" title="Common questions" />
      <FaqAccordion />
    </>
  )
}

function WorkPage() {
  return (
    <>
      <PageHero
        eyebrow="What we have built"
        title="Our work"
        text="A mix of real projects we have actually built and concept examples that show how we would approach a problem like yours."
      />

      <SectionHeading eyebrow="Real work" title="What we have built" description="Real, live, and built end-to-end." />

      <section className="wrap work-stack" data-reveal>
        {realWork.map((item) => (
          <article key={item.title} className="case-card">
            <div className={`case-visual case-visual--${item.gradient}`}>
              <i className={`ti ti-${item.visual}`} aria-hidden="true" />
            </div>
            <div className="case-body">
              <span className="tag tag-live">{item.tag}</span>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
              <div className="case-links">
                <a href={item.href} className="btn btn-outline btn-sm" target="_blank" rel="noreferrer">
                  View live demo
                </a>
                {item.slug && (
                  <a href={`/work.html?slug=${item.slug}`} className="btn btn-ghost btn-sm">
                    Read case study
                  </a>
                )}
              </div>
            </div>
          </article>
        ))}
      </section>

      <SectionHeading
        eyebrow="Concept examples"
        title="How we would approach common business problems"
        description="These are not completed client projects. They are illustrative examples written in forward-looking language."
      />

      <section className="wrap work-stack" data-reveal>
        {conceptWork.map((item) => (
          <article key={item.title} className="case-card">
            <div className={`case-visual case-visual--${item.gradient}`}>
              <i className={`ti ti-${item.visual}`} aria-hidden="true" />
            </div>
            <div className="case-body">
              <span className="tag tag-concept">{item.tag}</span>
              <h3>{item.title}</h3>
              <p className="case-label">
                <strong>The problem:</strong> {item.problem}
              </p>
              <p className="case-label">
                <strong>What we would build:</strong> {item.solution}
              </p>
              <ul>
                {item.bullets.map((bullet) => (
                  <li key={bullet}>
                    <i className="ti ti-arrow-right" aria-hidden="true" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </section>

      <SectionHeading
        eyebrow="Problem areas"
        title="The kinds of problems we tackle most often"
        description="Yours might fit one of these patterns, or it might be something completely different."
      />

      <section className="wrap grid grid-3 problems" data-reveal>
        {problemAreas.map((item) => (
          <article key={item.title} className="problem-card">
            <div className={`problem-visual problem-visual--${visualTone(item.icon)}`}>
              <i className={item.icon} aria-hidden="true" />
            </div>
            <div className="surface problem-body">
              <span className="tag tag-problem">Problem type</span>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
              <p className="solution-line">Solution: {item.solution}</p>
            </div>
          </article>
        ))}
      </section>

      <CtaBanner
        title="Your project could be next."
        text="Tell us what is broken. We will build a system to fix it."
        href="/contact.html"
        label="Let's talk"
      />
    </>
  )
}

function AboutPage() {
  return (
    <>
      <section className="wrap about-hero" data-reveal>
        <div className="about-mark">
          <img src="/brand/viq-systems-logo-monogram.svg" alt="" />
        </div>
        <div className="about-copy">
          <div className="eyebrow">About</div>
          <h1>We build systems that solve real business problems.</h1>
          <p className="lead">
            Websites, business systems, e-commerce stores, and AI tools, but only when a custom
            solution is actually the right call. If an off-the-shelf tool already handles the
            problem well, we will point you to it.
          </p>
        </div>
      </section>

      <SectionHeading
        eyebrow="What is Viq Systems?"
        title="The short answer, and the honest one."
        description="One person, direct communication, and no agency bloat."
      />

      <section className="wrap about-prose surface" data-reveal>
        <p className="lead">
          Viq Systems is a one-person operation that builds websites, business systems, and
          automation tools for businesses that have outgrown spreadsheets. You work directly with
          the person who writes the code, answers the phone, and stays reachable after launch.
        </p>
        <p>
          The name comes from Victor&apos;s nickname, Viqee. The brand is not hiding behind a fake
          studio identity. Every project still has to pass one test: does it actually solve the
          problem? Time saved, money recovered, stress removed. If the answer is not yes, we do
          not build it.
        </p>
        <p>That is the whole philosophy: no tech for tech&apos;s sake, only practical systems.</p>
      </section>

      <SectionHeading
        eyebrow="Why work with Viq Systems"
        title="What makes this different from hiring an agency or a freelancer platform."
        description="The structure matters because it changes how the work gets done."
      />

      <section className="wrap grid grid-2 values-grid" data-reveal>
        {aboutValues.map((item) => (
          <article key={item.title} className="value-card">
            <i className={item.icon} aria-hidden="true" />
            <div>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </div>
          </article>
        ))}
      </section>

      <CtaBanner
        title="Ready to build something that works?"
        text="Tell us what is broken in your business. We will tell you honestly whether we can fix it and what it would take."
        href="/contact.html"
        label="Schedule a call"
      />
    </>
  )
}

function ContactPage({ packageSlug, packageLabel }) {
  return (
    <>
      <PageHero
        eyebrow="Get in touch"
        title="Tell us what is broken in your business."
        text="Fill out the form with as much detail as you can, and we will get back to you with thoughts on whether we can help and what it would cost."
      />

      <section className="wrap contact-layout" data-reveal>
        <div className="contact-info">
          {packageLabel ? (
            <div className="package-banner surface">
              <span className="tag tag-live">
                <i className="ti ti-package" aria-hidden="true" /> {packageLabel}
              </span>
            </div>
          ) : null}
          {contactMethods.map((item) => (
            <article key={item.title} className="contact-card surface">
              <i className={item.icon} aria-hidden="true" />
              <div>
                <h3>{item.title}</h3>
                {item.href ? (
                  <a href={item.href} target={item.href.startsWith('http') ? '_blank' : undefined} rel="noreferrer">
                    {item.value}
                  </a>
                ) : (
                  <p>{item.value}</p>
                )}
              </div>
            </article>
          ))}
        </div>

        <div className="surface form-card">
          <ContactForm packageSlug={packageSlug} />
        </div>
      </section>
    </>
  )
}

function ContactForm({ packageSlug }) {
  const formRef = useRef(null)
  const [status, setStatus] = useState({ type: 'idle', message: '' })
  const apiUrl =
    import.meta.env.VITE_API_URL || 'https://viq-systems-backend.victorlewismurimi.workers.dev'

  async function handleSubmit(event) {
    event.preventDefault()

    const form = formRef.current
    if (!form) return

    setStatus({ type: 'loading', message: 'Sending your message...' })

    const formData = new FormData(form)
    const payload = {
      name: String(formData.get('name') || '').trim(),
      email: String(formData.get('email') || '').trim(),
      business: String(formData.get('business') || '').trim(),
      problem: String(formData.get('problem') || '').trim(),
      impact: String(formData.get('impact') || '').trim(),
      timeline: String(formData.get('timeline') || '').trim(),
      package: String(formData.get('package') || '').trim() || undefined,
    }

    try {
      const response = await fetch(`${apiUrl}/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      const result = await response.json()

      if (!response.ok) {
        const errMsg =
          result.errors?.map((e) => e.message).join(', ') ||
          result.error ||
          'Form submission failed.'
        throw new Error(errMsg)
      }

      form.reset()
      setStatus({
        type: 'success',
        message: result.message || 'Thanks. We will review your problem and get back to you within 24 hours.',
      })
    } catch (error) {
      setStatus({
        type: 'error',
        message:
          error instanceof Error ? error.message : 'Something went wrong while sending the form.',
      })
    }
  }

  function handleReset() {
    setStatus({ type: 'idle', message: '' })
  }

  if (status.type === 'success') {
    return (
      <div className="form-success">
        <div className="form-success-icon">
          <i className="ti ti-circle-check" aria-hidden="true" />
        </div>
        <h3 className="form-success-title">Message sent successfully</h3>
        <p className="form-success-message">{status.message}</p>
        <button type="button" className="btn btn-outline" onClick={handleReset}>
          <i className="ti ti-arrow-back" aria-hidden="true" /> Send another message
        </button>
      </div>
    )
  }

  return (
    <form ref={formRef} className="contact-form" onSubmit={handleSubmit}>
      <input type="hidden" name="package" value={packageSlug} />

      <div className="field-grid">
        <label className="field">
          <span>Your name</span>
          <input name="name" type="text" required placeholder="Victor" />
        </label>

        <label className="field">
          <span>Email</span>
          <input name="email" type="email" required placeholder="you@example.com" />
        </label>
      </div>

      <label className="field">
        <span>What is your business / what do you do?</span>
        <input
          name="business"
          type="text"
          required
          placeholder="Salon, plumbing, e-commerce, training academy..."
        />
      </label>

      <label className="field">
        <span>What is the biggest problem you are trying to solve?</span>
        <textarea
          name="problem"
          required
          placeholder="What takes up your time? What costs you money? What system is broken or outdated?"
        />
      </label>

      <label className="field">
        <span>What would solving this mean for your business?</span>
        <input
          name="impact"
          type="text"
          required
          placeholder="5 extra hours per week, more leads, less stress..."
        />
      </label>

      <label className="field">
        <span>When do you need this solved?</span>
        <select name="timeline" defaultValue="ASAP (within 2-4 weeks)">
          <option>ASAP (within 2-4 weeks)</option>
          <option>Next 1-2 months</option>
          <option>Flexible, just exploring options</option>
        </select>
      </label>

      <button type="submit" className="btn btn-primary btn-block" disabled={status.type === 'loading'}>
        {status.type === 'loading' ? 'Sending...' : 'Send my problem'}
      </button>

      {status.type !== 'idle' ? (
        <p className={`form-status form-status--${status.type}`}>{status.message}</p>
      ) : (
        <p className="form-hint">
          All submissions are reviewed within 24 hours. We will get back to you with thoughts
          on whether we can help and what it would cost.
        </p>
      )}
    </form>
  )
}

function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState(0)

  return (
    <section className="wrap faq-list" data-reveal>
      {faqItems.map((item, index) => {
        const open = openIndex === index

        return (
          <article key={item.question} className={`faq-item ${open ? 'open' : ''}`}>
            <button
              type="button"
              className="faq-question"
              aria-expanded={open}
              onClick={() => setOpenIndex(open ? -1 : index)}
            >
              <span>{item.question}</span>
              <i className="ti ti-plus" aria-hidden="true" />
            </button>
            <div className="faq-answer" hidden={!open}>
              <p>{item.answer}</p>
            </div>
          </article>
        )
      })}
    </section>
  )
}

function SectionHeading({ eyebrow, title, description }) {
  return (
    <section className="wrap section-heading" data-reveal>
      <div>
        <div className="eyebrow">{eyebrow}</div>
        <h2>{title}</h2>
      </div>
      {description ? <p className="section-description">{description}</p> : null}
    </section>
  )
}

function PageHero({ eyebrow, title, text }) {
  return (
    <section className="wrap page-hero" data-reveal>
      <div className="eyebrow">{eyebrow}</div>
      <h1>{title}</h1>
      <p className="lead">{text}</p>
    </section>
  )
}

function CtaBanner({ title, text, href, label }) {
  return (
    <section className="wrap cta-wrap" data-reveal>
      <div className="cta-banner surface">
        <div>
          <h2>{title}</h2>
          <p>{text}</p>
        </div>
        <a className="btn btn-outline-light" href={href}>
          {label}
        </a>
      </div>
    </section>
  )
}

function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="wrap footer-grid">
        <div>
          <a className="footer-brand" href="/index.html">
          <img src="/brand/viq-systems-logo-wordmark-light.svg" alt="Viq Systems" />
          </a>
          <p>
            Websites, systems, software, and AI tools designed, built, and personally maintained.
          </p>
        </div>
        <div>
          <h3>Sitemap</h3>
          <div className="footer-links">
            {navItems.slice(1).map((item) => (
              <a key={item.href} href={item.href}>
                {item.label}
              </a>
            ))}
          </div>
        </div>
        <div>
          <h3>Contact</h3>
          <div className="footer-links">
            <a href="mailto:hello@viqsystems.tech">hello@viqsystems.tech</a>
            <span>Remote-friendly, worldwide</span>
          </div>
        </div>
      </div>
      <div className="wrap footer-bottom">
        <span>© 2026 Viq Systems</span>
        <span>Hand-crafted, not mass-produced</span>
      </div>
    </footer>
  )
}

function visualTone(icon) {
  if (icon.includes('brand-whatsapp')) {
    return 'sand'
  }
  if (icon.includes('receipt') || icon.includes('package')) {
    return 'slate'
  }
  if (icon.includes('database')) {
    return 'violet'
  }
  return 'teal'
}

export default App
