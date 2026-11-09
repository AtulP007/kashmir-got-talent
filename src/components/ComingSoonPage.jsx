import { useEffect, useRef } from 'react';
import { Trophy } from 'lucide-react';
import './ComingSoonPage.css';

const pageCopy = {
  events: {
    className: 'events',
    label: 'Auditions & Events',
    heading: 'The Stage Is Getting Ready.',
    description:
      'Audition announcements, upcoming events and important updates will be revealed here soon.',
  },
  judges: {
    className: 'judges',
    label: 'Judges & Mentors',
    heading: 'Meet the People Behind the Inspiration.',
    description:
      'Our judges and mentors will be introduced soon. Stay tuned for more updates.',
  },
  winners: {
    className: 'winners',
    label: 'Winners',
    heading: 'Every Great Journey Deserves Recognition.',
    description:
      'The extraordinary talent and achievements celebrated through Kashmir Got Talent will take the spotlight here soon.',
  },
  gallery: {
    className: 'gallery',
    label: 'Gallery',
    heading: 'Moments Worth Remembering.',
    description:
      'A collection of creative expressions, performances and memorable moments will be available here soon.',
  },
};

function ComingSoonPage({ variant }) {
  const page = pageCopy[variant];
  const pageRef = useRef(null);

  useEffect(() => {
    const root = pageRef.current;
    if (
      !root ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
      !('IntersectionObserver' in window)
    ) {
      return undefined;
    }

    root.classList.add('coming-soon--enhanced');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 },
    );

    root.querySelectorAll('.coming-soon__reveal').forEach((element) => {
      observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <main
      className={`coming-soon coming-soon--${page.className}`}
      ref={pageRef}
      aria-labelledby="coming-soon-title"
    >
      <div className="coming-soon__art" aria-hidden="true">
        <span className="coming-soon__art-glow" />
        {variant === 'events' ? (
          <div className="coming-soon__stage-beams">
            <span />
            <span />
            <span />
          </div>
        ) : null}
        {variant === 'judges' ? (
          <div className="coming-soon__spotlight-rings">
            <span />
            <span />
            <span />
          </div>
        ) : null}
        {variant === 'winners' ? (
          <div className="coming-soon__trophy">
            <Trophy aria-hidden="true" strokeWidth={0.75} />
          </div>
        ) : null}
        {variant === 'gallery' ? (
          <div className="coming-soon__frames">
            <span />
            <span />
            <span />
            <span />
          </div>
        ) : null}
      </div>
      <div className="coming-soon__content">
        <p className="coming-soon__eyebrow coming-soon__reveal">
          Kashmir Got Talent <span aria-hidden="true">/</span> {page.label}
        </p>
        <h1 className="coming-soon__title coming-soon__reveal" id="coming-soon-title">
          {page.heading}
        </h1>
        <p className="coming-soon__common coming-soon__reveal">
          Something Extraordinary Is Coming.
        </p>
        <p className="coming-soon__description coming-soon__reveal">
          {page.description}
        </p>
        <p className="coming-soon__supporting coming-soon__reveal">
          We&apos;re working on something special. This space will soon bring you
          more updates, stories and exciting moments from Kashmir Got Talent.
        </p>
        <div className="coming-soon__status coming-soon__reveal">
          <span className="coming-soon__status-line" aria-hidden="true" />
          <span>Coming Soon</span>
          <span className="coming-soon__status-line" aria-hidden="true" />
        </div>
      </div>
    </main>
  );
}

export default ComingSoonPage;
