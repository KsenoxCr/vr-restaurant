import { SlidersHorizontal } from "lucide-react";
import { Button } from "~/app/_components/ui/button";

export function FilterButton({ onClick }: { onClick: () => void }) {
  return (
    <Button
      variant="primary"
      rounded="full"
      size="lg"
      className="fixed bottom-3 right-7 p-3"
      onClick={onClick}
    >
      <SlidersHorizontal />
    </Button>
  );
}
