import React, { useState, useEffect } from 'react';
import ChatSidebar from './ChatSidebar';
import Inbox from './Inbox';

function ChatPage() {
  const [currentChat, setCurrentChat] = useState(null);

  const [isMobile, setIsMobile] = useState(window.innerWidth < 600);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 600);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const shouldShowSidebar = !isMobile || (isMobile && !currentChat);
  const shouldShowInbox = !isMobile || (isMobile && currentChat);

  return (
    <div className="flex h-[calc(100vh-4rem)] md:h-screen bg-white overflow-hidden">
      {/* Sidebar */}
      {shouldShowSidebar && (
        <div
          className={`overflow-y-auto
            ${isMobile ? 'w-full' : 'w-[22rem] border-r'}
            h-full`}
        >
          <ChatSidebar onSelectChat={(chat) => setCurrentChat(chat)} />
        </div>
      )}

      {/* Inbox */}
      {shouldShowInbox && (
        <div className={`${isMobile ? 'w-full' : 'flex-1'} h-full`}>
          <Inbox currentChat={currentChat} onBack={() => setCurrentChat(null)} />
        </div>
      )}
    </div>
  );
}

export default ChatPage;
