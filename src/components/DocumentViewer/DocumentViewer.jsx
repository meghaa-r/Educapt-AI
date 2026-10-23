import React, { useState, useEffect, useRef } from 'react';
import { useAccessibilitySettings } from '../../hooks/useAccessibilitySettings';
import { getSavedProgress, saveProgress } from '../../services/documentService';
import styles from './DocumentViewer.module.css';

export function DocumentViewer({ document: doc }) {
  const { settings } = useAccessibilitySettings();
  const [readProgress, setReadProgress] = useState(0);
  const [isBionicEnabled, setIsBionicEnabled] = useState(false);
  
  // Audio Reader State
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [activeWordIndex, setActiveWordIndex] = useState(null);

  // Selection & AI Chat Drawer State
  const [selectedText, setSelectedText] = useState('');
  const [selectionPopupPos, setSelectionPopupPos] = useState(null);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  const [chatInput, setChatInput] = useState('');
  const [isAiLoading, setIsAiLoading] = useState(false);

  const articleRef = useRef(null);
  const chatBottomRef = useRef(null);

  // Reset reader & set initial greeting on doc change
  useEffect(() => {
    if (!doc) return;
    const saved = getSavedProgress(doc.id);
    setReadProgress(saved);
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsSpeaking(false);
    setActiveWordIndex(null);
    
    setChatMessages([
      { 
        role: 'assistant', 
        content: `Hello! I'm your Educapt AI Tutor. Highlight any section in "${doc.title}" to simplify it, or ask me questions directly!` 
      }
    ]);
  }, [doc]);

  // Clean up speech synthesis on unmount
  useEffect(() => {
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  // Auto-scroll chat drawer to latest message
  useEffect(() => {
    if (isChatOpen && chatBottomRef.current) {
      chatBottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatMessages, isAiLoading, isChatOpen]);

  // Scroll tracking progress
  useEffect(() => {
    const handleScroll = () => {
      if (!articleRef.current) return;
      const rect = articleRef.current.getBoundingClientRect();
      const totalHeight = rect.height - window.innerHeight;
      if (totalHeight <= 0) {
        setReadProgress(100);
        return;
      }
      const scrolled = -rect.top;
      const progress = Math.min(100, Math.max(0, Math.round((scrolled / totalHeight) * 100)));
      setReadProgress(progress);
      if (doc?.id) saveProgress(doc.id, progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [doc]);

  // Handle text selection on the article
  const handleMouseUp = () => {
    const selection = window.getSelection();
    const text = selection.toString().trim();
    if (text.length > 5) {
      setSelectedText(text);
      const range = selection.getRangeAt(0);
      const rect = range.getBoundingClientRect();
      setSelectionPopupPos({
        top: rect.bottom + window.scrollY + 8,
        left: rect.left + window.scrollX + (rect.width / 2) - 90
      });
    } else {
      setSelectionPopupPos(null);
    }
  };

  // Open Chat Drawer with Selected Text
  const handleOpenAiChatWithSelection = async () => {
    setIsChatOpen(true);
    setSelectionPopupPos(null);
    const initialQuery = `Please explain this selected text in simple bullet points:\n\n"${selectedText}"`;
    
    const newMsgHistory = [...chatMessages, { role: 'user', content: initialQuery }];
    setChatMessages(newMsgHistory);
    setIsAiLoading(true);

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://127.0.0.1:8000/api/ai/simplify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token ? `Bearer ${token}` : ''
        },
        body: JSON.stringify({ text: initialQuery })
      });

      if (!response.ok) throw new Error('AI request failed');
      const data = await response.json();
      const reply = data.simplified_text || data.response || "Here is the simplified summary.";
      setChatMessages([...newMsgHistory, { role: 'assistant', content: reply }]);
    } catch (err) {
      console.error(err);
      setChatMessages([...newMsgHistory, { role: 'assistant', content: '⚠️ Could not reach AI Assistant. Please verify backend server is active.' }]);
    } finally {
      setIsAiLoading(false);
    }
  };

  // Send Follow-up Message in Chat
  const handleSendChatMessage = async (e) => {
    e.preventDefault();
    if (!chatInput.trim() || isAiLoading) return;

    const userMsg = chatInput.trim();
    setChatInput('');
    const updatedHistory = [...chatMessages, { role: 'user', content: userMsg }];
    setChatMessages(updatedHistory);
    setIsAiLoading(true);

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://127.0.0.1:8000/api/ai/simplify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token ? `Bearer ${token}` : ''
        },
        body: JSON.stringify({ text: userMsg })
      });

      if (!response.ok) throw new Error('AI request failed');
      const data = await response.json();
      const reply = data.simplified_text || data.response || "Got it.";
      setChatMessages([...updatedHistory, { role: 'assistant', content: reply }]);
    } catch (err) {
      setChatMessages([...updatedHistory, { role: 'assistant', content: '⚠️ Connection error. Please check your network connection.' }]);
    } finally {
      setIsAiLoading(false);
    }
  };

  const allWords = doc?.sections 
    ? doc.sections.flatMap(s => s.paragraphs.flatMap(p => p.trim().split(/\s+/))) 
    : [];

  const formatBionicText = (text, globalWordOffset = 0) => {
    let wordCounter = globalWordOffset;
    return text.split(/\s+/).map((word, wIdx) => {
      const currentIndex = wordCounter++;
      const isHighlighted = isSpeaking && activeWordIndex === currentIndex;
      const mid = Math.ceil(word.length / 2);
      return (
        <span
          key={wIdx}
          className={isHighlighted ? styles.highlightedWord : undefined}
        >
          {isBionicEnabled ? (
            <><strong>{word.slice(0, mid)}</strong>{word.slice(mid)}{' '}</>
          ) : (
            <>{word}{' '}</>
          )}
        </span>
      );
    });
  };

  const handleToggleSpeech = () => {
    if (!('speechSynthesis' in window)) return;
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      setActiveWordIndex(null);
    } else {
      const fullText = allWords.join(' ');
      const utterance = new SpeechSynthesisUtterance(fullText);
      utterance.rate = 0.85;

      utterance.onboundary = (event) => {
        if (event.name === 'word') {
          const textSoFar = fullText.substring(0, event.charIndex);
          const currentWordCount = textSoFar.trim() ? textSoFar.trim().split(/\s+/).length : 0;
          setActiveWordIndex(currentWordCount);
        }
      };

      utterance.onend = () => { 
        setIsSpeaking(false); 
        setActiveWordIndex(null); 
      };

      utterance.onerror = () => {
        setIsSpeaking(false);
        setActiveWordIndex(null);
      };

      window.speechSynthesis.speak(utterance);
      setIsSpeaking(true);
    }
  };

  if (!doc) {
    return (
      <main className={styles.viewerContainer} tabIndex="-1">
        <div className={styles.emptyState}>
          <p>No document selected. Please choose one from your library.</p>
        </div>
      </main>
    );
  }

  let globalWordCounter = 0;

  return (
    <main className={styles.viewerContainer} id="reader-content" tabIndex="-1" onMouseUp={handleMouseUp} aria-label="Reading content area">
      {/* Top Reading Progress Bar */}
      <div className={styles.progressBarWrapper} role="progressbar" aria-valuenow={readProgress}>
        <div className={styles.progressBarFill} style={{ width: `${readProgress}%` }} />
      </div>

      {/* Clean Document Header */}
      <header className={styles.docHeader}>
        <div className={styles.headerInner}>
          <div className={styles.metadataRow}>
            <span className={styles.subjectBadge}>{doc.subject}</span>
            <span>•</span>
            <span>⏱ {doc.readTimeMinutes} min read</span>
            <span>•</span>
            <span>Progress: {readProgress}%</span>
          </div>

          <h1 className={styles.docTitle}>{doc.title}</h1>
          <p className={styles.docSubtitle}>{doc.subtitle}</p>

          {/* Action Toolbar */}
          <div className={styles.headerToolbar}>
            <button
              onClick={() => setIsBionicEnabled(!isBionicEnabled)}
              className={`${styles.toolBtn} ${isBionicEnabled ? styles.toolBtnActive : ''}`}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
              </svg>
              <span>{isBionicEnabled ? 'Bionic Reading: ON' : 'Bionic Reading'}</span>
            </button>

            <button
              onClick={handleToggleSpeech}
              className={`${styles.toolBtn} ${isSpeaking ? styles.toolBtnSpeaking : ''}`}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
              </svg>
              <span>{isSpeaking ? 'Stop Audio Reader' : 'Listen with Karaoke Highlight'}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Floating Text Selection Popup */}
      {selectionPopupPos && (
        <div 
          className={styles.selectionTooltip}
          style={{
            top: selectionPopupPos.top,
            left: selectionPopupPos.left,
          }}
        >
          <button
            onClick={() => handleOpenAiChatWithSelection()}
            className={styles.tooltipBtn}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
            </svg>
            Simplify Selection with AI
          </button>
        </div>
      )}

      {/* Main Article Reader Body */}
      <div className={styles.articleWrapper} ref={articleRef}>
        <article className={styles.articleBody}>
          {doc.sections.map((sec) => (
            <section key={sec.id}>
              <h2 className={styles.sectionTitle}>{sec.heading}</h2>
              {sec.paragraphs.map((para, pIdx) => {
                const formatted = formatBionicText(para, globalWordCounter);
                globalWordCounter += para.trim().split(/\s+/).length;
                return (
                  <p key={pIdx} className={styles.paragraph}>
                    {formatted}
                  </p>
                );
              })}
            </section>
          ))}
        </article>
      </div>

      {/* Professional Floating Robot Avatar Trigger Button */}
      {!isChatOpen && (
        <button
          onClick={() => setIsChatOpen(true)}
          className={styles.chatTriggerBtn}
          title="Open Educapt AI Tutor"
          aria-label="Open AI Assistant"
        >
          <span role="img" aria-label="Robot AI" style={{ fontSize: '1.75rem', lineHeight: 1 }}>🤖</span>
        </button>
      )}

      {/* Professional AI Chat Slide-Over Drawer */}
      {isChatOpen && (
        <aside className={styles.chatDrawer} aria-label="Educapt AI Assistant Drawer">
          <header className={styles.drawerHeader}>
            <div className={styles.drawerHeaderTitleGroup}>
              <div className={styles.aiBadgeIcon}>
                <span role="img" aria-label="Robot AI" style={{ fontSize: '1.25rem', lineHeight: 1 }}>🤖</span>
              </div>
              <div>
                <h3 className={styles.drawerTitle}>Educapt AI Tutor</h3>
                <span className={styles.drawerSubtitle}>Active Reading Assistant</span>
              </div>
            </div>
            <button 
              onClick={() => setIsChatOpen(false)} 
              className={styles.closeBtn}
              title="Close Assistant"
            >
              ✕
            </button>
          </header>

          {/* Messages Container */}
          <div className={styles.messagesContainer}>
            {chatMessages.map((msg, idx) => (
              <div 
                key={idx} 
                className={msg.role === 'user' ? styles.userBubble : styles.assistantBubble}
              >
                <p>{msg.content}</p>
              </div>
            ))}
            {isAiLoading && (
              <div className={styles.thinkingBubble}>
                <span className={styles.pulseDot} />
                <span>Educapt AI is analyzing...</span>
              </div>
            )}
            <div ref={chatBottomRef} />
          </div>

          {/* Input Form */}
          <form onSubmit={handleSendChatMessage} className={styles.inputForm}>
            <div className={styles.inputWrapper}>
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="Ask a question or request simplification..."
                className={styles.chatInput}
              />
              <button type="submit" className={styles.sendBtn} disabled={isAiLoading || !chatInput.trim()}>
                Send
              </button>
            </div>
          </form>
        </aside>
      )}
    </main>
  );
}

export default DocumentViewer;