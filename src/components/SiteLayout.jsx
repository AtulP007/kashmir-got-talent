import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Footer from './Footer.jsx';
import Navbar from './Navbar.jsx';

function ScrollToTop() {
  const { pathname, hash, key } = useLocation();

  useEffect(() => {
    if (hash) {
      const target = document.getElementById(decodeURIComponent(hash.slice(1)));
      if (target) {
        const prefersReducedMotion = window.matchMedia(
          '(prefers-reduced-motion: reduce)',
        ).matches;
        target.scrollIntoView({
          behavior: prefersReducedMotion ? 'auto' : 'smooth',
        });
        return;
      }
    }

    window.scrollTo(0, 0);
  }, [pathname, hash, key]);

  return null;
}

export default function SiteLayout() {
  return (
    <>
      <ScrollToTop />
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <Navbar />
      <div id="main-content">
        <Outlet />
      </div>
      <Footer />
    </>
  );
}
