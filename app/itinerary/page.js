import ItineraryPlanner from '../../components/ItineraryPlanner';
import PageIntro from '../../components/PageIntro';

export const metadata = { title: 'Itinerary · Thailand 2027', description: 'Our 17-day Thailand itinerary from Bangkok through the Andaman islands.' };

export default function ItineraryPage() {
  return <main id="main-content" className="wrap page-main itinerary-page"><PageIntro eyebrow="DAY BY DAY" title="Our itinerary.">Seventeen days from Bangkok to the islands and back, with enough space to change our minds.</PageIntro><ItineraryPlanner /></main>;
}
