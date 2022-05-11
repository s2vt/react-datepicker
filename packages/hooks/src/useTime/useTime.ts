import {useCallback} from 'react'

export interface UseTimeProps {
  date: Date
  onTimeChange(date: Date): void
}

export default function useTime({date, onTimeChange}: UseTimeProps) {
  const onClick = useCallback(() => onTimeChange(date), [date, onTimeChange])

  return {onClick}
}
