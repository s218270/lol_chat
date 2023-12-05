"use client"
import { useSession, signOut } from "next-auth/react";
import React, { useEffect, useState } from "react";
import NewChat from "./NewChat";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection } from "firebase/firestore";
import { db } from "@/firebase";
import ChatRow from "./ChatRow";
import ChampionSelect from "./ChampionSelect";
import SelectedChampion from "./SelectedChampion";
import {
  ArrowLeftIcon,
  ArrowLeftOnRectangleIcon,
  HomeIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import championData from "../public/championData.json";
import { usePathname } from "next/navigation";


const SideBar = () => {
  const { data: session } = useSession();
  const [selectedChampion, setSelectedChampion] = useState("");
  const [isVisible, setIsVisible] = useState(window.innerWidth >= 768);
  const champions = ["Aatrox", "Akali", "Azir", "Malphite"];
  const pathname = usePathname();

  useEffect(() => {
    if (pathname == "/") {
      setIsVisible(true);
    }
  }, [pathname]);

  return (
    <>
      <button
        className={`absolute top-0 p-3 z-40 ${
          isVisible ? "rotate-0 sideBarButton sm:left-80" : "rotate-180 left-0 "
        } transition-all duration-300 ease-in-out hover:scale-110`}
        onClick={() => setIsVisible(!isVisible)}
      >
        <ArrowLeftOnRectangleIcon className="w-12 h-12 text-white" />
      </button>
      <div
        className={`absolute md:relative flex z-50 left-0 flex-col fullHeight text-white ${
          isVisible ? "sideBarWidth sm:w-80 p-2 border-r-2" : "w-0 p-0"
        }  border-[#2EBFA5] transition-all duration-300 ease-in-out bg-gradient-to-r from-[#171215] to-[#221B1E] overflow-hidden`}
      >
        <SelectedChampion champion={selectedChampion} />
        <ChampionSelect
          width="full"
          height="full"
          backgroundColor="gray-700"
          fontSize="16"
          columnsLg="4"
          columnsMd="3"
          selected={setSelectedChampion}
        />
        <div className="flex bg-[#13505B] rounded text-white px-10 border-[#2EBFA5] border-2 mt-auto w-auto justify-between">
          {session && (
            <>
              <img
                src={
                  session.user?.image ||
                  `https://ui-avatars.com/api/?name=${session?.user?.name}`
                }
                alt="avatar"
                className="h-12 w-12 rounded cursor-pointer hover:opacity-50 my-2"
              />
              <button onClick={() => signOut()}>
                <HomeIcon className="w-12 h-12 my-2 hover:scale-110 transition-all duration-300 ease-in-out" />
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default SideBar;
