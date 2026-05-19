'use client'

import { useCallback, useRef } from 'react'

/**
 * Throttle a callback to execute at most once per `delay` ms.
 * Uses trailing-edge execution to ensure the last call is always processed.
 */
export function useThrottle<T extends (...args: any[]) => void>(
  callback: T,
  delay: number,
): T {
  const lastCall = useRef(0)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  return useCallback(
    (...args: Parameters<T>) => {
      const now = Date.now()
      const remaining = delay - (now - lastCall.current)

      if (remaining <= 0) {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current)
          timeoutRef.current = null
        }
        lastCall.current = now
        callback(...args)
      } else if (!timeoutRef.current) {
        timeoutRef.current = setTimeout(() => {
          lastCall.current = Date.now()
          timeoutRef.current = null
          callback(...args)
        }, remaining)
      }
    },
    [callback, delay],
  ) as T
}
