import { Delete } from "lucide-react";
import { Dispatch, ReactNode, SetStateAction } from "react";
import { Button } from "~/app/_components/ui/button";

type NumPadProps = {
  pin: string;
  setPin: Dispatch<SetStateAction<string>>;
};

type NumKeyProps = {
  content: string | number | ReactNode;
  onClick: () => void;
};

export function NumPad({ pin, setPin }: NumPadProps) {
  const NumKey = ({ content, onClick }: NumKeyProps) => (
    <Button className="m-1.5" variant="secondary" onClick={onClick}>
      {content}
    </Button>
  );

  const appendToPin = (digit: number) => pin.length < 4 && setPin(pin + digit);
  const subtractFromPin = () => setPin(pin.slice(0, pin.length - 1));
  const clearPin = () => setPin("");

  return (
    <div className="grid w-[80%] grid-cols-[1fr_1fr_1fr]">
      {[...Array(9)].map((_, i) => (
        <NumKey onClick={() => appendToPin(i + 1)} content={i + 1} />
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
