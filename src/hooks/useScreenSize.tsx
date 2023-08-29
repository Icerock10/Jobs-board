import { useEffect, useState } from 'react';
export const useScreenSize = () => {
  const [screenWidth, setScreenWidth] = useState<number>(0);
  
  useEffect(() => {
    setScreenWidth(window.innerWidth);
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [])
  const isMobileScreen = screenWidth < 650;
  return isMobileScreen;
};