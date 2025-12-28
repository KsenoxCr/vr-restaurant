"use client";

import { ErrorScreen } from "./_components/screen/error-screen";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return <ErrorScreen error={error} callback={reset} />;
}
