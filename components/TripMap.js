'use client';

import { useEffect, useRef, useState } from 'react';
import Icon from './Icon';
import { useTrip } from './TripProvider';

const filters = [
  ['all', 'Whole trip'],
  ['bangkok', 'Bangkok'],
  ['krabi', 'Ao Nang'],
  ['lanta', 'Koh Lanta'],
  ['phiphi', 'Phi Phi'],
  ['phuket', 'Phuket'],
];

const modeLabels = { flight: 'Flight', ferry: 'Ferry', ground: 'Taxi / van / rail', walk: 'Walk / porter' };

// Map colours live in the CSS token block (--map-*); Leaflet needs them as values, so read them once.
function mapColours() {
  const read = name => getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  return {
    hotel: read('--map-hotel'), pier: read('--map-pier'), airport: read('--map-airport'), ring: read('--map-ring'),
    ferry: read('--map-ferry'), flight: read('--map-flight'), walk: read('--map-walk'), ground: read('--map-ground'),
  };
}

function legStyle(mode, colours) {
  if (mode === 'ferry') return { color: colours.ferry, weight: 3.5, dashArray: '9 7' };
  if (mode === 'flight') return { color: colours.flight, weight: 2.5, dashArray: '2 8' };
  if (mode === 'walk') return { color: colours.walk, weight: 4, dashArray: '1 7' };
  return { color: colours.ground, weight: 4, dashArray: '10 5' };
}

function popupContent(place) {
  const wrapper = document.createElement('div');
  wrapper.className = 'trip-map-popup';

  const name = document.createElement('strong');
  name.textContent = place.name;
  const when = document.createElement('span');
  when.className = 'when';
  when.textContent = place.when;
  const note = document.createElement('p');
  note.textContent = place.note;

  wrapper.append(name, when, note);
  return wrapper;
}

export default function TripMap() {
  const { P } = useTrip();
  const mapNode = useRef(null);
  const mapState = useRef(null);
  const [activeStop, setActiveStop] = useState('all');
  const [mapReady, setMapReady] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function initialiseMap() {
      const leafletModule = await import('leaflet');
      const L = leafletModule.default || leafletModule;
      if (cancelled || !mapNode.current || mapState.current) return;

      const map = L.map(mapNode.current, { scrollWheelZoom: false, zoomControl: true });
      const fallbackTiles = () => L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; OpenStreetMap contributors',
      });
      const primaryTiles = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {
        maxZoom: 19,
        attribution: 'Tiles &copy; Esri',
      });
      let fallbackActive = false;
      primaryTiles.on('tileerror', () => {
        if (fallbackActive) return;
        fallbackActive = true;
        map.removeLayer(primaryTiles);
        fallbackTiles().addTo(map);
      });
      primaryTiles.addTo(map);

      const colours = mapColours();
      const byId = Object.fromEntries(P.places.map(place => [place.id, place]));
      P.legs.forEach(([fromId, toId, mode, label]) => {
        const from = byId[fromId];
        const to = byId[toId];
        const line = L.polyline([[from.lat, from.lng], [to.lat, to.lng]], legStyle(mode, colours)).addTo(map);
        line.bindTooltip(label, { sticky: true });
        line.bindPopup(`<div class="trip-map-popup"><strong>${modeLabels[mode]}</strong><p>${label}</p></div>`);
      });

      P.places.forEach(place => {
        L.circleMarker([place.lat, place.lng], {
          radius: place.type === 'hotel' ? 9 : 7,
          color: place.tbd ? colours.hotel : colours.ring,
          weight: 2.5,
          fillColor: colours[place.type],
          fillOpacity: place.tbd ? 0.12 : 1,
          dashArray: place.tbd ? '3 3' : null,
        })
          .bindPopup(popupContent(place), { maxWidth: 280 })
          .bindTooltip(place.name, { direction: 'top', offset: [0, -8] })
          .addTo(map);
      });

      const boundsFor = stop => L.latLngBounds(
        P.places.filter(place => stop === 'all' || place.stop === stop).map(place => [place.lat, place.lng])
      );
      map.fitBounds(boundsFor('all'), { padding: [34, 34] });
      mapState.current = { map, boundsFor };
      setMapReady(true);
    }

    initialiseMap();
    return () => {
      cancelled = true;
      mapState.current?.map.remove();
      mapState.current = null;
    };
  }, [P]);

  const showStop = stop => {
    setActiveStop(stop);
    const state = mapState.current;
    if (!state) return;
    state.map.flyToBounds(state.boundsFor(stop), { padding: [44, 44], maxZoom: 14, duration: 0.8 });
  };

  return (
    <section className="trip-map-section" aria-labelledby="trip-map-title">
      <div className="container trip-map__head"><h2 id="trip-map-title">Where everything is.</h2><p className="lead">Hotels, piers and airports. Tap a pin for dates and practical notes.</p></div>
      <div className="container trip-map__body">
      <div className="trip-map-jump" role="group" aria-label="Zoom to a stop">
        {filters.map(([id, label]) => <button key={id} type="button" aria-controls="trip-map" aria-pressed={activeStop === id} onClick={() => showStop(id)}>{label}</button>)}
      </div>
      <div className="trip-map-shell">
        {!mapReady && <span className="trip-map-loading">Loading our route…</span>}
        <div id="trip-map" ref={mapNode} className="trip-map" role="region" aria-label="Interactive map of our Thailand trip" />
      </div>
      <ul className="trip-map-legend" aria-label="Map legend">
        <li><span className="map-dot hotel" />Hotel</li>
        <li><span className="map-dot pier" />Pier</li>
        <li><span className="map-dot airport" />Airport</li>
        <li><span className="map-line ferry" />Ferry</li>
        <li><span className="map-line flight" />Flight</li>
        <li><span className="map-line ground" />Taxi / van / rail</li>
        <li><span className="map-line walk" />Walk / porter</li>
      </ul>
      <details className="trip-map-connections">
        <summary>All {P.legs.length} mapped connections<Icon name="chevron" /></summary>
        <ol>{P.legs.map(([from, to, mode, label], index) => <li key={`${from}-${to}-${index}`}><span className={`connection-mode ${mode}`}>{modeLabels[mode]}</span><p>{label}</p></li>)}</ol>
      </details>
      </div>
    </section>
  );
}
