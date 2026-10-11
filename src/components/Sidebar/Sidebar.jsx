/**
 * EDUCAPT AI — SIDEBAR COMPONENT
 * Accessible navigation sidebar with mobile drawer support and document selector.
 * Lead: Member 1 (Frontend & CSS Accessibility Engine Lead)
 */

import React, { useState, useEffect } from 'react';
import styles from './Sidebar.module.css';

export function Sidebar({
  activeView = 'reader',
  onSelectView,
  documents = [],
  currentDocId = '',
  onSelectDocument,
  onOpenSettings
}) {
  const [isOpenMobile, setIsOpenMobile] = useState(false);

  // Close mobile sidebar on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpenMobile) {
        setIsOpenMobile(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpenMobile]);

  const handleNavClick = (view) => {
    if (view === 'settings') {
      onOpenSettings();
    } else {
      onSelectView(view);
    }
    setIsOpenMobile(false);
  };

  const handleDocClick = (id) => {
    onSelectDocument(id);
    onSelectView('reader');
    setIsOpenMobile(false);
  };

  return (
    <>
      {/* Mobile Toggle Hamburger Button */}
      <button
        type="button"
        className={styles.mobileMenuBtn}
        onClick={() => setIsOpenMobile(prev => !prev)}
        aria-expanded={isOpenMobile}
        aria-label={isOpenMobile ? "Close navigation menu" : "Open navigation menu"}
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          {isOpenMobile ? (
            <>
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </>
          ) : (
            <>
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </>
          )}
        </svg>
      </button>

      {/* Mobile Backdrop */}
      {isOpenMobile && (
        <div
          className={styles.mobileBackdrop}
          onClick={() => setIsOpenMobile(false)}
          aria-hidden="true"
        />
      )}

      {/* Main Sidebar Aside */}
      <aside
        className={`${styles.sidebarAside} ${isOpenMobile ? styles.sidebarOpen : ''}`}
        aria-label="Application navigation sidebar"
      >
        {/* Brand Header */}
        <div className={styles.brandHeader}>
          <div className={styles.brandLogo} aria-hidden="true">
            E
          </div>
          <div className={styles.brandText}>
            <span className={styles.brandName}>Educapt AI</span>
            <span className={styles.brandTagline}>Reading that adapts to you</span>
          </div>
        </div>

        {/* Navigation Region */}
        <nav aria-label="Main Menu">
          <ul className={styles.navList}>
            {/* 1. Home */}
            <li>
              <button
                type="button"
                onClick={() => handleNavClick('home')}
                className={`${styles.navLink} ${activeView === 'home' ? styles.navLinkActive : ''}`}
                aria-current={activeView === 'home' ? 'page' : undefined}
              >
                <svg className={styles.navIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                  <polyline points="9 22 9 12 15 12 15 22" />
                </svg>
                <span>Home</span>
              </button>
            </li>

            {/* 2. My Documents */}
            <li>
              <button
                type="button"
                onClick={() => handleNavClick('documents')}
                className={`${styles.navLink} ${activeView === 'documents' ? styles.navLinkActive : ''}`}
                aria-current={activeView === 'documents' ? 'page' : undefined}
              >
                <svg className={styles.navIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="16" y1="13" x2="8" y2="13" />
                  <line x1="16" y1="17" x2="8" y2="17" />
                  <polyline points="10 9 9 9 8 9" />
                </svg>
                <span>My Documents</span>
              </button>
            </li>

            {/* 3. Reading Workspace */}
            <li>
              <button
                type="button"
                onClick={() => handleNavClick('reader')}
                className={`${styles.navLink} ${activeView === 'reader' ? styles.navLinkActive : ''}`}
                aria-current={activeView === 'reader' ? 'page' : undefined}
              >
                <svg className={styles.navIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                  <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                </svg>
                <span>Reading Workspace</span>
              </button>
            </li>

            {/* 4. Accessibility Settings */}
            <li>
              <button
                type="button"
                onClick={() => handleNavClick('settings')}
                className={styles.navLink}
                aria-label="Open Accessibility Settings Panel"
              >
                <svg className={styles.navIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <circle cx="12" cy="12" r="3" />
                  <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
                </svg>
                <span>Accessibility Settings</span>
              </button>
            </li>

            {/* 5. Mind Maps (Member 2 Placeholder) */}
            <li>
              <button
                type="button"
                onClick={() => handleNavClick('mindmap')}
                className={`${styles.navLink} ${activeView === 'mindmap' ? styles.navLinkActive : ''}`}
                aria-current={activeView === 'mindmap' ? 'page' : undefined}
              >
                <svg className={styles.navIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <circle cx="18" cy="5" r="3" />
                  <circle cx="6" cy="12" r="3" />
                  <circle cx="18" cy="19" r="3" />
                  <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
                  <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
                </svg>
                <span>Mind Maps</span>
              </button>
            </li>
          </ul>
        </nav>

        {/* Quick Document Picker */}
        <div className={styles.docsSection}>
          <div className={styles.docsSectionTitle}>Quick Library</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
            {documents.map((d) => {
              const isSelected = d.id === currentDocId;
              return (
                <button
                  key={d.id}
                  type="button"
                  onClick={() => handleDocClick(d.id)}
                  className={`${styles.docItemBtn} ${isSelected ? styles.docItemBtnActive : ''}`}
                  aria-current={isSelected ? 'true' : undefined}
                  title={d.title}
                >
                  <span className={styles.docItemTitle}>{d.title}</span>
                  <span className={styles.docItemSub}>{d.subject} • {d.readTimeMinutes}m</span>
                </button>
              );
            })}
          </div>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;
