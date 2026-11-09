import { useEffect, useRef, useState } from 'react';
import {
  Bell,
  CalendarDays,
  ChevronDown,
  Music2,
  Trophy,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import './Home.css';

const registrationUrl =
  'https://docs.google.com/forms/d/e/1FAIpQLSeBjDQosF3JcJS3_ppiYy7RDRsSqxYpByt96PuLo2gutvbAWw/viewform?usp=dialog';

const homeFaqs = [
  {
    question: 'What is Kashmir Got Talent?',
    answer:
      'Kashmir Got Talent is a platform to discover, celebrate and showcase the incredible talent of Kashmir.',
  },
  {
    question: 'Who can participate?',
    answer:
      'The platform invites aspiring performers to step forward and share their creativity. Specific eligibility details have not been announced; please contact the team for clarification.',
  },
  {
    question: 'How can I register for auditions?',
    answer:
      'You can register using the official audition registration form. Further audition announcements and event details will be shared when available.',
  },
  {
    question: 'What talent categories are available?',
    answer:
      'Categories include Music & Sufi Traditions, Dance & Movement, Art & Craftsmanship, Poetry & Storytelling, Theatre & Performance, and Modern & Contemporary.',
  },
  {
    question: 'Where can I find audition updates?',
    answer:
      'Audition announcements and event details are coming soon. For a specific enquiry, contact the team through the Contact Us page.',
  },
];

const aboutPerformers = [
  {
    name: 'Singer',
    image: 'kgt-about-singer.png',
    className: 'about-collage__image--singer',
    depth: 0.42,
  },
  {
    name: 'Dancer',
    image: 'kgt-about-dancer.png',
    className: 'about-collage__image--dancer',
    depth: -0.75,
  },
  {
    name: 'Musician',
    image: 'kgt-about-musician.png',
    className: 'about-collage__image--musician',
    depth: 0.95,
  },
  {
    name: 'Actor',
    image: 'kgt-about-actor.png',
    className: 'about-collage__image--actor',
    depth: -0.5,
  },
  {
    name: 'Artist',
    image: 'kgt-about-artist.png',
    className: 'about-collage__image--artist',
    depth: 0.72,
  },
  {
    name: 'Poet',
    image: 'kgt-about-poet.png',
    className: 'about-collage__image--poet',
    depth: -0.9,
  },
];

const talentCategories = [
  {
    number: '01',
    title: 'Music & Sufi Traditions',
    description: 'Discover the sounds of Kashmir.',
    includes: 'Chakri, Sufiana, folk singing and instrumental music.',
    image: 'kgt-category-music.png',
    alt: 'Traditional Kashmiri musicians performing with folk instruments',
    className: 'talent-category--music',
    depth: 0.4,
  },
  {
    number: '02',
    title: 'Dance & Movement',
    description: 'Tradition expressed through movement.',
    includes: 'Rouf, Hafiza, folk dance and contemporary dance.',
    image: 'kgt-category-dance.png',
    alt: 'Kashmiri dancers performing together on stage',
    className: 'talent-category--dance',
    depth: -0.75,
  },
  {
    number: '03',
    title: 'Art & Craftsmanship',
    description: 'Creativity shaped by heritage.',
    includes: 'Papier-mâché, Pashmina artistry, wood carving, embroidery and painting.',
    image: 'kgt-category-art.png',
    alt: 'Artisan hand-painting a traditional Kashmiri papier-mâché object',
    className: 'talent-category--art',
    depth: 0.9,
  },
  {
    number: '04',
    title: 'Poetry & Storytelling',
    description: 'Stories and voices of Kashmir.',
    includes: 'Kashmiri poetry, storytelling and spoken word.',
    image: 'kgt-category-poetry.png',
    alt: 'Poet sharing spoken word on stage',
    className: 'talent-category--poetry',
    depth: -0.55,
  },
  {
    number: '05',
    title: 'Theatre & Performance',
    description: 'Bringing culture to life.',
    includes: 'Traditional theatre, acting, drama and cultural performances.',
    image: 'kgt-category-theatre.png',
    alt: 'Traditional Kashmiri theatre performer in costume',
    className: 'talent-category--theatre',
    depth: 0.7,
  },
  {
    number: '06',
    title: 'Modern & Contemporary',
    description: 'A new generation of creativity.',
    includes: 'Contemporary music, fusion, dance and creative performances.',
    image: 'kgt-category-contemporary.png',
    alt: 'Contemporary musicians performing together under stage lights',
    className: 'talent-category--contemporary',
    depth: -0.95,
  },
];

function AboutCollage() {
  const collageRef = useRef(null);
  const frameRef = useRef(null);
  const pointerRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    return () => {
      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current);
      }
    };
  }, []);

  function handlePointerMove(event) {
    if (
      event.pointerType !== 'mouse' ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      return;
    }

    const bounds = collageRef.current?.getBoundingClientRect();
    if (!bounds) return;

    pointerRef.current = {
      x: (event.clientX - bounds.left) / bounds.width - 0.5,
      y: (event.clientY - bounds.top) / bounds.height - 0.5,
    };

    if (frameRef.current !== null) return;

    frameRef.current = window.requestAnimationFrame(() => {
      const { x, y } = pointerRef.current;
      collageRef.current?.querySelectorAll('[data-depth]').forEach((image) => {
        const depth = Number(image.dataset.depth);
        image.style.setProperty('--pointer-x', `${x * depth * 16}px`);
        image.style.setProperty('--pointer-y', `${y * depth * 12}px`);
      });
      frameRef.current = null;
    });
  }

  function handlePointerLeave() {
    if (frameRef.current !== null) {
      window.cancelAnimationFrame(frameRef.current);
      frameRef.current = null;
    }

    collageRef.current?.querySelectorAll('[data-depth]').forEach((image) => {
      image.style.setProperty('--pointer-x', '0px');
      image.style.setProperty('--pointer-y', '0px');
    });
  }

  return (
    <div
      className="about-collage"
      ref={collageRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      aria-label="Kashmir talent performers"
    >
      {aboutPerformers.map(({ name, image, className, depth }) => (
        <figure
          className={`about-collage__image ${className}`}
          key={name}
          data-depth={depth}
          style={{ '--image-depth': depth }}
        >
          <img src={`/images/${image}`} alt={`${name} performing`} />
          <figcaption>{name}</figcaption>
        </figure>
      ))}
    </div>
  );
}

