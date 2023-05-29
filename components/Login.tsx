'use client'


import { signIn } from 'next-auth/react'
import Image from 'next/image'
import React from 'react'

const Login = () => {
  return (
    <div className="bg-gray-500 flex h-screen flex-col items-center justify-center text-center">
        <Image 
            src='https://links.papareact.com/2i6'
            width={300}
            height={300}
            alt='logo'
        />
        <button
            onClick={() => signIn('google')} 
            className="text-white font-bold text-3xl animate-bounce">
            Sign In
        </button>
    </div>
  )
}

export default Login