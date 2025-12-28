import Link from "next/link";
import { Button } from "~/app/_components/ui/button";
import { Text } from "./ui/text";

type NotFoundScreenProps = {
  message?: string;
  buttonProps?: {
    text: string;
    route: string;
  };
};

export function NotFoundScreen({ message, buttonProps }: NotFoundScreenProps) {
  return (
    <div className="flex fixed inset-0 flex-col justify-center items-center background bg-neutral-600-dark">
      {message ? (
        <Text as="h1" size="lg" className="mb-4">
          {message}
        </Text>
      ) : (
        <>
          <Text as="h1" size="3xl" weight="bold">
            404
          </Text>
          <Text as="h1" size="lg" weight="bold">
            Page not found
          </Text>
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
