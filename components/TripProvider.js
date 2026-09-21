'use client';

import { createContext, useContext, useEffect, useMemo, useRef, useState } from 'react';
import planner from '../planner.js';
import Icon from './Icon';

const P = planner;
const STORAGE_KEY = 'our-thailand-trip-v1';
const LEGACY_STORAGE_KEY = 'little-thailand-v1';
export const defaultTripState = { duration: 17, adults: 5, rooms: 3, style: 'value', currency: 'MNT', start: '2027-01-16', usdRate: 35, mntRate: 100, routeVersion: 4 };
const TripContext = createContext(null);

function loadSavedState() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || localStorage.getItem(LEGACY_STORAGE_KEY));
    if (!saved || !['USD', 'MNT', 'THB'].includes(saved.currency)) return defaultTripState;
    if (!Number.isFinite(saved.usdRate) || saved.usdRate < 1 || saved.usdRate > 1000) return defaultTripState;
    if (!Number.isFinite(saved.mntRate) || saved.mntRate < 1 || saved.mntRate > 10000) return defaultTripState;
    const candidate = { ...defaultTripState, style: saved.style, currency: saved.currency, usdRate: saved.usdRate, mntRate: saved.mntRate };
    if (saved.routeVersion === 4) {
      candidate.adults = saved.adults;
      candidate.rooms = saved.rooms;
      if (/^2027-01-\d{2}$/.test(saved.start) && saved.start >= '2027-01-01' && saved.start <= '2027-01-31') candidate.start = saved.start;
    }
    P.calculate(candidate);
    return candidate;
  } catch {
    return defaultTripState;
  }
}

