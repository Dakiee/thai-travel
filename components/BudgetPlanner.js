'use client';

import Icon from './Icon';
import TripControls from './TripControls';
import { useTrip } from './TripProvider';

export default function BudgetPlanner() {
  const { state, setState, current, money, downloadTrip, openSettings } = useTrip();
  return (
    <>
      <TripControls />
      <div className="budget-page-grid">
        <div className="budget-card"><div className="budget-top"><span className="eyebrow green">OUR ROUGH BUDGET</span><span><Icon name="wallet" /></span></div><h2>What we’re setting aside.</h2><label className="budget-style"><select value={state.style} onChange={event => setState(value => ({ ...value, style: event.target.value }))} aria-label="Travel budget style"><option value="value">Our base estimate</option><option value="comfort">Give ourselves more room</option></select></label><div className="per-person"><span>≈ {money(current.perPerson)}</span><small>estimated / person</small></div><p className="budget-exchange">{state.currency === 'MNT' ? `Around ${money(current.perPerson, 'USD')} USD each` : `Around ${money(current.perPerson, 'MNT')} MNT each`} · with our 10% cushion</p><div className="budget-scope">17 days · {state.adults} adults · {state.rooms} room{state.rooms > 1 ? 's' : ''}</div><p className="group-label">WHOLE-TRIP BREAKDOWN</p><div>{current.breakdown.map(item => <div className="budget-line" key={item.key}><span><Icon name={item.icon} /></span><div><div className="line-name">{item.label}</div><small>{item.detail}</small></div><strong>{money(item.amount)}</strong></div>)}</div><div className="buffer-row"><span>Room for the unexpected <small>10% cushion</small></span><strong>{money(current.buffer)}</strong></div><div className="group-total"><div><span>Our estimated total</span><small>{state.adults === 2 ? 'For both of us' : `For ${state.adults} people`}</small></div><strong>{money(current.total)}</strong></div><button className="button green-button full" type="button" onClick={downloadTrip}><Icon name="download" /> Download our plan</button><a className="text-button print-button" href="/print" target="_blank" rel="noopener"><Icon name="print" /> Open full printable plan</a></div>
        <div className="budget-notes"><article><span><Icon name="sparkles" /></span><div><h3>These are working numbers</h3><p>None of the amounts are bookings. We should replace estimates with actual totals as we confirm flights, rooms and ferries.</p></div></article><article><span><Icon name="globe" /></span><div><h3>Conversion assumptions</h3><p>USD 1 = THB {state.usdRate.toLocaleString('en-US')} and THB 1 = MNT {state.mntRate.toLocaleString('en-US')}.</p><button className="text-button" type="button" onClick={openSettings}>Edit rates and rooms →</button></div></article><article><span><Icon name="heart" /></span><div><h3>Keep the cushion</h3><p>The 10% buffer is for baggage, local fees, fare changes and the things we decide to do once we’re there.</p></div></article></div>
      </div>
    </>
  );
}
