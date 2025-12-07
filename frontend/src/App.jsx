import React, { useState } from 'react';
import UploadPage from './pages/UploadPage.jsx';
import AnalysisListPage from './pages/AnalysisListPage.jsx';
import AnalysisDetailPage from './pages/AnalysisDetailPage.jsx';
import authRoutes from './routes/authRoutes.js';
import { requireAuth } from './middleware/requireAuth.js';

export default function App() {
  const [view, setView] = useState('upload');
  const [selectedId, setSelectedId] = useState(null);

  const goToDetail = (id) => {
    setSelectedId(id);
    setView('detail');
  };

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: 24 }}>
      <header style={{ marginBottom: 24 }}>
        <h1>Title Packet Assistant</h1>
        <nav style={{ display: 'flex', gap: 12 }}>
          <button onClick={() => setView('upload')}>Upload</button>
          <button onClick={() => setView('list')}>Analyses</button>
        </nav>
      </header>

      {view === 'upload' && <UploadPage onUploaded={() => setView('list')} />}
      {view === 'list' && <AnalysisListPage onOpen={goToDetail} />}
      {view === 'detail' && selectedId && (
        <AnalysisDetailPage id={selectedId} onBack={() => setView('list')} />
      )}
    </div>
  );
}
