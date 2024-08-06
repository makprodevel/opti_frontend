import { useEffect, useState } from 'react'

export function useDelayed<T>(value: T, delay = 100): T {
  const [delayedValue, setDelayedValue] = useState<T>(value)

  useEffect(() => {
    const handler = setTimeout(() => setDelayedValue(value), delay)
    return () => clearTimeout(handler)
  }, [value, delay])

  return delayedValue
}
