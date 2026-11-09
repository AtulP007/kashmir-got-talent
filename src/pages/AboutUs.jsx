import { useEffect, useRef } from 'react';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import './AboutUs.css';

const registrationUrl =
  'https://docs.google.com/forms/d/e/1FAIpQLSeBjDQosF3JcJS3_ppiYy7RDRsSqxYpByt96PuLo2gutvbAWw/viewform';

const armyAssociation = {
  enabled: false,
  verifiedDetails: '', // Add sourced, verified details before enabling this section.
};

const values = [
  {
    name: 'Inclusivity',
    description: 'Every individual deserves a chance to express their talent.',
  },
  {
    name: 'Creativity',
    description: 'We encourage originality, imagination and new perspectives.',
  },
  {
    name: 'Cultural Pride',
    description: 'We celebrate the artistic traditions and creative identity of Kashmir.',
  },
  {
    name: 'Opportunity',
    description: 'We believe talent should have a platform to be discovered and appreciated.',
  },
  {
    name: 'Recognition',
    description: 'Every effort, performance and creative expression deserves respect.',
  },
];

const talentForms = [
  {
    name: 'Music & Sufi Traditions',
    description: 'Discover the sounds and musical heritage of Kashmir.',
    image: '/images/about-talent-music.webp',
    className: 'about-gallery__item--music',
  },
  {
    name: 'Dance & Movement',
    description: 'Tradition and expression brought to life through movement.',
    image: '/images/about-talent-dance.webp',
    className: 'about-gallery__item--dance',
  },
  {
    name: 'Art & Craftsmanship',
    description: 'Creativity shaped by heritage and skilled hands.',
    image: '/images/about-talent-art.webp',
    className: 'about-gallery__item--art',
  },
  {
    name: 'Poetry & Storytelling',
    description: 'Voices, emotions and stories expressed through words.',
    image: '/images/about-talent-poetry.webp',
    className: 'about-gallery__item--poetry',
  },
];

const journeyStages = [
  {
    name: 'Discover Your Potential',
    description: 'Recognise your abilities and take the first step.',
  },
  {
    name: 'Express Your Creativity',
    description: 'Showcase your individuality and passion.',
  },
  {
    name: 'Inspire Others',
    description: 'Let your journey encourage others to follow their passion.',
  },
];

function AboutImage({
  src,
  alt,
  className = '',
  loading = 'lazy',
  imageWidth = 1024,
  sizes = '100vw',
}) {
  return (
    <img
      className={className}
      src={src}
      srcSet={`${src.replace('.webp', '-480.webp')} 480w, ${src} ${imageWidth}w`}
      sizes={sizes}
      alt={alt}
      loading={loading}
      decoding="async"
      fetchpriority={loading === 'eager' ? 'high' : 'auto'}
      onError={(event) => {
        event.currentTarget.hidden = true;
      }}
    />
  );
}

