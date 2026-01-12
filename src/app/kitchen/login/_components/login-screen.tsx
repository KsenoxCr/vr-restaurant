"use client";

import { Lock } from "lucide-react";
import { Typography } from "~/app/_components/ui/typography";
import { Icon } from "~/app/_components/ui/icon";
import { useState } from "react";
import { api } from "~/trpc/react";
import { Button } from "~/app/_components/ui/button";
import PinIndicator from "./pin-indicator";
import { useRouter } from "next/navigation";
import { navigateBack } from "~/lib/utils/client";
import { NumPad } from "./num-pad";

// TODO: Add retry constraints (preferably ip based)
export default function LoginScreen() {
  const [pin, setPin] = useState("");
  const [pinIncorrect, setPinIncorrect] = useState(false);
  const validatePin = api.kitchen.validatePin.useMutation();
  const router = useRouter();

  // FIX: Session role = customer on #1 validatePin exec
  // Reproduce:
  // 1. select seat as customer
  // 2. go to kitchen
  // 3. try to login

  const handleEnter = () => {
    validatePin.mutate(pin, {
      onSuccess: (data) => {
        if (data.success) navigateBack(router, "/menu");
        else {
          setPinIncorrect(true);
          setTimeout(() => {
            setPinIncorrect(false);
          }, 1000);
        }
      },
    });
  };

  return (
    <div className="flex fixed inset-0 flex-col gap-4 justify-center items-center h-screen bg-dark">
      <Icon Icon={Lock} color="dark-with-white" className="mb-2" />
      <Typography>Kitchen Terminal</Typography>
      <Typography>Enter PIN to access</Typography>
      <PinIndicator pin={pin} pinIncorrect={pinIncorrect} />
      <NumPad pin={pin} setPin={setPin} pinIncorrect={pinIncorrect} />
      <Typography>Demo PIN: 1234</Typography>
      <div className="flex gap-5">
        <Button
          className="w-24"
          variant="secondary"
          size="lg"
          onClick={() => navigateBack(router, "/")}
        >
          Cancel
        </Button>
        {pin.length === 4 && (
          <Button className="w-24" size="lg" onClick={handleEnter}>
            Enter
          </Button>
        )}
      </div>
    </div>
  );
}
