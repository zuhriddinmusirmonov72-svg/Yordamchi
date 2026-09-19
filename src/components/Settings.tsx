import { X, Moon, Sun, Monitor, Trash2 } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useChat } from '../context/ChatContext';
import { Theme } from '../types';

interface SettingsProps {
  onClose: () => void;
}

export default function Settings({ onClose }: SettingsProps) {
  const { theme, setTheme } = useTheme();
  const { clearAllHistory, currentConversation, deleteConversation } = useChat();

  const themes: { value: Theme; label: string; icon: any }[] = [
    { value: 'light', label: 'Light', icon: Sun },
    { value: 'dark', label: 'Dark', icon: Moon },
    { value: 'system', label: 'System', icon: Monitor },
  ];

  const handleClearAll = () => {
    if (confirm('Are you sure you want to delete all conversations? This cannot be undone.')) {
      clearAllHistory();
      onClose();
    }
  };

  const handleClearCurrent = () => {
    if (currentConversation && confirm('Delete this conversation?')) {
      deleteConversation(currentConversation.id);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Settings</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <X size={20} className="text-gray-600 dark:text-gray-400" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Theme Selection */}
          <div>
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
              Theme
            </h3>
            <div className="grid grid-cols-3 gap-2">
              {themes.map(({ value, label, icon: Icon }) => (
                <button
                  key={value}
                  onClick={() => setTheme(value)}
                  className={`flex flex-col items-center gap-2 p-4 rounded-lg border-2 transition-all ${
                    theme === value
                      ? 'border-nova-purple bg-nova-purple/10'
                      : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                  }`}
                >
                  <Icon
                    size={24}
                    className={theme === value ? 'text-nova-purple' : 'text-gray-600 dark:text-gray-400'}
                  />
                  <span
                    className={`text-sm font-medium ${
                      theme === value
                        ? 'text-nova-purple'
                        : 'text-gray-700 dark:text-gray-300'
                    }`}
                  >
                    {label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* AI Model Info */}
          <div>
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              AI Model
            </h3>
            <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                OpenRouter API
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                Free model - Configured via server
              </p>
            </div>
          </div>

          {/* Language Info */}
          <div>
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Language
            </h3>
            <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Auto-detect (Uzbek, Russian, English)
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                AI responds in the language you use
              </p>
            </div>
          </div>

          {/* Data Management */}
          <div>
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
              Data Management
            </h3>
            <div className="space-y-2">
              {currentConversation && (
                <button
                  onClick={handleClearCurrent}
                  className="w-full flex items-center gap-2 px-4 py-3 bg-orange-50 dark:bg-orange-900/20 text-orange-700 dark:text-orange-400 rounded-lg hover:bg-orange-100 dark:hover:bg-orange-900/30 transition-colors"
                >
                  <Trash2 size={18} />
                  <span className="font-medium">Clear Current Chat</span>
                </button>
              )}
              <button
                onClick={handleClearAll}
                className="w-full flex items-center gap-2 px-4 py-3 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors"
              >
                <Trash2 size={18} />
                <span className="font-medium">Clear All History</span>
              </button>
            </div>
          </div>

          {/* About */}
          <div>
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              About NovaAI
            </h3>
            <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Version 1.0.0
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                AI-powered conversational assistant
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
