import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'ZULOO — Web Development Studio | Custom Websites That Work',
  description: 'ZULOO is a web development studio that builds custom, mobile-first websites designed to grow your business. No templates. No shortcuts. From concept to launch.',
  keywords: ['ZULOO', 'web development', 'web design', 'custom website', 'mobile-first', 'web studio', 'website builder', 'SEO', 'zuloo studio'],
  authors: [{ name: 'ZULOO Web Studio' }],
  creator: 'ZULOO',
  publisher: 'ZULOO',
  metadataBase: new URL('https://zuloo.vercel.app'),
  openGraph: {
    title: 'ZULOO — Web Development Studio',
    description: 'Custom-crafted, mobile-first websites designed to grow your business. No templates. No shortcuts.',
    url: 'https://zuloo.vercel.app',
    siteName: 'ZULOO',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ZULOO — Web Development Studio',
    description: 'Custom-crafted, mobile-first websites designed to grow your business.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
  },
};

export const viewport: Viewport = {
  themeColor: '#080808',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />

        {/* JSON-LD Structured Data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'ZULOO',
              description: 'Web Development Studio — Custom websites that work.',
              url: 'https://zuloo.vercel.app',
              contactPoint: {
                '@type': 'ContactPoint',
                telephone: '+91-999-505-6728',
                contactType: 'customer service',
              },
              sameAs: [
                'https://instagram.com/zuloo.studio',
              ],
            }),
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
