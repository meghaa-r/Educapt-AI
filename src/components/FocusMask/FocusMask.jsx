/**
 * EDUCAPT AI — FOCUS MASK COMPONENT
 * Cursor-following reading spotlight and keyboard-accessible reading ruler.
 * Lead: Member 1 (Frontend & CSS Accessibility Engine Lead)
 */

import React from 'react';
import { useAccessibilitySettings } from '../../hooks/useAccessibilitySettings';
import { useFocusMask } from '../../hooks/useFocusMask';
import styles from './FocusMask.module.css';

export function FocusMask() {
  const { settings, toggleAdhdFocusMode } = useAccessibilitySettings();
  const { adhdFocusMode, focusType } = settings;

  // Initialize tracking hook with keyboard navigation and zero-rerender RAF loop
  useFocusMask({
    enabled: adhdFocusMode,
    focusType,
    onToggle: toggleAdhdFocusMode
  });

  if (!adhdFocusMode) return null;

  const isSpotlight = focusType === 'spotlight';

  return (
    <>
      {/* Visual Mask Overlay */}
      <div
        className={`${styles.focusOverlay} ${isSpotlight ? styles.spotlightMode : styles.guideLineMode}`}
        role="presentation"
        aria-hidden="true"
      />

      {/* Keyboard-accessible exit control and status indicator */}
      <aside
        className={styles.statusBadge}
        role="status"
        aria-live="polite"
        aria-label="ADHD Focus Mode active"
      >
        <span className={styles.pulsingDot} aria-hidden="true" />
        <span>Focus Active</span>
        <span className={styles.hintText}>(Alt+↑/↓ to move)</span>
        <button
          type="button"
          onClick={toggleAdhdFocusMode}
          className={styles.dismissBtn}
          aria-label="Turn off ADHD focus mode"
        >
          Exit
        </button>
      </aside>
    </>
  );
}

export default FocusMask;
