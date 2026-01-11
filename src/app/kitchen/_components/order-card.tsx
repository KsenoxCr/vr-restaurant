"use client";

import { OrderStatus } from "@prisma/client";
import { ChevronUp } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "~/app/_components/ui/button";
import { Typography } from "~/app/_components/ui/typography";
import { formatCents, toSentenceCase } from "~/lib/utils/shared";
import { Selector } from "./_components/status-selector";

type OrderCardProps = {
  order: {
    id: number;
    seatNumber: number;
    status: OrderStatus;
    createdAt: Date;
    items: {
      name: string;
      priceCents: number;
      quantity: number;
    }[];
    totalPriceCents: number;
  };
};

const timeFi = new Intl.DateTimeFormat("fi-FI", {
  hour: "2-digit",
  minute: "2-digit",
});

export default function OrderCard({ order }: OrderCardProps) {
  const [selectorIsOpen, setSelectorIsOpen] = useState(false);
  const [status, setStatus] = useState(order.status);

  useEffect(() => {
    setStatus(order.status);
  }, [order.status]);

  return (
    <article className="flex flex-col gap-2 p-4 m-6 rounded-lg shadow-lg bg-dark-gray">
      <header className="grid items-center grid-cols-[2fr_1fr]">
        <div>
          <Typography as="h2" color="muted">
            Order #{order.id}
          </Typography>
          <Typography color="primary">Seat {order.seatNumber}</Typography>
        </div>
        <Typography as="time" color="muted" className="ml-auto">
          {timeFi.format(order.createdAt)}
        </Typography>
      </header>

      <section className="pt-2 border-t-4 border-dark" aria-label="Items">
        <dl className="grid items-center grid-cols-[2fr_1fr_1fr]">
          {order.items.map((item) => (
            <>
              <Typography as="dt">{item.name}</Typography>
              <Typography as="dt" color="muted">
                × {item.quantity}
              </Typography>
              <Typography as="dd" color="muted" className="ml-auto">
                {formatCents(item.quantity * item.priceCents)}
              </Typography>
            </>
          ))}
        </dl>
        <dl className="flex justify-between pb-4 mt-6 mb-2 border-b-4 border-dark">
          <Typography as="dt">Total</Typography>
          <Typography as="dt" variant="price" color="accent-light">
            {formatCents(order.totalPriceCents)}
          </Typography>
        </dl>
      </section>
      <section className="flex relative flex-col gap-2" aria-label="headers">
        <Typography as="label">Order Status</Typography>
        <Button
          variant="ternary"
          className={`flex justify-between ${selectorIsOpen ? "rounded-t-none" : ""}`}
          active={false}
          onClick={() => setSelectorIsOpen(!selectorIsOpen)}
        >
          {toSentenceCase(status)}
          <ChevronUp
            className={`h-6 w-6 ${selectorIsOpen ? "rotate-180" : ""}`}
          />
        </Button>
        <Selector
          open={selectorIsOpen}
          orderId={order.id}
          currentStatus={status}
          setStatus={setStatus}
          setIsOpen={setSelectorIsOpen}
        />
      </section>
    </article>
  );
}
