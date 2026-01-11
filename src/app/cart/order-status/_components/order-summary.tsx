import { Typography } from "~/app/_components/ui/typography";
import { formatCents } from "~/lib/utils/shared";
import { useOrderStore } from "~/stores/order-store";

export function OrderSummary() {
  const id = useOrderStore((state) => state.id);
  const items = useOrderStore((state) => state.items);
  const getTotalPrice = useOrderStore((state) => state.getTotalPrice);

  return (
    <div className="flex max-h-[60%] w-[80%] flex-col gap-1 overflow-y-scroll rounded-lg bg-dark-gray p-4">
      <Typography className="mb-1" variant="muted" size="sm">
        Order #{id}
      </Typography>
      {items.map((item) => (
        <div className="grid items-center grid-cols-[2fr_1fr_1fr]">
          <Typography className="">{item.name}</Typography>
          <Typography className="">× {item.quantity}</Typography>
          <Typography className="text-right" variant="muted">
            {formatCents(item.priceCents)}
          </Typography>
        </div>
      ))}
      <div className="flex justify-between mt-4">
        <Typography>Total</Typography>
        <Typography variant="price">{formatCents(getTotalPrice())}</Typography>
      </div>
    </div>
  );
}
