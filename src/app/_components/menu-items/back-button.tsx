"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { navigateBack } from "~/lib/utils/navigation";
import { Button } from "~/components/ui/button";

export function BackButton() {
  const router = useRouter();

  return (
    <Button
      variant="ghost"
      active={false}
      onClick={() => navigateBack(router, "/menu-view")}
    >
      <ArrowLeft className="w-8 h-8" />
      <p>Back</p>
    </Button>
  );
}
