import { Routes, Route, Navigate } from 'react-router-dom';
import { HubPage } from '../presentation/pages/HubPage';
import { ResolutionViewPage } from '../presentation/pages/ResolutionViewPage';
import { CentralGroupPage } from '../presentation/pages/CentralGroupPage';
import { AssociateGroupPage } from '../presentation/pages/AssociateGroupPage';
import BotDocumentationPage from '../presentation/pages/BotDocumentationPage';
import { EventFeatureDocsPage } from '../presentation/pages/docs/EventFeatureDocsPage';
import { WarCounterFeatureDocsPage } from '../presentation/pages/docs/WarCounterFeatureDocsPage';
import { InfoLibraryPage } from '../presentation/pages/InfoLibraryPage';
import { WhatIs1CLPage } from '../presentation/pages/info-library/WhatIs1CLPage';
import { JoiningAsRegimentPage } from '../presentation/pages/info-library/JoiningAsRegimentPage';
import { HighCommandersArticlePage } from '../presentation/pages/info-library/HighCommandersArticlePage';
import { MedalProgramPage } from '../presentation/pages/info-library/MedalProgramPage';
import { RoleGuidePage } from '../presentation/pages/info-library/RoleGuidePage';
import { SuggestedModsPage } from '../presentation/pages/info-library/SuggestedMods';
import { TrainingCoursePage } from '../presentation/pages/info-library/BasicInfantryTrainingCoursePage';
import { NewspaperPage } from '../presentation/pages/NewspaperPage';
import { PrivacyPolicyPage } from '../presentation/pages/PrivacyPolicyPage';
import { TermsOfServicePage } from '../presentation/pages/TermsOfServicePage';
import { Footer } from '../presentation/components/Footer';
import { CnCPage } from '../presentation/pages/info-library/CnCPage';

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
      <Route path="/info-library/what-is-1cl" element={<WhatIs1CLPage />} />
      <Route path="/info-library/joining-1cl-as-a-regiment" element={<JoiningAsRegimentPage />} />
      <Route path="/info-library/high-commanders" element={<HighCommandersArticlePage />} />
      <Route path="/info-library/medal-program" element={<MedalProgramPage />} />
      <Route path="/info-library/roles-overview" element={<RoleGuidePage />} />
      <Route path="/info-library/suggested-mods" element={<SuggestedModsPage />} />
      <Route path="/info-library/basic-infantry-training-course" element={<TrainingCoursePage />} />
      <Route path="/newspaper" element={<NewspaperPage />} />
      <Route path="/privacy" element={<PrivacyPolicyPage />} />
      <Route path="/terms" element={<TermsOfServicePage />} />
      <Route path="/info-library/command-and-control" element={<CnCPage />} />
      <Route path="*" element={<Navigate to="/hub" replace />} />
      </Routes>
      <Footer />
    </>
  );
}
