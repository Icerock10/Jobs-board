import styles from './ButtonGroup.module.scss';
import Link from 'next/link';
import clsx from 'clsx';
import { LoadingButton } from '@/_components/Button/LoadingButton/LoadingButton';
import { DropMenu } from '@/_components/Jobs/DropMenu/DropMenu';
import { Modal } from '@/_components/Modal/Modal';
import { Publish } from '@/_components/Jobs/Publish/Publish';
import { useVisibility } from '@/_hooks/useVisibility';
import { useClientActions } from '@/_hooks/useClientActions';
import { AppPath } from '@/_utils/enums/enums';

export const ButtonGroup = ({ id, title, draft }: { id: string; title: string, draft: Date | number | string }) => {
  const { toggleDraftMenu, isDraftMenuOpen } = useVisibility()
  const isDraft = draft ? 'Extend' : 'Publish';
  const { removeListingAndShowToast  } = useClientActions()
  return (
    <div className={styles.button_group}>
      <LoadingButton onClick={() => removeListingAndShowToast(id)}>
        Delete
      </LoadingButton>
      <Link className={clsx(styles.link, styles.link_bordered)} href={`${AppPath.EDIT}${id}`}>
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
