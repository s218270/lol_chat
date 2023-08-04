

import Chat from "@/components/Chat";
import ChatInput from "@/components/ChatInput";
import { useRouter } from "next/navigation";


type Props = {
    params: {
        champion: string
    }
  };
  
  function ChatPage({ params : {champion}}: Props) {



    return (
      <div className="flex flex-col h-screen overflow-hidden">
        <Chat champion={champion} />
        <ChatInput champion={champion} />
      </div>
    );
  }
  
  export default ChatPage;
  
  // ...
  
