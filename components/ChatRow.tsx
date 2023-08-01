import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import logo from '../public/next.svg'
import {TrashIcon} from '@heroicons/react/24/outline'
import { usePathname, useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { useCollection } from 'react-firebase-hooks/firestore'
import { collection, orderBy, query } from 'firebase/firestore'
import { db } from '@/firebase'
type Props = {
    id: string
}

function ChatRow({id}: Props) {

    const pathname = usePathname()
    const router = useRouter()
    const {data: session} = useSession()
    const [active, setActive] = useState(false)

    const [messages] = useCollection(query(
        collection(db, 'users', session?.user?.email!, 'chats', id, 'messages'),
        orderBy('createdAt', 'asc')
    ))


    useEffect(()=> {
        if(!pathname) return;
        setActive(pathname.includes(id))
    },[pathname])

  return (
    <Link href={`/chat/${id}`} className={`chatRow flex flex-row align-middle my-3 justify-center ${active && 'bg-gray-700/50'}`}>
        <img src={logo.src} className='h-10 w-10'></img>
        <p className='flex-1 hidden md:inline-flex truncate w-32 align-middle'>
            {messages?.docs[messages?.docs.length - 1]?.data().text || 'New Chat'}
        </p>
        <TrashIcon className='h-5 w-5 text-gray-700 hover:text-red-500'/>
    </Link>
  )
}

export default ChatRow