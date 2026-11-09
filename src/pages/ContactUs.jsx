import { useEffect, useRef, useState } from 'react';
import {
  Handshake,
  Mail,
  MessageCircle,
  Mic2,
  Newspaper,
  Sparkles,
} from 'lucide-react';
import './ContactUs.css';

const enquiryCategories = [
  { label: 'General Enquiries', Icon: MessageCircle },
  { label: 'Audition Enquiries', Icon: Mic2 },
  { label: 'Sponsorship & Partnerships', Icon: Handshake },
  { label: 'Media & Collaboration', Icon: Newspaper },
];

const enquiryTypes = [
  'General Enquiry',
  'Audition Enquiry',
  'Sponsorship',
  'Partnership',
  'Media & Collaboration',
  'Other',
];

const initialForm = {
  fullName: '',
  email: '',
  phone: '',
  enquiryType: '',
  subject: '',
  message: '',
};

function validateForm(form) {
  const errors = {};

  if (!form.fullName.trim()) {
    errors.fullName = 'Please enter your full name.';
  }

  if (!form.email.trim()) {
    errors.email = 'Please enter your email address.';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
    errors.email = 'Enter a valid email address.';
  }

  const phoneDigits = form.phone.replace(/\D/g, '');
  if (!form.phone.trim()) {
    errors.phone = 'Please enter your phone number.';
  } else if (
    !/^[+\d\s().-]+$/.test(form.phone.trim()) ||
    phoneDigits.length < 7 ||
    phoneDigits.length > 15
  ) {
    errors.phone = 'Enter a valid phone number with 7 to 15 digits.';
  }

  if (!form.enquiryType) {
    errors.enquiryType = 'Please select an enquiry type.';
  }

  if (!form.subject.trim()) {
    errors.subject = 'Please enter a subject.';
  }

  if (!form.message.trim()) {
    errors.message = 'Please enter a message.';
  }

  return errors;
}

