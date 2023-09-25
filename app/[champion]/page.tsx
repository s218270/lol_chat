import Chat from "@/components/Chat";
import ChatInput from "@/components/ChatInput";
import { useRouter } from "next/navigation";
import fs from "fs";
import path from "path";
import Image from "next/image";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

type Props = {
  params: {
    champion: string;
  };
};

async function ChatPage({ params: { champion } }: Props) {
  const session = await getServerSession(authOptions);
  const encodedChampion = encodeURIComponent(champion);
  const res = await fetch(
    process.env.URL + `/api/getFileNames?champion=${encodedChampion}`,
    { method: "GET" }
  );
  const fileNames = await res.json();

  if (session) {
    return (
      <div className="flex flex-col overflow-hidden absolute z-20 top-0 fullHeight">
        <Chat champion={champion} fileNames={fileNames} />
        <ChatInput champion={champion} />
      </div>
    );
  } else {
    return <></>;
  }
}

export default ChatPage;

// ...
