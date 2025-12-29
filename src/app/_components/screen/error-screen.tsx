"use client";

import Link from "next/link";
import { Button } from "~/app/_components/ui/button";
import { Text } from "../ui/text";
import { useState } from "react";

type ClickOrHref = {
  message?: string;
  errorMessage?: string;
  digest?: string;
} & (
  | { callback: () => void; label?: string }
  | { href: string; label?: string }
  | { label: string }
);

export function ErrorScreen(props: ClickOrHref) {
  const [visible, setVisible] = useState(true); // Destroy instead of set invisible if possible dead components accumulating

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
    <div className="flex fixed inset-0 flex-col justify-center items-center bg-gray">
      <Text as="h1" size="lg" weight="bold">
        {props.message ? props.message : "Something went wrong..."}
      </Text>
      {props.errorMessage && (
        <Text as="p" variant="error" className="mt-4">
          {props.errorMessage}
        </Text>
      )}
      {props.digest && (
        <Text as="p" size="xs" className="mt-2">
          {props.digest}
        </Text>
      )}
      {displayButton()}
    </div>
  );
}
