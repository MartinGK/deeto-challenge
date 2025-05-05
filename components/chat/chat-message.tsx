'use client';

import { useEffect, useState, useRef } from 'react';
import { Message } from '@/lib/types';
import { cn } from '@/lib/utils';
import { useChatStore } from '@/store/chat-store';

interface ChatMessageProps {
  message: Message;
}

export default function ChatMessage({ message }: ChatMessageProps) {
  const { settings } = useChatStore();
  const isUser = message.role === 'user';
  const isLoading = message.status === 'loading';
  const isError = message.status === 'error';
  
  const [displayedContent, setDisplayedContent] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const contentRef = useRef(message.content || '');
  const charIndexRef = useRef(0);
  
  const messageStyle = isUser ? {
    backgroundColor: 'var(--accent)',
    color: settings?.settings?.styles?.['--color'] || '#411f2d',
    borderRadius: settings?.settings?.styles?.['--border-radius'] || '12px 12px 0 12px',
    boxShadow: '0 2px 8px rgba(65, 31, 45, 0.1)',
    transition: 'all 0.3s ease',
    padding: '10px',
    fontWeight: '500'
  } : {
    backgroundColor:'var(--light)',
    color: settings?.settings?.styles?.['--color'] || '#411f2d',
    borderRadius: settings?.settings?.styles?.['--border-radius'] || '12px 12px 12px 0',
    boxShadow: '0 2px 8px rgba(65, 31, 45, 0.1)',
    transition: 'all 0.3s ease',
    padding: '10px',
    fontWeight: '500'
  };

  useEffect(() => {
    if (!isUser && !isLoading && message.content && message.status === 'done') {
      if (contentRef.current !== message.content) {
        contentRef.current = message.content || '';
        charIndexRef.current = 0;
        setDisplayedContent(contentRef.current.charAt(charIndexRef.current));
        setIsTyping(true);
        
        const typeNextChar = () => {
          if (charIndexRef.current < contentRef.current.length) {
            setDisplayedContent(prev => prev + contentRef.current.charAt(charIndexRef.current));
            charIndexRef.current++;
            
            const typingSpeed = Math.floor(Math.random() * 20) + 10;
            setTimeout(typeNextChar, typingSpeed);
          } else {
            setIsTyping(false);
          }
        };
        
        setTimeout(typeNextChar, 30);
      }
    } else if (isUser || isLoading) {
      setDisplayedContent(message.content || '');
    }
  }, [message.content, isUser, isLoading, message.status]);

  return (
    <div
      className={cn(
        "flex",
        isUser ? "justify-end" : "justify-start",
        "mb-4"
      )}
    >
      <div
        className={cn(
          "max-w-[80%]",
          isUser ? "user-message" : "assistant-message",
          isLoading && "typing-animation",
          isError && "bg-red-100 text-red-800",
          message.icon ? "flex items-center justify-center text-center" : "px-4"  
        )}
        style={messageStyle}
      >
        {isLoading && message.icon && (
          <div className="flex items-center justify-center text-center w-full">
            {message.icon}
          </div>
        )}
        {!isLoading && (
          <p className="text-left">
            {isUser || isError ? message.content : displayedContent}
            {isTyping && !isUser && !isLoading && (
              <span className="typing-cursor">|</span>
            )}
          </p>
        )}
        {isError && (
          <div className="text-xs text-red-600 mt-1">
            Error: Intenta nuevamente
          </div>
        )}
      </div>
    </div>
  );
} 