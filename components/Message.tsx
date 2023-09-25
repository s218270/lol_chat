import { TrashIcon } from "@heroicons/react/24/outline";
import { DocumentData } from "firebase/firestore";
import React from "react";
import axios from "axios";
import { useSession } from "next-auth/react";

type Props = {
  message: DocumentData;
  avatar: string;
  id: string;
  champion: string;
};

function Message({ message, avatar, id, champion }: Props) {
  //console.log("key", id);
  const isChatGPT = message.user.name === "ChatGPT";
  const { data: session } = useSession();

  const deleteMessage = async (messageId: string) => {
    try {
      const response = await axios.post("/api/deleteMessage", {
        messageId,
        session,
        champion,
      });
      if (response.data.success) {
        // Update your UI to reflect the message deletion
        console.log("Message deleted successfully");
      } else {
        console.error("Failed to delete message");
      }
    } catch (error) {
      console.error("An error occurred while deleting the message:", error);
    }
  };

  return (
    <div
      className={`py-5 flex-col z-30 text-white ${
        isChatGPT ? "bg-[#13505B]/40" : "bg-[#171215]/40"
      }`}
    >
      <div className="flex px-10 max-w-2xl mx-auto">
        <img
          src={
            message.user._id == "ChatGPT"
              ? `/champions/${avatar}/${avatar}Square.webp`
              : message.user.avatar
          }
          className="h-8 w-8 rounded mr-5"
        />
        <p className="pt-1 text-base mr-5">{message.text}</p>
        <button
          onClick={() => deleteMessage(id)}
          className="self-start ml-auto"
        >
          <TrashIcon className="w-6 h-6 text-white hover:scale-110 transition-all duration-300 ease-in-out cursor-pointer" />
        </button>
      </div>
    </div>
  );
}

export default Message;
