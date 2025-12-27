import Link from "next/link";
import { Button } from "~/app/_components/ui/button";
import { Text } from "./ui/text";

type ClickOrHref = {
  message?: string;
  error?: Error & { digest?: string };
} & ({ callback: () => void } | { href: string; label?: string });

export function ErrorScreen(props: ClickOrHref) {
  return (
    <div className="flex fixed inset-0 flex-col justify-center items-center text-neutral-300 background bg-neutral-700">
      <Text as="h1" size="lg" weight="bold">
        {props.message ? props.message : "Something went wrong..."}
      </Text>
      {props.error && (
        <Text as="p" variant="error" className="mt-4">
          {props.error.message}
        </Text>
      )}
      {props.error?.digest && (
        <Text as="p" size="xs" className="mt-2">
          {props.error.digest}
        </Text>
      )}
      {"callback" in props ? (
        <Button
          variant="secondary"
          active={true}
          className="mt-5"
          onClick={() => props.callback()}
        >
          Reset
        </Button>
      ) : (
        <Button
          variant="secondary"
          active={true}
          className="mt-5"
          asChild
        >
          <Link href={props.href}>{props.label ?? "Go Back"}</Link>
        </Button>
      )}
    </div>
  );
}
