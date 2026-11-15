'use client';

import { useTrip } from './TripProvider';

export default function OverviewFacts() {
  const { current, dateLabel, money } = useTrip();
  return (
    <dl className="trip-facts" aria-label="Trip overview">
      <div><dt>When</dt><dd className="trip-facts__figure">{dateLabel(0)} to {dateLabel(16)} 2027</dd><dd>17 days, 16 nights</dd></div>
      <div><dt>Who</dt><dd className="trip-facts__figure">5 → 7 people travelling</dd><dd>Two friends join at Phi Phi</dd></div>
      <div><dt>Where</dt><dd className="trip-facts__figure">Bangkok + the Andaman</dd><dd>5 places, 6 stays</dd></div>
      <div><dt>Rough cost each</dt><dd className="trip-facts__figure">≈ {money(current.perPerson)}</dd><dd>Based on the selected budget group</dd></div>
    </dl>
  );
}
