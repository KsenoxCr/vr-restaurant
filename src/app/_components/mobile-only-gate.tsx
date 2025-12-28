"use client";

import React from "react";
import { useIsMobile } from "~/hooks/useIsMobile";
import { Text } from "~/app/_components/ui/text";
import { Link } from "lucide-react";
import { Button } from "./ui/button";

export function MobileOnlyGate({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element | null {
  const { isMobile, isClient } = useIsMobile();

  if (!isClient) {
    return null;
  }

  if (!isMobile) {
    return (
      <div className="flex fixed inset-0 flex-col justify-center items-center bg-gray">
        <Text as="h1" size="lg" weight="bold">
          This demo only works on mobile devices...
        </Text>
        <Text as="p" className="mt-4">
          Please change device or viewport width
        </Text>
      </div>
    );
  }

  return <>{children}</>;
}
