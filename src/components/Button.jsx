import React, { useEffect } from "react";

export default function Button({ variant = "", onClick, text, isLoading = false, type }) {
  return (
    <button
      className={`
        ${
          variant == "success" && "bg-green-500 hover:bg-green-700 "
        } 
        ${
          variant == "primary" && "bg-blue-500 hover:bg-blue-700 "
        } 
        ${
          variant == "warning" && "bg-yellow-500 hover:bg-blue-700 "
        } 
        ${
            variant == "danger" && "bg-red-500 hover:bg-red-700 "
        } 
        ${
            variant == "secondary" && "bg-gray-300 hover:bg-gray-400 "
        } 
         ${variant == "secondary" ? "text-gray-800" : "text-white"} font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50`}
      type={type}
      disabled={isLoading}
      onClick={onClick}
    >
      {isLoading ? "Loading..." : text}
    </button>
  );
}
