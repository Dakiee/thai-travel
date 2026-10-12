import PageIntro from '../../components/PageIntro';
import TransportPlanner from '../../components/TransportPlanner';

export const metadata = { title: 'Transport · Thailand 2027', description: 'Our Thailand domestic flights, ferries, travel dates and times.' };

export default function TransportPage() {
  return <main id="main-content" className="wrap page-main transport-page"><PageIntro eyebrow="GETTING AROUND" title="Flights and ferries.">Our flights and ferries, with dates and departure times.</PageIntro><TransportPlanner /></main>;
}
