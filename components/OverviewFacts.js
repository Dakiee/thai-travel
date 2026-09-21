'use client';

import Icon from './Icon';
import { useTrip } from './TripProvider';

export default function OverviewFacts() {
  const { current, dateLabel, money } = useTrip();
  return <section className="trip-facts" aria-label="Trip overview"><div><span className="fact-icon"><Icon name="calendar" /></span><div><small>WHEN</small><strong>{dateLabel(0)} – {dateLabel(16)} 2027</strong><span>17 days · 16 nights</span></div></div><div><span className="fact-icon"><Icon name="users" /></span><div><small>WHO</small><strong>5 → 7 people travelling</strong><span>Two friends join at Phi Phi</span></div></div><div><span className="fact-icon"><Icon name="pin" /></span><div><small>WHERE</small><strong>Bangkok + the Andaman</strong><span>5 places · 6 stays</span></div></div><div><span className="fact-icon"><Icon name="wallet" /></span><div><small>ROUGH COST EACH</small><strong>≈ {money(current.perPerson)}</strong><span>Based on the selected budget group</span></div></div></section>;
}
