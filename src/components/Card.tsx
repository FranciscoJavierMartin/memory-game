import { Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Card as CardInfo } from '@/types';

const CARD_STYLES = {
  base: 'flex absolute justify-center items-center rounded-xl border-2 size-full',
  back: 'border-white/20 bg-pink backface-hidden',
  front:
    'backface-hidden rotate-y-180 border-purple-200 bg-white xs:text-3xl sm:text-4xl',
};

interface CardProps extends CardInfo {
  onClick: () => void;
}

export default function Card({
  emoji,
  onClick,
  isFlipped,
  isMatched,
}: CardProps) {
  return (
    <button
      className='relative cursor-pointer size-16 xs:size-20 sm:size-24'
      onClick={onClick}
    >
      <div
        className={`preserve-3d size-full transition-transform duration-500 ${isFlipped && 'rotate-y-180'}`}
      >
        <div className={cn(CARD_STYLES.base, CARD_STYLES.back)}>
          <Sparkles className='text-white animate-pulse size-6 sm:size-8' />
        </div>
        <div
          className={cn(
            CARD_STYLES.base,
            CARD_STYLES.front,
            isMatched && 'bg-gray-300',
          )}
        >
          {emoji}
        </div>
      </div>
    </button>
  );
}
