import { LoaderCircle } from "lucide-react";

export function LoadingPage() {
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-light-gray">
      <LoaderCircle className="w-20 h-20 animate-spin text-dark-gray" />
    </div>
  );
}
