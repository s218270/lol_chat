"use client";

import { db } from "@/firebase";
import { PaperAirplaneIcon } from "@heroicons/react/24/outline";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  setDoc,
  query,
  orderBy,
} from "firebase/firestore";
import { useSession } from "next-auth/react";
import React, { useState, useEffect, useRef } from "react";
import { toast } from "react-hot-toast";
import { useStateValue } from "./StateContext";
import { useCollection } from "react-firebase-hooks/firestore";

type Props = {
  champion: string;
};

function ChatInput({ champion }: Props) {
  const [prompt, setPrompt] = useState<string>("");
  const [chatResponse, setChatResponse] = useState("");
  const [finishedReading, setFinishedReading] = useState(false);
  const { setStateVariable } = useStateValue();
  const { data: session } = useSession();
  const initialRender = useRef(true);
  const initialRender2 = useRef(true);

  //useSWR to get model
  const model = "gpt-3.5-turbo";

  const [messages] = useCollection(
    session &&
      query(
        collection(
          db,
          "users",
          session?.user?.email!,
          "champions",
          champion,
          "messages"
        ),
        orderBy("createdAt", "desc")
      )
  );

  const writeToDB = async () => {
    await fetch("/api/addToDB", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: chatResponse,
        champion,
        model,
        session,
      }),
    }).then(() => {
      //setChatResponse('')
      setStateVariable({
        response: "",
        done: true,
        loading: false,
      });
    });
  };

  const sendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!prompt) return;
    setChatResponse("");
    setStateVariable({
      response: chatResponse,
      done: finishedReading,
      loading: true,
    });
    const input = prompt.trim();
    setPrompt("");
    const message: Message = {
      text: input,
      createdAt: serverTimestamp(),
      user: {
        _id: session?.user?.email!,
        name: session?.user?.name!,
        avatar:
          session?.user?.image! ||
          `https://ui-avatars.com/api/?name=${session?.user?.name}`,
      },
    };

    await addDoc(
      collection(
        db,
        "users",
        session?.user?.email!,
        "champions",
        champion,
        "messages"
      ),
      message
    );

    //toast notification loading
    var notification = toast.loading(`${champion} is writing`);

    const chatHistory: any = [];
    let limit = 4000;

    messages?.docs.map((item) => {
      if (item.data().text.length < limit) {
        limit -= item.data().text.length;
        chatHistory.unshift({
          role: item.data().user._id == "ChatGPT" ? "assistant" : "user",
          content: item.data().text,
        });
      } else {
        limit = 0;
      }
    });

    chatHistory.unshift({
      role: "system",
      content: `You are ${champion} from league of legends. Behave in a way to mimic his/her behavior. ${
        0
          ? "Only At the end of your entire response add numbers best describing tone of conversation in this format: [[1, 2, 3, 4, 5]]  1-laugh 2-dance 3-angry 4-interesting 5-weird"
          : ""
      }`,
    });

    chatHistory.push({
      role: "user",
      content: input,
    });

    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: chatHistory,
        champion,
      }),
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    const data = response.body;
    if (!data) {
      console.log("no data");
      return;
    }

    const reader = data.getReader();
    const decoder = new TextDecoder();
    let done = false;

    while (!done) {
      const { value, done: doneReading } = await reader.read();
      done = doneReading;
      setFinishedReading(done);
      const chunkValue = decoder.decode(value);
      setChatResponse((prev: string) => prev + chunkValue);
    }

    if (done) {
      toast.success(`${champion} has responded`, {
        id: notification,
      });
    }
  };

  useEffect(() => {
    if (initialRender2.current) {
      initialRender2.current = false;
    } else {
      setStateVariable({
        response: chatResponse,
        done: finishedReading,
        loading: true,
      });
    }
  }, [chatResponse]);

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
    } else {
      if (finishedReading) {
        writeToDB();
      }
    }
  }, [finishedReading]);

  useEffect(() => {
    setStateVariable({
      response: chatResponse,
      done: true,
      loading: false,
    });
  }, []);

  return (
    <div className="bg-gray-500/50 text-white rounded text-center absolute z-30 w-4/5 h-16 self-center bottom-4">
      <form onSubmit={sendMessage} className="px-5 py-3 flex justify-center">
        <input
          onChange={(e) => setPrompt(e.target.value)}
          value={prompt}
          type="text"
          placeholder="Type your message"
          className="focus:outline-none bg-transparent flex-1 disabled:cursor-not-allowed disabled:text-gray-300"
          disabled={!session}
        />
        <button
          type="submit"
          disabled={!prompt}
          className="bg-[#2EBFA5] hover:opacity-50 text-white font-bold px-4 py-2 rounded disabled:bg-[#13505B] disabled:cursor-not-allowed hover:scale-110 transition-transform duration-300 ease-in-out"
        >
          <PaperAirplaneIcon className="h-5 w-5 -rotate-45 " />
        </button>
      </form>
    </div>
  );
}

export default ChatInput;
