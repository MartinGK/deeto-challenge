import React from 'react';
import { cn } from '@/lib/utils';

interface ChatDescriptionProps {
  children?: React.ReactNode;
  className?: string;
}

export default function ChatDescription({ 
  children, 
  className 
}: ChatDescriptionProps) {
  return (
    <p 
      className={cn(
        "text-[0.8rem] text-muted-foreground mt-1 md:text-[1rem]",
        "text-dark/80 leading-relaxed",
        className
      )}
    >
      {children}
    </p>
  );
}
