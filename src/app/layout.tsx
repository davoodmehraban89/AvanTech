import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'AvanTech',
  description: 'Technology and gaming commerce platform',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fa" dir="rtl">
      <body>{children}</body>
    </html>
  );
}
