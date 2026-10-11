/**
 * EDUCAPT AI — CENTRAL ACCESSIBILITY SETTINGS CONTEXT & ENGINE
 * WCAG 2.1 AA Compliant central state management for neurodivergent personalization.
 * Lead: Member 1 (Frontend & CSS Accessibility Engine Lead)
 */

import React, { createContext, useContext, useState, useEffect, useRef, useCallback } from 'react';

const STORAGE_KEY = 'educapt_accessibility_preferences_v1';

// Documented canonical defaults
export const DEFAULT_SETTINGS = {
  theme: 'light',                // 'light' | 'dark' | 'warm' | 'low-sensory'
  highContrast: false,           // Independent WCAG AAA contrast override
  dyslexiaMode: false,           // Dedicated typography engine mode
  adhdFocusMode: false,          // Cursor / guide focus mask
  focusType: 'spotlight',        // 'spotlight' | 'guide-line'
  spotlightSize: 260,            // Pixels (140 - 450)
  spotlightDimOpacity: 0.65,     // 0.3 - 0.9
  fontSize: 18,                  // Pixels (14 - 32)
  lineHeight: 1.7,               // Multiplier (1.3 - 2.5)
  letterSpacing: 0.02,           // em (0 - 0.25)
  wordSpacing: 0.04,             // em (0 - 0.5)
  paragraphSpacing: 1.4,         // rem (0.8 - 2.5)
  fontFamily: 'system',          // 'system' | 'opendyslexic' | 'lexend' | 'serif'
  textAlign: 'left'              // 'left' | 'justify'
};

// Documented Dyslexia Mode preset values
export const DYSLEXIA_PRESETS = {
  letterSpacing: 0.12,
  wordSpacing: 0.25,
  lineHeight: 1.8,
  paragraphSpacing: 1.6,
  fontFamily: 'opendyslexic'
};

// Valid options for validation
const VALID_THEMES = ['light', 'dark', 'warm', 'low-sensory'];
const VALID_FOCUS_TYPES = ['spotlight', 'guide-line'];
const VALID_FONTS = ['system', 'opendyslexic', 'lexend', 'serif'];

/**
 * Validate and safely bound any loaded or supplied settings
 */
function sanitizeSettings(data) {
  if (!data || typeof data !== 'object') return { ...DEFAULT_SETTINGS };

  const safe = { ...DEFAULT_SETTINGS };

  if (VALID_THEMES.includes(data.theme)) safe.theme = data.theme;
  safe.highContrast = Boolean(data.highContrast);
  safe.dyslexiaMode = Boolean(data.dyslexiaMode);
  safe.adhdFocusMode = Boolean(data.adhdFocusMode);

  if (VALID_FOCUS_TYPES.includes(data.focusType)) safe.focusType = data.focusType;

  if (typeof data.spotlightSize === 'number' && !isNaN(data.spotlightSize)) {
    safe.spotlightSize = Math.max(140, Math.min(450, data.spotlightSize));
  }
  if (typeof data.spotlightDimOpacity === 'number' && !isNaN(data.spotlightDimOpacity)) {
    safe.spotlightDimOpacity = Math.max(0.3, Math.min(0.95, data.spotlightDimOpacity));
  }
  if (typeof data.fontSize === 'number' && !isNaN(data.fontSize)) {
    safe.fontSize = Math.max(14, Math.min(32, data.fontSize));
  }
  if (typeof data.lineHeight === 'number' && !isNaN(data.lineHeight)) {
    safe.lineHeight = Math.max(1.3, Math.min(2.5, data.lineHeight));
  }
  if (typeof data.letterSpacing === 'number' && !isNaN(data.letterSpacing)) {
    safe.letterSpacing = Math.max(0, Math.min(0.25, data.letterSpacing));
  }
  if (typeof data.wordSpacing === 'number' && !isNaN(data.wordSpacing)) {
    safe.wordSpacing = Math.max(0, Math.min(0.5, data.wordSpacing));
  }
  if (typeof data.paragraphSpacing === 'number' && !isNaN(data.paragraphSpacing)) {
    safe.paragraphSpacing = Math.max(0.8, Math.min(2.5, data.paragraphSpacing));
  }
  if (VALID_FONTS.includes(data.fontFamily)) safe.fontFamily = data.fontFamily;
  if (['left', 'justify'].includes(data.textAlign)) safe.textAlign = data.textAlign;

  return safe;
}

