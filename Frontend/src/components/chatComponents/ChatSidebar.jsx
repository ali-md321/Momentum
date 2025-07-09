import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllChats, accessChat } from '../../actions/chatAction';
import ChatListItem from './ChatListItem';
import SearchModal from './SearchModal';
import SearchIcon from '@mui/icons-material/Search';

function ChatSidebar({ onSelectChat }) {
  const dispatch = useDispatch();
  const { allChats: chats = [] } = useSelector(state => state.allChats);
  const { user } = useSelector(state => state.user);
  const [showModal, setShowModal] = useState(false);
  const [searching, setSearching] = useState(false);

  useEffect(() => {
    dispatch(getAllChats());
  }, [dispatch]);

  const handleSelectUser = (user) => {
    dispatch(accessChat(user._id)).then(chat => {
      if (chat?._id) {
        onSelectChat(chat);
        dispatch(getAllChats()); // refresh sidebar immediately
      }
    });
  };

  return (
    <div className="h-full flex flex-col bg-white">
    {/* Header */}
    <div className="sticky top-0 bg-white z-10 border-b p-4 text-xl font-bold">
      {user.username}
    </div>

    <div className="p-4 font-semibold text-xl flex justify-between items-center border-b">
      Chats
      {!searching ? (
        <SearchIcon className="cursor-pointer" onClick={() => {
          setShowModal(true);
          setSearching(true);
        }} />
      ) : (
        <input
          type="text"
          placeholder="Search users..."
          onFocus={() => setShowModal(true)}
          className="border px-2 py-1 rounded w-full"
        />
      )}
    </div>

    {/* Chat List Scrollable */}
    <div className="flex-1 overflow-y-auto px-2 py-2 space-y-1">
      {chats.map(chat => (
        <ChatListItem key={chat._id} chat={chat} onClick={() => onSelectChat(chat)} />
      ))}
    </div>

    {showModal && (
      <SearchModal
        onClose={() => {
          setShowModal(false);
          setSearching(false);
        }}
        onSelectUser={handleSelectUser}
      />
    )}
  </div>

  );
}

export default ChatSidebar;
