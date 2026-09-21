import { useState, useRef, useEffect } from 'react';
import { Send, Menu, Image as ImageIcon, X } from 'lucide-react';
import { useChat } from '../context/ChatContext';
import WelcomeScreen from './WelcomeScreen';
import MessageList from './MessageList';
import { sendChatMessage } from '../services/api';
import { generateId } from '../utils/helpers';
import { Message, Attachment } from '../types';

interface ChatAreaProps {
  onToggleSidebar: () => void;
  isSidebarOpen: boolean;
}

export default function ChatArea({ onToggleSidebar, isSidebarOpen }: ChatAreaProps) {
  const { currentConversation, addMessage, updateLastMessage, createNewChat, editMessage, regenerateResponse } = useChat();
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
    }
  }, [input]);

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
    // Reset file input so same file can be selected again
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const removeImage = () => {
    setSelectedImage(null);
  };

  const sendMessage = async (messageContent: string, messageHistory: Message[], attachments?: Attachment[]) => {
    setError(null);
    setIsLoading(true);

    try {
      // Create initial empty assistant message
      const assistantMessageId = generateId();
      addMessage({
        id: assistantMessageId,
        role: 'assistant',
        content: '',
        timestamp: Date.now(),
      });

      // Pass onUpdate callback to stream the text in real-time
      await sendChatMessage(messageContent, messageHistory, (partialResponse) => {
        updateLastMessage(partialResponse);
      }, attachments);
    } catch (err: any) {
      setError(err.message);
      console.error('Chat error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSend = async () => {
    if ((!input.trim() && !selectedImage) || isLoading) return;

    let attachments: Attachment[] | undefined;
    if (selectedImage) {
      attachments = [{
        id: generateId(),
        type: 'image',
        name: 'image.jpg',
        size: 0,
        mimeType: 'image/jpeg',
        data: selectedImage
      }];
    }

    const userMessage: Message = {
      id: generateId(),
      role: 'user',
      content: input.trim() || (selectedImage ? 'Rasmni tahlil qiling' : ''),
      timestamp: Date.now(),
      attachments,
    };

    // Create new chat if none exists
    if (!currentConversation) {
      createNewChat();
      // Wait a bit for the conversation to be created
      await new Promise(resolve => setTimeout(resolve, 100));
    }

    setInput('');
    setSelectedImage(null);
    addMessage(userMessage);

    const history = currentConversation?.messages || [];
    await sendMessage(userMessage.content, history, attachments);
  };

  const handleEditMessage = async (messageId: string, newContent: string) => {
    if (!currentConversation || isLoading) return;

    // Find the message index
    const messageIndex = currentConversation.messages.findIndex(m => m.id === messageId);
    if (messageIndex === -1) return;
    
    const messageToEdit = currentConversation.messages[messageIndex];

    // Update the message and remove everything after it
    editMessage(messageId, newContent);

    // Wait for state to update
    await new Promise(resolve => setTimeout(resolve, 100));

    // Get updated history (only messages before and including the edited one)
    const updatedHistory = currentConversation.messages.slice(0, messageIndex);

    // Send the edited message with its original attachments if any
    await sendMessage(newContent, updatedHistory, messageToEdit.attachments);
  };

  const handleRegenerate = async () => {
    if (!currentConversation || isLoading || currentConversation.messages.length < 2) return;

    // Remove last AI response
    regenerateResponse();

    // Wait for state to update
    await new Promise(resolve => setTimeout(resolve, 100));

    // Get the last user message
    const messages = currentConversation.messages;
    const lastUserMessage = [...messages].reverse().find(m => m.role === 'user');
    
    if (!lastUserMessage) return;

    // Get history before the last user message
    const lastUserIndex = messages.findIndex(m => m.id === lastUserMessage.id);
    const history = messages.slice(0, lastUserIndex);

    // Regenerate response
    await sendMessage(lastUserMessage.content, history, lastUserMessage.attachments);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleExampleClick = (text: string) => {
    setInput(text);
    textareaRef.current?.focus();
  };

  return (
    <div className="flex-1 flex flex-col h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-3 flex items-center gap-3 transition-colors">
        {!isSidebarOpen && (
          <button
            onClick={onToggleSidebar}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <Menu size={20} className="text-gray-600 dark:text-gray-400" />
          </button>
        )}
        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
          {currentConversation?.title || 'NovaAI'}
        </h2>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto">
        {!currentConversation || currentConversation.messages.length === 0 ? (
          <WelcomeScreen onExampleClick={handleExampleClick} />
        ) : (
          <MessageList 
            messages={currentConversation.messages} 
            isLoading={isLoading}
            onEditMessage={handleEditMessage}
            onRegenerateResponse={handleRegenerate}
          />
        )}
      </div>

      {/* Error Message */}
      {error && (
        <div className="mx-4 mb-2 p-3 bg-red-100 dark:bg-red-900/30 border border-red-300 dark:border-red-700 rounded-lg text-red-700 dark:text-red-300 text-sm">
          {error}
        </div>
      )}

      {/* Input Area */}
      <div className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 p-3 md:p-4 transition-colors">
        <div className="max-w-4xl mx-auto">
          {selectedImage && (
            <div className="mb-3 relative inline-block">
              <img src={selectedImage} alt="Preview" className="h-20 w-auto rounded-lg object-cover border border-gray-300 dark:border-gray-600" />
              <button 
                onClick={removeImage}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 shadow-md"
              >
                <X size={14} />
              </button>
            </div>
          )}
          
          <div className="flex gap-2 items-end bg-gray-100 dark:bg-gray-700 rounded-2xl p-2 transition-colors">
            <button
              onClick={() => fileInputRef.current?.click()}
              className="p-2 text-gray-500 hover:text-nova-purple dark:text-gray-400 dark:hover:text-nova-purple transition-colors mb-1"
              title="Rasm yuklash"
            >
              <ImageIcon size={22} />
            </button>
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleImageSelect} 
              accept="image/*" 
              className="hidden" 
            />
            
            <textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Savolni yozing yoki rasm yuklang..."
              rows={1}
              className="flex-1 bg-transparent text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 resize-none focus:outline-none px-2 py-2 max-h-32"
              disabled={isLoading}
            />
            <button
              onClick={handleSend}
              disabled={(!input.trim() && !selectedImage) || isLoading}
              className="p-3 bg-gradient-to-r from-nova-purple to-nova-blue text-white rounded-xl hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity flex-shrink-0"
            >
              <Send size={20} />
            </button>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 text-center mt-2">
            NovaAI can make mistakes. Check important information.
          </p>
        </div>
      </div>

    </div>
  );
}