export const AccessibilityContext = createContext(null);

export function AccessibilityProvider({ children }) {
  // 1. Initial State: Load safely from localStorage or system theme
  const [settings, setSettings] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        return sanitizeSettings(parsed);
      }
    } catch (e) {
      console.warn('[Educapt Accessibility] Failed to read from localStorage:', e);
    }

    // Detect system dark preference as default if no preference stored
    const systemPrefersDark = typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches;

    return {
      ...DEFAULT_SETTINGS,
      theme: systemPrefersDark ? 'dark' : 'light'
    };
  });

  // Track prior typography state before Dyslexia Mode was engaged, so we can restore it cleanly
  const preDyslexiaSnapshot = useRef({
    letterSpacing: DEFAULT_SETTINGS.letterSpacing,
    wordSpacing: DEFAULT_SETTINGS.wordSpacing,
    lineHeight: DEFAULT_SETTINGS.lineHeight,
    paragraphSpacing: DEFAULT_SETTINGS.paragraphSpacing,
    fontFamily: DEFAULT_SETTINGS.fontFamily
  });

  // Screen reader live announcement text
  const [liveAnnouncement, setLiveAnnouncement] = useState('');

  // Announce a message to screen readers
  const announce = useCallback((message) => {
    setLiveAnnouncement(message);
    const timer = setTimeout(() => setLiveAnnouncement(''), 4000);
    return () => clearTimeout(timer);
  }, []);

  // 2. Persist to localStorage safely on change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    } catch (e) {
      console.warn('[Educapt Accessibility] Failed to persist settings to localStorage:', e);
    }
  }, [settings]);

  // 3. Synchronize CSS Custom Properties on Root Document Element
  useEffect(() => {
    const root = document.documentElement;

    // Apply Theme and High Contrast data attributes
    root.setAttribute('data-theme', settings.theme);
    root.setAttribute('data-high-contrast', settings.highContrast ? 'true' : 'false');

    // Font stack mapping
    let fontStack = 'var(--font-stack-standard)';
    if (settings.dyslexiaMode || settings.fontFamily === 'opendyslexic') {
      fontStack = 'var(--font-stack-dyslexic)';
    } else if (settings.fontFamily === 'lexend') {
      fontStack = `'Lexend', -apple-system, BlinkMacSystemFont, sans-serif`;
    } else if (settings.fontFamily === 'serif') {
      fontStack = 'var(--font-stack-serif)';
    }

    // Apply reader typography CSS variables
    root.style.setProperty('--reader-font-family', fontStack);
    root.style.setProperty('--reader-font-size', `${settings.fontSize}px`);
    root.style.setProperty('--reader-line-height', `${settings.lineHeight}`);
    root.style.setProperty('--reader-letter-spacing', `${settings.letterSpacing}em`);
    root.style.setProperty('--reader-word-spacing', `${settings.wordSpacing}em`);
    root.style.setProperty('--reader-paragraph-spacing', `${settings.paragraphSpacing}rem`);
    root.style.setProperty('--reader-text-align', settings.textAlign);

    // Apply focus spotlight variables
    root.style.setProperty('--focus-spotlight-size', `${settings.spotlightSize}px`);
    root.style.setProperty('--focus-dim-opacity', `${settings.spotlightDimOpacity}`);

    // Manage dyslexia-active class on body
    if (settings.dyslexiaMode) {
      document.body.classList.add('dyslexia-active');
    } else {
      document.body.classList.remove('dyslexia-active');
    }
  }, [settings]);

  // --------------------------------------------------------------------------
  // ACTION DISPATCHERS
  // --------------------------------------------------------------------------

  // Update a single setting with validation
  const updateSetting = useCallback((key, value) => {
    setSettings(prev => {
      const next = sanitizeSettings({ ...prev, [key]: value });
      return next;
    });
  }, []);

  // Set Theme
  const setTheme = useCallback((theme) => {
    if (!VALID_THEMES.includes(theme)) return;
    setSettings(prev => ({ ...prev, theme }));
    announce(`Theme changed to ${theme.replace('-', ' ')}`);
  }, [announce]);

  // Toggle High Contrast
  const toggleHighContrast = useCallback(() => {
    setSettings(prev => {
      const nextVal = !prev.highContrast;
      announce(nextVal ? 'High Contrast mode enabled' : 'High Contrast mode disabled');
      return { ...prev, highContrast: nextVal };
    });
  }, [announce]);

  // Toggle Dyslexia Mode with snapshot restore logic
  const toggleDyslexiaMode = useCallback(() => {
    setSettings(prev => {
      if (!prev.dyslexiaMode) {
        // Turning ON: save snapshot of non-dyslexia settings
        preDyslexiaSnapshot.current = {
          letterSpacing: prev.letterSpacing,
          wordSpacing: prev.wordSpacing,
          lineHeight: prev.lineHeight,
          paragraphSpacing: prev.paragraphSpacing,
          fontFamily: prev.fontFamily
        };

        announce('Dyslexia typography mode enabled');
        return {
          ...prev,
          dyslexiaMode: true,
          letterSpacing: DYSLEXIA_PRESETS.letterSpacing,
          wordSpacing: DYSLEXIA_PRESETS.wordSpacing,
          lineHeight: DYSLEXIA_PRESETS.lineHeight,
          paragraphSpacing: DYSLEXIA_PRESETS.paragraphSpacing,
          fontFamily: DYSLEXIA_PRESETS.fontFamily
        };
      } else {
        // Turning OFF: restore prior configuration
        announce('Dyslexia typography mode disabled');
        return {
          ...prev,
          dyslexiaMode: false,
          letterSpacing: preDyslexiaSnapshot.current.letterSpacing,
          wordSpacing: preDyslexiaSnapshot.current.wordSpacing,
          lineHeight: preDyslexiaSnapshot.current.lineHeight,
          paragraphSpacing: preDyslexiaSnapshot.current.paragraphSpacing,
          fontFamily: preDyslexiaSnapshot.current.fontFamily
        };
      }
    });
  }, [announce]);

  // Toggle ADHD Focus Mode
  const toggleAdhdFocusMode = useCallback(() => {
    setSettings(prev => {
      const nextVal = !prev.adhdFocusMode;
      announce(nextVal ? 'ADHD focus spotlight enabled' : 'ADHD focus spotlight disabled');
      return { ...prev, adhdFocusMode: nextVal };
    });
  }, [announce]);

  // Increase Font Size by 2px (capped at 32px)
  const increaseFontSize = useCallback(() => {
    setSettings(prev => {
      const nextSize = Math.min(32, prev.fontSize + 2);
      announce(`Font size increased to ${nextSize} pixels`);
      return { ...prev, fontSize: nextSize };
    });
  }, [announce]);

  // Decrease Font Size by 2px (minimum 14px)
  const decreaseFontSize = useCallback(() => {
    setSettings(prev => {
      const nextSize = Math.max(14, prev.fontSize - 2);
      announce(`Font size decreased to ${nextSize} pixels`);
      return { ...prev, fontSize: nextSize };
    });
  }, [announce]);

  // Reset to Documented Canonical Defaults
  const resetToDefaults = useCallback(() => {
    setSettings({ ...DEFAULT_SETTINGS });
    preDyslexiaSnapshot.current = {
      letterSpacing: DEFAULT_SETTINGS.letterSpacing,
      wordSpacing: DEFAULT_SETTINGS.wordSpacing,
      lineHeight: DEFAULT_SETTINGS.lineHeight,
      paragraphSpacing: DEFAULT_SETTINGS.paragraphSpacing,
      fontFamily: DEFAULT_SETTINGS.fontFamily
    };
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {
      console.warn('[Educapt Accessibility] Failed to clear storage during reset:', e);
    }
    announce('All accessibility settings have been restored to defaults');
  }, [announce]);

  // Context value exposed to consumers
  const value = {
    settings,
    updateSetting,
    setTheme,
    toggleHighContrast,
    toggleDyslexiaMode,
    toggleAdhdFocusMode,
    increaseFontSize,
    decreaseFontSize,
    resetToDefaults,
    liveAnnouncement,
    announce
  };

  return (
    <AccessibilityContext.Provider value={value}>
      {children}
    </AccessibilityContext.Provider>
  );
}

export function useAccessibilitySettings() {
  const context = useContext(AccessibilityContext);
  if (!context) {
    throw new Error('useAccessibilitySettings must be used within an <AccessibilityProvider>');
  }
  return context;
}

