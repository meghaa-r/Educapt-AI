# Educapt AI — Adaptive Reading Workspace
> **Reading that adapts to you.**  
> An accessible, distraction-free educational reading workspace engineered for neurodivergent students (Dyslexia, ADHD, Scotopic Sensitivity, Autism Spectrum) and diverse learning preferences.

---

## 1. Project Overview & Member Contribution

- **Role:** **Member 1: Frontend & CSS Accessibility Engine Lead**
- **Responsibilities:**
  - Application shell, responsive layout, and navigation architecture.
  - Semantic, curriculum-aligned educational document reader (`DocumentViewer`).
  - Centralized Accessibility Engine & State Context (`AccessibilityContext`).
  - Dyslexia Mode with custom typography metrics and fallback font stack.
  - ADHD Focus Mode with pointer-following spotlight and keyboard/touch reading rulers.
  - Dynamic 4-theme palette (Light, Dark, Warm, Low-Sensory) and independent WCAG AAA High-Contrast mode.
  - Floating accessibility quick-action toolbar (`FloatingToolbar`).
  - Comprehensive slide-out personalization drawer (`AccessibilitySettings`).
  - Integration boundaries for Member 2 (Mind Map Pipeline) and Member 4 (FastAPI/MongoDB).
  - Production-ready Vite build and WCAG 2.1 AA compliance audit.

---

## 2. Technology Stack

- **Framework:** React 19 (Functional components, Hooks: `useState`, `useEffect`, `useRef`, `useCallback`, `useContext`)
- **Build Tool:** Vite 8 (Client environment build with ES Modules)
- **Styling Architecture:** Standard CSS + CSS Modules (`*.module.css`) with CSS Custom Properties
- **Pointer & Focus Tracking:** Vanilla JavaScript pointer tracking via `requestAnimationFrame` with zero unnecessary React re-renders
- **Accessibility Standards:** WCAG 2.1 Level AA targeting Level AAA contrast in High-Contrast mode
- **Zero Third-Party UI Kits:** Strictly **no** Tailwind CSS, Bootstrap, Material UI, Chakra UI, or external UI component libraries

---

## 3. Features Implemented

### 📖 Semantic Document Reader (`DocumentViewer`)
- Renders curriculum-aligned educational articles (`<article>`, `<h1>`, `<h2>`, `<section>`, `<p>`, `<aside>`, `<dl>`, `<ul>`).
- Real-time reading progress indicator bar (`role="progressbar"` with `aria-valuenow`).
- Non-color-reliant active mode badges displaying current typography, focus, and theme state.
- Interactive definitions list (`<dl>`, `<dt>`, `<dd>`) for scientific vocabulary.
- Key-concept and reflection callout boxes.
- Responsive maximum reading width (`--reader-max-width: 72ch`) preventing ocular fatigue.

### 🔤 Dyslexia Typography Engine
- Dynamically applies research-backed typography properties:
  - **Letter spacing:** `0.12em` default in Dyslexia Mode (adjustable 0.00em – 0.25em).
  - **Word spacing:** `0.25em` default in Dyslexia Mode (adjustable 0.00em – 0.50em).
  - **Line height:** `1.8` default in Dyslexia Mode (adjustable 1.3x – 2.5x).
  - **Paragraph spacing:** `1.6rem` default in Dyslexia Mode (adjustable 0.8rem – 2.5rem).
  - **Font family:** `OpenDyslexic` with graceful fallback to `Lexend`, `Comic Sans MS`, `Verdana`, and system sans-serif.
- **Snapshot-Restore Logic:** Toggling Dyslexia Mode saves prior user typography preferences and immediately restores them when disabled, avoiding stale spacing values.
- Retains user-adjusted font size and active color themes without conflict.

### 🎯 ADHD Focus Mode (`FocusMask`)
- Cursor-following reading spotlight using CSS radial gradients and masks.
- Viewport-relative fixed positioning with `pointer-events: none` — **never** intercepts clicks, text selection, or scrolling.
- Updates coordinates directly on CSS custom properties (`--focus-x`, `--focus-y`) via `requestAnimationFrame` — **zero** React component re-renders while moving the pointer.
- **Adjustable Spotlight:** Configurable diameter (140px – 450px) and background dimming opacity (30% – 90%).
- **Alternative Focus Mode:** Horizontal **Reading Ruler** mode for learners who prefer a guided horizontal reading band.
- **Keyboard Fallback:** Keyboard users can press `Alt + ↑` and `Alt + ↓` to step the focus spotlight/ruler vertically, or press `Alt + F` to toggle focus mode anywhere. Automatically tracks focused elements during `Tab` navigation.
- **Touch Fallback:** Smoothly tracks `touchmove` coordinates on mobile devices.
- **Accessible Exit:** Screen-reader accessible exit badge with visible dismissal control.

