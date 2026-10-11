/**
 * EDUCAPT AI — FLOATING ACCESSIBILITY TOOLBAR
 * Accessible, responsive, non-obtrusive floating toolbar.
 * Lead: Member 1 (Frontend & CSS Accessibility Engine Lead)
 */

import React, { useState } from 'react';
import { useAccessibilitySettings } from '../../hooks/useAccessibilitySettings';
import styles from './FloatingToolbar.module.css';

export function FloatingToolbar({ onOpenSettings }) {
  const {
    settings,
    toggleDyslexiaMode,
    toggleAdhdFocusMode,
    toggleHighContrast,
    setTheme,
    increaseFontSize,
    decreaseFontSize,
    resetToDefaults
  } = useAccessibilitySettings();

  const [isMinimized, setIsMinimized] = useState(false);

  // Cycle themes: light -> dark -> warm -> low-sensory -> light
  const handleCycleTheme = () => {
    const cycle = ['light', 'dark', 'warm', 'low-sensory'];
    const currentIndex = cycle.indexOf(settings.theme);
    const nextIndex = (currentIndex + 1) % cycle.length;
    setTheme(cycle[nextIndex]);
  };

  if (isMinimized) {
    return (
      <button
        type="button"
        onClick={() => setIsMinimized(false)}
        className={styles.collapsedPill}
        aria-label="Expand accessibility toolbar"
        title="Open Accessibility Controls"
      >
        <svg className={styles.iconSvg} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <circle cx="12" cy="12" r="10" />
          <path d="M12 8v8" />
          <path d="M8 12h8" />
        </svg>
        <span>Accessibility</span>
      </button>
    );
  }

  return (
    <nav
      className={styles.floatingToolbarContainer}
      aria-label="Quick Accessibility Toolbar"
      role="toolbar"
    >
      {/* 1. Dyslexia Mode Toggle */}
      <button
        type="button"
        onClick={toggleDyslexiaMode}
        className={`${styles.toolButton} ${settings.dyslexiaMode ? styles.toolButtonActive : ''}`}
        aria-pressed={settings.dyslexiaMode}
        title={settings.dyslexiaMode ? "Dyslexia typography is active (Click to turn off)" : "Enable Dyslexia typography"}
      >
        <svg className={styles.iconSvg} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
          <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
          <path d="M8 7h8" />
          <path d="M8 11h6" />
        </svg>
        <span>Dyslexia</span>
      </button>

      {/* 2. ADHD Focus Mode Toggle */}
      <button
        type="button"
        onClick={toggleAdhdFocusMode}
        className={`${styles.toolButton} ${settings.adhdFocusMode ? styles.toolButtonActive : ''}`}
        aria-pressed={settings.adhdFocusMode}
        title={settings.adhdFocusMode ? "ADHD Focus spotlight is active (Click to turn off)" : "Enable ADHD Focus spotlight"}
      >
        <svg className={styles.iconSvg} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <circle cx="12" cy="12" r="10" />
          <circle cx="12" cy="12" r="4" />
          <line x1="4.93" y1="4.93" x2="9.17" y2="9.17" />
          <line x1="14.83" y1="14.83" x2="19.07" y2="19.07" />
          <line x1="14.83" y1="9.17" x2="19.07" y2="4.93" />
          <line x1="4.93" y1="19.07" x2="9.17" y2="14.83" />
        </svg>
        <span>Focus</span>
      </button>

      {/* 3. High Contrast Toggle */}
      <button
        type="button"
        onClick={toggleHighContrast}
        className={`${styles.toolButton} ${settings.highContrast ? styles.toolButtonActive : ''}`}
        aria-pressed={settings.highContrast}
        title={settings.highContrast ? "High Contrast mode is on (Click to turn off)" : "Enable High Contrast mode"}
      >
        <svg className={styles.iconSvg} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <circle cx="12" cy="12" r="10" />
          <path d="M12 2a10 10 0 0 1 0 20z" fill="currentColor" />
        </svg>
        <span>Contrast</span>
      </button>

      <div className={styles.divider} role="separator" aria-hidden="true" />

      {/* 4. Theme Selector Cycler */}
      <button
        type="button"
        onClick={handleCycleTheme}
        className={styles.toolButton}
        aria-label={`Current theme: ${settings.theme}. Click to switch theme.`}
        title={`Current theme: ${settings.theme} (Click to switch)`}
      >
        <svg className={styles.iconSvg} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M12 2v2" />
          <path d="M12 20v2" />
          <path d="m4.93 4.93 1.41 1.41" />
          <path d="m17.66 17.66 1.41 1.41" />
          <path d="M2 12h2" />
          <path d="M20 12h2" />
          <path d="m6.34 17.66-1.41 1.41" />
          <path d="m19.07 4.93-1.41 1.41" />
          <circle cx="12" cy="12" r="4" />
        </svg>
        <span style={{ textTransform: 'capitalize' }}>{settings.theme}</span>
      </button>

      <div className={styles.divider} role="separator" aria-hidden="true" />

      {/* 5 & 6. Font Size Controls */}
      <div className={styles.toolbarGroup} role="group" aria-label="Font Size Adjustments">
        <button
          type="button"
          onClick={decreaseFontSize}
          className={styles.toolButton}
          aria-label="Decrease font size"
          title="Decrease text size (Minimum 14px)"
          disabled={settings.fontSize <= 14}
        >
          <svg className={styles.iconSvg} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          <span className="sr-only">Smaller</span>
        </button>

        <span className={styles.sizeBadge} aria-label={`Current text size ${settings.fontSize} pixels`}>
          {settings.fontSize}px
        </span>

        <button
          type="button"
          onClick={increaseFontSize}
          className={styles.toolButton}
          aria-label="Increase font size"
          title="Increase text size (Maximum 32px)"
          disabled={settings.fontSize >= 32}
        >
          <svg className={styles.iconSvg} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          <span className="sr-only">Larger</span>
        </button>
      </div>

      <div className={styles.divider} role="separator" aria-hidden="true" />

      {/* 7. Open Detailed Settings Panel */}
      <button
        type="button"
        onClick={onOpenSettings}
        className={styles.toolButton}
        aria-label="Open comprehensive accessibility settings"
        title="Open Full Settings"
      >
        <svg className={styles.iconSvg} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <circle cx="12" cy="12" r="3" />
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
        </svg>
        <span>Settings</span>
      </button>

      {/* 8. Reset Settings to Defaults */}
      <button
        type="button"
        onClick={resetToDefaults}
        className={styles.toolButton}
        aria-label="Reset all accessibility settings to default values"
        title="Reset All to Defaults"
      >
        <svg className={styles.iconSvg} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <polyline points="1 4 1 10 7 10" />
          <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
        </svg>
        <span className="sr-only">Reset</span>
      </button>

      {/* Minimize Toolbar Button */}
      <button
        type="button"
        onClick={() => setIsMinimized(true)}
        className={styles.collapseToggleBtn}
        aria-label="Minimize floating toolbar"
        title="Minimize toolbar"
      >
        <svg className={styles.iconSvg} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>
    </nav>
  );
}

export default FloatingToolbar;
