import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Conversation, Message } from '../types';
import { generateId } from '../utils/helpers';

interface ChatContextType {
  conversations: Conversation[];
  currentConversation: Conversation | null;
  createNewChat: () => void;
  selectConversation: (id: string) => void;
  addMessage: (message: Message) => void;
  updateLastMessage: (content: string) => void;
  regenerateResponse: () => void;
  editMessage: (messageId: string, newContent: string) => void;
  deleteConversation: (id: string) => void;
  clearAllHistory: () => void;
  searchConversations: (query: string) => Conversation[];
  updateConversationTitle: (id: string, newTitle: string) => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export function ChatProvider({ children }: { children: ReactNode }) {
  const [conversations, setConversations] = useState<Conversation[]>(() => {
    const saved = localStorage.getItem('conversations');
    return saved ? JSON.parse(saved) : [];
  });

  const [currentConversationId, setCurrentConversationId] = useState<string | null>(null);

  useEffect(() => {
    localStorage.setItem('conversations', JSON.stringify(conversations));
  }, [conversations]);

  const currentConversation = conversations.find(c => c.id === currentConversationId) || null;

  const createNewChat = () => {
    const newConv: Conversation = {
      id: generateId(),
      title: 'New Chat',
      messages: [],
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    setConversations(prev => [newConv, ...prev]);
    setCurrentConversationId(newConv.id);
  };

  const selectConversation = (id: string) => {
    setCurrentConversationId(id);
  };

  const addMessage = (message: Message) => {
    setConversations(prev => prev.map(conv => {
      if (conv.id === currentConversationId) {
        const updatedMessages = [...conv.messages, message];
        
        // Generate better title from first user message
        let title = conv.title;
        if (message.role === 'user' && conv.messages.length === 0) {
          // Extract first sentence or first 40 chars
          const firstSentence = message.content.split(/[.!?]/)[0].trim();
          title = firstSentence.slice(0, 40);
          if (firstSentence.length > 40) title += '...';
        }

        return {
          ...conv,
          messages: updatedMessages,
          title,
          updatedAt: Date.now(),
        };
      }
      return conv;
    }));
  };

  const updateLastMessage = (content: string) => {
    setConversations(prev => prev.map(conv => {
      if (conv.id === currentConversationId) {
        const messages = [...conv.messages];
        if (messages.length > 0) {
          messages[messages.length - 1] = {
            ...messages[messages.length - 1],
            content,
          };
        }
        return { ...conv, messages, updatedAt: Date.now() };
      }
      return conv;
    }));
  };

  const regenerateResponse = () => {
    // Remove last assistant message to trigger regeneration
    setConversations(prev => prev.map(conv => {
      if (conv.id === currentConversationId) {
        const messages = [...conv.messages];
        if (messages.length > 0 && messages[messages.length - 1].role === 'assistant') {
          messages.pop();
        }
        return { ...conv, messages, updatedAt: Date.now() };
      }
      return conv;
    }));
  };

  const editMessage = (messageId: string, newContent: string) => {
    setConversations(prev => prev.map(conv => {
      if (conv.id === currentConversationId) {
        const messageIndex = conv.messages.findIndex(m => m.id === messageId);
        if (messageIndex === -1) return conv;

        // Remove all messages after the edited one
        const updatedMessages = conv.messages.slice(0, messageIndex);
        // Add the edited message
        updatedMessages.push({
          ...conv.messages[messageIndex],
          content: newContent,
        });

        return {
          ...conv,
          messages: updatedMessages,
          updatedAt: Date.now(),
        };
      }
      return conv;
    }));
  };

  const updateConversationTitle = (id: string, newTitle: string) => {
    setConversations(prev => prev.map(conv => {
      if (conv.id === id) {
        return { ...conv, title: newTitle, updatedAt: Date.now() };
      }
      return conv;
    }));
  };

  const deleteConversation = (id: string) => {
    setConversations(prev => prev.filter(c => c.id !== id));
    if (currentConversationId === id) {
      setCurrentConversationId(null);
    }
  };

  const clearAllHistory = () => {
    setConversations([]);
    setCurrentConversationId(null);
  };

  const searchConversations = (query: string): Conversation[] => {
    if (!query.trim()) return conversations;
    
    const lowerQuery = query.toLowerCase();
    return conversations.filter(conv => 
      conv.title.toLowerCase().includes(lowerQuery) ||
      conv.messages.some(msg => msg.content.toLowerCase().includes(lowerQuery))
    );
  };

  return (
    <ChatContext.Provider value={{
      conversations,
      currentConversation,
      createNewChat,
      selectConversation,
      addMessage,
      updateLastMessage,
      regenerateResponse,
      editMessage,
      deleteConversation,
      clearAllHistory,
      searchConversations,
      updateConversationTitle,
    }}>
      {children}
    </ChatContext.Provider>
  );
}

export function useChat() {
  const context = useContext(ChatContext);
  if (!context) throw new Error('useChat must be used within ChatProvider');
  return context;
}
