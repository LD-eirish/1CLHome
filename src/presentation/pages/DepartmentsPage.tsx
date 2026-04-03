import { Link } from 'react-router-dom';
import { Header } from '../components/Header';
import { PageBreadcrumb } from '../components/PageBreadcrumb';

export function DepartmentsPage() {
  const departments = [
    {
      id: 'a1cl',
      code: 'A/1CL',
      title: 'Administrative 1CL',
      description: 'Special purpose regiment handling administration, public relations, policy, and 1CL‑level organisation.'
    },
    {
      id: 'it',
      code: 'IT CO',
      title: '1CL IT Company',
      description: 'Develops and maintains tools for 1CL — including the Discord bot and this website.'
    },
    {
      id: 'recruit',
      code: 'RCR CO',
      title: '1CL Recruitment Company',
      description: 'Handles recruitment and verification for all Central Group sub‑regiments.'
    },
    {
      id: 'logistics',
      code: 'LOG CO',
      title: '1CL Logistics Company',
      description: 'Logistics players across Central Group regiments. Coordinates supply, transport, and resource gathering.'
    },
    {
      id: 'facility',
      code: 'FAC CO',
      title: '1CL Facility Company',
      description: 'Responsible for construction, maintenance, and operation of facilities and defensive structures.'
    }
  ];

  return (
    <>
      <Header subtitle="1CL Departments & Organisational Units" />

      <PageBreadcrumb items={[{ label: 'Hub', to: '/hub' }, { label: 'Departments' }]} />

      <main className="container">
        <section className="card">
          <h2>1CL Departments</h2>
          <p className="lead">Organisational and specialist departments supporting the Legion and its Central Group sub‑regiments.</p>

          <div className="dept-list">
            {departments.map((d) => (
              <div key={d.id} className="dept-row">
                <div className="dept-code">{d.code}</div>
                <div className="dept-info">
                  <h3 className="dept-title">{d.title}</h3>
                  <p className="dept-desc">{d.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
