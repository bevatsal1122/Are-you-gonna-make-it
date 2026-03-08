import './globals.css';
import type { Metadata } from 'next';
import { Space_Grotesk } from 'next/font/google';

const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], weight: ['400', '500', '600', '700'] });

export const metadata: Metadata = {
  title: 'Are You Gonna Make It?',
  description: 'Answer brutal questions. Find out how much you\'ll make in 5 years. No cap.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${spaceGrotesk.className} bg-[hsl(var(--background))] text-black min-h-screen`}>
        {children}
      </body>
    </html>
  );
}
