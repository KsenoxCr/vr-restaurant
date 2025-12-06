'use client'

import React from 'react';
import { useIsMobile } from "~/hooks/useIsMobile";

export function MobileOnlyGate({ children }: { children: React.ReactNode }): JSX.Element | null {
  const { isMobile, isClient } = useIsMobile();

  if (!isClient) {
    return null;
  }

  if (!isMobile) {
    return <div>Desktop Message (replace with block screen)</div>;
  }

  return <>{children}</>;
}
