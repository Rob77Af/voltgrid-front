import type { Metadata } from 'next';
import BetPage from '../../views/bet';

export const metadata: Metadata = {
  title: 'VoltGrid – F1 Predictions',
  description: 'Make your driver matchup predictions for the next Grand Prix.',
};

export default function Bet() {
  return <BetPage />;
}
