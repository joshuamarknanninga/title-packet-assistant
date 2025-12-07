// frontend/src/pages/AnalysisListPage.jsx
import React, { useEffect, useState } from 'react';
import { fetchAnalyses } from '../api/client.js';
import AnalysisCard from '../components/AnalysisCard.jsx';

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
      {analyses.map((analysis) => (
        <AnalysisCard key={analysis.id} analysis={analysis} onOpen={onOpen} />
      ))}
    </div>
  );
}