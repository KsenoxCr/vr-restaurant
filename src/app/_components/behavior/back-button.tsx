"use client";

import { ArrowLeft } from "lucide-react";
import { Button } from "~/app/_components/ui/button";
import { useRouter } from "next/navigation";
import { navigateBack } from "~/lib/utils";

export function BackButton({ fallbackHref }: { fallbackHref: string }) {
  const router = useRouter();

  return (
    <Button
      variant="ghost"
      active={false}
      className="text-lg shadow-none"
      onClick={() => navigateBack(router, fallbackHref)}
    >
      <ArrowLeft className="w-8 h-8" />
      Back
    </Button>
  );
}
