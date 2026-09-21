import BudgetPlanner from '../../components/BudgetPlanner';
import PageIntro from '../../components/PageIntro';

export const metadata = { title: 'Budget · Thailand 2027', description: 'Our working Thailand trip budget for flights, stays, food, transport and activities.' };

export default function BudgetPage() {
  return <main id="main-content" className="wrap page-main budget-page"><PageIntro eyebrow="THE NUMBERS" title="Our trip budget.">A working group estimate with editable traveller count, currencies and room for the unexpected.</PageIntro><BudgetPlanner /></main>;
}
