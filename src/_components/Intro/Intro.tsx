'use client';
import styles from './Intro.module.scss';
import clsx from 'clsx';
import CrossIcon from '../../../public/SVG/cross.svg';
import { useEffect, useState } from 'react';
import { useClickOutside } from '@/_hooks/useClickOutside';
import { DefaultButton } from '@/_components/Button/DefaultButton/DefaultButton';
import { TypingAnimation } from '@/_components/Intro/TypingAnimation';

export const Intro = () => {
  const [isIntroShown, setIsIntroShown] = useState(false);
  const [isBodyShown, setIsBodyShown] = useState(false);
  const [isFooterShown, setIsFooterShown] = useState(false);
  const [isTitleShown, setIsTitleShown] = useState(false);
  const headerTitle = 'Demo Project';
  const bodyText = 'This is a demo version of the Job Board project. The tasks functionality is a client ONLY, however, the listings feature has API using the Next server. In this project, I\'ve used experimental features which may slow down the App a little bit.';
  const toggleIntro = () => setIsIntroShown(!isIntroShown);
  const { introRef } = useClickOutside(toggleIntro, isIntroShown);
  
  useEffect(() => {
    toggleIntro();
  }, []);
  
  useEffect(() => {
    if (!isTitleShown) {
      setTimeout(() => {
        setIsTitleShown(true);
      }, 2200);
    }
  }, [isFooterShown, isBodyShown, isTitleShown]);
  
  console.log(isBodyShown, isTitleShown);
  return (
    <div className={clsx(styles.modal_container, isIntroShown && styles.active)}>
      <div ref={introRef} className={styles.modal}>
        <button className={styles.cancel} onClick={toggleIntro}>
          <CrossIcon />
        </button>
        <div className={styles.demo}>
          {isTitleShown ?
            <TypingAnimation text={headerTitle} typingSpeed={30} onAnimationComplete={() => setIsBodyShown(true)} />
            : <div className={styles.cursor}>{'|'}</div>
          }
          {isBodyShown &&
            <TypingAnimation text={bodyText}
                             onAnimationComplete={() => setIsFooterShown(true)} typingSpeed={20} />}
          {isFooterShown && <>
            <TypingAnimation text={'Thanks for your attention :)'} typingSpeed={20} />
            <DefaultButton handleClick={toggleIntro}>Got it</DefaultButton>
          </>}
        </div>
      </div>
    </div>
  );
};