import {useCallback} from 'react'
import {Time} from '../useTimes/useTimes'

export interface UseTimeProps {
  time: Time
  onTimeSelect(time: Time): void
}

export function useTime({time, onTimeSelect}: UseTimeProps) {
  const onClick = useCallback(() => onTimeSelect(time), [time, onTimeSelect])

  return {onClick}
}
