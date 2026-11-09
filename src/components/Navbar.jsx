import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { pages } from '../data/pages.js';
import './Navbar.css';

const navigationItems = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About Us' },
  { id: 'categories', label: 'Talent Categories' },
  { id: 'events', label: 'Auditions & Events' },
  { id: 'judges', label: 'Judges & Mentors' },
  { id: 'winners', label: 'Winners' },
  { id: 'gallery', label: 'Gallery' },
  { id: 'contact', label: 'Contact' },
];

const pageById = Object.fromEntries(pages.map((page) => [page.id, page]));
const registrationUrl =
  'https://docs.google.com/forms/d/e/1FAIpQLSeBjDQosF3JcJS3_ppiYy7RDRsSqxYpByt96PuLo2gutvbAWw/viewform?usp=dialog';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  function closeMenu() {
    setMenuOpen(false);
  }

  useEffect(() => {
    function updateScrollState() {
      setIsScrolled(window.scrollY > 8);
    }

    updateScrollState();
    window.addEventListener('scroll', updateScrollState, { passive: true });

    return () => window.removeEventListener('scroll', updateScrollState);
  }, []);

  return (
    <header className={`site-header${isScrolled ? ' site-header--scrolled' : ''}`}>
      <div className="site-header__inner">
        <NavLink
          className="site-brand"
          to="/"
          aria-label="Kashmir Got Talent home"
          onClick={closeMenu}
        >
          <img
            className="site-brand__logo"
            src="/images/kgt-logo.png"
            alt="Kashmir Got Talent"
          />
        </NavLink>
        <button
          className="menu-toggle"
          type="button"
          aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={menuOpen}
          aria-controls="primary-navigation"
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
        <nav
          id="primary-navigation"
          className={`site-nav${menuOpen ? ' site-nav--open' : ''}`}
          aria-label="Primary navigation"
        >
          {navigationItems.map(({ id, label }) => (
            <NavLink
              key={id}
              to={
                id === 'about'
                  ? `${pageById[id].path}#about-us-section`
                  : pageById[id].path
              }
              end={id === 'home'}
              className={({ isActive }) =>
                `site-nav__link${isActive ? ' site-nav__link--active' : ''}`
              }
              onClick={closeMenu}
            >
              {label}
            </NavLink>
          ))}
          <a
            className="site-nav__register"
            href={registrationUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={closeMenu}
          >
            Register Now
          </a>
        </nav>
      </div>
      {menuOpen ? (
        <button
          className="site-nav__backdrop"
          type="button"
          aria-label="Close navigation menu"
          onClick={closeMenu}
        />
      ) : null}
    </header>
  );
}
