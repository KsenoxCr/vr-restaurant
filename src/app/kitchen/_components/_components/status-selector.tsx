import { OrderStatus } from "@prisma/client";
import { Button } from "~/app/_components/ui/button";
import { toSentenceCase } from "~/lib/utils/shared";

type SelectorProps = {
  open: boolean;
  currentStatus: string;
  setStatus: (status: OrderStatus) => void;
  setIsOpen: (isOpen: boolean) => void;
};

export function Selector({
  open,
  currentStatus,
  setStatus,
  setIsOpen: setIsOpen,
}: SelectorProps) {
  if (!open) {
    return null;
  }

  const statusCodes = Object.values(OrderStatus);

  return (
    <ul className="absolute bottom-12 w-full">
      {statusCodes.map((oStatus, i) => {
        if (oStatus !== currentStatus) {
          return (
            <li>
              <Button
                variant="ternary"
                rounded="none"
                active={false}
                onClick={() => {
                  setStatus(oStatus);
                  setIsOpen(false);
                }}
                className={`w-full justify-start border-b-2 border-dark ${i === 0 ? "rounded-t-xl" : ""}`}
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
