"use client";

import { ErrorScreen } from "./_components/error-screen";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex fixed inset-0 flex-col justify-center items-center text-white background bg-neutral-700">
      <h1 className="text-lg font-bold">Something went wrong...</h1>
      {error && <p className="mt-4 text-sm">{error.message}</p>}
      {error?.digest && <p className="mt-2 text-xs">{error.digest}</p>}
      {
        <button
          className="py-3 px-6 mt-5 text-white rounded-lg shadow-lg transition-colors bg-neutral-800 active:bg-neutral-900 active:text-neutral-400"
          onClick={() => reset()}
        >
          Reset
        </button>
      }
    </div>
  );
}
