import React from "react"
import { LucideIcon } from "lucide-react"

export function FeaturePill({ icon: Icon, label }: { icon: LucideIcon, label: string }) {
  return (
    <div className="flex gap-2 items-center p-4 rounded-full border-2 backdrop-blur-sm bg-white/10 border-white/20">
      <Icon className="text-green-600" />
      <p>{label}</p>
    </div>
  )
}

