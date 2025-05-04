import { useEffect, useCallback, useMemo, useState } from 'react';
import { useChatStore } from '@/store/chat-store';
import { getChatbotSettings, sendMessage } from '@/server/actions/chat-actions';
import { Message } from '@/lib/types';
import { v4 as uuidv4 } from 'uuid';
import { Brain } from 'lucide-react';

export function useChatLogic() {
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
  
  const [animationComplete, setAnimationComplete] = useState(false);
  const [suggestedMessages, setSuggestedMessages] = useState<string[]>([]);
  const [animationStarted, setAnimationStarted] = useState(false);
  const [showAnimation, setShowAnimation] = useState(true);
  const [fadeIn, setFadeIn] = useState(false);
  
  const randomIntroOption = useMemo(() => 
    settings?.settings?.introOptions?.[
      Math.floor(Math.random() * (settings?.settings?.introOptions?.length || 1))
    ] || "", 
    [settings]
  );

  const updateMessage = useCallback((messageId: string, content: string, status: 'loading' | 'done' | 'error' = 'done') => {
    setMessages(prevMessages => prevMessages.map((msg: Message) =>
      msg.id === messageId
        ? { ...msg, content, status }
        : msg
    ));
  }, [setMessages]);

  useEffect(() => {
    if (settings && !animationStarted) {
      setAnimationStarted(true);
      
      const timer = setTimeout(() => {
        setAnimationComplete(true);
      }, 6000);
      
      return () => clearTimeout(timer);
    }
  }, [settings, animationStarted]);

  useEffect(() => {
    async function initChat() {
      try {
        setLoading(true);
        const chatSettings = await getChatbotSettings();

        setSettings(chatSettings.data);

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

          const lastMessage = chatSettings.data?.settings?.messages[chatSettings.data?.settings?.messages?.length - 1];

          if(lastMessage?.options?.length) {
            setSuggestedMessages(lastMessage.options);
          }

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

  useEffect(() => {
    if (!showAnimation) {
      setTimeout(() => {
        setFadeIn(true);
      }, 100);
    }
  }, [showAnimation]);

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

  const handleAnimationComplete = () => {
    setShowAnimation(false);
  };

  const chatStyles = settings?.settings?.styles as React.CSSProperties;
  const chatTitle = settings?.name || "Chat Assistant";

  return {
    messages,
    settings,
    isLoading,
    error,
    showAnimation,
    fadeIn,
    randomIntroOption,
    chatStyles,
    chatTitle,
    animationComplete,
    suggestedMessages,
    handleSendMessage,
    handleSelectIntroOption,
    handleAnimationComplete
  };
} 