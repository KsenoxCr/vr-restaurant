import Link from "next/link";
import { Button } from "~/components/ui/button";

type ClickOrHref = {
  message?: string;
  error?: Error & { digest?: string };
} & ({ callback: () => void } | { href: string; label?: string });

export function ErrorScreen(props: ClickOrHref) {
  return (
    <div className="flex fixed inset-0 flex-col justify-center items-center text-white background bg-neutral-700">
      <h1 className="text-lg font-bold">
        {props.message ? props.message : "Something went wrong..."}
      </h1>
      {props.error && <p className="mt-4 text-sm">{props.error.message}</p>}
      {props.error?.digest && (
        <p className="mt-2 text-xs">{props.error.digest}</p>
      )}
      {"callback" in props ? (
        <Button
          variant="secondary"
          active={true}
          className="mt-5 shadow-lg"
          onClick={() => props.callback()}
        >
          Reset
        </Button>
      ) : (
        <Button
          variant="secondary"
          active={true}
          className="mt-5 shadow-lg"
          asChild
        >
          <Link href={props.href}>{props.label ?? "Go Back"}</Link>
        </Button>
      )}
    </div>
  );
}
