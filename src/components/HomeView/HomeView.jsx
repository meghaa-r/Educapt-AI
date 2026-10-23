import React, { useState, useMemo } from 'react';
import styles from './HomeView.module.css';

export function HomeView({
  documents = [],
  lastReadDocument = null,
  onSelectDocument,
  onOpenSettings,
  onStartReading
}) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredDocs = useMemo(() => {
    if (!searchQuery.trim()) return documents;
    const lowerQuery = searchQuery.toLowerCase();
    return documents.filter(d => 
      d.title.toLowerCase().includes(lowerQuery) || 
      d.subject.toLowerCase().includes(lowerQuery)
    );
  }, [documents, searchQuery]);

  return (
    <div className={styles.homeWrapper} role="region" aria-label="Educapt AI Home Overview">
      
      {/* Sleek Hero Banner */}
      <section className={styles.heroCard}>
        <div className={styles.heroContent}>
          <div className={styles.heroBadge}>
            <span className={styles.pulseDot} /> Educapt AI Workspace
          </div>
          <h1 className={styles.heroTitle}>Reading that adapts to you.</h1>
          <p className={styles.heroSubtitle}>
            Custom typography, distraction-free focus masks, and sensory color themes engineered for cognitive accessibility.
          </p>

          <div className={styles.heroActionRow}>
            {lastReadDocument ? (
              <button 
                type="button" 
                onClick={() => onSelectDocument(lastReadDocument.id)} 
                className={styles.primaryBtn}
              >
                <span>Resume: {lastReadDocument.title}</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>
            ) : (
              <button type="button" onClick={onStartReading} className={styles.primaryBtn}>
                <span>Open Workspace</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </button>
            )}

            <button type="button" onClick={onOpenSettings} className={styles.secondaryBtn}>
              <span>Accessibility Settings</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="3" />
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* Feature Highlights Row */}
      <section className={styles.sectionContainer} aria-labelledby="features-heading">
        <h2 id="features-heading" className={styles.sectionTitle}>Cognitive Enhancements</h2>
        <div className={styles.featureGrid}>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" /></svg>
            </div>
            <div>
              <h3 className={styles.featureTitle}>Dyslexia Typography</h3>
              <p className={styles.featureText}>Adjust letter spacing, line heights, and font weights to eliminate visual crowding.</p>
            </div>
          </div>

          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="4" /></svg>
            </div>
            <div>
              <h3 className={styles.featureTitle}>ADHD Focus Spotlight</h3>
              <p className={styles.featureText}>Follow cursor movement with a dedicated reading ruler to lock focus onto active lines.</p>
            </div>
          </div>

          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><path d="M12 2a10 10 0 0 1 0 20z" fill="currentColor" /></svg>
            </div>
            <div>
              <h3 className={styles.featureTitle}>Sensory Color Palettes</h3>
              <p className={styles.featureText}>Switch between Sepia, Low-Sensory Sage, and High Contrast to minimize glare.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Document Library Section */}
      <section className={styles.sectionContainer} aria-labelledby="library-heading">
        <div className={styles.libraryHeader}>
          <div>
            <h2 id="library-heading" className={styles.sectionTitle}>Document Library</h2>
            <p className={styles.sectionSubtitle}>Select a document to open in your customized reader workspace.</p>
          </div>

          <div className={styles.searchContainer}>
            <svg className={styles.searchIcon} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              type="search"
              placeholder="Search library..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Search library documents"
              className={styles.searchInput}
            />
          </div>
        </div>

        {filteredDocs.length === 0 ? (
          <div className={styles.emptyState} aria-live="polite">
            <p className={styles.emptyText}>
              {searchQuery ? `No documents match "${searchQuery}"` : "Your reading library is empty."}
            </p>
            {!searchQuery && (
              <button onClick={onStartReading} className={styles.secondaryBtn}>
                Upload Document
              </button>
            )}
          </div>
        ) : (
          <div className={styles.docGrid}>
            {filteredDocs.map((d) => (
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
                <div className={styles.docBadgeRow}>
                  <span className={styles.docSubject}>{d.subject}</span>
                  <span className={styles.readTime}>⏱ {d.readTimeMinutes} min</span>
                </div>

                <h3 className={styles.docTitle}>{d.title}</h3>
                <p className={styles.docSummary}>{d.summary}</p>

                <div className={styles.docFooter}>
                  <span className={styles.docMeta}>{d.gradeLevel}</span>
                  <span className={styles.openLink}>
                    Read Document 
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="9 18 15 12 9 6" />
                    </svg>
                  </span>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

    </div>
  );
}

export default HomeView;