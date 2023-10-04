import '@/styles/globals.scss';
import { Open_Sans } from 'next/font/google';
import { Header } from '@/_components/Header/Header';
import { ReduxProvider } from '@/_context/provider/ReduxProvider';
import 'react-toastify/dist/ReactToastify.css';

const openSans = Open_Sans({
  subsets: ['latin'],
  display: 'swap',
})


export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
    <body className={openSans.className}>
    <ReduxProvider>
      <Header />
      {children}
    </ReduxProvider>
    </body>
    </html>
  );
}
