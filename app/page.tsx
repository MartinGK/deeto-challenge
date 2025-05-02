import ChatContainer from '@/components/chat/chat-container';

export default function Home() {
  return (
    <main className="flex h-full flex-col bg-[var(--background-color)] transition-all duration-300">
      <div className="flex flex-col w-full h-full">
        <ChatContainer />
      </div>
    </main>
  );
} 