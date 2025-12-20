"use client";

import { useState } from "react";
import { KitchenButton } from "../_components/kitchen-button";
import { TrainIcon } from "../_components/train-icon";
import { api } from "~/trpc/react";
import { Toast } from "../_components/toast";
import { useRouter } from "next/navigation";
import { TRPCClientError } from "@trpc/client";
import Cookies from "js-cookie";
import { useQueryClient } from "@tanstack/react-query";
import { Button } from "~/components/ui/button";

export default function SeatSelection() {
  const router = useRouter();

  const utils = api.useUtils();
  const queryClient = useQueryClient();
  const createSession = api.session.create.useMutation();

  const [inputValue, setInputValue] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const isDisabled = inputValue.length == 0;

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
      router.push("/menu-view");
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

        queryClient.removeQueries({ queryKey: [["session"]] });
        utils.invalidate();

        router.push("/menu-view");
      },
    });
  };

  return (
    <div className="flex justify-center items-center p-6 min-h-screen bg-neutral-700">
      <KitchenButton />
      <div className="p-8 w-full max-w-md rounded-2xl shadow-lg bg-neutral-800">
        <div className="flex justify-center mb-6">
          <TrainIcon />
        </div>
        <h1 className="mb-2 text-center text-neutral-100">Select Your Seat</h1>
        <p className="mb-8 text-center text-neutral-300">
          Please enter your seat number to begin ordering
        </p>
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
          <label htmlFor="seat" className="block mb-3 text-neutral-100">
            Seat Number
          </label>
          <input
            id="seat"
            type="text"
            value={inputValue}
            onChange={HandleChange}
            inputMode="numeric"
            placeholder="e.g. 12"
            className="py-3 px-4 w-full rounded-lg border-2 transition-colors focus:border-green-600 focus:outline-none border-neutral-600 bg-neutral-800 text-neutral-100 placeholder:text-neutral-600"
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
