import '@/styles/globals.scss';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Header } from '@/_components/Header/Header';
import { ReduxProvider } from '@/store/ReduxProvider';
import 'react-toastify/dist/ReactToastify.css';
import { Form } from '@/_components/Form/Form';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Next Listings App',
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
    <body className={inter.className}>
    <ReduxProvider>
      <Header />
      <Form />
      {/*{children}*/}
    </ReduxProvider>
    </body>
    </html>
  );
}
