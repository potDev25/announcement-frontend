import React from "react";

export default function Textarea({ label, placeholder, error, onChange, value }) {
  return (
    <div className="mb-5">
      <label
        className="block text-gray-700 text-sm font-bold mb-2"
        htmlFor="password"
      >
        {label}
      </label>
      <textarea
        className={`textarea textarea-bordered w-full ${error ? "border-red-500" : ""} `}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
      ></textarea>
      {error ? <p className="text-red-500 text-xs italic">{error}</p> : null}
    </div>
  );
}
