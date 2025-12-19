"use client";

import { UserRound } from "lucide-react";
import { api } from "~/trpc/react";
import { LoadingPage } from "../_components/loading-page";
import { useEffect, useState } from "react";
import { MenuItemCard } from "../_components/menu-item-card";
import { ErrorScreen } from "../_components/error-screen";
import Link from "next/link";
import { CartButton } from "../_components/cart-button";
import { usePathname } from "next/navigation";

export default function MenuView() {
  const [categoryType, setCategoryType] = useState("all");
  const [subcategory, setSubcategory] = useState("");
  const pathname = usePathname();
  const isModalOpen =
    pathname.includes("/menu-items/") || pathname.includes("/cart");

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

  const activeCategory = categoryType === "all" ? "all" : subcategory;

  const queryValues = Object.values(queries);

  const error = queryValues.some((q) => q.isError);
  const loading = queryValues.some((q) => q.isLoading);

  if (error) {
    // Add if for no session created
    const queryError = queryValues.find((e) => e.error);

    if (queryError?.error?.message === "UNAUTHORIZED") {
      return (
        <ErrorScreen
          href="/seat-selection"
          message="Session not created..."
          label="Select Seat"
        />
      );
    }

    throw Error("Page failed to load");
  }

  if (loading) {
    return <LoadingPage />;
  }

  const createCatBtns = () => {
    if (!categories) return null;

    const uniqueCategoryTypes = [
      "all",
      ...new Set(categories!.map((e) => e.type)),
    ];

    return (
      <div className="w-screen bg-neutral-700">
        <div className="flex overflow-x-auto gap-2 px-2">
          {uniqueCategoryTypes.map((t) => (
            <button
              key={t}
              onClick={() => setCategoryType(t)}
              className={`${categoryType === t ? "bg-green-600 text-neutral-800" : "bg-neutral-800 text-neutral-300"} shadow-mb my-2 min-w-24 flex-shrink-0 rounded-full p-3`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>
    );
  };

  const createSubCatBtns = (categoryType: string) => {
    if (!categories || categoryType === "all") return null;

    return (
      <div className="w-screen bg-neutral-700">
        <div className="flex overflow-x-auto gap-2 px-2">
          {categories
            .filter((c) => c.type === categoryType)
            .map((c) => {
              return (
                <button
                  key={c.name}
                  onClick={() => setSubcategory(c.name)}
                  className={`${subcategory === c.name ? "bg-green-600 text-neutral-800" : "bg-neutral-800 text-neutral-300"} shadow-mb mb-3 min-w-24 flex-shrink-0 rounded-full p-3`}
                >
                  {c.name}
                </button>
              );
            })}
        </div>
      </div>
    );
  };

  const showMenuItems = (category: string) => {
    if (!queries.menu.data) return null;

    const items =
      category === "all"
        ? queries.menu.data
        : queries.menu.data!.filter((e) => e.category.name === category);

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

  return (
    <main className="flex flex-col h-screen">
      <div className={`sticky top-0 ${isModalOpen ? "-z-10" : "z-10"}`}>
        <header className="flex justify-between items-center w-screen text-xl bg-neutral-800">
          {queries.session.data?.seatNumber && (
            <Link
              className="flex items-center ml-2 text-green-600"
              href="/seat-selection"
            >
              <UserRound className="w-8 h-8" />
              <p className="ml-1">Seat {queries.session.data?.seatNumber}</p>
            </Link>
          )}
          <h1 className="absolute left-1/2 text-neutral-300">Menu</h1>
          <CartButton />
        </header>
        {createCatBtns()}
        {createSubCatBtns(categoryType)}
      </div>
      <menu className="grid overflow-y-auto relative justify-items-center pt-2 pb-6 bg-neutral-800">
        {showMenuItems(activeCategory)}
      </menu>
    </main>
  );
}
