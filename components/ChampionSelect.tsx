"use client";
import React, { useEffect, useState } from "react";
import championData from "../public/championData.json";
import { signIn } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { useSession } from "next-auth/react";
import SelectedChampion from "./SelectedChampion";
import fs from "fs";
import path from "path";
import AuthLink from "./AuthLink";
import { XCircleIcon } from "@heroicons/react/24/outline";

interface CustomProps {
  width: string;
  selected: React.Dispatch<React.SetStateAction<string>>;
  height: string;
  fontSize: string;
  columnsLg: string;
  columnsMd: string;
  // champion: string;
  backgroundColor: string;
  onClick?: () => void; // Optional onClick handler
}

const ChampionSelect: React.FC<CustomProps> = ({
  width,
  selected,
  height,
  fontSize,
  columnsLg,
  columnsMd,
  // champion,
  onClick,
  backgroundColor,
}) => {
  const [query, setQuery] = useState("");
  const [filteredData, setFilteredData] = useState(championData);
  const [filteredResults, setFilteredResults] = useState(championData);
  const { data: session } = useSession();
  const [selectedChampion, setSelectedChampion] = useState("1");
  const [selectedItem, setSelectedItem] = useState("");
  const router = useRouter();
  const [logIn, setLogIn] = useState(false);
  const pathname = usePathname();

  // Function to handle the search query
  const handleSearch = (e: any) => {
    const value = e.target.value;
    setQuery(value);

    // Filter the data based on the query
    const filteredResults = championData.filter((item) =>
      item.name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredResults(filteredResults);
    //setFilteredData(filteredResults);
  };

  const styles = `grid ${
    width == "3/5" ? "grid-cols-4 md:grid-cols-6 lg:grid-cols-8" : "grid-cols-3"
  } md:grid-cols-${columnsMd} lg:grid-cols-${columnsLg} gap-2 w-full overflow-x-hidden`;

  useEffect(() => {
    if (!pathname) return;
    if (pathname.includes(selectedChampion) && !session) {
      signIn();
      setSelectedChampion("1");
      // setLogIn(false)
    }
  }, [pathname]);

  return (
    <>
      <div className="flex items-center justify-center text-black mb-6">
        <input
          type="search"
          placeholder="Search..."
          className={`border-2 border-[#2EBFA5] rounded px-4 py-2 focus:outline-none focus:ring focus:border-[#2EBFA5] ${
            width == "3/5" ? "w-2/5" : "w-3/5"
          }`}
          value={query}
          onChange={handleSearch}
        />
        <button className="ml-2 bg-[#13505B] hover:bg-[#2EBFA5] text-white rounded px-2 py-2 border-2 border-[#2EBFA5] hover:border-[#13505B] hover:scale-110 transition-transform duration-300 ease-in-out relative">
          Search
        </button>
      </div>

      <div className="h-4/6 flex justify-center overflow-y-scroll border-[#2EBFA5] border-2 rounded p-4">
        <div className={styles}>
          {filteredResults.map((champion) => (
            <div
              key={champion.name}
              className="text-center text-white text-sm"
              onClick={() => setSelectedItem(champion.name)}
            >
              <Link
                href={`/${champion.name}`}
                onClick={() => setSelectedChampion(champion.name)}
              >
                {/* <AuthLink href={`/${champion.name}`} > */}
                <img
                  src={`/champions/${champion.name}/${champion.name}Square.webp`}
                  alt={
                    champion.altName != undefined
                      ? champion.altName
                      : champion.name
                  }
                  className={`w-16 h-16 mx-2 rounded hover:scale-110 transition-transform duration-200 ease-in-out inline-flex ${
                    selectedItem == champion.name
                      ? "border-2 border-[#2EBFA5]"
                      : ""
                  }`}
                />
                <p>
                  {champion.altName != undefined
                    ? champion.altName
                    : champion.name}
                </p>
                {/* </AuthLink> */}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ChampionSelect;
