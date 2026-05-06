'use client';

import * as RadixScrollArea from '@radix-ui/react-scroll-area';
import styles from './ScrollArea.module.scss';

type Props = {
  children: React.ReactNode;
  className?: string;
};

export default function ScrollArea({ children, className = '' }: Props) {
  return (
    <RadixScrollArea.Root className={`${styles.root} ${className}`}>
      <RadixScrollArea.Viewport className={styles.viewport}>
        {children}
      </RadixScrollArea.Viewport>

      <RadixScrollArea.Scrollbar
        className={styles.scrollbar}
        orientation="vertical"
        forceMount
      >
        <RadixScrollArea.Thumb className={styles.thumb} />
      </RadixScrollArea.Scrollbar>

      <RadixScrollArea.Corner />
    </RadixScrollArea.Root>
  );
}
