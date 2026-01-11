"use client";

import { api } from "~/trpc/react";
import { BackButton } from "../_components/behavior/back-button";
import { Typography } from "../_components/ui/typography";
import { LoadingScreen } from "../_components/screen/loading-screen";
import { useRouter } from "next/navigation";
import OrderCard from "./_components/order-card";

// TODO: keep order with terminal status shown for some interval

export default function Kitchen() {
  const sessionQuery = api.session.getCurrent.useQuery();
  const ordersQuery = api.order.getAll.useQuery(undefined, {
    enabled: sessionQuery.isSuccess,
    refetchInterval: 5000,
  });

  const router = useRouter();

  if (sessionQuery.isLoading) {
    return <LoadingScreen color="gray" />;
  }

  if (sessionQuery.isError || sessionQuery.data!.role !== "KITCHEN") {
    router.push("/kitchen/login");
  }

  const terminalStatuses = ["DELIVERED", "REJECTED", "CANCELLED"];

  const displayOrders = () => {
    if (ordersQuery.isLoading) {
      return <LoadingScreen color="gray" />;
    }

    return (
      <>
        {ordersQuery.data?.map((o) => {
          if (terminalStatuses.includes(o.status)) {
            return null;
          }

          let totalPriceCents = 0;

          const oItems = o.items.map((oItem) => {
            totalPriceCents += oItem.quantity * oItem.priceSnapshotCents;

            return {
              name: oItem.menuItem.name,
              priceCents: oItem.priceSnapshotCents,
              quantity: oItem.quantity,
            };
          });

          const order = {
            id: o.id,
            seatNumber: o.seatNumber,
            status: o.status,
            createdAt: o.createdAt,
            items: oItems,
            totalPriceCents: totalPriceCents,
          };

          return <OrderCard order={order} />;
        })}
      </>
    );
  };

  // TODO: Add order count & refetch countdown

  return (
    <main className="flex flex-col">
      <header className="flex items-center bg-dark-gray">
        <BackButton fallbackHref="/" />
        <div className="flex-1">
          <Typography as="h1" className="mr-4 text-center">
            Kitchen Terminal
          </Typography>
        </div>
      </header>
      <section>{displayOrders()}</section>
    </main>
  );
}
