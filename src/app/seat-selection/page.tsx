import { ChefHat, Train } from "lucide-react"

export default function Home() {

  return (
  <div className="flex justify-center items-center p-6 min-h-screen bg-neutral-700">
        <button
          className="fixed top-4 right-4 z-50 p-3 rounded-full shadow-lg transition-all active:shadow-xl active:scale-105 text-neutral-100 bg-neutral-800 active:bg-neutral-900"
          aria-label="Kitchen Terminal"
          >
          <ChefHat className="w-6 h-6" />
        </button> {/* _component */}
      <div className="p-8 w-full max-w-md rounded-2xl shadow-lg bg-zinc-800">
        <div className="flex justify-center mb-6">
          <div className="p-4 bg-green-600 rounded-full">
            <Train className="w-12 h-12 text-white" />
        </div>
        </div>
        <h1 className="mb-2 text-center text-neutral-100">
          Select Your Seat
        </h1>
        <p className="mb-8 text-center text-neutral-300">
          Please enter your seat number to begin ordering
        </p>
        <form>
          <div className="mb-6">
            <label htmlFor="seat" className="block mb-2 text-neutral-100">
              Seat Number
            </label>
            <input
              id="seat"
              type="text"
              inputMode="numeric"
              placeholder="e.g. 12"
              className="py-3 px-4 w-full rounded-lg border-2 transition-colors focus:border-green-600 focus:outline-none placeholder:text-neutral-600 bg-neutral-800 border-neutral-600 text-neutral-100"
              autoFocus
            />
          </div>
          <button
            type="submit"
            className="py-3 w-full text-white bg-green-600 rounded-lg transition-colors active:bg-green-700 disabled:bg-neutral-400"
          >
            Continue
          </button>
        </form>
      </div>
    </div>
  )
}
