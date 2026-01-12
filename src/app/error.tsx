"use client";

import type { ErrorProps } from "~/types";
import { ErrorScreen } from "./_components/screen/error-screen";

export default function ErrorPage({ error, reset }: ErrorProps) {
  return <ErrorScreen message={error.message} callback={reset!} />;
}
