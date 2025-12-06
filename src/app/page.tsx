import { api, HydrateClient } from "~/trpc/server";
import { Train, Utensils, Coffee, ChefHat, ArrowRight } from "lucide-react";
import Image from "next/image";

export default async function Home() {
  return (
    <HydrateClient>
      <main className="min-h-screen flex flex-col items-center justify-center text-white text-center px-4 gap-6">
        <div className="fixed inset-0 -z-10">
          <Image
            src="/images/bg.jpg"
            alt="Restaurant background"
            fill
            className="object-cover brightness-50 blur-sm scale-105"
            priority
          />
        </div>
        <button
          className="fixed top-4 right-4 z-50 bg-neutral-800 active:bg-neutral-900 text-white rounded-full p-3 transition-all shadow-lg active:shadow-xl active:scale-105"
          aria-label="Kitchen Terminal"
        >
          <ChefHat className="w-6 h-6" />
        </button>
        <div className="inline-block p-4 rounded-full bg-green-600">
          <Train className="h-16 w-16 text-white" />
        </div>
        <h1>Welcome Aboard</h1>
        <p>Order fresh food and beverages directly to your seat in the restaurant carriage</p>
        <div className="flex flex-wrap justify-center gap-3 max-w-md">
          <div className="flex items-center gap-2 p-4 rounded-full backdrop-blur-sm bg-white/10 backdrop-blur-sm border-2 border-white/20">
            <Utensils className="text-green-600" />
            <p>Fresh Food</p>
          </div>
          <div className="flex items-center gap-2 p-4 rounded-full bg-white/10 backdrop-blur-sm border-2 border-white/20">
            <Coffee className="text-green-600" />
            <p>Hot Beverages</p>
          </div>
          <div className="flex items-center gap-2 p-4 rounded-full bg-white/10 backdrop-blur-sm border-2 border-white/20">
            <Train className="text-green-600" />
            <p>Seat Delivery</p>
          </div>
        </div>
        <button
          className="bg-green-600 active:bg-green-700 text-white px-8 py-4 rounded-full transition-all shadow-xl active:scale-105 flex items-center gap-3 group m-5"
        >
          <span className="text-lg">Get Started</span>
          <ArrowRight className="w-5 h-5 group-active:translate-x-1 transition-transform" />
        </button>
        <p>Enjoy your journey with our onboard dining service</p>
      </main>
    </HydrateClient >
  );
}
