'use client'

import { db } from '@/firebase'
import { collection, orderBy, query } from 'firebase/firestore'
import { useSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'
import { useCollection } from 'react-firebase-hooks/firestore'
import Message from './Message'
import type {InferGetServerSidePropsType ,GetServerSideProps, NextPage } from 'next'
import { ArrowLeftOnRectangleIcon } from '@heroicons/react/24/outline'


interface Props {
    champion: string;
    fileNames: string[]
  }

const Chat: NextPage<Props> = (props) => {

    const [image, setImage] = useState(`/champions/${props.champion}/background/${props.champion}_OriginalSkin.jpg`);

    console.log(props.champion, props.fileNames);

    const {data: session} = useSession()

    const [messages] = useCollection(session && query(collection(db, 'users', session?.user?.email!, 'champions', props.champion, 'messages'),
                                    orderBy('createdAt', 'asc')))

  return (
    <div className='flex-1 h-screen overflow-hidden overflow-y-hidden mr-0 p-0'>
        <img src={image} className="flex-1 h-screen w-screen object-cover"/>
        <button className="absolute top-0 left-0 p-3 z-50 rotate-180 md:rotate-0">
                <ArrowLeftOnRectangleIcon className='w-12 h-12 self-end text-white'/>
        </button>
        <div className='absolute bottom-20 h-8 w-screen flex z-50 space-x-3 justify-center'>
        {props.fileNames.map((item) => (
                <button key={item} onClick={() => setImage(`/champions/${props.champion}/background/${item}`)} className={`w-6 h-6 rounded hover:opacity-50 ${
                    image == `/champions/${props.champion}/background/${item}` ? 'bg-[#2EBFA5]' : 'bg-slate-200'
                  } active:bg-[#13505B]`}/>
                ))}
        </div>
        <div className='top-0 absolute h-5/6 overflow-y-auto w-full'>
        {messages?.docs.map((message) => (
            <Message key={message.id} message={message.data()} avatar={props.champion}/>
        ))}
        </div>
    </div>
  )
}

export default Chat