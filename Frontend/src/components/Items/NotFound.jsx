import React from 'react';
import pnf from "../../assets/pnf.jpg";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";

function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="relative w-full h-full overflow-hidden flex items-center justify-center bg-black/80">
      <img
        src={pnf}
        alt="Page not found"
        className="absolute inset-0 w-full h-full object-cover"
      />
    </div>
  );
}

export default NotFound;
