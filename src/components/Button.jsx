import { useState } from "react";

export function Button({
  children,
  isLoading,
  type = "button",
  label,
  ...rest
}) {
  return (
    <div className="flex flex-col items-center gap-2">
      <button
        {...rest}
        type={type}
        disabled={isLoading}
        className="mt-3 p-4 border-1 border-green-700 bg-green-700 rounded-xl text-gray-300 font-bold tracking-[0.3px] cursor-pointer hover:bg-green-600 hover:border-green-600 transition ease-in-out disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 duration-200 min-w-full"
      >
        {label || children}
      </button>
      {isLoading && <h1>Loading...</h1>}
    </div>
  );
}
