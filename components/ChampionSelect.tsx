'use client'
import React, {useEffect, useState} from 'react'
import championData from '../public/championData.json'
import { signIn } from 'next-auth/react'
import { usePathname, useRouter } from 'next/navigation'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import SelectedChampion from './SelectedChampion'
import fs from 'fs';
import path from 'path';

interface CustomProps {
    width: string;
    selected: React.Dispatch<React.SetStateAction<string>>
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
    selected,
    height,
    fontSize,
    columnsLg,
    columnsMd,
    // champion,
    onClick,
    backgroundColor
  }) => {



    const [query, setQuery] = useState('');
    const [filteredData, setFilteredData] = useState(championData)
    const [filteredResults, setFilteredResults] = useState(championData)
    const {data: session} = useSession()
    const [selectedChampion, setSelectedChampion] = useState('')

    // Function to handle the search query
  const handleSearch = (e: any) => {
    const value = e.target.value;
    setQuery(value);

    // Filter the data based on the query
    const filteredResults = championData.filter((item) =>
      item.name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredResults(filteredResults)
    //setFilteredData(filteredResults);
  };


  const styles = `grid md:grid-cols-${columnsMd} lg:grid-cols-${columnsLg} gap-2 grid-cols-3`

  return (
    <>
    <div className="flex items-center justify-center text-black mb-6">
      <input
        type="text"
        placeholder="Search..."
        className="border-2 border-[#2EBFA5] rounded px-4 py-2 focus:outline-none focus:ring focus:border-[#2EBFA5]"
        value={query}
        onChange={handleSearch}
      />
      <button className="ml-2 bg-[#13505B] hover:bg-[#2EBFA5] text-white rounded px-4 py-2 border-2 border-[#2EBFA5] hover:border-[#13505B]">
        Search
      </button>
    </div>

    <div className='h-4/6 flex justify-center overflow-y-scroll'>
        <div className={styles}>
        {filteredResults.map((champion) => (
            <div key={champion.name} className="text-center text-white text-sm">
                {!session ?
                    <button onClick={() => {
                        signIn()
                        selected(champion.name)
                    }}>
                        <img
                            src={`/champions/${champion.name}/${champion.name}Square.webp`}
                            alt={champion.name}
                            className="w-16 h-16 mx-2"
                        />
                        <p>{champion.name}</p>
                        

                    </button>

                :
                <Link href={`/${champion.name}`} onClick={() => selected(champion.name)}>
                    <img
                        src={`/champions/${champion.name}/${champion.name}Square.webp`}
                        alt={champion.name}
                        className="w-16 h-16 mx-2"
                    />
                    <p>{champion.name}</p>
                    

                </Link>
                }
            </div>
        ))}
        </div>
    </div>
    
    </>
  )
}

export default ChampionSelect