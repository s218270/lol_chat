import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

type Props = {
  champion: string;
};

function SelectedChampion({ champion }: Props) {
  const pathname = usePathname();
  const [active, setActive] = useState("");

  useEffect(() => {
    if (!pathname) return;
    if (pathname.includes(champion)) {
      setActive(pathname.trimStart().replaceAll("/", ""));
    }
  }, [pathname]);

  return (
    <div className="flex self-center top-8 bg-[#13505B] rounded text-white justify-between items-center border-[#2EBFA5] border-2 w-full mb-4">
      <img
        src={
          active != ""
            ? `/champions/${active}/${active}Square.webp`
            : "/notselected.png"
        }
        className="w-16 h-16 ml-4 my-2 rounded"
      />
      <p className="mr-4">{active.replaceAll("_", " ")}</p>
    </div>
  );
}

export default SelectedChampion;
