'use client'


import { signIn } from 'next-auth/react'
import Image from 'next/image'
import React, { useState } from 'react'
import logo from '../public/default1.svg'
import background from '../public/Maltphite.jpg'
import Demo from './Demo'
import ChampionSelect from './ChampionSelect'
import ChatRow from './ChatRow'



const Login = () => {

    const [selectedChampion, setSelectedChampion] = useState('')


  return (
    <div className='w-screen h-screen p-0 m-0 flex flex-col'>
        <nav className='flex items-center w-screen h-16 bg-gradient-to-b from-[#171215] to-[#221B1E] absolute top-0 z-50 border-b-2 border-[#2EBFA5]'>
            <div className='ml-[10%]'>
                <img src={logo.src} alt="logo" width={112} height={63}/>
            </div>
            <div className='ml-auto flex space-x-4 mr-[3%]'>
                <button
                        onClick={() => signIn()} 
                        className="text-white font-bold font-sans text-xl bg-[#13505B] px-2 py-1 rounded border-2 border-[#2EBFA5] hover:bg-[#2EBFA5] hover:border-[#13505B]">
                        Log In
                </button>
                <p className='text-white font-bold text-xl'> | </p>
                <button
                    onClick={() => signIn()} 
                    className="text-white font-bold text-xl bg-[#13505B] px-2 py-1 rounded border-2 border-[#2EBFA5] hover:bg-[#2EBFA5] hover:border-[#13505B]">
                    Sign Up
                </button>
            </div>
        </nav>
        <div className="flex flex-col w-screen">
            <Image 
                src={background.src}
                quality={100}
                width={1536}
                height={1152}
                className='w-screen h-screen object-cover'
                alt='background'
            />
            <div className='flex flex-col absolute h-screen w-screen'>
                <div className='flex flex-row h-1/2 '>
                    <div className='w-1/2'>

                    </div>
                    <Demo width='1/2' height='full' backgroundColor='gray-700' fontSize='16'/>
                </div>
                <ChampionSelect width='1/2' height='full' backgroundColor='gray-700' fontSize='16' columnsLg='8' columnsMd='4' selected={setSelectedChampion}/>
                
            </div>
        </div>

    </div>
  )
}

export default Login