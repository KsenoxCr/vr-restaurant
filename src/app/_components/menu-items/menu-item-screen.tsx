import { TRPCError } from "@trpc/server";
import { api } from "~/trpc/server";

export async function MenuItemScreen({ id }: { id: number }) {
  let errorMessage: JSX.Element;

  try {
    const menuItem = await api.menu.getById(id);
  } catch (error) {
    if (error instanceof TRPCError && error.code === "NOT_FOUND") {
      errorMessage = <p>Item not found</p>;
    } else {
      errorMessage = <p>Something went wrong...</p>;
    }
  }

  const showMenuItem = () => {};

  return <div></div>;
}
