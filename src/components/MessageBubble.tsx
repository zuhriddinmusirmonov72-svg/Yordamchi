import { User, Copy, Check, RotateCw, Edit2 } from 'lucide-react';
import { Message } from '../types';
import { formatTimestamp } from '../utils/helpers';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus, vs } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { useState } from 'react';
import { useTheme } from '../context/ThemeContext';

interface MessageBubbleProps {
  message: Message;
  onEdit?: (messageId: string, newContent: string) => void;
  onRegenerate?: () => void;
  isLastMessage?: boolean;
}

export default function MessageBubble({ message, onEdit, onRegenerate, isLastMessage }: MessageBubbleProps) {
  const { effectiveTheme } = useTheme();
  const isUser = message.role === 'user';
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(message.content);
  const [copied, setCopied] = useState(false);

  const handleCopyMessage = async () => {
    await navigator.clipboard.writeText(message.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSaveEdit = () => {
    if (editContent.trim() && onEdit) {
      onEdit(message.id, editContent.trim());
      setIsEditing(false);
    }
  };

  const handleCancelEdit = () => {
    setEditContent(message.content);
    setIsEditing(false);
  };

  return (
    <div className={`flex items-start gap-4 mb-6 ${isUser ? 'justify-end' : ''}`}>
      {!isUser && (
        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-nova-purple to-nova-blue flex items-center justify-center flex-shrink-0">
          <span className="text-white font-semibold text-sm">AI</span>
        </div>
      )}
      
      <div className={`flex-1 max-w-3xl ${isUser ? 'flex justify-end' : ''}`}>
        <div className="group">
          <div
            className={`rounded-2xl p-4 shadow-sm ${
              isUser
                ? 'bg-gradient-to-r from-nova-purple to-nova-blue text-white'
                : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100'
            }`}
          >
            {isEditing ? (
              <div className="space-y-3">
                <textarea
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                  className="w-full bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-nova-purple resize-none min-h-[100px]"
                  autoFocus
                />
                <div className="flex gap-2">
                  <button
                    onClick={handleSaveEdit}
                    className="px-4 py-2 bg-nova-purple text-white rounded-lg hover:opacity-90 text-sm"
                  >
                    Save & Resend
                  </button>
                  <button
                    onClick={handleCancelEdit}
                    className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 text-sm"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <>
                {isUser ? (
                  <div className="space-y-3">
                    {message.attachments?.map((attachment) => (
                      attachment.type === 'image' && attachment.data && (
                        <img 
                          key={attachment.id} 
                          src={attachment.data} 
                          alt="Attached" 
                          className="max-w-full h-auto max-h-80 rounded-lg object-contain bg-black/10"
                        />
                      )
                    ))}
                    {message.content && <p className="whitespace-pre-wrap">{message.content}</p>}
                  </div>
                ) : (
                  <div className="prose prose-sm dark:prose-invert max-w-none">
                    <ReactMarkdown
                      components={{
                        code({ node, inline, className, children, ...props }) {
                          const match = /language-(\w+)/.exec(className || '');
                          return !inline && match ? (
                            <CodeBlock
                              language={match[1]}
                              code={String(children).replace(/\n$/, '')}
                              theme={effectiveTheme}
                            />
                          ) : (
                            <code
                              className="bg-gray-100 dark:bg-gray-700 px-1.5 py-0.5 rounded text-sm"
                              {...props}
                            >
                              {children}
                            </code>
                          );
                        },
                      }}
                    >
                      {message.content}
                    </ReactMarkdown>
                  </div>
                )}
                <div className="flex items-center justify-between mt-2">
                  <p className={`text-xs ${isUser ? 'text-white/70' : 'text-gray-500 dark:text-gray-400'}`}>
                    {formatTimestamp(message.timestamp)}
                  </p>
                  
                  {/* Action buttons */}
                  <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={handleCopyMessage}
                      className={`p-1.5 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors ${
                        isUser ? 'text-white/70 hover:text-white' : 'text-gray-500 dark:text-gray-400'
                      }`}
                      title="Copy message"
                    >
                      {copied ? <Check size={14} /> : <Copy size={14} />}
                    </button>
                    
                    {isUser && onEdit && (
                      <button
                        onClick={() => setIsEditing(true)}
                        className="p-1.5 rounded text-white/70 hover:text-white hover:bg-white/10 transition-colors"
                        title="Edit message"
                      >
                        <Edit2 size={14} />
                      </button>
                    )}
                    
                    {!isUser && isLastMessage && onRegenerate && (
                      <button
                        onClick={onRegenerate}
                        className="p-1.5 rounded hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400 transition-colors"
                        title="Regenerate response"
                      >
                        <RotateCw size={14} />
                      </button>
                    )}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {isUser && (
        <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center flex-shrink-0">
          <User size={20} className="text-gray-600 dark:text-gray-400" />
        </div>
      )}
    </div>
  );
}

function CodeBlock({ language, code, theme }: { language: string; code: string; theme: 'light' | 'dark' }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group my-4">
      <div className="flex items-center justify-between bg-gray-800 dark:bg-gray-900 px-4 py-2 rounded-t-lg">
        <span className="text-xs text-gray-400 font-mono">{language}</span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1 px-2 py-1 text-xs text-gray-400 hover:text-white transition-colors"
        >
          {copied ? (
            <>
              <Check size={14} />
              Copied
            </>
          ) : (
            <>
              <Copy size={14} />
              Copy
            </>
          )}
        </button>
      </div>
      <SyntaxHighlighter
        language={language}
        style={theme === 'dark' ? vscDarkPlus : vs}
        customStyle={{
          margin: 0,
          borderTopLeftRadius: 0,
          borderTopRightRadius: 0,
          borderBottomLeftRadius: '0.5rem',
          borderBottomRightRadius: '0.5rem',
        }}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
}
