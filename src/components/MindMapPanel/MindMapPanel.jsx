/**
 * EDUCAPT AI — MIND MAP PANEL (MEMBER 2 INTEGRATION POINT)
 * Clean frontend integration boundary for Member 2's AI mind-map pipeline.
 *
 * PROPS DATA CONTRACT FOR MEMBER 2:
 * @param {Array<Object>} nodes - Array of mind map nodes:
 *   [{ id: '1', label: 'Core Concept', x: 200, y: 150, type: 'root'|'branch'|'leaf' }]
 * @param {Array<Object>} edges - Array of connecting edges:
 *   [{ id: 'e1-2', source: '1', target: '2', label: 'causes' }]
 * @param {string} documentTitle - Title of current reading document
 * @param {Function} onNodeClick - Callback when a node is activated (e.g., jump to reader section)
 *
 * Lead: Member 1 (Frontend & CSS Accessibility Engine Lead)
 */

import React, { useState } from 'react';
import styles from './MindMapPanel.module.css';

export function MindMapPanel({
  nodes = [],
  edges = [],
  documentTitle = 'Current Document',
  onNodeClick = null
}) {
  const [selectedNode, setSelectedNode] = useState(null);

  const hasData = Array.isArray(nodes) && nodes.length > 0;

  return (
    <section className={styles.mindMapWrapper} aria-labelledby="mindmap-title">
      <div className={styles.headerArea}>
        <div className={styles.titleRow}>
          <h2 id="mindmap-title" className={styles.panelTitle}>
            Concept Mind Map
          </h2>
          <span className={styles.badge}>Member 2 Integration Point</span>
        </div>
        <p className={styles.panelSubtitle}>
          Visual associative graph for <strong>{documentTitle}</strong>. Designed to assist neurodivergent learners through non-linear concept chunking and visual recall.
        </p>
      </div>

      <div className={styles.canvasArea}>
        {hasData ? (
          /* Render visual SVG node-link graph when data is passed */
          <svg className={styles.svgCanvas} viewBox="0 0 800 400" role="img" aria-label="Visual concept mind map">
            {/* Draw Edges */}
            {edges.map((edge) => {
              const src = nodes.find(n => n.id === edge.source);
              const tgt = nodes.find(n => n.id === edge.target);
              if (!src || !tgt) return null;
              return (
                <g key={edge.id}>
                  <line
                    x1={src.x || 100}
                    y1={src.y || 100}
                    x2={tgt.x || 300}
                    y2={tgt.y || 100}
                    stroke="var(--accent-primary)"
                    strokeWidth="2"
                    strokeDasharray="4 2"
                  />
                  {edge.label && (
                    <text
                      x={((src.x || 100) + (tgt.x || 300)) / 2}
                      y={((src.y || 100) + (tgt.y || 100)) / 2 - 8}
                      fill="var(--text-muted)"
                      fontSize="11"
                      textAnchor="middle"
                    >
                      {edge.label}
                    </text>
                  )}
                </g>
              );
            })}

            {/* Draw Nodes */}
            {nodes.map((node) => {
              const isSelected = selectedNode?.id === node.id;
              return (
                <g
                  key={node.id}
                  className={styles.nodeBox}
                  transform={`translate(${node.x || 150}, ${node.y || 150})`}
                  onClick={() => {
                    setSelectedNode(node);
                    if (onNodeClick) onNodeClick(node);
                  }}
                  role="button"
                  tabIndex="0"
                  aria-label={`Concept Node: ${node.label}`}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setSelectedNode(node);
                      if (onNodeClick) onNodeClick(node);
                    }
                  }}
                >
                  <rect
                    x="-75"
                    y="-24"
                    width="150"
                    height="48"
                    rx="12"
                    fill={isSelected ? 'var(--accent-primary)' : 'var(--bg-surface)'}
                    stroke={isSelected ? 'var(--accent-hover)' : 'var(--border-strong)'}
                    strokeWidth={isSelected ? '3' : '2'}
                  />
                  <text
                    x="0"
                    y="5"
                    fill={isSelected ? 'var(--text-on-accent)' : 'var(--text-primary)'}
                    fontSize="13"
                    fontWeight="600"
                    textAnchor="middle"
                  >
                    {node.label}
                  </text>
                </g>
              );
            })}
          </svg>
        ) : (
          /* Understandable Empty State Card */
          <div className={styles.emptyStateCard}>
            <div className={styles.iconCircle}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="18" cy="5" r="3" />
                <circle cx="6" cy="12" r="3" />
                <circle cx="18" cy="19" r="3" />
                <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
                <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
              </svg>
            </div>

            <h3 className={styles.emptyTitle}>AI Mind Map Ready for Pipeline</h3>
            <p className={styles.emptyText}>
              This component is the designated integration boundary for <strong>Member 2</strong>.
              When the backend NLP extraction pipeline produces concept relationships, supply the resulting nodes and edges to this component.
            </p>

            <div className={styles.contractBox}>
              <div style={{ fontWeight: 700, marginBottom: '0.5rem', color: 'var(--accent-primary)' }}>
                Expected Data Contract:
              </div>
              <code>
                {`{
  nodes: [
    { id: 'n1', label: 'Chloroplast', x: 200, y: 150 },
    { id: 'n2', label: 'Thylakoid', x: 450, y: 100 }
  ],
  edges: [
    { id: 'e1', source: 'n1', target: 'n2', label: 'contains' }
  ]
}`}
              </code>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default MindMapPanel;
