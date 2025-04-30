import { motion } from 'motion/react';
import type { Card as CardInfo, Difficulty } from '@/types';
import Card from './Card';
import { EASY, MEDIUM, HARD, ANIMATIONS } from '@/constants';
import { cn } from '@/lib/utils';

interface GameBoardProps {
  cards: CardInfo[];
  difficulty: Difficulty;
  onClickCard: (id: number) => void;
}

const GRID_CONFIG = {
  [EASY]: '',
  [MEDIUM]: 'sm:grid-cols-5',
  [HARD]: 'sm:grid-cols-5 md:grid-cols-6',
};

export default function GameBoard({
  cards,
  difficulty,
  onClickCard,
}: GameBoardProps) {
  return (
    <motion.div
      {...ANIMATIONS.fadeInUp}
      className={cn(
        'grid grid-cols-4',
        GRID_CONFIG[difficulty],
        'gap-2 p-2 bg-blue-100 rounded-xl sm:gap-4 sm:p-4',
      )}
    >
      {cards.map((card) => (
        <Card key={card.id} {...card} onClick={() => onClickCard(card.id)} />
      ))}
    </motion.div>
  );
}
