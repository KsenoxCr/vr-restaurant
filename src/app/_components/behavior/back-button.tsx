"use client";

import { ArrowLeft } from "lucide-react";
import { Button } from "~/app/_components/ui/button";
import { useRouter } from "next/navigation";

export function BackButton({ fallbackHref }: { fallbackHref: string }) {
  const router = useRouter();

  return (
    <Button
      variant="ghost"
      active={false}
      className="text-lg shadow-none"
      onClick={() => {
        //FIX: Needs conditional logic for handling edge cases where user navigatred from outside the app
        history.length > 0
          ? router.back()
          : router.push(fallbackHref ?? "/menu");
      }}
    >
      <ArrowLeft className="w-8 h-8" />
      Back
    </Button>
  );
}
