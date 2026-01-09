import { Lock } from "lucide-react";
import { Typography } from "~/app/_components/ui/typography";
import { Icon } from "~/app/_components/ui/icon";
import { useState } from "react";

export default function LoginScreen() {
  const [pin, setPin] = useState("")
  const correctPin = 

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray">
      <Icon Icon={Lock} color="dark-with-light" />
      <Typography>Kitchen Terminal</Typography>
      <Typography>Enter PIN to access</Typography>
      <div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}
