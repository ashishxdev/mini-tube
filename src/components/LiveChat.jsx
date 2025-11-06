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
    <div className='ml-2 w-full h-[500px] p-2 border border-black bg-slate-100 rounded-t-lg overflow-y-scroll flex flex-col-reverse'>
        <div>
        {/* Don't use Indexes as keys */}
        {chatMessages.map((c,index) => 
        <ChatMessage key={index}
        name={c.name} 
        message={c.message}/>)}
        </div>
    </div>
    <form className='w-full p-2 ml-2 border border-black rounded-b-lg'
    onSubmit={(e)=>{
        e.preventDefault();
        // console.log("ON Form Submit", liveMessage)
        dispatch(addMessage({
            name: "Aashish",
            message: liveMessage
        }))
    }}>
        <input className="px-2 w-86 border border-black rounded-sm" type="text" value={liveMessage} 
        onChange={(e)=>{setLiveMessage(e.target.value)}}/>
        <button className='px-2 bg-green-200 ml-2'>Send</button>
    </form>
    </>
  )
}

export default LiveChat
