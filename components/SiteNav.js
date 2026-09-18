'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const links = [
  ['/', 'Overview'],
  ['/itinerary', 'Itinerary'],
  ['/stays', 'Stays'],
  ['/transport', 'Transport'],
  ['/budget', 'Budget'],
];

export default function SiteNav() {
  const pathname = usePathname();
  return <nav aria-label="Main navigation">{links.map(([href, label]) => <Link key={href} className={pathname === href ? 'active' : ''} aria-current={pathname === href ? 'page' : undefined} href={href}>{label}</Link>)}</nav>;
}
