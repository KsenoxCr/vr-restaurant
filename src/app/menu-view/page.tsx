"use client";

import { ShoppingCart, UserRound } from "lucide-react";
import { useRouter } from "next/navigation";
import { api } from "~/trpc/react";
import { LoadingPage } from "../_components/loading-page";
import { useState } from "react";
import { MenuItemCard } from "../_components/menu-item-card";
import { ErrorScreen } from "../_components/error-screen";

// 1st render:
// -Type buttons (persistent)
// all items

// following renders:
// cat buttons (only if not "all" selected)
// cat items

// Menu item shown as child component

export default function MenuView() {
  const [selected, setSelected] = useState("all");
  const [subSelected, setSubSelected] = useState();

  const queries = {
    session: api.session.getCurrent.useQuery(), //Should not be cached if router pushed to menuview
    categories: api.menu.getCategories.useQuery(),
    menu: api.menu.getAll.useQuery(),
  } as const;

  const router = useRouter();
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

  // useEffect(() => {}, [selected]);

  const categories = queries.categories.data;

  const showMenuItems = (category: string) => {
    const items =
      category === "all"
        ? queries.menu.data
        : queries.menu.data!.filter((e) => e.category.name === category);

    // Claude: what do with the assertions!
    return items!.map((e) => (
      <MenuItemCard
        name={e.name}
        id={e.id}
        description={e.description}
        price={Number(e.price).toFixed(2)}
        imageUrl={e.imageUrl}
        onClick={() => {}}
      />
    ));
  };

  const createCatBtns = () => {
    const uniqueCategoryTypes = [
      "all",
      ...new Set(categories!.map((e) => e.type)),
    ];

    // Learn about how positioning affects flexbox

    return (
      <div className="flex justify-end w-screen bg-neutral-700">
        <div className="flex h-[100%] w-[calc(100%-8px)] gap-2">
          {uniqueCategoryTypes.map((t) => (
            <button
              key={t}
              onClick={() => setSelected(t)}
              className={`${selected === t ? "bg-green-600 text-neutral-800" : "bg-neutral-800 text-neutral-300"} shadow-mb my-2 w-24 rounded-full p-3`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>
    );
  };

  const createSubCatBtns = () => {
    return (
      <div className="flex w-screen bg-neutral-700">
        {categories!
          .filter((c) => c.type === selected)
          .map((e) => {
            return <button onClick={() => setSelected(e.name)}></button>;
          })}
      </div>
    );
  };

  return (
    <main className="block h-screen">
      <header className="flex items-center w-screen h-[75px] bg-neutral-800">
        <div className="flex w-[calc(100%-30px)] items-center text-xl">
          {queries.session.data?.seatNumber && (
            <button
              className="flex absolute left-5 items-center ml-1 text-green-600"
              onClick={() => {
                router.push("/seat-selection");
              }}
            >
              <UserRound className="w-8 h-8" />
              <p className="ml-1">Seat {queries.session.data?.seatNumber}</p>
            </button>
          )}
          <h1 className="absolute left-1/2 text-neutral-300">Menu</h1>
          <button className="absolute right-5 text-green-600">
            <ShoppingCart className="w-8 h-8" />
          </button>
        </div>
      </header>
      {createCatBtns()}
      {selected !== "all" && createSubCatBtns()}
      <menu className="flex relative flex-col flex-1 items-center pt-2 pb-6 bg-neutral-800">
        {showMenuItems(selected)}
      </menu>
    </main>
  );
}
