import '@/styles/globals.scss';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Header } from '@/_components/Header/Header';
import { ReduxProvider } from '@/store/ReduxProvider';
import 'react-toastify/dist/ReactToastify.css';
import { cookies } from 'next/headers';
import { userService } from '@/_lib/services/api/user-service';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Next Listings App',
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const token = cookies().get('token')?.value;
  const response = token ? await userService.getAuthUser(token) : null
  console.log(response);
  return (
    <html lang='en'>
    <body className={inter.className}>
    <ReduxProvider>
      {response?.data?.email}
      <Header />
      {children}
    </ReduxProvider>
    </body>
    </html>
  );
}
