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
    champion: string,
}

function ChatRow({champion}: Props) {

    const pathname = usePathname()
    const [active, setActive] = useState(false)

    useEffect(()=> {
        if(!pathname) return;
        setActive(pathname.includes(champion))
    },[pathname])

  return (
    <Link href={`/${champion}`} className={`chatRow flex flex-row align-middle my-3 justify-center ${active && 'bg-gray-700/50'}`}>
        <img src={logo.src} className='h-10 w-10'></img>
        <p className='flex-1 hidden md:inline-flex truncate w-32 align-middle'>
            {champion}
        </p>
        <TrashIcon className='h-5 w-5 text-gray-700 hover:text-red-500'/>
    </Link>
  )
}

export default ChatRow