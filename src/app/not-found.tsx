import Link from "next/link";
import { Button } from "./_components/ui/button";
import { Typography } from "./_components/ui/typography";

export default function NotFound() {
  return (
    <div className="flex fixed inset-0 flex-col justify-center items-center background bg-light-gray-dark">
      <Typography as="h1" size="3xl" weight="bold">
        404
      </Typography>
      <Typography as="h1" size="lg" weight="bold">
        Page not found
      </Typography>
      <Button variant="primary" className="mt-10" asChild>
        <Link href="/">Back to Home</Link>
      </Button>
    </div>
  );
}
