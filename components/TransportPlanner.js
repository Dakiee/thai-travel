'use client';

import Icon from './Icon';
import { useTrip } from './TripProvider';

export default function TransportPlanner() {
  const { P, dateLabel } = useTrip();
  const travelDays = [...P.internationalFlights, ...P.transfers].sort((a, b) => a.offset - b.offset);
  return (
    <section className="transport container" aria-labelledby="travel-days-title">
      <div className="transport__head"><h2 id="travel-days-title">When we’re moving.</h2><p className="transport__count">Seven travel days</p></div>
      <div className="timetable-wrap">
        <table className="timetable">
          <caption className="visually-hidden">Our flights and ferries</caption>
          <thead><tr><th scope="col">Date</th><th scope="col">Time</th><th scope="col">Our route</th><th scope="col">How</th></tr></thead>
          <tbody>{travelDays.map(transfer => <tr key={transfer.id}>
            <td className="timetable__date num">{dateLabel(transfer.offset)}</td>
            <td className="timetable__time num">{transfer.time || 'To confirm'}</td>
            <th scope="row" className="timetable__route">{transfer.title}<small>{transfer.route}</small></th>
            <td className="timetable__mode"><span className="timetable__how"><Icon name={transfer.mode === 'Flight' ? 'plane' : 'boat'} />{transfer.mode}</span>{transfer.booked && <small className="timetable__booked">Booked</small>}</td>
          </tr>)}</tbody>
        </table>
      </div>
      <div className="flight-advice">
        <article><h3>Fly into Krabi, out of Phuket.</h3><p>The ferries connect the islands in order. The Phuket flight lands at Don Mueang (DMK); we still need to check which Bangkok airport the Krabi flight uses.</p></article>
        <article><h3>Keep the last two Bangkok nights.</h3><p>They give us a buffer before flying home and avoid a stressful same-day connection.</p></article>
      </div>
    </section>
  );
}
