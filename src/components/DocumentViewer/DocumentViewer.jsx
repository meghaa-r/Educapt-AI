/**
 * EDUCAPT AI — DOCUMENT VIEWER
 * Highly accessible semantic reading workspace with dynamic typography engine.
 * Lead: Member 1 (Frontend & CSS Accessibility Engine Lead)
 */

import React, { useState, useEffect, useRef } from 'react';
import { useAccessibilitySettings } from '../../hooks/useAccessibilitySettings';
import { getSavedProgress, saveProgress } from '../../services/documentService';
import styles from './DocumentViewer.module.css';

export function DocumentViewer({ document: doc }) {
  const { settings } = useAccessibilitySettings();
  const [readProgress, setReadProgress] = useState(0);
  const articleRef = useRef(null);

  // Restore saved progress on document change
  useEffect(() => {
    if (!doc) return;
    const saved = getSavedProgress(doc.id);
    setReadProgress(saved);
  }, [doc]);

  // Track scroll progress along the reading pane
  useEffect(() => {
    const handleScroll = () => {
      if (!articleRef.current) return;
      const rect = articleRef.current.getBoundingClientRect();
      const totalHeight = rect.height - window.innerHeight;
      if (totalHeight <= 0) {
        setReadProgress(100);
        return;
      }
      const scrolled = -rect.top;
      const progress = Math.min(100, Math.max(0, Math.round((scrolled / totalHeight) * 100)));
      setReadProgress(progress);
      if (doc?.id) {
        saveProgress(doc.id, progress);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [doc]);

  if (!doc) {
    return (
      <main className={styles.viewerContainer} id="reader-content" tabIndex="-1">
        <div style={{ padding: '4rem', textAlign: 'center', color: 'var(--text-muted)' }}>
          <p>No document selected. Please select a document from the sidebar.</p>
        </div>
      </main>
    );
  }

  return (
    <main
      className={styles.viewerContainer}
      id="reader-content"
      tabIndex="-1"
      aria-label="Reading content area"
    >
      {/* 1. Accessible Reading Progress Bar */}
      <div
        className={styles.progressBarWrapper}
        role="progressbar"
        aria-valuenow={readProgress}
        aria-valuemin="0"
        aria-valuemax="100"
        aria-label={`Reading progress: ${readProgress}% completed`}
      >
        <div
          className={styles.progressBarFill}
          style={{ width: `${readProgress}%` }}
        />
      </div>

      {/* 2. Document Header */}
      <header className={styles.docHeader}>
        <div className={styles.headerInner}>
          {/* Metadata badges */}
          <div className={styles.metadataRow}>
            <span className={styles.subjectBadge}>{doc.subject}</span>
            <span>•</span>
            <span>{doc.gradeLevel}</span>
            <span>•</span>
            <span>⏱ {doc.readTimeMinutes} min read</span>
            <span>•</span>
            <span>{doc.wordCount} words</span>
            <span>•</span>
            <span>Progress: {readProgress}%</span>
          </div>

          <h1 className={styles.docTitle}>{doc.title}</h1>
          <p className={styles.docSubtitle}>{doc.subtitle}</p>

          {/* Active Mode Indicators (Non-color reliant with text labels) */}
          <div className={styles.modeBadges} aria-label="Active reading settings">
            {settings.dyslexiaMode && (
              <span className={`${styles.modeBadge} ${styles.modeBadgeActive}`}>
                ✓ Dyslexia Typography (0.12em / 0.25em)
              </span>
            )}
            {settings.adhdFocusMode && (
              <span className={`${styles.modeBadge} ${styles.modeBadgeActive}`}>
                ✓ ADHD Focus ({settings.focusType})
              </span>
            )}
            {settings.highContrast && (
              <span className={`${styles.modeBadge} ${styles.modeBadgeActive}`}>
                ✓ High Contrast (AAA)
              </span>
            )}
            <span className={styles.modeBadge}>
              Theme: {settings.theme}
            </span>
            <span className={styles.modeBadge}>
              Font: {settings.fontSize}px
            </span>
          </div>
        </div>
      </header>

      {/* 3. Document Article Body */}
      <div className={styles.articleWrapper} ref={articleRef}>
        <article className={styles.articleBody} aria-label={doc.title}>
          {/* Document Summary Abstract */}
          {doc.summary && (
            <aside
              className={styles.calloutBox}
              aria-label="Document Summary"
            >
              <div className={styles.calloutTitle}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="16" x2="12" y2="12" />
                  <line x1="12" y1="8" x2="12.01" y2="8" />
                </svg>
                <span>Overview & Core Objective</span>
              </div>
              <p className={styles.calloutContent}>{doc.summary}</p>
            </aside>
          )}

          {/* Render Sections */}
          {doc.sections.map((sec) => (
            <section key={sec.id} aria-labelledby={`heading-${sec.id}`}>
              <h2 id={`heading-${sec.id}`} className={styles.sectionTitle}>
                {sec.heading}
              </h2>

              {/* Paragraphs */}
              {sec.paragraphs.map((para, pIdx) => (
                <p key={pIdx} className={styles.paragraph}>
                  {para}
                </p>
              ))}

              {/* Callouts */}
              {sec.callout && (
                <aside className={styles.calloutBox} aria-label={sec.callout.title}>
                  <div className={styles.calloutTitle}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                    </svg>
                    <span>{sec.callout.title}</span>
                  </div>
                  <p className={styles.calloutContent}>{sec.callout.content}</p>
                </aside>
              )}

              {/* Definitions / Key Terms */}
              {sec.keyTerms && sec.keyTerms.length > 0 && (
                <div className={styles.definitionList} role="region" aria-label="Key Vocabulary Terms">
                  <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                    Key Vocabulary & Concepts
                  </h3>
                  <dl>
                    {sec.keyTerms.map((termItem, tIdx) => (
                      <div key={tIdx} style={{ marginBottom: '0.75rem' }}>
                        <dt className={styles.defTerm}>{termItem.term}</dt>
                        <dd className={styles.defDescription}>{termItem.definition}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              )}

              {/* Lists */}
              {sec.listItems && sec.listItems.length > 0 && (
                <ul className={styles.readerList}>
                  {sec.listItems.map((item, iIdx) => (
                    <li key={iIdx}>{item}</li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </article>
      </div>
    </main>
  );
}

export default DocumentViewer;
