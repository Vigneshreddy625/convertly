import React from "react";
import { ClipLoader } from "react-spinners";

function Loading() {
  return (
    <div className="bg-transparent w-full flex flex-col justify-center items-center min-h-screen">
      <ClipLoader color="#007FFF" size={50} />
      <div className="mt-6">
        <p className="text-lg font-medium">Loading please wait...</p>
      </div>
    </div>
  );
}

export default Loading;