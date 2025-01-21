import React from "react";
import { useSelector } from "react-redux";

export default function Announcment({ key, announcement, handleEdit, handleDelete }) {

  const {user} = useSelector((state) => state.auth)

  function formatDate(inputDate) {
    const date = new Date(inputDate);
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      timeZone: "Asia/Manila",
    };
    const formatter = new Intl.DateTimeFormat("en-PH", options);
    return formatter.format(date);
  }

  return (
    <div
      key={key}
      className="rounded-lg shadow-md w-full mb-5 px-5 py-3 border border-gray-500"
    >
      <div className="text-md text-gray-700 uppercase mb-2 font-semibold">
        {announcement?.title}
      </div>
      <div className="text-sm text-gray-600 mb-4 text-justify">
        <p className="whitespace-pre-wrap">{announcement?.content}</p>
      </div>

      <div className="text-xs text-gray-500 mb-2">
        <p className="mb-1">Posted By: {announcement?.name}</p>
        <p className="mb-1">Date Posted: {formatDate(announcement?.created_at)}</p>
        <p className="mb-1">Start Date: {formatDate(announcement?.startDate)}</p>
        <p>End Date: {formatDate(announcement?.endDate)}</p>
      </div>
      <div className="flex items-center justify-between">
        <div
          className={`badge ${
            announcement?.active == 1 ? "badge-success" : "badge-warning"
          } gap-2 text-white uppercase text-sm`}
        >
          {announcement?.active == 1 ? "Active" : "Inactive"}
        </div>

        {
          user ? <>
            <div className="flex items-center gap-2">
              <button className="btn btn-success btn-sm" onClick={ev => handleEdit(announcement)}>
                <i class="fa-solid fa-pen-to-square"></i>
              </button>
              <button className="btn btn-error text-white btn-sm" onClick={ev => handleDelete(announcement)}>
                <i class="fa-solid fa-trash"></i>
              </button>
            </div>
          </> : null
        }
      </div>
    </div>
  );
}
