import { Button } from "~/app/_components/ui/button";
import { Text } from "~/app/_components/ui/text";

export function FilterPanel({
  handleSubmit,
  visible,
}: {
  handleSubmit: () => void;
  visible: boolean;
}) {
  const visibility = visible ? "" : "hidden";

  return (
    <div
      className={`${visibility} absolute bottom-20 right-7 rounded-lg bg-neutral-900`}
    >
      <form className="flex flex-col gap-1 m-4" onSubmit={handleSubmit}>
        <Text as="h2" variant="label" className="mb-2">
          Filters
        </Text>
        <Text as="h3" variant="heading-3" className="mb-1">
          Price Range
        </Text>
        <Text as="label" className="flex gap-2">
          <input type="checkbox" />
          Under 5€
        </Text>
        <Text as="label" className="flex gap-2">
          <input type="checkbox" />
          5€-10€
        </Text>
        <Text as="label" className="flex gap-2">
          <input type="checkbox" />
          Over 5€
        </Text>

        <Text as="h3" variant="heading-3" className="my-1">
          Allergens
        </Text>
        <Text as="label" className="flex gap-2">
          <input type="checkbox" />
          Gluten-free
        </Text>
        <Text as="label" className="flex gap-2">
          <input type="checkbox" />
          Dairy-free
        </Text>
        <Text as="label" className="flex gap-2">
          <input type="checkbox" />
          Nut-free
        </Text>
        <Text as="label" className="flex gap-2">
          <input type="checkbox" />
          Vegetarian
        </Text>
        <Text as="label" className="flex gap-2">
          <input type="checkbox" />
          Vegan
        </Text>

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
