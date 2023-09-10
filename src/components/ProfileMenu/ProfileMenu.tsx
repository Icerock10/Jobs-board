'use client';
import styles from './Profile.module.scss';
import clsx from 'clsx';
import { UseVisibility } from '@/hooks/useVisibility';
import { useClickOutside } from '@/hooks/useClickOutside';
import { useScreenSize } from '@/hooks/useScreenSize';
import Link from 'next/link';
import { logOut } from '@/lib/db/server-actions';
export const ProfileMenu = ({ email }: { email?: string }) => {
  const { toggleProfileMenu, isProfileMenuShown } = UseVisibility();
  const { profileMenuRef } = useClickOutside(toggleProfileMenu, isProfileMenuShown);
  const isMobileScreen = useScreenSize();
  
  return (
    <aside
      onClick={toggleProfileMenu}
      onMouseLeave={() => isMobileScreen && toggleProfileMenu()}
      ref={profileMenuRef}
      className={styles.container}
    >
      <button
        onMouseOver={() => isMobileScreen && toggleProfileMenu()}
        disabled={isMobileScreen}
        className={clsx(styles.profile_button, styles.hovered, isProfileMenuShown && styles.active)}
      >
        {email}
      </button>
        <nav className={clsx(styles.profile_menu, isProfileMenuShown && styles.active)}>
          <Link href={'/jobs/listings'} className={styles.hovered}>My Listings</Link>
          <div className={styles.divider}></div>
          <div className={styles.hovered} onClick={() => logOut()}>LogOut</div>
        </nav>
    </aside>
  );
};
