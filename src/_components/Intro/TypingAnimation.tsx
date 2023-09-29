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
        const currentChar = text[currentIndex];
        setTypedText((prevText) => prevText + text[currentIndex]);
        setCurrentIndex((prevIndex) => prevIndex + 1);
        if (currentChar === '.' || currentChar === ',') {
          return new Promise((res, rej) => {
            setTimeout(() => {
              res(currentChar)
            }, 2000)
          })
        }
      } else {
        clearTimeout(timer); // Stop the animation when text is fully typed
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