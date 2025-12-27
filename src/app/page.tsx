"use client";

import { Train, Utensils, Coffee, ArrowRight } from "lucide-react";
import Image from "next/image";
import { KitchenButton } from "./_components/kitchen-button";
import { FeaturePill } from "./_components/feature-pill";
import { TrainIcon } from "./_components/train-icon";
import { Text } from "./_components/ui/text";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col gap-6 justify-center items-center px-4 min-h-screen text-center text-neutral-300">
      <div className="fixed inset-0 text-green -z-10">
        <Image
          src="/images/bg.jpg"
          alt="Restaurant background"
          className="object-cover scale-105 blur-sm brightness-50"
          fill
          priority
        />
      </div>
      <KitchenButton />
      <TrainIcon />
      <Text as="h1" variant="heading-1">
        Welcome Aboard
      </Text>
      <Text as="p" variant="body">
        Order fresh food and beverages directly to your seat in the restaurant
        carriage
      </Text>
      <div className="flex flex-wrap gap-2 justify-center mb-4 max-w-md">
        <FeaturePill icon={Utensils} label="Fresh Food" />
        <FeaturePill icon={Coffee} label="Hot Beverages" />
        <FeaturePill icon={Train} label="Seat Delivery" />
      </div>
      <Link
        className="flex gap-3 items-center py-4 px-8 m-5 text-neutral-300 bg-green-600 rounded-full shadow-xl transition-all active:bg-green-700 active:scale-105 group"
        href="/seat-selection"
      >
        <Text size="lg">Get Started</Text>
        <ArrowRight className="w-5 h-5 transition-transform group-active:translate-x-1" />
      </Link>
      <Text as="p" variant="body">
        Enjoy your journey with our onboard dining service
      </Text>
    </main>
  );
}
