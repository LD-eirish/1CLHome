import { Routes, Route, Navigate } from 'react-router-dom';
import { HubPage } from '../presentation/pages/HubPage';
import { FrameworkPage } from '../presentation/pages/FrameworkPage';
import { ResolutionViewPage } from '../presentation/pages/ResolutionViewPage';
import { LibraryPage } from '../presentation/pages/LibraryPage';
import { MembersPage } from '../presentation/pages/MembersPage';
import { CentralGroupPage } from '../presentation/pages/CentralGroupPage';
import { AssociateGroupPage } from '../presentation/pages/AssociateGroupPage';
import { DepartmentsPage } from '../presentation/pages/DepartmentsPage';

export function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/hub" replace />} />
      <Route path="/hub" element={<HubPage />} />
      <Route path="/framework" element={<FrameworkPage />} />
      <Route path="/resolution/:id" element={<ResolutionViewPage />} />
      <Route path="/library" element={<LibraryPage />} />
      <Route path="/members" element={<MembersPage />} />
      <Route path="/central-group" element={<CentralGroupPage />} />
      <Route path="/associate-group" element={<AssociateGroupPage />} />
      <Route path="/departments" element={<DepartmentsPage />} />
      <Route path="*" element={<Navigate to="/hub" replace />} />
    </Routes>
  );
}
