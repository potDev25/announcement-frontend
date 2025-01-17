import React, { useEffect } from "react";

export default function Button({ variant = "", text, isLoading = false, type }) {
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
            variant == "danger" && "bg-red-500 hover:bg-red-700 "
        } 
        text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50`}
      type={type}
      disabled={isLoading}
    >
      {isLoading ? "Loading..." : text}
    </button>
  );
}
