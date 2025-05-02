'use client';

import { cn } from "@/lib/utils";
import React from 'react';

interface SpinnerProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function Spinner({ className, size = 'md' }: SpinnerProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  };

  React.useEffect(() => {
    const id = 'spinner-styles';
    if (!document.getElementById(id)) {
      const styleElement = document.createElement('style');
      styleElement.id = id;
      styleElement.textContent = spinnerStyles;
      document.head.appendChild(styleElement);
    }
    
    return () => {
      if (document.querySelectorAll('.spinner').length <= 1) {
        const styleElement = document.getElementById(id);
        if (styleElement) {
          document.head.removeChild(styleElement);
        }
      }
    };
  }, []);

  return (
    <div 
      className={cn(
        "spinner", 
        sizeClasses[size],
        className
      )} 
      aria-label="Loading"
    />
  );
}

export const spinnerStyles = `
  .spinner {
    aspect-ratio: 1;
    background: 
      linear-gradient(45deg, var(--primary) 50%, #0000 0),
      linear-gradient(45deg, #0000 50%, var(--primary) 0),
      linear-gradient(-45deg, var(--accent) 50%, #0000 0),
      linear-gradient(-45deg, #0000 50%, var(--accent) 0),
      linear-gradient(var(--dark) 0 0);
    background-size: 50% 50%;
    background-repeat: no-repeat;
    animation: spinner-animation 1.5s infinite;
  }
  
  @keyframes spinner-animation {
    0%   {background-position: 50% 50%, 50% 50%, 50% 50%, 50% 50%, 50% 50%}
    25%  {background-position: 0 100%, 100% 0, 50% 50%, 50% 50%, 50% 50%}
    50%  {background-position: 0 100%, 100% 0, 100% 100%, 0 0, 50% 50%}
    75%  {background-position: 50% 50%, 50% 50%, 100% 100%, 0 0, 50% 50%}
    100% {background-position: 50% 50%, 50% 50%, 50% 50%, 50% 50%, 50% 50%}
  }
`;