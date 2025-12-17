import { TRPCError } from "@trpc/server";
import { CircleX } from "lucide-react";
import Image from "next/image";
import { api } from "~/trpc/server";
import { BackButton } from "./back-button";
import { CartButton } from "../cart";
import { PurchasePanel } from "../purchase-panel";
import { formatCents } from "~/utils/price";
import { NotFoundScreen } from "../not-found";
import { ErrorScreen } from "../error-screen";

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
    <main className="flex flex-col items-center w-screen h-screen bg-neutral-700">
      <header className="flex justify-between items-center w-screen bg-neutral-800">
        <BackButton />
        <CartButton />
      </header>
      <article className="mt-4 flex h-[85%] w-[90%] flex-col justify-center overflow-hidden rounded-2xl bg-neutral-800 text-neutral-300 shadow-lg">
        <div className="flex relative justify-center items-center flex-[4]">
          {menuItem.imageUrl ? (
            <Image
              src={menuItem.imageUrl}
              alt={menuItem.name}
              className="object-cover object-center"
              fill
            />
          ) : (
            <CircleX className="w-8 h-8" />
          )}
        </div>
        <div className="flex justify-between items-center my-2 mx-4 mt-4">
          <h1 className="text-xl">{menuItem.name}</h1>
          <p className="text-2xl text-green-600">
            {formatCents(menuItem.priceCents)}
          </p>
        </div>
        <div className="my-2 mx-4">
          <span className="py-2 px-4 mr-2 rounded-full bg-neutral-600">
            {menuItem.category.type}
          </span>
          <span className="py-2 px-4 rounded-full bg-neutral-600">
            {menuItem.category.name}
          </span>
        </div>
        <div className="mx-4 mt-2">
          <h2 className="mt-2 mb-4 text-xl">Description</h2>
          <p>{menuItem.description}</p>
        </div>
        <PurchasePanel priceCents={menuItem.priceCents} maxQuantity={10} />
      </article>
    </main>
  );
}
