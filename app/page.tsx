'use client'

import ChatContainer from '@/components/chat/chat-container';
import { useChatLogic } from '@/components/chat/hooks/useChatLogic';

export default function Home() {
  const { settings } = useChatLogic();
  return (
    <main className="flex h-full flex-col transition-all duration-1000  p-4"
    style={{
      backgroundColor: settings?.settings?.styles?.['--background-color'] || 'var(--background-color)'
    }}>
      <div className="flex flex-col w-full h-full">
        <ChatContainer />
      </div>
    </main>
  );
} 