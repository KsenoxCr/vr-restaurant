import Link from "next/link";
import { Button } from "~/app/_components/ui/button";

type NotFoundScreenProps = {
  message?: string;
  buttonProps?: {
    text: string;
    route: string;
  };
};

export function NotFoundScreen({ message, buttonProps }: NotFoundScreenProps) {
  return (
    <div className="flex fixed inset-0 flex-col justify-center items-center text-white background bg-neutral-700">
      {message ? (
        <h1 className="mb-4 text-lg">{message}</h1>
      ) : (
        <>
          <h1 className="text-3xl font-bold">404</h1>
          <h1 className="text-lg font-bold">Page not found</h1>
        </>
      )}
      <Button variant="primary" className="mt-10" asChild>
        <Link href={buttonProps ? buttonProps.route : "/"}>
          {buttonProps ? buttonProps.text : "Back to Home"}
        </Link>
      </Button>
    </div>
  );
}
