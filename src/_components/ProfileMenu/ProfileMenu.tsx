'use client';
import styles from './Profile.module.scss';
import clsx from 'clsx';
import { useVisibility } from '@/_hooks/useVisibility';
import { useClickOutside } from '@/_hooks/useClickOutside';
import { useScreenSize } from '@/_hooks/useScreenSize';
import Link from 'next/link';
import { logOut } from '@/_lib/server-actions/server-actions';
import { AppPath } from '@/_utils/enums/enums';

export const ProfileMenu = ({ email }: { email: unknown | null }) => {
  const { toggleProfileMenu, isProfileMenuShown } = useVisibility();
  const { profileMenuRef } = useClickOutside(toggleProfileMenu, isProfileMenuShown);
  const isMobileScreen = useScreenSize();
  
  return (
    <aside
      onMouseLeave={() => isMobileScreen && toggleProfileMenu()}
      className={styles.container}
    >
      <button
        onClick={toggleProfileMenu}
        tabIndex={1}
        onMouseOver={() => isMobileScreen && toggleProfileMenu()}
        disabled={isMobileScreen}
        className={clsx(styles.profile_button, styles.hovered, isProfileMenuShown && styles.active)}
      >
        {email as string}
      </button>
        <nav ref={profileMenuRef} className={clsx(styles.profile_menu, isProfileMenuShown && styles.active)}>
          <Link href={AppPath.LISTINGS} className={styles.hovered}>My Listings</Link>
          <div className={styles.divider}></div>
          <div className={styles.hovered} onClick={() => logOut()}>LogOut</div>
        </nav>
    </aside>
  );
};
