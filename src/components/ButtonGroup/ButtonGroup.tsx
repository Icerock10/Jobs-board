import styles from './ButtonGroup.module.scss';
import Link from 'next/link';
import clsx from 'clsx';
import { LoadingButton } from '@/components/Button/LoadingButton/LoadingButton';
import { DropMenu } from '@/components/DropMenu/DropMenu';
import { Modal } from '@/components/Modal/Modal';
import { Publish } from '@/components/Publish/Publish';
import { useVisibility } from '@/hooks/useVisibility';
import { useClientActions } from '@/hooks/useClientActions';

export const ButtonGroup = ({ id, title, draft }: { id: string; title: string, draft: Date | number | string }) => {
  const { toggleDraftMenu, isDraftMenuOpen } = useVisibility()
  const isDraft = draft ? 'Extend' : 'Publish';
  const { removeJobAction  } = useClientActions()
  return (
    <div className={styles.button_group}>
      <LoadingButton onClick={() => removeJobAction(id)}>
        Delete
      </LoadingButton>
      <Link className={clsx(styles.link, styles.link_bordered)} href={`/jobs/listings/${id}`}>
        Edit
      </Link>
      <div className={styles.extend}>
        <button tabIndex={-1} onClick={toggleDraftMenu} className={styles.button}>
          {isDraft}
        </button>
        <DropMenu isDraftMenuOpen={isDraftMenuOpen} toggleDraftMenu={toggleDraftMenu} title={title} id={id}/>
      </div>
      <Modal>
        <Publish isDraft={isDraft} />
      </Modal>
    </div>
  );
};
