import React from "react";
import { BackgroundBeamsWithCollision } from "./ui/background-beams-with-collision";
import Explorebtn from "./Items/Explorebtn";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/explore");
  };
  return (
    <BackgroundBeamsWithCollision>
      <div className="flex flex-col items-center justify-center px-4 text-center space-y-6">
        <h2 className="text-2xl relative z-20 md:text-4xl lg:text-7xl font-bold text-black dark:text-white font-sans tracking-tight">
          Your all-in-one file toolkit:
          <div className="relative mx-auto inline-block w-max mt-2 [filter:drop-shadow(0px_1px_3px_rgba(27,_37,_80,_0.14))]">
            <div className="absolute left-0 top-[1px] bg-clip-text bg-no-repeat text-transparent bg-gradient-to-r py-4 from-purple-500 via-violet-500 to-pink-500 [text-shadow:0_0_rgba(0,0,0,0.1)]">
              <span>PDF to Word and beyond.</span>
            </div>
            <div className="relative bg-clip-text text-transparent bg-no-repeat bg-gradient-to-r from-purple-500 via-violet-500 to-pink-500 py-4">
              <span>PDF to Word and beyond.</span>
            </div>
          </div>
        </h2>
        <div className=""onClick={handleClick}><Explorebtn /></div>
      </div>
    </BackgroundBeamsWithCollision>
  );
}
