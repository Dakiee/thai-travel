const icons = {
  boat: '<path d="M3 17 2 11l10-4 10 4-1 6M7 9V3h10v6M12 7v10M2 20c2 2 4 2 6 0 2 2 6 2 8 0 2 2 4 2 6 0"/>',
  plane: '<path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/>',
  palm: '<path d="M12 21c2-4 3-8 2-13M6 22h14M14 8C8 4 3 8 3 12c3-3 6-3 11-4Zm0 0c1-6 7-5 8-1-3-1-5-1-8 1Zm0 0C10 1 5 3 5 6m9 2c6 0 8 4 6 7-1-4-3-6-6-7Z"/>',
  calendar: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 11h18M8 15h2M14 15h2M8 18h2"/>',
  users: '<circle cx="9" cy="7" r="3"/><path d="M3 21v-3a6 6 0 0 1 12 0v3M16 4a3 3 0 0 1 0 6m2 4a5 5 0 0 1 3 5v2"/>',
  pin: '<path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/>',
  wallet: '<path d="M20 8V5H5a2 2 0 0 0 0 4h16v12H5a2 2 0 0 1-2-2V7m18 6h-6v4h6"/><path d="M17 15h.01"/>',
  sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5"/>',
  download: '<path d="M12 3v12m-5-5 5 5 5-5M4 16v5h16v-5"/>',
  'arrow-down': '<path d="M12 4v16m-6-6 6 6 6-6"/>',
  'arrow-up-right': '<path d="M5 19 19 5M5 5h14v14"/>',
  globe: '<circle cx="12" cy="12" r="9"/><ellipse cx="12" cy="12" rx="4" ry="9"/><path d="M3 12h18"/>',
  sliders: '<path d="M3 6h7m4 0h7M3 12h12m4 0h2M3 18h2m4 0h12M10 3v6m5 0v6M5 15v6"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  chevron: '<path d="m6 9 6 6 6-6"/>',
  heart: '<path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8Z"/>',
  bed: '<path d="M3 18v3m18-3v3M3 10V5h18v5M2 18v-6a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v6ZM6 10V7h5v3m2 0V7h5v3"/>',
  cup: '<path d="M4 8h12v7a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5Zm12 1h2a3 3 0 0 1 0 6h-2M8 2v3m5-3v3M2 23h18"/>',
  car: '<path d="m5 8 2-5h10l2 5M3 17V9l2-1h14l2 1v8ZM5 17v3m14-3v3M6 12h2m8 0h2"/>',
  shield: '<path d="M12 2 3 6v6c0 5 9 10 9 10s9-5 9-10V6Z"/><path d="m8 12 3 3 5-6"/>',
  print: '<path d="M6 8V3h12v5M6 17H3V8h18v9h-3M6 14h12v8H6Zm11-3h1"/>',
  sparkles: '<path d="m12 3 2.5 6.5L21 12l-6.5 2.5L12 21l-2.5-6.5L3 12l6.5-2.5ZM20 2v4m-2-2h4"/>',
  building: '<path d="M5 22V3h14v19M2 22h20M9 7h1m4 0h1M9 11h1m4 0h1M9 15h1m4 0h1M10 22v-3h4v3"/>',
  bag: '<rect x="5" y="6" width="14" height="15" rx="2"/><path d="M9 6V3h6v3M9 10v7m6-7v7M8 21v1m8-1v1"/>',
  info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v6m0-10h.01"/>',
};

export default function Icon({ name, className = '' }) {
  return <svg className={`icon ${className}`} viewBox="0 0 24 24" aria-hidden="true" dangerouslySetInnerHTML={{ __html: icons[name] || icons.sun }} />;
}
