'use client'


import { signIn } from 'next-auth/react'
import Image from 'next/image'
import React, { useState } from 'react'
import logo from '../public/default1.svg'
import background from '../public/Maltphite.jpg'
import Demo from './Demo'
import ChampionSelect from './ChampionSelect'
import ChatRow from './ChatRow'
import pattern from '../public/styles/63171.jpg'



const Login = () => {

    const [selectedChampion, setSelectedChampion] = useState('')


  return (
    <div className='relative min-h-screen'>
        <div className="fixed inset-0 bg-gradient-to-r from-[#13505B] to-[#2EBFA5] w-screen h-16 blur-md"></div>
        <nav className='flex items-center w-screen h-16 fixed top-0 z-50 bg-black'>
            <div className='ml-[10%]'>
                <img src={logo.src} alt="logo" width={112} height={63}/>
            </div>
            <div className='ml-auto flex space-x-4 mr-[3%]'>
                
                <button
                        onClick={() => signIn()} 
                        className="text-white font-bold text-lg bg-black px-2 py-1 rounded border-2 border-[#2EBFA5] hover:bg-[#2EBFA5] hover:border-[#13505B] hover:scale-110 transition-all duration-300 ease-in-out">
                        Log In
                </button>
                
                <button
                    onClick={() => signIn()} 
                    className="text-white font-bold text-lg bg-black px-2 py-1 rounded border-2 border-[#2EBFA5] hover:bg-[#2EBFA5] hover:border-[#13505B] hover:scale-110 transition-all duration-300 ease-in-out">
                    Sign Up
                </button>
            </div>
        </nav>
        <div className="absolute inset-0 z-[-1]">
            <Image 
                    alt='pattern'
                    src={pattern.src}
                    fill
                    quality={100}
                    className='object-cover fixed object-center'
                    />
        </div>
        <div className='h-16'></div>
        <div className='flex flex-col md:flex-row mt-10'>
                    <div className='w-1/2 justify-center items-center flex flex-col ml-4 text-center self-center'>
                        <h1 className='text-white text-6xl font-bold mb-16 animate-slide-up-opacity'>Chat with League of Legends <a href='#champions' className='text-[#2EBFA5] hover:text-[#13505B] hover:scale-110 hover:strokeText transition-all duration-300 ease-in-out cursor-pointer'>Champions</a></h1>
                        <p className='text-white text-2xl animate-slide-up-opacity'>With this tool you can immerse yourself in the world of League of Legends</p>
                        <p className='text-white text-2xl animate-slide-up-opacity'>Talk with your favorite champions about anything you want!</p>
                    </div>
                    
                    <Demo width='4/5' height='1/2' backgroundColor='[#13505B]' fontSize='16'/>
                </div>
        <div className='h-[700px] text-center w-4/5 mx-auto scroll-mt-20' id='champions'>
            <h2 className='text-white text-3xl my-8'>Pick a Champion:</h2>
        <ChampionSelect width='3/5' height='full' backgroundColor='gray-700' fontSize='16' columnsLg='8' columnsMd='4' selected={setSelectedChampion}/>
        </div>
        
        <footer className='h-screen bg-black relative p-0 m-0 flex items-center justify-center flex-col'>
            <h1 className='text-white text-3xl ml-10 font-bold mb-16'>Contact Us:</h1>
            <div className="p-8">
                <form className="max-w-md mx-auto">
                    <div className="mb-4">
                        <label htmlFor="name" className="block mb-2 font-medium text-white">Name</label>
                        <input type="text" id="name" name="name" className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300" />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className="block mb-2 font-medium text-white">Email</label>
                        <input type="email" id="email" name="email" className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300" />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="message" className="block mb-2 font-medium text-white">Message</label>
                        <textarea id="message" name="message" rows={4} className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300"></textarea>
                    </div>
                    <button type="submit" className="text-white font-bold text-lg bg-[#13505B] px-2 py-1 rounded border-2 border-[#2EBFA5] hover:bg-[#2EBFA5] hover:border-[#13505B] hover:scale-110 transition-all duration-300 ease-in-out cursor-pointer">Submit</button>
                </form>
            </div>
        </footer>
    </div>
  )
}

export default Login