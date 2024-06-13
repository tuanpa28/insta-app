import { ReactNode } from 'react';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

type DialogProps = {
  title: string | ReactNode;
  alignTitle?: 'center' | 'left' | 'right';
  description?: string;
  children: ReactNode;
  className?: string;
  open: boolean;
  setOpen: (open: boolean) => void;
};

export const DialogDisplay = ({
  className,
  children,
  title,
  alignTitle = 'left',
  description,
  open,
  setOpen,
}: DialogProps): JSX.Element => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        className={`${className} p-5 !rounded-2xl dark:bg-[rgb(38,38,38)] dark:border-transparent`}
      >
        <DialogHeader>
          <DialogTitle className={`text-${alignTitle} text-base font-semibold`}>
            {title}
          </DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>
        <div>{children}</div>
      </DialogContent>
    </Dialog>
  );
};
