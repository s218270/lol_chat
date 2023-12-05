"use client";

import { db } from "@/firebase";
import { collection, orderBy, query } from "firebase/firestore";
import { useSession } from "next-auth/react";
import React, { useEffect, useState, useRef } from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import Message from "./Message";
import type {
  InferGetServerSidePropsType,
  GetServerSideProps,
  NextPage,
} from "next";
import {
  ArrowLeftIcon,
  ArrowLeftOnRectangleIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/outline";
import championData from "../public/championData.json";
import Image from "next/image";
import ScrollButton from "./ScrollButton";
import { useStateValue } from "./StateContext";

interface Props {
  champion: string;
  fileNames: string[];
}

const Chat: NextPage<Props> = (props) => {
  const [image, setImage] = useState(
    `/champions/${props.champion}/background/${props.champion}_OriginalSkin.jpg`
  );
  const [currentIndex, setCurrentIndex] = useState(0);
  const { stateVariable } = useStateValue();
  const currentChampion = props.champion;
  const listRef = useRef<HTMLDivElement>(null);
  const [isScrolling, setIsScrolling] = useState(false);

  const scrollToBottom = () => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  };

  const files = championData.filter((item) => {
    return item.name.toLowerCase() == props.champion.toLowerCase();
  });

  const currentImage = files[0].images[currentIndex];

  const { data: session } = useSession();

  const [messages] = useCollection(
    session &&
      query(
        collection(
          db,
          "users",
          session?.user?.email!,
          "champions",
          props.champion,
          "messages"
        ),
        orderBy("createdAt", "asc")
      )
  );

  const regex = /^([^_]+(?:_[^_]+)?)_(.*?)Skin\.jpg$/;

  const match = currentImage.match(regex);

  useEffect(() => {
    files[0].images.map((item, index) => {
      if (`/champions/${props.champion}/background/${item}` == image) {
        setCurrentIndex(index);
      }
    });
  }, []);

  useEffect(() => {
    if (image != `/champions/${props.champion}/background/${currentImage}`) {
      setImage(`/champions/${props.champion}/background/${currentImage}`);
    }
  }, [currentIndex]);

  useEffect(() => {
    let scrollInterval: any;

    if (stateVariable?.loading) {
      setIsScrolling(true);
      // Start scrolling to bottom repeatedly while loading

      scrollInterval = setInterval(() => {
        scrollToBottom();
      }, 500);
    } else {
      // Clear the interval if loading is false
      clearInterval(scrollInterval);
      setIsScrolling(false);
    }

    return () => {
      clearInterval(scrollInterval); // Clear the interval on component unmount or state change
    };
  }, [stateVariable?.loading]);

  useEffect(() => {
    if (!stateVariable?.loading) {
      scrollToBottom();
    }
  }, [messages]);

  return (
    <>
      <div className="absolute bottom-24 h-8 w-4/5 flex z-50 space-x-2 justify-between self-center">
        <button
          onClick={() =>
            setCurrentIndex((prevIndex) =>
              prevIndex === 0 ? files[0].images.length - 1 : prevIndex - 1
            )
          }
          // ... other attributes ...
        >
          {/* Left button icon */}
          <ArrowLeftIcon className="rounded bg-[#13505B] hover:bg-[#2EBFA5] w-10 h-10 text-[#2EBFA5] hover:text-[#13505B] hover:scale-110 transition-all duration-300 ease-in-out cursor-pointer" />
        </button>
        <p className="text-white text-xl font-semibold">{`${match![2]
          .replace(/_/g, " ")
          .replace(/([A-Z])/g, " $1")
          .trim()} ${match![1].replace(/_/g, " ").trim()}`}</p>
        <button
          onClick={() =>
            setCurrentIndex((prevIndex) =>
              prevIndex === files[0].images.length - 1 ? 0 : prevIndex + 1
            )
          }
          // ... other attributes ...
        >
          <ArrowRightIcon className="rounded w-10 h-10 bg-[#13505B] hover:bg-[#2EBFA5] text-[#2EBFA5] hover:text-[#13505B] hover:scale-110 transition-all duration-300 ease-in-out cursor-pointer" />
          {/* Right button icon */}
        </button>
      </div>
      <div className="flex-1 overflow-hidden overflow-y-hidden mr-0 p-0">
        <img src={image} className="flex-1 fullHeight w-screen object-cover" />

        <div
          className="top-0 absolute child overflow-y-auto w-full transition-all duration-100 ease-in-out"
          ref={listRef}
          style={{
            scrollBehavior: "smooth",
          }}
        >
          <div className="py-5 flex-col z-30 text-white bg-[#13505B]/40">
            <div className="flex space-x-5 px-10 max-w-2xl mx-auto">
              <img
                src={`/champions/${props.champion}/${props.champion}Square.webp`}
                className="h-8 w-8 rounded"
              />
              <p className="pt-1 text-base">Write me something!</p>
            </div>
          </div>
          {messages?.docs.map((message) => (
            <Message
              key={message.id}
              message={message.data()}
              avatar={props.champion}
              id={message.id}
              champion={currentChampion}
            />
          ))}
          {stateVariable?.loading ? (
            <Message
              key={-1}
              message={{
                text: stateVariable?.response,
                user: {
                  _id: "ChatGPT",
                  name: "ChatGPT",
                },
              }}
              avatar={props.champion}
              id={"current"}
              champion={currentChampion}
            />
          ) : null}
        </div>
        <ScrollButton listRef={listRef} />
      </div>
    </>
  );
};

export default Chat;
