import React from "react";

export default function Loader() {
  return (
    <div className="flex items-center justify-center w-full h-[50vh]">
      <div class="flex flex-row gap-2">
        <div class="w-4 h-4 rounded-full bg-blue-700 animate-bounce"></div>
        <div class="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:-.3s]"></div>
        <div class="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:-.5s]"></div>
      </div>
    </div>
  );
}
