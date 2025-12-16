import { CircleX } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function MenuItemCard({
  id,
  name,
  description,
  price,
  imageUrl,
  onClick,
}: {
  id: number;
  name: string;
  description: string | null;
  price: string | null;
  imageUrl: string | null;
  onClick?: () => void;
}) {
  return (
    <Link
      href={`/products/${id}`}
      className="mt-4 flex h-[350px] w-[90%] flex-col justify-center overflow-hidden rounded-2xl bg-neutral-900 shadow-lg"
    >
      <div className="relative background-justify-center flex-[4]">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={name}
            className="object-cover object-center"
            fill
            loading="lazy"
          />
        ) : (
          <CircleX className="w-8 h-8 text-neutral-300" /> // Test with broken url
        )}
      </div>
      <div className="flex flex-col justify-between flex-[2]">
        <title className="text-neutral-300">{name}</title>
        <p className="m-2 text-neutral-400">{description}</p>
        <p className="m-2 text-green-600">{`${price}€`}</p>
      </div>
    </Link>
  );
}
