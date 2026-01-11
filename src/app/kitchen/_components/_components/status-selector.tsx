import { OrderStatus } from "@prisma/client";
import { Button } from "~/app/_components/ui/button";
import { toSentenceCase } from "~/lib/utils/shared";

type SelectorProps = {
  open: boolean;
  currentStatus: string;
};

export function Selector({ open, currentStatus }: SelectorProps) {
  if (!open) {
    return null;
  }

  return (
    <ul className="absolute bottom-12 w-full">
      {Object.values(OrderStatus).map((oStatus) => {
        if (oStatus !== currentStatus) {
          return (
            <li>
              <Button
                variant="ternary"
                rounded="none"
                active={false}
                className="justify-start w-full border-b-2 border-dark"
              >
                {toSentenceCase(oStatus)}
              </Button>
            </li>
          );
        }
      })}
    </ul>
  );
}