### 🎨 Themes & High-Contrast Engine
- **Light Theme:** Fresh, calm slate and gentle sky blue accents (`#0284c7`).
- **Dark Theme:** Low-luminance charcoal slate (`#0b0f17`), reducing glare and eye strain.
- **Warm Reading Theme:** Soft sepia/parchment background (`#f5eedf`) with warm charcoal typography (`#2d241e`), specifically designed for photophobia and scotopic sensitivity (Meares-Irlen syndrome).
- **Low-Sensory Theme:** Muted sage/slate palette (`#edf1ee`) with softened contrast to minimize cognitive excitation.
- **High-Contrast Mode (Independent):** Provides pure WCAG AAA 7:1+ contrast (`#000000` / `#ffffff`), vivid yellow highlights (`#ffff00`), and distinct borders without resetting user typography or themes.

### 🎛️ Floating Accessibility Toolbar (`FloatingToolbar`)
- Positioned comfortably at the bottom-center of the reading pane.
- 8 Functional Controls:
  1. Dyslexia Mode toggle (`aria-pressed`).
  2. ADHD Focus Mode toggle (`aria-pressed`).
  3. High-Contrast toggle (`aria-pressed`).
  4. Theme selector (cycles through all 4 atmospheres).
  5. Font size decrease (`-2px`, minimum 14px).
  6. Font size increase (`+2px`, maximum 32px).
  7. Settings Drawer open button.
  8. Reset Accessibility Settings button.
- Minimizable into a compact floating pill so readers can completely clear their viewport.

### ⚙️ Accessibility Settings Drawer (`AccessibilitySettings`)
- Accessible modal drawer with backdrop dismissal, focus trap, and `Escape` key support.
- Native HTML form controls (`<input type="range">`, `<input type="checkbox">`, `<select>`) with explicit `<label>`, `id`, and dynamic `<output>` values.
- Categorized sections: Dedicated Reading Modes, Color & Contrast, and Typography Engine.
- Instant "Reset Defaults" action restoring documented baseline settings.

### 💾 Safe LocalStorage Preference Persistence
- Centralized in `AccessibilityContext.jsx`.
- Schema versioned key: `educapt_accessibility_preferences_v1`.
- Defensive validation clamps numerical ranges and enforces valid enumeration strings.
- Graceful error boundary fallback if `localStorage` is disabled or corrupted.

---

## 4. Project Directory Structure

```
c:\Users\happy\OneDrive\Documents\EduSpark\
├── public/
│   ├── fonts/
│   │   └── README.md                # Font asset instructions for OpenDyslexic
│   └── vite.svg
├── src/
│   ├── components/
│   │   ├── AccessibilitySettings/
│   │   │   ├── AccessibilitySettings.jsx
│   │   │   └── AccessibilitySettings.module.css
│   │   ├── DocumentViewer/
│   │   │   ├── DocumentViewer.jsx
│   │   │   └── DocumentViewer.module.css
│   │   ├── DocumentsView/
│   │   │   ├── DocumentsView.jsx
│   │   │   └── DocumentsView.module.css
│   │   ├── FloatingToolbar/
│   │   │   ├── FloatingToolbar.jsx
│   │   │   └── FloatingToolbar.module.css
│   │   ├── FocusMask/
│   │   │   ├── FocusMask.jsx
│   │   │   └── FocusMask.module.css
│   │   ├── HomeView/
│   │   │   ├── HomeView.jsx
│   │   │   └── HomeView.module.css
│   │   ├── MindMapPanel/            # Member 2 Integration Point
│   │   │   ├── MindMapPanel.jsx
│   │   │   └── MindMapPanel.module.css
│   │   ├── Sidebar/
│   │   │   ├── Sidebar.jsx
│   │   │   └── Sidebar.module.css
│   │   └── ThemeToggle/
│   │       ├── ThemeToggle.jsx
│   │       └── ThemeToggle.module.css
│   ├── contexts/
│   │   └── AccessibilityContext.jsx # Central state & typography engine
│   ├── hooks/
│   │   ├── useAccessibilitySettings.js
│   │   └── useFocusMask.js          # Pointer tracking & RAF loop
│   ├── data/
│   │   └── sampleDocuments.js       # Curriculum educational texts
│   ├── services/
│   │   └── documentService.js       # Member 4 FastAPI integration boundary
│   ├── styles/
│   │   ├── global.css               # Focus visible, skip-link, sr-only
│   │   └── variables.css            # Themes, CSS custom properties, @font-face
│   ├── App.jsx
│   ├── App.module.css
│   └── main.jsx
├── index.html
├── package.json
├── vite.config.js
├── .gitignore
└── README.md
```

---

## 5. Prerequisites & Installation

### Prerequisites
- **Node.js:** v18.0.0 or later (Tested on Node v24.15.0)
- **npm:** v9.0.0 or later (Tested on npm 11.12.1)

### Installation
```bash
# 1. Clone or navigate to the repository directory
cd EduSpark

# 2. Install dependencies
npm install
```

### Running the Development Server
```bash
npm run dev
```
Open your browser at `http://localhost:5173`.

### Running the Production Build
```bash
npm run build
```
Build output is emitted cleanly to the `/dist` directory.

### Previewing the Production Build
```bash
npm run preview
```

---

## 6. How to Add the OpenDyslexic Font Asset

