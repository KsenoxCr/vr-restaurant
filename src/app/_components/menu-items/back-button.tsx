"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export function BackButton() {
  const router = useRouter();

  return (
    <button
      className="flex justify-center items-center m-4 text-green-600 active:text-green-700 transition-color group"
      onClick={
        window.history.length > 1
          ? () => router.back()
          : () => router.push("/menu-view")
      }
    >
      <ArrowLeft className="w-8 h-8" />
      <p>Back</p>
    </button>
  );
}
