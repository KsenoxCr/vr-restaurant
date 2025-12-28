import { CircleX } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { formatCents } from "~/lib/utils/price";
import { Text } from "~/app/_components/ui/text";

export function MenuItemCard({
  id,
  name,
  description,
  priceCents,
  imageUrl,
}: {
  id: number;
  name: string;
  description: string | null;
  priceCents: number;
  imageUrl: string | null;
}) {
  return (
    <Link
      href={`/menu-items/${id}`}
      className="bg-dark mt-4 flex h-[350px] w-[90%] flex-col justify-center overflow-hidden rounded-2xl shadow-lg"
    >
      <div className="flex relative justify-center items-center basis-3/5">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={name}
            className="object-cover object-center"
            fill
          />
        ) : (
          <CircleX className="w-14 h-14 text-gray" />
        )}
      </div>
      <div className="flex flex-col justify-between basis-2/5">
        <Text as="h3" variant="body" className="mx-4 mt-3 mb-2">
          {name}
        </Text>
        <Text as="p" variant="muted" className="my-1 mx-4">
          {description}
        </Text>
        <Text variant="price" className="mx-4 mt-2 mb-3">
          {formatCents(priceCents)}
        </Text>
      </div>
    </Link>
  );
}
