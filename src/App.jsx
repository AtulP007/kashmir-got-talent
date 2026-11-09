import { Route, Routes } from 'react-router-dom';
import SiteLayout from './components/SiteLayout.jsx';
import { pages } from './data/pages.js';
import AboutUs from './pages/AboutUs.jsx';
import AuditionsRegistration from './pages/AuditionsRegistration.jsx';
import ContactUs from './pages/ContactUs.jsx';
import EventsAuditions from './pages/EventsAuditions.jsx';
import FAQs from './pages/FAQs.jsx';
import Gallery from './pages/Gallery.jsx';
import Home from './pages/Home.jsx';
import JudgesMentors from './pages/JudgesMentors.jsx';
import PrivacyPolicy from './pages/PrivacyPolicy.jsx';
import SponsorsPartners from './pages/SponsorsPartners.jsx';
import TalentCategories from './pages/TalentCategories.jsx';
import TermsConditions from './pages/TermsConditions.jsx';
import WinnersAchievements from './pages/WinnersAchievements.jsx';

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
              element={<PageComponent />}
            />
          );
        })}
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/auditions-events" element={<EventsAuditions />} />
        <Route path="/winners" element={<WinnersAchievements />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
