import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Message, ChatSettings } from '@/lib/types';

interface ChatState {
  messages: Message[];
  settings: ChatSettings['data'] | null;
  isLoading: boolean;
  error: string | null;
  setMessages: (messages: Message[] | ((prevMessages: Message[]) => Message[])) => void;
  addMessage: (message: Message) => void;
  setSettings: (settings: ChatSettings['data']) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  clearChat: () => void;
}


export const useChatStore = create<ChatState>()(
  persist(
    (set) => ({
      messages: [],
      settings: null,
      isLoading: false,
      error: null,
      
      setMessages: (messagesOrUpdater: Message[] | ((prevMessages: Message[]) => Message[])) => {
        if (typeof messagesOrUpdater === 'function') {
          set((state) => ({ messages: messagesOrUpdater(state.messages) }));
        } else {
          set({ messages: messagesOrUpdater });
        }
      },
      addMessage: (message) => set((state) => ({ 
        messages: [...state.messages, message] 
      })),
      setSettings: (settings) => set({ settings }),
      setLoading: (isLoading) => set({ isLoading }),
      setError: (error) => set({ error }),
      clearChat: () => set({ messages: [] }),
    }),
    {
      name: 'chat-storage',
      partialize: (state) => ({ 
        messages: state.messages,
        settings: state.settings 
      }),
    }
  )
); 