import Script from 'next/script';
import '../styles.css';
import '../prices.css';
import 'leaflet/dist/leaflet.css';
import SiteFooter from '../components/SiteFooter';
import SiteHeader from '../components/SiteHeader';
import { TripProvider } from '../components/TripProvider';

const slotScript = "window.hallmarkSlots = (m) => { for (const [k, v] of Object.entries(m)) { const s = document.querySelector(`[data-slot=\"${k}\"]`); if (!s) continue; const im = new Image(); im.src = typeof v === 'string' ? v : v.src; im.alt = (typeof v === 'object' && v.alt) || s.dataset.alt || ''; s.querySelectorAll(':scope > img').forEach((o) => o.remove()); s.prepend(im); } }; document.querySelectorAll('[data-slot] img').forEach((i) => { if (i.complete && !i.naturalWidth) i.remove(); else i.addEventListener('error', () => i.remove(), { once: true }); });";

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
        <link href="https://fonts.googleapis.com/css2?family=Funnel+Display:wght@300;400&family=Funnel+Sans:wght@400;500&display=swap" rel="stylesheet" />
      </head>
      <body>
        <TripProvider>
          <a className="skip-link" href="#main-content">Skip to page content</a>
          <SiteHeader />
          {children}
          <SiteFooter />
        </TripProvider>
        <Script id="hallmark-slots" strategy="afterInteractive">{slotScript}</Script>
      </body>
    </html>
  );
}
