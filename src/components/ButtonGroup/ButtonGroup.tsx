import styles from './ButtonGroup.module.scss';
import Link from 'next/link';
import clsx from 'clsx';
import { useState } from 'react';
import { LoadingButton } from '@/components/Button/LoadingButton/LoadingButton';
import { DropMenu } from '@/components/DropMenu/DropMenu';
import { Modal } from '@/components/Modal/Modal';
import { options } from '@/utils/helpers/options';
import { Publish } from '@/components/Publish/Publish';
import { removeJob } from '@/lib/db/server-actions';
import { toastService } from '@/lib/toast/toastr-service';

export const ButtonGroup = ({ id, title, draft }: { id: string; title: string, draft: Date | number }) => {
  const [isOpen, setIsOpen] = useState(false);
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
      <Link className={clsx(styles.link, styles.link_bordered)} href={`/jobs/edit`}>
        Edit
      </Link>
      <div className={styles.extend}>
        <button onClick={() => setIsOpen(!isOpen)} className={styles.button}>
          {isDraft}
        </button>
        <DropMenu options={options} isOpen={isOpen} setIsOpen={setIsOpen} />
      </div>
      <Modal>
        <Publish title={title} id={id} isDraft={isDraft} />
      </Modal>
    </div>
  );
};
