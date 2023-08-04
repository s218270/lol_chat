import React, {useEffect, useState} from 'react'
import championData from '../public/championData.json'
import { signIn } from 'next-auth/react'
import { usePathname, useRouter } from 'next/navigation'
import Link from 'next/link'
import { useSession } from 'next-auth/react'


interface CustomProps {
    width: string;
    height: string;
    fontSize: string;
    columnsLg: string;
    columnsMd: string;
    // champion: string;
    backgroundColor: string;
    onClick?: () => void; // Optional onClick handler
  }


const ChampionSelect : React.FC<CustomProps> = ({
    width,
    height,
    fontSize,
    columnsLg,
    columnsMd,
    // champion,
    onClick,
    backgroundColor
  }) => {

    const {data: session} = useSession()

  return (
    <div className='h-1/2 flex justify-center overflow-y-scroll'>
        <div className={`grid grid-cols-3 md:grid-cols-${columnsMd} lg:grid-cols-${columnsLg} gap-4`}>
        {championData.map((champion) => (
            <div key={champion.name} className="text-center text-white">
                {!session ?
                    <button onClick={() => signIn()}>
                        <img
                            src={`/champions/${champion.name}/${champion.name}Square.webp`}
                            alt={champion.name}
                            className="w-16 h-16 mx-auto"
                        />
                        <p>{champion.name}</p>
                    </button>

                :
                <Link href={`/${champion.name}`}>
                    <img
                        src={`/champions/${champion.name}/${champion.name}Square.webp`}
                        alt={champion.name}
                        className="w-16 h-16 mx-auto"
                    />
                    <p>{champion.name}</p>
                </Link>
                }
            </div>
        ))}
        </div>
    </div>
  )
}

export default ChampionSelect