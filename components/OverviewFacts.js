'use client';

import Icon from './Icon';
import { useTrip } from './TripProvider';

export default function OverviewFacts() {
  const { state, current, dateLabel, money } = useTrip();
  const doubles = state.adults - state.rooms;
  const singles = state.rooms - doubles;
  const roomSplit = [...Array(doubles).fill(2), ...Array(singles).fill(1)].join(' + ');
  return <section className="trip-facts" aria-label="Trip overview"><div><span className="fact-icon"><Icon name="calendar" /></span><div><small>WHEN</small><strong>{dateLabel(0)} – {dateLabel(16)} 2027</strong><span>17 days · 16 nights</span></div></div><div><span className="fact-icon"><Icon name="users" /></span><div><small>WHO</small><strong>{state.adults === 2 ? 'The two of us' : `${state.adults} people travelling`}</strong><span>{state.rooms} room{state.rooms > 1 ? `s · ${roomSplit}` : ''}</span></div></div><div><span className="fact-icon"><Icon name="pin" /></span><div><small>WHERE</small><strong>Bangkok + the Andaman</strong><span>5 places · 6 stays</span></div></div><div><span className="fact-icon"><Icon name="wallet" /></span><div><small>ROUGH COST EACH</small><strong>≈ {money(current.perPerson)}</strong><span>Including our 10% cushion</span></div></div></section>;
}
