import React from "react";
import { LucideIcon } from "lucide-react";

export function FeaturePill({
  icon: Icon,
  label,
}: {
  icon: LucideIcon;
  label: string;
}) {
  return (
    <div className="flex gap-2 items-center p-3 rounded-full border-2 border-white/20 bg-white/10 text-neutral-300 backdrop-blur-sm">
      <Icon className="text-green-600" />
      <p>{label}</p>
    </div>
  );
}
