import React from "react";
import type { LucideIcon } from "lucide-react";
import { Typography } from "~/app/_components/ui/typography";

export function FeaturePill({
  icon: Icon,
  label,
}: {
  icon: LucideIcon;
  label: string;
}) {
  return (
    <div className="flex gap-2 items-center p-3 rounded-full border-2 border-white/20 bg-white/10 backdrop-blur-sm">
      <Icon className="text-accent" />
      <Typography as="p">{label}</Typography>
    </div>
  );
}
