import React from 'react';
import './globals.css';
import type { Metadata } from 'next';
import { LanguageProvider } from './contexts/LanguageContext';

export const metadata: Metadata = {
  title: 'KDRAMA Portfolio',
  description: 'Fashion brand architecture, design & strategies',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
} 