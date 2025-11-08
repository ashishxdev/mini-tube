import React from 'react'

const ChatMessage = ({name, message}) => {
  return (
    <div className='flex items-center shadow-sm p-2 bg-[#2a2a2a] rounded-lg mb-1 text-gray-200'>
        <img
        className='h-8' 
        src="https://cdn-icons-png.flaticon.com/512/6914/6914292.png" alt="user" />
        <span className='font-bold px-2 text-blue-400'>{name}</span>
        <span className='text-white'>{message}</span>
    </div>
  )
}

export default ChatMessage
