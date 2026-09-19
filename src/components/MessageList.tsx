import { useEffect, useRef } from 'react';
import { Message } from '../types';
import MessageBubble from './MessageBubble';
import { Loader2 } from 'lucide-react';

interface MessageListProps {
  messages: Message[];
  isLoading: boolean;
  onEditMessage?: (messageId: string, newContent: string) => void;
  onRegenerateResponse?: () => void;
}

export default function MessageList({ messages, isLoading, onEditMessage, onRegenerateResponse }: MessageListProps) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {messages.map((message, index) => (
        <MessageBubble 
          key={message.id} 
          message={message}
          onEdit={onEditMessage}
          onRegenerate={index === messages.length - 1 ? onRegenerateResponse : undefined}
          isLastMessage={index === messages.length - 1}
        />
      ))}
      
      {isLoading && (
        <div className="flex items-start gap-4 mb-6">
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-nova-purple to-nova-blue flex items-center justify-center flex-shrink-0">
            <span className="text-white font-semibold">AI</span>
          </div>
          <div className="flex-1 bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-sm">
            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
              <Loader2 className="animate-spin" size={18} />
              <span className="text-sm">NovaAI is thinking...</span>
            </div>
          </div>
        </div>
      )}
      
      <div ref={bottomRef} />
    </div>
  );
}
