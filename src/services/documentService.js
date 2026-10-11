/**
 * EDUCAPT AI — DOCUMENT SERVICE ABSTRACTION
 * Service layer decoupling document presentation from data retrieval.
 *
 * BACKEND INTEGRATION BOUNDARY (For Member 4 - FastAPI & MongoDB):
 * When FastAPI backend endpoints are live, Member 4 can seamlessly replace
 * these simulated asynchronous methods with `fetch('/api/documents')` and
 * `fetch(`/api/documents/${id}`)`.
 *
 * Current Phase: Pure client-side mock provider using `SAMPLE_DOCUMENTS`.
 */

import { SAMPLE_DOCUMENTS } from '../data/sampleDocuments';

const STORAGE_KEY_PROGRESS = 'educapt_reading_progress_v1';

/**
 * Retrieve list of all available reading documents (summary metadata)
 * @returns {Promise<Array<Object>>}
 */
export async function getDocuments() {
  // Simulating async network boundary
  return Promise.resolve(
    SAMPLE_DOCUMENTS.map(({ id, title, subtitle, subject, gradeLevel, readTimeMinutes, wordCount, summary }) => ({
      id,
      title,
      subtitle,
      subject,
      gradeLevel,
      readTimeMinutes,
      wordCount,
      summary
    }))
  );
}

/**
 * Retrieve a specific document by its unique ID
 * @param {string} id - Document ID
 * @returns {Promise<Object|null>}
 */
export async function getDocumentById(id) {
  const doc = SAMPLE_DOCUMENTS.find(item => item.id === id);
  return Promise.resolve(doc ? { ...doc } : null);
}

/**
 * Safe local retrieval of reader progress for a document
 * @param {string} docId - Document ID
 * @returns {number} Progress percentage 0–100
 */
export function getSavedProgress(docId) {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_PROGRESS);
    if (!raw) return 0;
    const map = JSON.parse(raw);
    return typeof map[docId] === 'number' ? Math.min(100, Math.max(0, map[docId])) : 0;
  } catch (err) {
    console.warn('[Educapt DocumentService] Could not read saved reading progress:', err);
    return 0;
  }
}

/**
 * Safe local storage of reader progress for a document
 * @param {string} docId - Document ID
 * @param {number} progress - Progress percentage 0–100
 */
export function saveProgress(docId, progress) {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_PROGRESS);
    const map = raw ? JSON.parse(raw) : {};
    map[docId] = Math.round(Math.min(100, Math.max(0, progress)));
    localStorage.setItem(STORAGE_KEY_PROGRESS, JSON.stringify(map));
  } catch (err) {
    console.warn('[Educapt DocumentService] Could not persist reading progress:', err);
  }
}
