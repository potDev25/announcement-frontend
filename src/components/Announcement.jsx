import React from "react";

export default function Announcment({
  title = '',
  body = '',
  posted_by = '',
  date = ''
}) {
  return (
    <div className="rounded-lg shadow-md w-full mb-5 px-5 py-3 border border-gray-500">
      <div className="text-md text-gray-700 uppercase mb-2 font-semibold">
        {title}
      </div>
      <div className="text-sm text-gray-600 mb-4 text-justify">
        <p>
          {body}
        </p>
      </div>

      <div className="text-xs text-gray-500">
        <p>Posted By: {posted_by}</p>
        <p>Date Posted: {date}</p>
      </div>
    </div>
  );
}
