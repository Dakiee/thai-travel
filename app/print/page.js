import PrintDocument from '../../components/PrintDocument';

export const metadata = {
  title: 'Printable plan · Thailand 2027',
  description: 'A print-ready copy of our complete Thailand itinerary.',
};

export default function PrintPage() {
  return <PrintDocument />;
}
