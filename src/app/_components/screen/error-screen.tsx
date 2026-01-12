"use client";

import Link from "next/link";
import { Button } from "~/app/_components/ui/button";
import { Typography } from "../ui/typography";
import { useState } from "react";
import { ScrollLock } from "../behavior/scroll-lock";

type ClickOrHref = {
  title?: string;
  message?: string;
  digest?: string;
} & (
  | { callback: () => void; label?: string }
  | { href: string; label?: string }
  | { label: string }
);

export function ErrorScreen(props: ClickOrHref) {
  const [visible, setVisible] = useState(true);

  const displayButton = () => {
    if ("callback" in props) {
      return (
        <Button
          variant="secondary"
          active={true}
          className="mt-5"
          onClick={() => props.callback()}
        >
          {props.label ?? "Reset"}
        </Button>
      );
    }
    if ("href" in props) {
      return (
        <Button variant="secondary" active={true} className="mt-5" asChild>
          <Link href={props.href}>{props.label ?? "Go Back"}</Link>
        </Button>
      );
    }

    return (
      <Button
        onClick={() => setVisible(false)}
        variant="secondary"
        active={true}
        className="mt-5"
        asChild
      ></Button>
    );
  };

  if (!visible) {
    return null;
  }

  return (
    <>
      <div className="flex fixed inset-0 z-20 flex-col justify-center items-center bg-gray">
        <Typography as="h1" size="lg" weight="bold">
          {props.title ?? "Something went wrong..."}
        </Typography>
        {props.message && (
          <Typography as="p" variant="body" className="mt-4">
            {props.message}
          </Typography>
        )}
        {props.digest && (
          <Typography as="p" size="xs" className="mt-2">
            {props.digest}
          </Typography>
        )}
        {displayButton()}
      </div>
      <ScrollLock />
    </>
  );
}
