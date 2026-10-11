/**
 * EDUCAPT AI — ACCESSIBILITY SETTINGS PANEL
 * Comprehensive WCAG 2.1 AA personalization panel for neurodivergent learners.
 * Lead: Member 1 (Frontend & CSS Accessibility Engine Lead)
 */

import React, { useEffect, useRef } from 'react';
import { useAccessibilitySettings } from '../../hooks/useAccessibilitySettings';
import ThemeToggle from '../ThemeToggle/ThemeToggle';
import styles from './AccessibilitySettings.module.css';

export function AccessibilitySettings({ isOpen, onClose }) {
  const {
    settings,
    updateSetting,
    toggleDyslexiaMode,
    toggleAdhdFocusMode,
    toggleHighContrast,
    resetToDefaults
  } = useAccessibilitySettings();

  const drawerRef = useRef(null);
  const closeButtonRef = useRef(null);

  // Keyboard accessibility: close drawer on Escape key
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    // Focus the close button when opened
    if (closeButtonRef.current) {
      closeButtonRef.current.focus();
    }

    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className={styles.drawerBackdrop}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="presentation"
    >
      <section
        ref={drawerRef}
        className={styles.drawerPanel}
        role="dialog"
        aria-modal="true"
        aria-labelledby="accessibility-settings-title"
      >
        {/* Header */}
        <div className={styles.drawerHeader}>
          <div className={styles.titleArea}>
            <h2 id="accessibility-settings-title">Reading & Accessibility</h2>
            <p>Customize your sensory and reading comfort</p>
          </div>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            className={styles.closeButton}
            aria-label="Close accessibility settings"
            title="Close (Esc)"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Content Body */}
        <div className={styles.drawerContent}>
          {/* SECTION 1: READING MODES */}
          <div className={styles.settingsSection}>
            <h3 className={styles.sectionHeading}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
              </svg>
              <span>Dedicated Reading Modes</span>
            </h3>

            {/* Dyslexia Mode Toggle */}
            <div className={styles.toggleRow}>
              <label htmlFor="dyslexia-toggle" className={styles.toggleLabel}>
                <span className={styles.toggleTitle}>Dyslexia Mode</span>
                <span className={styles.toggleDesc}>
                  Applies weighted typography, generous letter and word spacing (0.12em / 0.25em).
                </span>
              </label>
              <input
                id="dyslexia-toggle"
                type="checkbox"
                checked={settings.dyslexiaMode}
                onChange={toggleDyslexiaMode}
                className={styles.switchInput}
                aria-checked={settings.dyslexiaMode}
              />
            </div>

            {/* ADHD Focus Mode Toggle */}
            <div className={styles.toggleRow}>
              <label htmlFor="adhd-toggle" className={styles.toggleLabel}>
                <span className={styles.toggleTitle}>ADHD Focus Spotlight</span>
                <span className={styles.toggleDesc}>
                  Dims background text to guide attention directly to current reading position.
                </span>
              </label>
              <input
                id="adhd-toggle"
                type="checkbox"
                checked={settings.adhdFocusMode}
                onChange={toggleAdhdFocusMode}
                className={styles.switchInput}
                aria-checked={settings.adhdFocusMode}
              />
            </div>

            {/* ADHD Focus Type Selection (Spotlight vs Reading Ruler) */}
            {settings.adhdFocusMode && (
              <div className={styles.radioGrid} role="radiogroup" aria-label="ADHD Focus Type">
                <button
                  type="button"
                  role="radio"
                  aria-checked={settings.focusType === 'spotlight'}
                  onClick={() => updateSetting('focusType', 'spotlight')}
                  className={`${styles.radioCard} ${settings.focusType === 'spotlight' ? styles.radioCardActive : ''}`}
                >
                  <span className={styles.radioTitle}>Circular Spotlight</span>
                  <span className={styles.radioDesc}>Follows pointer smoothly</span>
                </button>
                <button
                  type="button"
                  role="radio"
                  aria-checked={settings.focusType === 'guide-line'}
                  onClick={() => updateSetting('focusType', 'guide-line')}
                  className={`${styles.radioCard} ${settings.focusType === 'guide-line' ? styles.radioCardActive : ''}`}
                >
                  <span className={styles.radioTitle}>Reading Ruler</span>
                  <span className={styles.radioDesc}>Horizontal guided strip</span>
                </button>
              </div>
            )}

            {/* Spotlight Size Slider */}
            {settings.adhdFocusMode && (
              <div className={styles.sliderCard}>
                <div className={styles.sliderHeader}>
                  <label htmlFor="spotlight-size" className={styles.sliderLabel}>Spotlight Size</label>
                  <output htmlFor="spotlight-size" className={styles.sliderValue}>{settings.spotlightSize}px</output>
                </div>
                <input
                  id="spotlight-size"
                  type="range"
                  min="140"
                  max="450"
                  step="10"
                  value={settings.spotlightSize}
                  onChange={(e) => updateSetting('spotlightSize', Number(e.target.value))}
                  className={styles.rangeInput}
                />
              </div>
            )}

            {/* Dimming Opacity */}
            {settings.adhdFocusMode && (
              <div className={styles.sliderCard}>
                <div className={styles.sliderHeader}>
                  <label htmlFor="dim-opacity" className={styles.sliderLabel}>Background Dimming</label>
                  <output htmlFor="dim-opacity" className={styles.sliderValue}>{Math.round(settings.spotlightDimOpacity * 100)}%</output>
                </div>
                <input
                  id="dim-opacity"
                  type="range"
                  min="0.30"
                  max="0.90"
                  step="0.05"
                  value={settings.spotlightDimOpacity}
                  onChange={(e) => updateSetting('spotlightDimOpacity', Number(e.target.value))}
                  className={styles.rangeInput}
                />
              </div>
            )}
          </div>

          {/* SECTION 2: THEMES & CONTRAST */}
          <div className={styles.settingsSection}>
            <h3 className={styles.sectionHeading}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 2a10 10 0 0 1 0 20z" fill="currentColor" />
              </svg>
              <span>Color & Contrast</span>
            </h3>

            {/* Theme Picker */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <span className={styles.toggleTitle}>Color Atmosphere</span>
              <ThemeToggle showLabels={true} />
            </div>

            {/* High Contrast Mode Toggle */}
            <div className={styles.toggleRow}>
              <label htmlFor="contrast-toggle" className={styles.toggleLabel}>
                <span className={styles.toggleTitle}>High Contrast (WCAG AAA)</span>
                <span className={styles.toggleDesc}>
                  Maximized 7:1+ contrast with distinct borders and vivid yellow highlights.
                </span>
              </label>
              <input
                id="contrast-toggle"
                type="checkbox"
                checked={settings.highContrast}
                onChange={toggleHighContrast}
                className={styles.switchInput}
                aria-checked={settings.highContrast}
              />
            </div>
          </div>

          {/* SECTION 3: TYPOGRAPHY & SPACING */}
          <div className={styles.settingsSection}>
            <h3 className={styles.sectionHeading}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <polyline points="4 7 4 4 20 4 20 7" />
                <line x1="9" y1="20" x2="15" y2="20" />
                <line x1="12" y1="4" x2="12" y2="20" />
              </svg>
              <span>Typography Engine</span>
            </h3>

            {/* Font Family Selection */}
            {!settings.dyslexiaMode && (
              <div className={styles.sliderCard}>
                <label htmlFor="font-family-select" className={styles.sliderLabel}>Typeface</label>
                <select
                  id="font-family-select"
                  value={settings.fontFamily}
                  onChange={(e) => updateSetting('fontFamily', e.target.value)}
                  style={{
                    padding: '0.5rem',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--border-color)',
                    background: 'var(--bg-surface)',
                    color: 'var(--text-primary)',
                    marginTop: '0.35rem'
                  }}
                >
                  <option value="system">Clean System Sans</option>
                  <option value="lexend">Lexend (High Readability)</option>
                  <option value="serif">Classic Editorial Serif</option>
                  <option value="opendyslexic">OpenDyslexic (Dyslexia Friendly)</option>
                </select>
              </div>
            )}

            {/* Font Size Slider */}
            <div className={styles.sliderCard}>
              <div className={styles.sliderHeader}>
                <label htmlFor="font-size-slider" className={styles.sliderLabel}>Font Size</label>
                <output htmlFor="font-size-slider" className={styles.sliderValue}>{settings.fontSize}px</output>
              </div>
              <input
                id="font-size-slider"
                type="range"
                min="14"
                max="32"
                step="1"
                value={settings.fontSize}
                onChange={(e) => updateSetting('fontSize', Number(e.target.value))}
                className={styles.rangeInput}
              />
            </div>

            {/* Line Height Slider */}
            <div className={styles.sliderCard}>
              <div className={styles.sliderHeader}>
                <label htmlFor="line-height-slider" className={styles.sliderLabel}>Line Height</label>
                <output htmlFor="line-height-slider" className={styles.sliderValue}>{settings.lineHeight}x</output>
              </div>
              <input
                id="line-height-slider"
                type="range"
                min="1.3"
                max="2.5"
                step="0.05"
                value={settings.lineHeight}
                onChange={(e) => updateSetting('lineHeight', Number(e.target.value))}
                className={styles.rangeInput}
              />
            </div>

            {/* Letter Spacing Slider */}
            <div className={styles.sliderCard}>
              <div className={styles.sliderHeader}>
                <label htmlFor="letter-spacing-slider" className={styles.sliderLabel}>Letter Spacing</label>
                <output htmlFor="letter-spacing-slider" className={styles.sliderValue}>{settings.letterSpacing}em</output>
              </div>
              <input
                id="letter-spacing-slider"
                type="range"
                min="0.0"
                max="0.25"
                step="0.01"
                value={settings.letterSpacing}
                onChange={(e) => updateSetting('letterSpacing', Number(e.target.value))}
                className={styles.rangeInput}
              />
            </div>

            {/* Word Spacing Slider */}
            <div className={styles.sliderCard}>
              <div className={styles.sliderHeader}>
                <label htmlFor="word-spacing-slider" className={styles.sliderLabel}>Word Spacing</label>
                <output htmlFor="word-spacing-slider" className={styles.sliderValue}>{settings.wordSpacing}em</output>
              </div>
              <input
                id="word-spacing-slider"
                type="range"
                min="0.0"
                max="0.50"
                step="0.02"
                value={settings.wordSpacing}
                onChange={(e) => updateSetting('wordSpacing', Number(e.target.value))}
                className={styles.rangeInput}
              />
            </div>

            {/* Paragraph Spacing Slider */}
            <div className={styles.sliderCard}>
              <div className={styles.sliderHeader}>
                <label htmlFor="paragraph-spacing-slider" className={styles.sliderLabel}>Paragraph Spacing</label>
                <output htmlFor="paragraph-spacing-slider" className={styles.sliderValue}>{settings.paragraphSpacing}rem</output>
              </div>
              <input
                id="paragraph-spacing-slider"
                type="range"
                min="0.8"
                max="2.5"
                step="0.1"
                value={settings.paragraphSpacing}
                onChange={(e) => updateSetting('paragraphSpacing', Number(e.target.value))}
                className={styles.rangeInput}
              />
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className={styles.drawerFooter}>
          <button
            type="button"
            onClick={resetToDefaults}
            className={styles.resetBtn}
            title="Reset all settings to documented defaults"
          >
            Reset Defaults
          </button>
          <button
            type="button"
            onClick={onClose}
            className={styles.doneBtn}
          >
            Done
          </button>
        </div>
      </section>
    </div>
  );
}

export default AccessibilitySettings;
