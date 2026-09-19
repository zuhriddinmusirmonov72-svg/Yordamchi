import { useState, useEffect } from 'react'
import Sidebar from './components/Sidebar'
import ChatArea from './components/ChatArea'
import Settings from './components/Settings'
import { ChatProvider } from './context/ChatContext'
import { ThemeProvider } from './context/ThemeContext'

function App() {
  const [showSettings, setShowSettings] = useState(false)
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)

  return (
    <ThemeProvider>
      <ChatProvider>
        <div className="flex h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
          {isSidebarOpen && (
            <Sidebar 
              onSettingsClick={() => setShowSettings(true)}
              onClose={() => setIsSidebarOpen(false)}
            />
          )}
          
          <ChatArea 
            onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
            isSidebarOpen={isSidebarOpen}
          />

          {showSettings && (
            <Settings onClose={() => setShowSettings(false)} />
          )}
        </div>
      </ChatProvider>
    </ThemeProvider>
  )
}

export default App
