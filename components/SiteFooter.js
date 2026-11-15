'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import WaterLight from './WaterLight';

const links = [
  ['/', 'Overview'],
  ['/itinerary', 'Itinerary'],
  ['/stays', 'Stays'],
  ['/transport', 'Transport'],
  ['/budget', 'Budget'],
];

export default function SiteFooter() {
  const home = usePathname() === '/';
  return (
    <footer className={`site-footer ${home ? '' : 'site-footer--compact'}`}>
      <WaterLight className="site-footer__light" />
      <div className="container site-footer__inner">
        {home && <p className="site-footer__statement">Our shared plan for a very warm January.</p>}
        <div className="site-footer__base">
          <Link className="site-footer__brand" href="/">Thailand 2027</Link>
          <nav className="site-footer__links" aria-label="Footer">{links.map(([href, label]) => <Link key={href} href={href}>{label}</Link>)}</nav>
          <p className="site-footer__dates">16 January to 1 February 2027</p>
        </div>
      </div>
    </footer>
  );
}
