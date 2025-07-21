'use client';

import { useUser } from '@auth0/nextjs-auth0/client';

export default function Home() {
  const { user, error, isLoading } = useUser();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

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

      <main style={{ 
        textAlign: 'center', 
        marginTop: '80px',
        fontFamily: 'Century Gothic, CenturyGothic, AppleGothic, sans-serif',
        padding: '20px',
        position: 'relative',
        zIndex: 1
      }}>
        <h1 style={{ fontSize: '3em', marginBottom: '20px', color: '#0f3456' }}>
          Data Center Operations Portal
        </h1>
        
        {user ? (
          <div>
            <p style={{ fontSize: '1.5em', marginBottom: '40px', color: '#0f3456' }}>
              Welcome to the Operations Portal
            </p>
            
            <div style={{ 
              maxWidth: '900px', 
              margin: '0 auto',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '30px',
              marginTop: '60px'
            }}>
              {/* MOP Card */}
              <div style={{
                padding: '40px 30px',
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                borderRadius: '12px',
                border: '1px solid #dee2e6',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                transition: 'transform 0.3s, box-shadow 0.3s',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.boxShadow = '0 8px 12px rgba(0, 0, 0, 0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
              }}
              onClick={() => window.location.href = '/mop'}
              >
                <h3 style={{ 
                  color: '#0f3456', 
                  fontSize: '2.5em', 
                  marginBottom: '10px',
                  fontWeight: 'bold'
                }}>
                  MOPs
                </h3>
                <p style={{ color: '#0f3456', marginBottom: '20px' }}>
                  Methods of Procedure
                </p>
                <p style={{ 
                  fontSize: '28px', 
                  fontWeight: 'bold',
                  color: '#0f3456'
                }}>
                  2 Documents
                </p>
              </div>
              
              {/* SOP Card */}
              <div style={{
                padding: '40px 30px',
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                borderRadius: '12px',
                border: '1px solid #dee2e6',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                transition: 'transform 0.3s, box-shadow 0.3s',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.boxShadow = '0 8px 12px rgba(0, 0, 0, 0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
              }}
              onClick={() => window.location.href = '/sop'}
              >
                <h3 style={{ 
                  color: '#0f3456', 
                  fontSize: '2.5em', 
                  marginBottom: '10px',
                  fontWeight: 'bold'
                }}>
                  SOPs
                </h3>
                <p style={{ color: '#0f3456', marginBottom: '20px' }}>
                  Standard Operating Procedures
                </p>
                <p style={{ 
                  fontSize: '28px', 
                  fontWeight: 'bold',
                  color: '#0f3456'
                }}>
                  2 Documents
                </p>
              </div>
              
              {/* EOP Card */}
              <div style={{
                padding: '40px 30px',
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                borderRadius: '12px',
                border: '1px solid #dee2e6',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                transition: 'transform 0.3s, box-shadow 0.3s',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.boxShadow = '0 8px 12px rgba(0, 0, 0, 0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
              }}
              onClick={() => window.location.href = '/eop'}
              >
                <h3 style={{ 
                  color: '#0f3456', 
                  fontSize: '2.5em', 
                  marginBottom: '10px',
                  fontWeight: 'bold'
                }}>
                  EOPs
                </h3>
                <p style={{ color: '#0f3456', marginBottom: '20px' }}>
                  Emergency Operating Procedures
                </p>
                <p style={{ 
                  fontSize: '28px', 
                  fontWeight: 'bold',
                  color: '#0f3456'
                }}>
                  2 Documents
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <p style={{ fontSize: '1.2em', marginBottom: '40px', color: '#0f3456' }}>
              Secure access to MOPs, SOPs, and EOPs
            </p>
            <a 
              href="/api/auth/login" 
              style={{ 
                padding: '15px 30px', 
                background: '#0f3456', 
                color: 'white', 
                textDecoration: 'none', 
                borderRadius: '5px',
                fontSize: '1.1em',
                display: 'inline-block'
              }}
            >
              Login to Access Documents
            </a>
          </div>
        )}
      </main>
    </>
  );
}