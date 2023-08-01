'use client'
import { useSession, signOut } from 'next-auth/react'
import React from 'react'
import NewChat from './NewChat';
import {useCollection} from 'react-firebase-hooks/firestore'
import { collection } from 'firebase/firestore';
import { db } from '@/firebase';
import ChatRow from './ChatRow';
const SideBar = () => {

    const { data: session} = useSession();

    const [chats, login, error] = useCollection(
        session && collection(db, 'users', session?.user?.email!, 'chats')
    )


  return (
    <div className="p-2 flex flex-col h-screen bg-gray-800 text-white">
        <div className="flex-1">
            <div>
                <div>
                    <NewChat/>
                    {chats?.docs.map(chat => (
                        <ChatRow key={chat.id} id={chat.id} />
                    ))}
                </div>
            </div>
        </div>
        {session && (
            <img onClick={() => signOut()} src={session.user?.image || ''} alt='' className='h-12 w-12 rounded-full cursor-pointer mx-auto mb-2 hover:opacity-50'/>
        )}
    </div>
  )
}

export default SideBar