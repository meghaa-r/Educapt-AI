/**
 * EDUCAPT AI — DOCUMENTS LIBRARY VIEW
 * Educational document browser with progress tracking and direct reading launcher.
 * Lead: Member 1 (Frontend & CSS Accessibility Engine Lead)
 */

import React from 'react';
import { getSavedProgress } from '../../services/documentService';
import styles from './DocumentsView.module.css';

export function DocumentsView({
  documents = [],
  onSelectDocument,
  onOpenMindMap
}) {
  return (
    <div className={styles.libraryWrapper} role="region" aria-label="Curriculum Documents Library">
      <header className={styles.headerSection}>
        <h1 className={styles.title}>My Curriculum Documents</h1>
        <p className={styles.subtitle}>
          Browse instructional texts across biological sciences, astrophysics, and planetary systems.
        </p>
      </header>

      <div className={styles.docList} role="feed" aria-label="Available reading documents">
        {documents.map((doc) => {
          const progress = getSavedProgress(doc.id);

          return (
            <article key={doc.id} className={styles.docRow} aria-labelledby={`title-${doc.id}`}>
              <div className={styles.rowHeader}>
                <div>
                  <div className={styles.docMeta}>
                    <span className={styles.subjectPill}>{doc.subject}</span>
                    <span>•</span>
                    <span>{doc.gradeLevel}</span>
                    <span>•</span>
                    <span>⏱ {doc.readTimeMinutes} min read</span>
                    <span>•</span>
                    <span>{doc.wordCount} words</span>
                  </div>
                  <h2 id={`title-${doc.id}`} className={styles.rowTitle}>
                    {doc.title}
                  </h2>
                </div>
              </div>

              <p className={styles.rowAbstract}>{doc.summary}</p>

              <div className={styles.rowFooter}>
                <div style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
                  <span>Reading Progress: <strong>{progress}%</strong></span>
                </div>

                <div className={styles.actionBtns}>
                  <button
                    type="button"
                    onClick={() => onOpenMindMap(doc.id)}
                    className={styles.mapBtn}
                    aria-label={`Open concept mind map for ${doc.title}`}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <circle cx="18" cy="5" r="3" />
                      <circle cx="6" cy="12" r="3" />
                      <circle cx="18" cy="19" r="3" />
                      <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
                      <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
                    </svg>
                    <span>Mind Map</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => onSelectDocument(doc.id)}
                    className={styles.openBtn}
                    aria-label={`Open and read ${doc.title}`}
                  >
                    <span>Read Article</span>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </button>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}

export default DocumentsView;
