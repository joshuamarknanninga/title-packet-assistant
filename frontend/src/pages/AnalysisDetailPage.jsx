// frontend/src/pages/AnalysisDetailPage.jsx
import React, { useEffect, useState } from 'react';
import { fetchAnalysis, updateRequirements } from '../api/client.js';
import RequirementsEditor from '../components/RequirementsEditor.jsx';

export default function AnalysisDetailPage({ id, onBack }) {
  const [analysis, setAnalysis] = useState(null);
  const [requirements, setRequirements] = useState([]);
  const [exceptions, setExceptions] = useState([]);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchAnalysis(id).then((data) => {
      setAnalysis(data);
      setRequirements(data.requirements || []);
      setExceptions(data.exceptions || []);
    });
  }, [id]);

  const handleSave = async () => {
    setSaving(true);
    try {
      const updated = await updateRequirements(id, requirements, exceptions);
      setAnalysis(updated);
    } finally {
      setSaving(false);
    }
  };

  if (!analysis) return <p>Loading analysis…</p>;

  return (
    <div>
      <button onClick={onBack}>← Back</button>
      <h2>{analysis.File?.originalName}</h2>

      <section>
        <h3>Human Summary</h3>
        <pre style={{ whiteSpace: 'pre-wrap' }}>{analysis.humanSummary}</pre>
      </section>

      <RequirementsEditor
        title="Requirements"
        items={requirements}
        onChange={setRequirements}
      />

      <RequirementsEditor
        title="Exceptions"
        items={exceptions}
        onChange={setExceptions}
      />

      <button onClick={handleSave} disabled={saving} style={{ marginTop: 16 }}>
        {saving ? 'Saving…' : 'Save Changes'}
      </button>

      <section style={{ marginTop: 24 }}>
        <h3>Raw JSON Data</h3>
        <pre style={{ whiteSpace: 'pre-wrap', fontSize: 12 }}>
          {JSON.stringify(analysis.jsonData, null, 2)}
        </pre>
      </section>
    </div>
  );
}