"use client";

import { Train, Utensils, Coffee, ArrowRight } from "lucide-react";
import Image from "next/image";
import { KitchenButton } from "./_components/kitchen-button";
import { FeaturePill } from "./_components/feature-pill";
import { TrainIcon } from "./_components/train-icon";
import { Text } from "./_components/ui/text";
import Link from "next/link";
import { Button } from "./_components/ui/button";

export default function Home() {
  return (
    <main className="flex flex-col gap-6 justify-center items-center px-4 min-h-screen text-center">
      <div className="fixed inset-0 -z-10">
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

      <Button size="lg" rounded="full">
        <Link href="/seat-selection">
          <Text size="lg">Get Started</Text>
        </Link>
        <ArrowRight className="ml-2 w-5 h-5" />
      </Button>
      <Text as="p" variant="body">
        Enjoy your journey with our onboard dining service
      </Text>
    </main>
  );
}
