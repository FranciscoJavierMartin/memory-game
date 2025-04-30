import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface ScoreItemProps {
  icon: LucideIcon;
  label: string;
  value: string | number;
  color: string;
}

export default function ScoreItem({
  icon: Icon,
  label,
  color,
  value,
}: ScoreItemProps) {
  return (
    <div className='flex w-[130px] items-center justify-center gap-2 text-lg text-white'>
      <Icon className={cn('size-5', color)} />
      {label}:<span className='min-w-4'>{value}</span>
    </div>
  );
}
