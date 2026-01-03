import { useState, useEffect } from "react";
import { Typography } from "~/app/_components/ui/typography";

export function Toast({
  message,
  duration,
  onComplete,
}: {
  message: string;
  duration: number;
  onComplete?: () => void;
}) {
  const [isVisible, setIsVisible] = useState(true);
  const [isFading, setIsFading] = useState(false);

  const fadeTime = 500;

  useEffect(() => {
    const fadeTimer = setTimeout(() => {
      setIsFading(true);
    }, duration - fadeTime);

    const deletionTimer = setTimeout(() => {
      setIsVisible(false);
      onComplete?.();
    }, duration);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(deletionTimer);
    };
  }, [duration]);

  if (!isVisible) {
    return null;
  }

  return (
    <div className="flex fixed inset-0 justify-center items-center">
      <div
        className={`flex max-w-[min(300px,60vw)] rounded-xl border-2 bg-light-gray px-8 py-5 shadow-lg transition-opacity duration-${fadeTime} ${isFading ? "opacity-0" : "opacity-100"} border-slate backdrop-blur-lg`}
      >
        <Typography as="p">
          {message}
        </Typography>
      </div>
    </div>
  );
}
