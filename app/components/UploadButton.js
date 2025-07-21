'use client';

import { useState } from 'react';

export default function UploadButton({ type, onUploadSuccess }) {
  const [isUploading, setIsUploading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file && file.type === 'application/pdf') {
      setSelectedFile(file);
    } else {
      alert('Please select a PDF file');
      e.target.value = '';
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append('file', selectedFile);
    formData.append('type', type);

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      });

      if (response.ok) {
        const data = await response.json();
        alert('File uploaded successfully!');
        setShowModal(false);
        setSelectedFile(null);
        // Reload the page to show the new file
        window.location.reload();
      } else {
        alert('Upload failed. Please try again.');
      }
    } catch (error) {
      console.error('Upload error:', error);
      alert('Upload failed. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <>
      {/* Upload Button */}
      <button
        onClick={() => setShowModal(true)}
        style={{
          padding: '10px 20px',
          backgroundColor: '#28a745',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          fontSize: '16px',
          cursor: 'pointer',
          marginBottom: '20px',
          transition: 'background-color 0.2s'
        }}
        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#218838'}
        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#28a745'}
      >
        + Upload PDF
      </button>

      {/* Upload Modal */}
      {showModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 2000
        }}>
          <div style={{
            backgroundColor: 'white',
            padding: '30px',
            borderRadius: '8px',
            width: '90%',
            maxWidth: '500px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
          }}>
            <h2 style={{ marginBottom: '20px' }}>Upload PDF to {type.toUpperCase()}</h2>
            
            <div style={{ marginBottom: '20px' }}>
              <input
                type="file"
                accept=".pdf"
                onChange={handleFileSelect}
                style={{
                  width: '100%',
                  padding: '10px',
                  border: '2px dashed #ddd',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              />
            </div>

            {selectedFile && (
              <div style={{
                marginBottom: '20px',
                padding: '10px',
                backgroundColor: '#f8f9fa',
                borderRadius: '4px'
              }}>
                <strong>Selected file:</strong> {selectedFile.name}
              </div>
            )}

            <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
              <button
                onClick={() => {
                  setShowModal(false);
                  setSelectedFile(null);
                }}
                style={{
                  padding: '10px 20px',
                  backgroundColor: '#6c757d',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
                disabled={isUploading}
              >
                Cancel
              </button>
              <button
                onClick={handleUpload}
                style={{
                  padding: '10px 20px',
                  backgroundColor: '#0070f3',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  opacity: isUploading || !selectedFile ? 0.6 : 1
                }}
                disabled={isUploading || !selectedFile}
              >
                {isUploading ? 'Uploading...' : 'Upload'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}