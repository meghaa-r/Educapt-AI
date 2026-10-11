/**
 * EDUCAPT AI — APPLICATION ROOT
 * Adaptive digital reading workspace for neurodivergent learners.
 * Lead: Member 1 (Frontend & CSS Accessibility Engine Lead)
 */

import React, { useState, useEffect } from 'react';
import { AccessibilityProvider } from './contexts/AccessibilityContext';
import { useAccessibilitySettings } from './hooks/useAccessibilitySettings';
import { SAMPLE_DOCUMENTS } from './data/sampleDocuments';
import Sidebar from './components/Sidebar/Sidebar';
import DocumentViewer from './components/DocumentViewer/DocumentViewer';
import FloatingToolbar from './components/FloatingToolbar/FloatingToolbar';
import AccessibilitySettings from './components/AccessibilitySettings/AccessibilitySettings';
import FocusMask from './components/FocusMask/FocusMask';
import HomeView from './components/HomeView/HomeView';
import DocumentsView from './components/DocumentsView/DocumentsView';
import MindMapPanel from './components/MindMapPanel/MindMapPanel';
import styles from './App.module.css';

// Sample mind map node structure for Photosynthesis (Member 2 integration demonstration)
const SAMPLE_MINDMAP_DATA = {
  'doc-photosynthesis': {
    nodes: [
      { id: 'n1', label: 'Solar Photons', x: 180, y: 80, type: 'source' },
      { id: 'n2', label: 'Chloroplast', x: 400, y: 150, type: 'core' },
      { id: 'n3', label: 'Thylakoid Membrane', x: 220, y: 260, type: 'component' },
      { id: 'n4', label: 'Light Reactions', x: 220, y: 350, type: 'process' },
      { id: 'n5', label: 'Calvin Cycle (Stroma)', x: 580, y: 260, type: 'process' },
      { id: 'n6', label: 'Glucose & Oxygen', x: 580, y: 350, type: 'output' }
    ],
    edges: [
      { id: 'e1', source: 'n1', target: 'n2', label: 'powers' },
      { id: 'e2', source: 'n2', target: 'n3', label: 'houses' },
      { id: 'e3', source: 'n3', target: 'n4', label: 'executes' },
      { id: 'e4', source: 'n2', target: 'n5', label: 'contains' },
      { id: 'e5', source: 'n4', target: 'n5', label: 'ATP & NADPH' },
      { id: 'e6', source: 'n5', target: 'n6', label: 'yields' }
    ]
  }
};

function EducaptApp() {
  const { liveAnnouncement } = useAccessibilitySettings();
  const [activeView, setActiveView] = useState('reader'); // 'home' | 'documents' | 'reader' | 'mindmap'
  const [currentDocId, setCurrentDocId] = useState(SAMPLE_DOCUMENTS[0].id);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const currentDoc = SAMPLE_DOCUMENTS.find(d => d.id === currentDocId) || SAMPLE_DOCUMENTS[0];
  const mindMapData = SAMPLE_MINDMAP_DATA[currentDocId] || { nodes: [], edges: [] };

  return (
    <div className={styles.appShell}>
      {/* 1. WCAG 2.1 AA Skip-to-content Link */}
      <a href="#reader-content" className="skip-link">
        Skip to reading content
      </a>

      {/* 2. Screen-reader Live Announcements Region */}
      <div
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      >
        {liveAnnouncement}
      </div>

      {/* 3. Navigation Sidebar */}
      <Sidebar
        activeView={activeView}
        onSelectView={setActiveView}
        documents={SAMPLE_DOCUMENTS}
        currentDocId={currentDocId}
        onSelectDocument={(id) => {
          setCurrentDocId(id);
          setActiveView('reader');
        }}
        onOpenSettings={() => setIsSettingsOpen(true)}
      />

      {/* 4. Main Content Area */}
      <div className={styles.mainContentArea}>
        {activeView === 'home' && (
          <HomeView
            documents={SAMPLE_DOCUMENTS}
            onSelectDocument={(id) => {
              setCurrentDocId(id);
              setActiveView('reader');
            }}
            onOpenSettings={() => setIsSettingsOpen(true)}
            onStartReading={() => setActiveView('reader')}
          />
        )}

        {activeView === 'documents' && (
          <DocumentsView
            documents={SAMPLE_DOCUMENTS}
            onSelectDocument={(id) => {
              setCurrentDocId(id);
              setActiveView('reader');
            }}
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
            documentTitle={currentDoc.title}
            onNodeClick={(node) => {
              console.log('Mind map node selected:', node.label);
            }}
          />
        )}
      </div>

      {/* 5. Floating Accessibility Toolbar */}
      <FloatingToolbar
        onOpenSettings={() => setIsSettingsOpen(true)}
      />

      {/* 6. ADHD Focus Mask (Overlays document without blocking interaction) */}
      <FocusMask />

      {/* 7. Comprehensive Accessibility Settings Drawer */}
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
