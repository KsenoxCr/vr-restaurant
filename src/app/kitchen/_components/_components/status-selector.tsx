"use client";

import { OrderStatus } from "@prisma/client";
import { useState } from "react";
import { Button } from "~/app/_components/ui/button";
import { Toast } from "~/app/_components/ui/toast";
import { toSentenceCase } from "~/lib/utils/shared";
import { api } from "~/trpc/react";

type SelectorProps = {
  open: boolean;
  orderId: number;
  currentStatus: OrderStatus;
  setStatus: (status: OrderStatus) => void;
  setIsOpen: (isOpen: boolean) => void;
};

export function Selector({
  open,
  orderId,
  currentStatus,
  setStatus,
  setIsOpen: setIsOpen,
}: SelectorProps) {
  const statusMutation = api.order.updateStatus.useMutation();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  if (!open) {
    return null;
  }

  const statusCodes = Object.values(OrderStatus);

  const updateStatus = (newStatus: OrderStatus) => {
    const prevStatus = currentStatus;

    setStatus(newStatus);
    setIsOpen(false);

    statusMutation.mutate(
      { orderId: orderId, status: newStatus },
      {
        onError: (error) => {
          setStatus(prevStatus);
          setErrorMessage(error.message);
        },
      },
    );
  };

  return (
    <>
      {errorMessage && (
        <Toast
          message={`Order update failed: ${errorMessage}`}
          duration={3000}
          onComplete={() => setErrorMessage(null)}
        />
      )}
      <ul className="absolute bottom-12 w-full">
        {}
        {statusCodes.map((oStatus, i) => {
          if (oStatus !== currentStatus) {
            return (
              <li>
                <Button
                  variant="ternary"
                  rounded="none"
                  active={false}
                  onClick={() => {
                    updateStatus(oStatus);
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
    </>
  );
}
