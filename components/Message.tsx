import { DocumentData } from 'firebase/firestore'
import React from 'react'

type Props = {
    message: DocumentData,
    avatar: string
}


function Message({message}: Props) {

    const isChatGPT = message.user.name === 'ChatGPT'

  return (
    <div className={`py-5 flex-col z-30 text-white ${isChatGPT && 'bg-[#434654]/20'}`}>
        <div className='flex space-x-5 px-10 max-w-2xl mx-auto'>
            <img src={message.user.avatar} className='h-8 w-8'/>
            <p className="pt-1 text-sm">
                {message.text}
            </p>
        </div>
    </div>
  )
}

export default Message