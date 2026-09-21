import { useState, useEffect } from 'react'
import Sidebar from './components/Sidebar'
import ChatArea from './components/ChatArea'
import Settings from './components/Settings'
import { ChatProvider } from './context/ChatContext'
import { ThemeProvider } from './context/ThemeContext'

function App() {
  const [showSettings, setShowSettings] = useState(false)
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth >= 768)

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsSidebarOpen(true)
      } else {
        setIsSidebarOpen(false)
      }
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <ThemeProvider>
      <ChatProvider>
        <div className="flex h-screen bg-gray-50 dark:bg-gray-900 transition-colors relative">
          {isSidebarOpen && (
            <>
              {/* Mobile Overlay */}
              <div 
                className="md:hidden fixed inset-0 bg-black/50 z-20" 
                onClick={() => setIsSidebarOpen(false)}
              />
              {/* Sidebar Container */}
              <div className="fixed md:relative z-30 h-full">
                <Sidebar 
                  onSettingsClick={() => setShowSettings(true)}
                  onClose={() => setIsSidebarOpen(false)}
                />
              </div>
            </>
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
