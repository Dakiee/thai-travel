'use client';

import Icon from './Icon';
import { useTrip } from './TripProvider';

export default function PrintDocument() {
  const { P, state, current, dateLabel, money, priceRange } = useTrip();

  return (
    <main id="main-content" className="print-document">
      <section className="print-cover">
        <p className="eyebrow">OUR COMPLETE TRIP PLAN</p>
        <h1>Thailand,<br />here we come.</h1>
        <p className="print-route">Bangkok → Ao Nang → Koh Lanta → Koh Phi Phi → Phuket → Bangkok</p>
        <div className="print-cover-meta">
          <span>16 January – 1 February 2027</span>
          <span>17 days · 16 nights</span>
          <span>{state.adults} adults · {state.rooms} room{state.rooms > 1 ? 's' : ''}</span>
        </div>
        <p className="print-disclaimer">Working plan generated from our travel board. Prices are estimates until booked.</p>
      </section>

      <section className="print-section">
        <div className="print-section-heading"><span>01</span><div><p className="eyebrow green">AT A GLANCE</p><h2>Our route and stays.</h2></div></div>
        <div className="print-stops">{P.stops.map((stop, index) => <article key={`${stop.city}-${stop.offset}`}><span>{String(index + 1).padStart(2, '0')}</span><div><h3>{stop.city}</h3><p>{dateLabel(stop.offset)} → {dateLabel(stop.offset + stop.nights)} · {stop.nights} night{stop.nights > 1 ? 's' : ''}</p><small>{stop.area}</small></div></article>)}</div>
      </section>

      <section className="print-section print-page-break">
        <div className="print-section-heading"><span>02</span><div><p className="eyebrow green">PLACES TO STAY</p><h2>Our accommodation searches.</h2></div></div>
        <p className="print-lead">These links contain the original fixed dates for two adults. Recheck the dates, cancellation policy, taxes and final total before paying.</p>
        <div className="print-stay-grid">{P.stops.map(stop => <article className="print-stay" key={`${stop.city}-${stop.offset}`}><div><h3>{stop.city}</h3><p>{dateLabel(stop.offset)} → {dateLabel(stop.offset + stop.nights)} · {stop.nights} nights</p></div><strong>{money(current.config[stop.key])}<small> / room / night estimate</small></strong><p>{stop.area}</p><div>{Object.entries(stop.links).map(([name, url]) => <a href={url} target="_blank" rel="noopener noreferrer" key={name}>{name} ↗</a>)}</div></article>)}</div>
      </section>

      <section className="print-section print-page-break">
        <div className="print-section-heading"><span>03</span><div><p className="eyebrow green">GETTING AROUND</p><h2>Our flights and ferries.</h2></div></div>
        <p className="print-lead">Transport links are saved searches, not reservations. Confirm terminals, piers, baggage and local transfers.</p>
        <div className="print-transfer-list">{P.transfers.map(transfer => <article key={transfer.id}><div className="print-transfer-date"><strong>{dateLabel(transfer.offset)}</strong><span>{transfer.mode}</span></div><div><h3>{transfer.title}</h3><p>{transfer.note}</p><a href={transfer.url} target="_blank" rel="noopener noreferrer">Open saved 12Go search ↗</a></div><strong>{priceRange(transfer.min, transfer.max)}<small> / person</small></strong></article>)}</div>
      </section>

      <section className="print-section print-page-break">
        <div className="print-section-heading"><span>04</span><div><p className="eyebrow green">THE NUMBERS</p><h2>Our working budget.</h2></div></div>
        <div className="print-budget-summary"><div><small>ESTIMATED PER PERSON</small><strong>{money(current.perPerson)}</strong></div><div><small>FOR OUR GROUP</small><strong>{money(current.total)}</strong></div></div>
        <table className="print-table"><thead><tr><th>Category</th><th>What it covers</th><th>Estimate</th></tr></thead><tbody>{current.breakdown.map(item => <tr key={item.key}><td>{item.label}</td><td>{item.detail}</td><td>{money(item.amount)}</td></tr>)}<tr><td>Room for the unexpected</td><td>10% planning cushion</td><td>{money(current.buffer)}</td></tr></tbody></table>
        <p className="print-fine">Planning rates: USD 1 = THB {state.usdRate.toLocaleString('en-US')} · THB 1 = MNT {state.mntRate.toLocaleString('en-US')}. International airfare, exchange rates and all unbooked prices must be rechecked.</p>
      </section>

      <section className="print-section print-page-break">
        <div className="print-section-heading"><span>05</span><div><p className="eyebrow green">DAY BY DAY</p><h2>Our 17-day itinerary.</h2></div></div>
        <div className="print-days">{current.plan.map((day, index) => {
          const transfers = P.transfers.filter(transfer => transfer.offset === index);
          const transferMin = transfers.reduce((sum, transfer) => sum + transfer.min, 0);
          const transferMax = transfers.reduce((sum, transfer) => sum + transfer.max, 0);
          return <article className="print-day" key={day.id}><header><span>DAY {String(index + 1).padStart(2, '0')}</span><div><small>{dateLabel(index)} · {day.city.toUpperCase()} · {day.category}</small><h3>{day.title}</h3><p>{day.subtitle}</p></div><strong>{transfers.length ? priceRange(transferMin, transferMax) : day.cost ? money(day.cost) : 'No fee'}<small>{transfers.length ? ' transport / person' : day.cost ? ' activities / person' : ' planned'}</small></strong></header><div className="print-day-slots">{day.slots.map(([time, text]) => <div key={time}><b>{time}</b><p>{text}</p></div>)}</div><p className="print-tip"><Icon name="sparkles" /> {day.tip}</p></article>;
        })}</div>
      </section>

      <section className="print-section print-sources">
        <div className="print-section-heading"><span>06</span><div><p className="eyebrow green">REFERENCE</p><h2>Sources to recheck.</h2></div></div>
        {P.sources.map(source => <p key={source.id}><a href={source.url} target="_blank" rel="noopener noreferrer">{source.name} ↗</a><span>{source.note}</span></p>)}
      </section>

      <div className="print-actions"><button className="button green-button" type="button" onClick={() => window.print()}><Icon name="print" /> Print / save as PDF</button><a className="button outline" href="/budget">Back to budget</a></div>
    </main>
  );
}
