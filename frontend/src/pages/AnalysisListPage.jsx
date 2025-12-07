import React, { useEffect, useState } from 'react';
import { fetchAnalyses } from '../api/client.js';

export default function AnalysisListPage({ onOpen }) {
  const [analyses, setAnalyses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalyses()
      .then(setAnalyses)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading analyses…</p>;

  return (
    <div>
      <h2>Analyses</h2>
      {analyses.length === 0 && <p>No analyses yet.</p>}
      <ul>
        {analyses.map((a) => (
          <li key={a.id} style={{ marginBottom: 12 }}>
            <button onClick={() => onOpen(a.id)}>
              {a.File?.originalName || 'Unknown file'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
