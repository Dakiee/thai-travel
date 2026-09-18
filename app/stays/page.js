import PageIntro from '../../components/PageIntro';
import StaysPlanner from '../../components/StaysPlanner';

export const metadata = { title: 'Stays · Thailand 2027', description: 'Our accommodation searches for Bangkok, Ao Nang, Koh Lanta, Koh Phi Phi and Phuket.' };

export default function StaysPage() {
  return <main id="main-content" className="wrap page-main"><PageIntro eyebrow="SIX STAYS" title="Where we’re staying.">Our hotel areas, rough room budgets and saved searches for every stop.</PageIntro><StaysPlanner /></main>;
}
