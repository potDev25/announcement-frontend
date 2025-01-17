import React from "react";

export default function Pagination() {
  return (
    <div className="flex items-center justify-center text-gray-700">
      <div className="flex items-center gap-4">
        <button><i class="fa-solid fa-backward"></i> {" "} Prev</button>
        <button>Next { " " }<i class="fa-solid fa-forward"></i></button>
      </div>
    </div>
  );
}
