import Link from 'next/link';
import Icon from './Icon';
import HeaderActions from './HeaderActions';
import SiteNav from './SiteNav';

export default function SiteHeader() {
  return (
    <header className="site-header wrap">
      <Link className="brand" href="/" aria-label="Our Thailand trip home"><span className="brand-icon"><Icon name="palm" /></span><span>Thailand <strong>2027</strong><small>OUR TRIP NOTES</small></span></Link>
      <SiteNav />
      <HeaderActions />
    </header>
  );
}
