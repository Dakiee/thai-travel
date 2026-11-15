import Link from 'next/link';
import Icon from '../components/Icon';
import OverviewFacts from '../components/OverviewFacts';
import RouteOverview from '../components/RouteOverview';
import TripControls from '../components/TripControls';
import TripMap from '../components/TripMap';
import planner from '../planner.js';

const firstStop = planner.stops[0];

const planPages = [
  { href: '/itinerary', icon: 'calendar', title: 'Day-by-day', text: 'All 17 days, activities, transfer notes and flexible ideas.' },
  { href: '/stays', icon: 'bed', title: 'Where we’re staying', text: 'Our booked hotels, dates and guest count for each stop.' },
  { href: '/transport', icon: 'boat', title: 'Flights and ferries', text: 'The five travel days, times and rough fare ranges.' },
  { href: '/budget', icon: 'wallet', title: 'Our budget', text: 'Per-person and total estimates, currencies and the 10% cushion.' },
];

const remember = [
  { icon: 'sun', title: 'Keep bookings handy', text: 'Save every confirmation, including the Jan 26 to 30 Karon pool villa for seven people, offline on our phones.' },
  { icon: 'bag', title: 'Pack for both ends', text: 'Warm layers for Ulaanbaatar; light clothes, temple outfits, sun protection and a dry bag for Thailand.' },
  { icon: 'calendar', title: 'Confirm every transfer', text: 'Match the domestic flights and ferries to our hotel check-in dates, baggage and group size.' },
  { icon: 'heart', title: 'Don’t over-plan it', text: 'Keep the 10% cushion and a little empty space. Weather and energy can decide some of the beach days.' },
];

export default function HomePage() {
  return (
    <main id="main-content" className="home">
      <section className="hero" aria-labelledby="hero-title">
        <figure className="hero__photo" data-slot="hero" data-alt="The Andaman coast: turquoise water, limestone cliffs and longtail boats">
          <img src="https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&w=2400&q=85" width="2400" height="1600" fetchPriority="high" alt="Turquoise sea, limestone cliffs and longtail boats on Thailand’s Andaman coast" />
        </figure>
        <div className="hero__scrim" aria-hidden="true" />
        <div className="container hero__inner">
          <div className="hero__copy">
            <h1 id="hero-title">Thailand,<br />here we come.</h1>
            <p className="lead hero__lead">Five places, six stays, and enough room to follow the weather.</p>
            <div className="hero__actions"><Link className="btn btn--light" href="/itinerary">Open our day-by-day</Link></div>
            <div className="hero__meta"><p className="hero__when"><Icon name="plane" /><span>From Ulaanbaatar, 16 January to 1 February 2027</span></p><p className="hero__first"><Icon name="bed" /><span>First night: {firstStop.hotel}, {firstStop.city}</span></p></div>
          </div>
          <p className="hero__place"><Icon name="pin" /><span>The Andaman coast, Thailand</span></p>
        </div>
      </section>

      <section className="glance" aria-label="Our trip at a glance">
        <div className="container">
          <OverviewFacts />
          <TripControls />
          <p className="estimate-note">Hotel names reflect our bookings; remaining prices are working estimates. <Link href="/budget">Check our budget</Link></p>
        </div>
      </section>

      <RouteOverview />

      <section className="plan-pages" aria-labelledby="plan-pages-title">
        <div className="container plan-pages__inner">
          <div className="plan-pages__head"><h2 id="plan-pages-title">Open the part we need.</h2><p className="lead">Each section now has its own page.</p></div>
          <ul className="plan-pages__list">{planPages.map(item => <li key={item.href}><Link className="plan-page" href={item.href}><Icon name={item.icon} /><h3 className="plan-page__title">{item.title}</h3><span className="plan-page__text">{item.text}</span></Link></li>)}</ul>
        </div>
      </section>

      <TripMap />

      <section className="remember" aria-labelledby="remember-title">
        <div className="container remember__inner">
          <h2 id="remember-title">Before we leave.</h2>
          <div className="remember__rows">{remember.map(item => <article className="remember__row" key={item.title}><h3><Icon name={item.icon} />{item.title}</h3><p>{item.text}</p></article>)}</div>
        </div>
      </section>
    </main>
  );
}
