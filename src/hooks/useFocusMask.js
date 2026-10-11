/**
 * EDUCAPT AI — HOOK: useFocusMask
 * High-performance pointer tracking and keyboard guide for ADHD Focus Mode.
 *
 * Performance Architecture:
 * - Updates CSS custom properties (--focus-x, --focus-y) directly via requestAnimationFrame.
 * - ZERO React re-renders during mouse movement, touch tracking, or keyboard scrolling.
 * - Full listener cleanup on disable/unmount.
 * - Full keyboard navigation support (Alt+ArrowUp / Alt+ArrowDown) and focus-tracking fallback.
 *
 * Lead: Member 1 (Frontend & CSS Accessibility Engine Lead)
 */

import { useEffect, useRef, useCallback } from 'react';

export function useFocusMask({
  enabled = false,
  focusType = 'spotlight',
  containerRef = null,
  onToggle = null
}) {
  const rafId = useRef(null);
  const targetCoords = useRef({ x: window.innerWidth / 2, y: window.innerHeight * 0.4 });
  const currentCoords = useRef({ x: window.innerWidth / 2, y: window.innerHeight * 0.4 });
  const isReducedMotion = useRef(false);

  // Check reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    isReducedMotion.current = mediaQuery.matches;

    const listener = (e) => {
      isReducedMotion.current = e.matches;
    };
    mediaQuery.addEventListener('change', listener);
    return () => mediaQuery.removeEventListener('change', listener);
  }, []);

  // Update DOM styles directly via RAF
  const updatePosition = useCallback(() => {
    if (!enabled) return;

    if (isReducedMotion.current) {
      // Immediate jump without interpolation if reduced motion is requested
      currentCoords.current = { ...targetCoords.current };
    } else {
      // Smooth linear interpolation (lerp)
      const dx = targetCoords.current.x - currentCoords.current.x;
      const dy = targetCoords.current.y - currentCoords.current.y;
      currentCoords.current.x += dx * 0.25;
      currentCoords.current.y += dy * 0.25;
    }

    const root = document.documentElement;
    root.style.setProperty('--focus-x', `${Math.round(currentCoords.current.x)}px`);
    root.style.setProperty('--focus-y', `${Math.round(currentCoords.current.y)}px`);

    rafId.current = requestAnimationFrame(updatePosition);
  }, [enabled]);

  useEffect(() => {
    if (!enabled) {
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
        rafId.current = null;
      }
      return;
    }

    // Start RAF loop
    rafId.current = requestAnimationFrame(updatePosition);

    // 1. Mouse pointer tracking
    const handlePointerMove = (e) => {
      targetCoords.current.x = e.clientX;
      targetCoords.current.y = e.clientY;
    };

    // 2. Touch screen tracking
    const handleTouchMove = (e) => {
      if (e.touches && e.touches.length > 0) {
        targetCoords.current.x = e.touches[0].clientX;
        targetCoords.current.y = e.touches[0].clientY;
      }
    };

    // 3. Keyboard fallback navigation:
    // Alt + Up / Alt + Down moves the focus spotlight / reading ruler by 40px increments
    // Alt + F toggles the focus mode
    const handleKeyDown = (e) => {
      if (e.altKey && (e.key === 'f' || e.key === 'F')) {
        e.preventDefault();
        if (onToggle) onToggle();
        return;
      }

      if (e.altKey && e.key === 'ArrowDown') {
        e.preventDefault();
        targetCoords.current.y = Math.min(window.innerHeight - 50, targetCoords.current.y + 50);
      } else if (e.altKey && e.key === 'ArrowUp') {
        e.preventDefault();
        targetCoords.current.y = Math.max(50, targetCoords.current.y - 50);
      }
    };

    // 4. Focus follow for keyboard users (Tab navigation)
    const handleFocusIn = (e) => {
      if (e.target && e.target.getBoundingClientRect) {
        const rect = e.target.getBoundingClientRect();
        targetCoords.current.x = rect.left + rect.width / 2;
        targetCoords.current.y = rect.top + rect.height / 2;
      }
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchstart', handleTouchMove, { passive: true });
    window.addEventListener('keydown', handleKeyDown);
    document.addEventListener('focusin', handleFocusIn, { passive: true });

    return () => {
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchstart', handleTouchMove);
      window.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('focusin', handleFocusIn);
    };
  }, [enabled, updatePosition, onToggle]);

  return {
    targetCoords,
    currentCoords
  };
}
