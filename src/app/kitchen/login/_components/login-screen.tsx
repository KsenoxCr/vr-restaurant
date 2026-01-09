"use client";

import { Lock } from "lucide-react";
import { Typography } from "~/app/_components/ui/typography";
import { Icon } from "~/app/_components/ui/icon";
import { useState } from "react";
import { api } from "~/trpc/react";
import { Button } from "~/app/_components/ui/button";
import PinIndicator from "./pin-indicator";
import { useRouter } from "next/navigation";
import { navigateBack } from "~/lib/utils";
import { NumPad } from "./num-pad";

// No retry constraints
export default function LoginScreen() {
  const router = useRouter();
  const [pin, setPin] = useState("");
  const validatePin = api.kitchen.validatePin.useMutation();

  const handleEnter = () => {
    validatePin.mutate(pin, {
      onSuccess: (data) => {
        if (data.success) router.push("/kitchen");
      },
    });
  };

  return (
    <div className="flex flex-col gap-4 justify-center items-center h-screen bg-dark">
      <Icon Icon={Lock} color="dark-with-white" className="mb-2" />
      <Typography>Kitchen Terminal</Typography>
      <Typography>Enter PIN to access</Typography>
      <PinIndicator pin={pin} />
      <NumPad pin={pin} setPin={setPin} />
      <Typography>Demo PIN: 1234</Typography>
      <div className="flex gap-5">
        <Button
          className="w-20"
          variant="secondary"
          onClick={() => navigateBack(router, "/")}
        >
          Cancel
        </Button>
        {pin.length === 4 && (
          <Button className="w-20" onClick={handleEnter}>
            Enter
          </Button>
        )}
      </div>
    </div>
  );
}
