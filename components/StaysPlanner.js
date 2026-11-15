'use client';

import Icon from './Icon';
import { useTrip } from './TripProvider';

export default function StaysPlanner() {
  const { P, dateLabel } = useTrip();
  return (
    <section className="stays container" aria-labelledby="stays-title">
      <div className="stays__head"><h2 id="stays-title">Our booked hotels.</h2><p className="stays__state" role="status">All six stays confirmed</p></div>
      <ol id="stay-cards" className="stay-list">{P.stops.map((stop, index) => <li className={`stay ${stop.hotel ? 'stay--booked' : 'stay--pending'}`} key={`${stop.city}-${stop.offset}`}>
        {stop.image ? <figure className="stay__photo" data-slot={`stay-${index + 1}`} data-alt={stop.imageAlt}><img src={stop.image} alt={stop.imageAlt} width="1024" height="768" loading="lazy" /><span className="stay__fallback"><Icon name="palm" /><span>Photo of {stop.hotel} could not load</span></span></figure> : <div className="stay__photo stay__photo--empty"><Icon name="palm" /><span>Hotel photo will appear here</span></div>}
        <div className="stay__body">
          <p className="stay__date num">{dateLabel(stop.offset)}</p>
          <p className="stay__where"><span>{stop.city}</span><span className={`stay__status ${stop.hotel ? 'is-booked' : 'is-pending'}`}>{stop.hotel ? 'Booked' : 'Hotel pending'}</span></p>
          <h3>{stop.hotel || 'Phuket hotel'}</h3>
          <dl className="stay__facts">
            <div><dt>Dates</dt><dd className="num">{dateLabel(stop.offset)} to {dateLabel(stop.offset + stop.nights)}</dd></div>
            <div><dt>Nights</dt><dd className="num">{stop.nights}</dd></div>
            <div><dt>Guests</dt><dd>{stop.guestNote || `${stop.guests} people`}</dd></div>
          </dl>
          <p className="stay__description">{stop.description}</p>
          {!stop.hotel && <p className="stay__links" aria-label={`Accommodation searches for ${stop.city}`}>{Object.entries(stop.links).map(([name, url]) => <a key={name} href={url} target="_blank" rel="noopener noreferrer">{name}<span className="visually-hidden"> (opens in a new tab)</span></a>)}</p>}
        </div>
      </li>)}</ol>
      <p className="footnote">All six properties are booked.</p>
    </section>
  );
}
