import { ChatSettings, ChatResponse } from '@/lib/types';
import { withRetry } from '@/lib/utils';

const VENDOR_ID = process.env.DEETO_VENDOR_ID;
const API_BASE_URL = 'https://dev-api.deeto.ai/v2';

export async function fetchChatbotSettings(): Promise<ChatSettings> {
  if (!VENDOR_ID) {
    throw new Error('DEETO_VENDOR_ID is not defined');
  }

  return withRetry(
    async () => {
      const response = await fetch(`${API_BASE_URL}/chatbot/${VENDOR_ID}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        cache: 'no-store',
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch chatbot settings: ${response.statusText}`);
      }

      return response.json();
    },
    {
      maxRetries: 3,
      onRetry: (attempt, error) => {
        console.warn(`Retry attempt ${attempt} for fetchChatbotSettings: ${error.message}`);
      }
    }
  );
}

export async function sendChatMessage(message: string, useAsync = true): Promise<ChatResponse> {
  if (!VENDOR_ID) {
    throw new Error('DEETO_VENDOR_ID is not defined');
  }

  return withRetry(
    async () => {
      const response = await fetch(`${API_BASE_URL}/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          async: useAsync,
          message,
          vendorId: VENDOR_ID,
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to send message: ${response.statusText}`);
      }

      return response.json();
    },
    {
      maxRetries: 2,
      onRetry: (attempt, error) => {
        console.warn(`Retry attempt ${attempt} for sendChatMessage: ${error.message}`);
      }
    }
  );
}
