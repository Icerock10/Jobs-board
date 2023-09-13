import styles from './ButtonGroup.module.scss';
import Link from 'next/link';
import clsx from 'clsx';
import { LoadingButton } from '@/components/Button/LoadingButton/LoadingButton';
import { DropMenu } from '@/components/DropMenu/DropMenu';
import { Modal } from '@/components/Modal/Modal';
import { Publish } from '@/components/Publish/Publish';
import { removeJob } from '@/lib/db/server-actions';
import { toastService } from '@/lib/toast/toastr-service';
import { useVisibility } from '@/hooks/useVisibility';

export const ButtonGroup = ({ id, title, draft }: { id: string; title: string, draft: Date | number }) => {
  const { toggleDraftMenu, isDraftMenuOpen } = useVisibility()
  const isDraft = draft ? 'Extend' : 'Publish';
  const removeJobAction = async () => {
    const response = await removeJob(id)
    if(response?.status === 200) {
      toastService.success(response?.data?.successMessage)
    }
    toastService.error(response?.data)
  }
  return (
    <div className={styles.button_group}>
      <LoadingButton onClick={removeJobAction}>
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
