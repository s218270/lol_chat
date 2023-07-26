'use client'


import { signIn } from 'next-auth/react'
import Image from 'next/image'
import React from 'react'
import logo from '../public/great_logos_logo_on_black_background_gold_wings_at_the_sides_i_0-removebg-preview.png'
import background from '../public/Maltphite.jpg'


const Login = () => {
  return (
    <div>
        <nav className='flex items-center w-screen h-16 bg-[#111111]'>
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
        </div>

    </div>
  )
}

export default Login