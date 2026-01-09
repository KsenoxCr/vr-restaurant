import { Typography } from "~/app/_components/ui/typography";

type PinIndicatorProps = {
  pin: string;
  pinIncorrect: boolean;
};

export default function PinIndicator({ pin, pinIncorrect }: PinIndicatorProps) {
  const DigitBox = ({ digit }: { digit?: string }) => {
    return (
      <div className="flex justify-center items-center w-12 h-12 rounded-lg border-2 border-gray bg-dark">
        <Typography size="lg" color={pinIncorrect ? "error" : "primary"}>
          {digit}
        </Typography>
      </div>
    );
  };

  const pinLength = 4;

  return (
    <div className="flex gap-2">
      {[...Array(pinLength)].map((_, i) => (
        <DigitBox digit={pin[i]} />
      ))}
    </div>
  );
}
