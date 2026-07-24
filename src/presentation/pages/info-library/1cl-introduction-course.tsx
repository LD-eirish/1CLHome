import { WikiArticleLayout } from '../../components/WikiArticleLayout';

const NAV_ITEMS = [
  { label: 'Course Overview', href: '#course-overview' },
  { label: 'Training Slides', href: '#training-slides' },
];

const TRAINING_SLIDES_URL =
  'https://docs.google.com/presentation/d/e/2PACX-1vQMj3tfn_z1nf1yFUXl8DespakYrn2Fx6kSuC8N_TlLdkEHpywgPs0utyRTKJUxBP3vr40vQC1JoUPI/pubembed?start=false&loop=false&delayms=60000';

export function IntroductionCoursePage() {
  return (
    <WikiArticleLayout
      subtitle="1CL Info Library"
      title="1CL Introduction Course"
      lead="Presentation on what 1CL is, how it works and what branches 1CL has."
      breadcrumbs={[
        { label: 'Hub', to: '/hub' },
        { label: 'Info Library', to: '/info-library' },
        { label: '1CL Introduction Course' },
      ]}
      navItems={NAV_ITEMS}
      lastUpdated="July 2026"
    >
      <section className="wiki-section" id="course-overview">
        <h2 className="wiki-section-heading">Course Overview</h2>
        <p>
          This course is designed to provide an overview of the 1st Combined Legion (1CL), its structure, and its various branches. 
        </p>
        <p>
        </p>
        <p>
        </p>
      </section>

      <section className="wiki-section" id="training-slides">
        <h2 className="wiki-section-heading">Training Slides</h2>
        <div className="wiki-embed-frame">
          <iframe
            src={TRAINING_SLIDES_URL}
            title="1CL Introduction Course"
            allowFullScreen
            loading="lazy"
          />
        </div>
        <p>
          <a href={TRAINING_SLIDES_URL} target="_blank" rel="noreferrer">
            Open the training course in a new tab
          </a>
        </p>
      </section>
    </WikiArticleLayout>
  );
}