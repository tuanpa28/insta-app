import { Tooltip, TooltipArrow, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { ReactNode } from 'react';

interface ITooltipDisplay {
  trigger: ReactNode | string;
  content: string;
  className?: string;
  hidden?: boolean;
  side?: 'top' | 'right' | 'bottom' | 'left';
}

export const TooltipDisplay = ({
  trigger,
  content,
  className,
  hidden,
  side = 'bottom',
}: ITooltipDisplay) => {
  return (
    <Tooltip>
      <TooltipTrigger asChild className='w-full'>
        {trigger}
      </TooltipTrigger>
      <TooltipContent
        className={`dark:bg-[rgba(26,26,26,1)] dark:border-transparent ${className}`}
        side={side}
        sideOffset={10}
        hidden={hidden}
      >
        <p className='text-sm font-normal'>{content}</p>
        <TooltipArrow
          width={14}
          height={8}
          className='fill-white dark:fill-[rgba(26,26,26,1)] stroke-gray-300 dark:stroke-[rgba(26,26,26,1)]'
        />
      </TooltipContent>
    </Tooltip>
  );
};
