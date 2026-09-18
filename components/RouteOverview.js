'use client';

import { Fragment } from 'react';
import Icon from './Icon';
import { useTrip } from './TripProvider';

export default function RouteOverview() {
  const { P, dateLabel } = useTrip();
  return (
    <section className="route-section" aria-labelledby="route-title">
      <div className="section-heading"><div><p className="eyebrow green">OUR ROUTE</p><h2 id="route-title">Bangkok to the islands — and back.</h2></div><p>Six stays, without trying to do everything.</p></div>
      <div className="destination-grid"><article className="destination bangkok"><img src="https://images.unsplash.com/photo-1508009603885-50cf7c579365?auto=format&fit=crop&w=900&q=80" alt="Street life in Bangkok’s Chinatown" loading="lazy" /><div className="destination-shade" /><span className="destination-number">STOP 1 + 6</span><div className="destination-copy"><h3>Bangkok</h3><p>Temples, neighborhoods and food we want to try</p><div><span>Culture</span><span>Food</span><span>3 nights + 2 final nights</span></div></div></article><article className="destination krabi"><img src="https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&w=900&q=80" alt="Longtail boats on the Krabi coast" loading="lazy" /><div className="destination-shade" /><span className="destination-number">STOP 2</span><div className="destination-copy"><h3>Ao Nang, Krabi</h3><p>Our base for Railay and the Hong Islands</p><div><span>Beaches</span><span>Boats</span><span>3 nights</span></div></div></article></div>
      <div className="island-preview"><article><span className="eyebrow green">STOP 3</span><h3>Koh Lanta</h3><p>Beach time and a quiet sunset dinner</p><strong>2 nights</strong></article><article><span className="eyebrow green">STOP 4</span><h3>Koh Phi Phi</h3><p>The viewpoint, the village and the water</p><strong>2 nights</strong></article><article><span className="eyebrow green">STOP 5</span><h3>Phuket</h3><p>Old Town, beach days and time to slow down</p><strong>4 nights</strong></article></div>
      <div id="route-stops" className="route-line" aria-label="Route: Bangkok, Ao Nang, Koh Lanta, Koh Phi Phi, Phuket, Bangkok">{P.stops.map((stop, index) => <Fragment key={`${stop.city}-${stop.offset}`}>{index > 0 && <span className="route-connector"><Icon name={index === 1 || index === 5 ? 'plane' : 'boat'} /></span>}<div><span className={`route-dot ${stop.key === 'bangkok' ? '' : 'coast'}`} /><strong>{stop.city}</strong><small>{stop.nights} nights</small><small>{dateLabel(stop.offset)} – {dateLabel(stop.offset + stop.nights)}</small></div></Fragment>)}</div>
    </section>
  );
}
