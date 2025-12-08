import { api, HydrateClient } from "~/trpc/server";
import { Train, Utensils, Coffee, ChefHat, ArrowRight } from "lucide-react";
import Image from "next/image";

export default function Home() {
  return (
    <HydrateClient>
      <main className="flex flex-col gap-6 justify-center items-center px-4 min-h-screen text-center text-white">
        <div className="fixed inset-0 text-green -z-10">
          <Image
            src="/images/bg.jpg"
            alt="Restaurant background"
            className="object-cover scale-105 brightness-50 blur-sm"
            fill
            priority
          />
        </div>
        <button
          className="fixed top-4 right-4 z-50 p-3 text-white rounded-full shadow-lg transition-all active:shadow-xl active:scale-105 text-blu bg-neutral-800 active:bg-neutral-900"
          aria-label="Kitchen Terminal"
        >
          <ChefHat className="w-6 h-6" />
        </button>
        <div className="inline-block p-4 bg-green-600 rounded-full">
          <Train className="w-16 h-16 text-white" />
        </div>
        <h1>Welcome Aboard</h1>
        <p>Order fresh food and beverages directly to your seat in the restaurant carriage</p>
        <div className="flex-wrap gap-3 justify-center max-w-md">
          <div className="flex gap-2 items-center p-4 rounded-full border-2 backdrop-blur-sm bg-white/10 border-white/20">
            <Utensils className="text-green-600" />
            <p>Fresh Food</p>
          </div>
          <div className="flex gap-2 items-center p-4 rounded-full border-2 bg-white/10 backdrop-blur-sm border-white/20">
            <Coffee className="text-green-600" />
            <p>Hot Beverages</p>
          </div>
          <div className="flex gap-2 items-center p-4 rounded-full border-2 bg-white/10 backdrop-blur-sm border-white/20">
            <Train className="text-green-600" />
            <p>Seat Delivery</p>
          </div>
        </div>
        <button
          className="flex gap-3 items-center py-4 px-8 m-5 text-white bg-green-600 rounded-full shadow-xl transition-all active:bg-green-700 active:scale-105 group"
        >
          <span className="text-lg">Get Started</span>
          <ArrowRight className="w-5 h-5 transition-transform group-active:translate-x-1" />
        </button>
        <p>Enjoy your journey with our onboard dining service</p>
      </main>
    </HydrateClient >
  );
}
