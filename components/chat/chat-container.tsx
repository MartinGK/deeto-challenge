'use client';

import { useEffect, useCallback, useMemo } from 'react';
import { useChatStore } from '@/store/chat-store';
import { getChatbotSettings, sendMessage } from '@/server/actions/chat-actions';
import { Message } from '@/lib/types';
import { v4 as uuidv4 } from 'uuid';
import ChatMessagesList from './chat-messages-list';
import ChatInput from './chat-input';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import ChatHeader from './chat-header';
import { Spinner } from '@/components/ui/spinner';
import { Brain } from 'lucide-react';
import ChatIntroOptions from './chat-intro-options';
import { suggestedMessages } from './constants';
import ChatDescription from './chat-description';

export default function ChatContainer() {
  const {
    messages,
    settings,
    isLoading,
    error,
    setMessages,
    addMessage,
    setSettings,
    setLoading,
    setError
  } = useChatStore();
  const randomIntroOption = useMemo(() => settings?.settings?.introOptions[Math.floor(Math.random() * settings?.settings?.introOptions.length)], [settings]);

  const updateMessage = useCallback((messageId: string, content: string, status: 'loading' | 'done' | 'error' = 'done') => {
    setMessages(prevMessages => prevMessages.map((msg: Message) =>
      msg.id === messageId
        ? { ...msg, content, status }
        : msg
    ));
  }, [setMessages]);

  useEffect(() => {
    async function initChat() {
      try {
        setLoading(true);
        const chatSettings = await getChatbotSettings();

        setSettings(chatSettings.data);
        console.log({ chatSettings });

        if (chatSettings.data?.settings?.messages?.length) {
          const formattedMessages = chatSettings.data.settings.messages.reduce((acc: Message[], msg: Message) => {
            if (acc.some((m: Message) => m.id === msg.id)) {
              return acc;
            }
            if (msg.content?.includes("{chatbot.name}")) {
              msg.content = msg.content.replace("{chatbot.name}", "Martin Gainza");
            }
            return [...acc, msg];
          }, []).map((msg: Message) => ({
            id: uuidv4(),
            role: msg.role,
            content: msg.content,
            status: 'done' as const
          }));

          setMessages(formattedMessages);
        }
      } catch (error) {
        setError(error instanceof Error ? error.message : 'Failed to initialize chat');
      } finally {
        setLoading(false);
      }
    }

    initChat();
  }, [setLoading, setSettings, setMessages, setError, addMessage]);

  const handleSendMessage = async (content: string) => {
    if (!content.trim()) return;

    const userMessage: Message = {
      id: uuidv4(),
      content,
      role: 'user',
      status: 'done'
    };
    addMessage(userMessage);

    try {
      setLoading(true);

      const assistantMessageId = uuidv4();
      const tempAssistantMessage: Message = {
        id: assistantMessageId,
        role: 'assistant',
        status: 'loading',
        icon: <Brain className="brain-pulse-icon" />
      };
      addMessage(tempAssistantMessage);

      const response = await sendMessage(content);
      updateMessage(assistantMessageId, response.message);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to send message');
      const lastMessage = messages[messages.length - 1];
      if (lastMessage && lastMessage.role === 'assistant') {
        updateMessage(lastMessage.id, 'Error al obtener respuesta', 'error');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSelectIntroOption = (option: string) => {
    handleSendMessage(option);
  };

  if (!settings) {
    return (
      <div className="flex items-center justify-center h-full">
        <Spinner size="lg" />
      </div>
    );
  }

  const chatStyles = settings?.settings?.styles as React.CSSProperties;

  return (
    <Card
      className="chat-card w-full h-full flex flex-col p-2 
      text-[var(--color)] 
      shadow-[var(--box-shadow)]
      rounded-[var(--border-radius)] "
      style={chatStyles}
    >
      <CardHeader className="border-b p-4">
        <ChatHeader title={settings?.name || "Chat Assistant"} />
        <ChatDescription>{randomIntroOption}</ChatDescription>
      </CardHeader>
      <CardContent className={`flex-grow overflow-y-auto p-4`}>
        {error && <div className="text-red-600 mb-4 mx-auto w-fit left-0 right-0 text-center bg-red-200 rounded-md p-2 fixed">{error}</div>}
        <ChatMessagesList messages={messages} />
      </CardContent>
      <CardFooter className="border-t p-4 flex flex-col gap-3">
        {suggestedMessages.length > 0 && (
          <ChatIntroOptions
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