"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { navigateBack } from "~/lib/utils";
import { Button } from "~/app/_components/ui/button";

export function BackButton() {
  const router = useRouter();

  return (
    <Button
      variant="ghost"
      active={false}
      className="shadow-none"
      onClick={() => navigateBack(router, "/menu")}
    >
      <ArrowLeft className="w-8 h-8" />
      <p>Back</p>
    </Button>
  );
}
