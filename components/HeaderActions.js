'use client';

import Icon from './Icon';
import { useTrip } from './TripProvider';

export default function HeaderActions() {
  const { downloadTrip } = useTrip();
  return <button className="button outline small" type="button" onClick={downloadTrip}><Icon name="download" /><span>Download our plan</span></button>;
}
