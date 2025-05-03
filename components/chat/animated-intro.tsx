'use client';

import { useEffect, useState } from 'react';

interface AnimatedIntroProps {
  title: string;
  onAnimationComplete: () => void;
}

export default function AnimatedIntro({ title, onAnimationComplete }: AnimatedIntroProps) {
  const [stage, setStage] = useState<'typing' | 'horizontal' | 'vertical' | 'complete'>('typing');
  
  useEffect(() => {
    const typingTimer = setTimeout(() => {
      setStage('horizontal');
    }, 2500);
    
    const horizontalTimer = setTimeout(() => {
      setStage('vertical');
    }, 3500);
    
    const verticalTimer = setTimeout(() => {
      setStage('complete');
    }, 4500);
    
    const completeTimer = setTimeout(() => {
      onAnimationComplete();
    }, 5500);
    
    return () => {
      clearTimeout(typingTimer);
      clearTimeout(horizontalTimer);
      clearTimeout(verticalTimer);
      clearTimeout(completeTimer);
    };
  }, [onAnimationComplete]);
  
  return (
    <div className="flex items-center justify-center h-screen w-full">
      <div 
        className={`
          flex flex-col items-center justify-center
          transition-all duration-1000 ease-in-out
          ${stage === 'typing' ? 'w-auto max-w-[80%] h-auto' : ''}
          ${stage === 'vertical' ? 'w-full h-full' : ''}
          ${stage === 'complete' ? 'w-full h-full opacity-0' : 'opacity-100'}
        `}
      >
        <h2 
          className={`
            text-xl font-bold overflow-hidden whitespace-nowrap
            ${stage === 'typing' ? 'border-r-4 border-[var(--primary)]' : ''}
            ${stage === 'typing' ? 'animate-typing' : null}
          `}
          style={{
            animation: stage === 'typing' ? 'typing 2.5s steps(40, end), blink 0.75s step-end infinite' : ''
          }}
        >
          {title}
        </h2>
      </div>
    </div>
  );
} 