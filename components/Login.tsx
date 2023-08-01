'use client'


import { signIn } from 'next-auth/react'
import Image from 'next/image'
import React from 'react'
import logo from '../public/logo_on_black_background_gold_wings_at_the_sides_i_0-removebg.png'
import background from '../public/Maltphite.jpg'
import Demo from './Demo'
import ChampionSelect from './ChampionSelect'


const Login = () => {
  return (
    <div>
        <nav className='flex items-center w-screen h-16 bg-gradient-to-b from-gray-700 to-gray-900 border-b-2 border-gray-700'>
            <div className='ml-[10%]'>
                <img src={logo.src} alt="logo" width={112} height={63}/>
            </div>
            <div className='ml-auto flex space-x-4 mr-[3%]'>
                <button
                        onClick={() => signIn()} 
                        className="text-white font-bold font-sans text-2xl">
                        Log In
                </button>
                <p className='text-white font-bold text-2xl'> | </p>
                <button
                    onClick={() => signIn()} 
                    className="text-white font-bold text-2xl">
                    Sign In
                </button>
            </div>
        </nav>
        <div className="flex w-screen">
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
                <ChampionSelect />
            </div>
        </div>

    </div>
  )
}

export default Login