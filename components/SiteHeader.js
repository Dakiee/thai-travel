import Link from 'next/link';
import Icon from './Icon';
import HeaderActions from './HeaderActions';
import SiteNav from './SiteNav';

export default function SiteHeader() {
  return (
    <header className="site-header">
      <div className="container site-header__bar">
        <Link className="brand" href="/" aria-label="Our Thailand trip home"><Icon name="palm" className="brand__mark" /><span className="brand__name">Thailand 2027</span><span className="brand__note">Our trip notes</span></Link>
        <SiteNav />
        <HeaderActions />
      </div>
    </header>
  );
}
