// frontend/src/App.jsx
import React, { useEffect, useState } from 'react';
import UploadPage from './pages/UploadPage.jsx';
import AnalysisListPage from './pages/AnalysisListPage.jsx';
import AnalysisDetailPage from './pages/AnalysisDetailPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import { fetchHealth } from './api/client.js';

export default function App() {
  const [view, setView] = useState('upload');
  const [selectedId, setSelectedId] = useState(null);
  const [user, setUser] = useState(null);
  const [health, setHealth] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userJson = localStorage.getItem('user');
    if (token && userJson) {
      try {
        setUser(JSON.parse(userJson));
      } catch {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
    }
  }, []);

  useEffect(() => {
    fetchHealth()
      .then(setHealth)
      .catch(() => setHealth(null));
  }, []);

  const handleLogin = (user, token) => {
    setUser(user);
    setView('upload');
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    setSelectedId(null);
    setView('login');
  };

  const goToDetail = (id) => {
    setSelectedId(id);
    setView('detail');
  };

  if (!user) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: 24 }}>
      <header
        style={{
          marginBottom: 24,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <div>
          <h1 style={{ marginBottom: 4 }}>Title Packet Assistant</h1>
          {health && (
            <p style={{ fontSize: 12, color: '#555' }}>
              Health: {health.status} · DB: {health.db} · OpenAI: {health.openai}
            </p>
          )}
        </div>
        <div style={{ textAlign: 'right' }}>
          <p style={{ margin: 0, fontSize: 14 }}>Signed in as {user.email}</p>
          <button
            onClick={handleLogout}
            style={{ marginTop: 4, padding: '6px 10px', fontSize: 12 }}
          >
            Logout
          </button>
        </div>
      </header>

      <nav style={{ display: 'flex', gap: 12, marginBottom: 24 }}>
        <button onClick={() => setView('upload')}>Upload</button>
        <button onClick={() => setView('list')}>Analyses</button>
      </nav>

      {view === 'upload' && <UploadPage onUploaded={() => setView('list')} />}
      {view === 'list' && <AnalysisListPage onOpen={goToDetail} />}
      {view === 'detail' && selectedId && (
        <AnalysisDetailPage id={selectedId} onBack={() => setView('list')} />
      )}
    </div>
  );
}