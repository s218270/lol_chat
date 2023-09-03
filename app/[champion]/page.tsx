

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
  
  async function ChatPage({ params : {champion}}: Props) {

      
    //   const backgroundsDirectory = path.join(
    //       process.cwd(),
    //       `/public/champions/${champion}/background`
    //       );
          
    //       const fileNames = fs.readdirSync(backgroundsDirectory)
          
          //console.log(fileNames);
          const encodedChampion = encodeURIComponent(champion)
              const res = await fetch(process.env.URL + `/api/getFileNames?champion=${encodedChampion}`,{method: 'GET'})
              const fileNames = await res.json()
//               const testPath = path.resolve(process.cwd(),`${champion}`, 'background')
//   const files: any = await fs.readdir(testPath, () => console.log('wellllll',files))

              
          
          
          
          return (
              <div className="flex flex-col overflow-hidden absolute z-20 top-0">
                  {/* <p className="absolute top-0 w-screen h-5 text-white">{champion}</p>
                  <p className="absolute top-0 w-screen h-5 text-white">{fileNames}</p> */}
        
           {/* <p className="absolute top-0 w-screen h-5 text-white">{champion}</p> */}
            <Chat champion={champion} fileNames={fileNames}/>
            <ChatInput champion={champion} />
            </div>
    );
  }
  

  

  export default ChatPage;
  
  // ...
  
