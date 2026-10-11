/**
 * EDUCAPT AI — HOME VIEW COMPONENT
 * Calm, welcoming dashboard welcoming neurodivergent learners.
 * Lead: Member 1 (Frontend & CSS Accessibility Engine Lead)
 */

import React from 'react';
import styles from './HomeView.module.css';

export function HomeView({
  documents = [],
  onSelectDocument,
  onOpenSettings,
  onStartReading
}) {
  return (
    <div className={styles.homeWrapper} role="region" aria-label="Educapt AI Home Overview">
      {/* Hero Welcome Card */}
      <section className={styles.heroCard}>
        <span className={styles.heroBadge}>Educapt AI • Accessibility Suite</span>
        <h1 className={styles.heroTitle}>Reading that adapts to you.</h1>
        <p className={styles.heroSubtitle}>
          Welcome to your personalized digital reading sanctuary. Tailor typography, eliminate visual distraction with ADHD focus spotlights, and adjust sensory color warmth to match your unique cognitive preferences.
        </p>

        <div className={styles.heroActionRow}>
          <button
            type="button"
            onClick={onStartReading}
            className={styles.primaryBtn}
          >
            <span>Open Reading Workspace</span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </button>

          <button
            type="button"
            onClick={onOpenSettings}
            className={styles.secondaryBtn}
          >
            <span>Personalize Settings</span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <circle cx="12" cy="12" r="3" />
              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
            </svg>
          </button>
        </div>
      </section>

      {/* Feature Highlights Grid */}
      <section aria-labelledby="features-heading">
        <h2 id="features-heading" className={styles.sectionTitle}>Engineered for Cognitive Diversity</h2>
        <div className={styles.featureGrid}>
          {/* Card 1 */}
          <div className={styles.featureCard}>
            <div className={styles.featureIcon} aria-hidden="true">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
              </svg>
            </div>
            <h3 className={styles.featureTitle}>Dyslexia Typography Engine</h3>
            <p className={styles.featureText}>
              Custom character weighting, generous letter spacing (0.12em), expanded word spacing (0.25em), and 1.8x line height reduce visual crowding and character confusion.
            </p>
          </div>

          {/* Card 2 */}
          <div className={styles.featureCard}>
            <div className={styles.featureIcon} aria-hidden="true">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <circle cx="12" cy="12" r="4" />
              </svg>
            </div>
            <h3 className={styles.featureTitle}>ADHD Focus Spotlight</h3>
            <p className={styles.featureText}>
              A cursor-following reading spotlight or reading ruler that dims surrounding text to keep your attention locked on the current sentence without blocking interaction.
            </p>
          </div>

          {/* Card 3 */}
          <div className={styles.featureCard}>
            <div className={styles.featureIcon} aria-hidden="true">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 2a10 10 0 0 1 0 20z" fill="currentColor" />
              </svg>
            </div>
            <h3 className={styles.featureTitle}>Four Themes & High Contrast</h3>
            <p className={styles.featureText}>
              Choose from Light, Dark, Warm Sepia (for photophobia and visual stress), or Low-Sensory Sage, plus independent WCAG AAA High Contrast mode.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Documents Section */}
      <section aria-labelledby="featured-docs-heading">
        <h2 id="featured-docs-heading" className={styles.sectionTitle}>Curriculum Reading Library</h2>
        <div className={styles.docGrid}>
          {documents.map((d) => (
            <article
              key={d.id}
              className={styles.docCard}
              onClick={() => onSelectDocument(d.id)}
              role="button"
              tabIndex="0"
              aria-label={`Open document: ${d.title}`}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onSelectDocument(d.id);
                }
              }}
            >
              <div>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--accent-primary)', textTransform: 'uppercase' }}>
                  {d.subject}
                </span>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--text-primary)', marginTop: '0.35rem' }}>
                  {d.title}
                </h3>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginTop: '0.5rem', lineHeight: 1.5 }}>
                  {d.summary}
                </p>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
                <span>{d.gradeLevel}</span>
                <span>⏱ {d.readTimeMinutes} min read</span>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

export default HomeView;
