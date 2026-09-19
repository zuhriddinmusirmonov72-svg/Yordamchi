export interface Attachment {
  id: string;
  type: 'image' | 'file';
  name: string;
  size: number;
  mimeType: string;
  url?: string;
  data?: string; // base64 for images
}

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
  attachments?: Attachment[];
}

export interface Conversation {
  id: string;
  title: string;
  messages: Message[];
  createdAt: number;
  updatedAt: number;
}

export type Theme = 'light' | 'dark' | 'system';
export type Language = 'uz' | 'ru' | 'en';