function TalentCategoriesSection() {
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);
  const frameRef = useRef(null);
  const pointerRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return undefined;

    const panels = section.querySelectorAll('.talent-category');
    const reduceMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;

    if (reduceMotion || !('IntersectionObserver' in window)) {
      panels.forEach((panel) => panel.classList.add('talent-category--visible'));
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('talent-category--visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.14, rootMargin: '0px 0px -4% 0px' },
    );

    panels.forEach((panel) => observer.observe(panel));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    return () => {
      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current);
      }
    };
  }, []);

  function handlePointerMove(event) {
    if (
      event.pointerType !== 'mouse' ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      return;
    }

    const bounds = canvasRef.current?.getBoundingClientRect();
    if (!bounds) return;

    pointerRef.current = {
      x: (event.clientX - bounds.left) / bounds.width - 0.5,
      y: (event.clientY - bounds.top) / bounds.height - 0.5,
    };

    if (frameRef.current !== null) return;

    frameRef.current = window.requestAnimationFrame(() => {
      const { x, y } = pointerRef.current;
      canvasRef.current?.querySelectorAll('[data-category-depth]').forEach((panel) => {
        const depth = Number(panel.dataset.categoryDepth);
        panel.style.setProperty('--category-pointer-x', `${x * depth * 14}px`);
        panel.style.setProperty('--category-pointer-y', `${y * depth * 10}px`);
      });
      frameRef.current = null;
    });
  }

  function handlePointerLeave() {
    if (frameRef.current !== null) {
      window.cancelAnimationFrame(frameRef.current);
      frameRef.current = null;
    }

    canvasRef.current?.querySelectorAll('[data-category-depth]').forEach((panel) => {
      panel.style.setProperty('--category-pointer-x', '0px');
      panel.style.setProperty('--category-pointer-y', '0px');
    });
  }

  return (
    <section
      className="talent-categories"
      aria-labelledby="talent-categories-title"
      ref={sectionRef}
    >
      <div className="talent-categories__inner">
        <header className="talent-categories__header">
          <p className="talent-categories__eyebrow">The art of Kashmir</p>
          <h2 className="talent-categories__title" id="talent-categories-title">
            A Culture of Talent. A Stage for Everyone.
          </h2>
          <p className="talent-categories__description">
            From timeless Kashmiri traditions to contemporary creativity,
            discover the many ways talent comes alive.
          </p>
        </header>

        <div
          className="talent-categories__canvas"
          ref={canvasRef}
          onPointerMove={handlePointerMove}
          onPointerLeave={handlePointerLeave}
        >
          {talentCategories.map((category) => (
            <article
              className={`talent-category ${category.className}`}
              key={category.number}
              tabIndex={0}
              data-category-depth={category.depth}
            >
              <img
                className="talent-category__image"
                src={`/images/${category.image}`}
                alt={category.alt}
                loading="lazy"
              />
              <div className="talent-category__content">
                <span className="talent-category__number">
                  Category {category.number}
                </span>
                <h3 className="talent-category__name">{category.title}</h3>
                <div className="talent-category__details">
                  <p className="talent-category__summary">
                    {category.description}
                  </p>
                  <p className="talent-category__includes">
                    <span>Includes</span>
                    {category.includes}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function AuditionsEventsSection() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return undefined;

    if (
      window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
      !('IntersectionObserver' in window)
    ) {
      section.classList.add('auditions-events--visible');
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          section.classList.add('auditions-events--visible');
          observer.disconnect();
        }
      },
      { threshold: 0.12 },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      className="auditions-events"
      aria-labelledby="auditions-events-title"
      ref={sectionRef}
    >
      <div className="auditions-events__inner">
        <div className="auditions-events__main">
          <div className="auditions-events__copy">
            <p className="auditions-events__eyebrow">
              <span aria-hidden="true" />
              Your journey starts here
            </p>
            <h2 className="auditions-events__title" id="auditions-events-title">
              The Stage Is Calling. Are You Ready?
            </h2>
            <p className="auditions-events__description">
              Have a talent worth sharing? Kashmir Got Talent invites aspiring
              performers to step forward, express their creativity and showcase
              their abilities on a platform that celebrates the spirit of Kashmir.
            </p>
            <div className="auditions-events__actions">
              <a
                className="auditions-events__button auditions-events__button--primary"
                href={registrationUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Register for Auditions <span aria-hidden="true">→</span>
              </a>
              <Link
                className="auditions-events__button auditions-events__button--secondary"
                to="/talent-categories"
              >
                Explore Talent Categories <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>

          <aside className="auditions-events__announcement" aria-labelledby="upcoming-events-title">
            <img
              className="auditions-events__announcement-image"
              src="/images/kgt-upcoming-events.png"
              alt="A warmly lit stage and audience awaiting an upcoming event"
              loading="lazy"
            />
            <div className="auditions-events__announcement-content">
              <div className="auditions-events__announcement-meta">
                <span>Upcoming events</span>
                <span className="auditions-events__status">Coming soon</span>
              </div>
              <h3 id="upcoming-events-title">
                Something Extraordinary Is on Its Way.
              </h3>
              <p>
                A celebration of talent, creativity and entertainment is coming
                to Kashmir. Stay tuned for audition announcements, event dates
                and venue details.
              </p>
            </div>
          </aside>
        </div>

        <ul className="auditions-events__information" aria-label="What to expect">
          <li>
            <CalendarDays aria-hidden="true" />
            <span>Audition announcements</span>
          </li>
          <li>
            <Music2 aria-hidden="true" />
            <span>Performance categories</span>
          </li>
          <li>
            <Bell aria-hidden="true" />
            <span>Upcoming event updates</span>
          </li>
        </ul>
      </div>
    </section>
  );
}

function WhyKashmirGotTalentSection() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return undefined;

    if (
      window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
      !('IntersectionObserver' in window)
    ) {
      section.classList.add('why-kgt--visible');
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          section.classList.add('why-kgt--visible');
          observer.disconnect();
        }
      },
      { threshold: 0.18 },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      className="why-kgt"
      aria-labelledby="why-kgt-title"
      ref={sectionRef}
    >
      <div className="why-kgt__inner">
        <div className="why-kgt__intro">
          <div className="why-kgt__story">
            <p className="why-kgt__eyebrow">More than just a stage</p>
            <h2 className="why-kgt__title" id="why-kgt-title">
              <span className="why-kgt__title-line">
                <span>Your <em>Talent.</em></span>
              </span>
              <span className="why-kgt__title-line">
                <span>Your <em>Identity.</em></span>
              </span>
              <span className="why-kgt__title-line">
                <span>Your <em>Moment.</em></span>
              </span>
            </h2>
          </div>
          <p className="why-kgt__description">
            Every performer has a unique story. Kashmir Got Talent aims to
            celebrate individuality, bring creativity into the spotlight and
            provide a platform where talent can be appreciated.
          </p>
        </div>

        <ol className="why-kgt__highlights">
          <li className="why-kgt__highlight">
            <span className="why-kgt__number">01</span>
            <div className="why-kgt__highlight-copy">
              <h3>Celebrate Your Talent</h3>
              <p>Let your passion and creativity take centre stage.</p>
            </div>
          </li>
          <li className="why-kgt__highlight">
            <span className="why-kgt__number">02</span>
            <div className="why-kgt__highlight-copy">
              <h3>Showcase Your Culture</h3>
              <p>
                Celebrate Kashmir's artistic heritage and contemporary
                expression.
              </p>
            </div>
          </li>
          <li className="why-kgt__highlight">
            <span className="why-kgt__number">03</span>
            <div className="why-kgt__highlight-copy">
              <h3>Be Part of the Journey</h3>
              <p>Join a platform that brings diverse talents together.</p>
            </div>
          </li>
        </ol>
      </div>
    </section>
  );
}

