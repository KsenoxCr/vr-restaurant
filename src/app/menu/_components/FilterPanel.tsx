import type { Allergen } from "@prisma/client";
import type { FormEvent } from "react";
import { Button } from "~/app/_components/ui/button";
import { Typography } from "~/app/_components/ui/typography";
type PriceRangeCents = {
  top: number;
  bottom: number;
};

export type Filters = {
  priceRange?: PriceRangeCents;
  allergens?: Allergen[];
};

export function FilterPanel({
  visible,
  setFilters,
}: {
  visible: boolean;
  setFilters: (args: Filters) => void;
}) {
  const visibility = visible ? "" : "hidden";

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const fd = new FormData(e.currentTarget);

    const fdPriceRange = fd.get("priceRange");
    const allergens = fd
      .getAll("allergen")
      .filter((v): v is Allergen => typeof v === "string");

    let priceRangeCents: PriceRangeCents | undefined;

    if (typeof fdPriceRange === "string") {
      switch (fdPriceRange) {
        case "le-5":
          priceRangeCents = { top: 500, bottom: 0 };
          break;
        case "5-10":
          priceRangeCents = { top: 1000, bottom: 500 };
          break;
        case "ge-10":
          priceRangeCents = { top: Infinity, bottom: 1000 };
          break;
      }
    }

    setFilters({ allergens, priceRange: priceRangeCents });
  };

  return (
    <div
      className={`${visibility} bg-dark absolute bottom-20 right-7 rounded-lg`}
    >
      <form className="flex flex-col gap-1 m-4" onSubmit={handleSubmit}>
        <Typography as="h2" className="mb-2">
          Filters
        </Typography>
        <fieldset>
          <Typography as="legend" variant="heading-3" className="mb-1">
            Price Range
          </Typography>
          <Typography as="label" className="flex gap-2">
            <input type="radio" name="priceRange" value="le-5" />
            Under 5€
          </Typography>
          <Typography as="label" className="flex gap-2">
            <input type="radio" name="priceRange" value="5-10" />
            5€-10€
          </Typography>
          <Typography as="label" className="flex gap-2">
            <input type="radio" name="priceRange" value="ge-10" />
            Over 10€
          </Typography>
        </fieldset>

        <fieldset>
          <Typography as="legend" variant="heading-3" className="my-1">
            Allergens
          </Typography>
          <Typography as="label" className="flex gap-2">
            <input type="checkbox" name="allergen" value="GLUTEN" />
            Gluten
          </Typography>
          <Typography as="label" className="flex gap-2">
            <input type="checkbox" name="allergen" value="DAIRY" />
            Dairy
          </Typography>
          <Typography as="label" className="flex gap-2">
            <input type="checkbox" name="allergen" value="EGGS" />
            Eggs
          </Typography>
          <Typography as="label" className="flex gap-2">
            <input type="checkbox" name="allergen" value="NUTS" />
            Nuts
          </Typography>
          <Typography as="label" className="flex gap-2">
            <input type="checkbox" name="allergen" value="PEANUTS" />
            Peanuts
          </Typography>
          <Typography as="label" className="flex gap-2">
            <input type="checkbox" name="allergen" value="SHELLFISH" />
            Shellfish
          </Typography>
          <Typography as="label" className="flex gap-2">
            <input type="checkbox" name="allergen" value="FISH" />
            Fish
          </Typography>
          <Typography as="label" className="flex gap-2">
            <input type="checkbox" name="allergen" value="SOY" />
            Soy
          </Typography>
          <Typography as="label" className="flex gap-2">
            <input type="checkbox" name="allergen" value="WHEAT" />
            Wheat
          </Typography>
          <Typography as="label" className="flex gap-2">
            <input type="checkbox" name="allergen" value="SESAME" />
            Sesame
          </Typography>
        </fieldset>
        <div className="flex gap-2 mt-2">
          <Button type="reset" variant="secondary">
            Clear
          </Button>
          <Button type="submit">Apply</Button>
        </div>
      </form>
    </div>
  );
}
