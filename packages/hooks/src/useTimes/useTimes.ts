import {useMemo} from 'react'
import {getTimes} from './useTimes.utils'

export interface TimeType extends Time {
  timeLabel: string
  disabled?: boolean
}

export type Time = {
  hours: number
  minuets: number
  seconds: number
}

export interface UseTimesProps {
  minTime?: Time
  maxTime?: Time
  minutesStep?: number
  timeLabelFormat?: (date: Date) => string
}

export function useTimes({minTime, maxTime, minutesStep, timeLabelFormat}: UseTimesProps) {
  const times = useMemo(() => getTimes({minTime, maxTime, minutesStep, timeLabelFormat}), [
    minTime,
    maxTime,
    minutesStep,
    timeLabelFormat,
  ])

  return {times}
}
