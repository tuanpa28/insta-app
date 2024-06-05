import { DropdownMenu, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { ReactNode } from 'react';

interface IDropdownDisplayProps {
  trigger: ReactNode | string;
  children: ReactNode;
}

export const DropdownDisplay = ({ trigger, children }: IDropdownDisplayProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className='block w-full !m-0 !p-0'>{trigger}</div>
      </DropdownMenuTrigger>
      {children}
    </DropdownMenu>
  );
};
