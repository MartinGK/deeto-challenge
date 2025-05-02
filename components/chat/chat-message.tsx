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
  
  const messageStyle = isUser ? {
    backgroundColor: 'var(--light)',
    color: settings?.settings?.styles?.['--color'] || '#411f2d',
    borderRadius: settings?.settings?.styles?.['--border-radius'] || '12px 12px 0 12px',
    boxShadow: '0 2px 8px rgba(65, 31, 45, 0.1)',
    transition: 'all 0.3s ease',
    padding: '10px',
    fontWeight: '500'
  } : {
    backgroundColor:'var(--accent)',
    color: settings?.settings?.styles?.['--color'] || '#411f2d',
    borderRadius: settings?.settings?.styles?.['--border-radius'] || '12px 12px 12px 0',
    boxShadow: '0 2px 8px rgba(65, 31, 45, 0.1)',
    transition: 'all 0.3s ease',
    padding: '10px',
    fontWeight: '500'
  };

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
        {message.content ? <p>
          {message.content}
        </p> : null}
        {isError && (
          <div className="text-xs text-red-600 mt-1">
            Error: Intenta nuevamente
          </div>
        )}
      </div>
    </div>
  );
} 