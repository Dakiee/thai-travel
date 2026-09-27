'use client';

import Icon from './Icon';
import { useTrip } from './TripProvider';

export default function TransportPlanner() {
  const { P, dateLabel } = useTrip();
  const travelDays = [...P.internationalFlights, ...P.transfers].sort((a, b) => a.offset - b.offset);
  return (
    <>
      <div className="flight-price-grid">{P.transfers.map(transfer => <article className={`fare-card ${transfer.mode === 'Ferry' ? 'published-fare' : ''}`} key={transfer.id}><div className="fare-card-top"><span className={`price-status ${transfer.time ? 'published' : 'estimate'}`}>{transfer.time || 'Time to confirm'}</span><span><Icon name={transfer.mode === 'Flight' ? 'plane' : 'boat'} /></span></div><h3>{transfer.title}</h3><p className="fare-route">{transfer.route}</p><p className="fare-date">{dateLabel(transfer.offset)} 2027 · {transfer.mode}</p><p className="fare-explanation">{transfer.note}</p><a className="fare-source-link" href={transfer.url} target="_blank" rel="noopener noreferrer">{transfer.source} ↗</a></article>)}</div>
      <p className="footnote">The linked searches use our fixed transfer dates: 19, 22, 24, 26 and 30 January 2027. We’ll double-check baggage and transfer details before each travel day.</p>
      <div className="flight-section"><div className="section-heading"><div><p className="eyebrow green">TRAVEL DAYS</p><h2>When we’re moving.</h2></div><span className="quiet-label">Seven travel days</span></div><div className="flight-table-wrap"><table><caption className="sr-only">Our flights and ferries</caption><thead><tr><th>Date</th><th>Our route</th><th>How</th><th>Time</th></tr></thead><tbody>{travelDays.map(transfer => <tr key={transfer.id}><td>{dateLabel(transfer.offset)}</td><td>{transfer.title}<small>{transfer.route}</small></td><td>{transfer.mode}</td><td>{transfer.time || 'To confirm'}</td></tr>)}</tbody></table></div><div className="flight-advice"><p><strong>Fly into Krabi, out of Phuket.</strong> The ferries connect the islands in order. We need to double-check whether our Bangkok flights use BKK or DMK.</p><p><strong>Keep the last two Bangkok nights.</strong> They give us a buffer before flying home and avoid a stressful same-day connection.</p></div></div>
    </>
  );
}
