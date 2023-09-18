import styles from './Publish.module.scss';
import { useAppSelector } from '@/_hooks/reduxHooks';
import { useTransition } from 'react';
import { useClientActions } from '@/_hooks/useClientActions';

export const Publish = ({ isDraft }: { isDraft: string }) => {
  const { price, days, title, id } = useAppSelector(state => state.visibility);
  const [isPending, startTransition] = useTransition();
  const { publishOrExtendAndShowNotification } = useClientActions();
  
  return (
    <div className={styles.wrapper}>
      <section className={styles.modal_header}>
        <h3 className={styles.modal_header__title}>
          {isDraft} {title} for {days} days
        </h3>
        <p className={styles.modal_header__subtitle}>This is a non-refundable purchase.</p>
      </section>
      <p className={styles.modal_body}>
        This is where the Stripe checkout would go but this is just a demo with no real payment
        integration so it cannot accept payments. Clicking the pay button will emulate what would
        happen if you did make a successful payment.
      </p>
      <button disabled={isPending} className={styles.purchase}
              onClick={() => startTransition(() => publishOrExtendAndShowNotification(id, days!))}>
        {isPending ? <span>Loading...</span> : `Pay $${price}`}
      </button>
    </div>
  );
};
