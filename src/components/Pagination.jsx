import React from "react";

export default function Pagination({
  handlePrev,
  handleNext,
  prev = false,
  next = false
}) {
  return (
    <div className="flex items-center justify-center text-gray-700">
      <div className="join grid grid-cols-2">
        <button onClick={handlePrev} disabled={prev} className="join-item btn btn-outline">Previous page</button>
        <button onClick={handleNext} disabled={next} className="join-item btn btn-outline">Next</button>
      </div>
    </div>
  );
}
