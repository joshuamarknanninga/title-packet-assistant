import React from 'react';

export default function AnalysisCard({ analysis, onOpen }) {
  const {
    id,
    humanSummary,
    File,
    createdAt
  } = analysis;

  const summaryPreview = humanSummary?.length > 180
    ? humanSummary.slice(0, 180) + '…'
    : humanSummary;

  const created = new Date(createdAt).toLocaleString();

  return (
    <div
      style={{
        border: '1px solid #ccc',
        padding: '16px',
        borderRadius: '8px',
        marginBottom: '16px',
        background: '#fafafa',
        boxShadow: '0 2px 4px rgba(0,0,0,0.06)',
        cursor: 'pointer',
        transition: 'all 0.2s ease-in-out'
      }}
      onClick={() => onOpen(id)}
      onMouseEnter={(e) => (e.currentTarget.style.boxShadow = '0 4px 10px rgba(0,0,0,0.15)')}
      onMouseLeave={(e) => (e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.06)')}
    >
      <h3 style={{ marginTop: 0, marginBottom: 8 }}>
        {File?.originalName || 'Unknown File'}
      </h3>

      <p style={{ margin: '4px 0', fontSize: 12, color: '#555' }}>
        Created: {created}
      </p>

      <p style={{ marginTop: 12, whiteSpace: 'pre-wrap', color: '#333' }}>
        {summaryPreview || 'No summary available.'}
      </p>

      <button
        onClick={(e) => {
          e.stopPropagation();
          onOpen(id);
        }}
        style={{
          marginTop: 12,
          padding: '8px 16px',
          borderRadius: 6,
          border: 'none',
          background: '#4b66f0',
          color: 'white',
          cursor: 'pointer',
          fontWeight: 'bold'
        }}
      >
        Open Analysis →
      </button>
    </div>
  );
}