export default function ContactUs() {
  const pageRef = useRef(null);
  const glowRef = useRef(null);
  const buttonRef = useRef(null);
  const pointerFrameRef = useRef(null);
  const buttonFrameRef = useRef(null);
  const pointerPositionRef = useRef({ x: 0, y: 0 });
  const buttonPositionRef = useRef({ x: 0, y: 0 });
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [notice, setNotice] = useState('');

  useEffect(() => {
    const page = pageRef.current;
    if (!page) return undefined;

    const revealItems = page.querySelectorAll('[data-contact-reveal]');
    const reducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    );
    let revealObserver = null;

    if (
      reducedMotion.matches ||
      !('IntersectionObserver' in window)
    ) {
      revealItems.forEach((item) =>
        item.classList.add('contact-reveal--visible'),
      );
    } else {
      revealObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('contact-reveal--visible');
            revealObserver.unobserve(entry.target);
          });
        },
        { threshold: 0.14 },
      );

      revealItems.forEach((item) => revealObserver.observe(item));
    }

    const glow = glowRef.current;
    const finePointer = window.matchMedia('(pointer: fine)');
    const narrowScreen = window.matchMedia('(max-width: 60rem)');

    function updatePointerEffects() {
      if (!glow) return;
      const enabled =
        finePointer.matches && !narrowScreen.matches && !reducedMotion.matches;
      glow.classList.toggle('contact-cursor-glow--enabled', enabled);
    }

    function handlePointerMove(event) {
      if (
        event.pointerType !== 'mouse' ||
        !finePointer.matches ||
        narrowScreen.matches ||
        reducedMotion.matches ||
        pointerFrameRef.current !== null
      ) {
        return;
      }

      pointerPositionRef.current = { x: event.clientX, y: event.clientY };
      pointerFrameRef.current = window.requestAnimationFrame(() => {
        const { x, y } = pointerPositionRef.current;
        glow?.style.setProperty('--contact-pointer-x', `${x}px`);
        glow?.style.setProperty('--contact-pointer-y', `${y}px`);
        pointerFrameRef.current = null;
      });
    }

    updatePointerEffects();
    finePointer.addEventListener('change', updatePointerEffects);
    narrowScreen.addEventListener('change', updatePointerEffects);
    reducedMotion.addEventListener('change', updatePointerEffects);
    window.addEventListener('pointermove', handlePointerMove, { passive: true });

    return () => {
      revealObserver?.disconnect();
      finePointer.removeEventListener('change', updatePointerEffects);
      narrowScreen.removeEventListener('change', updatePointerEffects);
      reducedMotion.removeEventListener('change', updatePointerEffects);
      window.removeEventListener('pointermove', handlePointerMove);
      if (pointerFrameRef.current !== null) {
        window.cancelAnimationFrame(pointerFrameRef.current);
      }
      if (buttonFrameRef.current !== null) {
        window.cancelAnimationFrame(buttonFrameRef.current);
      }
    };
  }, []);

  function updateField(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
    setErrors((current) => {
      if (!current[name]) return current;
      const next = { ...current };
      delete next[name];
      return next;
    });
    setNotice('');
  }

  function handleSubmit(event) {
    event.preventDefault();
    const validationErrors = validateForm(form);
    setErrors(validationErrors);
    setNotice('');

    if (Object.keys(validationErrors).length > 0) {
      const firstInvalidField = event.currentTarget.querySelector(
        `[name="${Object.keys(validationErrors)[0]}"]`,
      );
      firstInvalidField?.focus();
      return;
    }

    setNotice('Online enquiry submission will be available soon.');
  }

  function handleButtonPointerMove(event) {
    if (
      event.pointerType !== 'mouse' ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
      window.matchMedia('(max-width: 60rem)').matches ||
      buttonFrameRef.current !== null
    ) {
      return;
    }

    const bounds = buttonRef.current?.getBoundingClientRect();
    if (!bounds) return;

    buttonPositionRef.current = {
      x: Math.max(
        -5,
        Math.min(5, (event.clientX - (bounds.left + bounds.width / 2)) * 0.1),
      ),
      y: Math.max(
        -5,
        Math.min(5, (event.clientY - (bounds.top + bounds.height / 2)) * 0.1),
      ),
    };

    buttonFrameRef.current = window.requestAnimationFrame(() => {
      const { x, y } = buttonPositionRef.current;
      buttonRef.current?.style.setProperty('--magnetic-x', `${x}px`);
      buttonRef.current?.style.setProperty('--magnetic-y', `${y}px`);
      buttonFrameRef.current = null;
    });
  }

  function handleButtonPointerLeave() {
    if (buttonFrameRef.current !== null) {
      window.cancelAnimationFrame(buttonFrameRef.current);
      buttonFrameRef.current = null;
    }
    buttonRef.current?.style.setProperty('--magnetic-x', '0px');
    buttonRef.current?.style.setProperty('--magnetic-y', '0px');
  }

  return (
    <main className="page--contact" ref={pageRef}>
      <div className="contact-cursor-glow" ref={glowRef} aria-hidden="true" />
      <section className="contact-hero" aria-labelledby="contact-title">
        <div className="contact-hero__inner" data-contact-reveal>
          <p className="contact-hero__eyebrow">
            <span aria-hidden="true" />
            Get in touch
          </p>
          <h1 className="contact-hero__title" id="contact-title">
            <span className="contact-hero__title-line">
              <span>Let&apos;s Create Something</span>
            </span>
            <span className="contact-hero__title-line">
              <span>
                <em>Extraordinary</em> Together.
              </span>
            </span>
          </h1>
          <p className="contact-hero__description">
            Have a question, collaboration idea or want to know more about
            Kashmir Got Talent? We&apos;d love to hear from you. Reach out and
            let&apos;s start a conversation.
          </p>
        </div>
      </section>

      <section className="contact-main" aria-label="Contact information and enquiry form">
        <div className="contact-main__inner">
          <aside className="contact-information" data-contact-reveal>
            <p className="contact-information__eyebrow">
              <Sparkles aria-hidden="true" />
              Start a conversation
            </p>
            <h2 className="contact-information__title">
              We&apos;d Love to Hear From You.
            </h2>
            <p className="contact-information__description">
              Whether you&apos;re an aspiring performer, potential partner or
              simply interested in what we do, our team is ready to connect.
            </p>

            <a
              className="contact-information__email"
              href="mailto:tahafilminternational@gmail.com"
            >
              <span className="contact-information__email-icon">
                <Mail aria-hidden="true" />
              </span>
              <span>
                <span className="contact-information__email-label">Email us</span>
                <span className="contact-information__email-address">
                  tahafilminternational@gmail.com
                </span>
              </span>
              <span className="contact-information__email-arrow" aria-hidden="true">
                →
              </span>
            </a>

            <div className="contact-information__categories">
              <h3>How can we help?</h3>
              <ul>
                {enquiryCategories.map(({ label, Icon }) => (
                  <li key={label}>
                    <Icon aria-hidden="true" />
                    <span>{label}</span>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          <div className="contact-form-panel" data-contact-reveal>
            <div className="contact-form-panel__heading">
              <p className="contact-form-panel__eyebrow">Send us a message</p>
              <h2>Tell Us What&apos;s on Your Mind.</h2>
            </div>

            <form
              className="contact-form"
              onSubmit={handleSubmit}
              noValidate
              aria-describedby="contact-form-notice"
            >
              <div className="contact-form__grid">
                <div className="contact-form__field">
                  <label htmlFor="contact-name">Full Name</label>
                  <input
                    autoComplete="name"
                    id="contact-name"
                    name="fullName"
                    type="text"
                    placeholder="Your full name"
                    value={form.fullName}
                    onChange={updateField}
                    required
                    aria-required="true"
                    aria-invalid={Boolean(errors.fullName)}
                    aria-describedby={errors.fullName ? 'contact-name-error' : undefined}
                  />
                  {errors.fullName ? (
                    <span className="contact-form__error" id="contact-name-error">
                      {errors.fullName}
                    </span>
                  ) : null}
                </div>

                <div className="contact-form__field">
                  <label htmlFor="contact-email">Email Address</label>
                  <input
                    autoComplete="email"
                    id="contact-email"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    value={form.email}
                    onChange={updateField}
                    required
                    aria-required="true"
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={errors.email ? 'contact-email-error' : undefined}
                  />
                  {errors.email ? (
                    <span className="contact-form__error" id="contact-email-error">
                      {errors.email}
                    </span>
                  ) : null}
                </div>

                <div className="contact-form__field">
                  <label htmlFor="contact-phone">Phone Number</label>
                  <input
                    autoComplete="tel"
                    id="contact-phone"
                    inputMode="tel"
                    name="phone"
                    type="tel"
                    placeholder="+91 00000 00000"
                    value={form.phone}
                    onChange={updateField}
                    required
                    aria-required="true"
                    aria-invalid={Boolean(errors.phone)}
                    aria-describedby={errors.phone ? 'contact-phone-error' : undefined}
                  />
                  {errors.phone ? (
                    <span className="contact-form__error" id="contact-phone-error">
                      {errors.phone}
                    </span>
                  ) : null}
                </div>

                <div className="contact-form__field">
                  <label htmlFor="contact-enquiry-type">Enquiry Type</label>
                  <select
                    id="contact-enquiry-type"
                    name="enquiryType"
                    value={form.enquiryType}
                    onChange={updateField}
                    required
                    aria-required="true"
                    aria-invalid={Boolean(errors.enquiryType)}
                    aria-describedby={
                      errors.enquiryType ? 'contact-enquiry-type-error' : undefined
                    }
                  >
                    <option value="" disabled>
                      Select an enquiry type
                    </option>
                    {enquiryTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                  {errors.enquiryType ? (
                    <span
                      className="contact-form__error"
                      id="contact-enquiry-type-error"
                    >
                      {errors.enquiryType}
                    </span>
                  ) : null}
                </div>

                <div className="contact-form__field contact-form__field--full">
                  <label htmlFor="contact-subject">Subject</label>
                  <input
                    id="contact-subject"
                    name="subject"
                    type="text"
                    placeholder="What would you like to discuss?"
                    value={form.subject}
                    onChange={updateField}
                    required
                    aria-required="true"
                    aria-invalid={Boolean(errors.subject)}
                    aria-describedby={errors.subject ? 'contact-subject-error' : undefined}
                  />
                  {errors.subject ? (
                    <span className="contact-form__error" id="contact-subject-error">
                      {errors.subject}
                    </span>
                  ) : null}
                </div>

                <div className="contact-form__field contact-form__field--full">
                  <label htmlFor="contact-message">Message</label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows="5"
                    placeholder="Share a little more about your enquiry..."
                    value={form.message}
                    onChange={updateField}
                    required
                    aria-required="true"
                    aria-invalid={Boolean(errors.message)}
                    aria-describedby={errors.message ? 'contact-message-error' : undefined}
                  />
                  {errors.message ? (
                    <span className="contact-form__error" id="contact-message-error">
                      {errors.message}
                    </span>
                  ) : null}
                </div>
              </div>

              <div className="contact-form__submit-row">
                <button
                  className="contact-form__submit"
                  type="submit"
                  ref={buttonRef}
                  onPointerMove={handleButtonPointerMove}
                  onPointerLeave={handleButtonPointerLeave}
                >
                  Send Enquiry <span aria-hidden="true">→</span>
                </button>
                <p className="contact-form__notice" id="contact-form-notice" role="status">
                  {notice || 'Online enquiry submission will be available soon.'}
                </p>
              </div>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
