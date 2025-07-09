import React from 'react';

function Message({ message, isOwn }) {
  return (
    <div className={`my-2 flex ${isOwn ? 'justify-end' : 'justify-start'}`}>
      <div className={`px-3 py-2 rounded-lg text-sm ${isOwn ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>
        {message.content}
      </div>
    </div>
  );
}

export default Message;
