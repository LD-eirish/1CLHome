import { WikiArticleLayout } from '../../components/WikiArticleLayout';

const NAV_ITEMS = [
  { label: 'Course Overview', href: '#course-overview' },
  { label: 'Training Slides', href: '#training-slides' },
];

const TRAINING_SLIDES_URL =
  'https://docs.google.com/presentation/d/e/2PACX-1vSdiq-ifblhD5Q6YJ0AjRPuw7r-hzzJJNEKd_DXEsd6nrnHKm-D3cUbojWcKXVtJk1TQ54IjuRtreLq/pubembed?start=false&loop=false&delayms=60000';

export function TrainingCoursePage() {
  return (
    <WikiArticleLayout
      subtitle="1CL Info Library"
      title="1CL Basic Infantry Training Course"
      lead="Infantry training presentation covering practical tips, tricks, tactics, and loadouts for successful frontline play."
      breadcrumbs={[
        { label: 'Hub', to: '/hub' },
        { label: 'Info Library', to: '/info-library' },
        { label: '1CL Basic Infantry Training Course' },
      ]}
      navItems={NAV_ITEMS}
      lastUpdated="July 2026"
    >
      <section className="wiki-section" id="course-overview">
        <h2 className="wiki-section-heading">Course Overview</h2>
        <p>
          The following presentation contains a variety of tips, tricks, tactics, and loadouts for running successful infantry.
        </p>
        <p>
          Infantry are the core of any push. They are a necessity to take space and win wars.
        </p>
        <p>
          This page embeds the training presentation directly into the wiki.
        </p>
      </section>

      <section className="wiki-section" id="training-slides">
        <h2 className="wiki-section-heading">Training Slides</h2>
        <div className="wiki-embed-frame">
          <iframe
            src={TRAINING_SLIDES_URL}
            title="1CL Basic Infantry Training Course"
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