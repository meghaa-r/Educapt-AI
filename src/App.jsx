
import React, { useState, useEffect } from 'react';
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
import MindMapPanel from './components/MindMapPanel/MindMapPanel';
import styles from './App.module.css';

const SAMPLE_MINDMAP_DATA = {
  'doc-photosynthesis': {
    nodes: [
      { id: 'n1', label: 'Solar Photons', x: 180, y: 80, type: 'source' },
      { id: 'n2', label: 'Chloroplast', x: 400, y: 150, type: 'core' },
      { id: 'n3', label: 'Thylakoid Membrane', x: 220, y: 260, type: 'component' },
      { id: 'n4', label: 'Light Reactions', x: 220, y: 350, type: 'process' },
      { id: 'n5', label: 'Calvin Cycle (Stroma)', x: 580, y: 260, type: 'process' },
      { id: 'n6', label: 'Glucose & Oxygen', x: 580, y: 350, type: 'output' },
    ],
    edges: [
      { id: 'e1', source: 'n1', target: 'n2', label: 'powers' },
      { id: 'e2', source: 'n2', target: 'n3', label: 'houses' },
      { id: 'e3', source: 'n3', target: 'n4', label: 'executes' },
      { id: 'e4', source: 'n2', target: 'n5', label: 'contains' },
      { id: 'e5', source: 'n4', target: 'n5', label: 'ATP & NADPH' },
      { id: 'e6', source: 'n5', target: 'n6', label: 'yields' },
    ],
  },
};

function formatApiDocument(doc) {
  const content = doc.content || '';

  const paragraphs = content
    .split(/\n\s*\n|\r?\n/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);

  const wordCount = content.trim()
    ? content.trim().split(/\s+/).length
    : 0;

  return {
    ...doc,
    subject: 'Uploaded Document',
    gradeLevel: 'Your Library',
    subtitle: doc.filename || doc.title,
    readTimeMinutes: Math.max(1, Math.ceil(wordCount / 200)),
    wordCount,
    summary: content
      ? content.slice(0, 240) + (content.length > 240 ? '...' : '')
      : 'Select this document to load its content.',
    sections: [
      {
        id: 'document-content',
        heading: 'Document Text',
        paragraphs: paragraphs.length
          ? paragraphs
          : ['No readable text is available.'],
      },
    ],
  };
}

function EducaptApp() {
  const { liveAnnouncement } = useAccessibilitySettings();

  const [activeView, setActiveView] = useState('reader');
  const [currentDocId, setCurrentDocId] = useState(SAMPLE_DOCUMENTS[0].id);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [documents, setDocuments] = useState(SAMPLE_DOCUMENTS);
  const [currentDoc, setCurrentDoc] = useState(SAMPLE_DOCUMENTS[0]);

  useEffect(() => {
    let cancelled = false;

    async function loadDocuments() {
      try {
        const apiDocuments = await getDocuments();

        if (cancelled) return;

        if (apiDocuments.length === 0) {
          setDocuments(SAMPLE_DOCUMENTS);
          return;
        }

        setDocuments(
          apiDocuments.map((doc) => formatApiDocument(doc))
        );

        const firstDocument = apiDocuments[0];
        setCurrentDocId(firstDocument.id);

        const details = await getDocument(firstDocument.id);

        if (!cancelled) {
          setCurrentDoc(formatApiDocument(details));
        }
      } catch (error) {
        console.error('Could not load backend documents:', error);

        if (!cancelled) {
          setDocuments(SAMPLE_DOCUMENTS);
        }
      }
    }

    loadDocuments();

    return () => {
      cancelled = true;
    };
  }, []);

  async function handleSelectDocument(id) {
    setCurrentDocId(id);
    setActiveView('reader');

    const sampleDocument = SAMPLE_DOCUMENTS.find(
      (doc) => doc.id === id
    );

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

  const mindMapData = SAMPLE_MINDMAP_DATA[currentDocId] || {
    nodes: [],
    edges: [],
  };

  return (
    <div className={styles.appShell}>
      <a href="#reader-content" className="skip-link">
        Skip to reading content
      </a>

      <div
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      >
        {liveAnnouncement}
      </div>

      <Sidebar
        activeView={activeView}
        onSelectView={setActiveView}
        documents={documents}
        currentDocId={currentDocId}
        onSelectDocument={handleSelectDocument}
        onOpenSettings={() => setIsSettingsOpen(true)}
      />

      <div className={styles.mainContentArea}>
        {activeView === 'home' && (
          <HomeView
            documents={documents}
            onSelectDocument={handleSelectDocument}
            onOpenSettings={() => setIsSettingsOpen(true)}
            onStartReading={() => setActiveView('reader')}
          />
        )}

        {activeView === 'documents' && (
          <DocumentsView
            documents={documents}
            onSelectDocument={handleSelectDocument}
            onOpenMindMap={(id) => {
              setCurrentDocId(id);
              setActiveView('mindmap');
            }}
          />
        )}

        {activeView === 'reader' && (
          <DocumentViewer document={currentDoc} />
        )}

        {activeView === 'mindmap' && (
          <MindMapPanel
            nodes={mindMapData.nodes}
            edges={mindMapData.edges}
            documentTitle={currentDoc?.title || 'Document'}
            onNodeClick={(node) => {
              console.log('Mind map node selected:', node.label);
            }}
          />
        )}
      </div>

      <FloatingToolbar
        onOpenSettings={() => setIsSettingsOpen(true)}
      />

      <FocusMask />

      <AccessibilitySettings
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
      />
    </div>
  );
}

export default function App() {
  return (
    <AccessibilityProvider>
      <EducaptApp />
    </AccessibilityProvider>
  );
}
