import { notFound } from "next/navigation";
import { MenuItemScreen } from "~/app/menu-items/[id]/_components/menu-item-screen";
import { ScrollLock } from "~/app/_components/scroll-lock";

export default async function MenuItemModal({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const idNumber = Number(id);

  if (!Number.isInteger(idNumber)) notFound();

  return (
    <>
      <MenuItemScreen id={idNumber} />;
      <ScrollLock />
    </>
  );
}
