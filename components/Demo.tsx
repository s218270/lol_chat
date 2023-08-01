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

    const styles = `flex h-${height} w-${width} bg-${backgroundColor} rounded-2xl m-16 opacity-70`

  return (
    <div className={styles}>

    </div>
  )
}

export default Demo