export function TripProvider({ children }) {
  const [state, setState] = useState(defaultTripState);
  const [hydrated, setHydrated] = useState(false);
  const [toast, setToast] = useState('');
  const [draft, setDraft] = useState(defaultTripState);
  const dialogRef = useRef(null);
  const current = useMemo(() => P.calculate(state), [state]);

  useEffect(() => {
    setState(loadSavedState());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    localStorage.removeItem(LEGACY_STORAGE_KEY);
  }, [hydrated, state]);

  useEffect(() => {
    if (!toast) return undefined;
    const timer = window.setTimeout(() => setToast(''), 4200);
    return () => window.clearTimeout(timer);
  }, [toast]);

  const dateLabel = (offset, options = { day: 'numeric', month: 'short' }) => P.dateAt(state.start, offset).toLocaleDateString('en-GB', { ...options, timeZone: 'UTC' });
  const money = (baht, currency = state.currency) => {
    const amount = currency === 'USD' ? baht / state.usdRate : currency === 'MNT' ? baht * state.mntRate : baht;
    return `${{ USD: '$', THB: '฿', MNT: '₮' }[currency]}${Math.round(amount).toLocaleString('en-US')}`;
  };
  const priceRange = (min, max) => min === max ? money(min) : `${money(min)}–${money(max)}`;
  const setAdults = adults => setState(value => ({ ...value, adults, rooms: Math.ceil(adults / 2) }));
  const openSettings = () => {
    setDraft(state);
    dialogRef.current?.showModal();
  };
  const saveSettings = event => {
    event.preventDefault();
    const next = { ...draft, rooms: Number(draft.rooms), usdRate: Number(draft.usdRate), mntRate: Number(draft.mntRate) };
    P.calculate(next);
    setState(next);
    dialogRef.current?.close();
    setToast('Our trip details are updated.');
  };

  const makeExport = () => {
    const lines = [
      'OUR THAILAND TRIP — JANUARY 2027',
      `${dateLabel(0)} – ${dateLabel(state.duration - 1)} 2027 · 17 days / 16 nights`,
      `${state.adults} adults · ${state.rooms} room${state.rooms > 1 ? 's' : ''} · ${P.styles[state.style].label}`,
      '', 'OUR STAYS',
      ...P.stops.flatMap(stop => [
        `${stop.city}: ${stop.hotel || 'Hotel pending'} · ${dateLabel(stop.offset)} – ${dateLabel(stop.offset + stop.nights)} · ${stop.nights} nights · ${stop.guestNote || `${stop.guests} people`}`,
        ...(!stop.hotel ? Object.entries(stop.links).map(([name, url]) => `  ${name}: ${url}`) : []),
      ]),
      '', 'OUR FLIGHTS & FERRIES — PER PERSON',
      ...P.transfers.map(transfer => `${dateLabel(transfer.offset)} · ${transfer.title}: ${priceRange(transfer.min, transfer.max)}. ${transfer.note} Link: ${transfer.url}`),
      `Transport estimate: ${priceRange(current.transportRange.min, current.transportRange.max)} each.`,
      '', 'OUR ROUGH BUDGET',
      `Per person: ${money(current.perPerson)} ${state.currency}`,
      `Total for us including 10% cushion: ${money(current.total)} ${state.currency}`,
      ...current.breakdown.map(row => `${row.label}: ${money(row.amount)} — ${row.detail}`),
      `10% cushion: ${money(current.buffer)}`,
      '', 'OUR DAY-BY-DAY',
    ];
    current.plan.forEach((day, index) => lines.push('', `DAY ${index + 1} · ${dateLabel(index)} · ${day.city.toUpperCase()}`, day.title, ...day.slots.map(([time, text]) => `${time}: ${text}`), `Note: ${day.tip}`));
    lines.push('', 'SOURCES', ...P.sources.map(source => `${source.name}: ${source.url}\n${source.note}`));
    return lines.join('\n');
  };

  const downloadTrip = () => {
    const blob = new Blob([makeExport()], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `our-thailand-trip-${state.duration}-days.txt`;
    document.body.append(link);
    link.click();
    link.remove();
    window.setTimeout(() => URL.revokeObjectURL(url), 1500);
    setToast('Our trip plan has been downloaded.');
  };

  const value = { P, state, setState, current, dateLabel, money, priceRange, setAdults, openSettings, downloadTrip };

  return (
    <TripContext.Provider value={value}>
      {children}
      <dialog ref={dialogRef} aria-labelledby="settings-title" onClick={event => { if (event.target === dialogRef.current) dialogRef.current.close(); }}>
        <form onSubmit={saveSettings}>
          <div className="dialog-heading"><div><p className="eyebrow green">EDIT OUR PLAN</p><h2 id="settings-title">Trip settings.</h2></div><button className="icon-button" type="button" onClick={() => dialogRef.current?.close()} aria-label="Close settings">×</button></div>
          <p>Adjust our dates, room split and working exchange rates. The saved booking links keep their original dates.</p>
          <label>Departure date in January 2027<input type="date" min="2027-01-01" max="2027-01-31" required value={draft.start} onChange={event => setDraft(value => ({ ...value, start: event.target.value }))} /></label>
          <label>Rooms <small>Maximum two adults per room</small><input type="number" min={Math.ceil(state.adults / 2)} max={state.adults} required value={draft.rooms} onChange={event => setDraft(value => ({ ...value, rooms: event.target.value }))} /></label>
          <div className="form-grid"><label>THB for 1 USD<input type="number" min="1" max="1000" step="0.01" required value={draft.usdRate} onChange={event => setDraft(value => ({ ...value, usdRate: event.target.value }))} /></label><label>MNT for 1 THB<input type="number" min="1" max="10000" step="0.01" required value={draft.mntRate} onChange={event => setDraft(value => ({ ...value, mntRate: event.target.value }))} /></label></div>
          <p className="footnote">Our default assumptions: USD 1 = THB 35; THB 1 = MNT 100. These are planning rates, not live exchange rates.</p>
          <button className="button green-button full" type="submit">Update our plan <Icon name="arrow-up-right" /></button>
        </form>
      </dialog>
      <div className={`toast ${toast ? 'visible' : ''}`} role="status" aria-live="polite">{toast}</div>
    </TripContext.Provider>
  );
}

export function useTrip() {
  const context = useContext(TripContext);
  if (!context) throw new Error('useTrip must be used inside TripProvider.');
  return context;
}