const eventHighlights = [
  {
    name: 'Music',
    image: 'kgt-event-music.png',
    alt: 'A singer performing under warm stage lights',
    className: 'event-highlight--music',
    depth: 0.65,
    featured: true,
  },
  {
    name: 'Dance',
    image: 'kgt-event-dance.png',
    alt: 'Kashmiri dancers performing together on stage',
    className: 'event-highlight--dance',
    depth: -0.75,
  },
  {
    name: 'Santoor',
    image: 'kgt-event-santoor.png',
    alt: 'A musician performing on the santoor',
    className: 'event-highlight--santoor',
    depth: 0.9,
  },
  {
    name: 'Showcase',
    image: 'kgt-event-showcase.png',
    alt: 'A broad view of performers on a warmly lit stage',
    className: 'event-highlight--showcase',
    depth: -0.5,
  },
];

const sponsorPartners = [
  {
    name: 'Prismatic Kashmir',
    image: 'sponsor-01-transparent.png',
  },
  {
    name: 'Indian Army',
    image: 'sponsor-02-transparent.png',
  },
  {
    name: 'Jammu and Kashmir Tourism',
    image: 'sponsor-03-transparent.png',
  },
  {
    name: 'Government Degree College Kupwara',
    image: 'sponsor-04-transparent.png',
  },
  {
    name: 'District Administration Kupwara',
    image: 'sponsor-05-transparent.png',
  },
  {
    name: 'Kupwara Police',
    image: 'sponsor-06-transparent.png',
  },
  {
    name: 'Mission Yuva',
    image: 'sponsor-07-transparent.png',
  },
  {
    name: 'Radio Kupwara 89.6 FM',
    image: 'sponsor-08-transparent.png',
  },
  {
    name: 'Taha Film International',
    image: 'sponsor-09-transparent.png',
  },
];

