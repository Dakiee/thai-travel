'use client';

import Icon from './Icon';
import { useTrip } from './TripProvider';

export default function PrintDocument() {
  const { P, state, current, dateLabel, money, priceRange } = useTrip();

  return (
    <main id="main-content" className="print-document container">
      <section className="print-cover">
        <h1>Thailand,<br />here we come.</h1>
        <p className="lead">Our complete trip plan.</p>
        <p className="print-route">Bangkok → Ao Nang → Koh Lanta → Koh Phi Phi → Phuket → Bangkok</p>
        <dl className="print-cover-meta">
          <div><dt>Dates</dt><dd>16 January to 1 February 2027</dd></div>
          <div><dt>Length</dt><dd>17 days, 16 nights</dd></div>
          <div><dt>Group</dt><dd>{state.adults} adults, {state.rooms} room{state.rooms > 1 ? 's' : ''}</dd></div>
        </dl>
        <p className="print-disclaimer">Hotel names reflect our bookings. Remaining prices are working estimates.</p>
      </section>

      <section className="print-section">
        <h2><span className="print-number num">1</span>Our route and stays.</h2>
        <ol className="print-stops">{P.stops.map(stop => <li key={`${stop.city}-${stop.offset}`}><h3>{stop.city}</h3><p className="num">{dateLabel(stop.offset)} to {dateLabel(stop.offset + stop.nights)}, {stop.nights} night{stop.nights > 1 ? 's' : ''}</p><p className="print-muted">{stop.hotel || 'Hotel details pending'}, {stop.guestNote || `${stop.guests} people`}</p></li>)}</ol>
      </section>

      <section className="print-section print-page-break">
        <h2><span className="print-number num">2</span>Our booked hotels.</h2>
        <p className="print-lead">All six properties are booked.</p>
        <div className="print-stay-grid">{P.stops.map(stop => <article className="print-stay" key={`${stop.city}-${stop.offset}`}><h3>{stop.city}</h3><p className="num">{dateLabel(stop.offset)} to {dateLabel(stop.offset + stop.nights)}, {stop.nights} nights</p><p><strong>{stop.hotel || 'Hotel pending'}</strong> <span className="print-muted">({stop.hotel ? 'booked' : 'not yet added'})</span></p><p className="print-muted">{stop.guestNote || `${stop.guests} people`}, {stop.area}</p>{!stop.hotel && <p>{Object.entries(stop.links).map(([name, url]) => <a href={url} target="_blank" rel="noopener noreferrer" key={name}>{name}</a>)}</p>}</article>)}</div>
      </section>

      <section className="print-section print-page-break">
        <h2><span className="print-number num">3</span>Our flights and ferries.</h2>
        <p className="print-lead">Confirm terminals, piers, baggage and local transfers before each travel day.</p>
        <table className="print-table">
          <thead><tr><th scope="col">Date</th><th scope="col">Route</th><th scope="col">How</th><th scope="col">Time</th><th scope="col" className="print-amount">Per person</th></tr></thead>
          <tbody>{P.transfers.map(transfer => <tr key={transfer.id}><td className="num">{dateLabel(transfer.offset)}</td><td>{transfer.title}</td><td>{transfer.mode}{transfer.booked ? ', booked' : ''}</td><td className="num">{transfer.time || 'To confirm'}</td><td className="print-amount num">{priceRange(transfer.min, transfer.max)}</td></tr>)}</tbody>
        </table>
      </section>

      <section className="print-section print-page-break">
        <h2><span className="print-number num">4</span>Our working budget.</h2>
        <dl className="print-budget-summary"><div><dt>Estimated per person</dt><dd className="num">{money(current.perPerson)}</dd></div><div><dt>For our group</dt><dd className="num">{money(current.total)}</dd></div></dl>
        <table className="print-table"><thead><tr><th scope="col">Category</th><th scope="col">What it covers</th><th scope="col" className="print-amount">Estimate</th></tr></thead><tbody>{current.breakdown.map(item => <tr key={item.key}><td>{item.label}</td><td>{item.detail}</td><td className="print-amount num">{money(item.amount)}</td></tr>)}<tr><td>Room for the unexpected</td><td>10% planning cushion</td><td className="print-amount num">{money(current.buffer)}</td></tr></tbody></table>
        <p className="print-fine">Planning rates: USD 1 = THB {state.usdRate.toLocaleString('en-US')}; THB 1 = MNT {state.mntRate.toLocaleString('en-US')}. International airfare, exchange rates and all unbooked prices must be rechecked.</p>
      </section>

      <section className="print-section print-page-break">
        <h2><span className="print-number num">5</span>Our 17-day itinerary.</h2>
        <div className="print-days">{current.plan.map((day, index) => {
          const transfers = P.transfers.filter(transfer => transfer.offset === index);
          const transferMin = transfers.reduce((sum, transfer) => sum + transfer.min, 0);
          const transferMax = transfers.reduce((sum, transfer) => sum + transfer.max, 0);
          return <article className="print-day" key={day.id}>
            <header><p className="print-day-number num">Day {index + 1}</p><div><p className="print-muted">{dateLabel(index)}, {day.city}, {day.category.toLowerCase()}</p><h3>{day.title}</h3><p>{day.subtitle}</p></div><p className="print-day-cost num">{transfers.length ? priceRange(transferMin, transferMax) : day.cost ? money(day.cost) : 'No fee'}<small>{transfers.length ? ' transport / person' : day.cost ? ' activities / person' : ' planned'}</small></p></header>
            <dl className="print-day-slots">{day.slots.map(([time, text]) => <div key={time}><dt>{time}</dt><dd>{text}</dd></div>)}</dl>
            <p className="print-tip"><Icon name="sparkles" /><span>{day.tip}</span></p>
          </article>;
        })}</div>
      </section>

      <section className="print-section print-sources">
        <h2><span className="print-number num">6</span>Sources to recheck.</h2>
        {P.sources.map(source => <p key={source.id}><a href={source.url} target="_blank" rel="noopener noreferrer">{source.name}</a><span>{source.note}</span></p>)}
      </section>

      <div className="print-actions"><button className="btn btn--primary" type="button" onClick={() => window.print()}><Icon name="print" /> Print / save as PDF</button><a className="btn btn--quiet" href="/budget">Back to budget</a></div>
    </main>
  );
}
