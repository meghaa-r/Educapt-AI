/**
 * EDUCAPT AI — HOOK: useAccessibilitySettings
 * Consumer hook providing clean typed access to AccessibilityContext.
 * Lead: Member 1 (Frontend & CSS Accessibility Engine Lead)
 */

import { useContext } from 'react';
import { AccessibilityContext } from '../contexts/AccessibilityContext';

export function useAccessibilitySettings() {
  const context = useContext(AccessibilityContext);
  if (!context) {
    throw new Error('useAccessibilitySettings must be used within an <AccessibilityProvider>');
  }
  return context;
}
