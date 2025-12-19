import { notFound } from "next/navigation";
import { MenuItemScreen } from "~/app/_components/menu-items/menu-item-screen";
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
