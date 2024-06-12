import Tippy from '@tippyjs/react/headless';
import { motion, useSpring } from 'framer-motion';
import React, { CSSProperties } from 'react';
import styled from 'styled-components';

import AccountPreview from '@/components/AccountPreview';
import { PopperWrapper } from '@/components/Popper';
import { IUser } from '@/interfaces';

const Box = styled(motion.div)``;

interface TippyAttrs {
  style?: CSSProperties;
  'data-placement'?: string;
  role?: string;
  id?: string;
  'data-state'?: string;
}

interface ITippyDisplay {
  children: React.ReactNode;
  user: IUser;
  className?: string;
  placement?: 'top' | 'right' | 'bottom' | 'left';
  offset?: [number, number];
}

export const TippyDisplay = ({
  user,
  className,
  placement = 'bottom',
  offset = [166, 8],
  children,
  ...props
}: ITippyDisplay) => {
  const springConfig = { damping: 18, stiffness: 300 };
  const initialScale = 0.6;
  const opacity = useSpring(0, springConfig);
  const scale = useSpring(initialScale, springConfig);

  const onMount = () => {
    scale.set(1);
    opacity.set(1);
  };

  const onHide = ({ unmount }: { unmount: () => void }) => {
    const cleanup = scale.onChange((value: number) => {
      if (value <= initialScale) {
        cleanup();
        unmount();
      }
    });

    scale.set(initialScale);
    opacity.set(0);
  };

  const renderPreview = (attrs: TippyAttrs) => (
    <Box tabIndex={-1} style={{ scale, opacity }} {...attrs}>
      <PopperWrapper className={className}>
        <AccountPreview user={user} />
      </PopperWrapper>
    </Box>
  );

  return (
    <div>
      <Tippy
        interactive
        delay={[400, 100]}
        offset={offset}
        placement={placement}
        render={renderPreview}
        animation={true}
        onMount={onMount}
        onHide={onHide}
        {...props}
      >
        <span>{children}</span>
      </Tippy>
    </div>
  );
};
