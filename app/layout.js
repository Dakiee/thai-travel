import '../styles.css';
import '../prices.css';
import 'leaflet/dist/leaflet.css';
import SiteFooter from '../components/SiteFooter';
import SiteHeader from '../components/SiteHeader';
import { TripProvider } from '../components/TripProvider';

export const metadata = {
  title: 'Our Thailand trip · January 2027',
  description: 'Our personal Thailand trip plan for 16 January–1 February 2027: Bangkok, Ao Nang, Koh Lanta, Koh Phi Phi and Phuket.',
  icons: { icon: '/icon.svg' },
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: { index: false, follow: false, noimageindex: true },
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://images.unsplash.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;450;500;550;600;650;700&family=Manrope:wght@400;500;600;650;700;750;800&display=swap" rel="stylesheet" />
      </head>
      <body>
        <TripProvider>
          <a className="skip-link" href="#main-content">Skip to page content</a>
          <SiteHeader />
          {children}
          <SiteFooter />
        </TripProvider>
      </body>
    </html>
  );
}
