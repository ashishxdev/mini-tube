import React, { useEffect, useState } from 'react'
import ChatMessage from './ChatMessage'
import { useDispatch, useSelector } from 'react-redux'
import { addMessage } from '../utils/chatSlice'
import { generateRandomName, makeRandomMessage } from '../utils/helper'

const LiveChat = () => {
    const [liveMessage, setLiveMessage] = useState("")
    const dispatch = useDispatch()

    const chatMessages = useSelector(store => store.chat.messages)

    useEffect(()=>{
        const i = setInterval(() => {
            // API Polling
            // console.log("Api polling")
            dispatch(addMessage({
                name: generateRandomName(),
                message: makeRandomMessage(10) + "😂",
        }))
        }, 2000);

        // garbage collection
        return () => clearInterval(i)
    }, [])

  return (
    <>
    <div className='ml-2 w-full'>
    <div className='h-[450px] p-2 border bg-[#181818] rounded-t-lg overflow-y-scroll flex flex-col-reverse text-white'>
        <div>
        {/* Don't use Indexes as keys */}
        {chatMessages.map((c,index) => 
        <ChatMessage key={c.id || index}
        name={c.name} 
        message={c.message}/>)}
        </div>
    </div>
    <form className='w-full p-2 border border-red rounded-b-lg bg-[#212121]'
    onSubmit={(e)=>{
        e.preventDefault();
        // console.log("ON Form Submit", liveMessage)
        dispatch(addMessage({
            name: "Aashish",
            message: liveMessage,
            id: Date.now()
        }))
        setLiveMessage("")
    }}>
        <input className="px-2 w-86 border border-white rounded-sm bg-[#272727] text-white" type="text" value={liveMessage} 
        onChange={(e)=>{setLiveMessage(e.target.value)}}/>
        <button className='px-2 py-1 rounded-lg bg-[#272727] ml-2 text-white'
        >Send</button>
    </form>
    </div>
    </>
  )
}

export default LiveChat
