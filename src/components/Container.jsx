import React from "react";

export default function Container({children, className}) {
  return (
    <div className={`lg:w-[70%] md:w-[90%] sm:w-[90%] m-auto h-full mt-5 p-2 ${className}`}>{children}</div>
  );
}
