import React, { useRef, useState } from 'react';
import { getSavedProgress } from '../../services/documentService';
import styles from './DocumentsView.module.css';

export function DocumentsView({
  documents = [],
  onSelectDocument,
  onDocumentUploaded,
  onDocumentDeleted // Added to support deletion refresh
}) {
  const fileInputRef = useRef(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(null);

  // Trigger hidden file input
  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  // Handle file upload
  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const ext = file.name.split('.').pop().toLowerCase();
    if (ext !== 'pdf' && ext !== 'docx') {
      alert("Please upload a PDF or DOCX file.");
      return;
    }

    setIsUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const token = localStorage.getItem("token"); 
      const response = await fetch("http://127.0.0.1:8000/api/documents/upload", {
        method: "POST",
        headers: { "Authorization": `Bearer ${token}` },
        body: formData,
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Upload failed");
      }
      
      const newDoc = await response.json();
      if (onDocumentUploaded) onDocumentUploaded();
      onSelectDocument(newDoc.id); 
    } catch (err) {
      console.error("Error uploading document:", err);
      alert(err.message || "Could not process file upload.");
    } finally {
      setIsUploading(false);
      event.target.value = ""; 
    }
  };

  // Handle document deletion
  const handleDelete = async (e, id, title) => {
    e.stopPropagation(); // Prevent opening the document
    if (!window.confirm(`Are you sure you want to permanently delete "${title}"?`)) return;
    
    setIsDeleting(id);
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://127.0.0.1:8000/api/documents/${id}`, {
        method: "DELETE",
        headers: { "Authorization": `Bearer ${token}` }
      });

      if (!response.ok) throw new Error("Failed to delete document");
      if (onDocumentDeleted) onDocumentDeleted();
    } catch (err) {
      console.error("Delete error:", err);
      alert("Could not delete the document. Please try again.");
    } finally {
      setIsDeleting(null);
    }
  };

  return (
    <div className={styles.libraryWrapper} role="region" aria-label="Curriculum Documents Library">
      
      {/* Sleek Header Section */}
      <header className={styles.headerSection}>
        <div className={styles.headerContent}>
          <div>
            <div className={styles.headerBadge}>
              <span className={styles.pulseDot} /> Library Management
            </div>
            <h1 className={styles.title}>My Documents</h1>
            <p className={styles.subtitle}>
              Upload PDF and DOCX files to generate accessible reading workspaces.
            </p>
          </div>

          <input 
            type="file" 
            accept=".pdf,.docx" 
            ref={fileInputRef} 
            style={{ display: 'none' }} 
            onChange={handleFileChange}
          />
          
          <button 
            onClick={handleUploadClick}
            className={styles.uploadBtn} 
            disabled={isUploading}
            aria-busy={isUploading}
          >
            {isUploading ? (
              <>
                <svg className={styles.spinner} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="12" y1="2" x2="12" y2="6"></line>
                  <line x1="12" y1="18" x2="12" y2="22"></line>
                  <line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line>
                  <line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line>
                  <line x1="2" y1="12" x2="6" y2="12"></line>
                  <line x1="18" y1="12" x2="22" y2="12"></line>
                  <line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line>
                  <line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line>
                </svg>
                <span>Processing...</span>
              </>
            ) : (
              <>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="17 8 12 3 7 8" />
                  <line x1="12" y1="3" x2="12" y2="15" />
                </svg>
                <span>Upload Document</span>
              </>
            )}
          </button>
        </div>
      </header>

      {/* Document List */}
      {documents.length === 0 ? (
        <div className={styles.emptyState}>
          <div className={styles.emptyIcon}>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="12" y1="18" x2="12" y2="12" />
              <line x1="9" y1="15" x2="15" y2="15" />
            </svg>
          </div>
          <h3>No documents found</h3>
          <p>Your library is empty. Upload a PDF or DOCX file to begin.</p>
        </div>
      ) : (
        <div className={styles.docList} role="feed" aria-label="Available reading documents">
          {documents.map((doc) => {
            const progress = getSavedProgress(doc.id);
            const isDocDeleting = isDeleting === doc.id;

            return (
              <article 
                key={doc.id} 
                className={`${styles.docRow} ${isDocDeleting ? styles.fadingOut : ''}`} 
                aria-labelledby={`title-${doc.id}`}
                onClick={() => onSelectDocument(doc.id)}
              >
                <div className={styles.rowMain}>
                  <div className={styles.docMeta}>
                    <span className={styles.subjectPill}>{doc.file_type ? doc.file_type.toUpperCase() : doc.subject}</span>
                    <span>•</span>
                    <span>{doc.gradeLevel || 'Library'}</span>
                    <span>•</span>
                    <span>⏱ {Math.max(1, Math.floor((doc.content?.split(' ').length || 1000) / 200))} min read</span>
                  </div>
                  
                  <h2 id={`title-${doc.id}`} className={styles.rowTitle}>
                    {doc.title}
                  </h2>
                  <p className={styles.rowAbstract}>{doc.summary || "Custom uploaded document."}</p>
                  
                  {/* Visual Progress Bar */}
                  <div className={styles.progressContainer}>
                    <div className={styles.progressLabel}>
                      <span>Reading Progress</span>
                      <span>{progress}%</span>
                    </div>
                    <div className={styles.progressTrack}>
                      <div className={styles.progressBar} style={{ width: `${progress}%` }} />
                    </div>
                  </div>
                </div>

                <div className={styles.rowActions}>
                  <button
                    type="button"
                    onClick={(e) => handleDelete(e, doc.id, doc.title)}
                    className={styles.deleteBtn}
                    title="Delete Document"
                    disabled={isDocDeleting}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="3 6 5 6 21 6" />
                      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                    </svg>
                  </button>

                  <button
                    type="button"
                    className={styles.openBtn}
                    aria-label={`Open and read ${doc.title}`}
                  >
                    <span>Read</span>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default DocumentsView;