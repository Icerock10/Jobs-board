'use client';
import styles from './Intro.module.scss';
import clsx from 'clsx';
import CrossIcon from '../../../public/SVG/cross.svg';
import { useClickOutside } from '@/_hooks/useClickOutside';
import { DefaultButton } from '@/_components/Button/DefaultButton/DefaultButton';
import { TypingAnimation } from '@/_components/TypingAnimation/TypingAnimation';
import { BODY_TEXT, FOOTER_TEXT, HEADER_TITLE } from '@/_utils/constants/constants';
import { useIntro } from '@/_hooks/useIntro';

export const Intro = () => {
  const {
    toggleIntro,
    isIntroShown,
    isTitleShown,
    isFooterShown,
    isBodyShown,
    toggleFooterText,
    toggleBodyText,
  } = useIntro();
  const { introRef } = useClickOutside(toggleIntro, isIntroShown);
  return (
    <div className={clsx(styles.modal_container, isIntroShown && styles.active)}>
      <div ref={introRef} className={styles.modal}>
        <button className={styles.cancel} onClick={toggleIntro}>
          <CrossIcon />
        </button>
        <div className={styles.demo}>
          {isTitleShown ?
            <TypingAnimation text={HEADER_TITLE} typingSpeed={30} onAnimationComplete={toggleBodyText} />
            : <div className={styles.cursor}>{'|'}</div>
          }
          {isBodyShown &&
            <TypingAnimation text={BODY_TEXT}
                             onAnimationComplete={toggleFooterText} typingSpeed={20} />}
          {isFooterShown && <>
            <TypingAnimation text={FOOTER_TEXT} typingSpeed={20} />
            <DefaultButton handleClick={toggleIntro}>Got it</DefaultButton>
          </>}
        </div>
      </div>
    </div>
  );
};