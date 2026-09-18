'use client';

import Icon from './Icon';
import TripControls from './TripControls';
import { useTrip } from './TripProvider';

export default function TransportPlanner() {
  const { P, state, current, dateLabel, priceRange } = useTrip();
  return (
    <>
      <TripControls />
      <div className="transport-summary"><div><span className="eyebrow green">ROUGH COST EACH</span><strong>{priceRange(current.transportRange.min, current.transportRange.max)}</strong><span>{priceRange(current.transportRange.min * state.adults, current.transportRange.max * state.adults)} for {state.adults === 2 ? 'both of us' : `${state.adults} people`}</span></div><p>Domestic flights and ferries only. We still need to allow for bags and rides between airports, piers and hotels.</p></div>
      <div className="flight-price-grid">{P.transfers.map(transfer => <article className={`fare-card ${transfer.mode === 'Ferry' ? 'published-fare' : ''}`} key={transfer.id}><div className="fare-card-top"><span className={`price-status ${transfer.mode === 'Flight' ? 'estimate' : 'published'}`}>{transfer.status}</span><span><Icon name={transfer.mode === 'Flight' ? 'plane' : 'boat'} /></span></div><h3>{transfer.title}</h3><p className="fare-route">{transfer.route}</p><div className="source-fare-amount">{priceRange(transfer.min, transfer.max)} <small>/ adult</small></div><p className="original-fare-price">THB {transfer.min.toLocaleString('en-US')}{transfer.min !== transfer.max ? `–${transfer.max.toLocaleString('en-US')}` : ''} · one way</p><p className="fare-date">{dateLabel(transfer.offset)} 2027 · {transfer.mode}</p><p className="fare-explanation">{transfer.note}</p><a className="fare-source-link" href={transfer.url} target="_blank" rel="noopener noreferrer">{transfer.source} ↗</a></article>)}</div>
      <p className="footnote">The linked searches use our fixed transfer dates: 19, 22, 24, 26 and 30 January 2027. We’ll check the full fare, baggage and transfer details before paying.</p>
      <div className="flight-section"><div className="section-heading"><div><p className="eyebrow green">TRAVEL DAYS</p><h2>When we’re moving.</h2></div><span className="quiet-label">Rough one-way cost · each</span></div><div className="flight-table-wrap"><table><caption className="sr-only">Our flights and ferries</caption><thead><tr><th>Date</th><th>Our route</th><th>How</th><th>Rough cost each</th></tr></thead><tbody>{P.transfers.map(transfer => <tr key={transfer.id}><td>{dateLabel(transfer.offset)}</td><td>{transfer.title}<small>{transfer.route}</small></td><td>{transfer.mode}</td><td>{priceRange(transfer.min, transfer.max)}<small>{transfer.status}</small></td></tr>)}</tbody></table></div><div className="flight-advice"><p><strong>Fly into Krabi, out of Phuket.</strong> The ferries connect the islands in order. We need to double-check whether our Bangkok flights use BKK or DMK.</p><p><strong>Keep the last two Bangkok nights.</strong> They give us a buffer before flying home and avoid a stressful same-day connection.</p></div></div>
    </>
  );
}
