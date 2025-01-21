import React from "react";

export default function Input({ label, type, placeholder, error, onChange, value }) {
  return (
    <div className="mb-5">
      <label
        className="block text-gray-700 text-sm font-bold mb-2"
        htmlFor="password"
      >
        {label}
      </label>
      <input
        className={`shadow appearance-none border ${error ? 'border-red-500' : ''} rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline`}
        type={type}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
      />
      {error ? (
        <p className="text-red-500 text-xs italic">{error}</p>
      ) : null}
    </div>
  );
}
