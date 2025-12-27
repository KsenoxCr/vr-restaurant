import { useState, useEffect } from "react";
import { Text } from "~/app/_components/ui/text";

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
        className={`flex max-w-[min(300px,60vw)] rounded-xl border-2 bg-neutral-600 px-8 py-5 shadow-lg transition-opacity duration-${fadeTime} ${isFading ? "opacity-0" : "opacity-100"} border-neutral-400 backdrop-blur-lg`}
      >
        <Text as="p" color="primary">
          {message}
        </Text>
      </div>
    </div>
  );
}
