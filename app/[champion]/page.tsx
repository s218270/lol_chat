

import Chat from "@/components/Chat";
import ChatInput from "@/components/ChatInput";
import { useRouter } from "next/navigation";
import fs from 'fs';
import path from 'path';
import Image from 'next/image';

type Props = {
    params: {
        champion: string
    }
  };
  
  function ChatPage({ params : {champion}}: Props) {

      const backgroundsDirectory = path.join(
        process.cwd(),
        `/public/champions/${champion}/background`
      );

        const fileNames = fs.readdirSync(backgroundsDirectory)

      //console.log(fileNames);



    return (
      <div className="flex flex-col overflow-hidden absolute z-20 top-0">
        
        <Chat champion={champion} fileNames={fileNames}/>
        <ChatInput champion={champion} />
      </div>
    );
  }
  

  

  export default ChatPage;
  
  // ...
  
