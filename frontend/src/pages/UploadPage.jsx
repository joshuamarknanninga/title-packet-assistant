// frontend/src/pages/UploadPage.jsx
import React from 'react';
import FileUploadForm from '../components/FileUploadForm.jsx';

export default function UploadPage({ onUploaded }) {
  return (
    <div>
      <h2>Upload Title Packet (PDF)</h2>
      <p>Upload a title packet PDF to generate a draft analysis.</p>
      <FileUploadForm onSuccess={onUploaded} />
    </div>
  );
}