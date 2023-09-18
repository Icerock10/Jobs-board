export const dynamic = 'force-dynamic';

import '@/styles/globals.scss';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Header } from '@/_components/Header/Header';
import { ReduxProvider } from '@/store/ReduxProvider';
import 'react-toastify/dist/ReactToastify.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Next Listings App',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
    <body className={inter.className}>
    <ReduxProvider>
      <Header />
      {children}
    </ReduxProvider>
    </body>
    </html>
  );
}
