import React from 'react'
import LazyImage from './LazyImage'
import puc from "../../assets/puc.png"

function PageUC() {
  return (
    <div className="relative w-full h-full overflow-hidden flex items-center justify-center bg-transparent">
      <LazyImage
        src={puc}
        alt="Page under construction"
        className="absolute w-full h-1/full object-cover"
      />
    </div>
  )
}

export default PageUC;