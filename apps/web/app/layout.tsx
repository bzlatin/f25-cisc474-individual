// app/layout.tsx
import type { Metadata } from 'next';
import './globals.css';
import AppProviders from './providers';

export const metadata: Metadata = {
  title: 'StudyStack',
  description: 'Learning Management System Demo',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
