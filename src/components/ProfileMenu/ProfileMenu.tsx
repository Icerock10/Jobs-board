'use client';
import { useLogOut } from '@/hooks/useLogOut';
import styles from './Profile.module.scss';
import clsx from 'clsx';
import { UseVisibility } from '@/hooks/useVisibility';
import { useClickOutside } from '@/hooks/useClickOutside';
import { useScreenSize } from '@/hooks/useScreenSize';
import Link from 'next/link';
export const ProfileMenu = ({ email }: { email?: string }) => {
  const { logOut } = useLogOut();
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
        className={clsx(styles.profile_button, styles.hovered)}
      >
        {email}
      </button>
      {isProfileMenuShown && (
        <nav className={clsx(styles.profile_menu)}>
          <Link href={'/jobs/listings'} className={styles.hovered}>Protected</Link>
          <div className={styles.hovered} onClick={logOut}>LogOut</div>
        </nav>
      )}
    </aside>
  );
};
