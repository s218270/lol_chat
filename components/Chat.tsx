'use client'

import { db } from '@/firebase'
import { collection, orderBy, query } from 'firebase/firestore'
import { useSession } from 'next-auth/react'
import React from 'react'
import { useCollection } from 'react-firebase-hooks/firestore'
import Message from './Message'

type Props = {
    champion: string
}

function Chat({champion}: Props) {

    const {data: session} = useSession()

    const [messages] = useCollection(session && query(collection(db, 'users', session?.user?.email!, 'champions', champion, 'messages'),
                                    orderBy('createdAt', 'asc')))

  return (
    <div className='flex-1 overflow-y-scroll'>
        {messages?.docs.map((message) => (
            <Message key={message.id} message={message.data()}/>
        ))}
    </div>
  )
}

export default Chat