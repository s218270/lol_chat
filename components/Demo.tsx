import React from 'react'

// Define the props interface
interface CustomProps {
    width: string;
    height: string;
    fontSize: string;
    backgroundColor: string;
    onClick?: () => void; // Optional onClick handler
  }

const Demo: React.FC<CustomProps> = ({
    width,
    height,
    fontSize,
    onClick,
    backgroundColor
  }) => {

    const styles = `flex h-${height} w-${width} my-16 ml-24 mr-12 text-white flex-col gap-4 self-center md:w-1/2`

  return (
    <div className={styles}>
        <div className='justify-start w-4/5'>
            <img src='/champions/Jinx/JinxSquare.webp' className='h-12 w-12 rounded -left-14 top-8 relative'/>
            <div className='bg-[#13505B]/40 rounded p-4'>
                <p>Oh, hey there! I'm Jinx, the Loose Cannon, and I'm here to blow things up and cause a little chaos. So, are you ready to join the fun or what?</p>
            </div>
        </div>
        <div className='self-end w-3/5'>
            <img src='/champions/Teemo/TeemoSquare.webp' className='h-12 w-12 rounded right-14 top-8 relative'/>
            <div className='bg-[#2EBFA5]/40 rounded p-4'>
                <p>I'm ready! Tell me something funny.</p>
            </div>
        </div>
        <div className='justify-start w-4/5'>
            <img src='/champions/Jinx/JinxSquare.webp' className='h-12 w-12 rounded -left-14 top-8 relative'/>
            <div className='bg-[#13505B]/40 rounded p-4'>
                <p>Well, well, well, it looks like you're ready to have some fun! You wanna hear something funny? How about this: Why did the scarecrow win an award? Because he was outstanding in his field! Hahaha! Get it? Outstanding? Field? Oh, that one always cracks me up!</p>
            </div>
        </div>
    </div>
  )
}

export default Demo