'use client';

import { Work } from '@/lib/supabase';

export default function Works({ works }: { works: Work[] }) {
  if (!works.length) {
    return (
      <section className="works" id="works">
        <div className="section__header reveal">
          <span className="section__label">PORTFOLIO</span>
          <h2 className="section__title">Our Work</h2>
          <p className="section__sub">
            Projects launching soon. Stay tuned.
          </p>
        </div>
        <div className="works__empty reveal">
          <div className="works__empty-icon">🚀</div>
          <p>We&apos;re cooking something amazing. First projects dropping soon.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="works" id="works">
      <div className="section__header reveal">
        <span className="section__label">PORTFOLIO</span>
        <h2 className="section__title">Our Work</h2>
        <p className="section__sub">
          Real projects. Real results. See what we&apos;ve built.
        </p>
      </div>

      <div className="works__grid">
        {works.map((work, i) => (
          <article
            key={work.id}
            className="work-card reveal"
            style={{ animationDelay: `${i * 0.12}s` }}
          >
            <div className="work-card__image">
              {work.image_url ? (
                <img
                  src={work.image_url}
                  alt={work.title}
                  loading="lazy"
                  width={600}
                  height={400}
                />
              ) : (
                <div className="work-card__placeholder">
                  <span>🌐</span>
                </div>
              )}
              {work.live_url && (
                <a
                  href={work.live_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="work-card__link"
                  aria-label={`Visit ${work.title}`}
                >
                  ↗
                </a>
              )}
            </div>
            <div className="work-card__info">
              <h3>{work.title}</h3>
              <p>{work.description}</p>
              {work.tags && work.tags.length > 0 && (
                <div className="work-card__tags">
                  {work.tags.map((tag) => (
                    <span key={tag} className="tag">{tag}</span>
                  ))}
                </div>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
