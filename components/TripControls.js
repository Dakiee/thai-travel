'use client';

import Icon from './Icon';
import { useTrip } from './TripProvider';

export default function TripControls() {
  const { state, setState, setAdults, openSettings } = useTrip();
  return (
    <section className="trip-controls" aria-label="Adjust our trip view">
      <div className="duration-control"><span className="control-label">Our trip at a glance</span><span className="trip-length-pill">17 days <span>·</span> 16 nights</span></div>
      <div className="right-controls">
        <label className="select-control"><Icon name="users" /><select value={state.adults} onChange={event => setAdults(Number(event.target.value))} aria-label="Number of adults">{[1,2,3,4,5,6,7,8].map(number => <option key={number} value={number}>{number} adult{number > 1 ? 's' : ''}</option>)}</select></label>
        <label className="select-control"><Icon name="globe" /><select value={state.currency} onChange={event => setState(value => ({ ...value, currency: event.target.value }))} aria-label="Display currency"><option value="MNT">MNT ₮</option><option value="USD">USD $</option><option value="THB">THB ฿</option></select></label>
        <button type="button" onClick={openSettings} className="text-button"><Icon name="sliders" /> Trip settings</button>
      </div>
    </section>
  );
}
