import Link from "next/link";

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
        <button
          className="py-3 px-6 mt-5 text-white rounded-lg shadow-lg transition-colors bg-neutral-800 active:bg-neutral-900 active:text-neutral-400"
          onClick={() => props.callback()}
        >
          Reset
        </button>
      ) : (
        <Link
          className="py-3 px-6 mt-5 text-white rounded-lg shadow-lg transition-colors bg-neutral-800 active:bg-neutral-900 active:text-neutral-400"
          href={props.href}
        >
          {props.label ?? "Go Back"}
        </Link>
      )}
    </div>
  );
}
