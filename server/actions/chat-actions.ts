'use server'

import { ChatSettings, ChatResponse } from '@/lib/types';
import { fetchChatbotSettings, sendChatMessage } from '../api/chat-api';

export async function getChatbotSettings(): Promise<ChatSettings> {
  try {
    const settings = await fetchChatbotSettings();
    return settings;
  } catch (error) {
    console.error('Error fetching chatbot settings:', error);
    throw new Error('Failed to fetch chatbot settings');
  }
}

export async function sendMessage(message: string): Promise<ChatResponse> {
  try {
    const response = await sendChatMessage(message);
    return response;
  } catch (error) {
    console.error('Error sending message:', error);
    throw new Error('Failed to send message');
  }
} 