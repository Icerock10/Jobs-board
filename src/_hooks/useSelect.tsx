import { useCallback, useEffect, useState } from 'react';
import { useAppSelector } from '@/_hooks/reduxHooks';
export const useSelect = (firstOption: string, isDbField?: string) => {
  const { isReset } = useAppSelector(state => state.preview)
  const hasDbField = isDbField ? isDbField : firstOption;
  const [selected, setSelected] = useState(hasDbField);
  
  const changeSelectValue = useCallback((val?: string) => {
    setSelected(val ? val : firstOption)
  }, [firstOption])
  
  useEffect(() => {
    if(isReset) {
      changeSelectValue()
    }
  }, [isReset, changeSelectValue])
  
  return {
    selected,
    changeSelectValue
  }
};