The application includes full `@font-face` rules and a fallback font stack. To load the genuine OpenDyslexic font files:

1. Download the font files from the official repository:
   - [OpenDyslexic Website](https://opendyslexic.org/) or [GitHub Repository](https://github.com/antijingoist/opendyslexic).
2. Place the following files in `public/fonts/`:
   ```
   public/fonts/OpenDyslexic-Regular.woff2
   public/fonts/OpenDyslexic-Bold.woff2
   ```
3. The CSS `@font-face` rules in `src/styles/variables.css` are pre-wired to load these files automatically with zero configuration needed.

---

## 7. Integration Boundaries for Teammates

### Member 2: Mind Map Pipeline Lead
- **Component File:** `src/components/MindMapPanel/MindMapPanel.jsx`
- **Data Contract:** The component accepts `nodes` and `edges` props:
  ```javascript
  <MindMapPanel
    nodes={[
      { id: '1', label: 'Core Concept', x: 200, y: 150, type: 'root' },
      { id: '2', label: 'Sub-topic', x: 450, y: 220, type: 'branch' }
    ]}
    edges={[
      { id: 'e1-2', source: '1', target: '2', label: 'relates to' }
    ]}
    documentTitle="Photosynthesis"
    onNodeClick={(node) => console.log(node)}
  />
  ```
- **Current Behavior:** Displays an interactive SVG node graph when nodes exist, or an empty state explaining the contract when no data is supplied.
- **Extension Guide:** Member 2 can replace the SVG rendering with React Flow or connect their NLP graph extraction pipeline directly to this component without altering any reading workspace code.

### Member 4: Backend Lead (FastAPI & MongoDB)
- **Service File:** `src/services/documentService.js`
- **Current Behavior:** Client-side asynchronous mock returning `SAMPLE_DOCUMENTS` and storing reading progress in `localStorage`.
- **Extension Guide:** Member 4 can seamlessly wire their FastAPI endpoints by updating `documentService.js`:
  ```javascript
  export async function getDocuments() {
    const res = await fetch('/api/documents');
    return res.json();
  }

  export async function getDocumentById(id) {
    const res = await fetch(`/api/documents/${id}`);
    return res.json();
  }
  ```
- The frontend components interact strictly through `getDocuments()` and `getDocumentById()`, ensuring zero breaking changes.

---

## 8. WCAG 2.1 AA Accessibility Verification Checklist

| Requirement | Implementation Details | Status |
| :--- | :--- | :---: |
| **2.4.1 Bypass Blocks** | Skip-to-content link (`.skip-link`) jumps focus to `#reader-content` | ✅ Verified |
| **2.4.7 Focus Visible** | Distinct 3px solid focus ring with offset on all interactive elements | ✅ Verified |
| **1.4.3 Contrast (Minimum)** | Light, Dark, Warm, and Low-Sensory themes exceed 4.5:1 ratio | ✅ Verified |
| **1.4.6 Contrast (Enhanced)** | High-Contrast mode provides 7:1+ (WCAG AAA) black/white/yellow | ✅ Verified |
| **1.3.1 Info & Relationships** | Semantic `<article>`, `<h1>`-`<h3>`, `<aside>`, `<dl>`, `<nav>`, `<main>` | ✅ Verified |
| **4.1.2 Name, Role, Value** | Native form controls, `aria-pressed`, `aria-expanded`, `aria-label` | ✅ Verified |
| **4.1.3 Status Messages** | Screen reader live announcements via `aria-live="polite"` | ✅ Verified |
| **2.1.1 Keyboard Navigable** | All controls, settings drawer, and toolbar fully operable via keyboard | ✅ Verified |
| **2.2.2 Pause, Stop, Hide** | Zero auto-animations; reduced-motion media query supported | ✅ Verified |
| **1.4.10 Reflow** | Clean responsive reflow down to 320px without horizontal scroll | ✅ Verified |
| **1.4.4 Resize Text** | Reader supports 200% browser zoom and font size scaling to 32px | ✅ Verified |
| **Pointer Transparency** | ADHD focus mask uses `pointer-events: none` for uninterrupted clicks/selection | ✅ Verified |

---

## 9. Suggested GitHub Commit Message

```
feat(frontend): implement Educapt AI accessibility engine & reading workspace (Member 1)

- Build responsive application shell with semantic document reader and library navigation
- Implement Dyslexia typography engine with OpenDyslexic fallback, custom spacing, and snapshot-restore logic
- Implement ADHD Focus Mode with pointer-tracking spotlight (RAF loop) and keyboard/touch reading rulers
- Create dynamic 4-theme engine (Light, Dark, Warm, Low-Sensory) and independent WCAG AAA High Contrast mode
- Build floating accessibility toolbar and comprehensive slide-out settings drawer
- Implement safe LocalStorage persistence with defensive schema validation and range clamping
- Provide documented integration points for Member 2 (Mind Maps) and Member 4 (FastAPI)
- Satisfy WCAG 2.1 AA criteria (focus rings, skip links, aria-live announcements, reduced motion)
```