function AboutUs() {
  const pageRef = useRef(null);

  useEffect(() => {
    const page = pageRef.current;
    if (!page || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return undefined;
    }

    if (!('IntersectionObserver' in window)) {
      return undefined;
    }

    page.classList.add('about-page--enhanced');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.14, rootMargin: '0px 0px -35px 0px' },
    );

    page.querySelectorAll('.about-reveal').forEach((element) => {
      observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const page = pageRef.current;
    if (
      !page ||
      window.matchMedia(
        '(pointer: coarse), (max-width: 48rem), (prefers-reduced-motion: reduce)',
      ).matches
    ) {
      return undefined;
    }

    const elements = [...page.querySelectorAll('.about-parallax')];
    let frameId = 0;

    function updateParallax() {
      frameId = 0;
      const viewportCenter = window.innerHeight / 2;

      elements.forEach((element) => {
        const bounds = element.getBoundingClientRect();
        const distance = (bounds.top + bounds.height / 2 - viewportCenter) / window.innerHeight;
        const offset = Math.max(-1, Math.min(1, distance)) * -13;
        element.style.setProperty('--about-parallax-offset', `${offset.toFixed(1)}px`);
      });
    }

    function requestParallaxUpdate() {
      if (!frameId) frameId = window.requestAnimationFrame(updateParallax);
    }

    requestParallaxUpdate();
    window.addEventListener('scroll', requestParallaxUpdate, { passive: true });
    window.addEventListener('resize', requestParallaxUpdate);

    return () => {
      window.removeEventListener('scroll', requestParallaxUpdate);
      window.removeEventListener('resize', requestParallaxUpdate);
      if (frameId) window.cancelAnimationFrame(frameId);
    };
  }, []);

  return (
    <main className="about-page" id="about-us-section" ref={pageRef}>
      <section className="about-hero" aria-labelledby="about-hero-title">
        <AboutImage
          className="about-hero__image about-parallax"
          src="/images/about-hero.webp"
          alt=""
          loading="eager"
        />
        <div className="about-hero__shade" />
        <div className="about-hero__content">
          <p className="about-eyebrow about-reveal">Our Story</p>
          <h1 className="about-hero__title about-reveal" id="about-hero-title">
            Every Talent Has a <span>Story.</span>
            <br />
            Every Story Deserves a <span>Stage.</span>
          </h1>
          <p className="about-hero__description about-reveal">
            Kashmir is filled with extraordinary talent, creativity and passion.
            We believe every individual deserves an opportunity to express their
            abilities and be recognised.
          </p>
        </div>
        <a className="about-hero__scroll" href="#about-who-we-are">
          <span>Discover our story</span>
          <ArrowDown aria-hidden="true" size={16} strokeWidth={1.5} />
        </a>
      </section>

      <section
        className="about-who section-shell"
        id="about-who-we-are"
        aria-labelledby="about-who-title"
      >
        <div className="about-who__copy about-reveal">
          <p className="about-eyebrow">Who We Are</p>
          <h2 className="about-heading" id="about-who-title">
            A Platform Born to <span>Celebrate Talent.</span>
          </h2>
          <p>
            Kashmir Got Talent is a platform dedicated to celebrating the
            creativity, passion and diverse abilities of individuals across
            Kashmir.
          </p>
          <p>
            From music and dance to art, poetry, theatre and contemporary
            performances, our aim is to provide a space where people can express
            themselves, showcase their abilities and connect through creativity.
          </p>
          <p className="about-who__closing">
            Because talent deserves more than recognition. It deserves an
            opportunity.
          </p>
        </div>
        <div className="about-who__collage" aria-label="Artists and performers">
          <figure className="about-who__photo about-who__photo--main about-reveal">
            <AboutImage
              className="about-parallax"
              src="/images/about-who-performers.webp"
              alt="Performers sharing their creative expression"
              imageWidth={825}
              sizes="(max-width: 600px) 42vw, 320px"
            />
          </figure>
          <figure className="about-who__photo about-who__photo--artist about-reveal">
            <AboutImage
              src="/images/about-who-artist.webp"
              alt="An artist at work"
              imageWidth={825}
              sizes="(max-width: 600px) 30vw, 220px"
            />
          </figure>
          <figure className="about-who__photo about-who__photo--musician about-reveal">
            <AboutImage
              src="/images/about-who-musician.webp"
              alt="A musician performing"
              imageWidth={825}
              sizes="(max-width: 600px) 30vw, 220px"
            />
          </figure>
          <span className="about-who__image-caption">A place for every voice</span>
        </div>
      </section>

      <section className="about-vision" aria-labelledby="about-vision-title">
        <AboutImage
          className="about-vision__backdrop"
          src="/images/about-vision-mission.webp"
          alt=""
        />
        <div className="about-vision__shade" />
        <div className="about-vision__inner section-shell">
          <header className="about-vision__header about-reveal">
            <p className="about-eyebrow">What Drives Us</p>
            <h2 className="about-heading" id="about-vision-title">
              A shared belief in <span>what talent can become.</span>
            </h2>
          </header>
          <div className="about-vision__columns">
            <article className="about-vision__item about-reveal">
              <span className="about-vision__number" aria-hidden="true">01</span>
              <p className="about-eyebrow">Our Vision</p>
              <h3>A place where talent is <span>recognised.</span></h3>
              <p>
                To create a platform where the talent, creativity and cultural
                richness of Kashmir receive the recognition and opportunities
                they deserve.
              </p>
            </article>
            <article className="about-vision__item about-reveal">
              <span className="about-vision__number" aria-hidden="true">02</span>
              <p className="about-eyebrow">Our Mission</p>
              <h3>A platform for <span>every expression.</span></h3>
              <p>
                To encourage individuals to express their abilities, celebrate
                diverse forms of creativity and bring aspiring talents together
                through a shared platform.
              </p>
            </article>
          </div>
        </div>
      </section>

      {armyAssociation.enabled && armyAssociation.verifiedDetails ? (
        <section className="about-association section-shell" aria-labelledby="about-association-title">
          <div className="about-association__copy about-reveal">
            <p className="about-eyebrow">Community &amp; Culture</p>
            <h2 className="about-heading" id="about-association-title">
              Celebrating Talent Through Shared Experiences.
            </h2>
            <span className="about-gold-rule" />
            <p>{armyAssociation.verifiedDetails}</p>
          </div>
          <div className="about-association__image about-reveal">
            <AboutImage
              className="about-parallax"
              src="/images/about-army-association.webp"
              alt="Community and cultural gathering"
            />
          </div>
        </section>
      ) : null}

      <section className="about-values section-shell" aria-labelledby="about-values-title">
        <header className="about-values__header about-reveal">
          <p className="about-eyebrow">What We Believe In</p>
          <h2 className="about-heading" id="about-values-title">
            The Values Behind <span>Every Opportunity.</span>
          </h2>
        </header>
        <ol className="about-values__list">
          {values.map(({ name, description }, index) => (
            <li
              className="about-values__row about-reveal"
              key={name}
              style={{ '--about-reveal-delay': `${index * 70}ms` }}
            >
              <span className="about-values__number">
                {String(index + 1).padStart(2, '0')}
              </span>
              <h3>{name}</h3>
              <p>{description}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="about-gallery section-shell" aria-labelledby="about-gallery-title">
        <header className="about-gallery__header about-reveal">
          <p className="about-eyebrow">Explore the Possibilities</p>
          <h2 className="about-heading" id="about-gallery-title">
            A Stage for Every Form of <span>Creativity.</span>
          </h2>
          <p>
            From traditional art forms to contemporary expressions, Kashmir has
            countless ways to showcase its creative spirit.
          </p>
        </header>
        <div className="about-gallery__grid">
          {talentForms.map(({ name, description, image, className }, index) => (
            <figure
              className={`about-gallery__item ${className} about-reveal`}
              key={name}
              style={{ '--about-reveal-delay': `${index * 90}ms` }}
            >
              <AboutImage
                className="about-gallery__image about-parallax"
                src={image}
                alt=""
                imageWidth={825}
                sizes="(max-width: 600px) 90vw, 28vw"
              />
              <span className="about-gallery__shade" />
              <figcaption className="about-gallery__caption">
                <span className="about-gallery__name">{name}</span>
                <span className="about-gallery__description">{description}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="about-journey" aria-labelledby="about-journey-title">
        <AboutImage
          className="about-journey__image about-parallax"
          src="/images/about-journey.webp"
          alt=""
        />
        <div className="about-journey__shade" />
        <div className="about-journey__content section-shell">
          <header className="about-journey__header about-reveal">
            <p className="about-eyebrow">The Bigger Picture</p>
            <h2 className="about-heading" id="about-journey-title">
              It&apos;s Not Just About <span>Winning.</span>
            </h2>
            <p>
              It is about discovering potential, expressing creativity, building
              confidence and becoming part of a community that celebrates talent.
              Every performer has a unique journey, and every journey deserves to
              be appreciated.
            </p>
          </header>
          <ol className="about-journey__stages">
            {journeyStages.map(({ name, description }, index) => (
              <li
                className="about-journey__stage about-reveal"
                key={name}
                style={{ '--about-reveal-delay': `${index * 100}ms` }}
              >
                <span className="about-journey__number">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h3>{name}</h3>
                <p>{description}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="about-cta" aria-labelledby="about-cta-title">
        <AboutImage
          className="about-cta__image about-parallax"
          src="/images/about-cta.webp"
          alt=""
        />
        <div className="about-cta__shade" />
        <div className="about-cta__content about-reveal">
          <p className="about-eyebrow">Your Moment Starts Now</p>
          <h2 className="about-heading" id="about-cta-title">
            Your Talent Deserves <span>the Spotlight.</span>
          </h2>
          <p>
            Take the first step, share your passion and become part of the
            Kashmir Got Talent journey.
          </p>
          <a
            className="about-cta__button"
            href={registrationUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Register Now
            <ArrowUpRight aria-hidden="true" size={17} strokeWidth={1.8} />
          </a>
        </div>
      </section>
    </main>
  );
}

export default AboutUs;
