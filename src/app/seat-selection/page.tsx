import { ChefHat, Train } from "lucide-react"
import { KitchenButton } from "../_components/kitchen-button"
import { TrainIcon } from "../_components/train-icon"

export default function SeatSelection() {
  return (
  <div className="flex justify-center items-center p-6 min-h-screen bg-neutral-700">
      <KitchenButton/>
      <div className="p-8 w-full max-w-md rounded-2xl shadow-lg bg-zinc-800">
        <div className="flex justify-center mb-6">
        <TrainIcon/>
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
