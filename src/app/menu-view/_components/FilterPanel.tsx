import { Allergen } from "@prisma/client";
import { FormEvent, useEffect, useState } from "react";
import { Button } from "~/app/_components/ui/button";
import { Text } from "~/app/_components/ui/text";

export type Filters = {
  priceRange?: string;
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

    const priceRange = fd.get("priceRange");
    const allergens = fd.getAll("allergen");

    setFilters({
      priceRange: typeof priceRange === "string" ? priceRange : undefined,
      allergens: allergens.filter((v): v is Allergen => typeof v === "string"),
    });
  };

  return (
    <div
      className={`${visibility} absolute bottom-20 right-7 rounded-lg bg-neutral-900`}
    >
      <form className="flex flex-col gap-1 m-4" onSubmit={handleSubmit}>
        <Text as="h2" variant="label" className="mb-2">
          Filters
        </Text>
        <fieldset>
          <Text as="legend" variant="heading-3" className="mb-1">
            Price Range
          </Text>
          <Text as="label" className="flex gap-2">
            <input type="radio" name="priceRange" value="le-5" />
            Under 5€
          </Text>
          <Text as="label" className="flex gap-2">
            <input type="radio" name="priceRange" value="5-10" />
            5€-10€
          </Text>
          <Text as="label" className="flex gap-2">
            <input type="radio" name="priceRange" value="ge-10" />
            Over 5€
          </Text>
        </fieldset>

        <fieldset>
          <Text as="legend" variant="heading-3" className="my-1">
            Allergens
          </Text>
          <Text as="label" className="flex gap-2">
            <input type="checkbox" name="allergen" value="GLUTEN" />
            Gluten
          </Text>
          <Text as="label" className="flex gap-2">
            <input type="checkbox" name="allergen" value="DAIRY" />
            Dairy
          </Text>
          <Text as="label" className="flex gap-2">
            <input type="checkbox" name="allergen" value="EGGS" />
            Eggs
          </Text>
          <Text as="label" className="flex gap-2">
            <input type="checkbox" name="allergen" value="NUTS" />
            Nuts
          </Text>
          <Text as="label" className="flex gap-2">
            <input type="checkbox" name="allergen" value="PEANUTS" />
            Peanuts
          </Text>
          <Text as="label" className="flex gap-2">
            <input type="checkbox" name="allergen" value="SHELLFISH" />
            Shellfish
          </Text>
          <Text as="label" className="flex gap-2">
            <input type="checkbox" name="allergen" value="FISH" />
            Fish
          </Text>
          <Text as="label" className="flex gap-2">
            <input type="checkbox" name="allergen" value="SOY" />
            Soy
          </Text>
          <Text as="label" className="flex gap-2">
            <input type="checkbox" name="allergen" value="WHEAT" />
            Wheat
          </Text>
          <Text as="label" className="flex gap-2">
            <input type="checkbox" name="allergen" value="SESAME" />
            Sesame
          </Text>
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