const galleryPreviewImages = [
  {
    name: 'Music',
    image: 'kgt-event-music.png',
    alt: 'Representative image of a singer performing under warm stage lights',
    className: 'gallery-preview__image--featured',
    depth: 0.55,
  },
  {
    name: 'Dance',
    image: 'kgt-event-dance.png',
    alt: 'Representative image of Kashmiri dancers performing together',
    className: 'gallery-preview__image--dance',
    depth: -0.75,
  },
  {
    name: 'Craft',
    image: 'kgt-category-art.png',
    alt: 'Representative image of an artisan creating traditional Kashmiri papier-mâché art',
    className: 'gallery-preview__image--craft',
    depth: 0.85,
  },
  {
    name: 'Poetry',
    image: 'kgt-category-poetry.png',
    alt: 'Representative image of a performer sharing poetry on stage',
    className: 'gallery-preview__image--poetry',
    depth: -0.5,
  },
];

function EventHighlightsSection() {
  const sectionRef = useRef(null);
  const galleryRef = useRef(null);
  const frameRef = useRef(null);
  const pointerRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return undefined;

    const frames = section.querySelectorAll('.event-highlight');
    const reducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;

    if (reducedMotion || !('IntersectionObserver' in window)) {
      frames.forEach((frame) => frame.classList.add('event-highlight--visible'));
      section.classList.add('event-highlights--visible');
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('event-highlight--visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.14, rootMargin: '0px 0px -3% 0px' },
    );

    frames.forEach((frame) => observer.observe(frame));

    const headingObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          section.classList.add('event-highlights--visible');
          headingObserver.disconnect();
        }
      },
      { threshold: 0.25 },
    );

    headingObserver.observe(section.querySelector('.event-highlights__header'));

    return () => {
      observer.disconnect();
      headingObserver.disconnect();
      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current);
      }
    };
  }, []);

  function handlePointerMove(event) {
    if (
      event.pointerType !== 'mouse' ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      return;
    }

    const bounds = galleryRef.current?.getBoundingClientRect();
    if (!bounds) return;

    pointerRef.current = {
      x: (event.clientX - bounds.left) / bounds.width - 0.5,
      y: (event.clientY - bounds.top) / bounds.height - 0.5,
    };

    if (frameRef.current !== null) return;

    frameRef.current = window.requestAnimationFrame(() => {
      const { x, y } = pointerRef.current;
      galleryRef.current?.querySelectorAll('[data-event-depth]').forEach((frame) => {
        const depth = Number(frame.dataset.eventDepth);
        frame.style.setProperty('--event-pointer-x', `${x * depth * 12}px`);
        frame.style.setProperty('--event-pointer-y', `${y * depth * 9}px`);
      });
      frameRef.current = null;
    });
  }

  function handlePointerLeave() {
    if (frameRef.current !== null) {
      window.cancelAnimationFrame(frameRef.current);
      frameRef.current = null;
    }

    galleryRef.current?.querySelectorAll('[data-event-depth]').forEach((frame) => {
      frame.style.setProperty('--event-pointer-x', '0px');
      frame.style.setProperty('--event-pointer-y', '0px');
    });
  }

  return (
    <section
      className="event-highlights"
      aria-labelledby="event-highlights-title"
      ref={sectionRef}
    >
      <div className="event-highlights__inner">
        <header className="event-highlights__header">
          <p className="event-highlights__eyebrow">The experience</p>
          <h2 className="event-highlights__title" id="event-highlights-title">
            <span className="event-highlights__title-line">
              <span>A Celebration of</span>
            </span>
            <span className="event-highlights__title-line">
              <span>Talent &amp; <em>Creativity.</em></span>
            </span>
          </h2>
          <p className="event-highlights__description">
            A platform where passion meets performance, creativity finds
            expression and the spirit of Kashmir takes centre stage.
          </p>
        </header>

        <div
          className="event-highlights__gallery"
          ref={galleryRef}
          onPointerMove={handlePointerMove}
          onPointerLeave={handlePointerLeave}
          aria-label="Representative cultural performance photography"
        >
          {eventHighlights.map(({ name, image, alt, className, depth, featured }) => (
            <figure
              className={`event-highlight ${className}${featured ? ' event-highlight--featured' : ''}`}
              key={image}
              data-event-depth={depth}
            >
              <img
                src={`/images/${image}`}
                alt={alt}
                loading="lazy"
              />
              <figcaption>{name}</figcaption>
            </figure>
          ))}
        </div>
        <p className="event-highlights__note">
          Representative cultural visuals.
        </p>
      </div>
    </section>
  );
}

