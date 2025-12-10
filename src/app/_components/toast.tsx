import { useState, useEffect } from "react"

export function Toast({ message, duration, onComplete }: { message: string, duration: number, onComplete?: () => void }) {
  const [isVisible, setIsVisible] = useState(true)
  const [isFading, setIsFading] = useState(false)

  const fadeTime = 500

  useEffect(() => {
    const fadeTimer = setTimeout(() => {
      setIsFading(true)
    }, duration - fadeTime)

    const deletionTimer = setTimeout(() => {
      setIsVisible(false)
      onComplete?.()
    }, duration)

    return () => {
      clearTimeout(fadeTimer)
      clearTimeout(deletionTimer)
    }
  }, [duration])

  if (!isVisible) {
    return null
  }

  return (
    <div className="flex fixed inset-0 justify-center items-center">
      <div className={`flex py-5 px-8 text-white rounded-xl border-2 shadow-lg max-w-[min(300px,60vw)] bg-neutral-600 transition-opacity duration-${fadeTime} ${isFading ? "opacity-0" : "opacity-100"} border-neutral-400 backdrop-blur-lg`}>
        <p>{message}</p>
      </div>
    </div>
  )
}
