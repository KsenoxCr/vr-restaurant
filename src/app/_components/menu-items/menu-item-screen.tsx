import { TRPCError } from "@trpc/server";
import { CircleX } from "lucide-react";
import Image from "next/image";
import { api } from "~/trpc/server";
import { BackButton } from "./back-button";
import { CartButton } from "../cart-button";
import { PurchasePanel } from "../purchase-panel";
import { formatCents } from "~/lib/utils/price";
import { NotFoundScreen } from "../not-found";
import { ErrorScreen } from "../error-screen";
import { Text } from "../ui/text";

export async function MenuItemScreen({ id }: { id: number }) {
  let menuItem;

  try {
    menuItem = await api.menu.getById(id);
  } catch (error) {
    if (error instanceof TRPCError && error.code === "NOT_FOUND") {
      return (
        <NotFoundScreen
          message="Item not Found"
          buttonProps={{ text: "Back to Menu", route: "/menu-view" }}
        />
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
        href = "/menu-view";
        message = "Error loading item...";
        label = "Back to Menu";
      }

      return (
        <ErrorScreen
          href={href}
          message={message}
          label={label}
          error={error instanceof Error ? error : undefined}
        />
      );
    }
  }

  return (
    <main className="flex overflow-hidden fixed inset-0 flex-col items-center w-screen h-screen bg-gray">
      <header className="flex justify-between items-center w-screen bg-dark-gray">
        <BackButton />
        <CartButton />
      </header>
      <div className="flex flex-1 justify-center items-center">
        <article className="flex h-[calc(100%-2rem)] w-[calc(100%-2rem)] flex-col justify-center overflow-hidden rounded-2xl bg-dark-gray text-off-white shadow-lg">
          {/* Image */}
          <div className="flex relative justify-center items-center flex-[4] bg-dark">
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
              <Text as="h1" variant="heading-2">
                {menuItem.name}
              </Text>
              <Text variant="price-lg">{formatCents(menuItem.priceCents)}</Text>
            </div>

            {/* Type & Category */}
            <div>
              <Text className="py-2 px-4 mr-2 rounded-full bg-light-gray">
                {menuItem.category.type}
              </Text>
              <Text className="py-2 px-4 rounded-full bg-light-gray">
                {menuItem.category.name}
              </Text>
            </div>

            {/* Allergens */}
            <Text as="h2" variant="heading-2" className="mt-3">
              Allergens
            </Text>
            <div className="flex flex-wrap gap-2 mt-2">
              {menuItem.allergens.map((a) => (
                <Text className="py-1 px-2 rounded-full bg-light-gray">
                  {a.toLowerCase()}
                </Text>
              ))}
            </div>

            {/* Description */}
            <div>
              <Text as="h2" variant="heading-2" className="mt-2 mb-2">
                Description
              </Text>
              <Text as="p" variant="body">
                {menuItem.description}
              </Text>
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
