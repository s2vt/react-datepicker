import {useCallback} from 'react'

export interface UseTimeProps {
  date: Date
  onTimeChange(date: Date): void
}

export function useTime({date, onTimeChange}: UseTimeProps) {
  const onClick = useCallback(() => onTimeChange(date), [date, onTimeChange])

  return {onClick}
}
