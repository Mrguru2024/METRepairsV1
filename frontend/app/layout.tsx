import '../styles/globals.css';
import { siteConfig } from '@/config/site';
import HeaderNav from '@/components/HeaderNav';
import Footer from '@/components/Footer';
import SessionProvider from '@/components/SessionProvider';

export const metadata = {
  title: siteConfig.name,
  description: `${siteConfig.name} — Service & Systems Integrations`,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="bg-neutral_light text-neutral-900 dark:bg-neutral_dark dark:text-neutral_light">
      <body>
        <SessionProvider>
          <HeaderNav />
          {children}
          <Footer />
        </SessionProvider>
      </body>
    </html>
  );
}


