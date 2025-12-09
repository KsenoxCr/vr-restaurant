"use client"

import { Train, Utensils, Coffee, ArrowRight } from "lucide-react";
import Image from "next/image";
import { KitchenButton } from "./_components/kitchen-button";
import { FeaturePill } from "./_components/feature-pill";
import { TrainIcon } from "./_components/train-icon";
import { useRouter } from "next/navigation"

export default function Home() {
  const router = useRouter()

  return (
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
      <KitchenButton/>
      <TrainIcon/>
      <h1>Welcome Aboard</h1>
      <p>Order fresh food and beverages directly to your seat in the restaurant carriage</p>
      <div className="flex flex-wrap gap-3 justify-center mb-12 max-w-md">
        <FeaturePill icon={Utensils} label="Fresh Food"/>
        <FeaturePill icon={Coffee} label="Hot Beverages"/>
        <FeaturePill icon={Train} label="Seat Delivery"/>
      </div>
      <button
        className="flex gap-3 items-center py-4 px-8 m-5 text-white bg-green-600 rounded-full shadow-xl transition-all active:bg-green-700 active:scale-105 group"
        onClick={() => { router.push("/seat-selection") }}
      > {/* _component */}
        <span className="text-lg">Get Started</span>
        <ArrowRight className="w-5 h-5 transition-transform group-active:translate-x-1" />
      </button>
      <p>Enjoy your journey with our onboard dining service</p>
    </main>
  );
}
