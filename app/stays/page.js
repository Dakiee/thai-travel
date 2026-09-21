import PageIntro from '../../components/PageIntro';
import StaysPlanner from '../../components/StaysPlanner';

export const metadata = { title: 'Stays · Thailand 2027', description: 'Our booked hotels in Bangkok, Ao Nang, Koh Lanta and Koh Phi Phi, plus our Phuket stay.' };

export default function StaysPage() {
  return <main id="main-content" className="wrap page-main stays-page"><PageIntro eyebrow="SIX STAYS" title="Where we’re staying.">Our booked hotels, stay dates and group sizes, with Phuket still to be added.</PageIntro><StaysPlanner /></main>;
}
