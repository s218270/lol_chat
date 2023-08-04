'use client'
import { useSession, signOut } from 'next-auth/react'
import React from 'react'
import NewChat from './NewChat';
import {useCollection} from 'react-firebase-hooks/firestore'
import { collection } from 'firebase/firestore';
import { db } from '@/firebase';
import ChatRow from './ChatRow';
import ChampionSelect from './ChampionSelect';
const SideBar = () => {

    const { data: session} = useSession();
    
    const champions = ['Aatrox', 'Akali', 'Azir', 'Malphite']


  return (
    <div className="p-2 flex flex-col h-screen bg-gray-800 text-white">
        <div className="flex h-screen justify-end flex-col">
            <ChampionSelect width='1/2' height='full' backgroundColor='gray-700' fontSize='16' columnsLg='3' columnsMd='3'/>
            {/* <div>
                <div>
                    <NewChat/>
                    {champions.map(champion => (
                        <ChatRow key={champion} champion={champion}/>
                    ))}
                    
                </div>
            </div> */}
            {session && (
                <img onClick={() => signOut()} src={session.user?.image || ''} alt='' className='h-12 w-12 rounded-full cursor-pointer mx-auto mb-8 hover:opacity-50 mt-16'/>
            )}
        </div>
    </div>
  )
}

export default SideBar