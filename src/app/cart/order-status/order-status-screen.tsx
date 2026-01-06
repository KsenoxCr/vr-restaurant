"use client";

import { OrderStatus } from "@prisma/client";
import { Typography } from "~/app/_components/ui/typography";
import { OrderSummary } from "./_components/order-summary";
import { Button } from "~/app/_components/ui/button";
import {
  ClockIcon,
  EyeIcon,
  ChefHatIcon,
  SoupIcon,
  CircleCheckIcon,
  BanIcon,
  XIcon,
} from "./_components/status-icons";
import { useRouter } from "next/navigation";
import { useOrderStore } from "~/stores/order-store";
import { api } from "~/trpc/react";
import { LoadingScreen } from "~/app/_components/screen/loading-page";
import { useQueryClient } from "@tanstack/react-query";

type ActionButtonProps = {
  desctructive?: boolean;
  text: string;
  notWide?: boolean;
  onClick: () => void;
};

export function OrderStatusScreen() {
  const orderId = useOrderStore((state) => state.id);
  const clearOrderState = useOrderStore((state) => state.clearState);
  const router = useRouter();
  const queryClient = useQueryClient();

  const updateStatus = api.order.updateStatus.useMutation();
  const orderQuery = api.order.getById.useQuery(orderId, {
    enabled: !!orderId,
    refetchInterval: 2000,
  });

  // TODO: use suspense
  if (!orderQuery.data) {
    return <LoadingScreen color={"dark"} />;
  }

  const seatNumber = orderQuery.data.seatNumber;
  const os = OrderStatus;

  let icon,
    statusHeader,
    statusDesc,
    orderSummary,
    button = null;

  const cancelOrder = () => {
    // TODO: Show loading screen until mutation complete
    queryClient.removeQueries({ queryKey: [["order"]] });
    updateStatus.mutate({ orderId, status: os.CANCELLED });
  };

  const backToMenu = () => {
    clearOrderState();

    router.push("/menu");
  };

  const ActionButton = ({
    desctructive = false,
    text,
    notWide = false,
    onClick,
  }: ActionButtonProps) => {
    return (
      <Button
        variant={`${desctructive ? "danger" : "primary"}`}
        className={`${notWide ? "" : "w-[80%]"}`}
        onClick={onClick}
      >
        {text}
      </Button>
    );
  };

  console.log(orderQuery.data.status);

  switch (orderQuery.data.status) {
    case os.SUBMITTED:
      icon = <ClockIcon />;
      statusHeader = "Order Submitted";
      statusDesc =
        "Your order has been submitted and, is waiting to be seen by the kitchen staff";
      orderSummary = <OrderSummary />;
      button = (
        <ActionButton desctructive text="Cancel Order" onClick={cancelOrder} />
      );
      break;
    case os.CONFIRMED:
      icon = <EyeIcon />;
      statusHeader = "Order Confirmed";
      statusDesc =
        "Your order has been seen by the kitchen staff and will be prepared soon";
      orderSummary = <OrderSummary />;
      break;
    case os.PREPARING:
      icon = <ChefHatIcon />;
      statusHeader = "Preparing";
      statusDesc =
        "Your order is currently being prepared by our kitchen staff";
      orderSummary = <OrderSummary />;
      break;
    case os.READY:
      icon = <SoupIcon />;
      statusHeader = "Order Ready";
      statusDesc = `Your order is ready and will be served to seat ${seatNumber} shortly`;
      orderSummary = <OrderSummary />;
      break;
    case os.DELIVERED:
      icon = <CircleCheckIcon />;
      statusHeader = "Order Complete";
      statusDesc = `Your order has been delivered to seat ${seatNumber}. Enjoy your meal!`;
      button = <ActionButton text="Order More" onClick={backToMenu} />;
      break;
    case os.REJECTED:
      icon = <BanIcon />;
      statusHeader = "Order Rejected";
      statusDesc =
        "Your order has been rejected by the staff. Please ask the staff for more information";
      orderSummary = <OrderSummary idOnly />;
      button = <ActionButton text="Back to Menu" onClick={backToMenu} />;
      break;
    case os.CANCELLED:
      icon = <XIcon />;
      statusHeader = "Order Cancelled";
      statusDesc =
        "Your order has been cancelled and there for will not be seen by the staff";
      button = (
        <ActionButton text="Back to Menu" onClick={backToMenu} notWide />
      );
      break;
  }

  return (
    <div className="flex flex-col gap-5 justify-center items-center min-h-screen bg-dark">
      {icon}
      <Typography as="h1" variant="heading-3">
        {statusHeader}
      </Typography>
      <Typography as="p" className="-mt-2 w-[80%] text-center" color="muted">
        {statusDesc}
      </Typography>
      {orderSummary}
      {button}
    </div>
  );
}
