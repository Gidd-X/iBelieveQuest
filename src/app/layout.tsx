import type { Metadata } from 'next';
import { Literata, Playfair_Display } from 'next/font/google';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import Header from '@/components/header';
import Footer from '@/components/footer';
import CookieBanner from '@/components/cookie-banner';

const literata = Literata({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-literata',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-playfair',
});

export const metadata: Metadata = {
  title: {
    default: 'iBelieveQuest',
    template: '%s | iBelieveQuest',
  },
  description: 'A space where faith meets questions, and questions lead to discovery.',
  icons: [{ rel: 'icon', url: '/favicon.ico' }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
      </head>
      <body className={`${literata.variable} ${playfair.variable} font-body antialiased bg-background text-foreground`}>
        <div className="flex min-h-screen flex-col">
          <Header />
          <main className="container mx-auto flex-grow px-4 py-8 sm:px-6 md:py-12 lg:px-8">
            {children}
          </main>
          <Footer />
        </div>
        <CookieBanner />
        <Toaster />
      </body>
    </html>
  );
}
