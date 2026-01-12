import { TRPCError } from "@trpc/server";
import { CircleX } from "lucide-react";
import Image from "next/image";
import { api } from "~/trpc/server";
import { BackButton } from "~/app/_components/behavior/back-button";
import { CartButton } from "~/app/_components/cart/cart-button";
import { formatCents } from "~/lib/utils/shared";
import { ErrorScreen } from "~/app/_components/screen/error-screen";
import { Typography } from "~/app/_components/ui/typography";
import { PurchasePanel } from "./purchase-panel";

export async function MenuItemScreen({ id }: { id: number }) {
  let menuItem;

  try {
    menuItem = await api.menu.getById(id);
  } catch (error) {
    if (error instanceof TRPCError && error.code === "NOT_FOUND") {
      return (
        <ErrorScreen title="Item not found" label="Back to Menu" href="/menu" />
      );
    } else {
      let href: string;
      let message: string;
      let label: string;

      if (error instanceof TRPCError && error.code === "UNAUTHORIZED") {
        href = "/seat-selection";
        message = "Session not created...";
        label = "Select Seat";
      } else {
        href = "/menu";
        message = "Error loading item...";
        label = "Back to Menu";
      }

      return (
        <ErrorScreen
          href={href}
          title={message}
          label={label}
          message={error instanceof Error ? error.message : undefined}
        />
      );
    }
  }

  return (
    <main className="flex overflow-hidden fixed inset-0 flex-col items-center w-screen h-screen bg-dark-gray">
      <header className="flex justify-between items-center w-screen bg-dark-gray">
        <BackButton fallbackHref="/menu" />
        <CartButton />
      </header>
      <div className="flex flex-1 justify-center items-center">
        <article className="flex h-[calc(100%-2rem)] w-[calc(100%-2rem)] flex-col justify-center overflow-hidden rounded-2xl bg-dark text-off-white shadow-lg">
          {/* Image */}
          <div className="flex relative justify-center items-center flex-[4]">
            {menuItem.imageUrl ? (
              <Image
                src={menuItem.imageUrl}
                alt={menuItem.name}
                className="object-cover object-center"
                fill
              />
            ) : (
              <CircleX className="w-14 h-14 text-gray" />
            )}
          </div>

          <div className="flex flex-col gap-1 my-4 mx-4">
            {/* Name & Price */}
            <div className="flex justify-between items-center mb-4">
              <Typography as="h1" variant="heading-2">
                {menuItem.name}
              </Typography>
              <Typography variant="price-lg">
                {formatCents(menuItem.priceCents)}
              </Typography>
            </div>

            {/* Type & Category */}
            <div>
              <Typography className="py-2 px-4 mr-2 rounded-full bg-light-gray">
                {menuItem.category.type}
              </Typography>
              <Typography className="py-2 px-4 rounded-full bg-light-gray">
                {menuItem.category.name}
              </Typography>
            </div>

            {/* Allergens */}
            {menuItem.allergens.length > 0 && (
              <Typography as="h2" variant="heading-2" className="mt-3">
                Allergens
              </Typography>
            )}
            <div className="flex flex-wrap gap-2 mt-2">
              {menuItem.allergens.map((a, i) => (
                <Typography
                  key={`allergen-${i}`}
                  className="py-1 px-2 rounded-full bg-light-gray"
                >
                  {a.toLowerCase()}
                </Typography>
              ))}
            </div>

            {/* Description */}
            <div>
              <Typography as="h2" variant="heading-2" className="mt-2 mb-2">
                Description
              </Typography>
              <Typography as="p" variant="body">
                {menuItem.description}
              </Typography>
            </div>
            <PurchasePanel
              id={menuItem.id}
              name={menuItem.name}
              priceCents={menuItem.priceCents}
              imageUrl={menuItem.imageUrl}
              maxQuantity={10}
            />
          </div>
        </article>
      </div>
    </main>
  );
}
