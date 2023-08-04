'use client'

import { db } from '@/firebase'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { type } from 'os'
import React from 'react'


function NewChat() {
    const router = useRouter()
    const {data: session} = useSession()

    const createNewChat = async() => {
        const doc = await addDoc(collection(db, 'users', session?.user?.email!, 'champions'), {
            userId: session?.user?.email!,
            createdAt: serverTimestamp()
        })

        router.push(`/champions/${doc.id}`)

    }

  return (
    <button onClick={createNewChat} className='rounded-3xl bg-neutral-600'>New Chat</button>
  )
}

export default NewChat