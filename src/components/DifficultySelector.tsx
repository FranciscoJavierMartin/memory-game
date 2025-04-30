import { ANIMATIONS, EASY, HARD, MEDIUM } from '@/constants';
import { Difficulty } from '@/types';
import { Sparkles, Brain, Zap } from 'lucide-react';
import { motion } from 'motion/react';

const DIFFICULTIES = [
  {
    type: EASY,
    label: 'Easy',
    icon: Sparkles,
    color: 'from-green-400 to-emerald-500',
  },
  {
    type: MEDIUM,
    label: 'Medium',
    icon: Brain,
    color: 'from-blue-400 to-indigo-500',
  },
  {
    type: HARD,
    label: 'Hard',
    icon: Zap,
    color: 'from-purple-400 to-purple-700',
  },
] as const;

interface DifficultySelectorProps {
  onSelect: (difficulty: Difficulty) => void;
}

export default function DifficultySelector({
  onSelect,
}: DifficultySelectorProps) {
  return (
    <div className='flex flex-col gap-4 justify-center items-center p-4 w-full min-h-screen bg-blue-200 sm:gap-8 sm:p-8'>
      <motion.div
        {...ANIMATIONS.fadeInUp}
        className='flex flex-col gap-6 px-4 w-full'
      >
        <h2 className='mb-2 text-2xl font-bold text-center text-white sm:mb-4 sm:text-3xl'>
          Select difficulty
        </h2>
        <div className='flex flex-col gap-3 justify-center w-full sm:flex-row sm:gap-4'>
          {DIFFICULTIES.map(({ type, color, icon: Icon, label }) => (
            <button
              key={label}
              className={`w-full h-20 bg-gradient-to-b rounded-xl ${color} sm:size-32`}
              onClick={() => onSelect(type)}
            >
              <div className='flex gap-2 justify-center items-center sm:flex-col'>
                <Icon className='size-6 sm:size-8' />
                <span className='text-base font-medium sm:text-lg'>
                  {label}
                </span>
              </div>
            </button>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
