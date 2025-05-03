export interface Message {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content?: string;
  status?: 'loading' | 'error' | 'done';
  icon?: React.ReactNode;
  options?: string[];
}

export interface ChatSettings {
  code: number,
  message: string,
  data: {
    name: string,
    settings: {
      styles: {
          "--color": string,
          "--box-shadow": string,
          "--border-radius": string,
          "--background-color": string
      },
      messages: Message[],
      contactUrl: string,
      introOptions: string[],
      'placeholder-text': string
    }
  }
}

export interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
  options?: string[];
}

export interface ChatResponse {
  id: string;
  message: string;
  done: boolean;
} 