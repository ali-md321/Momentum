import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import Message from './Message';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { getSocket } from '../../utils/socket';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom'
import { axiosInstance as axios } from '../../utils/axiosInstance';


const socket = getSocket();

function Inbox({ currentChat, onBack }) {
  const { user } = useSelector((state) => state.user);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [typing, setTyping] = useState(false);
  const scrollRef = useRef();
  const typingTimeoutRef = useRef(null);

  useEffect(() => {
    if (!currentChat?._id) return;
    axios.get(`/api/messages/${currentChat._id}`)
      .then((res) => setMessages(res.data.messages || []))
      .catch(() => setMessages([]));
  }, [currentChat]);

  useEffect(() => {
    if (currentChat?._id) socket.emit('joinChat', currentChat._id);
  }, [currentChat]);

  useEffect(() => {
    const handleMsg = (msg) => {
      if (msg.chatId === currentChat._id) {
        setMessages((prev) => [...prev, msg]);
      } else {
        toast.info('New message received');
      }
    };
    const handleTyping = ({ chatId }) => {
      if (chatId === currentChat._id) setTyping(true);
    };
    const handleStopTyping = ({ chatId }) => {
      if (chatId === currentChat._id) setTyping(false);
    };

    socket.on('getMessage', handleMsg);
    socket.on('typing', handleTyping);
    socket.on('stopTyping', handleStopTyping);

    return () => {
      socket.off('getMessage', handleMsg);
      socket.off('typing', handleTyping);
      socket.off('stopTyping', handleStopTyping);
    };
  }, [currentChat]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async () => {
    if (!newMessage.trim()) return;
    try {
      const res = await axios.post(
        '/api/message',
        { chatId: currentChat._id, content: newMessage }, // ✅ data
        { headers: { 'Content-Type': 'application/json' } } // ✅ config
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      const enriched = { ...data.message, sender: user };
      setMessages((prev) => [...prev, enriched]);
      socket.emit('sendMessage', { ...enriched, chatId: currentChat._id });
      socket.emit('stopTyping', { chatId: currentChat._id });
      setNewMessage('');
      setTyping(false);
    } catch (err) {
      toast.error(err || 'Failed to send message');
    }
  };

  const onTyping = (e) => {
    setNewMessage(e.target.value);
    socket.emit('typing', { chatId: currentChat._id });
    clearTimeout(typingTimeoutRef.current);
    typingTimeoutRef.current = setTimeout(() => {
      socket.emit('stopTyping', { chatId: currentChat._id });
    }, 1500);
  };

  if (!currentChat || !currentChat._id) {
    return (
      <div className="flex items-center justify-center h-full text-gray-500 text-lg">
        Select a chat to start messaging
      </div>
    );
  }

  const friend = currentChat.users.find((u) => u._id !== user._id);

  return (
    <div className="relative h-full w-full bg-white flex flex-col">
      {/* Header - fixed */}
      <div className="sticky top-0 bg-white z-10 border-b p-3 flex items-center gap-3">
        <button onClick={onBack}>
          <ArrowBackIcon className="text-gray-600 hover:text-black" />
        </button>
        <Link className='flex' to={`/user/${friend._id}`}>
          <img
            src={friend.avatar?.url || 'https://i.pravatar.cc/300'}
            alt="Avatar"
            className="w-10 h-10 rounded-full border mr-3"
          />
          <div className="font-semibold mt-2">@{friend.username}</div>
        </Link>
      </div>
  
      {/* Messages - scrollable */}
      <div className="flex-1 overflow-y-auto px-4 py-2 space-y-2">
        {messages.map((msg, idx) => (
          <Message key={idx} message={msg} isOwn={msg.sender?._id === user._id} />
        ))}
        {typing && <div className="text-sm text-gray-400 italic">Typing...</div>}
        <div ref={scrollRef} />
      </div>
  
      {/* Input - fixed bottom */}
      <div className="sticky bottom-0 bg-white border-t p-3 flex items-center gap-2">
        <input
          type="text"
          value={newMessage}
          onChange={onTyping}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          placeholder="Type a message..."
          className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none"
        />
        <button
          onClick={sendMessage}
          className="px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600"
        >
          Send
        </button>
      </div>
    </div>
  );
  
}

export default Inbox;
