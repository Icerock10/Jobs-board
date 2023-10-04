import { useEffect, useReducer } from 'react';
import { storageService } from '@/_lib/services/localStorage/storage-service';
import { StorageKey } from '@/_utils/enums/enums';
export const useIntro = () => {
  const [isIntroShown, toggleIntro] = useReducer((intro) => !intro, false);
  const [isTitleShown, toggleTitle] = useReducer((title) => !title, false);
  const [isBodyShown, toggleBodyText] = useReducer((body) => !body, false);
  const [isFooterShown, toggleFooterText] = useReducer((footer) => !footer, false);
  
  useEffect(() => {
    toggleIntro();
  }, []);
  
  useEffect(() => {
    if (isFooterShown) {
      storageService.setItem(StorageKey.MODAL, true);
    }
    if (!isTitleShown) {
      setTimeout(() => {
        toggleTitle();
      }, 2200);
    }
  }, [isFooterShown, isTitleShown]);
  return {
    isIntroShown,
    toggleIntro,
    isBodyShown,
    toggleBodyText,
    isFooterShown,
    toggleFooterText,
    isTitleShown,
  };
};