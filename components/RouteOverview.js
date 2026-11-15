'use client';

import { Fragment, useEffect, useState } from 'react';
import Icon from './Icon';
import WaterLight from './WaterLight';
import { useTrip } from './TripProvider';

// The lines each stop carried in the old destination and island cards.
const stopLines = [
  { line: 'Temples, neighborhoods and food we want to try', tags: ['Culture', 'Food'] },
  { line: 'Our base for Railay and the Hong Islands', tags: ['Beaches', 'Boats'] },
  { line: 'Beach time and a quiet sunset dinner', tags: [] },
  { line: 'The viewpoint, the village and the water', tags: [] },
  { line: 'Old Town, beach days and time to slow down', tags: [] },
  { line: null, tags: [] },
];

export default function RouteOverview() {
  const { P, state, dateLabel } = useTrip();
  const [nextIndex, setNextIndex] = useState(-1);
  const arrivals = [...P.internationalFlights, ...P.transfers];

  useEffect(() => {
    const today = Date.now();
    const index = P.stops.findIndex(stop => P.dateAt(state.start, stop.offset + stop.nights).getTime() > today);
    setNextIndex(index);
  }, [P, state.start]);

  return (
    <section className="route" aria-labelledby="route-title">
      <div className="container">
        <div className="route__head"><h2 id="route-title">Bangkok to the islands, and back.</h2><p className="lead">Six stays, without trying to do everything.</p></div>
        <ol id="route-stops" className="lanes" aria-label="Route: Bangkok, Ao Nang, Koh Lanta, Koh Phi Phi, Phuket, Bangkok">
          {P.stops.map((stop, index) => {
            const arrival = arrivals.find(travel => travel.offset === stop.offset);
            const extra = stopLines[index] || stopLines[5];
            return (
              <Fragment key={`${stop.city}-${stop.offset}`}>
                {arrival && <li className="lane-travel"><Icon name={arrival.mode === 'Flight' ? 'plane' : 'boat'} /><span>{arrival.mode}</span><span>{arrival.title}</span><span className="num">{arrival.time}</span></li>}
                <li className={`lane ${index === nextIndex ? 'lane--next' : ''}`}>
                  {index === nextIndex && <WaterLight still className="lane__light" />}
                  <p className="lane__dates num"><span>{dateLabel(stop.offset)}</span><span className="lane__to">to {dateLabel(stop.offset + stop.nights)}</span></p>
                  <div className="lane__place"><h3>{stop.city}</h3><p>{extra.line || stop.description}</p></div>
                  <div className="lane__stay"><strong>{stop.hotel || 'Hotel pending'}</strong><span>{stop.area}</span></div>
                  <p className="lane__meta"><span className="num">{stop.nights} nights</span><span>{stop.guestNote || `${stop.guests} people`}</span>{index === nextIndex && <span className="lane__state" role="status">Next stay</span>}</p>
                </li>
              </Fragment>
            );
          })}
          <li className="lane-travel"><Icon name="plane" /><span>Flight</span><span>{P.internationalFlights[1].title}</span><span className="num">{P.internationalFlights[1].time}</span></li>
        </ol>
        <div className="route__cities">
          <figure className="route__photo" data-slot="bangkok" data-alt="Bangkok street life, Chinatown at dusk">
            <img src="https://images.unsplash.com/photo-1508009603885-50cf7c579365?auto=format&fit=crop&w=1600&q=80" width="1600" height="1067" alt="Street life in Bangkok’s Chinatown" loading="lazy" />
          </figure>
          <div className="route__notes">
            <article><h3>Bangkok</h3><p>{stopLines[0].line}</p><p className="route__tags">Culture, food, 3 nights + 2 final nights</p></article>
            <article><h3>Ao Nang, Krabi</h3><p>{stopLines[1].line}</p><p className="route__tags">Beaches, boats, 3 nights</p></article>
            <article><h3>Koh Lanta</h3><p>{stopLines[2].line}</p><p className="route__tags">2 nights</p></article>
            <article><h3>Koh Phi Phi</h3><p>{stopLines[3].line}</p><p className="route__tags">2 nights</p></article>
            <article><h3>Phuket</h3><p>{stopLines[4].line}</p><p className="route__tags">4 nights</p></article>
          </div>
        </div>
      </div>
    </section>
  );
}
