'use client'

import { db } from '@/firebase'
import { PaperAirplaneIcon } from '@heroicons/react/24/outline'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { useSession } from 'next-auth/react'
import React, { useState } from 'react'
import {toast} from 'react-hot-toast'


type Props = {
    chatId: string
}


function ChatInput({chatId} : Props) {

    const [prompt, setPrompt] = useState<string>('')
    const {data: session} = useSession()
    //useSWR to get model
    const model = 'text-davinci-003'


    const sendMessage = async(e : React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if(!prompt) return;
        const input = prompt.trim()
        setPrompt('')
        const message : Message = {
            text: input,
            createdAt: serverTimestamp(),
            user: {
                _id: session?.user?.email!,
                name: session?.user?.name!,
                avatar: session?.user?.image! || `https://ui-avatars.com/api/?name=${session?.user?.name}`
            }
        }

        await addDoc(collection(db, 'users', session?.user?.email!, 'chats', chatId, 'messages'),
                        message)

        //toast notification loading
        const notification = toast.loading('Chat is thinking')

        await fetch('/api/askQuestion', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                prompt: input, chatId, model, session
            })
        }).then(() => {
        //toast notification successfull
            toast.success('Chat has responded', {
                id: notification
            })
        })
        
    }

  return (
    <div className='bg-gray-500/50 text-gray-400 rounded-lg text-base'>
        <form onSubmit={sendMessage} className='p-5 space-x-5 flex'>
            <input onChange={e => setPrompt(e.target.value)} value={prompt} type='text' placeholder='Type your message' 
            className='focus:outline-none bg-transparent flex-1 disabled:cursor-not-allowed disabled:text-gray-300'
            disabled={!session}/>    
            <button type='submit' disabled={!prompt} className='bg-[#11A37F] hover:opacity-50 text-white font-bold px-4 py-2 rounded-3xl disabled:bg-gray-300 disabled:cursor-not-allowed'>
                <PaperAirplaneIcon className='h-5 w-5 -rotate-45'/>
            </button>
        </form>        
    </div>
  )
}

export default ChatInput