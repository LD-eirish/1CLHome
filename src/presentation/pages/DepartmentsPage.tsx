import { Header } from '../components/Header';
import { assetPath } from '../../infrastructure/utils/asset.utils';

export function DepartmentsPage() {
  const departments = [
    {
      id: 'a1cl',
      title: 'A/1CL — Administrative 1CL',
      description: 'A special purpose regiment handling administration, public relations, policy, and Legion‑level organisation.'
    },
    {
      id: 'it',
      title: '1CL IT Company',
      description: 'Develops tools for 1CL: bots, web tools, integrations and small internal utilities (e.g. Discord bot, 1CLHub webpage).'
    },
    {
      id: 'recruit',
      title: '1CL Recruitment Company',
      description: 'Handles recruitment pipelines, candidate screening, and placement into Central Group sub‑regiments.'
    },
    {
      id: 'logistics',
      title: '1CL Logistics Company',
      description: 'A logistics company comprising logistics players across all Central Group regiments; coordinates supply, transport and resourcing.'
    },
    {
      id: 'facility',
      title: '1CL Facility Company',
      description: 'Responsible for construction, maintenance and operation of production facilities and defensive structures.'
    }
  ];

  return (
    <>
      <Header subtitle="1CL Departments & Organisational Units" />

      <main className="container">
        <nav className="breadcrumb" aria-label="Breadcrumb">
          <ol>
            <li>Home</li>
            <li aria-current="page">1CL Departments</li>
          </ol>
        </nav>

        <section className="card">
          <h2>1CL Departments</h2>
          <p className="lead">Organisational and specialist departments that support the Legion and its Central Group sub‑regiments.</p>

          <div className="departments-grid">
            {departments.map((d) => (
              <article key={d.id} className="card" style={{marginBottom: '12px'}}>
                <div style={{display: 'flex', gap: '12px', alignItems: 'center'}}>
                  <img src={assetPath('1CLLogo.png')} alt="1CL" style={{width: 56, height: 56, opacity: 0.9}} />
                  <div>
                    <h3 style={{margin: 0}}>{d.title}</h3>
                    <p style={{margin: '6px 0 0'}}>{d.description}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
