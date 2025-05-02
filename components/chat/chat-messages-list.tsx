import { useRef, useEffect } from 'react';
import { Message } from '@/lib/types';
import ChatMessage from './chat-message';

interface ChatMessagesListProps {
  messages: Message[];
}

export default function ChatMessagesList({ messages }: ChatMessagesListProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  console.log(messages);

  return (
    <div className="space-y-4">
      {messages.map((message, index) => (
        <ChatMessage key={message.id + index} message={message}  />
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
} 