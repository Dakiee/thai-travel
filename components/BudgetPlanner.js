'use client';

import Icon from './Icon';
import TripControls from './TripControls';
import { useTrip } from './TripProvider';

export default function BudgetPlanner() {
  const { state, setState, current, money, downloadTrip, openSettings } = useTrip();
  return (
    <section className="budget container" aria-labelledby="budget-title">
      <TripControls />
      <div className="budget__grid">
        <div className="budget__ledger">
          <div className="budget__ledger-head">
            <h2 id="budget-title">What we’re setting aside.</h2>
            <label className="select-control budget-style"><span className="visually-hidden">Travel budget style</span><select value={state.style} onChange={event => setState(value => ({ ...value, style: event.target.value }))} aria-label="Travel budget style"><option value="value">Our base estimate</option><option value="comfort">Give ourselves more room</option></select><Icon name="chevron" className="select-control__chevron" /></label>
          </div>
          <table className="ledger">
            <caption className="visually-hidden">Whole-trip breakdown</caption>
            <thead><tr><th scope="col">Whole-trip breakdown</th><th scope="col" className="ledger__amount">Estimate</th></tr></thead>
            <tbody>
              {current.breakdown.map(item => <tr key={item.key}><th scope="row"><span className="ledger__name"><Icon name={item.icon} />{item.label}</span><small>{item.detail}</small></th><td className="ledger__amount num">{money(item.amount)}</td></tr>)}
              <tr className="ledger__buffer"><th scope="row"><span className="ledger__name"><Icon name="shield" />Room for the unexpected</span><small>10% cushion</small></th><td className="ledger__amount num">{money(current.buffer)}</td></tr>
            </tbody>
            <tfoot><tr><th scope="row"><span className="ledger__name">Our estimated total</span><small>{state.adults === 2 ? 'For both of us' : `For ${state.adults} people`}</small></th><td className="ledger__amount num">{money(current.total)}</td></tr></tfoot>
          </table>
        </div>
        <aside className="budget__figure" aria-label="Estimated cost per person">
          <p className="budget__per-person num">≈ {money(current.perPerson)}</p>
          <p className="budget__unit">estimated / person</p>
          <p className="budget-exchange">{state.currency === 'MNT' ? `Around ${money(current.perPerson, 'USD')} USD each` : `Around ${money(current.perPerson, 'MNT')} MNT each`}, with our 10% cushion</p>
          <p className="budget-scope">17 days, {state.adults} adults, {state.rooms} room{state.rooms > 1 ? 's' : ''}</p>
          <div className="budget__actions">
            <button className="btn btn--primary" type="button" onClick={downloadTrip}><Icon name="download" /> Download our plan</button>
            <a className="btn btn--quiet" href="/print" target="_blank" rel="noopener"><Icon name="print" /> Open full printable plan</a>
          </div>
        </aside>
      </div>
      <div className="budget-notes">
        <article><h3>These are working numbers</h3><p>None of the amounts are bookings. We should replace estimates with actual totals as we confirm flights, rooms and ferries.</p></article>
        <article><h3>Conversion assumptions</h3><p>USD 1 = THB {state.usdRate.toLocaleString('en-US')} and THB 1 = MNT {state.mntRate.toLocaleString('en-US')}.</p><button className="text-link" type="button" onClick={openSettings}>Edit rates and rooms</button></article>
        <article><h3>Keep the cushion</h3><p>The 10% buffer is for baggage, local fees, fare changes and the things we decide to do once we’re there.</p></article>
      </div>
    </section>
  );
}
