
import { Header } from './Header';
import { Footer } from './Footer';
import { ThemeProvider } from './ThemeProvider';
import { Helmet } from 'react-helmet';

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <Helmet>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Roboto:wght@400;500;700&family=DM+Sans:wght@400;500;700&family=Merriweather:wght@400;700&family=Lora:wght@400;700&display=swap" />
      </Helmet>
      <div className="relative min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}
