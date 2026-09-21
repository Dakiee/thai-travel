'use client';

import { useState } from 'react';
import Icon from './Icon';
import TripControls from './TripControls';
import { useTrip } from './TripProvider';

const filters = [['all','The whole trip'],['Bangkok','Bangkok'],['Krabi','Ao Nang'],['Koh Lanta','Koh Lanta'],['Koh Phi Phi','Phi Phi'],['Phuket','Phuket']];

function phaseFor(index) {
  if (index >= 14) return 'BACK IN BANGKOK · THEN HOME';
  if (index >= 10) return 'PHUKET';
  if (index >= 8) return 'KOH PHI PHI';
  if (index >= 6) return 'KOH LANTA';
  if (index >= 3) return 'AO NANG, KRABI';
  return 'BANGKOK';
}

export default function ItineraryPlanner() {
  const { P, state, current, dateLabel, money, priceRange } = useTrip();
  const [filter, setFilter] = useState('all');
  const [openDays, setOpenDays] = useState(() => new Set(['arrival']));
  const toggleAll = () => setOpenDays(openDays.size === current.plan.length ? new Set() : new Set(current.plan.map(day => day.id)));
  const toggleDay = (id, open) => setOpenDays(previous => {
    const next = new Set(previous);
    if (open) next.add(id); else next.delete(id);
    return next;
  });

  let previousPhase = '';
  return (
    <section className="itinerary-planner">
      <div className="itinerary-tools"><TripControls /><div className="section-heading itinerary-heading"><div><p className="eyebrow green">OUR PLAN</p><h2>What we’re doing each day.</h2></div><button type="button" onClick={toggleAll} className="text-button">{openDays.size === current.plan.length ? 'Close all days' : 'Open all days'} <span><Icon name={openDays.size === current.plan.length ? 'chevron' : 'plus'} /></span></button></div><p className="section-description">Enough structure to keep us organized, with plenty of room to change our minds.<br /><span>Amounts on each day are rough transport or activity costs per person.</span></p><div className="filter-row" role="group" aria-label="Filter itinerary">{filters.map(([value, label]) => <button type="button" className={`filter ${filter === value ? 'active' : ''}`} aria-pressed={filter === value} onClick={() => setFilter(value)} key={value}>{label}</button>)}</div></div>
      <div className="itinerary-days">{current.plan.map((day, index) => {
        if (filter !== 'all' && day.city !== filter) return null;
        const phase = phaseFor(index);
        const showPhase = phase !== previousPhase;
        previousPhase = phase;
        const travel = P.transfers.filter(transfer => transfer.offset === index);
        const travelMin = travel.reduce((sum, transfer) => sum + transfer.min, 0);
        const travelMax = travel.reduce((sum, transfer) => sum + transfer.max, 0);
        return <div key={day.id}>{showPhase && <div className="phase-label">{phase}</div>}<details className="day-card" open={openDays.has(day.id)} onToggle={event => toggleDay(day.id, event.currentTarget.open)}><summary><span className="day-number"><small>DAY</small><strong>{String(index + 1).padStart(2, '0')}</strong></span><div className="day-summary"><div className="day-meta">{dateLabel(index)} · {day.city} <span className="category">{day.category}</span></div><h3>{day.title}</h3><p>{day.subtitle}</p></div><span className="day-price">{travel.length ? priceRange(travelMin, travelMax) : day.cost ? money(day.cost) : 'At our pace'}<small>{travel.length ? 'transport / person' : day.cost ? 'activities / person' : 'No activity fee'}</small></span><span className="chevron"><Icon name="chevron" /></span></summary><div className="day-body">{day.slots.map(([time, text]) => <div className="day-slot" key={time}><time>{time}</time><p>{text}</p></div>)}<div className="day-tip"><span><Icon name="sparkles" /></span><p>{day.tip.replace('For two adults', state.adults === 2 ? 'For the two of us' : `For ${state.adults} adults`)}</p></div>{!!day.sourceIds.length && <div className="day-source-links">{day.sourceIds.map(id => { const source = P.sources.find(item => item.id === id); return <a key={id} href={source.url} target="_blank" rel="noopener noreferrer">{source.name} ↗</a>; })}</div>}</div></details></div>;
      })}</div>
      <div className="little-note"><span><Icon name="heart" /></span><p><strong>Why Bangkok again at the end?</strong><br />Those final two nights give us breathing room before the flight home—and one more good dinner.</p></div>
    </section>
  );
}
