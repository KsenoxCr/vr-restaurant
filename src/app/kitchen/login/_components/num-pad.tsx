import { Delete } from "lucide-react";
import type { Dispatch, ReactNode, SetStateAction } from "react";
import { Button } from "~/app/_components/ui/button";

type NumPadProps = {
  pin: string;
  setPin: Dispatch<SetStateAction<string>>;
  pinIncorrect: boolean;
};

type NumKeyProps = {
  content: string | number | ReactNode;
  onClick: () => void;
};

export function NumPad({ pin, setPin, pinIncorrect }: NumPadProps) {
  const NumKey = ({ content, onClick }: NumKeyProps) => {
    const action = pinIncorrect ? undefined : onClick;

    return (
      <Button className="m-1.5" variant="secondary" onClick={action}>
        {content}
      </Button>
    );
  };

  const appendToPin = (digit: number) => pin.length < 4 && setPin(pin + digit);
  const subtractFromPin = () => setPin(pin.slice(0, pin.length - 1));
  const clearPin = () => setPin("");

  return (
    <div className="grid w-[80%] grid-cols-[1fr_1fr_1fr]">
      {[...Array<null>(9)].map((_, i) => (
        <NumKey
          key={`numKey${i}`}
          onClick={() => appendToPin(i + 1)}
          content={i + 1}
        />
      ))}
      <NumKey onClick={clearPin} content="Clear" />
      <NumKey onClick={() => appendToPin(0)} content="0" />
      <NumKey
        onClick={subtractFromPin}
        content={<Delete className="w-5 h-5" />}
      />
    </div>
  );
}
