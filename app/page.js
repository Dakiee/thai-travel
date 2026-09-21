import Link from 'next/link';
import Icon from '../components/Icon';
import OverviewFacts from '../components/OverviewFacts';
import RouteOverview from '../components/RouteOverview';
import TripControls from '../components/TripControls';
import TripMap from '../components/TripMap';

const planPages = [
  { href: '/itinerary', icon: 'calendar', title: 'Day-by-day', text: 'All 17 days, activities, transfer notes and flexible ideas.' },
  { href: '/stays', icon: 'bed', title: 'Where we’re staying', text: 'Our booked hotels, dates and guest count for each stop.' },
  { href: '/transport', icon: 'boat', title: 'Flights and ferries', text: 'The five travel days, saved 12Go links and rough fare ranges.' },
  { href: '/budget', icon: 'wallet', title: 'Our budget', text: 'Per-person and total estimates, currencies and the 10% cushion.' },
];

export default function HomePage() {
  return (
    <main id="main-content" className="wrap">
      <section className="hero editorial-hero" aria-labelledby="hero-title">
        <div className="hero-panel">
          <div className="hero-top"><span className="glass-tag"><Icon name="plane" /> FROM ULAANBAATAR</span><span className="hero-date"><Icon name="sun" /> 16 JAN — 1 FEB 2027</span></div>
          <div className="hero-copy"><p className="eyebrow">OUR GROUP ADVENTURE</p><h1 id="hero-title">Thailand,<br />here we come.</h1><p>Five places, six stays, and enough room to follow the weather. Everything we need is gathered here.</p><Link className="button cream" href="/itinerary">Open our day-by-day <Icon name="arrow-up-right" /></Link></div>
          <div className="hero-route" aria-label="Our route"><span>Bangkok</span><i>→</i><span>Ao Nang</span><i>→</i><span>Lanta</span><i>→</i><span>Phi Phi</span><i>→</i><span>Phuket</span></div>
        </div>
        <div className="hero-media">
          <img className="hero-photo" src="https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&w=2000&q=85" alt="Turquoise sea, limestone cliffs and longtail boats on Thailand’s Andaman coast" />
          <div className="hero-shade" />
          <div className="sun-stamp" aria-hidden="true"><span><Icon name="sun" /></span><strong>17 days.</strong><span>16 nights.</span></div>
          <span className="photo-location"><Icon name="pin" /> The Andaman coast, Thailand</span>
        </div>
      </section>

      <OverviewFacts />
      <TripControls />
      <p className="estimate-note"><span className="status-dot" /><span>Hotel names reflect our bookings; remaining prices are working estimates.</span><Link href="/budget">Check our budget <span aria-hidden="true">↗</span></Link></p>

      <section className="plan-pages" aria-labelledby="plan-pages-title"><div className="section-heading"><div><p className="eyebrow green">EVERYTHING IN ITS PLACE</p><h2 id="plan-pages-title">Open the part we need.</h2></div><p>Each section now has its own page.</p></div><div className="plan-page-grid">{planPages.map(item => <Link className="plan-page-card" href={item.href} key={item.href}><span><Icon name={item.icon} /></span><div><h3>{item.title}</h3><p>{item.text}</p></div><Icon name="arrow-up-right" /></Link>)}</div></section>

      <RouteOverview />
      <TripMap />

      <section className="know-section"><div className="section-heading"><div><p className="eyebrow green">THINGS TO REMEMBER</p><h2>Before we leave.</h2></div></div><div className="know-grid"><article><span><Icon name="sun" /></span><h3>Add the Phuket hotel</h3><p>Keep the Jan 26–30 stay for seven people together with the rest of our confirmed bookings.</p></article><article><span><Icon name="bag" /></span><h3>Pack for both ends</h3><p>Warm layers for Ulaanbaatar; light clothes, temple outfits, sun protection and a dry bag for Thailand.</p></article><article><span><Icon name="calendar" /></span><h3>Confirm every transfer</h3><p>Match the domestic flights and ferries to our hotel check-in dates, baggage and group size.</p></article><article><span><Icon name="heart" /></span><h3>Don’t over-plan it</h3><p>Keep the 10% cushion and a little empty space. Weather and energy can decide some of the beach days.</p></article></div></section>
    </main>
  );
}
