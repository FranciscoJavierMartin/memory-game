import { motion } from 'motion/react';
import { Clock, MousePointerClick, RotateCcw } from 'lucide-react';
import ScoreItem from './ScoreItem';
import { ANIMATIONS } from '@/constants';

const SCORE_ITEMS = [
  {
    icon: MousePointerClick,
    label: 'Moves',
    color: 'text-yellow-400',
  },
  {
    icon: Clock,
    label: 'Time',
    color: 'text-blue-400',
  },
];

interface ScoreBoardProps {
  moves: number;
  time: string;
  onRestart: () => void;
}

export default function ScoreBoard({
  moves,
  time,
  onRestart,
}: ScoreBoardProps) {
  return (
    <motion.div
      {...ANIMATIONS.fadeInDown}
      className='flex flex-col gap-4 justify-center items-center p-4 w-full bg-blue-100 rounded-xl sm:w-auto sm:flex-row sm:gap-8'
    >
      {SCORE_ITEMS.map(({ label, color, icon }) => (
        <ScoreItem
          key={label}
          icon={icon}
          label={label}
          color={color}
          value={label === 'Time' ? time : moves}
        />
      ))}
      <button
        onClick={onRestart}
        className='flex gap-2 items-center px-2 text-base text-white group hover:text-pink'
      >
        <RotateCcw className='transition-transform duration-500 size-4 group-hover:-rotate-180' />
        Restart
      </button>
    </motion.div>
  );
}
