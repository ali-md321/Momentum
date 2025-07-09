import React from 'react';
import { useSelector } from 'react-redux';

function ChatListItem({ chat, onClick }) {
  const { user } = useSelector(state => state.user);
  const friend = chat.users.find(u => u._id !== user._id);
  return (
    <div className="flex items-center p-3 hover:bg-gray-100 cursor-pointer" onClick={onClick}>
      <img src={friend.avatar?.url || '/default.png'} alt="avatar" className="w-10 h-10 rounded-full" />
      <div className="ml-3">
        <div className="font-semibold">@{friend.username}</div>
        <div className="text-sm text-gray-500 truncate w-40">{chat.latestMessage?.content || 'Start chatting'}</div>
      </div>
    </div>
  );
}

export default ChatListItem;