/**
 * EDUCAPT AI — THEME TOGGLE COMPONENT
 * Semantic, accessible theme selector for Light, Dark, Warm, and Low-Sensory themes.
 * Lead: Member 1 (Frontend & CSS Accessibility Engine Lead)
 */

import React from 'react';
import { useAccessibilitySettings } from '../../hooks/useAccessibilitySettings';
import styles from './ThemeToggle.module.css';

const THEMES = [
  {
    id: 'light',
    label: 'Light',
    title: 'Switch to Light Theme',
    icon: (
      <svg className={styles.iconSvg} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="5" />
        <line x1="12" y1="1" x2="12" y2="3" />
        <line x1="12" y1="21" x2="12" y2="23" />
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
        <line x1="1" y1="12" x2="3" y2="12" />
        <line x1="21" y1="12" x2="23" y2="12" />
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
      </svg>
    )
  },
  {
    id: 'dark',
    label: 'Dark',
    title: 'Switch to Dark Theme',
    icon: (
      <svg className={styles.iconSvg} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
      </svg>
    )
  },
  {
    id: 'warm',
    label: 'Warm',
    title: 'Switch to Warm Sepia Paper Theme',
    icon: (
      <svg className={styles.iconSvg} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
        <polyline points="10 9 9 9 8 9" />
      </svg>
    )
  },
  {
    id: 'low-sensory',
    label: 'Sensory',
    title: 'Switch to Muted Low-Sensory Sage Theme',
    icon: (
      <svg className={styles.iconSvg} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
        <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
      </svg>
    )
  }
];

export function ThemeToggle({ showLabels = true }) {
  const { settings, setTheme } = useAccessibilitySettings();

  return (
    <div
      className={styles.themeContainer}
      role="radiogroup"
      aria-label="Color Theme Selection"
    >
      {THEMES.map((item) => {
        const isActive = settings.theme === item.id;
        return (
          <button
            key={item.id}
            type="button"
            role="radio"
            aria-checked={isActive}
            aria-label={item.title}
            title={item.title}
            onClick={() => setTheme(item.id)}
            className={`${styles.themeBtn} ${isActive ? styles.themeBtnActive : ''}`}
          >
            {item.icon}
            {showLabels && <span>{item.label}</span>}
          </button>
        );
      })}
    </div>
  );
}

export default ThemeToggle;
