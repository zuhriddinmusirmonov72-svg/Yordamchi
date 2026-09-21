import { Message, Attachment } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_URL ? `${import.meta.env.VITE_API_URL}/api` : '/api';

export async function sendChatMessage(
  message: string,
  history: Message[],
  onUpdate?: (content: string) => void,
  attachments?: Attachment[]
): Promise<string> {


  const response = await fetch(`${API_BASE_URL}/chat`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      message,
      history: history.slice(-10), // Keep last 10 messages for context
      attachments: attachments || []
    }),
  });

  if (!response.ok) {
    let errorMsg = 'Failed to get response from AI';
    try {
      const error = await response.json();
      errorMsg = error.error || errorMsg;
    } catch (e) {}
    throw new Error(errorMsg);
  }

  if (!response.body) {
    throw new Error('No response body');
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder('utf-8');
  let fullContent = '';
  let buffer = '';

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    buffer += decoder.decode(value, { stream: true });
    const lines = buffer.split('\n');
    buffer = lines.pop() || '';

    for (const line of lines) {
      if (line.startsWith('data: ') && line.trim() !== 'data: [DONE]') {
        try {
          const data = JSON.parse(line.slice(6));
          const delta = data.choices?.[0]?.delta?.content || '';
          if (delta) {
            fullContent += delta;
            if (onUpdate) onUpdate(fullContent);
          }
        } catch (e) {
          // ignore incomplete lines if any
        }
      }
    }
  }

  return fullContent;
}

export async function uploadFile(file: File): Promise<Attachment> {
  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch(`${API_BASE_URL}/upload`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to upload file');
  }

  const data = await response.json();
  return data.attachment;
}

export async function checkHealth(): Promise<boolean> {
  try {
    const response = await fetch(`${API_BASE_URL}/health`);
    return response.ok;
  } catch {
    return false;
  }
}
