import {useMemo} from 'react'
import {getTimes} from './useTimes.utils'

export interface Time {
  timeLabel: string
  date: Date
  disabled?: boolean
}

export type CompareTime = {
  hours: number
  minuets: number
  seconds: number
}

export interface UseTimesProps {
  date: Date
  onTimeChange(date: Date): void
  minTime?: CompareTime
  maxTime?: CompareTime
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
