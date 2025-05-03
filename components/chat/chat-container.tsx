'use client';

import { useChatLogic } from '@/components/chat/hooks/useChatLogic';
import ChatMessagesList from './chat-messages-list';
import ChatInput from './chat-input';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import ChatHeader from './chat-header';
import { Spinner } from '@/components/ui/spinner';
import ChatSuggestionOptions from './chat-suggestion-options';
import ChatDescription from './chat-description';
import AnimatedIntro from './animated-intro';

export default function ChatContainer() {
  const {
    messages,
    settings,
    isLoading,
    error,
    showAnimation,
    fadeIn,
    randomIntroOption,
    chatStyles,
    chatTitle,
    handleSendMessage,
    handleSelectIntroOption,
    handleAnimationComplete,
    suggestedMessages
  } = useChatLogic();

  if (!settings) {
    return (
      <div className="flex items-center justify-center h-full">
        <Spinner size="lg" />
      </div>
    );
  }

  if (showAnimation) {
    return (
      <AnimatedIntro
        title={chatTitle}
        onAnimationComplete={handleAnimationComplete}
      />
    );
  }

  return (
    <Card
      className={`chat-card w-full h-full flex flex-col p-2 
      text-[var(--color)] 
      shadow-[var(--box-shadow)]
      rounded-[var(--border-radius)]
      transition-opacity duration-700 ease-in-out
      ${fadeIn ? 'opacity-100' : 'opacity-0'}`}
      style={chatStyles}
    >
      <CardHeader className="border-b p-4">
        <ChatHeader title={chatTitle} />
        <ChatDescription>{randomIntroOption}</ChatDescription>
      </CardHeader>
      <CardContent className="flex-grow overflow-y-auto p-4">
        {error && <div className="text-red-600 mb-4 mx-auto w-fit left-0 right-0 text-center bg-red-200 rounded-md p-2 fixed">{error}</div>}
        <ChatMessagesList messages={messages} />
      </CardContent>
      <CardFooter className="border-t p-4 flex flex-col gap-3">
        {suggestedMessages.length > 0 && (
          <ChatSuggestionOptions
            introOptions={suggestedMessages}
            onSelectOption={handleSelectIntroOption}
            isLoading={isLoading}
          />
        )}
        <ChatInput
          onSendMessage={handleSendMessage}
          isLoading={isLoading}
          placeholder={settings.settings?.["placeholder-text"] || "Type a message..."}
        />
      </CardFooter>
    </Card>
  );
} 