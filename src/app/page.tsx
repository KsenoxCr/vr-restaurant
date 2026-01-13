"use client";

import { Train, Utensils, Coffee, ArrowRight } from "lucide-react";
import Image from "next/image";
import { KitchenButton } from "./_components/ui/kitchen-button";
import { FeaturePill } from "./_components/ui/feature-pill";
import { Icon } from "./_components/ui/icon";
import { Typography } from "./_components/ui/typography";
import Link from "next/link";
import { Button } from "./_components/ui/button";

export default function Home() {
  return (
    <main className="flex flex-col gap-6 justify-center items-center px-4 text-center h-dvh">
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
      <Icon Icon={Train} color="accent-with-white" size="lg" />
      <Typography as="h1" variant="heading-1">
        Welcome Aboard
      </Typography>
      <Typography as="p" variant="body">
        Order fresh food and beverages directly to your seat in the restaurant
        carriage
      </Typography>
      <div className="flex flex-wrap gap-2 justify-center mb-4 max-w-md">
        <FeaturePill icon={Utensils} label="Fresh Food" />
        <FeaturePill icon={Coffee} label="Hot Beverages" />
        <FeaturePill icon={Train} label="Seat Delivery" />
      </div>

      <Button size="lg" rounded="full">
        <Link href="/seat-selection">
          <Typography size="lg">Get Started</Typography>
        </Link>
        <ArrowRight className="ml-2 w-5 h-5" />
      </Button>
      <Typography as="p" variant="body">
        Enjoy your journey with our onboard dining service
      </Typography>
    </main>
  );
}
