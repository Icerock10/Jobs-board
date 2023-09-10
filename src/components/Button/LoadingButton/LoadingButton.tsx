import styles from './LoadingButton.module.scss';
import { ReactNode, useTransition } from 'react';
import { SmallSpinner } from '@/components/Spinner/Small/SmallSpinner';
import clsx from 'clsx';
export const LoadingButton = ({
  children,
  onClick
}: {
  children: ReactNode;
  onClick: () => void
}) => {
  const [isPending, startTransition] = useTransition();
  return (
    <button
      disabled={isPending}
      onClick={() => startTransition(onClick)}
      className={clsx(styles.link, styles.link_bordered, isPending ? styles.disabled : '')}
    >
      {isPending ? <SmallSpinner /> : children}
    </button>
  );
};
