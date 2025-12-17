import { notFound } from "next/navigation";
import { MenuItemScreen } from "~/app/_components/menu-items/menu-item-screen";

export default async function MenuItemPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const idNumber = Number(id);

  if (!Number.isInteger(idNumber)) notFound();

  return <MenuItemScreen id={idNumber} />;
}
