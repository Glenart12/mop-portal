'use client';

import { useUser } from '@auth0/nextjs-auth0/client';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import PDFGallery from '../components/PDFGallery';
import UploadButton from '../components/UploadButton';

// Define your SOP documents here
const sopDocuments = [
  {
    name: "Start Up Procedure",
    filename: "Start up.pdf",
    description: "Standard startup procedures for daily operations"
  },
  {
    name: "Log Sheet",
    filename: "Log Sheet.pdf",
    description: "Standard log sheet for recording operational data"
  }
];

export default function SopPage() {
  const { user, error, isLoading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/api/auth/login');
    }
  }, [user, isLoading, router]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  if (!user) {
    return null;
  }

  return (
    <>
      {/* Background Image with Blur */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundImage: 'url("/Data-Centre-Stock-04.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        filter: 'blur(5px)',
        zIndex: -2
      }} />
      
      {/* Overlay for better text readability */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        zIndex: -1
      }} />

      <div style={{ 
        padding: '20px', 
        fontFamily: 'Century Gothic, CenturyGothic, AppleGothic, sans-serif', 
        maxWidth: '1200px', 
        margin: '0 auto',
        position: 'relative',
        zIndex: 1
      }}>
        {/* Header */}
        <div style={{ marginBottom: '30px' }}>
          <h1 style={{ fontSize: '2.5em', marginBottom: '10px', color: '#0f3456' }}>
            Standard Operating Procedures (SOP)
          </h1>
          <p style={{ color: '#0f3456', fontSize: '16px' }}>
            Manage and access all Standard Operating Procedure documents
          </p>
        </div>

        {/* Upload Button */}
        <UploadButton type="sops" />

        {/* PDF Gallery */}
        <PDFGallery documents={sopDocuments} type="sops" />
      </div>
    </>
  );
}