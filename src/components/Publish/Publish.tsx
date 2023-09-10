import styles from './Publish.module.scss';
import { toggleModal, setSuccessfulPurchase } from '@/store/visibility/visibilitySlice';
import CrossIcon from '../../../public/SVG/cross.svg';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks';
import { publishOrExtendJob } from '@/lib/db/server-actions';
import { useClickOutside } from '@/hooks/useClickOutside';

export const Publish = ({ title, id, isDraft }: { title: string, id: string, isDraft: string }) => {
  const { price, days } = useAppSelector(state => state.visibility);
  const dispatch = useAppDispatch();
  const toggleModalAction = () => dispatch(toggleModal())
   const publishOrExtendJobAction = async () => {
    const { errorMessage, successMessage } = await publishOrExtendJob(id, days!)
    dispatch(setSuccessfulPurchase({errorMessage, successMessage}))
  }
  return (
    <div className={styles.wrapper}>
      <section className={styles.modal_header}>
        <h3 className={styles.modal_header__title}>
          {isDraft} {title} for {days} days
        </h3>
        <p className={styles.modal_header__subtitle}>This is a non-refundable purchase.</p>
      </section>
      <button className={styles.cancel} onClick={toggleModalAction}>
        <CrossIcon />
      </button>
      <p className={styles.modal_body}>
        This is where the Stripe checkout would go but this is just a demo with no real payment
        integration so it cannot accept payments. Clicking the pay button will emulate what would
        happen if you did make a successful payment.
      </p>
      <button className={styles.purchase} onClick={publishOrExtendJobAction}>
        Pay {`$${price}`}
      </button>
    </div>
  );
};
