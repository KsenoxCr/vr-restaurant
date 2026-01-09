"use client";

import { useState } from "react";
import { Train } from "lucide-react";
import { KitchenButton } from "../_components/ui/kitchen-button";
import { Icon } from "../_components/ui/icon";
import { api } from "~/trpc/react";
import { Toast } from "./_components/toast";
import { useRouter } from "next/navigation";
import { TRPCClientError } from "@trpc/client";
import Cookies from "js-cookie";
import { useQueryClient } from "@tanstack/react-query";
import { Button } from "~/app/_components/ui/button";
import { Typography } from "../_components/ui/typography";
import { useOrderStore } from "~/stores/order-store";

export default function SeatSelection() {
  const router = useRouter();

  const utils = api.useUtils();
  const queryClient = useQueryClient();
  const createSession = api.session.create.useMutation();

  const [inputValue, setInputValue] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const isDisabled = inputValue.length == 0;

  const clearOrderState = useOrderStore((state) => state.clearState);

  const HandleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.currentTarget.value.replace(/\D/g, "").slice(0, 2);

    setInputValue(input);
  };

  const HandleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (inputValue == "0") {
      setErrorMessage("Seat number cannot be zero.");
      return;
    }

    if (Cookies.get("seatNumber") === inputValue && Cookies.get("sessionId")) {
      router.push("/menu");
      return;
    }

    createSession.mutate(Number(inputValue), {
      onError: (err) => {
        const message =
          err instanceof TRPCClientError
            ? err.message
            : "Something went wrong.";
        setErrorMessage(message);
      },
      onSuccess: (data) => {
        const expires = new Date(data.expiresAt);

        Cookies.set("sessionId", data.sessionId, {
          expires: expires,
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
        });

        Cookies.set("seatNumber", inputValue, {
          expires: expires,
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
        });

        clearOrderState();

        queryClient.removeQueries({ queryKey: [["session"]] });
        utils.invalidate();

        router.push("/menu");
      },
    });
  };

  return (
    <div className="flex justify-center items-center p-6 min-h-screen bg-gray">
      <KitchenButton />
      <div className="p-8 w-full max-w-md rounded-2xl shadow-lg bg-dark-gray">
        <div className="flex justify-center mb-6">
          <Icon Icon={Train} color="accent-with-white" />
        </div>
        <Typography as="h1" variant="heading-1" className="mb-2 text-center">
          Select Your Seat
        </Typography>
        <Typography as="p" variant="body" className="my-6 text-center">
          Please enter your seat number to begin ordering
        </Typography>
        <form onSubmit={HandleSubmit}>
          {errorMessage && (
            <Toast
              duration={3000}
              message={errorMessage}
              onComplete={() => {
                setErrorMessage(null);
              }}
            />
          )}
          <Typography as="label" htmlFor="seat" className="block mb-3">
            Seat Number
          </Typography>
          <input
            id="seat"
            type="text"
            value={inputValue}
            onChange={HandleChange}
            inputMode="numeric"
            placeholder="e.g. 12"
            className="py-3 px-4 w-full rounded-lg border-2 transition-colors focus:outline-none border-gray bg-dark-gray text-off-white placeholder:text-gray focus:border-accent"
            autoFocus
          />
          <Button type="submit" disabled={isDisabled} className="mt-5 w-full">
            Continue
          </Button>
        </form>
      </div>
    </div>
  );
}
