import { Routes, Route, Navigate } from 'react-router-dom';
import { HubPage } from '../presentation/pages/HubPage';
import { CentralLegionInfoPage } from '../presentation/pages/CentralLegionInfoPage';
import { ResolutionViewPage } from '../presentation/pages/ResolutionViewPage';
import { LibraryPage } from '../presentation/pages/LibraryPage';
import { CentralGroupPage } from '../presentation/pages/CentralGroupPage';
import { AssociateGroupPage } from '../presentation/pages/AssociateGroupPage';
import BotDocumentationPage from '../presentation/pages/BotDocumentationPage';
import { NewspaperPage } from '../presentation/pages/NewspaperPage';
import { PrivacyPolicyPage } from '../presentation/pages/PrivacyPolicyPage';
import { TermsOfServicePage } from '../presentation/pages/TermsOfServicePage';
import { Footer } from '../presentation/components/Footer';
import { HighCommandersPage } from '../presentation/pages/HighCommandersPage';

export function App() {
  return (
    <>
      <Routes>
      <Route path="/" element={<Navigate to="/hub" replace />} />
      <Route path="/hub" element={<HubPage />} />
      <Route path="/framework" element={<Navigate to="/hub" replace />} />
      <Route path="/resolution/:id" element={<ResolutionViewPage />} />
      <Route path="/library" element={<LibraryPage />} />
      <Route path="/members" element={<Navigate to="/central-group" replace />} />
      <Route path="/central-group" element={<CentralGroupPage />} />
      <Route path="/associate-group" element={<AssociateGroupPage />} />
      <Route path="/central-group-info" element={<CentralLegionInfoPage />} />
      <Route path="/bot-documentation" element={<BotDocumentationPage />} />
      <Route path="/newspaper" element={<NewspaperPage />} />
      <Route path="/privacy" element={<PrivacyPolicyPage />} />
      <Route path="/terms" element={<TermsOfServicePage />} />
      <Route path="/high-commanders" element={<HighCommandersPage />} />
      <Route path="*" element={<Navigate to="/hub" replace />} />
      </Routes>
      <Footer />
    </>
  );
}
