'use client';

import Icon from './Icon';
import { useTrip } from './TripProvider';

export default function StaysPlanner() {
  const { P, dateLabel } = useTrip();
  return (
    <>
      <div className="section-heading"><div><p className="eyebrow green">WHERE WE’RE STAYING</p><h2>Our booked hotels.</h2></div><span className="quiet-label">Five hotels confirmed · Phuket pending</span></div>
      <div id="stay-cards" className="stay-grid">{P.stops.map(stop => <article className={`stay-card ${stop.hotel ? 'booked-stay' : 'pending-stay'}`} key={`${stop.city}-${stop.offset}`}>
        {stop.image ? <figure className="stay-photo"><img src={stop.image} alt={stop.imageAlt} loading="lazy" /><figcaption>Photo: <a href={stop.imageCreditUrl} target="_blank" rel="noopener noreferrer">{stop.imageCredit} ↗</a></figcaption></figure> : <div className="stay-photo-placeholder"><Icon name="palm" /><span>Hotel photo will appear here</span></div>}
        <div className="stay-card-body">
          <div className="stay-card-top"><span className="stay-icon"><Icon name={stop.key === 'bangkok' ? 'building' : 'palm'} /></span><span className={`stay-status ${stop.hotel ? 'booked' : 'pending'}`}>{stop.hotel ? 'Booked' : 'Hotel pending'}</span></div>
          <span className="eyebrow green">{stop.city.toUpperCase()} · {stop.nights} NIGHTS</span>
          <h3>{stop.hotel || 'Phuket hotel'}</h3>
          <p className="stay-dates">{dateLabel(stop.offset)} – {dateLabel(stop.offset + stop.nights)}</p>
          <div className="stay-guests"><Icon name="users" /><span>{stop.guestNote || `${stop.guests} people`}</span></div>
          <p className="stay-description">{stop.description}</p>
          <p className="stay-booking-note">{stop.bookingNote}</p>
          {!stop.hotel && <div className="stay-links" aria-label={`Accommodation searches for ${stop.city}`}>{Object.entries(stop.links).map(([name, url]) => <a key={name} href={url} target="_blank" rel="noopener noreferrer">{name} ↗</a>)}</div>}
        </div>
      </article>)}</div>
      <p className="footnote">The named properties are booked. Phuket accommodation has not been added to the plan yet; its saved search links use the fixed trip dates.</p>
    </>
  );
}
