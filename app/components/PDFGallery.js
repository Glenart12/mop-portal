'use client';

import { useState } from 'react';

export default function PDFGallery({ documents, type }) {
  const [selectedPDF, setSelectedPDF] = useState(null);

  const handleClose = () => {
    setSelectedPDF(null);
  };

  return (
    <>
      {/* Grid View */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
        gap: '20px',
        marginTop: '30px'
      }}>
        {documents.map((doc, index) => (
          <div 
            key={index}
            style={{ 
              border: '1px solid #ddd', 
              borderRadius: '8px',
              overflow: 'hidden',
              backgroundColor: '#fff',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              transition: 'transform 0.2s, box-shadow 0.2s',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.15)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
            }}
          >
            {/* PDF Preview Area - Click to expand */}
            <div 
              onClick={() => setSelectedPDF(doc)}
              style={{
                height: '200px',
                backgroundColor: '#f5f5f5',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative'
              }}
            >
              {/* PDF Icon */}
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '48px', marginBottom: '10px' }}>📄</div>
                <p style={{ color: '#666', fontSize: '14px' }}>Click to view</p>
              </div>
            </div>
            
            {/* Document Info */}
            <div style={{ padding: '15px' }}>
              <h3 style={{ 
                margin: '0 0 10px 0', 
                fontSize: '16px',
                color: '#333',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis'
              }}>
                {doc.name}
              </h3>
              
              {doc.description && (
                <p style={{ 
                  fontSize: '14px', 
                  color: '#666', 
                  margin: '0 0 15px 0',
                  lineHeight: '1.4'
                }}>
                  {doc.description}
                </p>
              )}
              
              {/* Download Button */}
              <a 
                href={`/${type}/${doc.filename}`}
                download
                onClick={(e) => e.stopPropagation()}
                style={{
                  display: 'inline-block',
                  padding: '8px 16px',
                  backgroundColor: '#0070f3',
                  color: 'white',
                  textDecoration: 'none',
                  borderRadius: '4px',
                  fontSize: '14px',
                  transition: 'background-color 0.2s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#0051cc';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#0070f3';
                }}
              >
                Download
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Modal/Expanded View */}
      {selectedPDF && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          padding: '20px'
        }}>
          <div style={{
            backgroundColor: 'white',
            borderRadius: '8px',
            width: '90%',
            maxWidth: '900px',
            height: '90%',
            display: 'flex',
            flexDirection: 'column',
            position: 'relative'
          }}>
            {/* Modal Header */}
            <div style={{
              padding: '20px',
              borderBottom: '1px solid #eee',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <h2 style={{ margin: 0, fontSize: '20px' }}>{selectedPDF.name}</h2>
              <button
                onClick={handleClose}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: '24px',
                  cursor: 'pointer',
                  padding: '0 10px',
                  color: '#666'
                }}
              >
                ×
              </button>
            </div>

            {/* PDF Viewer */}
            <div style={{ flex: 1, padding: '20px', overflow: 'hidden' }}>
              <iframe
                src={`/${type}/${selectedPDF.filename}`}
                style={{
                  width: '100%',
                  height: '100%',
                  border: 'none',
                  borderRadius: '4px'
                }}
                title={selectedPDF.name}
              />
            </div>

            {/* Modal Footer */}
            <div style={{
              padding: '20px',
              borderTop: '1px solid #eee',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              {selectedPDF.description && (
                <p style={{ margin: 0, color: '#666', fontSize: '14px' }}>
                  {selectedPDF.description}
                </p>
              )}
              <a
                href={`/${type}/${selectedPDF.filename}`}
                download
                style={{
                  padding: '10px 24px',
                  backgroundColor: '#0070f3',
                  color: 'white',
                  textDecoration: 'none',
                  borderRadius: '4px',
                  fontSize: '16px',
                  marginLeft: 'auto'
                }}
              >
                Download PDF
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}