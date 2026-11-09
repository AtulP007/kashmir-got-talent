import { Link } from 'react-router-dom';
import { pages } from '../data/pages.js';
import './Footer.css';

const footerGroups = [
  {
    label: 'Explore',
    pageIds: ['categories', 'judges', 'events', 'winners', 'gallery', 'sponsors'],
  },
  {
    label: 'Information',
    pageIds: ['about', 'contact', 'faqs', 'privacy', 'terms'],
  },
];

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <div className="site-footer__top">
          <div className="site-footer__identity">
            <Link className="site-footer__brand" to="/" aria-label="Kashmir Got Talent home">
              <img
                className="site-footer__logo"
                src="/images/kgt-logo.png"
                alt="Kashmir Got Talent"
              />
            </Link>
            <div className="site-footer__attribution">
              <span className="site-footer__note">PRESENTED BY</span>
              <span className="site-footer__location">KUPWARA</span>
            </div>
          </div>
          <nav className="site-footer__navigation" aria-label="Footer navigation">
            {footerGroups.map(({ label, pageIds }) => (
              <div className="site-footer__group" key={label}>
                <h2 className="site-footer__heading">{label}</h2>
                <ul className="site-footer__links">
                  {pageIds.map((id) => {
                    const page = pages.find((item) => item.id === id);
                    if (!page) return null;

                    return (
                      <li key={page.id}>
                        <Link
                          to={
                            page.id === 'faqs'
                              ? '/#home-faq-preview'
                              : page.id === 'sponsors'
                                ? '/#sponsors-partners'
                              : page.id === 'about'
                                ? `${page.path}#about-us-section`
                                : page.path
                          }
                        >
                          {page.id === 'terms' ? 'Legal policies' : page.label}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </nav>
        </div>
        <div className="site-footer__bottom">
          <p className="site-footer__copyright">
            © {new Date().getFullYear()} Kashmir Got Talent
          </p>
        </div>
      </div>
    </footer>
  );
}
