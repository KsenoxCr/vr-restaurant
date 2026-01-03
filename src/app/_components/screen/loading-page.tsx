import { LoaderCircle } from "lucide-react";

export function LoadingScreen({ color }: { color: "dark" | "gray" }) {
  return (
    <div
      className={`flex h-screen flex-col items-center justify-center ${
        color === "dark" ? "bg-dark" : "bg-gray"
      }`}
    >
      <LoaderCircle
        className={`h-20 w-20 animate-spin ${
          color === "dark" ? "text-gray" : "text-dark"
        }`}
      />
    </div>
  );
}
