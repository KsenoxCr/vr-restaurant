import { CircleX } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { formatCents } from "~/utils/price";

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
  const pathname = usePathname();

  return (
    <Link
      href={`/menu-items/${id}`}
      className="mt-4 flex h-[350px] w-[90%] flex-col justify-center overflow-hidden rounded-2xl bg-neutral-900 shadow-lg"
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
          <CircleX className="w-8 h-8 text-neutral-300" /> // Test with broken url
        )}
      </div>
      <div className="flex flex-col justify-between basis-2/5">
        <h3 className="mx-4 mt-3 mb-2 text-neutral-300">{name}</h3>
        <p className="my-1 mx-4 text-neutral-400">{description}</p>
        <span className="mx-4 mt-2 mb-3 text-green-600">
          {formatCents(priceCents)}
        </span>
      </div>
    </Link>
  );
}
