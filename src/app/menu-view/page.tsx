"use client"

import { LoaderCircle, ShoppingCart, UserRound } from "lucide-react";
import { useRouter } from "next/navigation";
import { api } from "~/trpc/react";
import { ErrorScreen } from "../_components/error-screen";


export default function MenuView() {
  const router = useRouter()

  // const sessionQuery = api.session.getCurrent.useQuery()
  // const categoriesQuery = api.session.getCurrent.useQuery()
  // const itemsQuery = api.session.getCurrent.useQuery()

  const queries = {
    session: api.session.getCurrent.useQuery(),
    categories: api.menu.getCategories.useQuery(),
    items: api.menu.getAll.useQuery()
  } as const

  const queryValues = Object.values(queries)

  const error = queryValues.some(q => q.isError)
  const loading = queryValues.some(q => q.isLoading)

  if (error) {
    return <ErrorScreen/>
  }

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-screen bg-neutral-700">
        <LoaderCircle className="w-20 h-20 animate-spin text-neutral-900"/>
      </div>
    )
  }

  return (
    <main className="flex flex-col">
      <header className="flex items-center w-screen h-[75px] bg-neutral-800">
        <div className="flex items-center w-[calc(100%-30px)] text-xl">
          {( queries.session.data?.seatNumber ) && (
            <button
            className="flex absolute left-5 items-center ml-1 text-green-600"
            onClick={() => {router.push("/seat-selection")}}
            >
              <UserRound className="w-8 h-8"/>
              <p className="ml-1">Seat {queries.session.data?.seatNumber}</p>
            </button>
          )}
          <h1 className="absolute left-1/2 text-neutral-300">Menu</h1>
          <button className="absolute right-5 text-green-600">
            <ShoppingCart className="w-8 h-8"/>
          </button>
        </div>
      </header>
      <section className="right-5 bg-neutral-700">
        {}
      </section>
      <menu>

      </menu>
    </main>
  )
}
