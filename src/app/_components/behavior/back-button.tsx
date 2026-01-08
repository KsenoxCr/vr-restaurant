"use client";

import { ArrowLeft } from "lucide-react";
import { Button } from "~/app/_components/ui/button";
import Link from "next/link";

export function BackButton() {
  return (
    <Button variant="ghost" active={false} className="shadow-none">
      <ArrowLeft className="w-8 h-8" />
      <Link className="text-lg" href="/menu">
        Back
      </Link>
    </Button>
  );
}
