import Link from "next/link";
import { Button } from "~/app/_components/ui/button";
import { Typography } from "../ui/typography";

type NotFoundScreenProps = {
  message?: string;
  buttonProps?: {
    text: string;
    route: string;
  };
};

export function NotFoundScreen({ message, buttonProps }: NotFoundScreenProps) {
  return (
    <div className="flex fixed inset-0 flex-col justify-center items-center background bg-light-gray-dark">
      {message ? (
        <Typography as="h1" size="lg" className="mb-4">
          {message}
        </Typography>
      ) : (
        <>
          <Typography as="h1" size="3xl" weight="bold">
            404
          </Typography>
          <Typography as="h1" size="lg" weight="bold">
            Page not found
          </Typography>
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
