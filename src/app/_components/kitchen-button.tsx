"use client"

import React from "react"
import { ChefHat } from "lucide-react"
import { useRouter } from "next/navigation"

export const KitchenButton = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>((props, ref) => {
  const router = useRouter()

  return (
  <button
    aria-label="Kitchen Terminal"
    className="fixed top-4 right-4 z-50 p-3 text-white rounded-full shadow-lg transition-all active:shadow-xl active:scale-105 bg-neutral-800 active:bg-neutral-900"
    ref={ref}
    {...props}
    onClick={() => { router.push("/kitchen-view") }}
    >
    <ChefHat className="w-6 h-6" />
  </button>
  )
})

KitchenButton.displayName = "kitchenButton" // For React Dev Tools clarity
