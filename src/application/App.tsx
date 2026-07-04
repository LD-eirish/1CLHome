import { Routes, Route, Navigate } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { HubPage } from '../presentation/pages/HubPage';
import { ResolutionViewPage } from '../presentation/pages/ResolutionViewPage';
import { CentralGroupPage } from '../presentation/pages/CentralGroupPage';
import { AssociateGroupPage } from '../presentation/pages/AssociateGroupPage';
import BotDocumentationPage from '../presentation/pages/BotDocumentationPage';
import { EventFeatureDocsPage } from '../presentation/pages/docs/EventFeatureDocsPage';
import { WarCounterFeatureDocsPage } from '../presentation/pages/docs/WarCounterFeatureDocsPage';
import { InfoLibraryPage } from '../presentation/pages/InfoLibraryPage';
import { NewspaperPage } from '../presentation/pages/NewspaperPage';
import { PrivacyPolicyPage } from '../presentation/pages/PrivacyPolicyPage';
import { TermsOfServicePage } from '../presentation/pages/TermsOfServicePage';
import { Footer } from '../presentation/components/Footer';

// Lazy-loaded info-library pages for code splitting
const WhatIs1CLPage = lazy(() => import('../presentation/pages/info-library/WhatIs1CLPage').then(m => ({ default: m.WhatIs1CLPage })));
const JoiningAsRegimentPage = lazy(() => import('../presentation/pages/info-library/JoiningAsRegimentPage').then(m => ({ default: m.JoiningAsRegimentPage })));
const HighCommandersArticlePage = lazy(() => import('../presentation/pages/info-library/HighCommandersArticlePage').then(m => ({ default: m.HighCommandersArticlePage })));
const MedalProgramPage = lazy(() => import('../presentation/pages/info-library/MedalProgramPage').then(m => ({ default: m.MedalProgramPage })));
const RoleGuidePage = lazy(() => import('../presentation/pages/info-library/RoleGuidePage').then(m => ({ default: m.RoleGuidePage })));
const SuggestedModsPage = lazy(() => import('../presentation/pages/info-library/SuggestedMods').then(m => ({ default: m.SuggestedModsPage })));
const TrainingCoursePage = lazy(() => import('../presentation/pages/info-library/BasicInfantryTrainingCoursePage').then(m => ({ default: m.TrainingCoursePage })));
const CnCPage = lazy(() => import('../presentation/pages/info-library/CnCPage').then(m => ({ default: m.CnCPage })));

// Loading fallback component
function PageLoader() {
  return (
    <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '60vh'}}>
      <div style={{textAlign: 'center'}}>
        <p style={{color: 'var(--muted)', fontSize: '0.9rem'}}>Loading...</p>
      </div>
    </div>
  );
}

export function App() {
  return (
    <>
      <Routes>
      <Route path="/" element={<Navigate to="/hub" replace />} />
      <Route path="/hub" element={<HubPage />} />
      <Route path="/framework" element={<Navigate to="/hub" replace />} />
      <Route path="/resolution/:id" element={<ResolutionViewPage />} />
      <Route path="/members" element={<Navigate to="/central-group" replace />} />
      <Route path="/central-group" element={<CentralGroupPage />} />
      <Route path="/associate-group" element={<AssociateGroupPage />} />
      <Route path="/central-group-info" element={<Navigate to="/info-library/joining-1cl-as-a-regiment" replace />} />
      <Route path="/bot-documentation" element={<BotDocumentationPage />} />
      <Route path="/bot-documentation/event-feature" element={<EventFeatureDocsPage />} />
      <Route path="/bot-documentation/war-feature" element={<WarCounterFeatureDocsPage />} />
      <Route path="/info-library" element={<InfoLibraryPage />} />
      <Route path="/info-library/what-is-1cl" element={<Suspense fallback={<PageLoader />}><WhatIs1CLPage /></Suspense>} />
      <Route path="/info-library/joining-1cl-as-a-regiment" element={<Suspense fallback={<PageLoader />}><JoiningAsRegimentPage /></Suspense>} />
      <Route path="/info-library/high-commanders" element={<Suspense fallback={<PageLoader />}><HighCommandersArticlePage /></Suspense>} />
      <Route path="/info-library/medal-program" element={<Suspense fallback={<PageLoader />}><MedalProgramPage /></Suspense>} />
      <Route path="/info-library/roles-overview" element={<Suspense fallback={<PageLoader />}><RoleGuidePage /></Suspense>} />
      <Route path="/info-library/suggested-mods" element={<Suspense fallback={<PageLoader />}><SuggestedModsPage /></Suspense>} />
      <Route path="/info-library/basic-infantry-training-course" element={<Suspense fallback={<PageLoader />}><TrainingCoursePage /></Suspense>} />
      <Route path="/newspaper" element={<NewspaperPage />} />
      <Route path="/privacy" element={<PrivacyPolicyPage />} />
      <Route path="/terms" element={<TermsOfServicePage />} />
      <Route path="/info-library/command-and-control" element={<Suspense fallback={<PageLoader />}><CnCPage /></Suspense>} />
      <Route path="*" element={<Navigate to="/hub" replace />} />
      </Routes>
      <Footer />
    </>
  );
}
