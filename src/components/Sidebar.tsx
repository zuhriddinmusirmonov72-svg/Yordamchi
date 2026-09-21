import { useState } from 'react';
import { Plus, Search, Settings, MessageSquare, Trash2, Menu } from 'lucide-react';
import { useChat } from '../context/ChatContext';
import { groupConversationsByDate } from '../utils/helpers';

interface SidebarProps {
  onSettingsClick: () => void;
  onClose: () => void;
}

export default function Sidebar({ onSettingsClick, onClose }: SidebarProps) {
  const { conversations, currentConversation, createNewChat, selectConversation, deleteConversation, searchConversations } = useChat();
  const [searchQuery, setSearchQuery] = useState('');

  const displayedConversations = searchQuery ? searchConversations(searchQuery) : conversations;
  const groupedConversations = groupConversationsByDate(displayedConversations);

  return (
    <div className="w-[85vw] max-w-[320px] md:w-80 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col h-screen transition-colors">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-bold bg-gradient-to-r from-nova-purple to-nova-blue bg-clip-text text-transparent">
            NovaAI
          </h1>
          <button
            onClick={onClose}
            className="md:hidden p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <Menu size={20} className="text-gray-600 dark:text-gray-400" />
          </button>
        </div>
        
        {/* New Chat Button */}
        <button
          onClick={createNewChat}
          className="w-full flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-nova-purple to-nova-blue text-white rounded-lg hover:opacity-90 transition-opacity"
        >
          <Plus size={20} />
          <span className="font-medium">New Chat</span>
        </button>
      </div>

      {/* Search */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search chats..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-nova-purple transition-colors"
          />
        </div>
      </div>

      {/* Conversation List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {Object.entries(groupedConversations).map(([group, convs]) => {
          if (convs.length === 0) return null;
          
          return (
            <div key={group}>
              <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase mb-2">
                {group}
              </h3>
              <div className="space-y-1">
                {convs.map((conv) => (
                  <div
                    key={conv.id}
                    className={`group flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer transition-colors ${
                      currentConversation?.id === conv.id
                        ? 'bg-gray-100 dark:bg-gray-700'
                        : 'hover:bg-gray-50 dark:hover:bg-gray-700/50'
                    }`}
                  >
                    <MessageSquare size={16} className="text-gray-400 flex-shrink-0" />
                    <span
                      onClick={() => selectConversation(conv.id)}
                      className="flex-1 text-sm text-gray-700 dark:text-gray-300 truncate"
                    >
                      {conv.title}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        if (confirm('Delete this conversation?')) {
                          deleteConversation(conv.id);
                        }
                      }}
                      className="opacity-0 group-hover:opacity-100 p-1 hover:bg-red-100 dark:hover:bg-red-900/30 rounded transition-all"
                    >
                      <Trash2 size={14} className="text-red-600 dark:text-red-400" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          );
        })}

        {displayedConversations.length === 0 && (
          <div className="text-center text-gray-500 dark:text-gray-400 text-sm mt-8">
            {searchQuery ? 'No conversations found' : 'No conversations yet'}
          </div>
        )}
      </div>

      {/* Settings Button */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <button
          onClick={onSettingsClick}
          className="w-full flex items-center gap-2 px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
        >
          <Settings size={20} />
          <span>Settings</span>
        </button>
      </div>
    </div>
  );
}
