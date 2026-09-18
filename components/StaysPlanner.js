'use client';

import Icon from './Icon';
import TripControls from './TripControls';
import { useTrip } from './TripProvider';

export default function StaysPlanner() {
  const { P, state, current, dateLabel, money } = useTrip();
  return (
    <>
      <TripControls />
      <div className="section-heading"><div><p className="eyebrow green">WHERE WE’RE STAYING</p><h2>Hotel searches for each stop.</h2></div><span className="quiet-label">Saved links · 2 people · 1 room</span></div>
      <div id="stay-cards" className="stay-grid">{P.stops.map(stop => <article className="stay-card" key={`${stop.city}-${stop.offset}`}><span className="stay-icon"><Icon name={stop.key === 'bangkok' ? 'building' : 'palm'} /></span><span className="eyebrow green">{stop.city.toUpperCase()} · {stop.nights} NIGHTS</span><h3>{dateLabel(stop.offset)} – {dateLabel(stop.offset + stop.nights)}</h3><p>{stop.area}. {stop.description}</p><div className="stay-price"><strong>{money(current.config[stop.key])}</strong><span> / room / night · our estimate</span></div><small>{money(current.config[stop.key] * state.rooms * stop.nights)} set aside for this stay</small><div className="stay-links" aria-label={`Our accommodation searches for ${stop.city}`}>{Object.entries(stop.links).map(([name, url]) => <a key={name} href={url} target="_blank" rel="noopener noreferrer">{name} ↗</a>)}</div></article>)}</div>
      <p className="footnote">The search links use our fixed dates, two adults and one room. Changing the controls updates estimates on this page, but not the supplied booking links.</p>
    </>
  );
}
