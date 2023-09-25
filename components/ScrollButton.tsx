// components/ScrollButton.tsx

import { ArrowDownIcon } from "@heroicons/react/24/outline";
import React, { useEffect, useState, useRef } from "react";

interface ScrollButtonProps {
  listRef: React.RefObject<HTMLDivElement>;
}

const ScrollButton: React.FC<ScrollButtonProps> = ({ listRef }) => {
  const [showButton, setShowButton] = useState(false);

  const scrollToBottom = () => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (listRef.current) {
        setShowButton(
          listRef.current.scrollTop <
            listRef.current.scrollHeight - listRef.current.clientHeight
        );
      }
    };

    if (listRef.current) {
      listRef.current.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (listRef.current) {
        listRef.current.removeEventListener("scroll", handleScroll);
      }
    };
  }, [listRef]);

  return (
    <button
      className={`absolute bottom-8 left-[2%] md:left-[5%] lg:left-[7%] ${
        showButton ? "opacity-100" : "opacity-0 pointer-events-none"
      } bg-[#13505B] hover:bg-[#2EBFA5] text-[#2EBFA5] hover:text-[#13505B] hover:scale-110 transition-all duration-300 ease-in-out cursor-pointer rounded`}
      onClick={scrollToBottom}
    >
      <ArrowDownIcon className="w-6 h-6" />
    </button>
  );
};

export default ScrollButton;
