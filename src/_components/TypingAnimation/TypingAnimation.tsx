import { useEffect, useState } from 'react';
export const TypingAnimation = ({ text, typingSpeed, onAnimationComplete }: {
  text: string,
  typingSpeed: number,
  onAnimationComplete?: () => void
}) => {
  const [typedText, setTypedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentIndex < text.length) {
        setTypedText((prevText) => prevText + text[currentIndex]);
        setCurrentIndex((prevIndex) => prevIndex + 1);
       } else {
        clearTimeout(timer);
        if(!onAnimationComplete) return;
        setTimeout(() => {
          onAnimationComplete()
        }, 700)
      }
    }, typingSpeed);
    
    return () => clearTimeout(timer);
  }, [currentIndex, text, typingSpeed, onAnimationComplete]);
  
  return <div>{typedText}</div>;
};