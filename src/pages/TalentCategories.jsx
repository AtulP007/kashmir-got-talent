import { useState } from 'react';
import './TalentCategories.css';

const registrationUrl =
  'https://docs.google.com/forms/d/e/1FAIpQLSeBjDQosF3JcJS3_ppiYy7RDRsSqxYpByt96PuLo2gutvbAWw/viewform';

const categories = [
  {
    id: 'music-sufi',
    name: 'Music & Sufi Traditions',
    description:
      'Discover the sounds of Kashmir through traditional folk music, Sufi singing and instrumental performances.',
    subcategories: [
      'Kashmiri Folk Singing',
      'Sufi & Sufiana Music',
      'Instrumental Music',
      'Contemporary Singing',
    ],
  },
  {
    id: 'dance-movement',
    name: 'Dance & Movement',
    description:
      'Celebrate the rhythm, energy and expression of traditional and contemporary dance forms.',
    subcategories: ['Rouf Dance', 'Hafiza Dance', 'Folk Dance', 'Contemporary Dance'],
  },
  {
    id: 'art-craftsmanship',
    name: 'Art & Craftsmanship',
    description:
      'Showcase creativity through artistic expression, traditional craftsmanship and visual arts.',
    subcategories: [
      'Papier-mâché Art',
      'Painting & Sketching',
      'Pashmina Artistry',
      'Wood Carving & Handicrafts',
    ],
  },
  {
    id: 'poetry-storytelling',
    name: 'Poetry & Storytelling',
    description:
      'Give your words a voice and share stories, emotions and expressions with the world.',
    subcategories: ['Kashmiri Poetry', 'Urdu & Hindi Poetry', 'Storytelling', 'Spoken Word'],
  },
  {
    id: 'theatre-performance',
    name: 'Theatre & Performance',
    description:
      'Bring characters, stories and creativity to life through the power of performance.',
    subcategories: ['Acting', 'Drama & Theatre', 'Monologues', 'Cultural Performances'],
  },
  {
    id: 'modern-contemporary',
    name: 'Modern & Contemporary',
    description:
      'Explore new-age creativity, modern expressions and innovative performance styles.',
    subcategories: ['Contemporary Music', 'Fusion Performances', 'Modern Dance', 'Creative Acts'],
  },
];

export default function TalentCategories() {
  const [expandedCategoryId, setExpandedCategoryId] = useState(null);

  return (
    <main className="categories-page">
      <section className="categories-hero" aria-labelledby="categories-hero-title">
        <div className="categories-hero__content">
          <p className="categories-eyebrow">The Art of Kashmir</p>
          <h1 className="categories-hero__title" id="categories-hero-title">
            Every Talent Has Its Own <span>Stage.</span>
          </h1>
          <p className="categories-hero__description">
            From timeless traditions to modern expressions, discover the diverse
            creative talents that make Kashmir extraordinary.
          </p>
        </div>
        <a className="categories-hero__scroll" href="#categories-intro">
          <span>Explore the possibilities</span>
        </a>
      </section>

      <section
        className="categories-intro categories-shell"
        id="categories-intro"
        aria-labelledby="categories-intro-title"
      >
        <p className="categories-eyebrow">Discover Your Passion</p>
        <div className="categories-intro__body">
          <h2 className="categories-heading" id="categories-intro-title">
            One Platform.<br />
            <span>Countless Possibilities.</span>
          </h2>
          <div className="categories-intro__copy">
            <p>
              Every individual has a unique way of expressing creativity.
              Whether through music, movement, art, words or performance,
              Kashmir Got Talent celebrates every form of talent and gives
              creativity a place to shine.
            </p>
          </div>
        </div>
      </section>

      <section className="categories-explore" aria-labelledby="categories-explore-title">
        <div className="categories-shell">
          <header className="categories-explore__header">
            <p className="categories-eyebrow">Explore Your Talent</p>
            <h2 className="categories-heading" id="categories-explore-title">
              Find Your Creative <span>Expression.</span>
            </h2>
            <p>Explore the many ways to bring your creativity to the stage.</p>
          </header>
          <div className="categories-list">
            {categories.map((category, index) => {
              const isExpanded = expandedCategoryId === category.id;
              const detailsId = `category-details-${category.id}`;

              return (
                <article
                  className={`category-entry${isExpanded ? ' category-entry--open' : ''}`}
                  key={category.id}
                >
                  <span className="category-entry__number" aria-hidden="true">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <div className="category-entry__main">
                    <h3>
                      <button
                        className="category-entry__toggle"
                        type="button"
                        aria-expanded={isExpanded}
                        aria-controls={detailsId}
                        onClick={() =>
                          setExpandedCategoryId((current) =>
                            current === category.id ? null : category.id,
                          )
                        }
                      >
                        <span>{category.name}</span>
                      </button>
                    </h3>
                    <p className="category-entry__description">{category.description}</p>
                    <div
                      className="category-entry__details"
                      id={detailsId}
                      aria-hidden={!isExpanded}
                      inert={isExpanded ? undefined : ''}
                    >
                      <div className="category-entry__details-inner">
                        <ul className="category-entry__subcategories">
                          {category.subcategories.map((subcategory) => (
                            <li key={subcategory}>{subcategory}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="categories-cta" aria-labelledby="categories-cta-title">
        <div className="categories-cta__content">
          <p className="categories-eyebrow">Your Talent Matters</p>
          <h2 className="categories-heading" id="categories-cta-title">
            No Matter Your Talent,<br />
            There Is a Place <span>for You.</span>
          </h2>
          <p>
            Your creativity deserves to be seen, your passion deserves to be
            celebrated and your journey deserves a stage.
          </p>
          <a
            className="categories-cta__button"
            href={registrationUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Register Now
          </a>
        </div>
      </section>
    </main>
  );
}