function SponsorsPartnersSection() {
  return (
    <section
      className="sponsors-partners"
      id="sponsors-partners"
      aria-labelledby="sponsors-partners-title"
    >
      <div className="sponsors-partners__inner">
        <header className="sponsors-partners__header">
          <p className="sponsors-partners__eyebrow">Our partners</p>
          <h2
            className="sponsors-partners__title"
            id="sponsors-partners-title"
          >
            Proudly Supported By
          </h2>
          <p className="sponsors-partners__description">
            Together, we celebrate talent, creativity and the spirit of Kashmir.
          </p>
        </header>
      </div>

      <div className="sponsors-partners__viewport">
        <div className="sponsors-partners__track">
          <ul className="sponsors-partners__group" aria-label="Our sponsors and partners">
            {sponsorPartners.map(({ name, image }) => (
              <li className="sponsors-partners__item" key={image}>
                <img
                  src={`/images/${image}`}
                  alt={name}
                  loading="lazy"
                />
              </li>
            ))}
          </ul>
          <ul
            className="sponsors-partners__group"
            aria-hidden="true"
          >
            {sponsorPartners.map(({ name, image }) => (
              <li className="sponsors-partners__item" key={image}>
                <img
                  src={`/images/${image}`}
                  alt=""
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function WinnersComingSoonSection() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return undefined;

    if (
      window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
      !('IntersectionObserver' in window)
    ) {
      section.classList.add('winners-coming-soon--visible');
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          section.classList.add('winners-coming-soon--visible');
          observer.disconnect();
        }
      },
      { threshold: 0.18 },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      className="winners-coming-soon"
      aria-labelledby="winners-coming-soon-title"
      ref={sectionRef}
    >
      <div className="winners-coming-soon__inner">
        <header className="winners-coming-soon__header">
          <p className="winners-coming-soon__eyebrow">
            <span aria-hidden="true" />
            Celebrating excellence
            <span aria-hidden="true" />
          </p>
          <h2
            className="winners-coming-soon__title"
            id="winners-coming-soon-title"
          >
            <span className="winners-coming-soon__title-line">
              <span>Every Great Journey</span>
            </span>
            <span className="winners-coming-soon__title-line">
              <span>
                Deserves a <em>Celebration.</em>
              </span>
            </span>
          </h2>
          <p className="winners-coming-soon__description">
            The stories of extraordinary talent and remarkable achievements
            will soon take the spotlight. Stay tuned as we celebrate the
            winners of Kashmir Got Talent.
          </p>
        </header>

        <div className="winners-coming-soon__ceremony">
          <span
            className="winners-coming-soon__ornament winners-coming-soon__ornament--left"
            aria-hidden="true"
          />
          <div className="winners-coming-soon__emblem" aria-hidden="true">
            <span className="winners-coming-soon__emblem-ring">
              <Trophy className="winners-coming-soon__trophy" strokeWidth={1.15} />
            </span>
          </div>
          <span
            className="winners-coming-soon__ornament winners-coming-soon__ornament--right"
            aria-hidden="true"
          />
        </div>

        <div className="winners-coming-soon__announcement">
          <p className="winners-coming-soon__status">
            <span aria-hidden="true" />
            Winners — Coming Soon
          </p>
          <p className="winners-coming-soon__supporting">
            The spotlight will soon reveal its stars.
          </p>
        </div>
      </div>
    </section>
  );
}

function GalleryPreviewSection() {
  const sectionRef = useRef(null);
  const galleryRef = useRef(null);
  const frameRef = useRef(null);
  const pointerRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return undefined;

    const images = section.querySelectorAll('.gallery-preview__image');

    if (
      window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
      !('IntersectionObserver' in window)
    ) {
      section.classList.add('gallery-preview--visible');
      images.forEach((image) =>
        image.classList.add('gallery-preview__image--visible'),
      );
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          if (entry.target === section.querySelector('.gallery-preview__header')) {
            section.classList.add('gallery-preview--visible');
          } else {
            entry.target.classList.add('gallery-preview__image--visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.16, rootMargin: '0px 0px -3% 0px' },
    );

    observer.observe(section.querySelector('.gallery-preview__header'));
    images.forEach((image) => observer.observe(image));

    return () => {
      observer.disconnect();
      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current);
      }
    };
  }, []);

  function handlePointerMove(event) {
    if (
      event.pointerType !== 'mouse' ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      return;
    }

    const bounds = galleryRef.current?.getBoundingClientRect();
    if (!bounds) return;

    pointerRef.current = {
      x: (event.clientX - bounds.left) / bounds.width - 0.5,
      y: (event.clientY - bounds.top) / bounds.height - 0.5,
    };

    if (frameRef.current !== null) return;

    frameRef.current = window.requestAnimationFrame(() => {
      const { x, y } = pointerRef.current;
      galleryRef.current
        ?.querySelectorAll('[data-gallery-depth]')
        .forEach((image) => {
          const depth = Number(image.dataset.galleryDepth);
          image.style.setProperty('--gallery-pointer-x', `${x * depth * 10}px`);
          image.style.setProperty('--gallery-pointer-y', `${y * depth * 8}px`);
        });
      frameRef.current = null;
    });
  }

  function handlePointerLeave() {
    if (frameRef.current !== null) {
      window.cancelAnimationFrame(frameRef.current);
      frameRef.current = null;
    }

    galleryRef.current
      ?.querySelectorAll('[data-gallery-depth]')
      .forEach((image) => {
        image.style.setProperty('--gallery-pointer-x', '0px');
        image.style.setProperty('--gallery-pointer-y', '0px');
      });
  }

  return (
    <section
      className="gallery-preview"
      aria-labelledby="gallery-preview-title"
      ref={sectionRef}
    >
      <div className="gallery-preview__inner">
        <header className="gallery-preview__header">
          <p className="gallery-preview__eyebrow">A glimpse of the journey</p>
          <h2 className="gallery-preview__title" id="gallery-preview-title">
            <span className="gallery-preview__title-line">
              <span>Moments That Deserve</span>
            </span>
            <span className="gallery-preview__title-line">
              <span>to Be <em>Remembered.</em></span>
            </span>
          </h2>
          <p className="gallery-preview__description">
            Explore glimpses of talent, creativity and unforgettable moments
            from Kashmir Got Talent. Every frame captures the passion,
            expression and spirit of our artistic community.
          </p>
        </header>

        <div
          className="gallery-preview__gallery"
          ref={galleryRef}
          onPointerMove={handlePointerMove}
          onPointerLeave={handlePointerLeave}
          aria-label="Representative cultural and performance photography"
        >
          {galleryPreviewImages.map(
            ({ name, image, alt, className, depth }, index) => (
              <figure
                className={`gallery-preview__image ${className}`}
                key={image}
                data-gallery-depth={depth}
                style={{ '--gallery-reveal-delay': `${index * 110}ms` }}
              >
                <img src={`/images/${image}`} alt={alt} loading="lazy" />
                <figcaption>{name}</figcaption>
              </figure>
            ),
          )}
        </div>

        <div className="gallery-preview__footer">
          <p className="gallery-preview__note">
            Representative cultural visuals. The full gallery is coming soon.
          </p>
          <p className="gallery-preview__status">
            <span aria-hidden="true" />
            Full gallery — Coming soon
          </p>
          <Link className="gallery-preview__link" to="/gallery">
            Explore full gallery <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

function HomeFaqPreviewSection() {
  const sectionRef = useRef(null);
  const [expandedIndex, setExpandedIndex] = useState(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return undefined;

    if (
      window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
      !('IntersectionObserver' in window)
    ) {
      section.classList.add('home-faq-preview--visible');
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          section.classList.add('home-faq-preview--visible');
          observer.disconnect();
        }
      },
      { threshold: 0.12 },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      className="home-faq-preview"
      id="home-faq-preview"
      aria-labelledby="home-faq-preview-title"
      ref={sectionRef}
    >
      <div className="home-faq-preview__inner">
        <header className="home-faq-preview__header">
          <p className="home-faq-preview__eyebrow">Got questions?</p>
          <h2 className="home-faq-preview__title" id="home-faq-preview-title">
            Everything You Need to Know.
          </h2>
          <p className="home-faq-preview__description">
            Find answers to common questions about Kashmir Got Talent,
            auditions and participation.
          </p>
          <Link className="home-faq-preview__all-link" to="/faqs">
            View all FAQs <span aria-hidden="true">→</span>
          </Link>
        </header>

        <div className="home-faq-preview__list">
          {homeFaqs.map(({ question, answer }, index) => {
            const isExpanded = expandedIndex === index;
            const answerId = `home-faq-answer-${index + 1}`;

            return (
              <article
                className={`home-faq-preview__item${isExpanded ? ' home-faq-preview__item--open' : ''}`}
                key={question}
                style={{ '--faq-reveal-delay': `${index * 80}ms` }}
              >
                <h3 className="home-faq-preview__question-heading">
                  <button
                    className="home-faq-preview__question"
                    type="button"
                    id={`home-faq-question-${index + 1}`}
                    aria-expanded={isExpanded}
                    aria-controls={answerId}
                    onClick={() =>
                      setExpandedIndex(isExpanded ? null : index)
                    }
                  >
                    <span>{question}</span>
                    <ChevronDown aria-hidden="true" />
                  </button>
                </h3>
                <div
                  className="home-faq-preview__answer"
                  id={answerId}
                  role="region"
                  aria-labelledby={`home-faq-question-${index + 1}`}
                  aria-hidden={!isExpanded}
                  inert={isExpanded ? undefined : ''}
                >
                  <div className="home-faq-preview__answer-inner">
                    <p>{answer}</p>
                    {index === 2 ? (
                      <a
                        href={registrationUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Open the official registration form
                      </a>
                    ) : null}
                    {index === 4 ? (
                      <Link to="/contact-us">Contact the team</Link>
                    ) : null}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function HomeContactCtaSection() {
  const sectionRef = useRef(null);
  const frameRef = useRef(null);
  const pointerRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return undefined;

    const reducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    );
    let observer = null;

    if (reducedMotion.matches || !('IntersectionObserver' in window)) {
      section.classList.add('home-contact-cta--visible');
    } else {
      observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            section.classList.add('home-contact-cta--visible');
            observer.disconnect();
          }
        },
        { threshold: 0.3 },
      );
      observer.observe(section);
    }

    function handlePointerMove(event) {
      if (
        event.pointerType !== 'mouse' ||
        window.matchMedia('(pointer: coarse)').matches ||
        window.matchMedia('(max-width: 60rem)').matches ||
        reducedMotion.matches ||
        frameRef.current !== null
      ) {
        return;
      }

      const bounds = section.getBoundingClientRect();
      pointerRef.current = {
        x: event.clientX - bounds.left,
        y: event.clientY - bounds.top,
      };

      frameRef.current = window.requestAnimationFrame(() => {
        const { x, y } = pointerRef.current;
        section.style.setProperty('--contact-cta-pointer-x', `${x}px`);
        section.style.setProperty('--contact-cta-pointer-y', `${y}px`);
        frameRef.current = null;
      });
    }

    function handlePointerLeave() {
      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current);
        frameRef.current = null;
      }
      section.style.setProperty('--contact-cta-pointer-x', '50%');
      section.style.setProperty('--contact-cta-pointer-y', '50%');
    }

    section.addEventListener('pointermove', handlePointerMove, {
      passive: true,
    });
    section.addEventListener('pointerleave', handlePointerLeave);

    return () => {
      observer?.disconnect();
      section.removeEventListener('pointermove', handlePointerMove);
      section.removeEventListener('pointerleave', handlePointerLeave);
      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current);
      }
    };
  }, []);

  return (
    <section
      className="home-contact-cta"
      aria-labelledby="home-contact-cta-title"
      ref={sectionRef}
    >
      <div className="home-contact-cta__inner">
        <p className="home-contact-cta__eyebrow">
          <span aria-hidden="true" />
          Let&apos;s start a conversation
        </p>
        <h2 className="home-contact-cta__title" id="home-contact-cta-title">
          <span className="home-contact-cta__title-line">
            <span>Have Something in Mind?</span>
          </span>
          <span className="home-contact-cta__title-line">
            <span>
              Let&apos;s <em>Talk.</em>
            </span>
          </span>
        </h2>
        <p className="home-contact-cta__description">
          Whether you have a question, an idea or an opportunity to collaborate,
          we&apos;d love to hear from you. Get in touch with the Kashmir Got
          Talent team.
        </p>
        <Link className="home-contact-cta__link" to="/contact-us">
          Get in touch <span aria-hidden="true">→</span>
        </Link>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <main className="page--home">
      <section className="home-hero" aria-labelledby="home-hero-title">
        <div className="home-hero__content">
          <p className="home-hero__eyebrow">
            <span aria-hidden="true" />
            Kashmir's biggest talent platform
          </p>
          <h1 className="home-hero__title" id="home-hero-title">
            The stage is yours.
          </h1>
          <p className="home-hero__description">
            A platform to discover, celebrate and showcase the incredible
            talent of Kashmir.
          </p>
          <div className="home-hero__actions">
            <Link
              className="home-hero__button home-hero__button--primary"
              to="/talent-categories"
            >
              Explore Talent
            </Link>
            <a
              className="home-hero__button home-hero__button--secondary"
              href={registrationUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Register for Auditions
            </a>
          </div>
        </div>

        <div className="home-hero__scroll" aria-hidden="true">
          <span>Discover what’s possible</span>
          <ChevronDown />
        </div>
      </section>

      <section className="home-about" aria-labelledby="home-about-title">
        <div className="home-about__inner">
          <div className="home-about__content">
            <p className="home-about__eyebrow">About the platform</p>
            <h2 className="home-about__title" id="home-about-title">
              A stage for every kind of talent.
            </h2>
            <p className="home-about__description">
              Celebrating the performers, makers and storytellers who bring
              Kashmir’s creative spirit to life.
            </p>
            <Link className="home-about__link" to="/about-us">
              Discover our story
              <span aria-hidden="true">→</span>
            </Link>
          </div>
          <AboutCollage />
        </div>
      </section>

      <TalentCategoriesSection />
      <AuditionsEventsSection />
      <WhyKashmirGotTalentSection />
      <EventHighlightsSection />
      <SponsorsPartnersSection />
      <WinnersComingSoonSection />
      <GalleryPreviewSection />
      <HomeFaqPreviewSection />
      <HomeContactCtaSection />
    </main>
  );
}
