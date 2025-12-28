"use client";

import { UserRound } from "lucide-react";
import { api } from "~/trpc/react";
import { LoadingPage } from "../_components/loading-page";
import { useEffect, useRef, useState } from "react";
import { MenuItemCard } from "../_components/menu-item-card";
import { ErrorScreen } from "../_components/error-screen";
import Link from "next/link";
import { CartButton } from "../_components/cart-button";
import { usePathname } from "next/navigation";
import { Button } from "~/app/_components/ui/button";
import { Text } from "../_components/ui/text";
import { FilterButton } from "./_components/FilterButton";
import { FilterPanel, Filters } from "./_components/FilterPanel";
import { inRange } from "~/lib/utils/price";

export default function MenuView() {
  const [categoryType, setCategoryType] = useState("all");
  const [subcategory, setSubcategory] = useState("");
  const [filtersVisible, setFiltersVisible] = useState(false);
  const [filters, setFilters] = useState<Filters | null>(null);
  const pathname = usePathname();

  const menuRef = useRef<HTMLMenuElement | null>(null);

  const queries = {
    session: api.session.getCurrent.useQuery(),
    categories: api.menu.getCategories.useQuery(),
    menu: api.menu.getAll.useQuery(),
  } as const;

  const categories = queries.categories.data;

  useEffect(() => {
    if (!categories || categoryType === "all") return;

    const subcategories = categories.filter((c) => c.type === categoryType);

    if (subcategories.length > 0) {
      setSubcategory((prev) =>
        subcategories.some((c) => c.name === prev)
          ? prev
          : subcategories[0]!.name,
      );
    }
  }, [categoryType, categories]);

  useEffect(() => {
    if (menuRef.current) {
      menuRef.current.scrollTo(0, 0);
    }
  }, [categoryType, subcategory]);

  if (queries.session.isError) {
    return (
      <ErrorScreen
        href="/seat-selection"
        message="Session not created..."
        label="Select Seat"
      />
    );
  }

  const queryValues = Object.values(queries);

  const error = queryValues.some((q) => q.isError);
  const loading = queryValues.some((q) => q.isLoading);

  if (error) {
    throw Error("Page failed to load");
  }

  if (loading) {
    return <LoadingPage />;
  }

  const createCategoryButtons = (
    items: string[] | null,
    activeValue: string,
    onClick: (value: string) => void,
    className = "flex-shrink-0 my-2 min-w-24",
  ) => {
    if (!items || items.length === 0) return null;

    return (
      <div className="w-screen bg-gray">
        <div className="flex overflow-x-auto gap-2 px-2">
          {items.map((item) => (
            <Button
              key={item}
              onClick={() => onClick(item)}
              variant="toggle"
              rounded="full"
              active={false}
              data-active={activeValue === item}
              className={className}
            >
              {item}
            </Button>
          ))}
        </div>
      </div>
    );
  };

  const showMenuItems = (category: string, filters: Filters | null) => {
    if (!queries.menu.data) return null;

    console.log(filters);

    const items = queries.menu.data!.filter(
      (e) =>
        (category !== "all" ? e.category.name === category : true) &&
        (filters?.priceRange
          ? inRange(
              e.priceCents,
              filters.priceRange.bottom,
              filters.priceRange.top,
            )
          : true) &&
        (filters?.allergens
          ? filters.allergens.filter((a) => e.allergens.includes(a)).length == 0
          : true),
    );

    return items.map((e) => (
      <MenuItemCard
        key={e.id}
        name={e.name}
        id={e.id}
        description={e.description}
        priceCents={e.priceCents}
        imageUrl={e.imageUrl}
      />
    ));
  };

  const activeCategory = categoryType === "all" ? "all" : subcategory;

  const isModalOpen =
    pathname.includes("/menu-items/") || pathname.includes("/cart");

  return (
    <main className="flex flex-col h-screen">
      <div className={`${isModalOpen ? "-z-10" : "z-10"}`}>
        <header className="flex justify-between items-center w-screen text-xl bg-dark-gray">
          {queries.session.data?.seatNumber && (
            <Link
              className="flex gap-1 items-center ml-2 text-lg text-accent active:text-dark-accent transition-color group"
              href="/seat-selection"
            >
              <UserRound className="w-8 h-8" />
              {`Seat ${queries.session.data?.seatNumber}`}
            </Link>
          )}
          <Text
            as="h1"
            onClick={() => {
              menuRef.current &&
                menuRef.current.scrollTo({ top: 0, behavior: "smooth" });
            }}
            size="xl"
            className="absolute left-1/2"
          >
            Menu
          </Text>
          <CartButton />
        </header>
        {createCategoryButtons(
          categories
            ? ["all", ...new Set(categories.map((e) => e.type))]
            : null,
          categoryType,
          setCategoryType,
        )}
        {categoryType !== "all" &&
          createCategoryButtons(
            categories
              ?.filter((c) => c.type === categoryType)
              .map((c) => c.name) ?? null,
            subcategory,
            setSubcategory,
            "mb-3 min-w-24 flex-shrink-0",
          )}
      </div>
      <menu
        ref={menuRef}
        className="grid overflow-y-auto relative flex-1 justify-items-center pt-2 pb-6 bg-dark-gray"
      >
        {showMenuItems(activeCategory, filters)}
      </menu>
      {<FilterPanel visible={filtersVisible} setFilters={setFilters} />}
      {queries.menu.data && queries.menu.data.length > 0 && (
        <FilterButton
          onClick={() => {
            setFiltersVisible(!filtersVisible); //TODO: Why this rerenders menuItems
          }}
        />
      )}
    </main>
  );
}
