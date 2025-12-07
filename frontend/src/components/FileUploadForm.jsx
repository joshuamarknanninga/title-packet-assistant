// frontend/src/components/FileUploadForm.jsx
import React, { useState } from 'react';
import { uploadFile } from '../api/client.js';

export default function FileUploadForm({ onSuccess }) {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;
    setLoading(true);
    setError('');
    try {
      await uploadFile(file);
      onSuccess?.();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="file"
        accept="application/pdf"
        onChange={(e) => setFile(e.target.files[0] || null)}
      />
      <button type="submit" disabled={!file || loading}>
        {loading ? 'Analyzing…' : 'Upload & Analyze'}
      </button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
  );
}