import type { Metadata } from 'next';
import BetNow from '../views/bet-now';

export const metadata: Metadata = {
  title: 'VoltGrid – Racing Betting & Fantasy Game Platform',
  description: 'Experience Formula 1-inspired betting, fantasy gaming, and live dashboards.',
};

export default function Home() {
  return <BetNow />;
}
