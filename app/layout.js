'use client';

import { UserProvider } from '@auth0/nextjs-auth0/client';
import Header from './components/Header';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0 }}>
        <UserProvider>
          <Header />
          {children}
        </UserProvider>
      </body>
    </html>
  );
}