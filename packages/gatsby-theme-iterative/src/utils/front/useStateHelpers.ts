import {
  useEffect,
  useRef,
  useState,
  Dispatch,
  SetStateAction,
  useCallback
} from 'react'

/**
 * Hook that provides a setState function that defers updates to avoid
 * synchronous setState in effects. Use this when you need to update state
 * in an effect or callback but want to avoid React's strict mode warnings.
 *
 * @example
 * const [value, setValue] = useDeferredState(false)
 * useEffect(() => {
 *   setValue(true) // Automatically deferred
 * }, [])
 */
export function useDeferredState<T>(
  initialState: T | (() => T)
): [T, Dispatch<SetStateAction<T>>] {
  const [state, setState] = useState(initialState)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const deferredSetState = useCallback<Dispatch<SetStateAction<T>>>(
    (value: SetStateAction<T>) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
      timeoutRef.current = setTimeout(() => {
        setState(value)
        timeoutRef.current = null
      }, 0)
    },
    []
  )

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  return [state, deferredSetState]
}

/**
 * Hook that defers a state update when called in an effect.
 * Returns a setter function that automatically defers the update.
 *
 * @param setState - The original setState function
 * @returns A deferred version of setState
 *
 * @example
 * const [value, setValue] = useState(false)
 * const deferredSetValue = useDeferredSetter(setValue)
 * useEffect(() => {
 *   deferredSetValue(true) // Automatically deferred
 * }, [])
 */
export function useDeferredSetter<T>(
  setState: Dispatch<SetStateAction<T>>
): Dispatch<SetStateAction<T>> {
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const deferredSetState = useCallback<Dispatch<SetStateAction<T>>>(
    (value: SetStateAction<T>) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
      timeoutRef.current = setTimeout(() => {
        setState(value)
        timeoutRef.current = null
      }, 0)
    },
    [setState]
  )

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  return deferredSetState
}
