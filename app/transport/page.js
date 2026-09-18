import PageIntro from '../../components/PageIntro';
import TransportPlanner from '../../components/TransportPlanner';

export const metadata = { title: 'Transport · Thailand 2027', description: 'Our Thailand domestic flights, ferries, travel dates and 12Go searches.' };

export default function TransportPage() {
  return <main id="main-content" className="wrap page-main transport-page"><PageIntro eyebrow="GETTING AROUND" title="Flights and ferries.">Five travel days, exact-date searches and the fare ranges we’re using for the budget.</PageIntro><TransportPlanner /></main>;
}
