'use client'
import { useSession, signOut } from 'next-auth/react'
import React, { useEffect, useState } from 'react'
import NewChat from './NewChat';
import {useCollection} from 'react-firebase-hooks/firestore'
import { collection } from 'firebase/firestore';
import { db } from '@/firebase';
import ChatRow from './ChatRow';
import ChampionSelect from './ChampionSelect';
import SelectedChampion from './SelectedChampion';
import { ArrowLeftIcon, ArrowLeftOnRectangleIcon, HomeIcon, TrashIcon } from '@heroicons/react/24/outline';


// interface CustomProps {
//     selected: (championData: any) => void
// }

const SideBar  = () => {

    const { data: session} = useSession();
    const [selectedChampion, setSelectedChampion] = useState('Aatrox')
    const champions = ['Aatrox', 'Akali', 'Azir', 'Malphite']
    // useEffect(() => {
    //     selected(selectedChampion)
    // }, [selectedChampion])

  return (
    <div className="p-2 flex-col h-screen bg-gradient-to-r from-[#171215] to-[#221B1E] text-white hidden md:flex border-r-2 border-[#2EBFA5]">
            {/* <TrashIcon className='w-12 h-12 self-end my-2'/> */}
            <SelectedChampion champion={selectedChampion}/>
            <ChampionSelect width='1/2' height='full' backgroundColor='gray-700' fontSize='16' columnsLg='4' columnsMd='3' selected={setSelectedChampion}/>
            {/* <div>
                <div>
                    <NewChat/>
                    {champions.map(champion => (
                        <ChatRow key={champion} champion={champion}/>
                    ))}
                    
                </div>
            </div> */}
            <div className='flex bg-[#13505B] rounded text-white px-10 border-[#2EBFA5] border-2 mt-auto w-auto justify-between'>
                {session && (
                    <>
                    <img src={session.user?.image || ''} alt='' className='h-12 w-12 rounded cursor-pointer hover:opacity-50 my-2'/>
                    <button onClick={() => signOut()}>
                        <HomeIcon className='w-12 h-12 my-2'/>
                    </button>
                    </>
                )}
            </div>
        
    </div>
  )
}

export default SideBar