'use client';

import { useState } from 'react';
import Icon from './Icon';
import TripControls from './TripControls';
import { useTrip } from './TripProvider';

const filters = [['all','The whole trip'],['Bangkok','Bangkok'],['Krabi','Ao Nang'],['Koh Lanta','Koh Lanta'],['Koh Phi Phi','Phi Phi'],['Phuket','Phuket']];

function phaseFor(index) {
  if (index >= 14) return 'Back in Bangkok, then home';
  if (index >= 10) return 'Phuket';
  if (index >= 8) return 'Koh Phi Phi';
  if (index >= 6) return 'Koh Lanta';
  if (index >= 3) return 'Ao Nang, Krabi';
  return 'Bangkok';
}

export default function ItineraryPlanner() {
  const { P, state, current, dateLabel, money, priceRange } = useTrip();
  const [filter, setFilter] = useState('all');
  const [openDays, setOpenDays] = useState(() => new Set(['arrival']));
  const allOpen = openDays.size === current.plan.length;
  const toggleAll = () => setOpenDays(allOpen ? new Set() : new Set(current.plan.map(day => day.id)));
  const toggleDay = (id, open) => setOpenDays(previous => {
    const next = new Set(previous);
    if (open) next.add(id); else next.delete(id);
    return next;
  });

  let previousPhase = '';
  return (
    <section className="itinerary-planner container" aria-labelledby="itinerary-plan-title">
      <div className="itinerary-tools">
        <TripControls />
        <div className="itinerary-tools__head">
          <h2 id="itinerary-plan-title">What we’re doing each day.</h2>
          <button type="button" onClick={toggleAll} className="btn btn--quiet btn--small">{allOpen ? 'Close all days' : 'Open all days'} <Icon name={allOpen ? 'chevron' : 'plus'} /></button>
        </div>
        <p className="itinerary-tools__note">Enough structure to keep us organized, with plenty of room to change our minds. Amounts on each day are rough transport or activity costs per person.</p>
        <div className="filter-row" role="group" aria-label="Filter itinerary">{filters.map(([value, label]) => <button type="button" className="filter" aria-pressed={filter === value} onClick={() => setFilter(value)} key={value}>{label}</button>)}</div>
      </div>
      <div className="itinerary-days">{current.plan.map((day, index) => {
        if (filter !== 'all' && day.city !== filter) return null;
        const phase = phaseFor(index);
        const showPhase = phase !== previousPhase;
        previousPhase = phase;
        const travel = P.transfers.filter(transfer => transfer.offset === index);
        const travelMin = travel.reduce((sum, transfer) => sum + transfer.min, 0);
        const travelMax = travel.reduce((sum, transfer) => sum + transfer.max, 0);
        return <div key={day.id}>{showPhase && <p className="phase-label">{phase}</p>}<details className="day" open={openDays.has(day.id)} onToggle={event => toggleDay(day.id, event.currentTarget.open)}>
          <summary>
            <span className="day__number num"><span className="visually-hidden">Day </span>{String(index + 1).padStart(2, '0')}</span>
            <span className="day__summary"><span className="day__meta"><time>{dateLabel(index)}</time><span>{day.city}</span><span className="day__category">{day.category}</span></span><h3 className="day__title">{day.title}</h3><span className="day__sub">{day.subtitle}</span></span>
            <span className="day__price"><strong className="num">{travel.length ? priceRange(travelMin, travelMax) : day.cost ? money(day.cost) : 'At our pace'}</strong><small>{travel.length ? 'transport / person' : day.cost ? 'activities / person' : 'No activity fee'}</small></span>
            <Icon name="chevron" className="day__chevron" />
          </summary>
          <div className="day__body">
            <dl className="day__slots">{day.slots.map(([time, text]) => <div className="day__slot" key={time}><dt>{time}</dt><dd>{text}</dd></div>)}</dl>
            <p className="day__tip"><Icon name="sparkles" /><span>{day.tip.replace('For two adults', state.adults === 2 ? 'For the two of us' : `For ${state.adults} adults`)}</span></p>
            {!!day.sourceIds.length && <p className="day__sources">{day.sourceIds.map(id => { const source = P.sources.find(item => item.id === id); return <a key={id} href={source.url} target="_blank" rel="noopener noreferrer">{source.name}<span className="visually-hidden"> (opens in a new tab)</span></a>; })}</p>}
          </div>
        </details></div>;
      })}</div>
      <aside className="little-note"><h3>Why Bangkok again at the end?</h3><p>Those final two nights give us breathing room before the flight home, and one more good dinner.</p></aside>
    </section>
  );
}
