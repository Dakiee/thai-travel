'use client';

import Icon from './Icon';
import { useTrip } from './TripProvider';

export default function TripControls() {
  const { state, setState, setAdults, openSettings } = useTrip();
  return (
    <section className="trip-controls" aria-label="Adjust our trip view">
      <p className="trip-controls__length"><span className="control-label">Our trip at a glance</span><span className="trip-controls__days">17 days, 16 nights</span></p>
      <div className="trip-controls__set">
        <label className="select-control"><Icon name="users" /><select value={state.adults} onChange={event => setAdults(Number(event.target.value))} aria-label="Number of adults">{[1,2,3,4,5,6,7,8].map(number => <option key={number} value={number}>{number} adult{number > 1 ? 's' : ''}</option>)}</select><Icon name="chevron" className="select-control__chevron" /></label>
        <label className="select-control"><Icon name="globe" /><select value={state.currency} onChange={event => setState(value => ({ ...value, currency: event.target.value }))} aria-label="Display currency"><option value="MNT">MNT ₮</option><option value="USD">USD $</option><option value="THB">THB ฿</option></select><Icon name="chevron" className="select-control__chevron" /></label>
        <button type="button" onClick={openSettings} className="btn btn--quiet btn--small"><Icon name="sliders" /> Trip settings</button>
      </div>
    </section>
  );
}
