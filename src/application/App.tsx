import { Routes, Route, Navigate } from 'react-router-dom';
import { HubPage } from '../presentation/pages/HubPage';
import { CentralLegionInfoPage } from '../presentation/pages/CentralLegionInfoPage';
import { ResolutionViewPage } from '../presentation/pages/ResolutionViewPage';
import { LibraryPage } from '../presentation/pages/LibraryPage';
import { MembersPage } from '../presentation/pages/MembersPage';
import { CentralGroupPage } from '../presentation/pages/CentralGroupPage';
import { AssociateGroupPage } from '../presentation/pages/AssociateGroupPage';
import { DepartmentsPage } from '../presentation/pages/DepartmentsPage';
import BotDocumentationPage from '../presentation/pages/BotDocumentationPage';
import { NewspaperPage } from '../presentation/pages/NewspaperPage';

export function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/hub" replace />} />
      <Route path="/hub" element={<HubPage />} />
      <Route path="/framework" element={<Navigate to="/hub" replace />} />
      <Route path="/resolution/:id" element={<ResolutionViewPage />} />
      <Route path="/library" element={<LibraryPage />} />
      <Route path="/members" element={<MembersPage />} />
      <Route path="/central-group" element={<CentralGroupPage />} />
      <Route path="/associate-group" element={<AssociateGroupPage />} />
      <Route path="/departments" element={<DepartmentsPage />} />
      <Route path="/central-group-info" element={<CentralLegionInfoPage />} />
      <Route path="/bot-documentation" element={<BotDocumentationPage />} />
      <Route path="/newspaper" element={<NewspaperPage />} />
      <Route path="*" element={<Navigate to="/hub" replace />} />
    </Routes>
  );
}
