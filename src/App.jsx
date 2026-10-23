import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { AccessibilityProvider } from './contexts/AccessibilityContext';
import { useAccessibilitySettings } from './hooks/useAccessibilitySettings';
import { SAMPLE_DOCUMENTS } from './data/sampleDocuments';
import { getDocuments, getDocument } from './services/documentService';

import Sidebar from './components/Sidebar/Sidebar';
import DocumentViewer from './components/DocumentViewer/DocumentViewer';
import FloatingToolbar from './components/FloatingToolbar/FloatingToolbar';
import AccessibilitySettings from './components/AccessibilitySettings/AccessibilitySettings';
import FocusMask from './components/FocusMask/FocusMask';
import HomeView from './components/HomeView/HomeView';
import DocumentsView from './components/DocumentsView/DocumentsView';
import AuthView from './components/AuthView/AuthView';
import styles from './App.module.css';

// Helper: Format raw document payload for reader UI
function formatApiDocument(doc) {
  const content = doc.content || '';
  const paragraphs = content.split(/\n\s*\n|\r?\n/).map(p => p.trim()).filter(Boolean);
  const wordCount = content.trim() ? content.trim().split(/\s+/).length : 0;

  return {
    ...doc,
    subject: doc.file_type ? doc.file_type.toUpperCase() : 'Uploaded Document',
    gradeLevel: 'Your Library',
    subtitle: doc.filename || doc.title,
    readTimeMinutes: Math.max(1, Math.ceil(wordCount / 200)),
    wordCount,
    summary: content ? content.slice(0, 240) + (content.length > 240 ? '...' : '') : 'Select this document to load its content.',
    sections: [{ id: 'document-content', heading: 'Document Text', paragraphs: paragraphs.length ? paragraphs : ['No readable text is available.'] }],
  };
}

// Helper: Strict JWT Expiration & Validity Checker
function isTokenValid(token) {
  if (!token || token === 'null' || token === 'undefined' || !token.trim()) {
    return false;
  }
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return false;
    
    const payload = JSON.parse(atob(parts[1].replace(/-/g, '+').replace(/_/g, '/')));
    if (payload.exp && payload.exp * 1000 < Date.now()) {
      return false; // Token expired
    }
    return true;
  } catch (err) {
    return false; // Corrupted
  }
}

// --- MAIN APPLICATION INTERIOR ---
function EducaptApp({ onLogout }) {
  const { liveAnnouncement } = useAccessibilitySettings();
  const navigate = useNavigate();
  const location = useLocation();

  const [currentDocId, setCurrentDocId] = useState(SAMPLE_DOCUMENTS[0].id);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [documents, setDocuments] = useState(SAMPLE_DOCUMENTS);
  const [currentDoc, setCurrentDoc] = useState(SAMPLE_DOCUMENTS[0]);

  const currentPath = location.pathname.replace('/', '');
  const activeView = currentPath || 'home';

  const refreshDocuments = async () => {
    try {
      const apiDocuments = await getDocuments();
      if (apiDocuments && apiDocuments.length > 0) {
        setDocuments(apiDocuments.map((doc) => formatApiDocument(doc)));
      }
    } catch (error) {
      console.error('Could not refresh backend documents:', error);
    }
  };

  useEffect(() => {
    let cancelled = false;
    async function loadDocuments() {
      try {
        const apiDocuments = await getDocuments();
        if (cancelled) return;
        if (!apiDocuments || apiDocuments.length === 0) return;

        setDocuments(apiDocuments.map((doc) => formatApiDocument(doc)));
        setCurrentDocId(apiDocuments[0].id);
        const details = await getDocument(apiDocuments[0].id);
        if (!cancelled) setCurrentDoc(formatApiDocument(details));
      } catch (error) {
        console.error('Could not load backend documents:', error);
      }
    }
    loadDocuments();
    return () => { cancelled = true; };
  }, []);

  async function handleSelectDocument(id) {
    setCurrentDocId(id);
    navigate('/reader');

    const sampleDocument = SAMPLE_DOCUMENTS.find(doc => doc.id === id);
    if (sampleDocument) {
      setCurrentDoc(sampleDocument);
      return;
    }
    try {
      const details = await getDocument(id);
      setCurrentDoc(formatApiDocument(details));
    } catch (error) {
      console.error('Could not open document:', error);
    }
  }

  return (
    <div className={styles.appShell}>
      <a href="#reader-content" className="skip-link">Skip to reading content</a>
      <div role="status" aria-live="polite" aria-atomic="true" className="sr-only">{liveAnnouncement}</div>

      <Sidebar
        activeView={activeView}
        onSelectView={(view) => navigate(`/${view}`)}
        documents={documents}
        currentDocId={currentDocId}
        onSelectDocument={handleSelectDocument}
        onOpenSettings={() => setIsSettingsOpen(true)}
        onLogout={onLogout}
      />

      <div className={styles.mainContentArea}>
        <Routes>
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="/home" element={
            <HomeView
              documents={documents}
              lastReadDocument={currentDoc}
              onSelectDocument={handleSelectDocument}
              onOpenSettings={() => setIsSettingsOpen(true)}
              onStartReading={() => navigate('/reader')}
            />
          } />
          <Route path="/documents" element={
            <DocumentsView
              documents={documents}
              onSelectDocument={handleSelectDocument}
              onDocumentUploaded={refreshDocuments}
              onDocumentDeleted={refreshDocuments}
            />
          } />
          <Route path="/reader" element={<DocumentViewer document={currentDoc} />} />
        </Routes>
      </div>

      <FloatingToolbar onOpenSettings={() => setIsSettingsOpen(true)} />
      <FocusMask />
      <AccessibilitySettings isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />
    </div>
  );
}

// --- GATEKEEPER ---
function MainGatekeeper() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    
    // Strict validation check
    if (isTokenValid(token)) {
      setIsAuthenticated(true);
    } else {
      localStorage.removeItem('token'); // Clear stale/invalid tokens
      setIsAuthenticated(false);
    }
    setIsChecking(false);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
  };

  if (isChecking) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: 'var(--bg-reader, #f9fafb)' }}>
        Loading...
      </div>
    );
  }

  if (!isAuthenticated) {
    return <AuthView onAuthSuccess={() => setIsAuthenticated(true)} />;
  }

  return <EducaptApp onLogout={handleLogout} />;
}

export default function App() {
  return (
    <Router>
      <AccessibilityProvider>
        <MainGatekeeper />
      </AccessibilityProvider>
    </Router>
  );
}