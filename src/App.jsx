import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import SiteLayout from './components/SiteLayout.jsx';
import { pages } from './data/pages.js';
const AboutUs = lazy(() => import('./pages/AboutUs.jsx'));
const AuditionsRegistration = lazy(() => import('./pages/AuditionsRegistration.jsx'));
const ContactUs = lazy(() => import('./pages/ContactUs.jsx'));
const EventsAuditions = lazy(() => import('./pages/EventsAuditions.jsx'));
const FAQs = lazy(() => import('./pages/FAQs.jsx'));
const Gallery = lazy(() => import('./pages/Gallery.jsx'));
const Home = lazy(() => import('./pages/Home.jsx'));
const JudgesMentors = lazy(() => import('./pages/JudgesMentors.jsx'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy.jsx'));
const SponsorsPartners = lazy(() => import('./pages/SponsorsPartners.jsx'));
const TalentCategories = lazy(() => import('./pages/TalentCategories.jsx'));
const TermsConditions = lazy(() => import('./pages/TermsConditions.jsx'));
const WinnersAchievements = lazy(() => import('./pages/WinnersAchievements.jsx'));

function renderPage(PageComponent) {
  return (
    <Suspense
      fallback={
        <div className="route-loading" role="status" aria-label="Loading page" />
      }
    >
      <PageComponent />
    </Suspense>
  );
}

const pageComponents = {
  home: Home,
  about: AboutUs,
  categories: TalentCategories,
  registration: AuditionsRegistration,
  judges: JudgesMentors,
  events: EventsAuditions,
  winners: WinnersAchievements,
  gallery: Gallery,
  sponsors: SponsorsPartners,
  contact: ContactUs,
  faqs: FAQs,
  privacy: PrivacyPolicy,
  terms: TermsConditions,
};

function NotFound() {
  return (
    <main className="page page--not-found">
      <div className="page__inner">
        <h1>Page not found</h1>
      </div>
    </main>
  );
}

export default function App() {
  return (
    <Routes>
      <Route element={<SiteLayout />}>
        {pages.map(({ id, path }) => {
          const PageComponent = pageComponents[id];
          return (
            <Route
              key={id}
              path={path}
              element={renderPage(PageComponent)}
            />
          );
        })}
        <Route path="/about-us" element={renderPage(AboutUs)} />
        <Route path="/auditions-events" element={renderPage(EventsAuditions)} />
        <Route path="/winners" element={renderPage(WinnersAchievements)} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
