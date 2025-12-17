/**
 * Root Layout
 * Next.js App Router root layout
 */
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'Vantage - PropTech Super-App',
  description: 'Search by location, stay for the view. Immersive 3D property visualization.',
  keywords: ['real estate', 'property', 'map', '3D', 'visualization', 'rental', 'housing'],
  authors: [{ name: 'Vantage Team' }],
  openGraph: {
    title: 'Vantage - PropTech Super-App',
    description: 'Search by location, stay for the view.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <link
          href="https://api.mapbox.com/mapbox-gl-js/v3.1.2/mapbox-gl.css"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
